# React Learning Game - Android APK 構建指南

## 🎯 目標
將 React Learning Game 打包成可在 Android 手機上安裝的 APK 文件。

## 📋 前置需求
1. ✅ Java 21 (已安裝)
2. ✅ Node.js 和 npm (已安裝)
3. ✅ Capacitor 配置 (已完成)
4. ❌ Android SDK (需要安裝)

## 🔧 安裝 Android SDK

### 方法一：通過 Android Studio (推薦)
1. 下載並安裝 [Android Studio](https://developer.android.com/studio)
2. 啟動 Android Studio，按照設置嚮導安裝 Android SDK
3. 設置環境變數：
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

### 方法二：僅安裝 Command Line Tools
1. 下載 [Android Command Line Tools](https://developer.android.com/studio#command-tools)
2. 解壓到 `~/android-sdk/cmdline-tools/latest/`
3. 安裝必要的組件：
   ```bash
   export ANDROID_HOME=~/android-sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
   
   sdkmanager "platforms;android-33" "build-tools;33.0.0" "platform-tools"
   ```

## 🚀 構建 APK

### 1. 確保應用已構建並同步
```bash
npm run build
npx cap sync
```

### 2. 構建 Debug APK
```bash
cd android
./gradlew assembleDebug
```

### 3. 構建 Release APK (生產版本)
```bash
cd android
./gradlew assembleRelease
```

## 📱 APK 文件位置
- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

## 🔐 簽署 Release APK (可選)

### 1. 創建簽署金鑰
```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### 2. 配置簽署
在 `android/app/build.gradle` 中添加：
```gradle
android {
    signingConfigs {
        release {
            storeFile file('../../my-release-key.keystore')
            storePassword 'your_store_password'
            keyAlias 'my-key-alias'
            keyPassword 'your_key_password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

## 📦 快速腳本

我已經在 `package.json` 中添加了便捷腳本：

```bash
# 構建並同步
npm run cap:build

# 構建 Android APK
npm run android:build

# 在模擬器中運行
npm run android:run
```

## 🎨 自定義應用設定

### 應用圖標
替換以下文件中的圖標：
- `android/app/src/main/res/mipmap-*/ic_launcher.png`
- `android/app/src/main/res/mipmap-*/ic_launcher_round.png`

### 應用名稱和版本
修改 `android/app/src/main/res/values/strings.xml`：
```xml
<resources>
    <string name="app_name">React 學習遊戲</string>
    <string name="title_activity_main">React Learning Game</string>
    <string name="package_name">com.reactlearning.game</string>
    <string name="custom_url_scheme">com.reactlearning.game</string>
</resources>
```

## 🐛 常見問題解決

### 1. Gradle 版本問題
如果遇到 Gradle 版本問題，更新 `android/gradle/wrapper/gradle-wrapper.properties`

### 2. Android SDK 版本問題
確保在 `android/app/build.gradle` 中設置正確的版本：
```gradle
compileSdkVersion 33
targetSdkVersion 33
```

### 3. 權限問題
檢查 `android/app/src/main/AndroidManifest.xml` 中的權限設置

## 📲 安裝 APK 到手機

1. 在手機設置中啟用「未知來源」應用安裝
2. 將 APK 文件傳輸到手機
3. 點擊 APK 文件進行安裝

## 🎉 完成！

構建完成後，你將得到一個可在 Android 手機上安裝的 APK 文件！

---

## 📝 當前專案狀態
- ✅ Capacitor 已配置
- ✅ Android 平台已添加
- ✅ 構建腳本已就緒
- ⏳ 等待 Android SDK 安裝
- ⏳ 等待 APK 構建