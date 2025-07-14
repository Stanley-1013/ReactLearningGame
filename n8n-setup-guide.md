# n8n 雲端整合設定指南

## 🎯 設定步驟

### 第一步：在 n8n 中匯入 Workflows

1. **匯入主題管理 Workflow**：
   - 到您的 n8n 雲端實例
   - 點選「Import from file」
   - 上傳 `n8n-workflows/get-learning-themes.json`
   - 啟用此 workflow

2. **匯入進度追蹤 Workflow**：
   - 匯入 `n8n-workflows/track-learning-progress.json`
   - 啟用此 workflow

### 第二步：獲取 Webhook URLs

匯入後，n8n 會為您生成 webhook URLs，格式類似：
```
https://your-instance.app.n8n.cloud/webhook/get-learning-themes
https://your-instance.app.n8n.cloud/webhook/track-learning-progress
```

### 第三步：更新環境設定

1. 開啟 `.env.local` 檔案
2. 將 `YOUR_N8N_INSTANCE_URL` 替換為您的實際 n8n 域名
3. 例如：
   ```env
   VITE_N8N_BASE_URL=https://stanley-react-game.app.n8n.cloud/webhook
   ```

### 第四步：重啟開發伺服器

```bash
npm run dev
```

## 🧪 測試 n8n 連接

### 手動測試

1. **測試主題切換**：
   - 開啟 React 應用
   - 點擊主題選擇器
   - 選擇不同主題
   - 查看控制台，應該看到成功的 API 回應

2. **測試進度追蹤**：
   - 完成一個關卡
   - 查看 n8n 的執行歷史
   - 確認進度資料有正確接收

### 使用測試腳本

執行包含的測試腳本：
```bash
node scripts/test-n8n-connection.js
```

## 🔧 故障排除

### 常見問題

1. **CORS 錯誤**：
   - 確保 n8n workflow 中設定了正確的 CORS headers
   - 檢查 `Access-Control-Allow-Origin` 是否設為 `*`

2. **404 錯誤**：
   - 確認 webhook URLs 正確
   - 檢查 workflow 是否已啟用
   - 確認路徑拼寫正確

3. **JSON 解析錯誤**：
   - 檢查 n8n workflow 的回應格式
   - 確保回傳的是有效的 JSON

### 調試技巧

1. **啟用調試模式**：
   ```env
   VITE_DEBUG_MODE=true
   VITE_LOG_LEVEL=debug
   ```

2. **檢查 n8n 執行歷史**：
   - 到 n8n 介面查看 workflow 執行日誌
   - 檢查輸入輸出資料

3. **使用瀏覽器開發工具**：
   - 查看 Network 標籤
   - 檢查 API 請求和回應

## 🚀 進階設定

### 添加資料庫儲存

在 n8n workflow 中可以添加：
- Google Sheets 節點來儲存進度
- Airtable 節點來管理用戶資料
- MySQL/PostgreSQL 節點來儲存到資料庫

### 添加通知功能

可以在進度追蹤 workflow 中添加：
- Slack 節點來發送通知
- Email 節點來寄送完成證書
- Discord 節點來社群互動

### AI 題目生成

可以創建新的 workflow 連接：
- OpenAI GPT 來生成題目
- Claude API 來創建學習內容
- 其他 AI 服務來個人化學習路徑

## 📊 監控和分析

### 使用 n8n 內建功能
- 查看 workflow 執行統計
- 監控 API 調用頻率
- 追蹤錯誤率

### 整合 Google Analytics
- 在進度追蹤中添加 GA 事件
- 追蹤用戶學習行為
- 分析完成率和學習模式