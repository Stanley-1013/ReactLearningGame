# Google Apps Script 橋接服務設定指南

## 📋 概述

由於 Google Forms API 不支援直接提交表單回應，我們使用 Google Apps Script 作為橋接服務，將應用程式的表單資料轉換為 Google Sheets 記錄，供 n8n 工作流程讀取和處理。

## 🔧 設定步驟

### 第一步：建立 Google Sheets

1. **建立新的 Google Sheets**：
   - 前往 [Google Sheets](https://sheets.google.com)
   - 建立新的試算表，命名為「React Learning Game - Form Responses」

2. **設定工作表結構**：

**工作表1: Feedback（意見回饋）**
```
A1: timestamp          | B1: user_id         | C1: page_context
D1: current_theme      | E1: completion_rate | F1: experience_rating
G1: satisfaction_score | H1: comments        | I1: suggestions
J1: language          | K1: user_agent      | L1: processed
```

**工作表2: Bug_Reports（錯誤回報）**
```
A1: timestamp          | B1: user_id         | C1: page_context  
D1: error_type        | E1: error_message   | F1: reproduction_steps
G1: browser_info      | H1: challenge_id    | I1: severity
J1: language          | K1: user_agent      | L1: processed
```

**工作表3: Feature_Requests（功能建議）**
```
A1: timestamp          | B1: user_id         | C1: page_context
D1: feature_title     | E1: description     | F1: priority
G1: category          | H1: use_case        | I1: existing_workaround
J1: language          | K1: user_agent      | L1: processed
```

**工作表4: Surveys（學習調查）**
```
A1: timestamp          | B1: user_id         | C1: page_context
D1: learning_goals    | E1: current_level   | F1: preferred_topics
G1: study_time        | H1: learning_style  | I1: challenges_faced
J1: feature_requests  | K1: language        | L1: user_agent
M1: processed
```

### 第二步：建立 Google Apps Script

1. **開啟 Apps Script**：
   - 在 Google Sheets 中，點選「擴充功能」→「Apps Script」

2. **建立專案**：
   - 專案名稱：「React Learning Game Form Bridge」

3. **貼上以下程式碼**：

```javascript
/**
 * React 學習遊戲表單橋接服務
 * 接收來自前端的表單資料，寫入對應的 Google Sheets
 */

// 表單類型對應的工作表名稱
const SHEET_MAPPING = {
  'feedback': 'Feedback',
  'bug_report': 'Bug_Reports', 
  'feature_request': 'Feature_Requests',
  'survey': 'Surveys'
};

/**
 * 處理 POST 請求
 */
function doPost(e) {
  try {
    // 解析請求資料
    const requestData = JSON.parse(e.postData.contents);
    const { formType, data, timestamp, language } = requestData;
    
    // 驗證請求
    if (!formType || !data) {
      return createResponse(false, 'Missing required fields: formType, data');
    }
    
    // 獲取對應的工作表
    const sheetName = SHEET_MAPPING[formType];
    if (!sheetName) {
      return createResponse(false, `Unsupported form type: ${formType}`);
    }
    
    // 寫入資料
    const result = writeToSheet(sheetName, formType, data);
    
    // 記錄操作日誌
    console.log(`Form submission processed: ${formType}`, result);
    
    return createResponse(true, 'Form data saved successfully', {
      formType,
      timestamp: new Date().toISOString(),
      rowId: result.rowId
    });
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return createResponse(false, `Server error: ${error.message}`);
  }
}

/**
 * 處理 GET 請求（用於測試）
 */
function doGet(e) {
  const testData = {
    formType: 'feedback',
    data: {
      experience_rating: '5',
      satisfaction_score: '4',
      comments: 'Test feedback from Apps Script',
      current_theme: 'React 基礎',
      page_context: '/test'
    },
    timestamp: new Date().toISOString(),
    language: 'zh-TW'
  };
  
  return doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
}

/**
 * 寫入資料到指定工作表
 */
function writeToSheet(sheetName, formType, data) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error(`Sheet not found: ${sheetName}`);
  }
  
  // 準備資料列
  const rowData = prepareRowData(formType, data);
  
  // 添加時間戳記和處理狀態
  rowData.unshift(new Date().toISOString()); // timestamp
  rowData.push(false); // processed (預設為 false)
  
  // 寫入新列
  sheet.appendRow(rowData);
  
  // 返回寫入結果
  const lastRow = sheet.getLastRow();
  return {
    rowId: lastRow,
    sheetName: sheetName,
    dataLength: rowData.length
  };
}

/**
 * 根據表單類型準備資料列
 */
function prepareRowData(formType, data) {
  switch (formType) {
    case 'feedback':
      return [
        data.user_id || 'anonymous',
        data.page_context || '',
        data.current_theme || '',
        data.completion_rate || '',
        data.experience_rating || '',
        data.satisfaction_score || '',
        data.comments || '',
        data.suggestions || '',
        data.language || 'zh-TW',
        data.user_agent || ''
      ];
      
    case 'bug_report':
      return [
        data.user_id || 'anonymous',
        data.page_context || '',
        data.error_type || '',
        data.error_message || '',
        data.reproduction_steps || '',
        data.browser_info || '',
        data.challenge_id || '',
        data.severity || 'medium',
        data.language || 'zh-TW',
        data.user_agent || ''
      ];
      
    case 'feature_request':
      return [
        data.user_id || 'anonymous',
        data.page_context || '',
        data.feature_title || '',
        data.description || '',
        data.priority || 'medium',
        data.category || '',
        data.use_case || '',
        data.existing_workaround || '',
        data.language || 'zh-TW',
        data.user_agent || ''
      ];
      
    case 'survey':
      return [
        data.user_id || 'anonymous',
        data.page_context || '',
        data.learning_goals || '',
        data.current_level || '',
        data.preferred_topics || '',
        data.study_time || '',
        data.learning_style || '',
        data.challenges_faced || '',
        data.feature_requests || '',
        data.language || 'zh-TW',
        data.user_agent || ''
      ];
      
    default:
      throw new Error(`Unsupported form type: ${formType}`);
  }
}

/**
 * 建立標準化回應
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * 處理 OPTIONS 請求（CORS 預檢）
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * 取得表單統計資料（供 n8n 使用）
 */
function getFormStats() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const stats = {};
  
  Object.values(SHEET_MAPPING).forEach(sheetName => {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet) {
      stats[sheetName] = {
        totalRows: sheet.getLastRow() - 1, // 扣除標題列
        lastUpdated: sheet.getRange(sheet.getLastRow(), 1).getValue()
      };
    }
  });
  
  return stats;
}
```

### 第三步：部署 Apps Script

1. **設定觸發條件**：
   - 點選「觸發條件」→「新增觸發條件」
   - 函數：`doPost`
   - 事件來源：「來自網頁」
   - 儲存

2. **部署為網路應用程式**：
   - 點選「部署」→「新增部署作業」
   - 類型：「網路應用程式」
   - 說明：「React Learning Game Form Bridge v1.0」
   - 執行身分：「我」
   - 存取權限：「任何人」
   - 部署

3. **複製網路應用程式 URL**：
   - 複製產生的 URL，格式類似：
   - `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

### 第四步：測試 Apps Script

使用以下 curl 指令測試：

```bash
curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "feedback",
    "data": {
      "experience_rating": "5",
      "satisfaction_score": "4", 
      "comments": "測試意見回饋",
      "current_theme": "React 基礎",
      "page_context": "/homepage"
    },
    "timestamp": "2025-01-13T10:30:00Z",
    "language": "zh-TW"
  }'
```

## 🔄 整合到 React 應用程式

更新 `src/services/n8nService.js` 中的表單服務：

```javascript
// 新增表單提交服務
export const formService = {
  /**
   * 提交表單資料到 Google Apps Script
   */
  async submitForm(formType, formData) {
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    const requestData = {
      formType,
      data: formData,
      timestamp: new Date().toISOString(),
      language: 'zh-TW' // 可從 context 取得
    };
    
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ 表單提交成功:', result);
        return result;
      } else {
        throw new Error(result.message);
      }
      
    } catch (error) {
      console.error('❌ 表單提交失敗:', error);
      throw error;
    }
  }
};
```

## 📊 資料流程

1. **前端表單提交** → 2. **Google Apps Script** → 3. **Google Sheets** → 4. **n8n 讀取** → 5. **資料處理**

## 🔒 安全性考量

- Apps Script 使用 HTTPS 加密傳輸
- 可設定 CORS 限制存取來源
- 敏感資料應在前端先進行處理
- 定期檢查 Google Sheets 存取權限

## 📈 監控與維護

- 定期檢查 Google Sheets 資料完整性
- 監控 Apps Script 執行日誌
- 設定 n8n 自動化處理工作流程
- 建立資料備份機制