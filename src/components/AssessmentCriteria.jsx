import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useModules } from '../hooks/useModules';
import './AssessmentCriteria.css';

/**
 * AssessmentCriteria 組件 - 考核標準管理
 * 
 * 功能：
 * - 顯示模組/週次的考核標準
 * - 支援自我評估打分
 * - 追蹤評估進度
 * - 生成評估報告
 * - 支援多語言和響應式設計
 */
function AssessmentCriteria({ moduleId, weekId, type = 'module' }) {
  const { isLanguage } = useLanguage();
  const { getModuleById, weeklyPlan } = useModules();
  const [assessmentData, setAssessmentData] = useState(null);
  const [selfAssessment, setSelfAssessment] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 載入考核標準資料
   */
  useEffect(() => {
    if (type === 'module' && moduleId) {
      const module = getModuleById(moduleId);
      if (module?.assessmentCriteria) {
        setAssessmentData({
          title: module.title,
          criteria: module.assessmentCriteria,
          type: 'module'
        });
      }
    } else if (type === 'week' && weekId && weeklyPlan) {
      const week = weeklyPlan[weekId];
      if (week?.assessmentCriteria) {
        setAssessmentData({
          title: week.title,
          criteria: week.assessmentCriteria,
          type: 'week'
        });
      }
    }
  }, [moduleId, weekId, type, getModuleById, weeklyPlan]);

  /**
   * 載入自我評估資料
   */
  useEffect(() => {
    if (assessmentData) {
      const savedAssessment = localStorage.getItem(
        `assessment_${type}_${moduleId || weekId}`
      );
      if (savedAssessment) {
        try {
          const assessment = JSON.parse(savedAssessment);
          setSelfAssessment(assessment);
          updateCompletionPercentage(assessment);
        } catch (error) {
          console.error('載入自我評估資料失敗:', error);
        }
      }
    }
  }, [assessmentData, moduleId, weekId, type]);

  /**
   * 更新完成百分比
   */
  const updateCompletionPercentage = (assessment) => {
    if (!assessmentData?.criteria) return;
    
    const totalCriteria = assessmentData.criteria.length;
    const completedCriteria = Object.keys(assessment).length;
    const percentage = totalCriteria > 0 ? Math.round((completedCriteria / totalCriteria) * 100) : 0;
    setCompletionPercentage(percentage);
  };

  /**
   * 處理評分變更
   */
  const handleScoreChange = (criteriaIndex, score) => {
    const newAssessment = {
      ...selfAssessment,
      [criteriaIndex]: {
        score: parseInt(score),
        timestamp: new Date().toISOString()
      }
    };
    
    setSelfAssessment(newAssessment);
    updateCompletionPercentage(newAssessment);
    
    // 儲存評估資料
    localStorage.setItem(
      `assessment_${type}_${moduleId || weekId}`,
      JSON.stringify(newAssessment)
    );
  };

  /**
   * 取得評分顏色
   */
  const getScoreColor = (score) => {
    if (score >= 4) return '#52c41a'; // 綠色
    if (score >= 3) return '#faad14'; // 橙色
    if (score >= 2) return '#fa8c16'; // 橘色
    return '#f5222d'; // 紅色
  };

  /**
   * 取得評分文字
   */
  const getScoreText = (score) => {
    const scoreTexts = {
      1: { zh: '不達標', en: 'Below Standard' },
      2: { zh: '基本達標', en: 'Basic' },
      3: { zh: '良好', en: 'Good' },
      4: { zh: '優秀', en: 'Excellent' },
      5: { zh: '卓越', en: 'Outstanding' }
    };
    
    return scoreTexts[score] ? getText(scoreTexts[score].zh, scoreTexts[score].en) : '';
  };

  /**
   * 計算平均分數
   */
  const calculateAverageScore = () => {
    const scores = Object.values(selfAssessment).map(item => item.score);
    if (scores.length === 0) return 0;
    return (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);
  };

  /**
   * 生成評估報告
   */
  const generateReport = () => {
    const averageScore = calculateAverageScore();
    const totalCriteria = assessmentData?.criteria?.length || 0;
    const completedCriteria = Object.keys(selfAssessment).length;
    
    return {
      averageScore,
      totalCriteria,
      completedCriteria,
      completionPercentage,
      timestamp: new Date().toISOString(),
      details: assessmentData?.criteria?.map((criteria, index) => ({
        criteria,
        score: selfAssessment[index]?.score || 0,
        scoreText: getScoreText(selfAssessment[index]?.score || 0)
      })) || []
    };
  };

  /**
   * 匯出評估報告
   */
  const exportReport = () => {
    const report = generateReport();
    const exportData = {
      type,
      moduleId: moduleId || null,
      weekId: weekId || null,
      title: assessmentData?.title,
      report,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-report-${type}-${moduleId || weekId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * 重置評估
   */
  const resetAssessment = () => {
    if (window.confirm(getText('確定要重置評估嗎？此操作無法復原。', 'Are you sure you want to reset the assessment? This action cannot be undone.'))) {
      setSelfAssessment({});
      setCompletionPercentage(0);
      localStorage.removeItem(`assessment_${type}_${moduleId || weekId}`);
    }
  };

  if (!assessmentData) {
    return (
      <div className="assessment-criteria-empty">
        <p>{getText('此項目暫無考核標準', 'No assessment criteria available for this item')}</p>
      </div>
    );
  }

  const report = generateReport();

  return (
    <div className="assessment-criteria">
      <div className="assessment-header">
        <div className="assessment-title">
          <h3>{getText('考核標準', 'Assessment Criteria')}</h3>
          <span className="assessment-type">
            {assessmentData.title}
          </span>
        </div>
        <div className="assessment-actions">
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => setShowReport(!showReport)}
          >
            📊 {getText('評估報告', 'Assessment Report')}
          </button>
          <button 
            className="btn btn-secondary btn-small"
            onClick={exportReport}
          >
            📄 {getText('匯出報告', 'Export Report')}
          </button>
          <button 
            className="btn btn-secondary btn-small"
            onClick={resetAssessment}
          >
            🔄 {getText('重置', 'Reset')}
          </button>
        </div>
      </div>

      <div className="assessment-progress">
        <div className="progress-info">
          <span className="progress-text">
            {getText(`完成進度: ${completionPercentage}%`, `Progress: ${completionPercentage}%`)}
          </span>
          <span className="progress-count">
            ({Object.keys(selfAssessment).length}/{assessmentData.criteria.length})
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {showReport && (
        <div className="assessment-report">
          <h4>{getText('評估報告', 'Assessment Report')}</h4>
          <div className="report-summary">
            <div className="summary-item">
              <span className="summary-label">
                {getText('平均分數:', 'Average Score:')}
              </span>
              <span className="summary-value" style={{ color: getScoreColor(report.averageScore) }}>
                {report.averageScore}/5.0
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">
                {getText('完成度:', 'Completion:')}
              </span>
              <span className="summary-value">
                {report.completionPercentage}%
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">
                {getText('評估項目:', 'Criteria:')}
              </span>
              <span className="summary-value">
                {report.completedCriteria}/{report.totalCriteria}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="criteria-list">
        {assessmentData.criteria.map((criteria, index) => (
          <div key={index} className="criteria-item">
            <div className="criteria-content">
              <div className="criteria-text">
                <span className="criteria-index">{index + 1}.</span>
                <span className="criteria-description">{criteria}</span>
              </div>
              
              <div className="criteria-assessment">
                <div className="score-selector">
                  <label className="score-label">
                    {getText('自我評分:', 'Self Assessment:')}
                  </label>
                  <div className="score-options">
                    {[1, 2, 3, 4, 5].map(score => (
                      <button
                        key={score}
                        className={`score-option ${selfAssessment[index]?.score === score ? 'selected' : ''}`}
                        onClick={() => handleScoreChange(index, score)}
                        style={{
                          backgroundColor: selfAssessment[index]?.score === score ? getScoreColor(score) : '#f8f9fa',
                          color: selfAssessment[index]?.score === score ? 'white' : '#666'
                        }}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
                
                {selfAssessment[index] && (
                  <div className="score-feedback">
                    <span className="score-text" style={{ color: getScoreColor(selfAssessment[index].score) }}>
                      {getScoreText(selfAssessment[index].score)}
                    </span>
                    <span className="score-timestamp">
                      {getText('評估時間:', 'Assessed:')} {new Date(selfAssessment[index].timestamp).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="assessment-footer">
        <div className="score-legend">
          <h5>{getText('評分標準:', 'Scoring Guide:')}</h5>
          <div className="legend-items">
            {[1, 2, 3, 4, 5].map(score => (
              <div key={score} className="legend-item">
                <span 
                  className="legend-color"
                  style={{ backgroundColor: getScoreColor(score) }}
                />
                <span className="legend-text">
                  {score} - {getScoreText(score)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentCriteria;