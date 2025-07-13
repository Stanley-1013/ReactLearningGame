# 開發環境使用指南

本項目提供多種開發模式，適合不同的開發和測試需求。

## 開發模式選擇

### 1. 簡單開發模式（推薦新手）
```bash
npm run dev
# 或
npm run dev:simple
```
**特點：**
- ✅ 快速啟動，無需額外服務器
- ✅ 使用內建模擬資料，挑戰功能完全可用
- ✅ 適合功能開發和 UI 調試
- ✅ 不依賴外部 API

**適用場景：**
- 日常開發和調試
- UI/UX 優化
- 功能測試

### 2. 完整測試模式（API 開發）
```bash
npm run dev:full
# 或
npm run start-dev
```
**特點：**
- 🚀 同時啟動 Mock API 服務器和 React 應用
- 🔄 測試完整的 API 調用流程
- 📊 模擬真實的網路延遲和錯誤
- 🛠️ 準備 n8n 集成

**適用場景：**
- API 集成測試
- 效能測試
- n8n webhook 開發準備

### 3. 純 API 測試
```bash
npm run mock-server    # 啟動 Mock API
npm run test-api       # 運行 API 測試
```

## 環境配置說明

### 簡單開發模式配置
文件: `.env.development`
```env
VITE_USE_LOCAL_DATA=true      # 使用本地模擬資料
VITE_USE_MOCK_API=false       # 不使用 Mock API
VITE_DEBUG_MODE=true          # 啟用調試模式
```

### 完整測試模式配置
文件: `.env.local`
```env
VITE_USE_MOCK_API=true        # 使用 Mock API
VITE_API_BASE_URL=http://localhost:3001/api
VITE_DEBUG_MODE=true
```

### 生產環境配置
文件: `.env.production`
```env
VITE_USE_MOCK_API=false       # 不使用 Mock API
VITE_N8N_BASE_URL=https://your-n8n-instance.com/webhook
VITE_DEBUG_MODE=false
```

## 功能測試

### 基礎功能（所有模式都可用）
- ✅ 首頁和模組頁面
- ✅ 語言切換
- ✅ 進度系統
- ✅ 挑戰模式（使用本地資料）

### API 功能（完整測試模式）
- 🌐 動態挑戰題目獲取
- 📤 答案提交和驗證
- 📈 效能和錯誤處理測試

## 故障排除

### 問題：挑戰頁面顯示載入中
**原因：** 可能使用了錯誤的環境配置
**解決：**
```bash
# 確保使用簡單開發模式
npm run dev:simple
```

### 問題：Mock API 連接失敗
**原因：** Mock API 服務器未啟動
**解決：**
```bash
# 使用完整測試模式
npm run dev:full
```

### 問題：需要重置環境
**解決：**
```bash
# 停止所有進程
pkill -f "vite"
pkill -f "mock-server"

# 重新啟動
npm run dev
```

## 開發建議

1. **日常開發**: 使用 `npm run dev`
2. **API 測試**: 使用 `npm run dev:full`
3. **功能驗證**: 先測試簡單模式，再測試完整模式
4. **部署前**: 運行 `npm run test-full` 確保所有功能正常

## 下一步：n8n 集成

當準備集成 n8n 時：
1. 設計 n8n workflow
2. 更新 `.env.production` 配置
3. 測試 webhook 端點
4. 切換到生產環境配置