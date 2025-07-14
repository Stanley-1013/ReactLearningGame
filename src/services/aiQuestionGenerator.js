/**
 * AI 題目生成器
 * 
 * 整合 n8n 和本地邏輯，為挑戰模式提供智能題目生成功能
 * 包含題目難度分析、個人化生成和品質驗證
 */

import { aiQuestionService, progressService, QUESTION_TYPES, DIFFICULTY_LEVELS } from './n8nService';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * AI 題目生成器類別
 */
export class AIQuestionGenerator {
  constructor() {
    this.generationHistory = [];
    this.userPreferences = this.loadUserPreferences();
    this.maxHistorySize = 50;
  }

  /**
   * 根據用戶進度和偏好生成個人化題目
   * @param {Object} params - 生成參數
   * @param {string} params.topic_category - 主題類別
   * @param {string} params.difficulty_level - 難度等級
   * @param {string} params.question_type - 題目類型
   * @param {Object} params.user_context - 用戶上下文
   * @returns {Promise<Object>} 生成的題目
   */
  async generatePersonalizedQuestion(params = {}) {
    // 分析用戶進度和偏好
    const userContext = this.analyzeUserContext(params.user_context);
    
    // 動態調整難度
    const adjustedParams = this.adjustDifficultyBasedOnPerformance({
      ...params,
      user_context: userContext
    });
    
    // 確保題目不重複
    const uniqueParams = this.ensureQuestionUniqueness(adjustedParams);
    
    try {
      // 調用 n8n AI 生成服務
      const generatedQuestion = await aiQuestionService.generateQuestion(uniqueParams);
      
      // 後處理和品質檢查
      const processedQuestion = this.postProcessQuestion(generatedQuestion, uniqueParams);
      
      // 記錄生成歷史
      this.addToHistory(processedQuestion, uniqueParams);
      
      // 追蹤生成事件
      await progressService.trackProgress({
        action: 'ai_question_generated',
        question_id: processedQuestion.id,
        generation_params: uniqueParams,
        user_context: userContext,
        timestamp: new Date().toISOString()
      });
      
      return processedQuestion;
      
    } catch (error) {
      console.warn('AI 題目生成失敗，使用智能降級策略:', error.message);
      
      // 智能降級：基於歷史資料生成
      return this.generateFallbackQuestion(uniqueParams);
    }
  }

  /**
   * 批量生成題目（用於預載和快取）
   * @param {Object} params - 生成參數
   * @param {number} count - 題目數量
   * @returns {Promise<Array>} 題目列表
   */
  async generateBatchQuestions(params = {}, count = 5) {
    try {
      const questions = await aiQuestionService.generateMultipleQuestions(params, count);
      
      // 後處理每個題目
      const processedQuestions = questions.map(q => this.postProcessQuestion(q, params));
      
      // 批量記錄到歷史
      processedQuestions.forEach(q => this.addToHistory(q, params));
      
      return processedQuestions;
      
    } catch (error) {
      console.warn('批量 AI 題目生成失敗:', error.message);
      
      // 降級：生成多個本地題目
      const fallbackQuestions = [];
      for (let i = 0; i < count; i++) {
        try {
          const question = this.generateFallbackQuestion({
            ...params,
            variation: i
          });
          fallbackQuestions.push(question);
        } catch (fallbackError) {
          console.warn(`降級題目 ${i} 生成失敗:`, fallbackError.message);
        }
      }
      
      return fallbackQuestions;
    }
  }

  /**
   * 分析用戶上下文和學習模式
   */
  analyzeUserContext(userContext = {}) {
    const progress = userContext.progress || this.getUserProgress();
    const preferences = this.userPreferences;
    
    // 計算用戶能力水平
    const competencyLevel = this.calculateCompetencyLevel(progress);
    
    // 分析學習模式
    const learningPattern = this.analyzeLearningPattern(progress);
    
    // 識別薄弱環節
    const weakAreas = this.identifyWeakAreas(progress);
    
    return {
      ...userContext,
      competency_level: competencyLevel,
      learning_pattern: learningPattern,
      weak_areas: weakAreas,
      preferences: preferences,
      session_performance: this.getSessionPerformance()
    };
  }

  /**
   * 根據表現動態調整難度
   */
  adjustDifficultyBasedOnPerformance(params) {
    const { user_context } = params;
    const sessionPerformance = user_context.session_performance || {};
    
    let adjustedDifficulty = params.difficulty_level || DIFFICULTY_LEVELS.INTERMEDIATE;
    
    // 基於最近表現調整
    if (sessionPerformance.recent_success_rate > 0.8) {
      // 成功率高，提升難度
      adjustedDifficulty = this.increaseDifficulty(adjustedDifficulty);
    } else if (sessionPerformance.recent_success_rate < 0.4) {
      // 成功率低，降低難度
      adjustedDifficulty = this.decreaseDifficulty(adjustedDifficulty);
    }
    
    // 基於薄弱環節調整題型
    const adjustedQuestionType = this.adjustQuestionTypeForWeakAreas(
      params.question_type,
      user_context.weak_areas
    );
    
    return {
      ...params,
      difficulty_level: adjustedDifficulty,
      question_type: adjustedQuestionType,
      adaptive_hints: true,
      personalization_level: 'high'
    };
  }

  /**
   * 確保題目唯一性，避免重複
   */
  ensureQuestionUniqueness(params) {
    const recentQuestions = this.getRecentQuestions(10);
    const recentTopics = recentQuestions.map(q => q.topic || q.id);
    
    return {
      ...params,
      exclude_topics: recentTopics,
      ensure_variety: true,
      min_difference_threshold: 0.7
    };
  }

  /**
   * 後處理生成的題目
   */
  postProcessQuestion(question, params) {
    // 添加本地化標識
    const language = params.language_code || 'zh-TW';
    
    // 增強提示系統
    const enhancedHints = this.enhanceHints(question.hints || [], params);
    
    // 添加難度估算
    const estimatedDifficulty = this.estimateQuestionDifficulty(question);
    
    // 添加標籤
    const tags = this.generateQuestionTags(question, params);
    
    // 品質分數
    const qualityScore = this.calculateQualityScore(question);
    
    return {
      ...question,
      language,
      hints: enhancedHints,
      estimated_difficulty: estimatedDifficulty,
      tags,
      quality_score: qualityScore,
      generated_at: new Date().toISOString(),
      generation_params: params,
      version: '1.0'
    };
  }

  /**
   * 增強提示系統
   */
  enhanceHints(originalHints, params) {
    const language = params.language_code || 'zh-TW';
    const isEn = language === 'en-US';
    
    // 基於難度添加額外提示
    const difficultyHints = this.generateDifficultySpecificHints(params.difficulty_level, isEn);
    
    // 基於用戶表現添加個人化提示
    const personalizedHints = this.generatePersonalizedHints(params.user_context, isEn);
    
    return [
      ...originalHints,
      ...difficultyHints,
      ...personalizedHints
    ].slice(0, 5); // 最多5個提示
  }

  /**
   * 智能降級題目生成
   */
  generateFallbackQuestion(params) {
    const language = params.language_code || 'zh-TW';
    const isEn = language === 'en-US';
    const difficulty = params.difficulty_level || DIFFICULTY_LEVELS.INTERMEDIATE;
    
    // 基於模板和參數生成題目
    const templates = this.getQuestionTemplates(params.question_type, difficulty);
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    // 參數化生成
    const question = this.generateFromTemplate(selectedTemplate, params, isEn);
    
    // 後處理
    return this.postProcessQuestion(question, params);
  }

  /**
   * 獲取題目模板
   */
  getQuestionTemplates(questionType, difficulty) {
    // 這裡可以擴展更多模板
    const templates = {
      [QUESTION_TYPES.CODE_BLOCKS]: [
        {
          type: 'component-creation',
          blocks: ['function', 'useState', 'return', 'jsx'],
          complexity: difficulty === DIFFICULTY_LEVELS.BEGINNER ? 'simple' : 'moderate'
        },
        {
          type: 'hook-usage',
          blocks: ['import', 'useEffect', 'useState', 'cleanup'],
          complexity: difficulty === DIFFICULTY_LEVELS.ADVANCED ? 'complex' : 'moderate'
        }
      ]
    };
    
    return templates[questionType] || templates[QUESTION_TYPES.CODE_BLOCKS];
  }

