import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * React 應用程式進入點
 * 
 * 功能：
 * - 初始化 React 應用程式
 * - 掛載到 DOM 中的 #root 元素
 * - 啟用 React 18 的並發功能
 */

// 檢查是否在開發環境
const isDevelopment = import.meta.env.DEV;

// 在開發環境顯示更多資訊
if (isDevelopment) {
  console.log('🚀 React 學習遊戲 - 開發模式');
  console.log('📚 模組化教學闖關遊戲');
  console.log('🎯 支援 PWA 和離線使用');
}

// 創建 React 根元素並渲染應用程式
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker 由 vite-plugin-pwa 自動處理
// 不需要手動註冊，避免與 PWA 插件衝突

// 錯誤邊界處理
window.addEventListener('error', (event) => {
  console.error('🚨 全域錯誤:', event.error);
  
  // 在生產環境可以發送錯誤報告到監控服務
  if (!isDevelopment) {
    // TODO: 整合錯誤監控服務 (如 Sentry)
    // sendErrorToMonitoring(event.error);
  }
});

// Promise 錯誤處理
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 未處理的 Promise 錯誤:', event.reason);
  event.preventDefault(); // 防止顯示在控制台
});

// 離線/線上狀態檢測
window.addEventListener('online', () => {
  console.log('🌐 網路連線已恢復');
  // 可以顯示通知給使用者
});

window.addEventListener('offline', () => {
  console.log('📵 網路連線已中斷 - 進入離線模式');
  // 可以顯示離線提示給使用者
});

// 效能監控 (開發環境)
if (isDevelopment) {
  // 基本的效能監控
  console.log('📊 效能監控已啟用');
  
  // TODO: 可選安裝 web-vitals 套件來監控 Core Web Vitals
  // npm install web-vitals
  // import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
  //   getCLS(console.log);
  //   getFID(console.log);
  //   getFCP(console.log);
  //   getLCP(console.log);
  //   getTTFB(console.log);
  // });
}