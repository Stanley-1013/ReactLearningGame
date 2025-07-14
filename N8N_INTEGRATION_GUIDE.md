# React 學習遊戲 n8n 整合指南

## 📋 概述

本指南詳細說明如何將 React 學習遊戲與 n8n 整合，實現動態主題更換和 AI 題目生成功能。

## 🔧 已實作功能

### ✅ 1. 學習主題更換 API 整合
- **位置**: `src/services/n8nService.js` - `themeService`
- **UI 組件**: `src/components/ThemeSelector.jsx`
- **Hook**: `src/hooks/useThemes.js`
- **整合點**: HomePage 組件中的主題選擇器

### ✅ 2. AI 題目生成 API 整合  
- **位置**: `src/services/aiQuestionGenerator.js`
- **Hook**: `src/hooks/useChallenge.js` (已更新)
- **UI 組件**: ChallengePage 組件中的 AI 控制面板
- **功能**: 智能題目生成、難度調整、個人化推薦

### ✅ 3. n8n Webhook 處理層
- **服務層**: `src/services/n8nService.js`
- **API 配置**: `src/config/apiConfig.js` (已更新)
- **錯誤處理**: 自動降級到本地資料

## 🌐 n8n Webhook 端點設計

### 必要的 Webhook 端點

```
基礎 URL: https://your-n8n-instance.com/webhook

主題管理:
- GET  /get-learning-themes     # 獲取可用主題
- POST /switch-learning-theme   # 切換主題

AI 題目生成:
- POST /generate-ai-questions   # 生成單一題目
- POST /batch-generate-questions # 批量生成題目

進度追蹤:
- POST /track-learning-progress # 追蹤學習進度
- POST /sync-user-data         # 同步用戶資料
```

## 📡 API 通信格式

### 🔄 變數命名規範

遵循 **snake_case** 命名規範，確保與 n8n 變數相容：

```javascript
// ✅ 正確命名
topic_category        // 主題類別
difficulty_level      // 難度等級  
question_type         // 題目類型
language_code         // 語言代碼
user_progress         // 用戶進度

// ❌ 避免使用
topicCategory         // camelCase
topic-category        // kebab-case
TOPIC_CATEGORY        // UPPER_CASE
```

### 📤 標準請求格式

所有 n8n webhook 請求都使用統一格式：

```json
{
  "timestamp": "2025-01-13T10:30:00Z",
  "source": "react-learning-game", 
  "action": "get_themes | generate_questions | track_progress",
  "data": {
    "language_code": "zh-TW",
    "difficulty_level": "intermediate",
    "topic_category": "react-basics",
    "user_progress": {
      "completed_modules": [1, 2, 3],
      "current_level": 4
    }
  }
}
```

### 📥 標準響應格式

```json
{
  "success": true,
  "data": {
    "themes": [...] | "questions": [...] | "progress": {...}
  },
  "meta": {
    "generated_at": "2025-01-13T10:30:00Z",
    "total_count": 10,
    "cache_expires": 3600,
    "version": "1.0"
  }
}
```

## 🎯 主題更換 Workflow 設計

### n8n Workflow: `get-learning-themes`

