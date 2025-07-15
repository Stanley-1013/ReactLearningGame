import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useModules } from '../hooks/useModules';
import './WeeklyProgress.css';

/**
 * WeeklyProgress 組件 - 週次進度追蹤
 * 
 * 功能：
 * - 顯示四週學習計畫的整體進度
 * - 每週學習目標和完成狀態
 * - 週次統計和時間預估
 * - 支援響應式設計和多語言
 */
function WeeklyProgress() {
  const { isLanguage } = useLanguage();
  const { modules, courseInfo, weeklyPlan } = useModules();
  const [weeklyStats, setWeeklyStats] = useState({});

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 計算週次統計資料
   */
  useEffect(() => {
    const savedProgress = localStorage.getItem('reactGameProgress');
    let completedModules = [];
    
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        completedModules = progress.completed || [];
      } catch (error) {
        console.error('讀取進度失敗:', error);
      }
    }

    const stats = {};
    Object.keys(weeklyPlan).forEach(weekKey => {
      const week = weeklyPlan[weekKey];
      const weekModules = week.modules || [];
      const completedCount = weekModules.filter(moduleId => 
        completedModules.includes(moduleId)
      ).length;
      
      stats[weekKey] = {
        total: weekModules.length,
        completed: completedCount,
        percentage: weekModules.length > 0 ? Math.round((completedCount / weekModules.length) * 100) : 0
      };
    });

    setWeeklyStats(stats);
  }, [weeklyPlan]);

  /**
   * 取得週次完成狀態的 CSS 類別
   */
  const getWeekStatusClass = (weekKey) => {
    const stats = weeklyStats[weekKey];
    if (!stats) return '';
    
    if (stats.completed === stats.total && stats.total > 0) {
      return 'completed';
    } else if (stats.completed > 0) {
      return 'in-progress';
    }
    return 'pending';
  };

  /**
   * 取得週次狀態圖標
   */
  const getWeekStatusIcon = (weekKey) => {
    const stats = weeklyStats[weekKey];
    if (!stats) return '📚';
    
    if (stats.completed === stats.total && stats.total > 0) {
      return '✅';
    } else if (stats.completed > 0) {
      return '🔄';
    }
    return '📚';
  };

  /**
   * 取得難度等級標籤
   */
  const getDifficultyBadge = (weekNumber) => {
    const difficulties = {
      1: { zh: '入門', en: 'Beginner', color: '#52c41a' },
      2: { zh: '初階', en: 'Intermediate', color: '#1890ff' },
      3: { zh: '進階', en: 'Advanced', color: '#722ed1' },
      4: { zh: '實戰', en: 'Expert', color: '#f5222d' }
    };
    
    const difficulty = difficulties[weekNumber];
    if (!difficulty) return null;
    
    return (
      <span 
        className="difficulty-badge"
        style={{ backgroundColor: difficulty.color }}
      >
        {getText(difficulty.zh, difficulty.en)}
      </span>
    );
  };

  if (!courseInfo || !weeklyPlan) {
    return (
      <div className="weekly-progress-loading">
        {getText('載入中...', 'Loading...')}
      </div>
    );
  }

  return (
    <div className="weekly-progress">
      <div className="progress-header">
        <h2>{getText('學習進度總覽', 'Learning Progress Overview')}</h2>
        <p className="course-title">{courseInfo.title}</p>
        <div className="course-stats">
          <span className="stat-item">
            📅 {getText(`${courseInfo.totalWeeks} 週`, `${courseInfo.totalWeeks} weeks`)}
          </span>
          <span className="stat-item">
            📖 {getText(`${courseInfo.totalModules} 個模組`, `${courseInfo.totalModules} modules`)}
          </span>
          <span className="stat-item">
            ⏱️ {getText(`預估 ${courseInfo.estimatedHours} 小時`, `Est. ${courseInfo.estimatedHours} hours`)}
          </span>
        </div>
      </div>

      <div className="weeks-grid">
        {Object.entries(weeklyPlan).map(([weekKey, week]) => {
          const weekNumber = parseInt(weekKey.replace('week', ''));
          const stats = weeklyStats[weekKey] || { total: 0, completed: 0, percentage: 0 };
          
          return (
            <div 
              key={weekKey}
              className={`week-card ${getWeekStatusClass(weekKey)}`}
            >
              <div className="week-header">
                <div className="week-title">
                  <span className="week-icon">{getWeekStatusIcon(weekKey)}</span>
                  <h3>
                    {getText(`第 ${weekNumber} 週`, `Week ${weekNumber}`)}
                  </h3>
                  {getDifficultyBadge(weekNumber)}
                </div>
                <div className="week-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                  <span className="progress-text">
                    {stats.completed}/{stats.total} 
                    <span className="progress-percentage">
                      ({stats.percentage}%)
                    </span>
                  </span>
                </div>
              </div>

              <div className="week-content">
                <h4 className="week-theme">{week.title}</h4>
                <p className="week-description">{week.description}</p>
                
                <div className="week-info">
                  <div className="info-item">
                    <span className="info-label">
                      {getText('時間:', 'Time:')}
                    </span>
                    <span className="info-value">
                      {getText(`${week.estimatedHours} 小時`, `${week.estimatedHours} hours`)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      {getText('模組:', 'Modules:')}
                    </span>
                    <span className="info-value">
                      {week.modules.length} {getText('個', 'modules')}
                    </span>
                  </div>
                </div>

                <div className="learning-objectives">
                  <h5>{getText('學習目標:', 'Learning Objectives:')}</h5>
                  <ul>
                    {week.learningObjectives.slice(0, 3).map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                    {week.learningObjectives.length > 3 && (
                      <li className="more-objectives">
                        {getText(
                          `...還有 ${week.learningObjectives.length - 3} 個目標`,
                          `...and ${week.learningObjectives.length - 3} more`
                        )}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="week-deliverables">
                  <h5>{getText('預期產出:', 'Expected Deliverables:')}</h5>
                  <div className="deliverable-tags">
                    {week.deliverables.map((deliverable, index) => (
                      <span key={index} className="deliverable-tag">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="progress-summary">
        <h3>{getText('整體進度統計', 'Overall Progress Statistics')}</h3>
        <div className="summary-stats">
          <div className="summary-item">
            <span className="summary-label">
              {getText('已完成模組:', 'Completed Modules:')}
            </span>
            <span className="summary-value">
              {Object.values(weeklyStats).reduce((acc, week) => acc + week.completed, 0)} / {courseInfo.totalModules}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">
              {getText('整體完成率:', 'Overall Completion:')}
            </span>
            <span className="summary-value">
              {Math.round((Object.values(weeklyStats).reduce((acc, week) => acc + week.completed, 0) / courseInfo.totalModules) * 100)}%
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">
              {getText('預估剩餘時間:', 'Estimated Remaining:')}
            </span>
            <span className="summary-value">
              {Math.max(0, courseInfo.estimatedHours - Object.values(weeklyStats).reduce((acc, week, index) => {
                const weekHours = Object.values(weeklyPlan)[index]?.estimatedHours || 0;
                return acc + (week.percentage / 100) * weekHours;
              }, 0)).toFixed(1)} {getText('小時', 'hours')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyProgress;