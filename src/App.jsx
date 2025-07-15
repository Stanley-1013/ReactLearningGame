import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import HomePage from './components/HomePage';
import ModulePage from './components/ModulePage';
import ResultPage from './components/ResultPage';
import ChallengePage from './components/ChallengePage';
import LanguageSwitcher from './components/LanguageSwitcher';
import './App.css';

/**
 * 應用程式標題和語言切換元件
 */
function AppHeader() {
  const { isLanguage } = useLanguage();
  
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-text">
          <h1>{isLanguage('en-US') ? 'React Learning Game' : 'React 學習遊戲'}</h1>
          <p>{isLanguage('en-US') ? 'Modular React Development Learning' : '模組化闖關學習 React 開發'}</p>
        </div>
        <div className="header-controls">
          <LanguageSwitcher variant="toggle" size="medium" />
        </div>
      </div>
    </header>
  );
}

/**
 * 應用程式底部元件
 */
function AppFooter() {
  const { isLanguage } = useLanguage();
  
  return (
    <footer className="app-footer">
      {/* TODO: 可加入音效控制、主題切換等功能 */}
      <p>© 2024 {isLanguage('en-US') ? 'React Learning Game' : 'React 學習遊戲'}</p>
    </footer>
  );
}

/**
 * 主要 App 元件 - 設定路由和應用程式結構
 * 
 * 路由設定：
 * / → HomePage (關卡選擇頁面)
 * /module/:id → ModulePage (單一關卡學習頁面)
 * /result → ResultPage (學習進度結果頁面)
 */
function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="app">
          {/* 應用程式標題區 */}
          <AppHeader />

          {/* 主要路由區域 */}
          <main className="app-main">
            <Routes>
              {/* 首頁 - 關卡列表和進度 */}
              <Route path="/" element={<HomePage />} />
              
              {/* 關卡頁面 - 動態路由參數 :id */}
              <Route path="/module/:id" element={<ModulePage />} />
              
              {/* 結果頁面 - 顯示完成進度 */}
              <Route path="/result" element={<ResultPage />} />
              
              {/* 挑戰關卡頁面 - 拖曳排序挑戰 */}
              <Route path="/challenge" element={<ChallengePage />} />
            </Routes>
          </main>

          {/* 應用程式底部 */}
          <AppFooter />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;