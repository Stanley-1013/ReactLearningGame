import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

/**
 * LanguageSwitcher 元件 - 語言切換器
 * 
 * 功能：
 * - 顯示當前語言
 * - 提供語言切換選項
 * - 支援下拉選單和快速切換
 * - 動畫過渡效果
 */
function LanguageSwitcher({ variant = 'dropdown', size = 'medium' }) {
  const {
    currentLanguage,
    changeLanguage,
    getCurrentLanguageInfo,
    supportedLanguages
  } = useLanguage();

  const currentLangInfo = getCurrentLanguageInfo();

  /**
   * 處理語言切換
   */
  const handleLanguageChange = (languageCode) => {
    if (languageCode !== currentLanguage) {
      changeLanguage(languageCode);
      
      // 可選：顯示切換成功提示
      // showNotification(`Language switched to ${supportedLanguages[languageCode].name}`);
    }
  };

  /**
   * 快速切換 (在兩種語言間切換)
   */
  const handleQuickToggle = () => {
    const languages = Object.keys(supportedLanguages);
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];
    handleLanguageChange(nextLanguage);
  };

  // 下拉選單版本
  if (variant === 'dropdown') {
    return (
      <div className={`language-switcher dropdown ${size}`}>
        <label htmlFor="language-select" className="visually-hidden">
          Select Language
        </label>
        <select
          id="language-select"
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="language-select"
          aria-label="Change language"
        >
          {Object.entries(supportedLanguages).map(([code, info]) => (
            <option key={code} value={code}>
              {info.flag} {info.name}
            </option>
          ))}
        </select>
        <div className="select-arrow">▼</div>
      </div>
    );
  }

  // 按鈕組版本
  if (variant === 'buttons') {
    return (
      <div className={`language-switcher buttons ${size}`}>
        <span className="switcher-label">Language:</span>
        <div className="language-buttons">
          {Object.entries(supportedLanguages).map(([code, info]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`language-btn ${
                currentLanguage === code ? 'active' : ''
              }`}
              aria-pressed={currentLanguage === code}
              title={`Switch to ${info.name}`}
            >
              <span className="flag">{info.flag}</span>
              <span className="name">{info.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 切換開關版本 (適合只有兩種語言)
  if (variant === 'toggle') {
    return (
      <div className={`language-switcher toggle ${size}`}>
        <button
          onClick={handleQuickToggle}
          className="language-toggle-btn"
          aria-label={`Current language: ${currentLangInfo.name}. Click to switch.`}
          title={`Switch language (${currentLangInfo.name})`}
        >
          <span className="current-flag">{currentLangInfo.flag}</span>
          <span className="current-name">{currentLangInfo.name}</span>
          <span className="toggle-icon">⇄</span>
        </button>
      </div>
    );
  }

  // 圓形圖示版本 (簡約)
  if (variant === 'icon') {
    return (
      <div className={`language-switcher icon ${size}`}>
        <button
          onClick={handleQuickToggle}
          className="language-icon-btn"
          aria-label={`Current language: ${currentLangInfo.name}. Click to switch.`}
          title={`${currentLangInfo.name} - Click to switch`}
        >
          {currentLangInfo.flag}
        </button>
      </div>
    );
  }

  // 預設為下拉選單
  return null;
}

export default LanguageSwitcher;