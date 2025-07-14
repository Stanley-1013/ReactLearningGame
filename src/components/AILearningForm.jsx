/**
 * AI 學習課程生成表單
 * 
 * 功能：
 * - 收集用戶名稱和想學習的主題
 * - 提供預設主題選項和自由輸入
 * - 調用 n8n + Gemini API 生成客製化課程
 * - 顯示生成進度和結果預覽
 * - 將生成的課程加入動態主題列表
 */

import { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './AILearningForm.css';

// 預設學習主題選項
const PRESET_TOPICS = {
  'zh-TW': [
    { id: 'python', label: 'Python 程式設計', icon: '🐍', description: '從基礎到進階的 Python 學習' },
    { id: 'javascript', label: 'JavaScript 開發', icon: '📜', description: '現代 JavaScript 和 ES6+' },
    { id: 'vue', label: 'Vue.js 框架', icon: '💚', description: '漸進式 JavaScript 框架' },
    { id: 'react', label: 'React 開發', icon: '⚛️', description: 'React 組件化開發' },
    { id: 'nodejs', label: 'Node.js 後端', icon: '🟢', description: '伺服器端 JavaScript 開發' },
    { id: 'machine-learning', label: '機器學習', icon: '🤖', description: 'AI 和 ML 基礎概念' },
    { id: 'web-design', label: '網頁設計', icon: '🎨', description: 'HTML、CSS 和設計原則' },
    { id: 'database', label: '資料庫設計', icon: '🗄️', description: 'SQL 和資料庫管理' },
    { id: 'devops', label: 'DevOps 實務', icon: '⚙️', description: '部署和維運自動化' },
    { id: 'mobile', label: '手機應用開發', icon: '📱', description: 'iOS 和 Android 開發' }
  ],
  'en-US': [
    { id: 'python', label: 'Python Programming', icon: '🐍', description: 'From basics to advanced Python' },
    { id: 'javascript', label: 'JavaScript Development', icon: '📜', description: 'Modern JavaScript and ES6+' },
    { id: 'vue', label: 'Vue.js Framework', icon: '💚', description: 'Progressive JavaScript framework' },
    { id: 'react', label: 'React Development', icon: '⚛️', description: 'Component-based development' },
    { id: 'nodejs', label: 'Node.js Backend', icon: '🟢', description: 'Server-side JavaScript' },
    { id: 'machine-learning', label: 'Machine Learning', icon: '🤖', description: 'AI and ML fundamentals' },
    { id: 'web-design', label: 'Web Design', icon: '🎨', description: 'HTML, CSS and design principles' },
    { id: 'database', label: 'Database Design', icon: '🗄️', description: 'SQL and database management' },
    { id: 'devops', label: 'DevOps Practices', icon: '⚙️', description: 'Deployment and automation' },
    { id: 'mobile', label: 'Mobile Development', icon: '📱', description: 'iOS and Android development' }
  ]
};

function AILearningForm({ 
  isOpen, 
  onClose, 
  onCourseGenerated,
  className = ''
}) {
  const { currentLanguage, isLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    userName: '',
    selectedTopic: '',
    customTopic: '',
    difficulty: 'beginner',
    moduleCount: 5,
    includeExercises: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');
  const [error, setError] = useState(null);
  const [showCustomInput, setShowCustomInput] = useState(false);

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 取得當前語言的預設主題
   */
  const presetTopics = PRESET_TOPICS[currentLanguage] || PRESET_TOPICS['zh-TW'];

  /**
   * 處理表單欄位變更
   */
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除錯誤
    if (error) {
      setError(null);
    }
  }, [error]);

  /**
   * 處理主題選擇
   */
  const handleTopicSelect = useCallback((topicId) => {
    if (topicId === 'custom') {
      setShowCustomInput(true);
      handleInputChange('selectedTopic', '');
    } else {
      setShowCustomInput(false);
      handleInputChange('selectedTopic', topicId);
      handleInputChange('customTopic', '');
    }
  }, [handleInputChange]);

  /**
   * 驗證表單資料
   */
  const validateForm = useCallback(() => {
    if (!formData.userName.trim()) {
      return getText('請輸入您的姓名', 'Please enter your name');
    }
    
    const topic = formData.customTopic.trim() || formData.selectedTopic;
    if (!topic) {
      return getText('請選擇或輸入學習主題', 'Please select or enter a learning topic');
    }
    
    if (formData.moduleCount < 3 || formData.moduleCount > 15) {
      return getText('模組數量請設在 3-15 之間', 'Module count should be between 3-15');
    }
    
    return null;
  }, [formData, getText]);

  /**
   * 準備 API 請求資料
   */
  const prepareRequestData = useCallback(() => {
    const finalTopic = formData.customTopic.trim() || formData.selectedTopic;
    const selectedPreset = presetTopics.find(t => t.id === formData.selectedTopic);
    
    return {
      user_name: formData.userName.trim(),
      learning_topic: finalTopic,
      topic_type: formData.selectedTopic || 'custom',
      topic_description: selectedPreset?.description || '',
      difficulty_level: formData.difficulty,
      module_count: formData.moduleCount,
      include_exercises: formData.includeExercises,
      language_code: currentLanguage,
      request_timestamp: new Date().toISOString()
    };
  }, [formData, presetTopics, currentLanguage]);

  /**
   * 模擬生成進度（實際上會從 n8n webhook 獲得）
   */
  const simulateProgress = useCallback(async () => {
    const stages = [
      { progress: 10, stage: getText('正在分析學習需求...', 'Analyzing learning requirements...') },
      { progress: 25, stage: getText('調用 Gemini AI 生成大綱...', 'Calling Gemini AI for outline...') },
      { progress: 50, stage: getText('生成課程模組內容...', 'Generating course modules...') },
      { progress: 75, stage: getText('建立練習題和程式碼範例...', 'Creating exercises and code examples...') },
      { progress: 90, stage: getText('整理課程結構...', 'Organizing course structure...') },
      { progress: 100, stage: getText('課程生成完成！', 'Course generation completed!') }
    ];

    for (const { progress, stage } of stages) {
      setGenerationProgress(progress);
      setGenerationStage(stage);
      // 實際情況下會從 n8n 取得真實進度
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    }
  }, [getText]);

  /**
   * 提交表單並生成課程
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // 驗證表單
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationProgress(0);
    setGenerationStage('');

    try {
      // 準備請求資料
      const requestData = prepareRequestData();
      console.log('🤖 發送 AI 課程生成請求:', requestData);

      // 開始進度模擬
      const progressPromise = simulateProgress();

      // TODO: 實際的 n8n API 調用
      // const response = await fetch('/api/n8n/generate-ai-course', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(requestData)
      // });

      // 等待進度完成
      await progressPromise;

      // 模擬生成的課程資料
      const mockCourseData = {
        id: `ai-course-${Date.now()}`,
        name: `${requestData.learning_topic} ${getText('課程', 'Course')}`,
        description: getText(
          `為 ${requestData.user_name} 客製化的 ${requestData.learning_topic} 學習課程`,
          `Customized ${requestData.learning_topic} course for ${requestData.user_name}`
        ),
        category: 'ai-generated',
        difficulty: requestData.difficulty_level,
        estimatedTime: requestData.module_count * 30, // 30分鐘/模組
        tags: [requestData.learning_topic, 'AI 生成', 'personalized'],
        isAIGenerated: true,
        generatedFor: requestData.user_name,
        generatedAt: new Date().toISOString(),
        modules: generateMockModules(requestData)
      };

      console.log('✅ AI 課程生成成功:', mockCourseData);

      // 通知父組件
      if (onCourseGenerated) {
        onCourseGenerated(mockCourseData);
      }

      // 重置表單並關閉
      setFormData({
        userName: '',
        selectedTopic: '',
        customTopic: '',
        difficulty: 'beginner',
        moduleCount: 5,
        includeExercises: true
      });
      
      if (onClose) {
        onClose();
      }

    } catch (err) {
      console.error('❌ AI 課程生成失敗:', err);
      setError(getText(
        '課程生成失敗，請稍後再試',
        'Course generation failed, please try again later'
      ));
    } finally {
      setIsGenerating(false);
    }
  }, [
    validateForm, 
    prepareRequestData, 
    simulateProgress, 
    onCourseGenerated, 
    onClose, 
    getText
  ]);

  /**
   * 生成模擬的模組資料
   */
  const generateMockModules = (requestData) => {
    const modules = [];
    const { learning_topic, module_count, difficulty_level } = requestData;
    
    for (let i = 1; i <= module_count; i++) {
      modules.push({
        id: i,
        title: getText(
          `${learning_topic} 模組 ${i}`,
          `${learning_topic} Module ${i}`
        ),
        description: getText(
          `深入學習 ${learning_topic} 的核心概念 ${i}`,
          `Learn core ${learning_topic} concepts ${i}`
        ),
        questions: [{
          id: `${i}-1`,
          content: getText(
            `這是關於 ${learning_topic} 的第 ${i} 個學習單元，專為 ${difficulty_level} 程度設計。`,
            `This is the ${i}th learning unit about ${learning_topic}, designed for ${difficulty_level} level.`
          ),
          codeExample: `// ${learning_topic} 範例 ${i}\nconsole.log("Learning ${learning_topic}!");`,
          quiz: {
            question: getText(
              `關於 ${learning_topic} 的問題 ${i}？`,
              `Question ${i} about ${learning_topic}?`
            ),
            options: [
              getText('選項 A', 'Option A'),
              getText('選項 B', 'Option B'),
              getText('選項 C', 'Option C'),
              getText('選項 D', 'Option D')
            ],
            answer: getText('選項 A', 'Option A')
          }
        }]
      });
    }
    
    return modules;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`ai-learning-form-overlay ${className}`}>
      <div className="ai-learning-form">
        <div className="form-header">
          <h2>
            🤖 {getText('AI 課程生成器', 'AI Course Generator')}
          </h2>
          <button 
            className="close-btn"
            onClick={onClose}
            disabled={isGenerating}
          >
            ✕
          </button>
        </div>

        {isGenerating ? (
          <div className="generation-progress">
            <div className="progress-circle">
              <div className="progress-text">{generationProgress}%</div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <div className="progress-stage">{generationStage}</div>
            <p className="progress-description">
              {getText(
                '正在為您生成專屬課程，請稍候...',
                'Generating your personalized course, please wait...'
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-content">
            {/* 姓名輸入 */}
            <div className="form-group">
              <label htmlFor="userName">
                👤 {getText('您的姓名', 'Your Name')}
              </label>
              <input
                id="userName"
                type="text"
                value={formData.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
                placeholder={getText('請輸入您的姓名', 'Enter your name')}
                disabled={isGenerating}
              />
            </div>

            {/* 主題選擇 */}
            <div className="form-group">
              <label>
                📚 {getText('學習主題', 'Learning Topic')}
              </label>
              <div className="topic-grid">
                {presetTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    className={`topic-btn ${formData.selectedTopic === topic.id ? 'selected' : ''}`}
                    onClick={() => handleTopicSelect(topic.id)}
                    disabled={isGenerating}
                  >
                    <span className="topic-icon">{topic.icon}</span>
                    <span className="topic-label">{topic.label}</span>
                    <span className="topic-description">{topic.description}</span>
                  </button>
                ))}
                
                {/* 自訂主題選項 */}
                <button
                  type="button"
                  className={`topic-btn custom-topic ${showCustomInput ? 'selected' : ''}`}
                  onClick={() => handleTopicSelect('custom')}
                  disabled={isGenerating}
                >
                  <span className="topic-icon">✏️</span>
                  <span className="topic-label">
                    {getText('自訂主題', 'Custom Topic')}
                  </span>
                  <span className="topic-description">
                    {getText('輸入您想學的任何主題', 'Enter any topic you want to learn')}
                  </span>
                </button>
              </div>

              {/* 自訂主題輸入框 */}
              {showCustomInput && (
                <div className="custom-topic-input">
                  <input
                    type="text"
                    value={formData.customTopic}
                    onChange={(e) => handleInputChange('customTopic', e.target.value)}
                    placeholder={getText(
                      '例如：區塊鏈開發、數據科學、UI/UX設計...',
                      'e.g., Blockchain development, Data Science, UI/UX Design...'
                    )}
                    disabled={isGenerating}
                  />
                </div>
              )}
            </div>

            {/* 課程設定 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="difficulty">
                  📊 {getText('難度等級', 'Difficulty Level')}
                </label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  disabled={isGenerating}
                >
                  <option value="beginner">{getText('初學者', 'Beginner')}</option>
                  <option value="intermediate">{getText('中級', 'Intermediate')}</option>
                  <option value="advanced">{getText('進階', 'Advanced')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="moduleCount">
                  📋 {getText('模組數量', 'Module Count')}
                </label>
                <input
                  id="moduleCount"
                  type="number"
                  min="3"
                  max="15"
                  value={formData.moduleCount}
                  onChange={(e) => handleInputChange('moduleCount', parseInt(e.target.value))}
                  disabled={isGenerating}
                />
              </div>
            </div>

            {/* 選項設定 */}
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.includeExercises}
                  onChange={(e) => handleInputChange('includeExercises', e.target.checked)}
                  disabled={isGenerating}
                />
                <span className="checkmark"></span>
                🏃‍♂️ {getText('包含實作練習和程式碼範例', 'Include hands-on exercises and code examples')}
              </label>
            </div>

            {/* 錯誤訊息 */}
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            {/* 提交按鈕 */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={onClose}
                disabled={isGenerating}
              >
                {getText('取消', 'Cancel')}
              </button>
              <button
                type="submit"
                className="btn-generate"
                disabled={isGenerating}
              >
                <span className="btn-icon">🚀</span>
                {getText('生成我的專屬課程', 'Generate My Course')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AILearningForm;