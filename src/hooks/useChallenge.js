/**
 * 挑戰關卡專用 Hook
 * 支援動態 API 獲取題目和 n8n 整合
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { apiCall, API_ENDPOINTS, DEV_CONFIG } from '../config/apiConfig';
import { shuffleArray, validateDragAnswer } from '../utils/arrayUtils';

/**
 * 挑戰關卡 Hook
 * @returns {Object} 挑戰關卡相關的狀態和方法
 */
export function useChallenge() {
  const { isLanguage } = useLanguage();
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswer, setUserAnswer] = useState([]);
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);
  
  // 新增提示和答案功能相關狀態
  const [usedHintCount, setUsedHintCount] = useState(0);
  const [hasViewedAnswer, setHasViewedAnswer] = useState(false);
  const [showHintConfirm, setShowHintConfirm] = useState(false);
  const [showAnswerConfirm, setShowAnswerConfirm] = useState(false);
  
  // 新增：追蹤當前題目 ID 避免重複
  const [currentChallengeId, setCurrentChallengeId] = useState(null);
  const [usedChallengeIds, setUsedChallengeIds] = useState(new Set());

  /**
   * 從 API 獲取挑戰題目
   * TODO: 這裡可以替換成 n8n webhook
   */
  const fetchChallenge = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let challengeData;
      
      // 檢查是否應該使用 Mock API
      const shouldUseMockAPI = DEV_CONFIG.useMockApi && !DEV_CONFIG.useLocalData;
      
      if (shouldUseMockAPI) {
        // 嘗試調用 Mock API
        try {
          challengeData = await apiCall(API_ENDPOINTS.challenge.getChallenge, {
            method: 'GET'
          });
          console.log('✅ Mock API 調用成功');
        } catch (apiError) {
          console.warn('⚠️ Mock API 調用失敗，降級到本地資料:', apiError.message);
          challengeData = getMockChallengeData();
        }
      } else if (!DEV_CONFIG.useLocalData) {
        // 生產模式：從 n8n webhook 獲取
        challengeData = await apiCall(API_ENDPOINTS.challenge.getChallenge, {
          method: 'POST',
          body: JSON.stringify({
            language: isLanguage('en-US') ? 'en' : 'zh',
            difficulty: 'intermediate',
            topic: 'react-components'
          })
        });
      } else {
        // 直接使用本地模擬資料
        challengeData = getMockChallengeData();
      }
      
      if (challengeData && (challengeData.codeBlocks || challengeData.id)) {
        setChallenge(challengeData);
        // 設定當前題目 ID（如果是第一次載入）
        if (!currentChallengeId) {
          setCurrentChallengeId(challengeData.id);
          setUsedChallengeIds(prev => new Set([...prev, challengeData.id]));
        }
        // 洗牌代碼塊作為可選項
        setAvailableBlocks(shuffleArray(challengeData.codeBlocks || []));
        setUserAnswer([]);
        setIsCompleted(false);
        setResult(null);
        setError(null); // 清除錯誤狀態
        // 重置提示和答案相關狀態
        setUsedHintCount(0);
        setHasViewedAnswer(false);
        setShowHintConfirm(false);
        setShowAnswerConfirm(false);
      } else {
        throw new Error('Invalid challenge data received');
      }
      
    } catch (err) {
      console.error('挑戰獲取失敗，使用降級資料:', err);
      // 確保總是提供可用的資料
      const fallbackData = getMockChallengeData();
      setChallenge(fallbackData);
      // 設定當前題目 ID（如果是第一次載入）
      if (!currentChallengeId) {
        setCurrentChallengeId(fallbackData.id);
        setUsedChallengeIds(prev => new Set([...prev, fallbackData.id]));
      }
      setAvailableBlocks(shuffleArray(fallbackData.codeBlocks));
      setUserAnswer([]);
      setIsCompleted(false);
      setResult(null);
      // 設置友好的錯誤訊息
      setError(null); // 不顯示錯誤，因為已經提供了降級資料
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 模擬挑戰資料（開發用）
   * 新增避免重複的選題邏輯
   */
  const getMockChallengeData = () => {
    const challenges = [
      {
        id: 'challenge-1',
        prompt: isLanguage('en-US') 
          ? 'Arrange the code blocks to create a working React component that displays a counter with increment/decrement buttons.'
          : '請排列程式碼區塊，建立一個可以顯示計數器並有增減按鈕的 React 組件。',
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
        answerOrder: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        hints: [
          isLanguage('en-US') ? 'Start with the function declaration' : '從函數宣告開始',
          isLanguage('en-US') ? 'useState should come after function declaration' : 'useState 應該在函數宣告之後',
          isLanguage('en-US') ? 'Remember to return JSX' : '記得要回傳 JSX'
        ]
      },
      {
        id: 'challenge-2',
        prompt: isLanguage('en-US')
          ? 'Create a React component that handles form input with controlled components.'
          : '建立一個使用受控組件處理表單輸入的 React 組件。',
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
        answerOrder: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        hints: [
          isLanguage('en-US') ? 'Form inputs need controlled values' : '表單輸入需要受控值',
          isLanguage('en-US') ? 'Use onChange handlers to update state' : '使用 onChange 處理器來更新狀態',
          isLanguage('en-US') ? 'Each input should have value and onChange' : '每個輸入都應該有 value 和 onChange'
        ]
      },
      {
        id: 'challenge-3',
        prompt: isLanguage('en-US')
          ? 'Create a React component that uses useEffect to fetch data when mounted.'
          : '建立一個使用 useEffect 在掛載時獲取資料的 React 組件。',
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
        answerOrder: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        hints: [
          isLanguage('en-US') ? 'useEffect runs after component mounts' : 'useEffect 在組件掛載後運行',
          isLanguage('en-US') ? 'Empty dependency array means run once' : '空依賴陣列表示只運行一次',
          isLanguage('en-US') ? 'Handle loading state properly' : '正確處理載入狀態'
        ]
      },
      {
        id: 'challenge-4',
        prompt: isLanguage('en-US')
          ? 'Build a React component with conditional rendering based on user authentication.'
          : '建立一個根據用戶認證狀態進行條件渲染的 React 組件。',
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
        answerOrder: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
        hints: [
          isLanguage('en-US') ? 'Use ternary operator for conditional rendering' : '使用三元運算符進行條件渲染',
          isLanguage('en-US') ? 'Define handler functions before JSX' : '在 JSX 前定義處理函數',
          isLanguage('en-US') ? 'Parentheses help with multi-line JSX' : '括號有助於多行 JSX'
        ]
      },
      {
        id: 'challenge-5',
        prompt: isLanguage('en-US')
          ? 'Create a React component that renders a list of items with map function.'
          : '建立一個使用 map 函數渲染項目列表的 React 組件。',
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
        answerOrder: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        hints: [
          isLanguage('en-US') ? 'Use map() to transform array to JSX' : '使用 map() 將陣列轉換為 JSX',
          isLanguage('en-US') ? 'Each list item needs a key prop' : '每個列表項都需要 key 屬性',
          isLanguage('en-US') ? 'Wrap JSX expressions in curly braces' : '將 JSX 表達式包裝在花括號中'
        ]
      }
    ];
    
    // 避免重複的選題邏輯
    const availableChallenges = challenges.filter(challenge => 
      challenge.id !== currentChallengeId
    );
    
    // 如果所有題目都試過了，重置已用題目記錄
    if (availableChallenges.length === 0) {
      setUsedChallengeIds(new Set());
      console.log('🔄 所有題目都已體驗過，重新開始選題');
      return challenges[Math.floor(Math.random() * challenges.length)];
    }
    
    // 從可用題目中隨機選擇
    const selectedChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
    
    // 更新當前題目 ID
    setCurrentChallengeId(selectedChallenge.id);
    setUsedChallengeIds(prev => new Set([...prev, selectedChallenge.id]));
    
    return selectedChallenge;
  };

  /**
   * 提交答案並驗證
   */
  const submitAnswer = async () => {
    if (!challenge || userAnswer.length === 0) {
      setError(isLanguage('en-US') ? 'Please arrange some code blocks' : '請排列一些程式碼區塊');
      return;
    }

    // 驗證答案
    const validation = validateDragAnswer(userAnswer, challenge.answerOrder, true);
    setResult(validation);
    setIsCompleted(true);
    setError(null); // 清除錯誤狀態

    // 發送結果到 API（可選）
    try {
      const shouldSubmitToAPI = DEV_CONFIG.useMockApi && !DEV_CONFIG.useLocalData;
      
      if (shouldSubmitToAPI) {
        // 嘗試提交到 Mock API
        try {
          await apiCall(API_ENDPOINTS.challenge.submitAnswer, {
            method: 'POST',
            body: JSON.stringify({
              challengeId: challenge.id,
              userAnswer: userAnswer,
              isCorrect: validation.isCorrect,
              score: validation.score,
              timestamp: new Date().toISOString()
            })
          });
          console.log('✅ 答案提交到 Mock API 成功');
        } catch (apiError) {
          console.warn('⚠️ Mock API 提交失敗，但不影響用戶體驗:', apiError.message);
        }
      } else if (!DEV_CONFIG.useLocalData && !DEV_CONFIG.useMockApi) {
        // 生產模式提交到 n8n
        await apiCall(API_ENDPOINTS.challenge.submitAnswer, {
          method: 'POST',
          body: JSON.stringify({
            challengeId: challenge.id,
            userAnswer: userAnswer,
            isCorrect: validation.isCorrect,
            score: validation.score,
            timestamp: new Date().toISOString()
          })
        });
      }
      // 如果是純本地模式，不做任何 API 調用
    } catch (err) {
      console.warn('答案提交失敗，但不影響用戶體驗:', err);
      // 不影響用戶體驗，只是記錄失敗
    }
  };

  /**
   * 重置挑戰
   */
  const resetChallenge = () => {
    if (challenge) {
      setAvailableBlocks(shuffleArray(challenge.codeBlocks));
      setUserAnswer([]);
      setIsCompleted(false);
      setResult(null);
      setError(null);
      // 重置提示和答案相關狀態
      setUsedHintCount(0);
      setHasViewedAnswer(false);
      setShowHintConfirm(false);
      setShowAnswerConfirm(false);
      // 注意：不重置 currentChallengeId 和 usedChallengeIds，因為這是重置當前題目而不是換題
    }
  };

  /**
   * 添加程式碼區塊到答案區
   */
  const addToAnswer = (block) => {
    setUserAnswer(prev => [...prev, block.id]);
    setAvailableBlocks(prev => prev.filter(b => b.id !== block.id));
  };

  /**
   * 從答案區移除程式碼區塊
   */
  const removeFromAnswer = (blockId) => {
    const block = challenge.codeBlocks.find(b => b.id === blockId);
    if (block) {
      setUserAnswer(prev => prev.filter(id => id !== blockId));
      setAvailableBlocks(prev => [...prev, block]);
    }
  };

  /**
   * 移動答案區中的程式碼區塊位置
   */
  const moveInAnswer = (fromIndex, toIndex) => {
    setUserAnswer(prev => {
      const newAnswer = [...prev];
      const [movedItem] = newAnswer.splice(fromIndex, 1);
      newAnswer.splice(toIndex, 0, movedItem);
      return newAnswer;
    });
  };

  /**
   * 獲取程式碼區塊的文字內容
   */
  const getBlockText = (blockId) => {
    const block = challenge?.codeBlocks.find(b => b.id === blockId);
    return block?.text || '';
  };

  /**
   * 請求查看提示
   */
  const requestHint = () => {
    if (usedHintCount < 3 && !hasViewedAnswer) {
      setShowHintConfirm(true);
    }
  };

  /**
   * 分析用戶當前進度並生成智能提示
   */
  const generateSmartHint = () => {
    if (!challenge || !challenge.answerOrder) {
      return isLanguage('en-US') ? 'Try arranging the code blocks in logical order.' : '嘗試按邏輯順序排列程式碼區塊。';
    }

    const correctAnswer = challenge.answerOrder;
    const currentAnswer = userAnswer;
    const totalBlocks = correctAnswer.length;
    const placedBlocks = currentAnswer.length;
    
    // 計算完成百分比
    const completionRate = placedBlocks / totalBlocks;
    
    // 計算正確位置的區塊數量
    let correctPositions = 0;
    const minLength = Math.min(currentAnswer.length, correctAnswer.length);
    for (let i = 0; i < minLength; i++) {
      if (currentAnswer[i] === correctAnswer[i]) {
        correctPositions++;
      }
    }
    
    // 根據進度和正確性給出不同層次的提示
    if (placedBlocks === 0) {
      // 還沒開始
      return isLanguage('en-US') 
        ? 'Start by placing the function declaration or import statement.'
        : '先放置函數宣告或導入語句開始。';
    } else if (completionRate < 0.3) {
      // 完成度低於30%
      if (correctPositions === 0) {
        return isLanguage('en-US')
          ? 'Consider the basic structure: imports, function definition, state, return statement.'
          : '考慮基本結構：導入、函數定義、狀態、回傳語句。';
      } else {
        return isLanguage('en-US')
          ? 'Good start! Continue with the component\'s internal logic.'
          : '開始得不錯！繼續添加組件的內部邏輯。';
      }
    } else if (completionRate < 0.7) {
      // 完成度30-70%
      const needsReturn = correctAnswer.some(id => 
        challenge.codeBlocks.find(block => block.id === id)?.text.includes('return')
      ) && !currentAnswer.some(id => 
        challenge.codeBlocks.find(block => block.id === id)?.text.includes('return')
      );
      
      if (needsReturn) {
        return isLanguage('en-US')
          ? 'Don\'t forget the return statement for your JSX.'
          : '別忘了為你的 JSX 添加 return 語句。';
      }
      
      const needsClosing = correctAnswer.some(id => 
        challenge.codeBlocks.find(block => block.id === id)?.text.includes('}')
      ) && !currentAnswer.some(id => 
        challenge.codeBlocks.find(block => block.id === id)?.text.includes('}')
      );
      
      if (needsClosing) {
        return isLanguage('en-US')
          ? 'Check if you need closing braces for functions or JSX elements.'
          : '檢查是否需要為函數或 JSX 元素添加結束括號。';
      }
      
      return isLanguage('en-US')
        ? 'You\'re halfway there! Focus on the JSX structure and event handlers.'
        : '你已經完成了一半！專注於 JSX 結構和事件處理器。';
    } else if (completionRate < 0.9) {
      // 完成度70-90%
      if (correctPositions / placedBlocks < 0.7) {
        return isLanguage('en-US')
          ? 'Most blocks are placed, but check the order. Try rearranging some blocks.'
          : '大部分區塊都已放置，但檢查一下順序。嘗試重新排列一些區塊。';
      } else {
        return isLanguage('en-US')
          ? 'Almost done! You might be missing a few small elements like closing tags.'
          : '快完成了！你可能遺漏了一些小元素，如結束標籤。';
      }
    } else {
      // 完成度90%以上
      const missingBlocks = correctAnswer.filter(id => !currentAnswer.includes(id));
      if (missingBlocks.length > 0) {
        const missingBlock = challenge.codeBlocks.find(block => block.id === missingBlocks[0]);
        return isLanguage('en-US')
          ? `You're very close! You might be missing: "${missingBlock?.text}"`
          : `非常接近了！你可能遺漏了：「${missingBlock?.text}」`;
      } else {
        return isLanguage('en-US')
          ? 'All blocks are placed! Try reordering them to match the correct sequence.'
          : '所有區塊都已放置！嘗試重新排序以符合正確的順序。';
      }
    }
  };

  /**
   * 確認查看提示
   */
  const confirmHint = () => {
    setUsedHintCount(prev => prev + 1);
    setShowHintConfirm(false);
  };

  /**
   * 取消查看提示
   */
  const cancelHint = () => {
    setShowHintConfirm(false);
  };

  /**
   * 請求查看答案
   */
  const requestAnswer = () => {
    if (!hasViewedAnswer) {
      setShowAnswerConfirm(true);
    }
  };

  /**
   * 確認查看答案
   */
  const confirmAnswer = () => {
    setHasViewedAnswer(true);
    setIsCompleted(true);
    setShowAnswerConfirm(false);
  };

  /**
   * 取消查看答案
   */
  const cancelAnswer = () => {
    setShowAnswerConfirm(false);
  };

  return {
    // 狀態
    challenge,
    isLoading,
    error,
    userAnswer,
    availableBlocks,
    isCompleted,
    result,
    
    // 新增的提示和答案功能狀態
    usedHintCount,
    hasViewedAnswer,
    showHintConfirm,
    showAnswerConfirm,
    
    // 方法
    fetchChallenge,
    submitAnswer,
    resetChallenge,
    addToAnswer,
    removeFromAnswer,
    moveInAnswer,
    getBlockText,
    
    // 新增的提示和答案功能方法
    requestHint,
    confirmHint,
    cancelHint,
    requestAnswer,
    confirmAnswer,
    cancelAnswer,
    generateSmartHint
  };
}

export default useChallenge;