/**
 * 學習主題管理 Hook
 * 
 * 功能：
 * - 獲取可用主題列表
 * - 切換學習主題
 * - 管理主題狀態和快取
 * - 整合 n8n API 和本地降級
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { themeService, progressService, DIFFICULTY_LEVELS } from '../services/n8nService';

export function useThemes() {
  const { currentLanguage } = useLanguage();
  const [availableThemes, setAvailableThemes] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [themeModules, setThemeModules] = useState(null);
  const initializationRef = useRef(false);

  // 快取設定
  const CACHE_KEY = 'react-game-themes';
  const THEME_MODULES_KEY = 'react-game-theme-modules';
  const CACHE_DURATION = 30 * 60 * 1000; // 30分鐘

  /**
   * 獲取用戶學習進度
   */
  const getUserProgress = useCallback(() => {
    try {
      const progress = localStorage.getItem('reactGameProgress');
      return progress ? JSON.parse(progress) : {};
    } catch (error) {
      console.warn('讀取用戶進度失敗:', error);
      return {};
    }
  }, []);

  /**
   * 儲存主題偏好
   */
  const saveThemePreference = useCallback((theme) => {
    try {
      const preferences = {
        selectedTheme: theme,
        language: currentLanguage,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('themePreferences', JSON.stringify(preferences));
    } catch (error) {
      console.warn('儲存主題偏好失敗:', error);
    }
  }, [currentLanguage]);

  /**
   * 儲存主題模組資料到本地
   */
  const saveThemeModules = useCallback((modules, themeId) => {
    try {
      const moduleData = {
        modules,
        themeId,
        language: currentLanguage,
        timestamp: Date.now()
      };
      localStorage.setItem(THEME_MODULES_KEY, JSON.stringify(moduleData));
      console.log('💾 主題模組已保存到本地:', themeId, modules?.modules?.length || 0);
    } catch (error) {
      console.warn('儲存主題模組失敗:', error);
    }
  }, [currentLanguage]);

  /**
   * 從本地載入主題模組資料
   */
  const loadThemeModules = useCallback((themeId) => {
    try {
      const cached = localStorage.getItem(THEME_MODULES_KEY);
      if (cached) {
        const moduleData = JSON.parse(cached);
        const now = Date.now();
        
        // 檢查是否為相同主題、語言，且未過期
        if (moduleData.themeId === themeId && 
            moduleData.language === currentLanguage &&
            now - moduleData.timestamp < CACHE_DURATION) {
          console.log('📂 從本地載入主題模組:', themeId, moduleData.modules?.modules?.length || 0);
          return moduleData.modules;
        }
      }
    } catch (error) {
      console.warn('載入主題模組失敗:', error);
    }
    return null;
  }, [currentLanguage]);

  /**
   * 載入已儲存的主題偏好
   */
  const loadThemePreference = useCallback(() => {
    try {
      const preferences = localStorage.getItem('themePreferences');
      if (preferences) {
        const { selectedTheme, language } = JSON.parse(preferences);
        
        // 確保語言一致
        if (language === currentLanguage && selectedTheme) {
          return selectedTheme;
        }
      }
    } catch (error) {
      console.warn('載入主題偏好失敗:', error);
    }
    return null;
  }, [currentLanguage]);

  /**
   * 從快取讀取主題資料
   */
  const getCachedThemes = useCallback(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();
        
        if (now - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (error) {
      console.warn('讀取主題快取失敗:', error);
    }
    return null;
  }, []);

  /**
   * 儲存主題資料到快取
   */
  const setCachedThemes = useCallback((themes) => {
    try {
      const cacheData = {
        data: themes,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('儲存主題快取失敗:', error);
    }
  }, []);

  /**
   * 載入可用主題列表
   */
  const loadAvailableThemes = useCallback(async (forceRefresh = false) => {
    // 檢查快取
    if (!forceRefresh) {
      const cached = getCachedThemes();
      if (cached && cached.length > 0) {
        setAvailableThemes(cached);
        return cached;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const themes = await themeService.getAvailableThemes({
        language_code: currentLanguage,
        difficulty_level: DIFFICULTY_LEVELS.BEGINNER
      });

      setAvailableThemes(themes);
      setCachedThemes(themes);

      return themes;

    } catch (err) {
      console.error('載入主題失敗:', err);
      setError(err.message);
      
      // 使用降級主題
      const fallbackThemes = themeService.getFallbackThemes(currentLanguage);
      setAvailableThemes(fallbackThemes);
      
      return fallbackThemes;

    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage, getCachedThemes, setCachedThemes]);

  /**
   * 切換到指定主題
   */
  const switchToTheme = useCallback(async (theme) => {
    if (!theme || !theme.id) {
      console.warn('❌ 無效的主題:', theme);
      throw new Error('Invalid theme provided');
    }

    // 防止重複切換相同主題
    if (currentTheme && currentTheme.id === theme.id) {
      console.log('⚡ 主題已經是當前主題，跳過切換:', theme.name);
      return themeModules;
    }

    // 防止並發切換
    if (isLoading) {
      console.warn('⏳ 主題切換進行中，請稍候...');
      return;
    }

    console.log('🔄 開始切換主題:', theme.name);
    setIsLoading(true);
    setError(null);

    try {
      // 獲取用戶當前進度作為上下文
      const userProgress = getUserProgress();
      
      const userContext = {
        language_code: currentLanguage,
        progress: userProgress,
        previous_theme: currentTheme?.id
      };

      // 調用 n8n API 切換主題
      const moduleData = await themeService.switchToTheme(theme, userContext);
      
      // 批次更新狀態並驗證
      console.log('📋 更新主題狀態:', {
        previousTheme: currentTheme?.name || 'none',
        newTheme: theme.name,
        moduleDataStructure: moduleData ? Object.keys(moduleData) : [],
        moduleCount: moduleData?.modules?.length || 0
      });
      
      setCurrentTheme(theme);
      setThemeModules(moduleData);
      
      // 儲存主題偏好和模組資料到本地
      saveThemePreference(theme);
      saveThemeModules(moduleData, theme.id);
      
      // 驗證狀態更新
      console.log('✅ 主題切換成功:', {
        themeName: theme.name,
        themeId: theme.id,
        hasModules: !!(moduleData && moduleData.modules),
        moduleCount: moduleData?.modules?.length || 0,
        firstModuleTitle: moduleData?.modules?.[0]?.title || 'N/A'
      });

      // 追蹤主題切換事件（不阻塞）
      progressService.trackProgress({
        action: 'theme_switched',
        from_theme: currentTheme?.id,
        to_theme: theme.id,
        timestamp: new Date().toISOString()
      }).catch(err => console.warn('進度追蹤失敗:', err));

      return moduleData;

    } catch (err) {
      console.error('❌ 主題切換失敗:', err);
      setError(err.message);
      
      // 降級處理：使用本地模組資料
      try {
        console.log('🔧 API 失敗，開始降級處理:', {
          themeName: theme.name,
          themeId: theme.id,
          error: err.message
        });
        
        const fallbackModules = themeService.getFallbackModules(theme);
        
        console.log('📋 降級資料已生成:', {
          hasModules: !!(fallbackModules && fallbackModules.modules),
          moduleCount: fallbackModules?.modules?.length || 0,
          modules: fallbackModules?.modules?.map(m => ({ id: m.id, title: m.title })) || []
        });
        
        setCurrentTheme(theme);
        setThemeModules(fallbackModules);
        saveThemePreference(theme);
        saveThemeModules(fallbackModules, theme.id);
        
        console.log('✅ 使用降級資料完成主題切換:', {
          themeName: theme.name,
          moduleCount: fallbackModules?.modules?.length || 0,
          firstModuleTitle: fallbackModules?.modules?.[0]?.title || 'N/A'
        });
        
        return fallbackModules;
      } catch (fallbackErr) {
        console.error('❌ 降級資料載入也失敗:', fallbackErr);
        throw new Error(`主題切換失敗: ${err.message}`);
      }

    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage, currentTheme, themeModules, isLoading, getUserProgress, saveThemePreference]);

  /**
   * 重置主題到預設狀態
   */
  const resetToDefaultTheme = useCallback(async () => {
    if (availableThemes.length > 0) {
      await switchToTheme(availableThemes[0]);
    }
  }, [availableThemes, switchToTheme]);

  /**
   * 取得主題統計資訊
   */
  const getThemeStats = useCallback((theme) => {
    if (!theme) return null;

    return {
      id: theme.id,
      name: theme.name,
      moduleCount: theme.moduleCount || 0,
      estimatedTime: theme.estimatedTime || 0,
      difficulty: theme.difficulty || DIFFICULTY_LEVELS.BEGINNER,
      completionRate: 0 // TODO: 從進度資料計算
    };
  }, []);

  /**
   * 檢查主題是否可用
   */
  const isThemeAvailable = useCallback((themeId) => {
    return availableThemes.some(theme => theme.id === themeId);
  }, [availableThemes]);

  /**
   * 搜尋主題
   */
  const searchThemes = useCallback((query) => {
    if (!query || query.trim() === '') {
      return availableThemes;
    }

    const searchTerm = query.toLowerCase().trim();
    
    return availableThemes.filter(theme => 
      theme.name.toLowerCase().includes(searchTerm) ||
      theme.description.toLowerCase().includes(searchTerm) ||
      theme.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [availableThemes]);

  /**
   * 取得當前應使用的模組資料
   * 優先使用主題專用模組，否則返回 null (讓 HomePage 使用靜態模組)
   */
  const getActiveModules = useCallback(() => {
    console.log('🔍 getActiveModules 被調用，檢查主題模組:', {
      hasThemeModules: !!(themeModules && themeModules.modules),
      moduleCount: themeModules?.modules?.length || 0,
      currentTheme: currentTheme?.name || 'none',
      themeModulesStructure: themeModules ? Object.keys(themeModules) : []
    });
    
    if (themeModules && themeModules.modules && themeModules.modules.length > 0) {
      console.log('📚 ✅ 使用主題專用模組資料:', {
        count: themeModules.modules.length,
        modules: themeModules.modules.map(m => ({ id: m.id, title: m.title })),
        theme: currentTheme?.name
      });
      return themeModules.modules;
    }
    
    console.log('📂 ⚠️ 沒有主題專用模組，HomePage 將使用靜態資料');
    return null;
  }, [themeModules, currentTheme]);

  /**
   * 檢查是否有主題專用模組資料
   */
  const hasThemeModules = useMemo(() => {
    return !!(themeModules && themeModules.modules && themeModules.modules.length > 0);
  }, [themeModules]);

  // 初始化：載入主題
  useEffect(() => {
    let isMounted = true;
    
    const initializeThemes = async () => {
      try {
        // 防止重複初始化（特別是在 React Strict Mode 中）
        if (initializationRef.current && currentTheme) {
          return;
        }
        
        console.log('🎨 開始初始化主題...');
        const themes = await loadAvailableThemes();
        
        if (!isMounted) return;
        
        // 嘗試載入已儲存的主題偏好
        const savedTheme = loadThemePreference();
        
        if (savedTheme && themes.some(t => t.id === savedTheme.id)) {
          console.log('✅ 恢復已儲存的主題:', savedTheme.name);
          setCurrentTheme(savedTheme);
          
          // 嘗試載入該主題的模組資料
          const savedModules = loadThemeModules(savedTheme.id);
          if (savedModules) {
            setThemeModules(savedModules);
            console.log('📚 恢復已儲存的主題模組:', savedModules?.modules?.length || 0);
          }
        } else if (themes.length > 0 && !currentTheme) {
          console.log('🔧 設定預設主題:', themes[0].name);
          setCurrentTheme(themes[0]);
        }
        
        initializationRef.current = true;
      } catch (error) {
        console.error('❌ 主題初始化失敗:', error);
      }
    };

    initializeThemes();
    
    return () => {
      isMounted = false;
    };
  }, [currentLanguage]); // 只依賴語言變化

  return {
    // 狀態
    availableThemes,
    currentTheme,
    themeModules,
    hasThemeModules,
    isLoading,
    error,

    // 方法
    loadAvailableThemes,
    switchToTheme,
    resetToDefaultTheme,
    getThemeStats,
    isThemeAvailable,
    searchThemes,
    getActiveModules,

    // 工具函數
    getUserProgress,
    saveThemePreference,
    loadThemePreference,
    saveThemeModules,
    loadThemeModules
  };
}

export default useThemes;