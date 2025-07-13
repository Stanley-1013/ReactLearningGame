#!/usr/bin/env node

/**
 * API 測試腳本
 * 
 * 用於測試 Mock API 和將來的 n8n 集成
 * 運行方式: node scripts/test-api.js
 */

import http from 'http';

// 配置
const CONFIG = {
  host: 'localhost',
  port: 3001,
  timeout: 5000
};

/**
 * HTTP 請求工具函數
 */
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    
    const options = {
      hostname: CONFIG.host,
      port: CONFIG.port,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData && { 'Content-Length': Buffer.byteLength(postData) })
      },
      timeout: CONFIG.timeout
    };

    const req = http.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: parsedBody
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

/**
 * 測試健康檢查
 */
async function testHealth() {
  console.log('🏥 測試健康檢查...');
  try {
    const response = await makeRequest('/health');
    console.log('✅ 健康檢查成功:', response.data.message);
    return true;
  } catch (error) {
    console.error('❌ 健康檢查失敗:', error.message);
    return false;
  }
}

async function waitForServer() {
  console.log('⏳ 等待服務器啟動...');
  for (let i = 0; i < 10; i++) {
    try {
      await makeRequest('/health');
      console.log('✅ 服務器已啟動');
      return true;
    } catch (error) {
      if (i < 9) {
        process.stdout.write('.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  console.log('\n❌ 服務器啟動超時');
  return false;
}

/**
 * 測試獲取挑戰
 */
async function testGetChallenge() {
  console.log('\n🎯 測試獲取挑戰...');
  try {
    const response = await makeRequest('/challenge');
    
    if (response.status === 200) {
      const challenge = response.data;
      console.log('✅ 獲取挑戰成功:');
      console.log(`   ID: ${challenge.id}`);
      console.log(`   提示: ${challenge.prompt.substring(0, 50)}...`);
      console.log(`   程式碼區塊數量: ${challenge.codeBlocks.length}`);
      console.log(`   正確答案: [${challenge.correctAnswer.join(', ')}]`);
      console.log(`   提示數量: ${challenge.hints ? challenge.hints.length : 0}`);
      return challenge;
    } else {
      console.error('❌ 獲取挑戰失敗:', response.data);
      return null;
    }
  } catch (error) {
    console.error('❌ 獲取挑戰錯誤:', error.message);
    return null;
  }
}

/**
 * 測試提交答案
 */
async function testSubmitAnswer(challenge, userAnswer = null) {
  console.log('\n📝 測試提交答案...');
  
  if (!challenge) {
    console.log('⚠️  沒有挑戰資料，跳過答案提交測試');
    return;
  }

  try {
    // 如果沒有提供答案，使用正確答案的一個變化版本
    const testAnswer = userAnswer || challenge.correctAnswer.slice(0, -1);
    
    const response = await makeRequest('/challenge/submit', 'POST', {
      challengeId: challenge.id,
      userAnswer: testAnswer
    });
    
    if (response.status === 200) {
      const result = response.data;
      console.log('✅ 提交答案成功:');
      console.log(`   是否正確: ${result.isCorrect ? '是' : '否'}`);
      console.log(`   得分: ${result.score}%`);
      console.log(`   反饋: ${result.feedback}`);
      console.log(`   提交的答案: [${result.userAnswer.join(', ')}]`);
      return result;
    } else {
      console.error('❌ 提交答案失敗:', response.data);
      return null;
    }
  } catch (error) {
    console.error('❌ 提交答案錯誤:', error.message);
    return null;
  }
}

/**
 * 測試獲取挑戰列表
 */
async function testGetChallenges() {
  console.log('\n📋 測試獲取挑戰列表...');
  try {
    const response = await makeRequest('/challenges');
    
    if (response.status === 200) {
      const data = response.data;
      console.log('✅ 獲取挑戰列表成功:');
      console.log(`   總挑戰數: ${data.total}`);
      data.challenges.forEach((challenge, index) => {
        console.log(`   ${index + 1}. ${challenge.id} (${challenge.difficulty}) - ${challenge.blocksCount} 個區塊`);
      });
      return data;
    } else {
      console.error('❌ 獲取挑戰列表失敗:', response.data);
      return null;
    }
  } catch (error) {
    console.error('❌ 獲取挑戰列表錯誤:', error.message);
    return null;
  }
}

/**
 * 測試錯誤處理
 */
async function testErrorHandling() {
  console.log('\n🔥 測試錯誤處理...');
  try {
    const response = await makeRequest('/nonexistent');
    console.log(`✅ 404錯誤處理正常: ${response.status} - ${response.data.message}`);
  } catch (error) {
    console.error('❌ 錯誤處理測試失敗:', error.message);
  }
}

/**
 * 效能測試
 */
async function testPerformance() {
  console.log('\n⚡ 效能測試 (10次請求)...');
  const times = [];
  
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    try {
      await makeRequest('/challenge?random=true');
      const end = Date.now();
      times.push(end - start);
      process.stdout.write('.');
    } catch (error) {
      process.stdout.write('x');
    }
  }
  
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  
  console.log(`\n✅ 效能測試完成:`);
  console.log(`   成功請求: ${times.length}/10`);
  console.log(`   平均響應時間: ${avgTime.toFixed(2)}ms`);
  console.log(`   最短響應時間: ${minTime}ms`);
  console.log(`   最長響應時間: ${maxTime}ms`);
}

/**
 * 主測試函數
 */
async function runTests() {
  console.log('🚀 開始 API 測試...\n');
  console.log(`目標: http://${CONFIG.host}:${CONFIG.port}/api`);
  console.log('='.repeat(50));
  
  // 等待服務器啟動
  const serverReady = await waitForServer();
  if (!serverReady) {
    console.log('\n❌ Mock API 服務器未運行！');
    console.log('請先運行: npm run mock-server');
    process.exit(1);
  }
  
  // 檢查服務器是否運行
  const isHealthy = await testHealth();
  if (!isHealthy) {
    console.log('\n❌ 健康檢查失敗！');
    process.exit(1);
  }

  // 執行各項測試
  const challenge = await testGetChallenge();
  await testSubmitAnswer(challenge);
  await testGetChallenges();
  await testErrorHandling();
  await testPerformance();
  
  console.log('\n🎉 所有測試完成！');
  console.log('\n📖 接下來你可以:');
  console.log('1. 啟動 React 應用: npm run dev');
  console.log('2. 測試挑戰功能完整流程');
  console.log('3. 準備切換到 n8n 集成');
}

// 錯誤處理
process.on('unhandledRejection', (error) => {
  console.error('未處理的錯誤:', error);
  process.exit(1);
});

// 運行測試
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 如果直接運行此腳本
if (process.argv[1] === __filename) {
  runTests().catch(console.error);
}

export {
  makeRequest,
  testHealth,
  testGetChallenge,
  testSubmitAnswer,
  testGetChallenges,
  waitForServer,
  runTests
};