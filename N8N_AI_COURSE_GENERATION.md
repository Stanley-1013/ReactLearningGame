# n8n AI 課程生成工作流程

## 📋 概述

本文檔詳細說明如何建立 n8n 工作流程來處理 AI 課程生成請求，使用 Gemini API 生成客製化學習內容，並將結果格式化為前端應用程式所需的結構。

## 🔄 整體架構

```
React AILearningForm → n8n Webhook → Gemini API → 資料格式化 → 回傳課程資料
```

## 📊 工作流程設計

### 工作流程：AI 課程生成服務

**觸發條件**：Webhook 接收前端請求

```json
{
  "nodes": [
    {
      "name": "AI Course Generation Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "generate-ai-course",
        "httpMethod": "POST",
        "responseMode": "responseNode",
        "options": {
          "noResponseBody": false
        }
      }
    },
    {
      "name": "Validate Request Data",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          // 驗證請求資料
          const body = $input.item(0).json.body;
          
          // 必填欄位檢查
          const requiredFields = ['user_name', 'learning_topic', 'difficulty_level', 'module_count'];
          const missingFields = requiredFields.filter(field => !body[field]);
          
          if (missingFields.length > 0) {
            throw new Error('缺少必填欄位: ' + missingFields.join(', '));
          }
          
          // 資料清理和驗證
          const cleanedData = {
            user_name: body.user_name.trim(),
            learning_topic: body.learning_topic.trim(),
            topic_type: body.topic_type || 'custom',
            topic_description: body.topic_description || '',
            difficulty_level: body.difficulty_level,
            module_count: Math.max(3, Math.min(15, parseInt(body.module_count))),
            include_exercises: Boolean(body.include_exercises),
            language_code: body.language_code || 'zh-TW',
            request_timestamp: body.request_timestamp || new Date().toISOString()
          };
          
          console.log('✅ 請求資料驗證通過:', cleanedData);
          return { ...cleanedData };
        `
      }
    },
    {
      "name": "Generate Course Outline",
      "type": "n8n-nodes-base.googleGemini",
      "parameters": {
        "model": "gemini-1.5-pro",
        "prompt": `
請為以下需求生成一個完整的學習課程大綱：

用戶資訊：
- 姓名：{{$json.user_name}}
- 學習主題：{{$json.learning_topic}}
- 難度等級：{{$json.difficulty_level}}
- 模組數量：{{$json.module_count}}
- 語言：{{$json.language_code}}

請用 JSON 格式回應，包含以下結構：
{
  "course_title": "課程標題",
  "course_description": "課程描述",
  "estimated_total_time": 總學習時間（分鐘）,
  "modules": [
    {
      "module_number": 1,
      "title": "模組標題",
      "description": "模組描述",
      "estimated_time": 30,
      "learning_objectives": ["目標1", "目標2"],
      "key_concepts": ["概念1", "概念2"]
    }
  ]
}

要求：
1. 課程內容必須適合 {{$json.difficulty_level}} 程度的學習者
2. 確保循序漸進的學習路徑
3. 每個模組應包含實際可操作的學習內容
4. 總時間控制在合理範圍內
5. 如果語言是 zh-TW，請用繁體中文回應
6. 如果語言是 en-US，請用英文回應
        `,
        "temperature": 0.7,
        "maxTokens": 2000
      }
    },
    {
      "name": "Parse Course Outline",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          // 解析 Gemini 回應的課程大綱
          let geminiResponse = $input.item(0).json.response;
          let courseOutline;
          
          try {
            // 嘗試直接解析 JSON
            if (typeof geminiResponse === 'string') {
              // 清理回應，移除可能的 markdown 標記
              geminiResponse = geminiResponse.replace(/^\\s*\`\`\`json\\s*/gmi, '');
              geminiResponse = geminiResponse.replace(/\\s*\`\`\`\\s*$/gmi, '');
              courseOutline = JSON.parse(geminiResponse);
            } else {
              courseOutline = geminiResponse;
            }
          } catch (error) {
            console.error('❌ 解析課程大綱失敗:', error);
            throw new Error('無法解析 AI 生成的課程大綱');
          }
          
          // 驗證大綱結構
          if (!courseOutline.modules || !Array.isArray(courseOutline.modules)) {
            throw new Error('課程大綱格式不正確');
          }
          
          console.log('✅ 課程大綱解析成功:', courseOutline.course_title);
          
          // 合併請求資料和大綱
          const requestData = $input.item(1).json; // 從第二個輸入獲取原始請求
          
          return {
            ...requestData,
            course_outline: courseOutline,
            generation_stage: 'outline_completed'
          };
        `
      }
    },
    {
      "name": "Generate Module Content",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          // 準備模組內容生成
          const data = $input.item(0).json;
          const { course_outline, learning_topic, difficulty_level, language_code, include_exercises } = data;
          
          const modulePromises = course_outline.modules.map((module, index) => {
            return {
              module_number: module.module_number,
              title: module.title,
              description: module.description,
              learning_objectives: module.learning_objectives,
              key_concepts: module.key_concepts,
              prompt_data: {
                learning_topic,
                difficulty_level,
                language_code,
                include_exercises,
                module_info: module
              }
            };
          });
          
          console.log('📚 準備生成', modulePromises.length, '個模組的詳細內容');
          
          return modulePromises.map(moduleData => ({
            ...data,
            current_module: moduleData,
            generation_stage: 'generating_content'
          }));
        `
      }
    },
    {
      "name": "Generate Individual Module",
      "type": "n8n-nodes-base.googleGemini",
      "parameters": {
        "model": "gemini-1.5-pro",
        "prompt": `
請為以下模組生成詳細的學習內容：

模組資訊：
- 編號：{{$json.current_module.module_number}}
- 標題：{{$json.current_module.title}}
- 描述：{{$json.current_module.description}}
- 學習目標：{{$json.current_module.learning_objectives}}
- 關鍵概念：{{$json.current_module.key_concepts}}

課程背景：
- 主題：{{$json.learning_topic}}
- 難度：{{$json.difficulty_level}}
- 語言：{{$json.language_code}}
- 包含練習：{{$json.include_exercises}}

請用 JSON 格式回應，包含以下結構：
{
  "content": "詳細的學習內容說明，包含概念解釋和實例",
  "code_example": "相關的程式碼範例（如果適用）",
  "quiz": {
    "question": "測驗題目",
    "options": ["選項A", "選項B", "選項C", "選項D"],
    "answer": "正確答案",
    "explanation": "答案解釋"
  },
  "additional_resources": [
    {
      "type": "link",
      "title": "資源標題",
      "url": "https://example.com",
      "description": "資源描述"
    }
  ],
  "practice_exercises": [
    {
      "title": "練習標題",
      "description": "練習說明",
      "code_template": "練習用的程式碼模板（如果適用）",
      "expected_outcome": "預期結果"
    }
  ]
}

要求：
1. 內容必須準確且易於理解
2. 程式碼範例要完整且可執行
3. 測驗題目要有挑戰性但不會過於困難
4. 如果是 zh-TW，使用繁體中文
5. 如果是 en-US，使用英文
6. 根據 include_exercises 決定是否包含詳細的練習內容
        `,
        "temperature": 0.6,
        "maxTokens": 3000
      }
    },
    {
      "name": "Parse Module Content",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          // 解析模組內容
          let moduleResponse = $input.item(0).json.response;
          let moduleContent;
          
          try {
            if (typeof moduleResponse === 'string') {
              moduleResponse = moduleResponse.replace(/^\\s*\`\`\`json\\s*/gmi, '');
              moduleResponse = moduleResponse.replace(/\\s*\`\`\`\\s*$/gmi, '');
              moduleContent = JSON.parse(moduleResponse);
            } else {
              moduleContent = moduleResponse;
            }
          } catch (error) {
            console.error('❌ 解析模組內容失敗:', error);
            // 提供降級內容
            moduleContent = {
              content: '內容生成失敗，請稍後重試',
              code_example: '// 範例程式碼\\nconsole.log("Hello World");',
              quiz: {
                question: '這是一個測試問題？',
                options: ['選項 A', '選項 B', '選項 C', '選項 D'],
                answer: '選項 A',
                explanation: '這是測試解釋'
              }
            };
          }
          
          const inputData = $input.item(1).json;
          const currentModule = inputData.current_module;
          
          // 組合完整的模組資料
          const completeModule = {
            id: currentModule.module_number,
            title: currentModule.title,
            description: currentModule.description,
            questions: [{
              id: \`\${currentModule.module_number}-1\`,
              content: moduleContent.content,
              codeExample: moduleContent.code_example || '',
              quiz: moduleContent.quiz,
              media: {
                additionalResources: moduleContent.additional_resources || [],
                practiceExercises: moduleContent.practice_exercises || []
              }
            }]
          };
          
          console.log('✅ 模組', currentModule.module_number, '內容生成完成');
          
          return {
            ...inputData,
            generated_module: completeModule,
            generation_stage: 'module_completed'
          };
        `
      }
    },
    {
      "name": "Combine All Modules",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          // 收集所有生成的模組
          const allModuleData = $input.all();
          const firstItem = allModuleData[0].json;
          
          // 提取所有生成的模組
          const generatedModules = allModuleData
            .map(item => item.json.generated_module)
            .filter(module => module)
            .sort((a, b) => a.id - b.id);
          
          // 建立完整的課程資料
          const courseData = {
            id: \`ai-course-\${Date.now()}\`,
            name: firstItem.course_outline.course_title,
            description: firstItem.course_outline.course_description,
            category: 'ai-generated',
            difficulty: firstItem.difficulty_level,
            estimatedTime: firstItem.course_outline.estimated_total_time || generatedModules.length * 30,
            tags: [firstItem.learning_topic, 'AI 生成', 'personalized'],
            isAIGenerated: true,
            generatedFor: firstItem.user_name,
            generatedAt: new Date().toISOString(),
            language: firstItem.language_code,
            modules: generatedModules,
            
            // 生成統計
            generation_info: {
              total_modules: generatedModules.length,
              generation_time: new Date().toISOString(),
              ai_model: 'gemini-1.5-pro',
              request_id: firstItem.request_timestamp
            }
          };
          
          console.log('🎉 完整課程生成完成:', courseData.name);
          console.log('📊 包含', courseData.modules.length, '個模組');
          
          return courseData;
        `
      }
    },
    {
      "name": "Store Generated Course",
      "type": "n8n-nodes-base.airtable",
      "parameters": {
        "application": "YOUR_COURSES_DATABASE_ID",
        "table": "ai_generated_courses",
        "operation": "create",
        "data": {
          "course_id": "{{$json.id}}",
          "course_name": "{{$json.name}}",
          "generated_for": "{{$json.generatedFor}}",
          "learning_topic": "{{$json.tags[0]}}",
          "difficulty": "{{$json.difficulty}}",
          "module_count": "{{$json.modules.length}}",
          "generated_at": "{{$json.generatedAt}}",
          "course_data": "{{JSON.stringify($json)}}"
        }
      }
    },
    {
      "name": "Send Success Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "parameters": {
        "responseBody": `{
          "success": true,
          "message": "AI 課程生成成功",
          "course_data": {{JSON.stringify($json)}},
          "generation_time": "{{$json.generation_info.generation_time}}",
          "total_modules": {{$json.modules.length}}
        }`,
        "responseHeaders": {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        "responseCode": 200
      }
    },
    {
      "name": "Handle Errors",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          // 錯誤處理
          const error = $input.item(0).json.error || $input.item(0).json;
          
          console.error('❌ AI 課程生成失敗:', error);
          
          const errorResponse = {
            success: false,
            message: '課程生成失敗',
            error: error.message || '未知錯誤',
            timestamp: new Date().toISOString()
          };
          
          return errorResponse;
        `
      }
    },
    {
      "name": "Send Error Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "parameters": {
        "responseBody": "{{JSON.stringify($json)}}",
        "responseHeaders": {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        "responseCode": 500
      }
    }
  ],
  "connections": {
    "AI Course Generation Webhook": {
      "main": [
        [
          {
            "node": "Validate Request Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Validate Request Data": {
      "main": [
        [
          {
            "node": "Generate Course Outline",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Course Outline": {
      "main": [
        [
          {
            "node": "Parse Course Outline",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse Course Outline": {
      "main": [
        [
          {
            "node": "Generate Module Content",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Module Content": {
      "main": [
        [
          {
            "node": "Generate Individual Module",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Individual Module": {
      "main": [
        [
          {
            "node": "Parse Module Content",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse Module Content": {
      "main": [
        [
          {
            "node": "Combine All Modules",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Combine All Modules": {
      "main": [
        [
          {
            "node": "Store Generated Course",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Store Generated Course": {
      "main": [
        [
          {
            "node": "Send Success Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## 🔧 設定步驟

### 第一步：設定 Gemini API

1. **取得 API 金鑰**：
   - 前往 [Google AI Studio](https://makersuite.google.com/)
   - 建立新專案並取得 API 金鑰

2. **在 n8n 中設定認證**：
   - 新增 Google Gemini 認證
   - 輸入 API 金鑰

### 第二步：建立 Airtable 資料庫

1. **建立 Courses 資料庫**：
   ```
   Base: AI Generated Courses
   Table: ai_generated_courses
   
   欄位：
   - course_id (Single line text)
   - course_name (Single line text)
   - generated_for (Single line text)
   - learning_topic (Single line text)
   - difficulty (Single select: beginner, intermediate, advanced)
   - module_count (Number)
   - generated_at (Date)
   - course_data (Long text)
   ```

### 第三步：部署工作流程

1. **匯入工作流程**：
   - 複製上述 JSON 配置
   - 在 n8n 中建立新工作流程
   - 貼上 JSON 並調整參數

2. **設定 Webhook URL**：
   - 記錄生成的 Webhook URL
   - 格式：`https://your-n8n-instance.com/webhook/generate-ai-course`

### 第四步：更新前端 API 端點

更新 `src/components/AILearningForm.jsx` 中的 API 調用：

```javascript
const handleSubmit = async (e) => {
  // ... 驗證邏輯 ...
  
  try {
    const requestData = prepareRequestData();
    
    // 實際的 n8n API 調用
    const response = await fetch('https://your-n8n-instance.com/webhook/generate-ai-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ AI 課程生成成功:', result.course_data);
      
      if (onCourseGenerated) {
        onCourseGenerated(result.course_data);
      }
    } else {
      throw new Error(result.message || '課程生成失敗');
    }
    
  } catch (err) {
    console.error('❌ AI 課程生成失敗:', err);
    setError(getText(
      '課程生成失敗，請稍後再試',
      'Course generation failed, please try again later'
    ));
  }
};
```

## 📊 Prompt Engineering 最佳實務

### 課程大綱生成 Prompt

```
請為以下需求生成一個完整的學習課程大綱：

用戶資訊：
- 姓名：{{user_name}}
- 學習主題：{{learning_topic}}
- 難度等級：{{difficulty_level}}
- 模組數量：{{module_count}}

請用 JSON 格式回應，確保：
1. 課程標題要吸引人且描述性強
2. 模組之間有邏輯順序
3. 每個模組都有明確的學習目標
4. 估算的時間要合理（每模組 20-45 分鐘）
5. 包含實務應用和概念理論的平衡

JSON 結構：
{
  "course_title": "具體的課程標題",
  "course_description": "2-3 句話的課程描述",
  "estimated_total_time": 總時間（分鐘）,
  "modules": [
    {
      "module_number": 1,
      "title": "模組標題（要具體明確）",
      "description": "模組描述（1-2 句話）",
      "estimated_time": 30,
      "learning_objectives": ["具體的學習目標1", "具體的學習目標2"],
      "key_concepts": ["核心概念1", "核心概念2"]
    }
  ]
}
```

### 模組內容生成 Prompt

```
請為以下模組生成詳細的學習內容：

模組資訊：
- 編號：{{module_number}}
- 標題：{{title}}
- 學習目標：{{learning_objectives}}

要求：
1. 內容要循序漸進，從基礎概念開始
2. 包含實際的程式碼範例（如果適用）
3. 提供實務的應用場景
4. 測驗要有適當的挑戰性
5. 解釋要清楚易懂

JSON 結構：
{
  "content": "詳細的學習內容，包含：\\n1. 概念解釋\\n2. 為什麼重要\\n3. 如何應用\\n4. 常見錯誤\\n5. 最佳實務",
  "code_example": "完整可運行的程式碼範例，包含註解",
  "quiz": {
    "question": "測試理解的問題（避免死記硬背）",
    "options": ["選項A（要有迷惑性）", "選項B（正確答案）", "選項C", "選項D"],
    "answer": "選項B",
    "explanation": "為什麼這個答案是對的，其他為什麼錯"
  }
}
```

## 🚀 擴展功能

### 1. 進度追蹤
- 生成進度的即時更新
- WebSocket 或 Server-Sent Events

### 2. 內容品質評估
- 使用額外的 AI 模型驗證生成的內容
- 自動品質評分系統

### 3. 個人化學習路徑
- 基於用戶過往學習記錄調整內容
- 動態調整難度

### 4. 多語言支援
- 支援更多語言的課程生成
- 語言特定的最佳實務

## 🔒 安全性與成本控制

### API 限制
```javascript
// 在 n8n 中設定請求限制
const RATE_LIMITS = {
  maxRequestsPerHour: 10,
  maxTokensPerRequest: 5000,
  maxModulesPerCourse: 15
};
```

### 成本監控
- 設定 Gemini API 使用量警報
- 實施用戶配額管理
- 快取常見主題的生成結果

### 內容審核
- 自動過濾不當內容
- 人工審核機制（如果需要）

## 📈 效能優化

### 並行處理
- 同時生成多個模組（謹慎使用以避免超出 API 限制）
- 快取重複請求的結果

### 降級策略
- API 失敗時的預設內容
- 部分生成失敗的處理

### 監控與日誌
- 生成時間追蹤
- 成功率監控
- 用戶滿意度回饋

這個 n8n 工作流程提供了完整的 AI 課程生成功能，可以根據具體需求進行調整和擴展。