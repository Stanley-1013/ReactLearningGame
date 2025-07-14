# n8n 表單資料處理工作流程

## 📋 概述

本文檔詳細說明如何在 n8n 中建立工作流程來處理從 Google Sheets 讀取的表單資料，包括資料清理、分析、通知和自動化回應。

## 🔄 整體架構

```
React App → Google Apps Script → Google Sheets → n8n Workflows → 自動化處理
```

## 📊 工作流程設計

### 工作流程 1：表單資料同步與清理

**觸發條件**：每5分鐘執行一次

```json
{
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "minutes",
              "value": 5
            }
          ]
        }
      }
    },
    {
      "name": "Read Feedback Data", 
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "read",
        "documentId": "YOUR_GOOGLE_SHEET_ID",
        "sheetName": "Feedback",
        "range": "A:L",
        "options": {
          "headerRow": true
        }
      }
    },
    {
      "name": "Filter Unprocessed",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          // 過濾未處理的記錄
          const unprocessed = items.filter(item => {
            return item.json.processed === false || item.json.processed === 'FALSE';
          });
          
          console.log('找到未處理記錄:', unprocessed.length);
          return unprocessed;
        `
      }
    },
    {
      "name": "Process Each Record",
      "type": "n8n-nodes-base.function", 
      "parameters": {
        "functionCode": `
          // 清理和標準化資料
          const processedData = items.map(item => {
            const data = item.json;
            
            return {
              form_type: 'feedback',
              user_id: data.user_id || 'anonymous',
              timestamp: data.timestamp,
              page_context: data.page_context,
              
              // 表單特定欄位
              current_theme: data.current_theme,
              completion_rate: data.completion_rate,
              experience_rating: parseInt(data.experience_rating) || 0,
              satisfaction_score: parseInt(data.satisfaction_score) || 0,
              comments: data.comments || '',
              suggestions: data.suggestions || '',
              
              // 系統欄位
              language: data.language || 'zh-TW',
              user_agent: data.user_agent,
              processed_at: new Date().toISOString(),
              
              // 原始列號（用於標記為已處理）
              sheet_row: data.__row_number
            };
          });
          
          return processedData;
        `
      }
    },
    {
      "name": "Save to Database",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "YOUR_AIRTABLE_BASE_ID",
        "table": "form_responses",
        "operation": "create"
      }
    },
    {
      "name": "Mark as Processed",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "update",
        "documentId": "YOUR_GOOGLE_SHEET_ID", 
        "sheetName": "Feedback",
        "range": "L{{$json.sheet_row}}",
        "values": [["TRUE"]]
      }
    }
  ]
}
```

### 工作流程 2：錯誤回報自動分類與通知

**觸發條件**：新的錯誤回報資料

```json
{
  "nodes": [
    {
      "name": "Database Trigger",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "YOUR_AIRTABLE_BASE_ID",
        "table": "form_responses",
        "event": "record.created",
        "filterByFormula": "{form_type} = 'bug_report'"
      }
    },
    {
      "name": "Classify Bug Severity",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const bugData = $json;
          
          // 自動分類錯誤嚴重程度
          let severity = 'medium';
          let priority = 'normal';
          let category = 'general';
          
          const errorMessage = (bugData.error_message || '').toLowerCase();
          const reproductionSteps = (bugData.reproduction_steps || '').toLowerCase();
          
          // 嚴重性分析
          if (errorMessage.includes('crash') || errorMessage.includes('白畫面') || 
              errorMessage.includes('cannot access')) {
            severity = 'critical';
            priority = 'urgent';
          } else if (errorMessage.includes('slow') || errorMessage.includes('lag') ||
                     errorMessage.includes('performance')) {
            severity = 'medium';
            category = 'performance';
          } else if (errorMessage.includes('ui') || errorMessage.includes('display') ||
                     errorMessage.includes('layout')) {
            severity = 'low';
            category = 'ui';
          }
          
          // 功能分類
          if (bugData.page_context.includes('challenge')) {
            category = 'challenge';
          } else if (bugData.page_context.includes('homepage')) {
            category = 'homepage';
          } else if (bugData.challenge_id) {
            category = 'challenge';
          }
          
          return {
            ...bugData,
            classified_severity: severity,
            classified_priority: priority,
            classified_category: category,
            requires_immediate_attention: severity === 'critical',
            estimated_fix_time: severity === 'critical' ? 'immediate' : 
                               severity === 'high' ? '1-3 days' : 
                               severity === 'medium' ? '1-2 weeks' : '2-4 weeks'
          };
        `
      }
    },
    {
      "name": "Create GitHub Issue",
      "type": "n8n-nodes-base.github",
      "parameters": {
        "owner": "YOUR_GITHUB_USERNAME",
        "repository": "react-learning-game",
        "operation": "create",
        "resource": "issue",
        "title": "[Bug Report] {{$json.error_type}} - {{$json.classified_severity}}",
        "body": `
## 錯誤回報

**回報時間**: {{$json.timestamp}}
**頁面**: {{$json.page_context}}
**嚴重程度**: {{$json.classified_severity}}
**分類**: {{$json.classified_category}}

### 錯誤訊息
{{$json.error_message}}

### 重現步驟
{{$json.reproduction_steps}}

### 使用者環境
- 瀏覽器: {{$json.browser_info}}
- 語言: {{$json.language}}
- 挑戰ID: {{$json.challenge_id}}

### 自動分析
- 預估修復時間: {{$json.estimated_fix_time}}
- 需要立即處理: {{$json.requires_immediate_attention}}

---
*此 Issue 由 n8n 自動建立*
        `,
        "labels": [
          "bug",
          "{{$json.classified_severity}}",
          "{{$json.classified_category}}"
        ]
      }
    },
    {
      "name": "Send Slack Notification",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#dev-alerts",
        "text": `
🐛 新的錯誤回報

**嚴重程度**: {{$json.classified_severity}}
**頁面**: {{$json.page_context}}
**錯誤**: {{$json.error_message}}

GitHub Issue: {{$json.html_url}}
        `,
        "attachments": [
          {
            "color": "{{$json.classified_severity === 'critical' ? 'danger' : $json.classified_severity === 'high' ? 'warning' : 'good'}}",
            "fields": [
              {
                "title": "分類",
                "value": "{{$json.classified_category}}",
                "short": true
              },
              {
                "title": "預估修復時間", 
                "value": "{{$json.estimated_fix_time}}",
                "short": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Critical Bug Alert",
      "type": "n8n-nodes-base.if",
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "{{$json.classified_severity}}",
              "operation": "equal",
              "value2": "critical"
            }
          ]
        }
      }
    },
    {
      "name": "Send Email Alert",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "fromEmail": "alerts@reactlearning.com",
        "toEmail": "dev-team@reactlearning.com",
        "subject": "🚨 CRITICAL BUG ALERT - {{$json.error_type}}",
        "text": `
Critical bug reported in React Learning Game:

Time: {{$json.timestamp}}
Page: {{$json.page_context}}
Error: {{$json.error_message}}

GitHub Issue: {{$json.html_url}}

This requires immediate attention.
        `
      }
    }
  ]
}
```

### 工作流程 3：功能需求分析與優先排序

**觸發條件**：新的功能建議

```json
{
  "nodes": [
    {
      "name": "Feature Request Trigger",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "YOUR_AIRTABLE_BASE_ID",
        "table": "form_responses",
        "event": "record.created",
        "filterByFormula": "{form_type} = 'feature_request'"
      }
    },
    {
      "name": "Analyze Request",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const request = $json;
          
          // 分析功能需求
          const description = (request.description || '').toLowerCase();
          const title = (request.feature_title || '').toLowerCase();
          
          // 複雜度評估
          let complexity = 'medium';
          if (description.includes('ai') || description.includes('machine learning') ||
              description.includes('algorithm')) {
            complexity = 'high';
          } else if (description.includes('ui') || description.includes('color') ||
                     description.includes('text')) {
            complexity = 'low';
          }
          
          // 類別分類
          let category = 'general';
          if (title.includes('theme') || description.includes('主題')) {
            category = 'themes';
          } else if (title.includes('challenge') || description.includes('挑戰')) {
            category = 'challenges';
          } else if (title.includes('ai') || description.includes('ai')) {
            category = 'ai';
          } else if (title.includes('ui') || description.includes('interface')) {
            category = 'ui';
          }
          
          // 影響範圍
          let impact = request.priority === 'high' ? 'high' : 'medium';
          
          return {
            ...request,
            analyzed_complexity: complexity,
            analyzed_category: category,
            analyzed_impact: impact,
            estimated_development_time: complexity === 'high' ? '2-4 weeks' :
                                      complexity === 'medium' ? '1-2 weeks' : '2-5 days',
            requires_design: category === 'ui' || category === 'themes'
          };
        `
      }
    },
    {
      "name": "Create Product Backlog Item",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "YOUR_PRODUCT_BACKLOG_BASE_ID",
        "table": "feature_requests",
        "operation": "create",
        "data": {
          "title": "{{$json.feature_title}}",
          "description": "{{$json.description}}",
          "category": "{{$json.analyzed_category}}",
          "complexity": "{{$json.analyzed_complexity}}",
          "impact": "{{$json.analyzed_impact}}",
          "estimated_time": "{{$json.estimated_development_time}}",
          "user_priority": "{{$json.priority}}",
          "source": "user_feedback",
          "submitted_by": "{{$json.user_id}}",
          "submitted_at": "{{$json.timestamp}}",
          "status": "new",
          "requires_design": "{{$json.requires_design}}"
        }
      }
    },
    {
      "name": "Notify Product Team",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#product",
        "text": `
💡 新功能建議

**標題**: {{$json.feature_title}}
**類別**: {{$json.analyzed_category}}
**複雜度**: {{$json.analyzed_complexity}}
**預估開發時間**: {{$json.estimated_development_time}}

**描述**: {{$json.description}}

已添加到產品待辦清單 📋
        `
      }
    }
  ]
}
```

### 工作流程 4：學習資料分析與個人化建議

**觸發條件**：定期分析（每日）

```json
{
  "nodes": [
    {
      "name": "Daily Analysis Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "value": 24
            }
          ]
        }
      }
    },
    {
      "name": "Fetch Survey Data",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "YOUR_AIRTABLE_BASE_ID",
        "table": "form_responses",
        "operation": "list",
        "filterByFormula": "AND({form_type} = 'survey', {processed_at} >= DATETIME_DIFF(NOW(), 7, 'days'))"
      }
    },
    {
      "name": "Analyze Learning Patterns",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const surveyData = items.map(item => item.json);
          
          // 分析學習模式
          const analysis = {
            total_responses: surveyData.length,
            learning_goals: {},
            current_levels: {},
            preferred_topics: {},
            study_time_patterns: {},
            common_challenges: {},
            feature_requests: {}
          };
          
          surveyData.forEach(response => {
            // 統計學習目標
            const goals = response.learning_goals ? response.learning_goals.split(',') : [];
            goals.forEach(goal => {
              const trimmedGoal = goal.trim();
              analysis.learning_goals[trimmedGoal] = (analysis.learning_goals[trimmedGoal] || 0) + 1;
            });
            
            // 統計當前程度
            const level = response.current_level;
            if (level) {
              analysis.current_levels[level] = (analysis.current_levels[level] || 0) + 1;
            }
            
            // 統計偏好主題
            const topics = response.preferred_topics ? response.preferred_topics.split(',') : [];
            topics.forEach(topic => {
              const trimmedTopic = topic.trim();
              analysis.preferred_topics[trimmedTopic] = (analysis.preferred_topics[trimmedTopic] || 0) + 1;
            });
            
            // 統計學習時間
            const studyTime = response.study_time;
            if (studyTime) {
              analysis.study_time_patterns[studyTime] = (analysis.study_time_patterns[studyTime] || 0) + 1;
            }
            
            // 統計常見挑戰
            const challenges = response.challenges_faced ? response.challenges_faced.split(',') : [];
            challenges.forEach(challenge => {
              const trimmedChallenge = challenge.trim();
              analysis.common_challenges[trimmedChallenge] = (analysis.common_challenges[trimmedChallenge] || 0) + 1;
            });
          });
          
          // 生成洞察
          const insights = {
            most_common_goal: Object.keys(analysis.learning_goals).reduce((a, b) => 
              analysis.learning_goals[a] > analysis.learning_goals[b] ? a : b, ''),
            dominant_level: Object.keys(analysis.current_levels).reduce((a, b) => 
              analysis.current_levels[a] > analysis.current_levels[b] ? a : b, ''),
            top_requested_topic: Object.keys(analysis.preferred_topics).reduce((a, b) => 
              analysis.preferred_topics[a] > analysis.preferred_topics[b] ? a : b, ''),
            main_challenge: Object.keys(analysis.common_challenges).reduce((a, b) => 
              analysis.common_challenges[a] > analysis.common_challenges[b] ? a : b, '')
          };
          
          return {
            analysis,
            insights,
            generated_at: new Date().toISOString()
          };
        `
      }
    },
    {
      "name": "Generate Recommendations",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const { analysis, insights } = $json;
          
          const recommendations = [];
          
          // 基於最常見的學習目標生成建議
          if (insights.most_common_goal.includes('job') || insights.most_common_goal.includes('career')) {
            recommendations.push({
              type: 'content',
              priority: 'high',
              title: '增加職場導向內容',
              description: '用戶主要以就業為學習目標，建議增加實務專案和面試準備內容'
            });
          }
          
          // 基於主要挑戰生成建議
          if (insights.main_challenge.includes('time') || insights.main_challenge.includes('時間')) {
            recommendations.push({
              type: 'feature',
              priority: 'medium',
              title: '短時間學習模式',
              description: '考慮添加5-10分鐘的微學習單元，適合忙碌的學習者'
            });
          }
          
          if (insights.main_challenge.includes('difficult') || insights.main_challenge.includes('難')) {
            recommendations.push({
              type: 'content',
              priority: 'high',
              title: '調整內容難度',
              description: '當前內容對部分用戶過於困難，建議增加更多基礎內容和漸進式練習'
            });
          }
          
          // 基於偏好主題生成建議
          if (insights.top_requested_topic) {
            recommendations.push({
              type: 'content',
              priority: 'medium',
              title: \`增加 \${insights.top_requested_topic} 相關內容\`,
              description: \`\${insights.top_requested_topic} 是用戶最感興趣的主題，建議優先開發相關課程\`
            });
          }
          
          return {
            recommendations,
            analysis_summary: insights,
            total_responses: analysis.total_responses
          };
        `
      }
    },
    {
      "name": "Save Analysis Report",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "YOUR_ANALYTICS_BASE_ID",
        "table": "learning_analysis",
        "operation": "create",
        "data": {
          "date": "{{$now}}",
          "total_responses": "{{$json.total_responses}}",
          "insights": "{{JSON.stringify($json.analysis_summary)}}",
          "recommendations": "{{JSON.stringify($json.recommendations)}}",
          "report_type": "weekly_learning_survey"
        }
      }
    },
    {
      "name": "Share with Team",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#analytics",
        "text": `
📊 每日學習資料分析報告

**回應數**: {{$json.total_responses}}

**主要洞察**:
• 最常見學習目標: {{$json.analysis_summary.most_common_goal}}
• 主要學習程度: {{$json.analysis_summary.dominant_level}}
• 最受歡迎主題: {{$json.analysis_summary.top_requested_topic}}
• 主要挑戰: {{$json.analysis_summary.main_challenge}}

**建議數量**: {{$json.recommendations.length}}

詳細報告已儲存到 Airtable 📋
        `
      }
    }
  ]
}
```

## 🚀 部署指南

### 第一步：建立 n8n 實例

1. **本地部署**（開發用）：
```bash
npx n8n
```

2. **雲端部署**（推薦）：
   - 使用 n8n.cloud
   - 或部署到 Docker/Heroku

### 第二步：設定連接

1. **Google Sheets 連接**：
   - 設定 Google 服務帳戶
   - 取得認證 JSON 檔案
   - 在 n8n 中新增 Google Sheets 認證

2. **Airtable 連接**：
   - 取得 Airtable API Key
   - 設定基礎表格 ID

3. **Slack 連接**：
   - 建立 Slack App
   - 取得 Bot Token
   - 設定頻道權限

4. **GitHub 連接**：
   - 產生 Personal Access Token
   - 設定 Repository 權限

### 第三步：匯入工作流程

1. 複製上述 JSON 配置
2. 在 n8n 中建立新工作流程
3. 貼上 JSON 並調整參數
4. 測試每個節點

### 第四步：設定監控

1. **錯誤處理**：
   - 在每個工作流程中添加錯誤處理節點
   - 設定錯誤通知

2. **執行日誌**：
   - 啟用詳細日誌記錄
   - 定期檢查執行狀態

## 📈 擴展建議

1. **AI 分析**：整合 OpenAI API 進行文本分析
2. **即時通知**：使用 WebSocket 進行即時更新
3. **資料視覺化**：整合 Grafana 或 Tableau
4. **A/B 測試**：基於用戶回饋進行功能測試

## 🔒 安全性與隱私

- 所有 API 金鑰使用環境變數
- 敏感資料加密儲存
- 定期檢查存取權限
- 遵循 GDPR 資料保護規範