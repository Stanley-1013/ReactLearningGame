# 🚀 React 學習遊戲 - 跨平台打包指南

## 📱 支援的平台

- **Android** - APK 文件 (已完成)
- **iOS** - App Store 或 TestFlight 部署
- **Windows** - 可執行文件 (.exe) 和安裝程式 (.msi)
- **macOS** - DMG 安裝包
- **Linux** - AppImage 可執行文件

## 🛠️ 環境準備

### Android 開發環境
```bash
# 已配置 ✅
# Android Studio + SDK
# Java Development Kit (JDK)
```

### iOS 開發環境 (需要 macOS)
```bash
# 需要安裝：
# - Xcode (從 App Store)
# - Xcode Command Line Tools
xcode-select --install

# CocoaPods
sudo gem install cocoapods
```

### Windows/跨平台開發環境
```bash
# 已安裝 ✅
# Node.js + npm
# Electron
# electron-builder
```

## 📦 打包命令

### 🤖 Android (已完成)
```bash
# 建構 APK
npm run android:build

# 運行在 Android 模擬器/設備
npm run android:run

# 手動建構
npx cap sync android
cd android
./gradlew assembleDebug  # 開發版本
./gradlew assembleRelease  # 發布版本
```

**輸出位置：** `android/app/build/outputs/apk/`

### 🍎 iOS
```bash
# 建構 iOS 項目
npm run ios:build

# 在 iOS 模擬器中運行
npm run ios:run

# 手動建構 (需要 Xcode)
npx cap sync ios
npx cap open ios  # 在 Xcode 中打開
```

**Xcode 中的步驟：**
1. 選擇 Target Device 或 Simulator
2. 點擊 Build & Run (⌘+R)
3. 對於 App Store 發布：Product → Archive

### 🪟 Windows
```bash
# 開發模式 (在瀏覽器中預覽)
npm run electron:dev

# 建構 Windows 應用程式
npm run windows:build

# 建構便攜版 (無需安裝)
npm run windows:build-portable

# 建構所有平台 (Windows, macOS, Linux)
npm run dist
```

**輸出位置：** `electron-dist/`

**生成文件：**
- `React Learning Game Setup.exe` - Windows 安裝程式
- `React Learning Game.exe` - 便攜版可執行文件

### 🖥️ 其他平台

```bash
# macOS (需要在 macOS 上執行)
npm run build && electron-builder --mac

# Linux
npm run build && electron-builder --linux

# 所有桌面平台
npm run dist
```

## 📂 檔案結構

```
ReactLearningGame/
├── android/                    # Android 項目
│   ├── app/build/outputs/apk/  # APK 輸出
│   └── ReactLearningGame-v1.1.1.apk
├── ios/                        # iOS 項目
│   └── App/App.xcodeproj       # Xcode 項目
├── electron-dist/              # Electron 建構輸出
├── dist/                       # Web 建構文件
├── electron-main.js            # Electron 主進程
└── capacitor.config.json       # Capacitor 配置
```

## 🎯 快速開始

### 1. 建構 Web 應用
```bash
npm run build
```

### 2. 選擇目標平台

**Android:**
```bash
npm run android:build
```

**iOS (需要 macOS + Xcode):**
```bash
npm run ios:build
npx cap open ios
```

**Windows:**
```bash
npm run windows:build
```

### 3. 測試應用

**Web 版本:**
```bash
npm run dev
```

**Electron 開發模式:**
```bash
npm run electron:dev
```

## 🔧 自定義配置

### Android 配置
編輯 `capacitor.config.json`:
```json
{
  "appId": "com.reactlearning.game",
  "appName": "React Learning Game",
  "android": {
    "buildOptions": {
      "keystorePath": "path/to/keystore",
      "keystoreAlias": "alias"
    }
  }
}
```

### Electron 配置
編輯 `package.json` 中的 `build` 配置:
```json
{
  "build": {
    "appId": "com.reactlearning.game",
    "productName": "React Learning Game",
    "win": {
      "target": "nsis"
    }
  }
}
```

## 📋 發布清單

### Android 發布
- [ ] 更新版本號
- [ ] 生成簽名 APK
- [ ] 測試在不同設備上
- [ ] 上傳到 Google Play Console

### iOS 發布
- [ ] 更新版本號和建構號
- [ ] 配置簽名憑證
- [ ] Archive 並上傳到 App Store Connect
- [ ] 提交審核

### Windows 發布
- [ ] 測試安裝程式
- [ ] 代碼簽名 (可選)
- [ ] 測試在不同 Windows 版本
- [ ] 分發或上傳到 Microsoft Store

## 🚀 一鍵部署腳本

創建 `build-all.sh`:
```bash
#!/bin/bash
echo "🏗️  開始跨平台建構..."

# 建構 Web 應用
npm run build

# Android
echo "📱 建構 Android..."
npm run android:build

# Windows
echo "🪟 建構 Windows..."
npm run windows:build

echo "✅ 所有平台建構完成！"
echo "📦 檔案位置："
echo "  Android: android/app/build/outputs/apk/"
echo "  Windows: electron-dist/"
```

## 🔍 疑難排解

### Android 建構失敗
```bash
# 清理並重建
cd android
./gradlew clean
cd ..
npm run android:build
```

### iOS 建構失敗
```bash
# 重新安裝 pods
cd ios/App
pod install
cd ../..
npm run ios:build
```

### Electron 建構失敗
```bash
# 清理 node_modules
rm -rf node_modules package-lock.json
npm install
npm run windows:build
```

## 📞 技術支援

如果遇到問題，請檢查：
1. Node.js 版本 >= 16
2. 相關 SDK 是否正確安裝
3. 環境變數是否設定正確
4. 建構日誌中的錯誤訊息

---

**版本：** v1.1.1  
**最後更新：** 2024年12月  
**支援平台：** Android ✅ | iOS ✅ | Windows ✅ | macOS ✅ | Linux ✅