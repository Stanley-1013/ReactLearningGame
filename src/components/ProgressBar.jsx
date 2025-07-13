import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './ProgressBar.css';

/**
 * ProgressBar 元件 - 顯示學習進度條
 * 
 * Props:
 * @param {number} percent - 進度百分比 (0-100)
 * @param {string} color - 進度條顏色 (可選，預設為藍色)
 * @param {boolean} animated - 是否顯示動畫效果 (可選，預設為 true)
 * @param {string} size - 進度條大小 'small' | 'medium' | 'large' (可選，預設為 medium)
 */
function ProgressBar({ 
  percent = 0, 
  color = '#3498db', 
  animated = true, 
  size = 'medium' 
}) {
  const { isLanguage } = useLanguage();
  const [displayPercent, setDisplayPercent] = useState(0);

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 動畫效果 - 逐步增加進度值
   */
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayPercent(percent);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayPercent(percent);
    }
  }, [percent, animated]);

  /**
   * 確保百分比在有效範圍內
   */
  const clampedPercent = Math.max(0, Math.min(100, displayPercent));

  /**
   * 根據進度決定顯示文字和圖示
   */
  const getStatusInfo = () => {
    if (clampedPercent === 0) {
      return { 
        text: getText('尚未開始', 'Not Started'), 
        icon: '🎯', 
        className: 'not-started' 
      };
    } else if (clampedPercent < 25) {
      return { 
        text: getText('剛起步', 'Getting Started'), 
        icon: '🌱', 
        className: 'beginner' 
      };
    } else if (clampedPercent < 50) {
      return { 
        text: getText('持續學習', 'Learning'), 
        icon: '📚', 
        className: 'learning' 
      };
    } else if (clampedPercent < 75) {
      return { 
        text: getText('進步中', 'Progressing'), 
        icon: '🚀', 
        className: 'progressing' 
      };
    } else if (clampedPercent < 100) {
      return { 
        text: getText('接近完成', 'Almost Done'), 
        icon: '⭐', 
        className: 'almost-done' 
      };
    } else {
      return { 
        text: getText('全部完成', 'Completed'), 
        icon: '🏆', 
        className: 'completed' 
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`progress-bar-container ${size}`}>
      {/* 進度條主體 */}
      <div className="progress-bar-wrapper">
        <div 
          className="progress-bar-track"
          role="progressbar"
          aria-valuenow={clampedPercent}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={getText(`學習進度 ${clampedPercent}%`, `Learning progress ${clampedPercent}%`)}
        >
          <div 
            className={`progress-bar-fill ${animated ? 'animated' : ''}`}
            style={{
              width: `${clampedPercent}%`,
              backgroundColor: color,
              transition: animated ? 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
          >
            {/* 進度條上的光澤效果 */}
            <div className="progress-bar-shine"></div>
          </div>
        </div>
        
        {/* 進度百分比文字 */}
        <div className="progress-text">
          <span className="progress-percentage">{Math.round(clampedPercent)}%</span>
        </div>
      </div>

      {/* 狀態資訊 */}
      <div className={`progress-status ${statusInfo.className}`}>
        <span className="status-icon">{statusInfo.icon}</span>
        <span className="status-text">{statusInfo.text}</span>
      </div>
    </div>
  );
}

export default ProgressBar;