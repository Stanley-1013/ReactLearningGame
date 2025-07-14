/**
 * Google 表單彈窗組件
 * 
 * 功能：
 * - 顯示內嵌的 Google 表單
 * - 支援多種表單類型（回饋、錯誤回報、需求調查）
 * - 自動預填用戶資料
 * - 響應式設計和載入狀態
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './GoogleFormModal.css';

const FORM_CONFIGS = {
  feedback: {
    title: { 'zh-TW': '用戶回饋表單', 'en-US': 'User Feedback Form' },
    description: { 'zh-TW': '告訴我們您的使用體驗', 'en-US': 'Tell us about your experience' },
    url: 'https://docs.google.com/forms/d/e/YOUR_FEEDBACK_FORM_ID/viewform',
    height: '600px'
  },
  bug_report: {
    title: { 'zh-TW': '錯誤回報表單', 'en-US': 'Bug Report Form' },
    description: { 'zh-TW': '回報您遇到的問題', 'en-US': 'Report issues you encountered' },
    url: 'https://docs.google.com/forms/d/e/YOUR_BUG_REPORT_FORM_ID/viewform',
    height: '700px'
  },
  feature_request: {
    title: { 'zh-TW': '功能需求表單', 'en-US': 'Feature Request Form' },
    description: { 'zh-TW': '建議新功能或改進', 'en-US': 'Suggest new features or improvements' },
    url: 'https://docs.google.com/forms/d/e/YOUR_FEATURE_REQUEST_FORM_ID/viewform',
    height: '650px'
  },
  survey: {
    title: { 'zh-TW': '學習需求調查', 'en-US': 'Learning Needs Survey' },
    description: { 'zh-TW': '幫助我們了解您的學習需求', 'en-US': 'Help us understand your learning needs' },
    url: 'https://docs.google.com/forms/d/e/YOUR_SURVEY_FORM_ID/viewform',
    height: '800px'
  }
};

function GoogleFormModal({ 
  isOpen, 
  onClose, 
  formType = 'feedback',
  prefilledData = {},
  onSubmitSuccess 
}) {
  const { currentLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [formUrl, setFormUrl] = useState('');

  const config = FORM_CONFIGS[formType];
  const title = config?.title[currentLanguage] || config?.title['zh-TW'];
  const description = config?.description[currentLanguage] || config?.description['zh-TW'];

  /**
   * 建構預填表單 URL
   */
  useEffect(() => {
    if (config && isOpen) {
      let url = config.url;
      
      // 添加預填參數
      const params = new URLSearchParams();
      
      // 通用預填欄位
      if (prefilledData.userAgent) {
        params.append('entry.123456789', prefilledData.userAgent); // 替換為實際的欄位 ID
      }
      
      if (prefilledData.timestamp) {
        params.append('entry.987654321', prefilledData.timestamp);
      }
      
      if (prefilledData.currentPage) {
        params.append('entry.456789123', prefilledData.currentPage);
      }
      
      // 根據表單類型添加特定預填
      switch (formType) {
        case 'bug_report':
          if (prefilledData.errorMessage) {
            params.append('entry.111111111', prefilledData.errorMessage);
          }
          if (prefilledData.reproductionSteps) {
            params.append('entry.222222222', prefilledData.reproductionSteps);
          }
          break;
          
        case 'feedback':
          if (prefilledData.currentTheme) {
            params.append('entry.333333333', prefilledData.currentTheme);
          }
          if (prefilledData.completionProgress) {
            params.append('entry.444444444', prefilledData.completionProgress);
          }
          break;
          
        case 'feature_request':
          if (prefilledData.currentFeatures) {
            params.append('entry.555555555', prefilledData.currentFeatures);
          }
          break;
          
        case 'survey':
          if (prefilledData.learningGoals) {
            params.append('entry.666666666', prefilledData.learningGoals);
          }
          break;
      }
      
      // 添加嵌入參數
      params.append('embedded', 'true');
      params.append('usp', 'pp_url');
      
      if (params.toString()) {
        url += (url.includes('?') ? '&' : '?') + params.toString();
      }
      
      setFormUrl(url);
    }
  }, [config, formType, prefilledData, isOpen]);

  /**
   * 處理 iframe 載入完成
   */
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  /**
   * 處理表單提交成功
   */
  const handleFormSubmit = () => {
    console.log('📝 Google 表單提交成功');
    
    // 通知 n8n（如果需要）
    if (onSubmitSuccess) {
      onSubmitSuccess({
        formType,
        timestamp: new Date().toISOString(),
        language: currentLanguage
      });
    }
    
    // 延遲關閉，讓用戶看到提交成功訊息
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  /**
   * 關閉彈窗
   */
  const handleClose = () => {
    setIsLoading(true);
    onClose();
  };

  if (!isOpen || !config) {
    return null;
  }

  return (
    <div className="google-form-modal-overlay" onClick={handleClose}>
      <div className="google-form-modal" onClick={(e) => e.stopPropagation()}>
        {/* 標題列 */}
        <div className="form-modal-header">
          <div className="form-modal-title">
            <h2>{title}</h2>
            <p className="form-modal-description">{description}</p>
          </div>
          <button 
            className="form-modal-close-btn"
            onClick={handleClose}
            aria-label={currentLanguage === 'en-US' ? 'Close' : '關閉'}
          >
            ✕
          </button>
        </div>

        {/* 表單內容 */}
        <div className="form-modal-content">
          {isLoading && (
            <div className="form-loading">
              <div className="loading-spinner"></div>
              <p>{currentLanguage === 'en-US' ? 'Loading form...' : '載入表單中...'}</p>
            </div>
          )}
          
          {formUrl && (
            <iframe
              src={formUrl}
              className="google-form-iframe"
              style={{ height: config.height }}
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              onLoad={handleIframeLoad}
              title={title}
            >
              {currentLanguage === 'en-US' ? 'Loading...' : '載入中...'}
            </iframe>
          )}
        </div>

        {/* 說明文字 */}
        <div className="form-modal-footer">
          <p className="form-notice">
            {currentLanguage === 'en-US' 
              ? '🔒 Your data is securely processed by Google Forms'
              : '🔒 您的資料由 Google 表單安全處理'
            }
          </p>
          <p className="form-help">
            {currentLanguage === 'en-US'
              ? 'Having trouble? You can also '
              : '遇到問題？您也可以 '
            }
            <a 
              href={config.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-form-link"
            >
              {currentLanguage === 'en-US' 
                ? 'open in new tab'
                : '在新分頁開啟'
              }
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoogleFormModal;