import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useModules } from '../hooks/useModules';
import './DailyTasks.css';

/**
 * DailyTasks 組件 - 每日任務管理
 * 
 * 功能：
 * - 顯示指定模組的每日任務清單
 * - 支援任務完成狀態切換
 * - 顯示任務完成進度
 * - 支援多語言和響應式設計
 */
function DailyTasks({ moduleId, onTaskComplete }) {
  const { isLanguage } = useLanguage();
  const { getModuleById } = useModules();
  const [taskProgress, setTaskProgress] = useState({});
  const [module, setModule] = useState(null);

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 載入模組資料和任務進度
   */
  useEffect(() => {
    if (moduleId) {
      const moduleData = getModuleById(moduleId);
      setModule(moduleData);
      
      // 載入任務進度
      loadTaskProgress(moduleId);
    }
  }, [moduleId, getModuleById]);

  /**
   * 載入任務進度
   */
  const loadTaskProgress = (moduleId) => {
    const savedProgress = localStorage.getItem(`dailyTasks_${moduleId}`);
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setTaskProgress(progress);
      } catch (error) {
        console.error('載入任務進度失敗:', error);
        setTaskProgress({});
      }
    }
  };

  /**
   * 儲存任務進度
   */
  const saveTaskProgress = (progress) => {
    localStorage.setItem(`dailyTasks_${moduleId}`, JSON.stringify(progress));
  };

  /**
   * 切換任務完成狀態
   */
  const toggleTaskCompletion = (taskId) => {
    const newProgress = {
      ...taskProgress,
      [taskId]: !taskProgress[taskId]
    };
    
    setTaskProgress(newProgress);
    saveTaskProgress(newProgress);
    
    // 通知父組件任務狀態變化
    if (onTaskComplete) {
      const completedTasks = Object.values(newProgress).filter(Boolean).length;
      const totalTasks = module?.dailyTasks?.length || 0;
      onTaskComplete(completedTasks, totalTasks);
    }
  };

  /**
   * 計算任務完成進度
   */
  const getTaskStats = () => {
    if (!module?.dailyTasks) return { completed: 0, total: 0, percentage: 0 };
    
    const total = module.dailyTasks.length;
    const completed = Object.values(taskProgress).filter(Boolean).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  };

  /**
   * 取得任務優先級樣式
   */
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  /**
   * 取得任務類型圖標
   */
  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'reading': return '📖';
      case 'coding': return '💻';
      case 'practice': return '🔧';
      case 'thinking': return '💡';
      case 'discussion': return '💬';
      default: return '📝';
    }
  };

  /**
   * 重置所有任務
   */
  const resetAllTasks = () => {
    if (window.confirm(getText('確定要重置所有任務嗎？', 'Are you sure you want to reset all tasks?'))) {
      setTaskProgress({});
      localStorage.removeItem(`dailyTasks_${moduleId}`);
    }
  };

  if (!module?.dailyTasks) {
    return (
      <div className="daily-tasks-empty">
        <p>{getText('此模組暫無每日任務', 'No daily tasks for this module')}</p>
      </div>
    );
  }

  const stats = getTaskStats();

  return (
    <div className="daily-tasks">
      <div className="daily-tasks-header">
        <h3>{getText('每日任務清單', 'Daily Task List')}</h3>
        <div className="task-stats">
          <span className="stats-progress">
            {getText(`完成進度: ${stats.completed}/${stats.total}`, `Progress: ${stats.completed}/${stats.total}`)}
          </span>
          <span className="stats-percentage">({stats.percentage}%)</span>
        </div>
      </div>

      <div className="task-progress-bar">
        <div 
          className="task-progress-fill"
          style={{ width: `${stats.percentage}%` }}
        />
      </div>

      <div className="daily-tasks-content">
        <div className="tasks-list">
          {module.dailyTasks.map((task, index) => (
            <div 
              key={task.id || index} 
              className={`task-item ${taskProgress[task.id] ? 'completed' : ''} ${getPriorityClass(task.priority)}`}
            >
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={taskProgress[task.id] || false}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <label htmlFor={`task-${task.id}`} className="checkbox-label">
                  <span className="checkbox-icon">✓</span>
                </label>
              </div>

              <div className="task-content">
                <div className="task-header">
                  <span className="task-icon">{getTaskTypeIcon(task.type)}</span>
                  <h4 className="task-title">{task.title}</h4>
                  <span className="task-duration">
                    {getText(`${task.estimatedTime} 分鐘`, `${task.estimatedTime} min`)}
                  </span>
                </div>

                <p className="task-description">{task.description}</p>

                {task.deliverable && (
                  <div className="task-deliverable">
                    <span className="deliverable-label">
                      {getText('預期產出:', 'Expected Output:')}
                    </span>
                    <span className="deliverable-content">{task.deliverable}</span>
                  </div>
                )}

                {task.resources && task.resources.length > 0 && (
                  <div className="task-resources">
                    <span className="resources-label">
                      {getText('相關資源:', 'Resources:')}
                    </span>
                    <ul className="resources-list">
                      {task.resources.map((resource, idx) => (
                        <li key={idx}>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="task-meta">
                  <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                    {getText(
                      task.priority === 'high' ? '高優先級' : task.priority === 'medium' ? '中優先級' : '低優先級',
                      task.priority === 'high' ? 'High Priority' : task.priority === 'medium' ? 'Medium Priority' : 'Low Priority'
                    )}
                  </span>
                  <span className="task-type">
                    {getText(
                      task.type === 'reading' ? '閱讀' : 
                      task.type === 'coding' ? '編程' :
                      task.type === 'practice' ? '練習' :
                      task.type === 'thinking' ? '思考' :
                      task.type === 'discussion' ? '討論' : '任務',
                      task.type === 'reading' ? 'Reading' : 
                      task.type === 'coding' ? 'Coding' :
                      task.type === 'practice' ? 'Practice' :
                      task.type === 'thinking' ? 'Thinking' :
                      task.type === 'discussion' ? 'Discussion' : 'Task'
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="daily-tasks-actions">
          <button
            className="btn btn-secondary"
            onClick={resetAllTasks}
            disabled={stats.completed === 0}
          >
            {getText('重置所有任務', 'Reset All Tasks')}
          </button>
          
          {stats.percentage === 100 && (
            <div className="completion-message">
              <span className="completion-icon">🎉</span>
              <span className="completion-text">
                {getText('恭喜！所有每日任務已完成', 'Congratulations! All daily tasks completed')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyTasks;