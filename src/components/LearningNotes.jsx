import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LearningNotes.css';

/**
 * LearningNotes 組件 - 學習筆記管理
 * 
 * 功能：
 * - 支援富文本筆記編輯
 * - 自動儲存筆記內容
 * - 支援標籤和分類
 * - 筆記搜尋和篩選
 * - 匯出筆記功能
 * - 支援多語言和響應式設計
 */
function LearningNotes({ moduleId, moduleName }) {
  const { isLanguage } = useLanguage();
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  /**
   * 取得本地化文字
   */
  const getText = (zhText, enText) => {
    return isLanguage('en-US') ? enText : zhText;
  };

  /**
   * 載入筆記資料
   */
  useEffect(() => {
    if (moduleId) {
      loadNotes();
    }
  }, [moduleId]);

  /**
   * 載入筆記
   */
  const loadNotes = () => {
    const savedNotes = localStorage.getItem(`learningNotes_${moduleId}`);
    if (savedNotes) {
      try {
        const noteData = JSON.parse(savedNotes);
        setNotes(noteData.content || '');
        setTags(noteData.tags || []);
        setLastSaved(noteData.lastSaved ? new Date(noteData.lastSaved) : null);
        setWordCount(noteData.wordCount || 0);
      } catch (error) {
        console.error('載入筆記失敗:', error);
      }
    }
  };

  /**
   * 儲存筆記
   */
  const saveNotes = (content, noteTags) => {
    const noteData = {
      content,
      tags: noteTags,
      lastSaved: new Date().toISOString(),
      wordCount: content.length,
      moduleId,
      moduleName
    };
    
    localStorage.setItem(`learningNotes_${moduleId}`, JSON.stringify(noteData));
    setLastSaved(new Date());
    setWordCount(content.length);
  };

  /**
   * 處理筆記內容變更
   */
  const handleNotesChange = (e) => {
    const content = e.target.value;
    setNotes(content);
    
    // 自動儲存（延遲儲存）
    clearTimeout(window.autoSaveTimer);
    window.autoSaveTimer = setTimeout(() => {
      saveNotes(content, tags);
    }, 1000);
  };

  /**
   * 手動儲存筆記
   */
  const handleSaveNotes = () => {
    saveNotes(notes, tags);
    alert(getText('筆記已儲存', 'Notes saved successfully'));
  };

  /**
   * 添加標籤
   */
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      const newTags = [...tags, currentTag.trim()];
      setTags(newTags);
      setCurrentTag('');
      saveNotes(notes, newTags);
    }
  };

  /**
   * 移除標籤
   */
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    saveNotes(notes, newTags);
  };

  /**
   * 處理標籤輸入
   */
  const handleTagInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  /**
   * 清空筆記
   */
  const clearNotes = () => {
    if (window.confirm(getText('確定要清空筆記嗎？此操作無法復原。', 'Are you sure you want to clear all notes? This action cannot be undone.'))) {
      setNotes('');
      setTags([]);
      setLastSaved(null);
      setWordCount(0);
      localStorage.removeItem(`learningNotes_${moduleId}`);
    }
  };

  /**
   * 匯出筆記
   */
  const exportNotes = () => {
    const exportData = {
      moduleId,
      moduleName,
      content: notes,
      tags,
      lastSaved,
      wordCount,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-notes-module-${moduleId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * 匯出為 Markdown
   */
  const exportAsMarkdown = () => {
    const markdownContent = `# ${moduleName} - ${getText('學習筆記', 'Learning Notes')}

${getText('標籤', 'Tags')}: ${tags.join(', ') || getText('無', 'None')}

${getText('最後更新', 'Last Updated')}: ${lastSaved ? lastSaved.toLocaleString() : getText('未儲存', 'Not saved')}

${getText('字數', 'Word Count')}: ${wordCount}

---

## ${getText('筆記內容', 'Notes Content')}

${notes}

---

${getText('匯出時間', 'Exported on')}: ${new Date().toLocaleString()}
`;
    
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-notes-module-${moduleId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * 搜尋筆記
   */
  const highlightSearchText = (text) => {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  /**
   * 插入常用模板
   */
  const insertTemplate = (template) => {
    const templates = {
      summary: getText('## 學習摘要\n\n### 重點概念\n- \n\n### 關鍵技術\n- \n\n### 實作要點\n- \n\n', '## Learning Summary\n\n### Key Concepts\n- \n\n### Key Technologies\n- \n\n### Implementation Points\n- \n\n'),
      questions: getText('## 問題與思考\n\n### 問題\n1. \n\n### 解決方案\n1. \n\n### 延伸思考\n- \n\n', '## Questions & Thinking\n\n### Questions\n1. \n\n### Solutions\n1. \n\n### Extended Thinking\n- \n\n'),
      code: getText('## 程式碼筆記\n\n### 重要程式碼片段\n```javascript\n// 程式碼\n```\n\n### 說明\n- \n\n', '## Code Notes\n\n### Important Code Snippets\n```javascript\n// Code here\n```\n\n### Explanation\n- \n\n'),
      todo: getText('## 待辦事項\n\n### 今天要完成\n- [ ] \n\n### 明天計畫\n- [ ] \n\n### 長期目標\n- [ ] \n\n', '## Todo List\n\n### To Complete Today\n- [ ] \n\n### Tomorrow\'s Plan\n- [ ] \n\n### Long-term Goals\n- [ ] \n\n')
    };
    
    const templateContent = templates[template] || '';
    const newContent = notes + (notes ? '\n\n' : '') + templateContent;
    setNotes(newContent);
    saveNotes(newContent, tags);
  };

  return (
    <div className="learning-notes">
      <div className="notes-header">
        <div className="notes-title">
          <h3>{getText('學習筆記', 'Learning Notes')}</h3>
          <span className="module-name">{moduleName}</span>
        </div>
        <div className="notes-actions">
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍 {getText('搜尋', 'Search')}
          </button>
          <button 
            className="btn btn-secondary btn-small"
            onClick={handleSaveNotes}
          >
            💾 {getText('儲存', 'Save')}
          </button>
          <button 
            className="btn btn-secondary btn-small"
            onClick={exportAsMarkdown}
          >
            📄 {getText('匯出 MD', 'Export MD')}
          </button>
          <button 
            className="btn btn-secondary btn-small"
            onClick={exportNotes}
          >
            📋 {getText('匯出 JSON', 'Export JSON')}
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder={getText('搜尋筆記內容...', 'Search notes content...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="tags-section">
        <div className="tags-input">
          <input
            type="text"
            className="tag-input"
            placeholder={getText('添加標籤...', 'Add tag...')}
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={handleTagInput}
          />
          <button 
            className="btn btn-primary btn-small"
            onClick={addTag}
            disabled={!currentTag.trim()}
          >
            {getText('添加', 'Add')}
          </button>
        </div>
        <div className="tags-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag-item">
              {tag}
              <button 
                className="tag-remove"
                onClick={() => removeTag(tag)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="templates-section">
        <span className="templates-label">
          {getText('快速插入:', 'Quick Insert:')}
        </span>
        <div className="template-buttons">
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => insertTemplate('summary')}
          >
            📝 {getText('摘要', 'Summary')}
          </button>
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => insertTemplate('questions')}
          >
            ❓ {getText('問答', 'Q&A')}
          </button>
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => insertTemplate('code')}
          >
            💻 {getText('程式碼', 'Code')}
          </button>
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => insertTemplate('todo')}
          >
            ✅ {getText('待辦', 'Todo')}
          </button>
        </div>
      </div>

      <div className="notes-editor">
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={handleNotesChange}
          placeholder={getText('在此輸入你的學習筆記...', 'Enter your learning notes here...')}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        />
        
        {searchQuery && (
          <div className="notes-preview">
            <h4>{getText('搜尋結果預覽', 'Search Results Preview')}</h4>
            <div 
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: highlightSearchText(notes) }}
            />
          </div>
        )}
      </div>

      <div className="notes-footer">
        <div className="notes-info">
          <span className="word-count">
            {getText(`字數: ${wordCount}`, `Words: ${wordCount}`)}
          </span>
          <span className="save-status">
            {lastSaved 
              ? getText(`最後儲存: ${lastSaved.toLocaleString()}`, `Last saved: ${lastSaved.toLocaleString()}`)
              : getText('未儲存', 'Not saved')
            }
          </span>
        </div>
        <div className="notes-actions">
          <button 
            className="btn btn-secondary btn-small"
            onClick={clearNotes}
            disabled={!notes.trim()}
          >
            🗑️ {getText('清空', 'Clear')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearningNotes;