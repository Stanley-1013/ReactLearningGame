import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useModules } from '../hooks/useModules';
import ProgressBar from './ProgressBar';
import './ResultPage.css';

/**
 * ResultPage 元件 - 學習進度結果頁面
 * 
 * 功能：
 * - 從 LocalStorage 讀取完成進度
 * - 顯示已解鎖/已完成關卡統計
 * - 顯示百分比完成率和詳細進度
 * - 提供返回首頁和繼續學習的功能
 * - 支援多語言和 RWD 設計
 */
function ResultPage() {
  const { isLanguage } = useLanguage();
  const { modules, getTotalModules } = useModules();
  const [progress, setProgress] = useState({ unlocked: [], completed: [] });
  const [achievements, setAchievements] = useState([]);
  const totalModules = getTotalModules();

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 從 LocalStorage 載入進度資料
   */
  useEffect(() => {
    const savedProgress = localStorage.getItem('reactGameProgress');
    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        setProgress({
          unlocked: progressData.unlocked || [1],
          completed: progressData.completed || []
        });
        
        // 計算成就
        calculateAchievements(progressData.completed || []);
      } catch (error) {
        console.error('讀取進度失敗:', error);
        // 設定預設進度
        setProgress({ unlocked: [1], completed: [] });
      }
    } else {
      // 沒有進度資料
      setProgress({ unlocked: [1], completed: [] });
    }
  }, []);

  /**
   * 計算學習成就
   */
  const calculateAchievements = (completedModules) => {
    const achievementList = [];
    const completedCount = completedModules.length;
    
    // 定義成就條件
    const achievementRules = [
      { 
        id: 1, 
        title: getText('初學者', 'Beginner'), 
        description: getText('完成第一個關卡', 'Complete first lesson'), 
        condition: completedCount >= 1, 
        icon: '🎯' 
      },
      { 
        id: 2, 
        title: getText('學習者', 'Learner'), 
        description: getText('完成 3 個關卡', 'Complete 3 lessons'), 
        condition: completedCount >= 3, 
        icon: '📚' 
      },
      { 
        id: 3, 
        title: getText('進步者', 'Progressor'), 
        description: getText('完成 5 個關卡', 'Complete 5 lessons'), 
        condition: completedCount >= 5, 
        icon: '🚀' 
      },
      { 
        id: 4, 
        title: getText('專精者', 'Expert'), 
        description: getText('完成 8 個關卡', 'Complete 8 lessons'), 
        condition: completedCount >= 8, 
        icon: '⭐' 
      },
      { 
        id: 5, 
        title: getText('React 大師', 'React Master'), 
        description: getText('完成所有關卡', 'Complete all lessons'), 
        condition: completedCount >= totalModules, 
        icon: '🏆' 
      },
      { 
        id: 6, 
        title: getText('連續學習', 'Consecutive Learning'), 
        description: getText('完成連續 3 個關卡', 'Complete 3 consecutive lessons'), 
        condition: checkConsecutiveCompletion(completedModules, 3), 
        icon: '🔥' 
      },
      { 
        id: 7, 
        title: getText('半程達陣', 'Halfway There'), 
        description: getText('完成一半以上關卡', 'Complete more than half lessons'), 
        condition: completedCount >= Math.ceil(totalModules / 2), 
        icon: '🎊' 
      }
    ];
    
    achievementRules.forEach(rule => {
      if (rule.condition) {
        achievementList.push(rule);
      }
    });
    
    setAchievements(achievementList);
  };

  /**
   * 檢查是否有連續完成指定數量的關卡
   */
  const checkConsecutiveCompletion = (completedModules, requiredCount) => {
    if (completedModules.length < requiredCount) return false;
    
    const sorted = [...completedModules].sort((a, b) => a - b);
    let consecutiveCount = 1;
    
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1] + 1) {
        consecutiveCount++;
        if (consecutiveCount >= requiredCount) {
          return true;
        }
      } else {
        consecutiveCount = 1;
      }
    }
    
    return false;
  };

  /**
   * 計算完成百分比
   */
  const completionPercentage = totalModules > 0 ? Math.round((progress.completed.length / totalModules) * 100) : 0;

  /**
   * 獲取下一個未完成的關卡
   */
  const getNextModule = () => {
    for (let i = 1; i <= totalModules; i++) {
      if (!progress.completed.includes(i) && progress.unlocked.includes(i)) {
        return i;
      }
    }
    return null;
  };

  /**
   * 重置進度 (開發用途)
   */
  const resetProgress = () => {
    const confirmMessage = getText(
      '確定要重置所有學習進度嗎？此操作無法復原。',
      'Are you sure you want to reset all learning progress? This action cannot be undone.'
    );
    
    if (confirm(confirmMessage)) {
      localStorage.removeItem('reactGameProgress');
      setProgress({ unlocked: [1], completed: [] });
      setAchievements([]);
    }
  };

  const nextModuleId = getNextModule();

  return (
    <div className="result-page">
      {/* 頁面標題 */}
      <header className="result-header">
        <h1>{getText('學習進度報告', 'Learning Progress Report')}</h1>
        <p>{getText('檢視你的 React 學習成果', 'Review your React learning achievements')}</p>
      </header>

      {/* 進度概覽卡片 */}
      <section className="progress-overview-card">
        <div className="overview-content">
          <div className="progress-stats">
            <div className="stat-item">
              <span className="stat-number">{progress.completed.length}</span>
              <span className="stat-label">{getText('已完成關卡', 'Completed Lessons')}</span>
            </div>
            <div className="stat-divider">／</div>
            <div className="stat-item">
              <span className="stat-number">{totalModules}</span>
              <span className="stat-label">{getText('總關卡數', 'Total Lessons')}</span>
            </div>
          </div>
          
          {/* 主要進度條 */}
          <div className="main-progress">
            <ProgressBar 
              percent={completionPercentage} 
              color={completionPercentage === 100 ? '#27ae60' : '#3498db'}
              size="large"
              animated={true}
            />
          </div>
          
          <div className="completion-message">
            {completionPercentage === 100 ? (
              <p className="success-message">
                🎉 {getText(
                  '恭喜！你已經完成了所有 React 基礎課程！',
                  'Congratulations! You have completed all React basic courses!'
                )}
              </p>
            ) : (
              <p className="encouragement-message">
                {completionPercentage >= 70 ? getText('就快完成了，加油！', 'Almost done, keep going!') :
                 completionPercentage >= 40 ? getText('學習進度不錯，繼續保持！', 'Great progress, keep it up!') :
                 getText('開始你的 React 學習之旅吧！', 'Start your React learning journey!')}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 關卡詳細進度 */}
      <section className="modules-progress">
        <h2>{getText('關卡進度詳情', 'Lesson Progress Details')}</h2>
        <div className="modules-grid">
          {modules.map((module) => {
            const isCompleted = progress.completed.includes(module.id);
            const isUnlocked = progress.unlocked.includes(module.id);
            
            return (
              <div 
                key={module.id} 
                className={`module-progress-card ${
                  isCompleted ? 'completed' : 
                  isUnlocked ? 'unlocked' : 'locked'
                }`}
              >
                <div className="module-status-icon">
                  {isCompleted ? '✅' : isUnlocked ? '🔓' : '🔒'}
                </div>
                <div className="module-info">
                  <h3>{getText(`關卡 ${module.id}`, `Lesson ${module.id}`)}</h3>
                  <p>{module.title}</p>
                </div>
                <div className="module-action">
                  {isCompleted && (
                    <Link to={`/module/${module.id}`} className="btn btn-small btn-secondary">
                      {getText('複習', 'Review')}
                    </Link>
                  )}
                  {isUnlocked && !isCompleted && (
                    <Link to={`/module/${module.id}`} className="btn btn-small btn-primary">
                      {getText('學習', 'Learn')}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 成就系統 */}
      {achievements.length > 0 && (
        <section className="achievements-section">
          <h2>🏆 {getText('學習成就', 'Learning Achievements')}</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 操作按鈕區域 */}
      <section className="result-actions">
        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            🏠 {getText('返回首頁', 'Back to Home')}
          </Link>
          
          {nextModuleId && (
            <Link to={`/module/${nextModuleId}`} className="btn btn-success">
              📚 {getText(`繼續學習 (關卡 ${nextModuleId})`, `Continue Learning (Lesson ${nextModuleId})`)}
            </Link>
          )}
          
          {completionPercentage === 100 && (
            <button 
              className="btn btn-secondary"
              onClick={() => window.open('https://react.dev/', '_blank')}
            >
              🌐 {getText('深入學習 React', 'Learn More React')}
            </button>
          )}
        </div>
        
        {/* 開發者選項 */}
        <div className="developer-actions">
          <button 
            className="btn btn-small btn-danger"
            onClick={resetProgress}
            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
          >
            {getText('重置進度', 'Reset Progress')}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ResultPage;