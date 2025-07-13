/**
 * Mock API 服務器 - n8n 集成測試用
 * 
 * 功能：
 * - 模擬 n8n webhook 響應
 * - 提供挑戰題目 API
 * - 支援答案驗證 API
 * - 可配置的響應延遲和錯誤模擬
 */

import express from 'express';
import cors from 'cors';
const app = express();

// 中間件設定
app.use(cors());
app.use(express.json());

// Mock 挑戰資料 - 與 useChallenge.js 保持同步
const mockChallenges = [
  {
    id: 'challenge-1',
    prompt: '請將以下程式碼片段按正確順序排列，創建一個完整的 React 計數器元件',
    codeBlocks: [
      { id: '1', text: 'function Counter() {' },
      { id: '2', text: '  const [count, setCount] = useState(0);' },
      { id: '3', text: '  return (' },
      { id: '4', text: '    <div>' },
      { id: '5', text: '      <h2>Count: {count}</h2>' },
      { id: '6', text: '      <button onClick={() => setCount(count - 1)}>-</button>' },
      { id: '7', text: '      <button onClick={() => setCount(count + 1)}>+</button>' },
      { id: '8', text: '    </div>' },
      { id: '9', text: '  );' },
      { id: '10', text: '}' },
      // 干擾項
      { id: '11', text: '  const [name, setName] = useState("");' },
      { id: '12', text: '      <input type="text" />' },
      { id: '13', text: '  useEffect(() => {}, []);' }
    ],
    correctAnswer: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    hints: [
      '從函數宣告開始',
      'useState 應該在函數宣告之後',
      '記得要回傳 JSX'
    ],
    difficulty: 'basic'
  },
  {
    id: 'challenge-2', 
    prompt: '排列以下程式碼來創建一個使用受控組件處理表單輸入的 React 元件',
    codeBlocks: [
      { id: '1', text: 'function LoginForm() {' },
      { id: '2', text: '  const [email, setEmail] = useState("");' },
      { id: '3', text: '  const [password, setPassword] = useState("");' },
      { id: '4', text: '  return (' },
      { id: '5', text: '    <form>' },
      { id: '6', text: '      <input value={email} onChange={(e) => setEmail(e.target.value)} />' },
      { id: '7', text: '      <input value={password} onChange={(e) => setPassword(e.target.value)} />' },
      { id: '8', text: '    </form>' },
      { id: '9', text: '  );' },
      { id: '10', text: '}' },
      // 干擾項
      { id: '11', text: '  const [count, setCount] = useState(0);' },
      { id: '12', text: '      <div>Hello World</div>' }
    ],
    correctAnswer: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    hints: [
      '表單輸入需要受控值',
      '使用 onChange 處理器來更新狀態',
      '每個輸入都應該有 value 和 onChange'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'challenge-3',
    prompt: '創建一個使用 useEffect 在掛載時獲取資料的 React 元件',
    codeBlocks: [
      { id: '1', text: 'function DataFetcher() {' },
      { id: '2', text: '  const [data, setData] = useState(null);' },
      { id: '3', text: '  useEffect(() => {' },
      { id: '4', text: '    fetch("/api/data")' },
      { id: '5', text: '      .then(res => res.json())' },
      { id: '6', text: '      .then(setData);' },
      { id: '7', text: '  }, []);' },
      { id: '8', text: '  return (' },
      { id: '9', text: '    <div>{data ? data.message : "Loading..."}</div>' },
      { id: '10', text: '  );' },
      { id: '11', text: '}' },
      // 干擾項
      { id: '12', text: '  console.log("debug");' },
      { id: '13', text: '      <button>Click me</button>' }
    ],
    correctAnswer: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    hints: [
      'useEffect 在組件掛載後運行',
      '空依賴陣列表示只運行一次',
      '正確處理載入狀態'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'challenge-4',
    prompt: '建立一個根據用戶認證狀態進行條件渲染的 React 元件',
    codeBlocks: [
      { id: '1', text: 'function AuthComponent() {' },
      { id: '2', text: '  const [isLoggedIn, setIsLoggedIn] = useState(false);' },
      { id: '3', text: '  const handleLogin = () => setIsLoggedIn(true);' },
      { id: '4', text: '  const handleLogout = () => setIsLoggedIn(false);' },
      { id: '5', text: '  return (' },
      { id: '6', text: '    <div>' },
      { id: '7', text: '      {isLoggedIn ? (' },
      { id: '8', text: '        <button onClick={handleLogout}>Logout</button>' },
      { id: '9', text: '      ) : (' },
      { id: '10', text: '        <button onClick={handleLogin}>Login</button>' },
      { id: '11', text: '      )}' },
      { id: '12', text: '    </div>' },
      { id: '13', text: '  );' },
      { id: '14', text: '}' },
      // 干擾項
      { id: '15', text: '  const [error, setError] = useState(null);' },
      { id: '16', text: '      <p>Error occurred</p>' }
    ],
    correctAnswer: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    hints: [
      '使用三元運算符進行條件渲染',
      '在 JSX 前定義處理函數',
      '括號有助於多行 JSX'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'challenge-5',
    prompt: '建立一個使用 map 函數渲染項目列表的 React 元件',
    codeBlocks: [
      { id: '1', text: 'function ItemList() {' },
      { id: '2', text: '  const items = ["Apple", "Banana", "Orange"];' },
      { id: '3', text: '  return (' },
      { id: '4', text: '    <ul>' },
      { id: '5', text: '      {items.map((item, index) => (' },
      { id: '6', text: '        <li key={index}>{item}</li>' },
      { id: '7', text: '      ))}' },
      { id: '8', text: '    </ul>' },
      { id: '9', text: '  );' },
      { id: '10', text: '}' },
      // 干擾項
      { id: '11', text: '  const [selected, setSelected] = useState(null);' },
      { id: '12', text: '      <button>Add Item</button>' },
      { id: '13', text: '  items.forEach(item => console.log(item));' }
    ],
    correctAnswer: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    hints: [
      '使用 map() 將陣列轉換為 JSX',
      '每個列表項都需要 key 屬性',
      '將 JSX 表達式包裝在花括號中'
    ],
    difficulty: 'advanced'
  }
];

// 記錄當前挑戰索引
let currentChallengeIndex = 0;

/**
 * 獲取隨機挑戰題目
 */
app.get('/api/challenge', (req, res) => {
  // 模擬網路延遲
  setTimeout(() => {
    // 10% 機率返回錯誤用於測試
    if (Math.random() < 0.1) {
      return res.status(500).json({
        error: 'Mock server error for testing',
        message: '模擬服務器錯誤（測試用）'
      });
    }

    // 隨機選擇挑戰或按順序
    const useRandom = req.query.random === 'true';
    const challenge = useRandom 
      ? mockChallenges[Math.floor(Math.random() * mockChallenges.length)]
      : mockChallenges[currentChallengeIndex % mockChallenges.length];
    
    if (!useRandom) {
      currentChallengeIndex++;
    }

    // 打亂程式碼區塊順序
    const shuffledBlocks = [...challenge.codeBlocks].sort(() => Math.random() - 0.5);
    
    res.json({
      ...challenge,
      codeBlocks: shuffledBlocks,
      timestamp: new Date().toISOString()
    });
  }, 500 + Math.random() * 1000); // 0.5-1.5秒延遲
});

/**
 * 驗證挑戰答案
 */
app.post('/api/challenge/submit', (req, res) => {
  const { challengeId, userAnswer } = req.body;
  
  // 模擬網路延遲
  setTimeout(() => {
    // 5% 機率返回錯誤用於測試
    if (Math.random() < 0.05) {
      return res.status(500).json({
        error: 'Submission failed',
        message: '提交失敗，請重試'
      });
    }

    // 查找對應的挑戰
    const challenge = mockChallenges.find(c => c.id === challengeId);
    if (!challenge) {
      return res.status(404).json({
        error: 'Challenge not found',
        message: '挑戰題目未找到'
      });
    }

    // 驗證答案
    const correctAnswer = challenge.correctAnswer;
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
    
    // 計算部分分數
    let score = 0;
    if (isCorrect) {
      score = 100;
    } else {
      // 計算相似度分數
      let correctPositions = 0;
      const minLength = Math.min(userAnswer.length, correctAnswer.length);
      
      for (let i = 0; i < minLength; i++) {
        if (userAnswer[i] === correctAnswer[i]) {
          correctPositions++;
        }
      }
      
      score = Math.round((correctPositions / correctAnswer.length) * 100);
    }

    // 生成反饋訊息
    let feedback;
    if (score === 100) {
      feedback = '🎉 完美！程式碼順序完全正確！';
    } else if (score >= 80) {
      feedback = '👍 很接近了！檢查一下程式碼的邏輯順序。';
    } else if (score >= 60) {
      feedback = '📚 還需要努力，注意 React 元件的基本結構。';
    } else {
      feedback = '💪 多練習 React 基礎，注意導入、函數定義、JSX 和導出的順序。';
    }

    res.json({
      isCorrect,
      score,
      feedback,
      correctAnswer,
      userAnswer,
      timestamp: new Date().toISOString()
    });
  }, 300 + Math.random() * 700); // 0.3-1秒延遲
});

/**
 * 獲取所有可用挑戰列表
 */
app.get('/api/challenges', (req, res) => {
  const challengeList = mockChallenges.map(challenge => ({
    id: challenge.id,
    prompt: challenge.prompt.substring(0, 100) + '...',
    difficulty: challenge.difficulty,
    blocksCount: challenge.codeBlocks.length
  }));
  
  res.json({
    challenges: challengeList,
    total: mockChallenges.length
  });
});

/**
 * 健康檢查端點
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Mock API server is running',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api/challenge - 獲取隨機挑戰',
      'POST /api/challenge/submit - 提交答案',
      'GET /api/challenges - 獲取挑戰列表',
      'GET /api/health - 健康檢查'
    ]
  });
});

/**
 * 錯誤處理中間件
 */
app.use((err, req, res, next) => {
  console.error('Mock server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: '服務器內部錯誤'
  });
});

/**
 * 404 處理
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: '端點未找到',
    availableEndpoints: ['/api/challenge', '/api/challenge/submit', '/api/challenges', '/api/health']
  });
});

// 啟動服務器
const PORT = process.env.MOCK_PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📖 API文檔: http://localhost:${PORT}/api/health`);
  console.log(`🎯 測試挑戰: http://localhost:${PORT}/api/challenge`);
});

// 優雅關閉處理
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down Mock API server...');
  server.close(() => {
    console.log('✅ Mock API server stopped');
  });
});

export default app;