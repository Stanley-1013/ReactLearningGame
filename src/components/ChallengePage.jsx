/**
 * ChallengePage 元件 - 挑戰關卡頁面
 * 
 * 功能：
 * - 從 API/n8n 動態獲取挑戰題目
 * - 支援拖曳排序程式碼區塊
 * - 驗證答案並顯示結果
 * - 響應式設計支援手機操作
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useChallenge } from '../hooks/useChallenge';
import './ChallengePage.css';

function ChallengePage() {
  const { isLanguage } = useLanguage();
  const {
    challenge,
    isLoading,
    error,
    userAnswer,
    availableBlocks,
    isCompleted,
    result,
    usedHintCount,
    hasViewedAnswer,
    showHintConfirm,
    showAnswerConfirm,
    fetchChallenge,
    submitAnswer,
    resetChallenge,
    addToAnswer,
    removeFromAnswer,
    moveInAnswer,
    getBlockText,
    requestHint,
    confirmHint,
    cancelHint,
    requestAnswer,
    confirmAnswer,
    cancelAnswer,
    generateSmartHint
  } = useChallenge();

  const [draggedItem, setDraggedItem] = useState(null);
  const [showHints, setShowHints] = useState(false);

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 組件載入時獲取挑戰題目
   */
  useEffect(() => {
    fetchChallenge();
  }, []);

  /**
   * 當確認對話框顯示時，滾動到頂部確保用戶能看到
   */
  useEffect(() => {
    if (showHintConfirm || showAnswerConfirm) {
      // 短暫延遲確保對話框已經渲染
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [showHintConfirm, showAnswerConfirm]);

  /**
   * 處理拖曳開始
   */
  const handleDragStart = (e, item, source) => {
    setDraggedItem({ item, source });
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * 處理拖曳結束
   */
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  /**
   * 處理拖曳懸停
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  /**
   * 處理放置到答案區
   */
  const handleDropToAnswer = (e, targetIndex) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { item, source } = draggedItem;
    
    if (source === 'available') {
      // 從可用區塊拖到答案區
      addToAnswer(item);
    } else if (source === 'answer') {
      // 在答案區內重新排序
      const currentIndex = userAnswer.indexOf(item.id);
      if (currentIndex !== -1 && currentIndex !== targetIndex) {
        moveInAnswer(currentIndex, targetIndex);
      }
    }
  };

  /**
   * 處理放置到可用區
   */
  const handleDropToAvailable = (e) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.source !== 'answer') return;
    
    const { item } = draggedItem;
    removeFromAnswer(item.id);
  };

  /**
   * 點擊方式添加到答案（手機友好）
   */
  const handleClickToAdd = (block) => {
    addToAnswer(block);
  };

  /**
   * 點擊方式移除（手機友好）
   */
  const handleClickToRemove = (blockId) => {
    removeFromAnswer(blockId);
  };

  if (isLoading) {
    return (
      <div className="challenge-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{getText('載入挑戰中...', 'Loading challenge...')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="challenge-page">
        <div className="error-container">
          <h2>{getText('載入失敗', 'Loading Failed')}</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button className="btn btn-primary" onClick={fetchChallenge}>
              {getText('重新載入', 'Retry')}
            </button>
            <Link to="/" className="btn btn-secondary">
              {getText('返回首頁', 'Back to Home')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="challenge-page">
        <div className="no-challenge">
          <h2>{getText('暫無挑戰', 'No Challenge Available')}</h2>
          <Link to="/" className="btn btn-primary">
            {getText('返回首頁', 'Back to Home')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="challenge-page">
      {/* 導航區域 */}
      <nav className="challenge-nav">
        <Link to="/" className="btn btn-secondary">
          ← {getText('返回首頁', 'Back to Home')}
        </Link>
        <div className="challenge-header">
          <h1 className="challenge-title">
            {getText('🎯 挑戰關卡', '🎯 Challenge Mode')}
          </h1>
          <button 
            className="btn btn-outline new-challenge-btn"
            onClick={fetchChallenge}
            title={getText('獲取新的挑戰題目', 'Get a new challenge')}
          >
            🎲 {getText('換一題', 'New Challenge')}
          </button>
        </div>
        <Link to="/result" className="btn btn-secondary">
          {getText('查看進度', 'View Progress')}
        </Link>
      </nav>

      {/* 挑戰說明 */}
      <section className="challenge-prompt">
        <div className="prompt-content">
          <h2>{getText('挑戰任務', 'Challenge Task')}</h2>
          <p className="prompt-text">{challenge.prompt}</p>
          
          {/* 提示和答案功能 */}
          <div className="help-section">
            {/* 智能提示按鈕 */}
            {!hasViewedAnswer && (
              <div className="hints-section">
                <button 
                  className="btn btn-outline hints-toggle"
                  onClick={requestHint}
                  disabled={usedHintCount >= 3}
                >
                  💡 {getText('查看智能提示', 'Get Smart Hint')} 
                  ({usedHintCount}/3)
                </button>
                
                {/* 智能提示內容就近顯示 */}
                {usedHintCount > 0 && (
                  <div className="hints-display">
                    <h4>{getText('💡 智能提示', '💡 Smart Hint')}</h4>
                    <div className="smart-hint-item">
                      <span className="hint-number">{usedHintCount}</span>
                      <span className="hint-text">{generateSmartHint()}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* 顯示答案按鈕 */}
            {!hasViewedAnswer && (
              <button 
                className="btn btn-warning show-answer-btn"
                onClick={requestAnswer}
              >
                🔍 {getText('顯示答案', 'Show Answer')}
              </button>
            )}
            
            {/* 答案內容就近顯示 */}
            {hasViewedAnswer && challenge?.answerOrder && (
              <div className="answer-display-inline">
                <h4>{getText('🔍 正確答案', '🔍 Correct Answer')}</h4>
                <div className="correct-answer-inline">
                  {challenge.answerOrder.map((blockId, index) => (
                    <div key={blockId} className="answer-block-inline">
                      <span className="block-number">{index + 1}</span>
                      <code className="block-code">{getBlockText(blockId)}</code>
                    </div>
                  ))}
                </div>
                <div className="answer-viewed-notice">
                  ⚠️ {getText('已查看答案，挑戰結束', 'Answer viewed, challenge ended')}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 主要拖曳區域 */}
      <section className="drag-drop-area">
        <div className="drag-container">
          {/* 可用程式碼區塊 */}
          <div className="available-blocks">
            <h3>{getText('可用程式碼區塊', 'Available Code Blocks')}</h3>
            <div 
              className="blocks-container"
              onDragOver={handleDragOver}
              onDrop={handleDropToAvailable}
            >
              {availableBlocks.map((block) => (
                <div
                  key={block.id}
                  className="code-block available"
                  draggable
                  onDragStart={(e) => handleDragStart(e, block, 'available')}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleClickToAdd(block)}
                  title={getText('點擊或拖曳添加到答案區', 'Click or drag to add to answer')}
                >
                  <span className="block-id">{block.id}</span>
                  <code className="block-text">{block.text}</code>
                </div>
              ))}
              
              {availableBlocks.length === 0 && (
                <div className="empty-message">
                  {getText('所有區塊都已使用', 'All blocks are in use')}
                </div>
              )}
            </div>
          </div>

          {/* 答案排序區 */}
          <div className="answer-area">
            <h3>{getText('你的答案 (拖曳排序)', 'Your Answer (Drag to Sort)')}</h3>
            <div className="answer-container">
              {userAnswer.map((blockId, index) => (
                <div
                  key={`${blockId}-${index}`}
                  className="code-block answer"
                  draggable
                  onDragStart={(e) => {
                    const block = challenge.codeBlocks.find(b => b.id === blockId);
                    handleDragStart(e, block, 'answer');
                  }}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropToAnswer(e, index)}
                  onClick={() => handleClickToRemove(blockId)}
                  title={getText('點擊移除，或拖曳重新排序', 'Click to remove, or drag to reorder')}
                >
                  <span className="block-order">{index + 1}</span>
                  <span className="block-id">{blockId}</span>
                  <code className="block-text">{getBlockText(blockId)}</code>
                  <button 
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickToRemove(blockId);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              {userAnswer.length === 0 && (
                <div className="empty-answer">
                  {getText(
                    '將程式碼區塊拖曳到這裡，或點擊區塊添加',
                    'Drag code blocks here, or click blocks to add'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 操作按鈕 */}
        <div className="challenge-actions">
          {!isCompleted ? (
            <>
              <button 
                className="btn btn-primary btn-large"
                onClick={submitAnswer}
                disabled={userAnswer.length === 0 || hasViewedAnswer}
              >
                {hasViewedAnswer 
                  ? getText('🔒 已查看答案', '🔒 Answer Viewed')
                  : getText('🚀 提交答案', '🚀 Submit Answer')
                }
              </button>
              <button 
                className="btn btn-secondary"
                onClick={resetChallenge}
              >
                {getText('🔄 重置', '🔄 Reset')}
              </button>
            </>
          ) : (
            <div className="completion-actions">
              <button 
                className="btn btn-primary"
                onClick={fetchChallenge}
              >
                {getText('🎯 下一個挑戰', '🎯 Next Challenge')}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={resetChallenge}
              >
                {getText('🔄 重試此題', '🔄 Retry This')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 結果顯示 */}
      {isCompleted && result && (
        <section className="result-section">
          <div className={`result-card ${result.isCorrect ? 'success' : 'error'}`}>
            <div className="result-header">
              <span className="result-icon">
                {result.isCorrect ? '🎉' : '❌'}
              </span>
              <h3>
                {result.isCorrect 
                  ? getText('挑戰成功！', 'Challenge Completed!')
                  : getText('繼續努力！', 'Try Again!')
                }
              </h3>
            </div>
            
            <div className="result-details">
              <div className="score-display">
                <span className="score-label">{getText('得分', 'Score')}: </span>
                <span className="score-value">{result.score}%</span>
              </div>
              <p className="result-feedback">{result.feedback}</p>
            </div>

            {result.isCorrect && (
              <div className="success-message">
                <p>
                  {getText(
                    '🎊 太棒了！你成功完成了這個挑戰。',
                    '🎊 Awesome! You successfully completed this challenge.'
                  )}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 使用說明 */}
      <section className="instructions">
        <details className="instructions-details">
          <summary>{getText('📖 使用說明', '📖 Instructions')}</summary>
          <div className="instructions-content">
            <ul>
              <li>{getText('拖曳左側的程式碼區塊到右側答案區', 'Drag code blocks from left to right answer area')}</li>
              <li>{getText('在答案區內拖曳重新排序', 'Drag within answer area to reorder')}</li>
              <li>{getText('點擊區塊也可以快速添加/移除', 'Click blocks for quick add/remove')}</li>
              <li>{getText('可以丟棄不需要的干擾項', 'You can discard unnecessary distractor blocks')}</li>
              <li>{getText('完成排序後點擊提交驗證答案', 'Submit when finished to validate your answer')}</li>
            </ul>
          </div>
        </details>
      </section>


      {/* 提示確認對話框 */}
      {showHintConfirm && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <h3>{getText('確認查看提示', 'Confirm View Hint')}</h3>
            <p>
              {getText(
                '確定要查看提示嗎？這會影響你的最終分數。',
                'Are you sure you want to view the hint? This will affect your final score.'
              )}
            </p>
            <p className="hint-info">
              {getText(
                '提示將根據你的當前進度提供針對性建議。',
                'The hint will provide targeted advice based on your current progress.'
              )}
            </p>
            <div className="dialog-actions">
              <button className="btn btn-secondary" onClick={cancelHint}>
                {getText('取消', 'Cancel')}
              </button>
              <button className="btn btn-primary" onClick={confirmHint}>
                {getText('確認查看', 'Confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 答案確認對話框 */}
      {showAnswerConfirm && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <h3>{getText('確認查看答案', 'Confirm View Answer')}</h3>
            <p>
              {getText(
                '確定要查看答案嗎？這將結束當前挑戰，且無法再提交答案。',
                'Are you sure you want to view the answer? This will end the current challenge and you won\'t be able to submit.'
              )}
            </p>
            <div className="dialog-actions">
              <button className="btn btn-secondary" onClick={cancelAnswer}>
                {getText('取消', 'Cancel')}
              </button>
              <button className="btn btn-warning" onClick={confirmAnswer}>
                {getText('確認查看', 'Confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChallengePage;