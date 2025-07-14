import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useModules } from '../hooks/useModules';
import ProgressBar from './ProgressBar';
import { FormButton } from './FormComponents';
import './HomePage.css';

/**
 * HomePage 元件 - 首頁/關卡選擇頁面
 * 
 * 功能：
 * - 根據語言載入對應的關卡資料
 * - 從 LocalStorage 讀取已解鎖進度
 * - 顯示關卡列表，標記已解鎖/未解鎖狀態
 * - 提供進度條顯示完成率
 * - 支援多語言和 RWD 響應式設計
 */
function HomePage() {
  const { isLanguage } = useLanguage();
  const { modules: staticModules, isLoading: modulesLoading } = useModules();
  const [unlockedModules, setUnlockedModules] = useState(new Set());
  const [completedModules, setCompletedModules] = useState(new Set());

  /**
   * 使用靜態模組資料（實習學習計畫固定內容）
   */
  const activeModules = useMemo(() => {
    if (staticModules && staticModules.length > 0) {
      console.log('📂 HomePage 使用實習學習計畫模組:', staticModules.length, '個');
      return staticModules;
    }
    
    console.log('⚠️ HomePage 沒有可用的模組資料，等待載入中...');
    return [];
  }, [staticModules]);

  /**
   * 載入狀態 - 檢查是否正在載入或沒有可用模組
   */
  const hasNoModules = activeModules.length === 0;
  const isLoading = modulesLoading;
  
  /**
   * 取得總模組數量（基於當前使用的模組）
   */
  const totalModules = activeModules.length;

  /**
   * 從 LocalStorage 讀取遊戲進度
   * 所有關卡都解鎖，只追踪完成狀態
   * 儲存格式：{ unlocked: [1, 2, 3, ...], completed: [1, 2] }
   */
  useEffect(() => {
    // 解鎖所有關卡
    const allModuleIds = Array.from({ length: totalModules }, (_, i) => i + 1);
    setUnlockedModules(new Set(allModuleIds));
    
    const savedProgress = localStorage.getItem('reactGameProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setCompletedModules(new Set(progress.completed || []));
        // 更新 unlocked 為所有關卡
        const updatedProgress = {
          ...progress,
          unlocked: allModuleIds
        };
        localStorage.setItem('reactGameProgress', JSON.stringify(updatedProgress));
      } catch (error) {
        console.error('讀取進度失敗:', error);
        setCompletedModules(new Set([]));
      }
    } else {
      // 首次進入，解鎖所有關卡
      const initialProgress = { unlocked: allModuleIds, completed: [] };
      localStorage.setItem('reactGameProgress', JSON.stringify(initialProgress));
    }
  }, [totalModules]);

  /**
   * 計算完成百分比
   */
  const completionPercentage = totalModules > 0 ? Math.round((completedModules.size / totalModules) * 100) : 0;
  
  /**
   * 挑戰模式一開始就解鎖
   */
  const isChallengeUnlocked = true;

  /**
   * 檢查關卡是否已解鎖
   */
  const isModuleUnlocked = (moduleId) => {
    return unlockedModules.has(moduleId);
  };

  /**
   * 檢查關卡是否已完成
   */
  const isModuleCompleted = (moduleId) => {
    return completedModules.has(moduleId);
  };

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };


  if (isLoading) {
    return (
      <div className="homepage loading">
        <div className="loading-spinner"></div>
        <p>{getText('載入中...', 'Loading...')}</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* 頁面標題和進度概覽 */}
      <section className="progress-section">
        <div className="section-header">
          <h2>{getText('React 實習生學習計畫', 'React Intern Learning Plan')}</h2>
        </div>
        
        <div className="progress-overview">
          <p>
            {getText(
              `已完成 ${completedModules.size} / ${totalModules} 個關卡`,
              `Completed ${completedModules.size} / ${totalModules} lessons`
            )}
          </p>
          <ProgressBar 
            percent={completionPercentage} 
            color="#27ae60" 
          />
          <div className="progress-actions">
            <Link to="/result" className="btn btn-secondary">
              {getText('查看詳細進度', 'View Detailed Progress')}
            </Link>
            
            {/* 挑戰模式按鈕 */}
            {isChallengeUnlocked && (
              <Link to="/challenge" className="btn btn-primary challenge-mode-btn">
                🎯 {getText('挑戰模式', 'Challenge Mode')}
              </Link>
            )}
          </div>
        </div>
      </section>


      {/* 關卡列表 */}
      <section className="modules-section">
        <h2>{getText('關卡選擇', 'Select Lesson')}</h2>
        
        {hasNoModules && !isLoading ? (
          <div className="empty-modules">
            <p>{getText('載入實習學習計畫中...', 'Loading intern learning plan...')}</p>
          </div>
        ) : (
          <div className="modules-grid">
            {activeModules.map((module) => {
            // 安全檢查模組資料
            if (!module || !module.id) {
              console.warn('Invalid module data:', module);
              return null;
            }
            
            const isUnlocked = isModuleUnlocked(module.id);
            const isCompleted = isModuleCompleted(module.id);
            
            return (
              <div 
                key={module.id} 
                className={`module-card ${
                  isCompleted ? 'completed' : 
                  isUnlocked ? 'unlocked' : 'locked'
                }`}
              >
                {/* 關卡圖示 - 使用內嵌 SVG 避免 404 錯誤 */}
                <div className="module-icon">
                  {module.media?.image ? (
                    <img 
                      src={module.media.image} 
                      alt={getText(
                        `關卡 ${module.id} 圖示`,
                        `Lesson ${module.id} icon`
                      )}
                      onError={(e) => {
                        // 圖片載入失敗時隱藏圖片，顯示預設圖示
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="default-module-icon"
                    style={{ 
                      display: module.media?.image ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '64px',
                      height: '64px',
                      fontSize: '24px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '8px'
                    }}
                  >
                    📘
                  </div>
                </div>
                
                {/* 關卡資訊 */}
                <div className="module-info">
                  <h3>
                    {getText(`關卡 ${module.id}`, `Lesson ${module.id}`)}
                  </h3>
                  <h4>{module.title || getText('未命名關卡', 'Unnamed Lesson')}</h4>
                  <p className="module-description">
                    {module.description ? 
                      module.description.substring(0, 100) + '...' :
                      (module.questions && module.questions[0] && module.questions[0].content ? 
                        module.questions[0].content.substring(0, 100) + '...' :
                        getText('暫無描述', 'No description available')
                      )
                    }
                  </p>
                  
                  {/* 狀態標籤 */}
                  <div className="module-status">
                    {isCompleted && (
                      <span className="status-badge completed">
                        {getText('已完成 ✓', 'Completed ✓')}
                      </span>
                    )}
                    {isUnlocked && !isCompleted && (
                      <span className="status-badge unlocked">
                        {getText('可學習', 'Available')}
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="status-badge locked">
                        {getText('未解鎖 🔒', 'Locked 🔒')}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* 關卡動作按鈕 */}
                <div className="module-actions">
                  <Link 
                    to={`/module/${module.id}`} 
                    className="btn btn-primary"
                  >
                    {getText(
                      isCompleted ? '複習' : '開始學習',
                      isCompleted ? 'Review' : 'Start Learning'
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </section>

      {/* TODO: 可加入音效控制區域 */}
      {/* 暫時移除音效檔案引用，避免 404 錯誤 */}
      {/* 
      <section className="media-controls" style={{ display: 'none' }}>
        <audio id="background-music" loop>
          <source src="/src/assets/audio/homepage-bgm.mp3" type="audio/mpeg" />
        </audio>
      </section>
      */}

      {/* Google 表單按鈕 */}
      <FormButton 
        formType="feedback" 
        variant="floating" 
        position="bottom-right"
        customData={{
          page: 'homepage',
          totalModules: totalModules,
          completedCount: completedModules.size
        }}
      />
    </div>
  );
}

export default HomePage;