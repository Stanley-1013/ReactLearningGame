/**
 * API 配置檔 - 預留 n8n 整合
 * 
 * 這個檔案集中管理所有 API 端點，方便未來切換到 n8n webhook
 * 所有 API 呼叫都應該使用這裡定義的端點
 */

// 從環境變數讀取 API 基礎 URL，預設為本地開發
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// N8N Webhook URLs (未來可替換)
const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'https://your-n8n-instance.com/webhook';

// 環境配置
const IS_DEVELOPMENT = import.meta.env.VITE_ENVIRONMENT === 'development';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || IS_DEVELOPMENT;

/**
 * API 端點配置 - 支援 n8n webhook 整合
 * 新增主題管理和 AI 題目生成端點
 */
export const API_ENDPOINTS = {
  // 基礎關卡相關 API
  modules: {
    getAll: `${API_BASE_URL}/modules`, // 目前使用本地 JSON
    getById: (id) => `${API_BASE_URL}/modules/${id}`,
    // n8n 主題和模組管理
    n8nGetModules: `${N8N_BASE_URL}/get-learning-themes`,
    n8nSwitchTheme: `${N8N_BASE_URL}/switch-learning-theme`
  },

  // 挑戰關卡相關 API  
  challenge: {
    // 根據環境選擇端點
    getChallenge: USE_MOCK_API ? `${API_BASE_URL}/challenge` : `${N8N_BASE_URL}/get-challenge`,
    submitAnswer: USE_MOCK_API ? `${API_BASE_URL}/challenge/submit` : `${N8N_BASE_URL}/submit-challenge-answer`,
    // 備用端點
    getChallengeLocal: `${API_BASE_URL}/challenge`,
    // AI 題目生成相關
    n8nGetChallenge: `${N8N_BASE_URL}/generate-ai-questions`,
    n8nGenerateQuestion: `${N8N_BASE_URL}/generate-ai-questions`,
    n8nBatchGenerate: `${N8N_BASE_URL}/batch-generate-questions`
  },

  // 主題管理相關 API（新增）
  themes: {
    getAvailable: `${N8N_BASE_URL}/get-available-themes`,
    switchTheme: `${N8N_BASE_URL}/switch-theme`, 
    getUserThemes: `${N8N_BASE_URL}/get-user-themes`,
    saveThemePreference: `${N8N_BASE_URL}/save-theme-preference`
  },

  // 進度追蹤相關 API
  progress: {
    // 可透過 n8n 發送進度到 Slack/Email/數據庫
    updateProgress: `${N8N_BASE_URL}/track-learning-progress`,
    getProgress: `${N8N_BASE_URL}/get-progress`,
    // 可觸發通知的 n8n workflow
    notifyCompletion: `${N8N_BASE_URL}/notify-completion`,
    syncUserData: `${N8N_BASE_URL}/sync-user-data`
  },

  // 統計和分析 API
  analytics: {
    // 發送學習統計到 n8n 進行數據分析
    trackEvent: `${N8N_BASE_URL}/track-event`,
    getAnalytics: `${N8N_BASE_URL}/get-analytics`,
    generateReport: `${N8N_BASE_URL}/generate-learning-report`
  }
};

/**
 * API 呼叫的通用設定
 */
export const API_CONFIG = {
  timeout: 10000, // 10秒超時
  retries: 3,     // 重試3次
  headers: {
    'Content-Type': 'application/json',
    // TODO: 如果 n8n 需要認證，在這裡加入 token
    // 'Authorization': `Bearer ${import.meta.env.VITE_N8N_TOKEN}`
  }
};

/**
 * 開發模式設定
 */
export const DEV_CONFIG = {
  // 是否使用本地模擬資料（開發時）
  // 如果沒有明確設置，預設為開發環境使用本地資料
  useLocalData: import.meta.env.VITE_USE_LOCAL_DATA === 'true' || 
                (IS_DEVELOPMENT && import.meta.env.VITE_USE_LOCAL_DATA !== 'false'),
  // 是否啟用 API 日誌
  enableApiLogs: import.meta.env.VITE_DEBUG_MODE === 'true' || IS_DEVELOPMENT,
  // 模擬 API 延遲（毫秒）
  simulateDelay: parseInt(import.meta.env.VITE_MOCK_DELAY) || 0,
  // 錯誤率（測試用）
  errorRate: parseFloat(import.meta.env.VITE_MOCK_ERROR_RATE) || 0,
  // 當前環境
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  // 是否使用 Mock API（只有明確設置時才使用）
  useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true'
};

/**
 * 通用 API 呼叫函數
 * 包含錯誤處理、重試邏輯、日誌記錄
 */
export async function apiCall(url, options = {}) {
  const config = {
    ...API_CONFIG,
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers
    }
  };

  // 開發模式日誌
  if (DEV_CONFIG.enableApiLogs) {
    console.log(`🌐 API Call: ${url}`, { options: config });
  }

  // 模擬延遲（開發測試用）
  if (DEV_CONFIG.simulateDelay > 0) {
    await new Promise(resolve => setTimeout(resolve, DEV_CONFIG.simulateDelay));
  }

  let lastError;
  
  // 重試邏輯
  for (let attempt = 1; attempt <= config.retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (DEV_CONFIG.enableApiLogs) {
        console.log(`✅ API Success: ${url}`, data);
      }
      
      return data;
      
    } catch (error) {
      lastError = error;
      
      if (DEV_CONFIG.enableApiLogs) {
        console.warn(`⚠️ API Attempt ${attempt} failed: ${url}`, error.message);
      }
      
      // 如果不是最後一次嘗試，等待後重試
      if (attempt < config.retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  // 所有重試都失敗
  console.error(`❌ API Failed after ${config.retries} attempts: ${url}`, lastError);
  throw lastError;
}

/**
 * 專用的 n8n webhook 呼叫函數
 * TODO: 根據實際 n8n 設定調整參數格式
 */
export async function callN8nWebhook(webhookPath, data = {}, method = 'POST') {
  const url = `${N8N_BASE_URL}${webhookPath}`;
  
  // n8n webhook 通常需要特定的資料格式
  const payload = {
    timestamp: new Date().toISOString(),
    source: 'react-learning-game',
    data: data
  };
  
  return apiCall(url, {
    method,
    body: method !== 'GET' ? JSON.stringify(payload) : undefined
  });
}

/**
 * 錯誤處理工具
 */
export class ApiError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

export default {
  API_ENDPOINTS,
  API_CONFIG,
  DEV_CONFIG,
  apiCall,
  callN8nWebhook,
  ApiError
};