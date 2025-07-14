/**
 * 表單按鈕組件
 * 
 * 功能：
 * - 快速觸發各種類型的 Google 表單
 * - 支援不同樣式和位置
 * - 自動收集當前頁面上下文
 * - 整合 n8n 數據追蹤
 */

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import GoogleFormModal from './GoogleFormModal';
import { progressService } from '../../services/n8nService';
import './FormButton.css';

const BUTTON_CONFIGS = {
  feedback: {
    icon: '💬',
    label: { 'zh-TW': '意見回饋', 'en-US': 'Feedback' },
    color: '#28a745',
    description: { 'zh-TW': '分享使用體驗', 'en-US': 'Share your experience' }
  },
  bug_report: {
    icon: '🐛',
    label: { 'zh-TW': '回報問題', 'en-US': 'Report Bug' },
    color: '#dc3545',
    description: { 'zh-TW': '回報遇到的問題', 'en-US': 'Report issues' }
  },
  feature_request: {
    icon: '💡',
    label: { 'zh-TW': '建議功能', 'en-US': 'Suggest Feature' },
    color: '#ffc107',
    description: { 'zh-TW': '建議新功能', 'en-US': 'Suggest new features' }
  },
  survey: {
    icon: '📊',
    label: { 'zh-TW': '需求調查', 'en-US': 'Survey' },
    color: '#17a2b8',
    description: { 'zh-TW': '參與學習調查', 'en-US': 'Participate in survey' }
  }
};

function FormButton({ 
  formType = 'feedback', 
  variant = 'floating', // floating, inline, compact
  position = 'bottom-right', // bottom-right, bottom-left, top-right, top-left
  customData = {},
  onFormSubmit
}) {
  const { currentLanguage } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const config = BUTTON_CONFIGS[formType];
  const label = config?.label[currentLanguage] || config?.label['zh-TW'];
  const description = config?.description[currentLanguage] || config?.description['zh-TW'];

  /**
   * 收集當前頁面上下文資料
   */
  const collectContextData = () => {
    const progress = JSON.parse(localStorage.getItem('reactGameProgress') || '{}');
    const themePrefs = JSON.parse(localStorage.getItem('themePreferences') || '{}');
    
    return {
      // 頁面資訊
      currentPage: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      language: currentLanguage,
      
      // 應用狀態
      currentTheme: themePrefs.selectedTheme?.name || 'default',
      completionProgress: `${progress.completed?.length || 0}/${progress.unlocked?.length || 0}`,
      
      // 自定義資料
      ...customData
    };
  };

  /**
   * 開啟表單彈窗
   */
  const handleOpenForm = async () => {
    const contextData = collectContextData();
    
    // 追蹤表單開啟事件到 n8n
    try {
      await progressService.trackProgress({
        action: 'form_opened',
        form_type: formType,
        page_context: contextData,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('表單開啟追蹤失敗:', error);
    }
    
    setIsModalOpen(true);
  };

  /**
   * 處理表單提交成功
   */
  const handleFormSubmitSuccess = async (submissionData) => {
    console.log('📝 表單提交成功:', submissionData);
    
    // 追蹤表單提交事件到 n8n
    try {
      await progressService.trackProgress({
        action: 'form_submitted',
        form_type: formType,
        submission_data: submissionData,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('表單提交追蹤失敗:', error);
    }
    
    // 通知父組件
    if (onFormSubmit) {
      onFormSubmit(submissionData);
    }
    
    setIsModalOpen(false);
  };

  /**
   * 關閉表單彈窗
   */
  const handleCloseForm = () => {
    setIsModalOpen(false);
  };

  // 渲染不同變體的按鈕
  const renderButton = () => {
    const buttonProps = {
      onClick: handleOpenForm,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      style: { '--button-color': config.color },
      title: description
    };

    switch (variant) {
      case 'floating':
        return (
          <button 
            className={`form-button floating ${position} ${formType}`}
            {...buttonProps}
          >
            <span className="button-icon">{config.icon}</span>
            {isHovered && (
              <span className="button-label">{label}</span>
            )}
          </button>
        );

      case 'inline':
        return (
          <button 
            className={`form-button inline ${formType}`}
            {...buttonProps}
          >
            <span className="button-icon">{config.icon}</span>
            <span className="button-text">
              <span className="button-label">{label}</span>
              <span className="button-description">{description}</span>
            </span>
          </button>
        );

      case 'compact':
        return (
          <button 
            className={`form-button compact ${formType}`}
            {...buttonProps}
          >
            <span className="button-icon">{config.icon}</span>
            <span className="button-label">{label}</span>
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderButton()}
      
      <GoogleFormModal
        isOpen={isModalOpen}
        onClose={handleCloseForm}
        formType={formType}
        prefilledData={collectContextData()}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    </>
  );
}

export default FormButton;