/**
 * n8n 連接測試腳本
 * 用於驗證 n8n webhook 是否正確設定
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 載入環境變數
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const N8N_BASE_URL = process.env.VITE_N8N_BASE_URL;

console.log('🧪 開始測試 n8n 連接...');
console.log('📍 n8n URL:', N8N_BASE_URL);

// 測試主題 API
async function testThemeAPI() {
  console.log('\\n1️⃣ 測試主題切換 API...');
  
  const testData = {
    timestamp: new Date().toISOString(),
    source: 'react-learning-game',
    action: 'get_themes',
    data: {
      language_code: 'zh-TW',
      topic_category: 'advanced-hooks',
      selected_theme_id: 'advanced-hooks'
    }
  };

  try {
    const response = await fetch(`${N8N_BASE_URL}/get-learning-themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ 主題 API 測試成功');
      console.log('📦 收到模組數量:', data.modules?.length || 0);
      console.log('🎯 主題 ID:', data.theme?.id);
      return true;
    } else {
      console.log('❌ 主題 API 測試失敗');
      console.log('📊 狀態碼:', response.status);
      console.log('📄 回應:', await response.text());
      return false;
    }
  } catch (error) {
    console.log('❌ 主題 API 連接錯誤:', error.message);
    return false;
  }
}

// 測試進度追蹤 API
async function testProgressAPI() {
  console.log('\\n2️⃣ 測試進度追蹤 API...');
  
  const testData = {
    timestamp: new Date().toISOString(),
    source: 'react-learning-game',
    action: 'track_progress',
    data: {
      user_id: 'test-user-' + Date.now(),
      module_id: 1,
      theme_id: 'advanced-hooks',
      completed: true,
      score: 100,
      time_spent: 120,
      language_code: 'zh-TW'
    }
  };

  try {
    const response = await fetch(`${N8N_BASE_URL}/track-learning-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ 進度追蹤 API 測試成功');
      console.log('📊 回應訊息:', data.message);
      console.log('🎯 追蹤成功:', data.success);
      return true;
    } else {
      console.log('❌ 進度追蹤 API 測試失敗');
      console.log('📊 狀態碼:', response.status);
      console.log('📄 回應:', await response.text());
      return false;
    }
  } catch (error) {
    console.log('❌ 進度追蹤 API 連接錯誤:', error.message);
    return false;
  }
}

// 檢查 n8n URL 設定
function checkConfiguration() {
  console.log('\\n🔧 檢查設定...');
  
  if (!N8N_BASE_URL) {
    console.log('❌ 未設定 VITE_N8N_BASE_URL 環境變數');
    console.log('📝 請在 .env.local 中設定您的 n8n webhook URL');
    return false;
  }
  
  if (N8N_BASE_URL.includes('YOUR_N8N_INSTANCE_URL')) {
    console.log('❌ 請將 YOUR_N8N_INSTANCE_URL 替換為實際的 n8n URL');
    console.log('📝 格式: https://your-domain.app.n8n.cloud/webhook');
    return false;
  }
  
  console.log('✅ n8n URL 設定正確');
  return true;
}

// 主要測試函數
async function runTests() {
  console.log('🎮 React 學習遊戲 - n8n 連接測試');
  console.log('=' .repeat(50));
  
  // 檢查設定
  if (!checkConfiguration()) {
    process.exit(1);
  }
  
  // 執行測試
  const themeTestPassed = await testThemeAPI();
  const progressTestPassed = await testProgressAPI();
  
  // 測試結果
  console.log('\\n📋 測試結果總結');
  console.log('=' .repeat(30));
  console.log('主題 API:', themeTestPassed ? '✅ 通過' : '❌ 失敗');
  console.log('進度追蹤 API:', progressTestPassed ? '✅ 通過' : '❌ 失敗');
  
  if (themeTestPassed && progressTestPassed) {
    console.log('\\n🎉 所有測試通過！n8n 整合成功！');
    console.log('💡 現在可以重啟 React 應用來使用 n8n API');
    console.log('🚀 執行: npm run dev');
  } else {
    console.log('\\n⚠️ 部分測試失敗，請檢查：');
    console.log('1. n8n workflow 是否已匯入並啟用');
    console.log('2. webhook URL 是否正確');
    console.log('3. CORS 設定是否正確');
    console.log('4. 網路連接是否正常');
  }
}

// 執行測試
runTests().catch(error => {
  console.error('🚨 測試執行錯誤:', error);
  process.exit(1);
});