import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useModules } from '../hooks/useModules';
import { shuffleArrayWithSeed } from '../utils/arrayUtils';
import './ModulePage.css';

/**
 * ModulePage 元件 - 單一關卡學習頁面
 * 
 * 功能：
 * - 根據路由參數 id 顯示對應關卡內容
 * - 顯示教學內容、程式碼範例、媒體資源
 * - 處理測驗問答，驗證答案
 * - 答對時更新 LocalStorage，解鎖下一關
 * - 支援多語言和 RWD 響應式設計
 */
function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLanguage } = useLanguage();
  const { modules, getModuleById, getTotalModules, isLoading } = useModules();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // 用於強制重新隨機選題
  const prevModuleIdRef = useRef(null); // 追蹤上一次的模組 ID
  const totalModules = getTotalModules();


  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 使用 useMemo 進行隨機選題，只在需要時重新選擇
   */
  const currentModule = useMemo(() => {
    if (isLoading || !modules.length) {
      return null;
    }
    
    const moduleId = parseInt(id);
    const foundModule = getModuleById(moduleId);
    
    if (!foundModule || !foundModule.questions || foundModule.questions.length === 0) {
      return null;
    }

    // 使用穩定的隨機種子來避免無限重新計算
    // 基於 moduleId 和 refreshKey 生成穩定的隨機索引
    const seed = (moduleId * 1000) + refreshKey;
    const randomIndex = seed % foundModule.questions.length;
    const randomQuestion = foundModule.questions[randomIndex];

    // 為選項生成穩定的洗牌結果，使用種子確保每次結果相同
    const shuffleSeed = (moduleId * 10000) + (refreshKey * 100) + randomIndex;
    const shuffledOptions = randomQuestion.quiz?.options ? 
      shuffleArrayWithSeed([...randomQuestion.quiz.options], shuffleSeed) : [];

    // 返回包含選中題目的模組物件
    return {
      ...foundModule,
      // 保留原有格式相容性，將選中的題目內容提升到模組層級
      content: randomQuestion.content,
      codeExample: randomQuestion.codeExample,
      quiz: {
        ...randomQuestion.quiz,
        shuffledOptions // 將洗牌後的選項加入到 quiz 物件中
      },
      media: randomQuestion.media,
      // 新增欄位
      currentQuestion: randomQuestion,
      totalQuestions: foundModule.questions.length,
      questionIndex: foundModule.questions.findIndex(q => q.id === randomQuestion.id) + 1
    };
  }, [id, getModuleById, modules.length, isLoading, refreshKey]);

  /**
   * 重置所有答題狀態（用於切換關卡時）
   * 必須在使用它的 useEffect 之前定義
   */
  const resetQuizState = useCallback(() => {
    setSelectedAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setAudioPlaying(false);
  }, []); // 空依賴陣列，因為只操作 setState

  /**
   * 檢查關卡完成狀態 - 使用 useCallback 避免依賴問題
   * 必須在所有使用它的 useEffect 之前定義
   */
  const checkCompletionStatus = useCallback((moduleId) => {
    const savedProgress = localStorage.getItem('reactGameProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setIsCompleted(progress.completed?.includes(moduleId) || false);
      } catch (error) {
        console.error('讀取進度失敗:', error);
        setIsCompleted(false);
      }
    } else {
      setIsCompleted(false);
    }
  }, []); // 空依賴陣列，因為只操作 localStorage 和 setState

  /**
   * 載入關卡資料 - 只處理導航邏輯，不設定 module 狀態
   */
  useEffect(() => {
    if (!currentModule && !isLoading && modules.length > 0) {
      // 找不到關卡，返回首頁
      navigate('/');
    }
  }, [currentModule, navigate, isLoading, modules.length]);

  // 直接使用 currentModule，不需要額外的 state
  const module = currentModule;

  /**
   * 檢查完成狀態 - 單獨的 useEffect，只依賴 id 變化
   */
  useEffect(() => {
    if (id) {
      checkCompletionStatus(parseInt(id));
    }
  }, [id, checkCompletionStatus]); // 現在 checkCompletionStatus 已經在之前定義

  /**
   * 處理模組 ID 變化時的狀態重置
   */
  useEffect(() => {
    const currentModuleId = parseInt(id);
    
    // 只在模組 ID 真正變化時重置狀態
    if (prevModuleIdRef.current !== null && prevModuleIdRef.current !== currentModuleId) {
      resetQuizState();
    }
    
    // 更新前一次的模組 ID
    prevModuleIdRef.current = currentModuleId;
  }, [id, resetQuizState]); // 添加 resetQuizState 到依賴陣列

  /**
   * 處理路由變化時的滾動
   */
  useEffect(() => {
    // 只在路由 ID 變化時滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  /**
   * 處理答案選擇
   */
  const handleAnswerSelect = (answer) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  /**
   * 提交答案並驗證
   */
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      alert(getText('請選擇一個答案', 'Please select an answer'));
      return;
    }

    const correct = selectedAnswer === module.quiz.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct && !isCompleted) {
      // 答對且未完成過，更新進度
      updateProgress();
    }
  };

  /**
   * 更新 LocalStorage 中的進度
   * 標記當前關卡為已完成（所有關卡都已解鎖）
   */
  const updateProgress = () => {
    const savedProgress = localStorage.getItem('reactGameProgress');
    const allModuleIds = Array.from({ length: totalModules }, (_, i) => i + 1);
    let progress = { unlocked: allModuleIds, completed: [] };
    
    if (savedProgress) {
      try {
        progress = JSON.parse(savedProgress);
        // 確保所有關卡都解鎖
        progress.unlocked = allModuleIds;
      } catch (error) {
        console.error('讀取進度失敗:', error);
      }
    }

    const currentModuleId = parseInt(id);
    
    // 標記當前關卡為已完成
    if (!progress.completed.includes(currentModuleId)) {
      progress.completed.push(currentModuleId);
    }
    
    // 儲存進度（不需要解鎖邏輯，因為所有關卡都已解鎖）
    localStorage.setItem('reactGameProgress', JSON.stringify(progress));
    setIsCompleted(true);
  };

  /**
   * 控制音訊播放
   */
  const toggleAudio = () => {
    const audio = document.getElementById('module-audio');
    if (audio) {
      if (audioPlaying) {
        audio.pause();
        setAudioPlaying(false);
      } else {
        audio.play().catch(error => {
          console.log('音訊播放失敗:', error);
        });
        setAudioPlaying(true);
      }
    }
  };

  /**
   * 重置測驗狀態
   */
  const resetQuiz = () => {
    setSelectedAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  /**
   * 重新隨機選題（刷新當前關卡）
   */
  const refreshCurrentModule = () => {
    setRefreshKey(prev => prev + 1);
    // 重置測驗狀態，因為題目會變化
    resetQuizState();
  };

  if (isLoading || !module) {
    return (
      <div className="loading">
        {getText('載入中...', 'Loading...')}
      </div>
    );
  }

  return (
    <div className="module-page">
      {/* 導航區域 */}
      <nav className="module-nav">
        <Link to="/" className="btn btn-secondary">
          ← {getText('返回首頁', 'Back to Home')}
        </Link>
        <div className="module-progress">
          {getText(`關卡 ${module.id} / ${totalModules}`, `Lesson ${module.id} / ${totalModules}`)}
        </div>
        <Link to="/result" className="btn btn-secondary">
          {getText('查看進度', 'View Progress')}
        </Link>
      </nav>

      {/* 關卡標題 */}
      <header className="module-header">
        <div className="header-main">
          <h1>{module.title}</h1>
          {module.description && (
            <p className="module-description">{module.description}</p>
          )}
          {isCompleted && (
            <span className="completion-badge">
              {getText('已完成 ✓', 'Completed ✓')}
            </span>
          )}
        </div>
        
        {/* 題目資訊和控制 */}
        <div className="module-controls">
          {module.totalQuestions > 1 && (
            <div className="question-info">
              <span className="question-indicator">
                {getText(
                  `題目 ${module.questionIndex} / ${module.totalQuestions}`,
                  `Question ${module.questionIndex} / ${module.totalQuestions}`
                )}
              </span>
              <button 
                className="btn btn-secondary btn-small refresh-btn"
                onClick={refreshCurrentModule}
                title={getText('重新隨機選題', 'Refresh random question')}
              >
                🔄 {getText('換題', 'New Question')}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 主要內容區域 */}
      <main className="module-content">
        {/* 媒體資源區域 */}
        <section className="media-section">
          {/* 關卡圖片 */}
          <div className="module-image">
            <img 
              src={module.media?.image || '/src/assets/images/default-lesson.png'}
              alt={getText(`${module.title} 示意圖`, `${module.title} illustration`)}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f0f0f0"/><text x="150" y="100" text-anchor="middle" dy=".3em" font-size="48">📚</text></svg>';
              }}
            />
          </div>
          
          {/* 音訊控制 */}
          <div className="audio-controls">
            <button 
              className={`btn audio-btn ${audioPlaying ? 'playing' : ''}`}
              onClick={toggleAudio}
            >
              {audioPlaying 
                ? getText('⏸️ 暫停', '⏸️ Pause')
                : getText('▶️ 播放說明', '▶️ Play Audio')
              }
            </button>
            <audio 
              id="module-audio" 
              onEnded={() => setAudioPlaying(false)}
            >
              <source src={module.media?.audio} type="audio/mpeg" />
              {getText('您的瀏覽器不支援音訊播放。', 'Your browser does not support audio playback.')}
            </audio>
          </div>
        </section>

        {/* 教學內容 */}
        <section className="content-section">
          <h2>{getText('學習內容', 'Learning Content')}</h2>
          <div className="content-text">
            {module.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* 程式碼範例 */}
        <section className="code-section">
          <h2>{getText('程式碼範例', 'Code Example')}</h2>
          <div className="code-container">
            <pre><code>{module.codeExample}</code></pre>
            <button 
              className="btn btn-secondary copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(module.codeExample);
                alert(getText('程式碼已複製到剪貼簿', 'Code copied to clipboard'));
              }}
            >
              📋 {getText('複製程式碼', 'Copy Code')}
            </button>
          </div>
        </section>

        {/* 測驗區域 */}
        <section className="quiz-section">
          <h2>{getText('小測驗', 'Quiz')}</h2>
          <div className="quiz-container">
            <h3>{module.quiz.question}</h3>
            
            <div className="quiz-options">
              {(module?.quiz?.shuffledOptions || []).map((option, index) => (
                <button
                  key={`${option}-${index}`} // 使用內容和索引作為 key，確保重新渲染
                  className={`quiz-option ${
                    selectedAnswer === option ? 'selected' : ''
                  } ${
                    showResult 
                      ? option === module.quiz.answer 
                        ? 'correct' 
                        : selectedAnswer === option 
                        ? 'incorrect' 
                        : ''
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* 測驗結果 */}
            {showResult && (
              <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                <h4>
                  {isCorrect 
                    ? getText('🎉 答對了！', '🎉 Correct!')
                    : getText('❌ 答錯了', '❌ Incorrect')
                  }
                </h4>
                <p>
                  {isCorrect 
                    ? getText(
                        '恭喜完成這個關卡！下一關已解鎖。',
                        'Congratulations! You completed this lesson. Next lesson unlocked.'
                      )
                    : getText(
                        `正確答案是：${module.quiz.answer}`,
                        `The correct answer is: ${module.quiz.answer}`
                      )
                  }
                </p>
                <div className="quiz-actions">
                  {!isCorrect && (
                    <button className="btn btn-secondary" onClick={resetQuiz}>
                      {getText('重新作答', 'Retry Quiz')}
                    </button>
                  )}
                  {isCorrect && parseInt(id) < totalModules && (
                    <Link 
                      to={`/module/${parseInt(id) + 1}`} 
                      className="btn btn-primary"
                      onClick={() => {
                        // 點擊下一關時重置所有狀態
                        resetQuizState();
                        // 短暫延遲確保狀態重置
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                    >
                      {getText('下一關 →', 'Next Lesson →')}
                    </Link>
                  )}
                  {isCorrect && parseInt(id) === totalModules && (
                    <Link 
                      to="/result" 
                      className="btn btn-success"
                    >
                      {getText('查看完成結果 🏆', 'View Results 🏆')}
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* 提交按鈕 */}
            {!showResult && (
              <div className="quiz-submit">
                <button 
                  className="btn btn-primary"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                >
                  {getText('提交答案', 'Submit Answer')}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ModulePage;