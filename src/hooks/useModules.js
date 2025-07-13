import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getRandomItem } from '../utils/arrayUtils';
import modulesZh from '../data/modules.json';
import modulesEn from '../data/modules-en.json';

/**
 * 使用模組資料的自訂 Hook
 * 
 * 功能：
 * - 根據當前語言載入對應的模組資料
 * - 提供模組相關的實用函數
 * - 自動處理語言切換時的資料更新
 */
export function useModules() {
  const { currentLanguage } = useLanguage();
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 載入模組資料
   */
  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 根據語言選擇對應的資料
      const moduleData = currentLanguage === 'en-US' ? modulesEn : modulesZh;
      
      if (moduleData && moduleData.modules) {
        setModules(moduleData.modules);
      } else {
        throw new Error('Invalid module data structure');
      }
    } catch (err) {
      console.error('Failed to load modules:', err);
      setError(err.message);
      // 降級到預設語言
      setModules(modulesZh.modules || []);
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage]);

  /**
   * 根據 ID 取得模組
   * @param {number|string} id - 模組 ID
   * @returns {Object|null} 模組物件或 null
   */
  const getModuleById = (id) => {
    const moduleId = parseInt(id);
    return modules.find(module => module.id === moduleId);
  };

  /**
   * 根據 ID 取得模組並隨機選擇一個題目
   * @param {number|string} id - 模組 ID
   * @returns {Object|null} 包含隨機題目的模組物件
   */
  const getRandomQuestionFromModule = useCallback((id) => {
    const module = getModuleById(id);
    if (!module || !module.questions || module.questions.length === 0) {
      console.warn('getRandomQuestionFromModule: No questions found for module', id);
      return null;
    }

    // 隨機選擇一個題目
    const randomQuestion = getRandomItem(module.questions);

    // 返回包含選中題目的模組物件
    return {
      ...module,
      // 保留原有格式相容性，將選中的題目內容提升到模組層級
      content: randomQuestion.content,
      codeExample: randomQuestion.codeExample,
      quiz: randomQuestion.quiz,
      media: randomQuestion.media,
      // 新增欄位
      currentQuestion: randomQuestion,
      totalQuestions: module.questions.length,
      questionIndex: module.questions.findIndex(q => q.id === randomQuestion.id) + 1
    };
  }, [modules]);

  /**
   * 取得模組的所有題目（用於挑戰模式或複習）
   * @param {number|string} id - 模組 ID
   * @returns {Array} 題目陣列
   */
  const getAllQuestionsFromModule = (id) => {
    const module = getModuleById(id);
    return module?.questions || [];
  };

  /**
   * 取得總模組數量
   */
  const getTotalModules = () => {
    return modules.length;
  };

  /**
   * 檢查模組是否存在
   */
  const moduleExists = (id) => {
    const moduleId = parseInt(id);
    return modules.some(module => module.id === moduleId);
  };

  /**
   * 取得下一個模組 ID
   */
  const getNextModuleId = (currentId) => {
    const moduleId = parseInt(currentId);
    const nextId = moduleId + 1;
    return moduleExists(nextId) ? nextId : null;
  };

  /**
   * 取得上一個模組 ID
   */
  const getPreviousModuleId = (currentId) => {
    const moduleId = parseInt(currentId);
    const prevId = moduleId - 1;
    return moduleExists(prevId) ? prevId : null;
  };

  /**
   * 取得模組進度相關資訊
   */
  const getModuleProgress = (moduleId) => {
    const total = getTotalModules();
    const current = parseInt(moduleId);
    return {
      current,
      total,
      percentage: Math.round((current / total) * 100),
      isFirst: current === 1,
      isLast: current === total
    };
  };

  return {
    modules,
    isLoading,
    error,
    getModuleById,
    getRandomQuestionFromModule,
    getAllQuestionsFromModule,
    getTotalModules,
    moduleExists,
    getNextModuleId,
    getPreviousModuleId,
    getModuleProgress
  };
}

/**
 * 模組相關的實用函數
 */
export const moduleUtils = {
  /**
   * 驗證模組資料結構
   */
  validateModule: (module) => {
    const requiredFields = ['id', 'title', 'content', 'codeExample', 'quiz'];
    return requiredFields.every(field => module && module[field] !== undefined);
  },

  /**
   * 格式化模組標題
   */
  formatTitle: (module, language = 'zh-TW') => {
    if (!module) return '';
    
    const prefix = language === 'en-US' ? 'Lesson' : '關卡';
    return `${prefix} ${module.id}: ${module.title}`;
  },

  /**
   * 取得模組難度（基於內容長度和概念複雜度）
   */
  getDifficulty: (module) => {
    if (!module) return 'unknown';
    
    const contentLength = module.content.length;
    const codeComplexity = module.codeExample.split('\n').length;
    
    if (contentLength < 200 && codeComplexity < 10) return 'beginner';
    if (contentLength < 400 && codeComplexity < 20) return 'intermediate';
    return 'advanced';
  },

  /**
   * 估算學習時間（分鐘）
   */
  getEstimatedTime: (module) => {
    if (!module) return 0;
    
    // 基於內容長度的簡單估算（平均閱讀速度 200 字/分鐘）
    const readingTime = Math.ceil(module.content.length / 200);
    // 程式碼理解時間
    const codeTime = Math.ceil(module.codeExample.split('\n').length / 5);
    // 測驗時間
    const quizTime = 2;
    
    return Math.max(readingTime + codeTime + quizTime, 3); // 最少 3 分鐘
  }
};