/**
 * 表單區塊組件
 * 
 * 功能：
 * - 在設定頁面顯示所有可用的表單選項
 * - 提供表單說明和預覽
 * - 支援批量表單管理
 */

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import FormButton from './FormButton';
import './FormSection.css';

function FormSection() {
  const { currentLanguage } = useLanguage();
  const [submissionHistory, setSubmissionHistory] = useState([]);

  /**
   * 處理表單提交成功
   */
  const handleFormSubmit = (submissionData) => {
    const newSubmission = {
      id: Date.now(),
      ...submissionData,
      timestamp: new Date().toISOString()
    };
    
    setSubmissionHistory(prev => [newSubmission, ...prev.slice(0, 4)]); // 只保留最近5筆
    
    // 顯示成功通知
    console.log('📝 表單提交記錄已更新:', newSubmission);
  };

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return currentLanguage === 'en-US' ? enText : zhText;
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <h2>{getText('回饋與支援', 'Feedback & Support')}</h2>
        <p className="form-section-description">
          {getText(
            '我們重視您的意見！請使用以下表單與我們分享想法、回報問題或建議新功能。',
            'We value your feedback! Use the forms below to share thoughts, report issues, or suggest new features.'
          )}
        </p>
      </div>

      <div className="forms-grid">
        {/* 意見回饋 */}
        <div className="form-card">
          <div className="form-card-header">
            <span className="form-icon">💬</span>
            <h3>{getText('意見回饋', 'Feedback')}</h3>
          </div>
          <p className="form-card-description">
            {getText(
              '分享您的使用體驗，幫助我們改善產品品質。',
              'Share your experience to help us improve product quality.'
            )}
          </p>
          <div className="form-card-features">
            <span className="feature-item">
              ✓ {getText('使用體驗評價', 'User experience rating')}
            </span>
            <span className="feature-item">
              ✓ {getText('功能滿意度調查', 'Feature satisfaction survey')}
            </span>
            <span className="feature-item">
              ✓ {getText('整體建議', 'General suggestions')}
            </span>
          </div>
          <FormButton
            formType="feedback"
            variant="inline"
            onFormSubmit={handleFormSubmit}
          />
        </div>

        {/* 錯誤回報 */}
        <div className="form-card">
          <div className="form-card-header">
            <span className="form-icon">🐛</span>
            <h3>{getText('錯誤回報', 'Bug Report')}</h3>
          </div>
          <p className="form-card-description">
            {getText(
              '遇到技術問題？快速回報錯誤，我們會盡快處理。',
              'Encountered technical issues? Report bugs quickly and we\'ll fix them ASAP.'
            )}
          </p>
          <div className="form-card-features">
            <span className="feature-item">
              ✓ {getText('詳細錯誤描述', 'Detailed error description')}
            </span>
            <span className="feature-item">
              ✓ {getText('重現步驟記錄', 'Reproduction steps')}
            </span>
            <span className="feature-item">
              ✓ {getText('系統資訊收集', 'System information collection')}
            </span>
          </div>
          <FormButton
            formType="bug_report"
            variant="inline"
            onFormSubmit={handleFormSubmit}
          />
        </div>

        {/* 功能建議 */}
        <div className="form-card">
          <div className="form-card-header">
            <span className="form-icon">💡</span>
            <h3>{getText('功能建議', 'Feature Request')}</h3>
          </div>
          <p className="form-card-description">
            {getText(
              '有好點子？建議新功能或改進現有功能。',
              'Got great ideas? Suggest new features or improvements to existing ones.'
            )}
          </p>
          <div className="form-card-features">
            <span className="feature-item">
              ✓ {getText('新功能提案', 'New feature proposals')}
            </span>
            <span className="feature-item">
              ✓ {getText('現有功能改進', 'Existing feature improvements')}
            </span>
            <span className="feature-item">
              ✓ {getText('優先級評估', 'Priority assessment')}
            </span>
          </div>
          <FormButton
            formType="feature_request"
            variant="inline"
            onFormSubmit={handleFormSubmit}
          />
        </div>

        {/* 學習調查 */}
        <div className="form-card">
          <div className="form-card-header">
            <span className="form-icon">📊</span>
            <h3>{getText('學習需求調查', 'Learning Survey')}</h3>
          </div>
          <p className="form-card-description">
            {getText(
              '參與學習需求調查，幫助我們設計更適合的課程內容。',
              'Participate in our learning survey to help us design better course content.'
            )}
          </p>
          <div className="form-card-features">
            <span className="feature-item">
              ✓ {getText('學習目標設定', 'Learning goal setting')}
            </span>
            <span className="feature-item">
              ✓ {getText('內容難度評估', 'Content difficulty assessment')}
            </span>
            <span className="feature-item">
              ✓ {getText('個人化建議', 'Personalized recommendations')}
            </span>
          </div>
          <FormButton
            formType="survey"
            variant="inline"
            onFormSubmit={handleFormSubmit}
          />
        </div>
      </div>

      {/* 提交歷史 */}
      {submissionHistory.length > 0 && (
        <div className="submission-history">
          <h3>{getText('最近提交', 'Recent Submissions')}</h3>
          <div className="history-list">
            {submissionHistory.map((submission) => (
              <div key={submission.id} className="history-item">
                <span className="history-icon">
                  {submission.formType === 'feedback' && '💬'}
                  {submission.formType === 'bug_report' && '🐛'}
                  {submission.formType === 'feature_request' && '💡'}
                  {submission.formType === 'survey' && '📊'}
                </span>
                <div className="history-content">
                  <span className="history-type">
                    {submission.formType === 'feedback' && getText('意見回饋', 'Feedback')}
                    {submission.formType === 'bug_report' && getText('錯誤回報', 'Bug Report')}
                    {submission.formType === 'feature_request' && getText('功能建議', 'Feature Request')}
                    {submission.formType === 'survey' && getText('學習調查', 'Survey')}
                  </span>
                  <span className="history-time">
                    {new Date(submission.timestamp).toLocaleString(currentLanguage)}
                  </span>
                </div>
                <span className="history-status">✓</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 聯絡資訊 */}
      <div className="contact-info">
        <h3>{getText('其他聯絡方式', 'Other Contact Methods')}</h3>
        <p>
          {getText(
            '如果您偏好其他聯絡方式，也可以透過以下管道與我們聯繫：',
            'If you prefer other contact methods, you can also reach us through:'
          )}
        </p>
        <div className="contact-methods">
          <div className="contact-method">
            <span className="contact-icon">📧</span>
            <span>Email: support@reactlearning.com</span>
          </div>
          <div className="contact-method">
            <span className="contact-icon">💬</span>
            <span>{getText('線上客服（週一至週五 9:00-18:00）', 'Online Chat (Mon-Fri 9:00-18:00)')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormSection;