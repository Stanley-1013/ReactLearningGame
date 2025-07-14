/**
 * 主題選擇器組件
 * 
 * 功能：
 * - 顯示可用學習主題
 * - 支援主題搜尋和篩選
 * - 主題切換和預覽
 * - 響應式設計和載入狀態
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useThemes } from '../hooks/useThemes';
import { DIFFICULTY_LEVELS } from '../services/n8nService';
import AILearningForm from './AILearningForm';
import './ThemeSelector.css';

function ThemeSelector({ onThemeChange, compact = false }) {
  const { isLanguage } = useLanguage();
  const {
    availableThemes,
    currentTheme,
    isLoading,
    error,
    switchToTheme,
    loadAvailableThemes,
    searchThemes,
    getThemeStats
  } = useThemes();

  // 本地狀態
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [filteredThemes, setFilteredThemes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [showAIForm, setShowAIForm] = useState(false);
  const [notification, setNotification] = useState(null); // 用於顯示通知

  // 本地化文字
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  // 難度等級文字對應
  const getDifficultyText = (level) => {
    const difficultyMap = {
      [DIFFICULTY_LEVELS.BEGINNER]: getText('初學者', 'Beginner'),
      [DIFFICULTY_LEVELS.INTERMEDIATE]: getText('中級', 'Intermediate'),
      [DIFFICULTY_LEVELS.ADVANCED]: getText('進階', 'Advanced')
    };
    return difficultyMap[level] || level;
  };

  // 篩選和搜尋主題
  useEffect(() => {
    console.log('🔍 篩選主題:', { searchQuery, selectedDifficulty, themesCount: availableThemes.length });
    
    let themes = availableThemes;
    
    // 搜尋篩選
    if (searchQuery && searchQuery.trim() !== '') {
      const searchTerm = searchQuery.toLowerCase().trim();
      themes = themes.filter(theme => 
        theme.name.toLowerCase().includes(searchTerm) ||
        theme.description.toLowerCase().includes(searchTerm) ||
        theme.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // 難度篩選
    if (selectedDifficulty !== 'all') {
      themes = themes.filter(theme => theme.difficulty === selectedDifficulty);
    }
    
    console.log('✅ 篩選完成，結果:', themes.length);
    setFilteredThemes(themes);
  }, [availableThemes, searchQuery, selectedDifficulty]); // 移除 searchThemes 依賴

  // 處理主題切換
  const handleThemeSwitch = async (theme) => {
    // 防止切換相同主題
    if (currentTheme && currentTheme.id === theme.id) {
      console.log('⚡ 已經是當前主題，無需切換');
      return;
    }

    // 防止載入中重複點擊
    if (isLoading) {
      console.warn('⏳ 正在切換主題，請稍候...');
      return;
    }

    try {
      console.log('🎨 用戶選擇主題:', theme.name);
      const moduleData = await switchToTheme(theme);
      
      // 通知父組件主題已變更
      if (onThemeChange) {
        onThemeChange(theme, moduleData);
      }
      
      // 緊湊模式下切換後自動收合
      if (compact) {
        setIsExpanded(false);
      }
      
      // 顯示成功通知
      setNotification({
        type: 'success',
        message: getText(
          `已切換至 "${theme.name}" 主題`,
          `Switched to "${theme.name}" theme`
        )
      });
      
      // 如果有錯誤（使用降級資料），顯示相應提示
      if (error) {
        setNotification({
          type: 'warning',
          message: getText(
            `已切換至 "${theme.name}" 主題（使用離線內容）`,
            `Switched to "${theme.name}" theme (offline content)`
          )
        });
      }
      
      // 3秒後自動隱藏通知
      setTimeout(() => setNotification(null), 3000);
      
      console.log('✅ 主題切換處理完成');
      
    } catch (err) {
      console.error('❌ 主題切換處理失敗:', err);
      setNotification({
        type: 'error',
        message: getText(
          '主題切換失敗，請稍後再試',
          'Theme switch failed, please try again'
        )
      });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  // 重新載入主題
  const handleRefresh = () => {
    loadAvailableThemes(true);
  };

  // 處理 AI 課程生成
  const handleAICourseGenerated = async (courseData) => {
    try {
      console.log('🤖 AI 課程生成完成:', courseData);
      
      // TODO: 將生成的課程添加到可用主題列表
      // 目前先直接切換到生成的課程
      if (onThemeChange) {
        onThemeChange(courseData, { modules: courseData.modules });
      }
      
      // 關閉 AI 表單
      setShowAIForm(false);
      
      // 顯示成功通知
      console.log(`✅ 成功生成 ${courseData.name}，已自動切換！`);
      
    } catch (err) {
      console.error('❌ AI 課程生成後處理失敗:', err);
    }
  };

  // 如果是緊湊模式且未展開，只顯示當前主題
  if (compact && !isExpanded) {
    return (
      <div className="theme-selector compact">
        <div className="current-theme" onClick={() => setIsExpanded(true)}>
          <div className="theme-info">
            <span className="theme-icon">🎨</span>
            <div className="theme-details">
              <h4>{currentTheme?.name || getText('選擇主題', 'Select Theme')}</h4>
              <span className="theme-difficulty">
                {currentTheme && getDifficultyText(currentTheme.difficulty)}
              </span>
            </div>
          </div>
          <span className="expand-icon">▼</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`theme-selector ${compact ? 'compact expanded' : 'full'}`}>
      {/* 標題和控制項 */}
      <div className="selector-header">
        <div className="header-title">
          <h3>
            {getText('學習主題', 'Learning Themes')}
            {compact && (
              <button 
                className="collapse-btn"
                onClick={() => setIsExpanded(false)}
                aria-label={getText('收合', 'Collapse')}
              >
                ✕
              </button>
            )}
          </h3>
          
          {/* AI 課程生成按鈕 */}
          <button 
            className="ai-generate-btn"
            onClick={() => setShowAIForm(true)}
            title={getText('使用 AI 生成專屬課程', 'Generate custom course with AI')}
          >
            <span className="btn-icon">🤖</span>
            <span className="btn-text">
              {getText('AI 生成課程', 'AI Generate')}
            </span>
          </button>
        </div>
        
        {/* 搜尋和篩選 */}
        <div className="theme-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder={getText('搜尋主題...', 'Search themes...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="difficulty-filter"
          >
            <option value="all">{getText('所有難度', 'All Levels')}</option>
            <option value={DIFFICULTY_LEVELS.BEGINNER}>
              {getDifficultyText(DIFFICULTY_LEVELS.BEGINNER)}
            </option>
            <option value={DIFFICULTY_LEVELS.INTERMEDIATE}>
              {getDifficultyText(DIFFICULTY_LEVELS.INTERMEDIATE)}
            </option>
            <option value={DIFFICULTY_LEVELS.ADVANCED}>
              {getDifficultyText(DIFFICULTY_LEVELS.ADVANCED)}
            </option>
          </select>
          
          <button 
            onClick={handleRefresh}
            className="refresh-btn"
            disabled={isLoading}
            title={getText('重新載入', 'Refresh')}
          >
            🔄
          </button>
        </div>
      </div>

      {/* 載入狀態 */}
      {isLoading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>{getText('載入主題中...', 'Loading themes...')}</p>
        </div>
      )}

      {/* 錯誤狀態 */}
      {error && (
        <div className="error-state">
          <p className="error-message">
            {getText('載入主題失敗', 'Failed to load themes')}: {error}
          </p>
          <button onClick={handleRefresh} className="retry-btn">
            {getText('重試', 'Retry')}
          </button>
        </div>
      )}

      {/* 主題列表 */}
      {!isLoading && !error && (
        <div className="themes-grid">
          {filteredThemes.length === 0 ? (
            <div className="no-themes">
              <p>{getText('沒有找到符合條件的主題', 'No themes match your criteria')}</p>
            </div>
          ) : (
            filteredThemes.map((theme) => {
              const stats = getThemeStats(theme);
              const isActive = currentTheme?.id === theme.id;
              
              return (
                <div
                  key={theme.id}
                  className={`theme-card ${isActive ? 'active' : ''}`}
                  onClick={() => handleThemeSwitch(theme)}
                >
                  {/* 主題縮圖 */}
                  <div className="theme-thumbnail">
                    {theme.thumbnail ? (
                      <img 
                        src={theme.thumbnail} 
                        alt={theme.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="fallback-icon" style={{ display: theme.thumbnail ? 'none' : 'flex' }}>
                      🎨
                    </div>
                    
                    {isActive && (
                      <div className="active-badge">
                        {getText('使用中', 'Active')}
                      </div>
                    )}
                  </div>
                  
                  {/* 主題資訊 */}
                  <div className="theme-info">
                    <h4 className="theme-name">{theme.name}</h4>
                    <p className="theme-description">{theme.description}</p>
                    
                    {/* 主題統計 */}
                    <div className="theme-stats">
                      <span className="stat">
                        <span className="stat-icon">📚</span>
                        {stats?.moduleCount || 0} {getText('關卡', 'lessons')}
                      </span>
                      
                      <span className="stat">
                        <span className="stat-icon">⏱️</span>
                        {stats?.estimatedTime || 0} {getText('分鐘', 'min')}
                      </span>
                      
                      <span className={`difficulty ${theme.difficulty}`}>
                        {getDifficultyText(theme.difficulty)}
                      </span>
                    </div>
                    
                    {/* 主題標籤 */}
                    {theme.tags && theme.tags.length > 0 && (
                      <div className="theme-tags">
                        {theme.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="tag">
                            {tag}
                          </span>
                        ))}
                        {theme.tags.length > 3 && (
                          <span className="tag more">
                            +{theme.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* 動作按鈕 */}
                  <div className="theme-actions">
                    {isActive ? (
                      <span className="current-label">
                        {getText('目前主題', 'Current')}
                      </span>
                    ) : (
                      <span className="switch-label">
                        {getText('切換', 'Switch')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      
      {/* 主題統計摘要 */}
      {!compact && filteredThemes.length > 0 && (
        <div className="themes-summary">
          <p>
            {getText(
              `找到 ${filteredThemes.length} 個主題`,
              `Found ${filteredThemes.length} themes`
            )}
          </p>
        </div>
      )}
      
      {/* AI 課程生成表單 */}
      <AILearningForm
        isOpen={showAIForm}
        onClose={() => setShowAIForm(false)}
        onCourseGenerated={handleAICourseGenerated}
      />
      
      {/* 通知提示 */}
      {notification && (
        <div 
          className={`notification notification-${notification.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 16px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 1001,
            maxWidth: '300px',
            backgroundColor: 
              notification.type === 'success' ? '#28a745' :
              notification.type === 'warning' ? '#ffc107' :
              notification.type === 'error' ? '#dc3545' : '#6c757d',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;