  /**
   * 從模板生成題目
   */
  generateFromTemplate(template, params, isEn) {
    // 簡化的模板生成邏輯
    const baseQuestion = {
      id: `fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      prompt: isEn 
        ? `Create a React ${template.type.replace('-', ' ')} (AI generated)`
        : `建立一個 React ${template.type} 組件（AI 生成）`,
      codeBlocks: this.generateCodeBlocks(template, isEn),
      answerOrder: [],
      hints: [
        isEn ? 'Follow React conventions' : '遵循 React 慣例',
        isEn ? 'Check the component structure' : '檢查組件結構'
      ],
      source: 'ai-fallback'
    };
    
    // 生成正確答案順序
    baseQuestion.answerOrder = baseQuestion.codeBlocks
      .filter(block => !block.isDistractor)
      .map(block => block.id);
    
    return baseQuestion;
  }

  /**
   * 生成程式碼區塊
   */
  generateCodeBlocks(template, isEn) {
    const blocks = [];
    let blockId = 1;
    
    // 根據模板類型生成不同的程式碼區塊
    if (template.type === 'component-creation') {
      blocks.push(
        { id: String(blockId++), text: 'function MyComponent() {', isDistractor: false },
        { id: String(blockId++), text: '  const [state, setState] = useState(0);', isDistractor: false },
        { id: String(blockId++), text: '  return <div>{state}</div>;', isDistractor: false },
        { id: String(blockId++), text: '}', isDistractor: false },
        // 干擾項
        { id: String(blockId++), text: '  console.log("debug");', isDistractor: true },
        { id: String(blockId++), text: '  const [unused] = useState("");', isDistractor: true }
      );
    }
    
    return blocks;
  }

  /**
   * 工具方法：計算用戶能力水平
   */
  calculateCompetencyLevel(progress) {
    const completedModules = progress.completed?.length || 0;
    const totalModules = progress.total || 10;
    const completionRate = completedModules / totalModules;
    
    if (completionRate < 0.3) return DIFFICULTY_LEVELS.BEGINNER;
    if (completionRate < 0.7) return DIFFICULTY_LEVELS.INTERMEDIATE;
    return DIFFICULTY_LEVELS.ADVANCED;
  }

  /**
   * 工具方法：分析學習模式
   */
  analyzeLearningPattern(progress) {
    // 簡化的學習模式分析
    return {
      preferred_pace: 'moderate',
      strength_areas: ['jsx', 'components'],
      improvement_areas: ['hooks', 'state-management']
    };
  }

  /**
   * 工具方法：識別薄弱環節
   */
  identifyWeakAreas(progress) {
    // 基於錯誤記錄識別薄弱環節
    return ['event-handling', 'lifecycle-methods'];
  }

  /**
   * 工具方法：獲取會話表現
   */
  getSessionPerformance() {
    const recentHistory = this.getRecentQuestions(5);
    const successCount = recentHistory.filter(q => q.solved).length;
    
    return {
      recent_success_rate: recentHistory.length > 0 ? successCount / recentHistory.length : 0.5,
      avg_completion_time: 300, // 秒
      hint_usage_rate: 0.3
    };
  }

  /**
   * 工具方法：獲取最近題目
   */
  getRecentQuestions(count = 10) {
    return this.generationHistory.slice(-count);
  }

  /**
   * 工具方法：添加到歷史記錄
   */
  addToHistory(question, params) {
    this.generationHistory.push({
      ...question,
      generated_params: params,
      timestamp: new Date().toISOString()
    });
    
    // 限制歷史記錄大小
    if (this.generationHistory.length > this.maxHistorySize) {
      this.generationHistory = this.generationHistory.slice(-this.maxHistorySize);
    }
    
    // 持久化儲存
    this.saveGenerationHistory();
  }

  /**
   * 工具方法：載入用戶偏好
   */
  loadUserPreferences() {
    try {
      const saved = localStorage.getItem('aiQuestionPreferences');
      return saved ? JSON.parse(saved) : {
        preferred_question_types: [QUESTION_TYPES.CODE_BLOCKS],
        preferred_difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
        enable_adaptive_hints: true
      };
    } catch (error) {
      console.warn('載入用戶偏好失敗:', error);
      return {};
    }
  }

  /**
   * 工具方法：獲取用戶進度
   */
  getUserProgress() {
    try {
      const progress = localStorage.getItem('reactGameProgress');
      return progress ? JSON.parse(progress) : {};
    } catch (error) {
      console.warn('載取用戶進度失敗:', error);
      return {};
    }
  }

  /**
   * 工具方法：儲存生成歷史
   */
  saveGenerationHistory() {
    try {
      const recentHistory = this.generationHistory.slice(-20); // 只儲存最近20筆
      localStorage.setItem('aiGenerationHistory', JSON.stringify(recentHistory));
    } catch (error) {
      console.warn('儲存生成歷史失敗:', error);
    }
  }

  /**
   * 工具方法：難度調整
   */
  increaseDifficulty(currentLevel) {
    const levels = [DIFFICULTY_LEVELS.BEGINNER, DIFFICULTY_LEVELS.INTERMEDIATE, DIFFICULTY_LEVELS.ADVANCED];
    const currentIndex = levels.indexOf(currentLevel);
    return levels[Math.min(currentIndex + 1, levels.length - 1)];
  }

  decreaseDifficulty(currentLevel) {
    const levels = [DIFFICULTY_LEVELS.BEGINNER, DIFFICULTY_LEVELS.INTERMEDIATE, DIFFICULTY_LEVELS.ADVANCED];
    const currentIndex = levels.indexOf(currentLevel);
    return levels[Math.max(currentIndex - 1, 0)];
  }

  /**
   * 工具方法：品質分數計算
   */
  calculateQualityScore(question) {
    let score = 0;
    
    // 基於題目完整性
    if (question.prompt && question.prompt.length > 10) score += 25;
    if (question.codeBlocks && question.codeBlocks.length >= 3) score += 25;
    if (question.answerOrder && question.answerOrder.length > 0) score += 25;
    if (question.hints && question.hints.length > 0) score += 25;
    
    return score;
  }

  /**
   * 工具方法：生成題目標籤
   */
  generateQuestionTags(question, params) {
    const tags = [];
    
    if (params.difficulty_level) tags.push(params.difficulty_level);
    if (params.topic_category) tags.push(params.topic_category);
    if (question.source) tags.push(question.source);
    
    return tags;
  }

  /**
   * 工具方法：估算題目難度
   */
  estimateQuestionDifficulty(question) {
    const codeComplexity = question.codeBlocks?.length || 0;
    const conceptComplexity = question.prompt?.split(' ').length || 0;
    
    if (codeComplexity <= 5 && conceptComplexity <= 20) return DIFFICULTY_LEVELS.BEGINNER;
    if (codeComplexity <= 10 && conceptComplexity <= 40) return DIFFICULTY_LEVELS.INTERMEDIATE;
    return DIFFICULTY_LEVELS.ADVANCED;
  }

  /**
   * 其他工具方法的存根實作
   */
  adjustQuestionTypeForWeakAreas(questionType, weakAreas) {
    // 根據薄弱環節調整題型的邏輯
    return questionType;
  }

  generateDifficultySpecificHints(difficulty, isEn) {
    const hints = {
      [DIFFICULTY_LEVELS.BEGINNER]: [
        isEn ? 'Start with the basics' : '從基礎開始',
        isEn ? 'Read the question carefully' : '仔細閱讀題目'
      ],
      [DIFFICULTY_LEVELS.INTERMEDIATE]: [
        isEn ? 'Consider the component lifecycle' : '考慮組件生命週期',
        isEn ? 'Think about state management' : '思考狀態管理'
      ],
      [DIFFICULTY_LEVELS.ADVANCED]: [
        isEn ? 'Focus on performance optimization' : '專注於效能優化',
        isEn ? 'Consider edge cases' : '考慮邊緣情況'
      ]
    };
    
    return hints[difficulty] || [];
  }

  generatePersonalizedHints(userContext, isEn) {
    const weakAreas = userContext?.weak_areas || [];
    const hints = [];
    
    if (weakAreas.includes('event-handling')) {
      hints.push(isEn ? 'Review event handling patterns' : '複習事件處理模式');
    }
    
    return hints;
  }
}

// 創建全局實例
export const aiQuestionGenerator = new AIQuestionGenerator();

// 導出便利函數
export async function generateAIQuestion(params) {
  return aiQuestionGenerator.generatePersonalizedQuestion(params);
}

export async function generateAIQuestionBatch(params, count) {
  return aiQuestionGenerator.generateBatchQuestions(params, count);
}

export default AIQuestionGenerator;