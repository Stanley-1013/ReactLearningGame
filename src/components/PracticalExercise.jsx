import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useModules } from '../hooks/useModules';
import './PracticalExercise.css';

/**
 * PracticalExercise 組件 - 實作練習管理
 * 
 * 功能：
 * - 顯示指定模組的實作練習
 * - 支援程式碼編輯和預覽
 * - 練習完成狀態管理
 * - 提供提示和參考解答
 * - 支援多語言和響應式設計
 */
function PracticalExercise({ moduleId, onExerciseComplete }) {
  const { isLanguage } = useLanguage();
  const { getModuleById } = useModules();
  const [module, setModule] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 載入模組資料和練習進度
   */
  useEffect(() => {
    if (moduleId) {
      const moduleData = getModuleById(moduleId);
      setModule(moduleData);
      
      // 載入練習進度
      loadExerciseProgress(moduleId);
    }
  }, [moduleId, getModuleById]);

  /**
   * 載入練習進度
   */
  const loadExerciseProgress = (moduleId) => {
    const savedProgress = localStorage.getItem(`practicalExercise_${moduleId}`);
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setUserCode(progress.userCode || '');
        setIsCompleted(progress.isCompleted || false);
        setCurrentHintIndex(progress.currentHintIndex || 0);
      } catch (error) {
        console.error('載入練習進度失敗:', error);
      }
    } else {
      // 設定初始程式碼
      setUserCode(module?.practicalExercise?.startingCode || '');
    }
  };

  /**
   * 儲存練習進度
   */
  const saveExerciseProgress = (progress) => {
    const currentProgress = {
      userCode,
      isCompleted,
      currentHintIndex,
      lastUpdated: new Date().toISOString(),
      ...progress
    };
    localStorage.setItem(`practicalExercise_${moduleId}`, JSON.stringify(currentProgress));
  };

  /**
   * 處理程式碼變更
   */
  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
    saveExerciseProgress({ userCode: newCode });
  };

  /**
   * 執行程式碼測試
   */
  const runTests = async () => {
    if (!module?.practicalExercise?.testCases) return;

    setIsRunning(true);
    setTestResults([]);

    try {
      // 模擬程式碼執行和測試
      const results = await Promise.all(
        module.practicalExercise.testCases.map(async (testCase, index) => {
          // 這裡應該實作真實的程式碼執行邏輯
          // 目前使用模擬結果
          await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
          
          const passed = Math.random() > 0.3; // 模擬測試結果
          return {
            id: index,
            name: testCase.name,
            input: testCase.input,
            expected: testCase.expected,
            actual: passed ? testCase.expected : 'undefined',
            passed,
            error: passed ? null : 'Test failed'
          };
        })
      );

      setTestResults(results);
      
      // 檢查是否全部測試通過
      const allPassed = results.every(result => result.passed);
      if (allPassed && !isCompleted) {
        setIsCompleted(true);
        saveExerciseProgress({ isCompleted: true });
        if (onExerciseComplete) {
          onExerciseComplete(true);
        }
      }
    } catch (error) {
      console.error('執行測試失敗:', error);
    } finally {
      setIsRunning(false);
    }
  };

  /**
   * 顯示下一個提示
   */
  const showNextHint = () => {
    if (currentHintIndex < (module?.practicalExercise?.hints?.length || 0) - 1) {
      const newIndex = currentHintIndex + 1;
      setCurrentHintIndex(newIndex);
      saveExerciseProgress({ currentHintIndex: newIndex });
    }
  };

  /**
   * 切換提示顯示
   */
  const toggleHints = () => {
    setShowHints(!showHints);
  };

  /**
   * 切換解答顯示
   */
  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  /**
   * 重置練習
   */
  const resetExercise = () => {
    if (window.confirm(getText('確定要重置練習嗎？這將清除所有進度。', 'Are you sure you want to reset the exercise? This will clear all progress.'))) {
      setUserCode(module?.practicalExercise?.startingCode || '');
      setIsCompleted(false);
      setCurrentHintIndex(0);
      setTestResults([]);
      setShowSolution(false);
      setShowHints(false);
      localStorage.removeItem(`practicalExercise_${moduleId}`);
    }
  };

  /**
   * 複製程式碼
   */
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(getText('程式碼已複製到剪貼簿', 'Code copied to clipboard'));
  };

  if (!module?.practicalExercise) {
    return (
      <div className="practical-exercise-empty">
        <p>{getText('此模組暫無實作練習', 'No practical exercise for this module')}</p>
      </div>
    );
  }

  const exercise = module.practicalExercise;

  return (
    <div className="practical-exercise">
      <div className="exercise-header">
        <div className="exercise-title">
          <h3>{getText('實作練習', 'Practical Exercise')}</h3>
          {isCompleted && (
            <span className="completion-badge">
              {getText('已完成 ✓', 'Completed ✓')}
            </span>
          )}
        </div>
        <div className="exercise-actions">
          <button 
            className="btn btn-secondary btn-small"
            onClick={resetExercise}
          >
            {getText('重置', 'Reset')}
          </button>
        </div>
      </div>

      <div className="exercise-content">
        <div className="exercise-description">
          <h4>{exercise.title}</h4>
          <p>{exercise.description}</p>
          
          {exercise.requirements && (
            <div className="exercise-requirements">
              <h5>{getText('要求:', 'Requirements:')}</h5>
              <ul>
                {exercise.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="exercise-workspace">
          <div className="code-editor-section">
            <div className="section-header">
              <h5>{getText('程式碼編輯器', 'Code Editor')}</h5>
              <button 
                className="btn btn-secondary btn-small"
                onClick={() => copyCode(userCode)}
              >
                📋 {getText('複製', 'Copy')}
              </button>
            </div>
            <textarea
              className="code-editor"
              value={userCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder={getText('在此輸入你的程式碼...', 'Enter your code here...')}
              spellCheck={false}
            />
          </div>

          <div className="test-section">
            <div className="section-header">
              <h5>{getText('測試', 'Tests')}</h5>
              <button 
                className="btn btn-primary btn-small"
                onClick={runTests}
                disabled={isRunning || !userCode.trim()}
              >
                {isRunning ? getText('執行中...', 'Running...') : getText('▶️ 執行測試', '▶️ Run Tests')}
              </button>
            </div>
            
            {testResults.length > 0 && (
              <div className="test-results">
                {testResults.map((result) => (
                  <div 
                    key={result.id}
                    className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                  >
                    <div className="test-header">
                      <span className="test-status">
                        {result.passed ? '✅' : '❌'}
                      </span>
                      <span className="test-name">{result.name}</span>
                    </div>
                    <div className="test-details">
                      <div className="test-input">
                        <strong>{getText('輸入:', 'Input:')}</strong> {result.input}
                      </div>
                      <div className="test-expected">
                        <strong>{getText('預期:', 'Expected:')}</strong> {result.expected}
                      </div>
                      <div className="test-actual">
                        <strong>{getText('實際:', 'Actual:')}</strong> {result.actual}
                      </div>
                      {result.error && (
                        <div className="test-error">
                          <strong>{getText('錯誤:', 'Error:')}</strong> {result.error}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="exercise-help">
          <div className="help-section">
            <button 
              className="btn btn-secondary"
              onClick={toggleHints}
            >
              💡 {getText('提示', 'Hints')} ({currentHintIndex + 1}/{exercise.hints?.length || 0})
            </button>
            
            {showHints && exercise.hints && (
              <div className="hints-container">
                <div className="hint-item">
                  <p>{exercise.hints[currentHintIndex]}</p>
                  {currentHintIndex < exercise.hints.length - 1 && (
                    <button 
                      className="btn btn-secondary btn-small"
                      onClick={showNextHint}
                    >
                      {getText('下一個提示', 'Next Hint')}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="help-section">
            <button 
              className="btn btn-secondary"
              onClick={toggleSolution}
            >
              🔍 {getText('查看解答', 'View Solution')}
            </button>
            
            {showSolution && exercise.solution && (
              <div className="solution-container">
                <div className="solution-header">
                  <h5>{getText('參考解答', 'Reference Solution')}</h5>
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => copyCode(exercise.solution)}
                  >
                    📋 {getText('複製', 'Copy')}
                  </button>
                </div>
                <pre className="solution-code">
                  <code>{exercise.solution}</code>
                </pre>
                {exercise.explanation && (
                  <div className="solution-explanation">
                    <h6>{getText('解答說明:', 'Explanation:')}</h6>
                    <p>{exercise.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticalExercise;