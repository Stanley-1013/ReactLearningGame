/**
 * n8n Webhook 服務層
 * 
 * 專門處理與 n8n 的 API 通信，包含：
 * - 學習主題更換
 * - AI 題目生成
 * - 進度追蹤
 * 
 * 遵循 n8n 變數命名規範和標準化格式
 */

import { apiCall, API_ENDPOINTS, DEV_CONFIG } from '../config/apiConfig';

// n8n 變數命名規範
export const N8N_VARIABLES = {
  // 主題相關
  TOPIC_CATEGORY: 'topic_category',
  DIFFICULTY_LEVEL: 'difficulty_level', 
  LANGUAGE_CODE: 'language_code',
  
  // 題目生成相關
  QUESTION_TYPE: 'question_type',
  CONTENT_SOURCE: 'content_source',
  USER_PROGRESS: 'user_progress',
  
  // 通用
  TIMESTAMP: 'timestamp',
  SOURCE: 'source',
  ACTION: 'action'
};

// n8n 動作類型
export const N8N_ACTIONS = {
  GET_THEMES: 'get_themes',
  GENERATE_QUESTIONS: 'generate_questions',
  TRACK_PROGRESS: 'track_progress',
  UPDATE_USER_DATA: 'update_user_data'
};

// 題目類型
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  CODE_BLOCKS: 'code-blocks', 
  TRUE_FALSE: 'true-false',
  FILL_BLANK: 'fill-blank'
};

// 難度等級
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate', 
  ADVANCED: 'advanced'
};

// 請求取消控制器存儲
const activeRequests = new Map();

/**
 * 標準化 n8n 請求格式
 */
function createN8nRequest(action, data = {}) {
  return {
    [N8N_VARIABLES.TIMESTAMP]: new Date().toISOString(),
    [N8N_VARIABLES.SOURCE]: 'react-learning-game',
    [N8N_VARIABLES.ACTION]: action,
    data: {
      [N8N_VARIABLES.LANGUAGE_CODE]: 'zh-TW', // 預設中文
      ...data
    }
  };
}

/**
 * 帶取消功能的 API 調用
 */
async function apiCallWithCancel(endpoint, options = {}, requestKey = '') {
  // 取消之前的同類型請求
  if (requestKey && activeRequests.has(requestKey)) {
    console.log(`🚫 取消之前的 ${requestKey} 請求`);
    activeRequests.get(requestKey).abort();
  }

  // 創建新的 AbortController
  const controller = new AbortController();
  if (requestKey) {
    activeRequests.set(requestKey, controller);
  }

  try {
    const response = await apiCall(endpoint, {
      ...options,
      signal: controller.signal,
      timeout: 8000 // 8秒超時
    });

    // 請求成功，清理控制器
    if (requestKey) {
      activeRequests.delete(requestKey);
    }

    return response;

  } catch (error) {
    // 清理控制器
    if (requestKey) {
      activeRequests.delete(requestKey);
    }

    if (error.name === 'AbortError') {
      console.log(`⏹️ ${requestKey} 請求已被取消`);
      throw new Error('Request cancelled');
    }

    throw error;
  }
}

/**
 * 驗證 n8n 響應格式
 */
function validateN8nResponse(response) {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response format');
  }
  
  if (!response.success) {
    throw new Error(response.error || 'n8n request failed');
  }
  
  return response.data || {};
}

/**
 * 學習主題服務
 */
export const themeService = {
  /**
   * 獲取可用的學習主題列表
   * @param {Object} params - 查詢參數
   * @param {string} params.language_code - 語言代碼 (zh-TW, en-US)
   * @param {string} params.difficulty_level - 難度等級
   * @returns {Promise<Array>} 主題列表
   */
  async getAvailableThemes(params = {}) {
    console.log('🔍 開始獲取可用主題...');
    
    const requestData = createN8nRequest(N8N_ACTIONS.GET_THEMES, {
      [N8N_VARIABLES.LANGUAGE_CODE]: params.language_code || 'zh-TW',
      [N8N_VARIABLES.DIFFICULTY_LEVEL]: params.difficulty_level || DIFFICULTY_LEVELS.BEGINNER
    });

    try {
      const response = await apiCallWithCancel(
        API_ENDPOINTS.modules.n8nGetModules, 
        {
          method: 'POST',
          body: JSON.stringify(requestData)
        },
        'get-themes' // 請求標識符
      );
      
      const data = validateN8nResponse(response);
      const themes = this.normalizeThemes(data.themes || []);
      
      console.log('✅ 主題獲取成功:', themes.length);
      return themes;
      
    } catch (error) {
      if (error.message === 'Request cancelled') {
        console.log('⏹️ 主題獲取請求被取消');
        throw error; // 重新拋出取消錯誤
      }
      
      console.warn('⚠️ n8n 主題獲取失敗，使用本地降級資料:', error.message);
      return this.getFallbackThemes(params.language_code);
    }
  },

  /**
   * 切換到指定主題
   * @param {Object} theme - 主題物件
   * @param {Object} userContext - 用戶上下文
   * @returns {Promise<Object>} 主題數據
   */
  async switchToTheme(theme, userContext = {}) {
    console.log('🔄 開始切換主題至:', theme.name);
    
    const requestData = createN8nRequest(N8N_ACTIONS.GET_THEMES, {
      [N8N_VARIABLES.TOPIC_CATEGORY]: theme.category,
      [N8N_VARIABLES.LANGUAGE_CODE]: userContext.language_code || 'zh-TW',
      [N8N_VARIABLES.USER_PROGRESS]: userContext.progress || {},
      selected_theme_id: theme.id
    });

    try {
      const response = await apiCallWithCancel(
        API_ENDPOINTS.modules.n8nGetModules, 
        {
          method: 'POST', 
          body: JSON.stringify(requestData)
        },
        `switch-theme-${theme.id}` // 唯一的請求標識符
      );
      
      const data = validateN8nResponse(response);
      const moduleData = this.normalizeModulesData(data.modules || []);
      
      console.log('✅ 主題切換成功:', theme.name);
      return moduleData;
      
    } catch (error) {
      if (error.message === 'Request cancelled') {
        console.log('⏹️ 主題切換請求被取消');
        throw error;
      }
      
      console.warn('⚠️ n8n 主題切換失敗，使用本地資料:', error.message);
      return this.getFallbackModules(theme);
    }
  },

  /**
   * 標準化主題資料格式
   */
  normalizeThemes(themes) {
    return themes.map(theme => ({
      id: theme.id || theme.theme_id,
      name: theme.name || theme.theme_name,
      category: theme.category || theme.topic_category,
      description: theme.description || '',
      difficulty: theme.difficulty || theme.difficulty_level || DIFFICULTY_LEVELS.BEGINNER,
      moduleCount: theme.module_count || theme.modules?.length || 0,
      estimatedTime: theme.estimated_time || 0,
      thumbnail: theme.thumbnail || theme.image_url || '',
      tags: theme.tags || []
    }));
  },

  /**
   * 標準化模組資料格式（相容現有結構）
   */
  normalizeModulesData(modules) {
    return {
      modules: modules.map(module => ({
        id: module.id || module.module_id,
        title: module.title || module.module_title,
        description: module.description || '',
        questions: module.questions || module.content || []
      }))
    };
  },

  /**
   * 降級主題資料（本地備用）
   */
  getFallbackThemes(languageCode = 'zh-TW') {
    console.log('🔧 使用降級主題資料，語言:', languageCode);
    const isEn = languageCode === 'en-US';
    
    const fallbackThemes = [
      {
        id: 'react-basics',
        name: isEn ? 'React Fundamentals' : 'React 基礎',
        category: 'react-basics',
        description: isEn ? 'Learn core React concepts including components, props, and state' : '學習 React 核心概念，包括組件、props 和狀態管理',
        difficulty: DIFFICULTY_LEVELS.BEGINNER,
        moduleCount: 10,
        estimatedTime: 120,
        thumbnail: '/src/assets/images/theme-react-basics.png',
        tags: [isEn ? 'beginner' : '初學者', 'React', isEn ? 'components' : '組件'],
        isActive: true,
        available: true
      },
      {
        id: 'advanced-hooks',
        name: isEn ? 'Advanced Hooks' : '進階 Hooks',
        category: 'advanced-hooks', 
        description: isEn ? 'Master React Hooks and advanced patterns' : '掌握 React Hooks 和進階開發模式',
        difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
        moduleCount: 8,
        estimatedTime: 180,
        thumbnail: '/src/assets/images/theme-hooks.png',
        tags: [isEn ? 'intermediate' : '中級', 'Hooks', 'useState', 'useEffect'],
        isActive: false,
        available: true
      },
      {
        id: 'react-ecosystem',
        name: isEn ? 'React Ecosystem' : 'React 生態系統',
        category: 'react-ecosystem',
        description: isEn ? 'Explore React Router, state management, and testing' : '探索 React Router、狀態管理和測試',
        difficulty: DIFFICULTY_LEVELS.ADVANCED,
        moduleCount: 12,
        estimatedTime: 240,
        thumbnail: '/src/assets/images/theme-ecosystem.png',
        tags: [isEn ? 'advanced' : '進階', 'Router', 'Redux', 'Testing'],
        isActive: false,
        available: true
      }
    ];
    
    console.log('✅ 降級主題資料已準備:', fallbackThemes.length, '個主題');
    return fallbackThemes;
  },

  /**
   * 降級模組資料（本地備用） - 根據主題動態生成
   */
  getFallbackModules(theme) {
    console.log('🔧 獲取主題的降級模組資料:', theme?.name || '未知主題');
    
    const isEn = theme?.category === 'en' || theme?.name?.includes('English');
    
    // 根據主題ID或名稱生成不同的降級內容
    const themeId = theme?.id || theme?.category || 'react-basics';
    const themeName = theme?.name || (isEn ? 'React Basics' : 'React 基礎');
    
    console.log('🎯 生成主題專用降級資料:', themeId, '-', themeName);
    
    let modules = [];
    
    // 根據主題生成對應的模組內容
    switch (themeId) {
      case 'advanced-hooks':
        modules = this.generateAdvancedHooksModules(isEn, themeName);
        break;
      case 'react-ecosystem':
        modules = this.generateEcosystemModules(isEn, themeName);
        break;
      case 'react-basics':
      default:
        modules = this.generateBasicsModules(isEn, themeName);
        break;
    }
    
    const fallbackModules = { modules };
    
    console.log(`✅ 為主題 "${themeName}" 生成 ${modules.length} 個降級模組`);
    return fallbackModules;
  },

  /**
   * 生成 React 基礎主題的模組
   */
  generateBasicsModules(isEn, themeName) {
    return [
      {
        id: 1,
        title: isEn ? 'What is React?' : 'React 是什麼？',
        description: isEn ? 'Learn React basics and core concepts' : '學習 React 基礎和核心概念',
        questions: [
          {
            id: '1-1',
            content: isEn ? 
              'React is a JavaScript library for building user interfaces. It uses a component-based architecture.' :
              'React 是用於建構使用者介面的 JavaScript 函式庫。它使用組件化架構。',
            codeExample: 'function Welcome() {\n  return <h1>Hello, React!</h1>;\n}',
            quiz: {
              question: isEn ? 'What is React used for?' : 'React 主要用於什麼？',
              options: isEn ? 
                ['Building user interfaces', 'Database management', 'Server configuration', 'File processing'] :
                ['建立使用者介面', '資料庫管理', '伺服器配置', '檔案處理'],
              answer: isEn ? 'Building user interfaces' : '建立使用者介面'
            }
          }
        ]
      },
      {
        id: 2,
        title: isEn ? 'JSX Basics' : 'JSX 基礎',
        description: isEn ? 'Understanding JSX syntax and usage' : '理解 JSX 語法和用法',
        questions: [
          {
            id: '2-1',
            content: isEn ?
              'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript.' :
              'JSX 是 JavaScript 的語法擴充，讓你可以在 JavaScript 中寫類似 HTML 的程式碼。',
            codeExample: 'const element = <h1>Hello, World!</h1>;',
            quiz: {
              question: isEn ? 'What is JSX?' : 'JSX 是什麼？',
              options: isEn ?
                ['JavaScript syntax extension', 'A new programming language', 'CSS framework', 'Database query language'] :
                ['JavaScript 語法擴充', '新的程式語言', 'CSS 框架', '資料庫查詢語言'],
              answer: isEn ? 'JavaScript syntax extension' : 'JavaScript 語法擴充'
            }
          }
        ]
      },
      {
        id: 3,
        title: isEn ? 'React Components' : 'React 組件',
        description: isEn ? 'Understanding React component structure' : '理解 React 組件結構',
        questions: [
          {
            id: '3-1',
            content: isEn ?
              'Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.' :
              '組件是 React 應用程式的構建單元。它們讓你能將 UI 分割成獨立、可重複使用的部分。',
            codeExample: 'function Button({ text, onClick }) {\n  return <button onClick={onClick}>{text}</button>;\n}',
            quiz: {
              question: isEn ? 'What are React components?' : 'React 組件是什麼？',
              options: isEn ?
                ['Building blocks of React apps', 'CSS styling classes', 'Database records', 'Server endpoints'] :
                ['React 應用的構建單元', 'CSS 樣式類別', '資料庫記錄', '伺服器端點'],
              answer: isEn ? 'Building blocks of React apps' : 'React 應用的構建單元'
            }
          }
        ]
      }
    ];
  },

  /**
   * 生成進階 Hooks 主題的模組
   */
  generateAdvancedHooksModules(isEn, themeName) {
    return [
      {
        id: 1,
        title: isEn ? 'useState Hook' : 'useState Hook',
        description: isEn ? 'Learn state management with useState' : '學習使用 useState 進行狀態管理',
        questions: [
          {
            id: '1-1',
            content: isEn ?
              'useState is a Hook that lets you add React state to function components.' :
              'useState 是一個 Hook，讓你能在函數組件中添加 React 狀態。',
            codeExample: 'const [count, setCount] = useState(0);\n\nfunction increment() {\n  setCount(count + 1);\n}',
            quiz: {
              question: isEn ? 'What does useState return?' : 'useState 回傳什麼？',
              options: isEn ?
                ['An array with state value and setter', 'Just the state value', 'Just the setter function', 'An object'] :
                ['包含狀態值和設定函數的陣列', '只有狀態值', '只有設定函數', '一個物件'],
              answer: isEn ? 'An array with state value and setter' : '包含狀態值和設定函數的陣列'
            }
          }
        ]
      },
      {
        id: 2,
        title: isEn ? 'useEffect Hook' : 'useEffect Hook',
        description: isEn ? 'Handle side effects with useEffect' : '使用 useEffect 處理副作用',
        questions: [
          {
            id: '2-1',
            content: isEn ?
              'useEffect lets you perform side effects in function components. It serves the same purpose as componentDidMount and componentDidUpdate.' :
              'useEffect 讓你在函數組件中執行副作用。它與 componentDidMount 和 componentDidUpdate 有相同的功能。',
            codeExample: 'useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);',
            quiz: {
              question: isEn ? 'When does useEffect run?' : 'useEffect 何時執行？',
              options: isEn ?
                ['After every render', 'Before every render', 'Only on mount', 'Only on unmount'] :
                ['每次渲染後', '每次渲染前', '只在掛載時', '只在卸載時'],
              answer: isEn ? 'After every render' : '每次渲染後'
            }
          }
        ]
      },
      {
        id: 3,
        title: isEn ? 'Custom Hooks' : '自訂 Hooks',
        description: isEn ? 'Create reusable logic with custom hooks' : '使用自訂 Hooks 建立可重複使用的邏輯',
        questions: [
          {
            id: '3-1',
            content: isEn ?
              'Custom Hooks are a mechanism to reuse stateful logic between components. They always start with "use".' :
              '自訂 Hooks 是在組件間重複使用有狀態邏輯的機制。它們總是以 "use" 開頭。',
            codeExample: 'function useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  \n  const increment = () => setCount(count + 1);\n  const decrement = () => setCount(count - 1);\n  \n  return { count, increment, decrement };\n}',
            quiz: {
              question: isEn ? 'What must custom hooks start with?' : '自訂 Hooks 必須以什麼開頭？',
              options: isEn ?
                ['"use"', '"hook"', '"custom"', '"react"'] :
                ['"use"', '"hook"', '"custom"', '"react"'],
              answer: '"use"'
            }
          }
        ]
      }
    ];
  },

  /**
   * 生成 React 生態系統主題的模組
   */
  generateEcosystemModules(isEn, themeName) {
    return [
      {
        id: 1,
        title: isEn ? 'React Router' : 'React Router',
        description: isEn ? 'Navigate between pages with React Router' : '使用 React Router 在頁面間導航',
        questions: [
          {
            id: '1-1',
            content: isEn ?
              'React Router is a standard library for routing in React applications. It enables navigation among views.' :
              'React Router 是 React 應用程式中路由的標準函式庫。它能在視圖間進行導航。',
            codeExample: 'import { BrowserRouter, Route, Routes } from \'react-router-dom\';\n\n<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n  </Routes>\n</BrowserRouter>',
            quiz: {
              question: isEn ? 'What is React Router used for?' : 'React Router 用於什麼？',
              options: isEn ?
                ['Navigation between pages', 'State management', 'Component styling', 'API calls'] :
                ['頁面間導航', '狀態管理', '組件樣式', 'API 調用'],
              answer: isEn ? 'Navigation between pages' : '頁面間導航'
            }
          }
        ]
      },
      {
        id: 2,
        title: isEn ? 'State Management' : '狀態管理',
        description: isEn ? 'Manage application state effectively' : '有效管理應用程式狀態',
        questions: [
          {
            id: '2-1',
            content: isEn ?
              'State management in React can be handled with useState, useReducer, or external libraries like Redux.' :
              'React 中的狀態管理可以使用 useState、useReducer 或像 Redux 這樣的外部函式庫。',
            codeExample: 'const [state, dispatch] = useReducer(reducer, initialState);\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case \'increment\':\n      return { count: state.count + 1 };\n    default:\n      return state;\n  }\n}',
            quiz: {
              question: isEn ? 'Which is NOT a state management option in React?' : '以下哪個不是 React 的狀態管理選項？',
              options: isEn ?
                ['jQuery', 'useState', 'useReducer', 'Redux'] :
                ['jQuery', 'useState', 'useReducer', 'Redux'],
              answer: 'jQuery'
            }
          }
        ]
      },
      {
        id: 3,
        title: isEn ? 'React Testing' : 'React 測試',
        description: isEn ? 'Test React components and applications' : '測試 React 組件和應用程式',
        questions: [
          {
            id: '3-1',
            content: isEn ?
              'Testing React components ensures your application works as expected. Popular tools include Jest and React Testing Library.' :
              '測試 React 組件確保您的應用程式按預期工作。熱門工具包括 Jest 和 React Testing Library。',
            codeExample: 'import { render, screen } from \'@testing-library/react\';\nimport userEvent from \'@testing-library/user-event\';\n\ntest(\'renders button and handles click\', async () => {\n  render(<Button>Click me</Button>);\n  const button = screen.getByRole(\'button\');\n  await userEvent.click(button);\n});',
            quiz: {
              question: isEn ? 'What is React Testing Library used for?' : 'React Testing Library 用於什麼？',
              options: isEn ?
                ['Testing React components', 'Building components', 'Styling components', 'Routing'] :
                ['測試 React 組件', '建立組件', '樣式化組件', '路由'],
              answer: isEn ? 'Testing React components' : '測試 React 組件'
            }
          }
        ]
      }
    ];
  },

  /**
   * 異步載入本地模組資料（備用方法）
   */
  async loadLocalModules() {
    try {
      const response = await fetch('/src/data/modules.json');
      if (response.ok) {
        const localData = await response.json();
        console.log('✅ 成功載入本地 modules.json 資料');
        return localData;
      }
    } catch (error) {
      console.warn('⚠️ 無法載入本地 modules.json:', error.message);
    }
    return null;
  }
};