```json
{
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "get-learning-themes",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Process Request",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          // 解析請求參數
          const { language_code, difficulty_level } = $json.data;
          
          // 設定輸出變數 (使用 snake_case)
          return {
            user_language: language_code,
            filter_difficulty: difficulty_level,
            request_timestamp: $json.timestamp
          };
        `
      }
    },
    {
      "name": "Get Themes from Database",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "your_base_id",
        "table": "learning_themes",
        "operation": "list"
      }
    },
    {
      "name": "Format Response",
      "type": "n8n-nodes-base.function", 
      "parameters": {
        "functionCode": `
          const themes = $json.records.map(record => ({
            id: record.fields.theme_id,
            name: record.fields.theme_name,
            category: record.fields.topic_category,
            difficulty: record.fields.difficulty_level,
            module_count: record.fields.module_count || 0,
            estimated_time: record.fields.estimated_time || 120
          }));
          
          return {
            success: true,
            data: { themes },
            meta: {
              generated_at: new Date().toISOString(),
              total_count: themes.length
            }
          };
        `
      }
    }
  ]
}
```

## 🤖 AI 題目生成 Workflow 設計

### n8n Workflow: `generate-ai-questions`

```json
{
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "generate-ai-questions",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Extract Parameters", 
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const { 
            topic_category, 
            difficulty_level, 
            question_type,
            language_code,
            user_context 
          } = $json.data;
          
          return {
            ai_topic: topic_category,
            ai_difficulty: difficulty_level,
            ai_type: question_type,
            ai_language: language_code,
            user_level: user_context?.competency_level || 'intermediate'
          };
        `
      }
    },
    {
      "name": "Generate with ChatGPT",
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "parameters": {
        "model": "gpt-4",
        "messages": {
          "values": [
            {
              "role": "system",
              "content": "你是專業的 React 教學專家，專門生成程式碼排序題目。請根據以下參數生成題目：\n\n主題: {{$json.ai_topic}}\n難度: {{$json.ai_difficulty}}\n語言: {{$json.ai_language}}\n\n請以 JSON 格式回傳，包含 prompt, codeBlocks, answerOrder, hints 等欄位。"
            }
          ]
        }
      }
    },
    {
      "name": "Format AI Response",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const aiContent = JSON.parse($json.choices[0].message.content);
          
          return {
            success: true,
            data: {
              question: {
                id: 'ai-' + Date.now(),
                prompt: aiContent.prompt,
                codeBlocks: aiContent.codeBlocks || [],
                answerOrder: aiContent.answerOrder || [],
                hints: aiContent.hints || [],
                source: 'ai-generated',
                generated_at: new Date().toISOString()
              }
            },
            meta: {
              generated_at: new Date().toISOString(),
              model: 'gpt-4'
            }
          };
        `
      }
    }
  ]
}
```

## 📊 進度追蹤 Workflow 設計

### n8n Workflow: `track-learning-progress`

```json
{
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook", 
      "parameters": {
        "path": "track-learning-progress",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Extract Progress Data",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const { user_progress, action, timestamp } = $json.data;
          
          return {
            user_id: user_progress.user_id || 'anonymous',
            action_type: action,
            progress_data: user_progress,
            event_timestamp: timestamp
          };
        `
      }
    },
    {
      "name": "Save to Database",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "your_base_id",
        "table": "user_progress",
        "operation": "create",
        "data": {
          "user_id": "={{$json.user_id}}",
          "action": "={{$json.action_type}}",
          "data": "={{JSON.stringify($json.progress_data)}}",
          "timestamp": "={{$json.event_timestamp}}"
        }
      }
    },
    {
      "name": "Send Notification (Optional)",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#learning-analytics",
        "text": "用戶學習進度更新: {{$json.action_type}}"
      }
    }
  ]
}
```

## ⚙️ 環境變數設定

在您的 React 專案中設定以下環境變數：

```bash
# .env 文件
VITE_N8N_BASE_URL=https://your-n8n-instance.com/webhook
VITE_N8N_TOKEN=your_n8n_api_token
VITE_ENVIRONMENT=production
VITE_USE_MOCK_API=false
VITE_USE_LOCAL_DATA=false
```

## 🚀 部署步驟

### 1. 前端部署
```bash
# 建置專案
npm run build

# 確保環境變數正確設定
echo $VITE_N8N_BASE_URL

# 部署到 Vercel/Netlify
vercel --prod
```

### 2. n8n Workflow 部署
```bash
# 1. 登入 n8n 實例
# 2. 導入上述 workflow JSON
# 3. 設定資料庫連接 (Airtable/Postgres)
# 4. 配置 ChatGPT API 金鑰
# 5. 測試每個 webhook 端點
```

### 3. 測試驗證
```bash
# 測試主題 API
curl -X POST https://your-n8n-instance.com/webhook/get-learning-themes \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2025-01-13T10:30:00Z",
    "source": "react-learning-game",
    "action": "get_themes",
    "data": {
      "language_code": "zh-TW",
      "difficulty_level": "intermediate"
    }
  }'

# 測試 AI 生成 API  
curl -X POST https://your-n8n-instance.com/webhook/generate-ai-questions \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2025-01-13T10:30:00Z", 
    "source": "react-learning-game",
    "action": "generate_questions",
    "data": {
      "topic_category": "react-basics",
      "difficulty_level": "intermediate",
      "question_type": "code-blocks",
      "language_code": "zh-TW"
    }
  }'
```

## 🛠️ 開發模式

在開發階段，系統會自動降級到本地資料：

```javascript
// 開發模式設定
export const DEV_CONFIG = {
  useLocalData: true,        // 使用本地 modules.json
  useMockApi: false,         // 不使用 Mock API
  enableApiLogs: true,       // 啟用 API 日誌
  simulateDelay: 1000        // 模擬網路延遲
};
```

## 📝 最佳實踐

### ✅ Do's
- 使用 snake_case 變數命名
- 實作完整的錯誤處理
- 提供降級機制
- 記錄詳細的 API 日誌
- 快取頻繁請求的資料

### ❌ Don'ts  
- 避免在 webhook 中處理敏感資料
- 不要省略錯誤處理
- 避免硬編碼 URL 和參數
- 不要忽略 API 響應時間
- 避免過度頻繁的 API 調用

## 🔍 疑難排解

### 常見問題

1. **n8n Webhook 無響應**
   - 檢查 webhook URL 是否正確
   - 確認 n8n 實例運行狀態
   - 查看 n8n workflow 執行日誌

2. **AI 題目生成失敗**
   - 檢查 ChatGPT API 金鑰
   - 確認 prompt 格式正確
   - 查看 API 使用額度

3. **主題切換無效果**
   - 確認 Airtable 連接設定
   - 檢查資料格式相容性
   - 查看網路連接狀態

### 監控建議

```javascript
// 在 n8n workflow 中添加監控
{
  "name": "Monitor Performance",
  "type": "n8n-nodes-base.function",
  "parameters": {
    "functionCode": `
      const startTime = new Date($json.timestamp);
      const endTime = new Date();
      const responseTime = endTime - startTime;
      
      // 記錄效能指標
      console.log('API Response Time:', responseTime, 'ms');
      
      return $json;
    `
  }
}
```

## 📞 技術支援

如有問題或需要協助，請參考：
- [n8n 官方文件](https://docs.n8n.io/)
- [React 學習遊戲 GitHub Issues](https://github.com/your-repo/issues)
- 專案 README.md 文件

---

🎯 **成功整合後，您的 React 學習遊戲將擁有:**
- 🎨 動態主題切換功能
- 🤖 AI 驅動的個人化題目生成  
- 📊 智能學習進度追蹤
- 🔄 完整的錯誤處理和降級機制