# ====================================================
# React 學習遊戲
# ====================================================
一個模組化的 React 教學闖關遊戲，使用 Vite + React 架設。
設計成模組化闖關學習系統，幫助學習者循序漸進掌握 React 核心概念。

---

## 📖 專案特色

- 闖關式學習：10 個循序漸進的 React 教學關卡
- PWA 支援：可安裝到桌面、離線使用
- Capacitor 相容：可打包成手機 App
- 模組化設計：清楚結構，方便擴充
- 進度追蹤：LocalStorage 保存進度
- 成就系統：學習成就和里程碑
- 多媒體支援：圖片、音效、影片
- 響應式設計：完美支援各種裝置

---

## 🚀 快速開始

### 系統需求
- Node.js 16 以上
- npm 或 yarn

### 安裝與執行
git clone <repository-url>
cd react-learning-game
npm install
npm run dev

開啟瀏覽器：http://localhost:3000

---

## 📦 建置與部署

npm run build
npm run preview
npm run lint

---

## 📁 專案結構

react-learning-game/
├── public/
│   ├── icons/
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── HomePage.jsx
│   │   ├── ModulePage.jsx
│   │   ├── ResultPage.jsx
│   │   └── ProgressBar.jsx
│   ├── assets/
│   │   ├── images/
│   │   └── audio/
│   ├── data/
│   │   └── modules.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md

---

## 🎮 功能說明

### 關卡系統
- 教學內容
- 程式碼範例
- 互動測驗
- 媒體資源
- 進度解鎖追蹤

### 學習主題
1. React 是什麼？
2. JSX 語法介紹
3. 組件基礎
4. Props 傳遞
5. State 狀態管理
6. 事件處理
7. 條件渲染
8. 列表渲染與 Key
9. useEffect Hook
10. 表單處理與受控組件

---

## 🌐 PWA 功能

- 離線支援
- 可安裝到桌面
- 推播通知（可選）
- 背景同步

---

## 🎨 自訂與擴充

### 新增關卡格式
{
  "id": 11,
  "title": "新關卡標題",
  "content": "教學內容...",
  "codeExample": "React 程式碼範例",
  "quiz": {
    "question": "測驗問題",
    "options": ["選項1", "選項2", "選項3"],
    "answer": "正確答案"
  },
  "media": {
    "image": "/src/assets/images/lesson-11.png",
    "audio": "/src/assets/audio/lesson-11.mp3"
  }
}

---

### AI 資源整合

圖片：
- 放到 src/assets/images/
- 支援 PNG、JPG、WebP
- 建議尺寸：64x64 圖示、1920x1080 背景

音訊：
- 放到 src/assets/audio/
- 支援 MP3、OGG
- 用途：背景音樂、按鈕音效、成功提示

影片：
- 預留 <video> 標籤
- 支援 MP4、WebM

---

### 主題自訂
- 顏色
- 動畫
- 字體
- 版面

修改位置：各元件的 CSS 中的 TODO 區塊

---

## 📱 App 打包

使用 Capacitor：

npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
npx cap init
npm run build
npx cap add android
npx cap add ios
npx cap sync
npx cap open android
npx cap open ios

---

## 🛠️ 開發工具建議

- VSCode
  - ES7+ React/Redux Snippets
  - Auto Rename Tag
  - Prettier
  - ESLint
  - Thunder Client

---

## ⚡️ 常用命令

npm run dev
npm run build
npm run preview
npx prettier --write .
npm run lint

---

## 🌍 部署選項

- Vercel（推薦，自動 PWA 最佳化）
- Netlify
- GitHub Pages
- Firebase Hosting

### Vercel 部署步驟
npm i -g vercel
vercel login
vercel
vercel --prod

---

## ✅ 手動測試清單

- 首頁顯示關卡
- 解鎖機制
- 測驗答題與進度
- PWA 安裝
- 離線可用
- 響應式設計
- 音效播放
- 成就顯示

---

## 🧪 自動化測試（可選）

npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
npm run test

---

## 📊 效能優化

- 程式碼分割
- Lazy loading 圖片
- Service Worker
- Bundle 分析
- 字體優化

---

## 🔒 安全性

- 內容安全政策（CSP）
- HTTPS
- 依賴安全檢查
- 輸入驗證

---

## 🐛 常見問題

Q: PWA 安裝按鈕沒顯示？
A: 確保 HTTPS 和 manifest.json 正確。

Q: 音效無法播放？
A: 需要用戶互動才能播放。

Q: 離線功能失效？
A: 檢查 Service Worker。

Q: 手機版顯示異常？
A: 檢查 CSS media queries。

---

## 🤝 貢獻指南

1. Fork
2. 建立分支
   git checkout -b feature/新功能
3. Commit
   git commit -am '新增功能'
4. Push
   git push origin feature/新功能
5. 建立 Pull Request

---

## 📄 授權

MIT License - 詳見 LICENSE

---

## 👨‍💻 作者

Stanley-1013 - https://github.com/stanley-1013

---

## 🙏 致謝

- React 團隊
- Vite
- 所有開源貢獻者

---

⭐ 如果這個專案對你有幫助，請給個 Star！

📧 有任何問題或建議，歡迎開 Issue 或聯繫作者。