/**
 * AI 題目生成服務
 */
export const aiQuestionService = {
  /**
   * 生成 AI 題目
   * @param {Object} params - 生成參數
   * @param {string} params.topic_category - 主題類別
   * @param {string} params.difficulty_level - 難度等級
   * @param {string} params.question_type - 題目類型
   * @param {Object} params.user_context - 用戶上下文
   * @returns {Promise<Object>} 生成的題目
   */
  async generateQuestion(params = {}) {
    const requestData = createN8nRequest(N8N_ACTIONS.GENERATE_QUESTIONS, {
      [N8N_VARIABLES.TOPIC_CATEGORY]: params.topic_category || 'react-basics',
      [N8N_VARIABLES.DIFFICULTY_LEVEL]: params.difficulty_level || DIFFICULTY_LEVELS.INTERMEDIATE,
      [N8N_VARIABLES.QUESTION_TYPE]: params.question_type || QUESTION_TYPES.CODE_BLOCKS,
      [N8N_VARIABLES.LANGUAGE_CODE]: params.language_code || 'zh-TW',
      [N8N_VARIABLES.USER_PROGRESS]: params.user_context || {},
      generation_mode: 'single',
      include_hints: true,
      include_explanation: true
    });

    try {
      const response = await apiCall(API_ENDPOINTS.challenge.n8nGetChallenge, {
        method: 'POST',
        body: JSON.stringify(requestData)
      });
      
      const data = validateN8nResponse(response);
      
      // 標準化題目格式，相容現有 challenge 結構
      return this.normalizeGeneratedQuestion(data.question || data);
      
    } catch (error) {
      console.warn('AI 題目生成失敗，使用本地降級題目:', error.message);
      return this.getFallbackQuestion(params);
    }
  },

  /**
   * 批量生成 AI 題目
   * @param {Object} params - 生成參數
   * @param {number} count - 題目數量
   * @returns {Promise<Array>} 生成的題目列表
   */
  async generateMultipleQuestions(params = {}, count = 5) {
    const requestData = createN8nRequest(N8N_ACTIONS.GENERATE_QUESTIONS, {
      ...params,
      generation_mode: 'batch',
      question_count: count
    });

    try {
      const response = await apiCall(API_ENDPOINTS.challenge.n8nGetChallenge, {
        method: 'POST',
        body: JSON.stringify(requestData)
      });
      
      const data = validateN8nResponse(response);
      
      return (data.questions || []).map(q => this.normalizeGeneratedQuestion(q));
      
    } catch (error) {
      console.warn('批量 AI 題目生成失敗:', error.message);
      return [];
    }
  },

  /**
   * 標準化生成的題目格式
   */
  normalizeGeneratedQuestion(question) {
    return {
      id: question.id || `ai-${Date.now()}`,
      prompt: question.prompt || question.description || '',
      codeBlocks: this.normalizeCodeBlocks(question.code_blocks || question.codeBlocks || []),
      answerOrder: question.answer_order || question.answerOrder || [],
      hints: question.hints || [],
      explanation: question.explanation || '',
      difficulty: question.difficulty || DIFFICULTY_LEVELS.INTERMEDIATE,
      estimatedTime: question.estimated_time || 5,
      tags: question.tags || [],
      source: 'ai-generated'
    };
  },

  /**
   * 標準化程式碼區塊格式
   */
  normalizeCodeBlocks(blocks) {
    return blocks.map((block, index) => ({
      id: block.id || String(index + 1),
      text: block.text || block.content || '',
      isDistractor: block.is_distractor || block.isDistractor || false
    }));
  },

  /**
   * 降級題目（本地備用）
   */
  getFallbackQuestion(params) {
    const isEn = params.language_code === 'en-US';
    
    return {
      id: 'fallback-question',
      prompt: isEn 
        ? 'Create a simple React component (fallback question)'
        : '建立一個簡單的 React 組件（降級題目）',
      codeBlocks: [
        { id: '1', text: 'function MyComponent() {' },
        { id: '2', text: '  return <div>Hello World</div>;' },
        { id: '3', text: '}' }
      ],
      answerOrder: ['1', '2', '3'],
      hints: [isEn ? 'Start with function declaration' : '從函數宣告開始'],
      source: 'fallback'
    };
  }
};

/**
 * 進度追蹤服務
 */
export const progressService = {
  /**
   * 追蹤學習進度
   * @param {Object} progressData - 進度資料
   * @returns {Promise<void>}
   */
  async trackProgress(progressData) {
    const requestData = createN8nRequest(N8N_ACTIONS.TRACK_PROGRESS, {
      [N8N_VARIABLES.USER_PROGRESS]: progressData,
      [N8N_VARIABLES.TIMESTAMP]: new Date().toISOString()
    });

    try {
      await apiCall(API_ENDPOINTS.progress.updateProgress, {
        method: 'POST',
        body: JSON.stringify(requestData)
      });
      
      if (DEV_CONFIG.enableApiLogs) {
        console.log('✅ 進度追蹤成功');
      }
      
    } catch (error) {
      console.warn('進度追蹤失敗，但不影響用戶體驗:', error.message);
    }
  }
};

export default {
  themeService,
  aiQuestionService, 
  progressService,
  N8N_VARIABLES,
  N8N_ACTIONS,
  QUESTION_TYPES,
  DIFFICULTY_LEVELS
};