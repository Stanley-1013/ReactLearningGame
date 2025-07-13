import { createContext, useContext, useState, useEffect } from 'react';

/**
 * 語言上下文 - 管理應用程式的多語言狀態
 * 
 * 支援語言：
 * - zh-TW: 繁體中文 (預設)
 * - en-US: 美式英文
 * 
 * 功能：
 * - 語言切換
 * - LocalStorage 持久化
 * - 全域語言狀態管理
 */

const LanguageContext = createContext();

// 支援的語言列表
export const SUPPORTED_LANGUAGES = {
  'zh-TW': {
    code: 'zh-TW',
    name: '繁體中文',
    flag: '🇹🇼'
  },
  'en-US': {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸'
  }
};

// 預設語言
const DEFAULT_LANGUAGE = 'zh-TW';

/**
 * 語言提供者元件
 */
export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 從 LocalStorage 載入儲存的語言設定
   */
  useEffect(() => {
    const savedLanguage = localStorage.getItem('reactGameLanguage');
    if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // 嘗試從瀏覽器語言偵測
      const browserLanguage = navigator.language;
      if (SUPPORTED_LANGUAGES[browserLanguage]) {
        setCurrentLanguage(browserLanguage);
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * 切換語言
   * @param {string} languageCode - 語言代碼
   */
  const changeLanguage = (languageCode) => {
    if (SUPPORTED_LANGUAGES[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('reactGameLanguage', languageCode);
      
      // 更新 HTML lang 屬性
      document.documentElement.lang = languageCode;
      
      console.log(`語言已切換為: ${SUPPORTED_LANGUAGES[languageCode].name}`);
    } else {
      console.error(`不支援的語言: ${languageCode}`);
    }
  };

  /**
   * 取得當前語言資訊
   */
  const getCurrentLanguageInfo = () => {
    return SUPPORTED_LANGUAGES[currentLanguage];
  };

  /**
   * 檢查是否為指定語言
   * @param {string} languageCode - 語言代碼
   */
  const isLanguage = (languageCode) => {
    return currentLanguage === languageCode;
  };

  /**
   * 取得翻譯文字的輔助函數
   * 這裡可以整合更複雜的 i18n 系統
   */
  const t = (key, fallback = key) => {
    // TODO: 可以整合完整的 i18n 翻譯系統
    // 目前使用簡單的 fallback 機制
    return fallback;
  };

  const contextValue = {
    currentLanguage,
    changeLanguage,
    getCurrentLanguageInfo,
    isLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isLoading,
    t
  };

  if (isLoading) {
    return (
      <div className="language-loading">
        <div className="loading-spinner"></div>
        <p>Loading language settings...</p>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * 使用語言上下文的 Hook
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/**
 * 語言相關的實用函數
 */
export const languageUtils = {
  /**
   * 格式化日期
   */
  formatDate: (date, languageCode = DEFAULT_LANGUAGE) => {
    return new Intl.DateTimeFormat(languageCode).format(date);
  },

  /**
   * 格式化數字
   */
  formatNumber: (number, languageCode = DEFAULT_LANGUAGE) => {
    return new Intl.NumberFormat(languageCode).format(number);
  },

  /**
   * 取得語言方向 (LTR/RTL)
   */
  getTextDirection: (languageCode = DEFAULT_LANGUAGE) => {
    // 大部分語言都是 LTR，特殊語言可以在這裡添加
    const rtlLanguages = ['ar', 'he', 'fa'];
    return rtlLanguages.some(lang => languageCode.startsWith(lang)) ? 'rtl' : 'ltr';
  }
};