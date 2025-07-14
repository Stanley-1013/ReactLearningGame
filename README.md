# ====================================================
# React 學習遊戲 v1.1.1 - 實習生學習計畫版
# ====================================================
一個專為 React 實習生設計的模組化教學闖關遊戲，使用 Vite + React 架設。
設計成實習學習計畫專用版本，確保循序漸進且完整的技能掌握。

🎯 **最新更新 v1.1.1**：優化實習生學習體驗，移除干擾功能，專注核心技能培養

---

## 📖 專案特色（實習生特化版）

- ✅ **實習學習計畫專用**：移除主題切換，專注實習內容
- ✅ **完整技能掌握**：必須完成所有題目才能進入下一關
- ✅ **自由學習順序**：所有關卡解鎖，支援個人化學習路徑
- ✅ **直覺題目管理**：題目選擇器移至課程敘述旁邊
- ✅ **實時進度追蹤**：顯示每個題目的完成狀態（✓）
- ✅ **分級挑戰系統**：按難易度排序的進階挑戰（初級→中級→進階）
- ✅ **豐富題目庫**：超過考核目標數量的專業題目
- ✅ **Android APK 支援**：可安裝到手機離線學習
- ✅ **PWA 功能**：可安裝到桌面、離線使用
- ✅ **響應式設計**：完美支援各種裝置

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

### 實習學習計畫模組
#### 第一週：基礎核心與前端思維建立
1. React 開發環境搭建
2. ES6+ 語法基礎
3. React 組件化思想

#### 第二週：核心進階與組件化思維
4. useEffect Hook 與副作用
5. 列表渲染與數據處理
6. 組件拆分與狀態提升

#### 第三週：進階功能與實戰應用
7. 路由與導航
8. 狀態管理進階
9. API 整合與資料獲取

#### 第四週：專案實戰與部署
10. 完整專案開發
11. 效能優化技巧
12. 部署與發布

### 進階挑戰系統
#### 初級挑戰
- React 基礎概念
- JSX 語法練習  
- Props 傳遞

#### 中級挑戰
- State 管理
- 事件處理
- 條件渲染

#### 進階挑戰
- Hooks 應用
- 性能優化
- 複雜狀態管理

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

## 📱 Android APK 下載

### 📦 最新版本 v1.1.1
- **文件**: `ReactLearningGame-v1.1.1.apk`
- **大小**: 4.1MB
- **位置**: `android/ReactLearningGame-v1.1.1.apk`

### 📲 安裝步驟
1. **下載 APK** - 從 releases 頁面或 android 資料夾下載
2. **啟用未知來源** - 在 Android 設定中允許安裝未知來源應用
3. **安裝 APK** - 點擊 APK 文件並按照提示安裝
4. **開始學習** - 啟動 React Learning Game 開始學習！

### 📋 系統需求
- Android 7.0 (API 24) 或更高版本
- 至少 10MB 可用儲存空間
- 建議 2GB RAM 以上

## 🔧 開發者 - App 打包

使用 Capacitor 自行打包：

```bash
# 安裝 Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# 初始化和構建
npx cap init "React Learning Game" "com.reactlearning.game" --web-dir=dist
npm run build
npx cap add android
npx cap sync

# 構建 APK
cd android
./gradlew assembleDebug
```

APK 生成位置：`android/app/build/outputs/apk/debug/app-debug.apk`

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

## 📝 版本更新記錄

### v1.1.1 (2025-07-15) - 實習生學習計畫特化版
#### 🎯 專案優化
- ✅ 移除切換主題功能（僅限此分支）
- ✅ 移除關卡鎖定機制，支援自由學習順序
- ✅ 修改模組完成邏輯：要求完成所有題目才算通過
- ✅ 重新設計題目選擇UI：移動到課程敘述旁邊
- ✅ 創建題組選單：顯示編號、標題、完成狀態
- ✅ 重構進階挑戰：按難易度排序，增加選單選擇功能
- ✅ 設計對應考核的題目庫（數量超過考核目標）

#### 📱 新增功能
- ✅ Android APK 支援 - 可安裝到手機
- ✅ 優化學習進度追蹤系統
- ✅ 實時題目完成狀態顯示
- ✅ 循序漸進的學習路徑設計

#### 🔧 技術改進
- 使用 Capacitor 7.4.2 進行跨平台打包
- 優化 LocalStorage 儲存結構
- 改善UI/UX for 實習生學習體驗
- 新增題目導航和選擇功能

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

