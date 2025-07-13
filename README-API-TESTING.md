# API 測試指南

這個文檔說明如何在本地測試 Mock API，為後續 n8n 集成做準備。

## 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動 Mock API 服務器
```bash
npm run mock-server
```
服務器將在 `http://localhost:3001` 運行

### 3. 測試 API
```bash
npm run test-api
```

### 4. 同時啟動 React 應用和 Mock API
```bash
npm run start-dev
```

## 可用的 API 端點

### 獲取挑戰題目
```
GET /api/challenge
```
- 隨機返回一個挑戰題目
- 包含程式碼區塊、正確答案、提示等

### 提交答案
```
POST /api/challenge/submit
```
請求體:
```json
{
  "challengeId": "challenge-1",
  "userAnswer": ["A", "B", "C", "D", "E"]
}
```

### 獲取挑戰列表
```
GET /api/challenges
```

### 健康檢查
```
GET /api/health
```

## 環境配置

### 開發環境 (.env.local)
```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_MOCK_API=true
VITE_DEBUG_MODE=true
```

### 生產環境 (.env.production)
```
VITE_N8N_BASE_URL=https://your-n8n-instance.com/webhook
VITE_USE_MOCK_API=false
VITE_DEBUG_MODE=false
```

## 測試功能

1. **API 連接測試** - 檢查服務器是否正常運行
2. **挑戰獲取測試** - 測試題目獲取邏輯
3. **答案提交測試** - 測試答案驗證功能
4. **錯誤處理測試** - 測試異常情況處理
5. **效能測試** - 檢查響應時間

## 切換到 n8n

當 n8n webhook 準備好後：

1. 更新 `.env.production` 中的 `VITE_N8N_BASE_URL`
2. 設置 `VITE_USE_MOCK_API=false`
3. 確保 n8n workflow 返回相同的資料格式

## 故障排除

### Mock API 服務器無法啟動
- 檢查端口 3001 是否被占用
- 確認 Node.js 版本 >= 14

### API 測試失敗
- 確認 Mock API 服務器正在運行
- 檢查防火牆設置
- 查看控制台錯誤訊息

### React 應用無法連接 API
- 檢查 `.env.local` 配置
- 確認 CORS 設置正確
- 檢查瀏覽器開發者工具的網路標籤

## 下一步

1. 完成 Mock API 測試
2. 設計 n8n workflow
3. 實現 webhook 端點
4. 測試 n8n 集成
5. 部署到生產環境