import{r as g,a as Fe,b as Ve}from"./vendor-a308f804.js";import{L as U,u as Qe,a as Je,B as Ge,R as We,b as be}from"./router-a54721ed.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();var Me={exports:{}},Se={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xe=g,Ye=Symbol.for("react.element"),Ke=Symbol.for("react.fragment"),Ze=Object.prototype.hasOwnProperty,en=Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,nn={key:!0,ref:!0,__self:!0,__source:!0};function _e(t,n,s){var o,a={},r=null,d=null;s!==void 0&&(r=""+s),n.key!==void 0&&(r=""+n.key),n.ref!==void 0&&(d=n.ref);for(o in n)Ze.call(n,o)&&!nn.hasOwnProperty(o)&&(a[o]=n[o]);if(t&&t.defaultProps)for(o in n=t.defaultProps,n)a[o]===void 0&&(a[o]=n[o]);return{$$typeof:Ye,type:t,key:r,ref:d,props:a,_owner:en.current}}Se.Fragment=Ke;Se.jsx=_e;Se.jsxs=_e;Me.exports=Se;var e=Me.exports,Ne={},Ee=Fe;Ne.createRoot=Ee.createRoot,Ne.hydrateRoot=Ee.hydrateRoot;const qe=g.createContext(),ce={"zh-TW":{code:"zh-TW",name:"繁體中文",flag:"🇹🇼"},"en-US":{code:"en-US",name:"English",flag:"🇺🇸"}},tn="zh-TW";function on({children:t}){const[n,s]=g.useState(tn),[o,a]=g.useState(!0);g.useEffect(()=>{const u=localStorage.getItem("reactGameLanguage");if(u&&ce[u])s(u);else{const b=navigator.language;ce[b]&&s(b)}a(!1)},[]);const x={currentLanguage:n,changeLanguage:u=>{ce[u]?(s(u),localStorage.setItem("reactGameLanguage",u),document.documentElement.lang=u,console.log(`語言已切換為: ${ce[u].name}`)):console.error(`不支援的語言: ${u}`)},getCurrentLanguageInfo:()=>ce[n],isLanguage:u=>n===u,supportedLanguages:ce,isLoading:o,t:(u,b=u)=>b};return o?e.jsxs("div",{className:"language-loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Loading language settings..."})]}):e.jsx(qe.Provider,{value:x,children:t})}function F(){const t=g.useContext(qe);if(!t)throw new Error("useLanguage must be used within a LanguageProvider");return t}function ye(t){if(!Array.isArray(t))return console.warn("shuffleArray: 輸入不是陣列:",t),[];const n=[...t];for(let s=n.length-1;s>0;s--){const o=Math.floor(Math.random()*(s+1));[n[s],n[o]]=[n[o],n[s]]}return n}function sn(t,n){if(!Array.isArray(t))return console.warn("shuffleArrayWithSeed: 輸入不是陣列:",t),[];const s=[...t];let o=n;const a=()=>(o=(o*1664525+1013904223)%2**32,o/2**32);for(let r=s.length-1;r>0;r--){const d=Math.floor(a()*(r+1));[s[r],s[d]]=[s[d],s[r]]}return s}function an(t){if(!Array.isArray(t)||t.length===0)return console.warn("getRandomItem: 陣列為空或無效:",t),null;const n=Math.floor(Math.random()*t.length);return t[n]}function rn(t,n){return!Array.isArray(t)||!Array.isArray(n)||t.length!==n.length?!1:t.every((s,o)=>s===n[o])}function cn(t,n,s=!0){const o={isCorrect:!1,score:0,feedback:""};if(!Array.isArray(t)||!Array.isArray(n))return o.feedback="答案格式錯誤",o;if(s)o.isCorrect=rn(t,n),o.score=o.isCorrect?100:0,o.feedback=o.isCorrect?"完全正確！":"順序不正確，請重新排列。";else{const a=new Set(t),r=new Set(n),d=new Set([...a].filter(p=>r.has(p)));o.score=Math.round(d.size/r.size*100),o.isCorrect=o.score===100,o.feedback=o.isCorrect?"完全正確！":`答對了 ${d.size}/${r.size} 個項目。`}return o}const ln={title:"React 實習生四週完整學習計畫",description:"從基礎到實戰的完整 React 學習旅程",totalWeeks:4,totalModules:12,estimatedHours:80},dn={week1:{title:"基礎核心與前端思維建立",description:"建立 React 開發環境，學習核心概念",modules:[1,2,3],estimatedHours:20,learningObjectives:["搭建前端開發環境","掌握 ES6+ 核心語法","理解 React 組件化思想","學習 JSX 語法和 Props/State 基礎"],deliverables:["一個成功運行的 Hello, React! 項目","可複用的 ProfileCard 組件","互動式的 Counter 組件"],assessmentCriteria:["能獨立完成開發環境的安裝與配置","能清晰解釋 JSX、組件、Props 和 State","能夠獨立編寫符合要求的組件","理解單向數據流概念"]},week2:{title:"核心進階與組件化思維",description:"學習副作用處理、列表渲染和組件拆分",modules:[4,5,6],estimatedHours:20,learningObjectives:["掌握 useEffect Hook 的使用","學習 API 資料獲取和錯誤處理","熟練列表渲染和表單處理","理解組件化拆分和狀態提升"],deliverables:["從 API 獲取數據並顯示的組件","功能完整的 Todo List 應用","結構清晰的組件化架構"],assessmentCriteria:["能解釋 useEffect 的用途並成功從 API 獲取數據","熟練掌握列表渲染和受控表單的實現","能夠將複雜 UI 拆解成合理的組件結構","能解釋並正確實踐狀態提升"]},week3:{title:"生態與狀態管理",description:"學習路由系統、全域狀態管理和 UI 組件庫",modules:[7,8,9],estimatedHours:20,learningObjectives:["掌握 React Router 建立 SPA","理解 Context API 解決 Prop Drilling","學習使用 UI 組件庫","了解 API 封裝和請求管理"],deliverables:["多頁面 Todo 應用","使用 Context API 的狀態管理","整合 UI 組件庫的專業界面"],assessmentCriteria:["能使用 React Router 實現應用內的頁面導航","能選用合適的全域狀態管理工具","能夠將第三方 UI 庫集成到專案中","提交清晰的組件層級圖和頁面路由設計"]},week4:{title:"實戰演練與最佳實踐",description:"綜合運用所學知識，完成完整專案",modules:[10,11,12],estimatedHours:20,learningObjectives:["綜合運用前三週知識開發完整應用","學習自定義 Hook 和代碼優化","掌握性能優化技巧","了解部署流程和最佳實踐"],deliverables:["功能完整的個人專案","優化後的高品質代碼","成功部署的線上應用"],assessmentCriteria:["能夠獨立按時交付功能完整的線上專案","專案代碼庫整潔、格式統一","能夠識別並創建自定義 Hook","能解釋 React.memo 的作用並適當使用","能清晰展示專案成果並反思學習過程"]}},un=[{id:1,weekNumber:1,dayNumber:1,title:"第一週 Day 1-2: 開發環境建置與 ES6+ 基礎",description:"建立完整的 React 開發環境，掌握現代 JavaScript 核心語法，為 React 學習打好基礎",estimatedTime:120,difficulty:"beginner",tags:["環境建置","ES6+","基礎","Node.js","Vite"],learningObjectives:["能夠獨立搭建 React 開發環境","熟練掌握 ES6+ 核心語法特性","理解現代 JavaScript 模組系統","能夠創建並運行第一個 React 應用"],dailyTasks:[{id:"1-1",title:"安裝開發環境",description:"安裝 Node.js (v16+)、npm/yarn，配置 VS Code 開發環境及必要擴充套件",estimatedTime:30,completed:!1,checkpoints:["檢查 Node.js 版本：node --version","檢查 npm 版本：npm --version","VS Code 安裝 ES7+ React/Redux/React-Native snippets","VS Code 安裝 Prettier 和 ESLint 擴充套件"]},{id:"1-2",title:"創建第一個 React 專案",description:"使用 Vite 創建 React 應用，了解專案結構，成功運行開發服務器",estimatedTime:20,completed:!1,checkpoints:["執行 npm create vite@latest my-react-app -- --template react","進入專案目錄並安裝依賴","成功運行 npm run dev","在瀏覽器中看到 React 應用"]},{id:"1-3",title:"ES6+ 語法深度練習",description:"深入學習箭頭函式、解構賦值、展開運算子、模板字串等語法",estimatedTime:40,completed:!1,checkpoints:["練習箭頭函式的不同寫法","掌握物件和陣列的解構賦值","使用展開運算子進行陣列和物件操作","實作 5 個以上的 ES6+ 語法範例"]},{id:"1-4",title:"模組系統實踐",description:"理解 ES6 模組系統，實際運用 import/export 語法",estimatedTime:30,completed:!1,checkpoints:["創建多個 JavaScript 模組文件","練習 default export 和 named export","理解模組載入機制","在 React 專案中實際使用模組"]}],practicalExercise:{title:"建立完整的 React 開發環境並實作 ES6+ 特性",description:"完成開發環境建置，創建 React 專案並結合 ES6+ 語法實作一個互動式的個人介紹頁面",template:`// 在 App.jsx 中創建你的第一個組件
function App() {
  // 使用 ES6+ 語法特性
  const userInfo = {
    name: '你的名字',
    age: 22,
    skills: ['JavaScript', 'React', 'HTML', 'CSS']
  };

  // 解構賦值
  const { name, age, skills } = userInfo;

  // 箭頭函式
  const formatSkills = (skillList) => skillList.join(' | ');

  return (
    <div className="App">
      <h1>Hello, React!</h1>
      <div className="profile">
        <h2>歡迎來到 {name} 的 React 學習之旅</h2>
        <p>年齡: {age} 歲</p>
        <p>技能: {formatSkills(skills)}</p>
        <p>今天是: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default App;`,expectedOutput:"成功運行的 React 應用程式，顯示個人介紹信息和當前日期",hints:["確保 Node.js 版本在 16 以上","使用 npm create vite@latest 創建專案","記得執行 npm install 安裝依賴","嘗試修改 userInfo 中的內容","觀察 ES6+ 語法如何讓代碼更簡潔"],additionalChallenges:["使用展開運算子為 skills 陣列添加新技能","實作一個簡單的點擊計數器","使用模板字串創建動態的歡迎訊息"]},questions:[{id:"1-1",title:"React 開發環境建置",content:"建立 React 開發環境需要先安裝 Node.js 和 npm（Node Package Manager）。Node.js 是 JavaScript 的運行環境，npm 是 JavaScript 的套件管理器。我們使用 Vite 來創建新的 React 專案，因為它提供了快速的開發體驗、熱重載功能和優化的打包工具。Vite 相比於傳統的 Create React App 有更快的啟動速度和更好的開發體驗。",codeExample:`# 檢查 Node.js 和 npm 版本
node --version
npm --version

# 使用 Vite 創建 React 專案
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev

# 專案目錄結構
my-react-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js`,quiz:{question:"創建新的 React 專案時，推薦使用哪個工具？",options:["Vite","Webpack","Parcel","Rollup"],answer:"Vite",explanation:"Vite 提供了快速的開發體驗、熱重載功能和優化的打包工具，是現代 React 開發的首選。"},media:{image:"/src/assets/images/vite-setup.png",audio:"/src/assets/audio/setup-guide.mp3"}},{id:"1-2",title:"ES6+ 核心語法詳解",content:"ES6+（ECMAScript 2015+）引入了許多新的語法特性，大大提升了 JavaScript 的開發效率。箭頭函式提供了簡潔的函式語法，解構賦值讓我們能夠從陣列或物件中提取值，展開運算子則讓陣列和物件的操作更加靈活。這些現代 JavaScript 語法在 React 中非常常用，掌握它們是學習 React 的重要基礎。",codeExample:`// 箭頭函式的不同形式
const greet = (name) => \`Hello, \${name}!\`;
const add = (a, b) => a + b;
const getUser = () => ({ name: 'Alice', age: 25 });

// 解構賦值
const user = { name: 'Alice', age: 25, email: 'alice@example.com' };
const { name, age, email } = user;

// 陣列解構
const colors = ['red', 'green', 'blue'];
const [primary, secondary] = colors;

// 展開運算子
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };

// 在 React 中的應用
function UserProfile({ name, age, email, ...otherProps }) {
  return (
    <div {...otherProps}>
      <h2>{name}</h2>
      <p>年齡: {age}</p>
      <p>信箱: {email}</p>
    </div>
  );
}`,quiz:{question:"箭頭函式 (a, b) => a + b 等同於哪種寫法？",options:["function(a, b) { return a + b; }","function(a, b) { a + b; }","(a, b) { return a + b; }","function => a + b"],answer:"function(a, b) { return a + b; }",explanation:"箭頭函式會自動回傳運算式的結果，等同於使用 return 語句的傳統函式。"},media:{image:"/src/assets/images/es6-syntax.png",audio:"/src/assets/audio/es6-explanation.mp3"}},{id:"1-3",title:"模組系統與 import/export",content:"ES6 模組系統讓我們能夠將代碼分割成多個檔案，提高代碼的可維護性和重用性。模組系統包含 export（匯出）和 import（匯入）兩個主要概念。export 用於從模組中匯出變數、函式或類別，import 用於從其他模組匯入這些內容。React 應用程式大量使用模組系統來組織組件和工具函式。",codeExample:`// utils.js - 匯出工具函式
export const formatDate = (date) => {
  return date.toLocaleDateString();
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// 預設匯出
const API_URL = 'https://api.example.com';
export default API_URL;

// UserCard.jsx - React 組件
import React from 'react';
import API_URL, { formatDate, capitalize } from './utils';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{capitalize(user.name)}</h3>
      <p>註冊日期: {formatDate(user.createdAt)}</p>
    </div>
  );
}

export default UserCard;

// App.jsx - 使用組件
import UserCard from './UserCard';

function App() {
  const user = {
    name: 'alice',
    createdAt: new Date('2023-01-01')
  };

  return (
    <div>
      <UserCard user={user} />
    </div>
  );
}`,quiz:{question:"在 ES6 模組中，如何同時匯入預設匯出和具名匯出？",options:["import Default, { named } from './module'","import { Default, named } from './module'","import Default from './module' and { named }","import Default + { named } from './module'"],answer:"import Default, { named } from './module'",explanation:"可以在同一個 import 語句中同時匯入預設匯出和具名匯出，用逗號分隔。"},media:{image:"/src/assets/images/modules-system.png",audio:"/src/assets/audio/modules-explanation.mp3"}},{id:"1-4",title:"現代 JavaScript 最佳實踐",content:"在現代 JavaScript 開發中，有許多最佳實踐可以讓代碼更加清晰、高效和易於維護。包括使用 const 和 let 替代 var、優先使用箭頭函式、善用解構賦值、使用模板字串、避免可變性等。這些實踐在 React 開發中尤其重要，因為 React 鼓勵函式式程式設計和不可變性。",codeExample:`// 使用 const 和 let
const API_URL = 'https://api.example.com'; // 不會變的值
let userCount = 0; // 可能會變的值

// 模板字串
const message = \`歡迎 \${user.name}，您是第 \${userCount} 位使用者\`;

// 預設參數
const greet = (name = 'Guest') => \`Hello, \${name}!\`;

// 簡化物件字面量
const name = 'Alice';
const age = 25;
const user = { name, age }; // 等同於 { name: name, age: age }

// 陣列方法鍊式呼叫
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(num => num > 2)
  .map(num => num * 2)
  .reduce((sum, num) => sum + num, 0);

// 條件運算子
const status = user.isActive ? 'active' : 'inactive';

// 邏輯運算子
const displayName = user.name || 'Anonymous';
const hasPermission = user.role && user.role.includes('admin');`,quiz:{question:"下列哪個是現代 JavaScript 的最佳實踐？",options:["優先使用 const 和 let","總是使用 var 宣告變數","避免使用箭頭函式","不要使用解構賦值"],answer:"優先使用 const 和 let",explanation:"const 和 let 有更好的作用域控制，避免了 var 的提升問題，是現代 JavaScript 的推薦做法。"},media:{image:"/src/assets/images/js-best-practices.png",audio:"/src/assets/audio/best-practices.mp3"}}]},{id:2,weekNumber:1,dayNumber:3,title:"第一週 Day 3-4: React 核心概念與 JSX",description:"深入理解 React 組件化思想和 JSX 語法，學習如何創建可重用的組件，掌握虛擬 DOM 的工作原理",estimatedTime:120,difficulty:"beginner",tags:["React 基礎","JSX","組件","虛擬 DOM"],learningObjectives:["理解 React 組件化開發的核心思想","掌握 JSX 語法規則和最佳實踐","學會在 JSX 中使用 JavaScript 表達式","能夠創建可重用的 React 組件","理解虛擬 DOM 的優勢和運作原理"],dailyTasks:[{id:"2-1",title:"理解 React 組件概念",description:"學習組件化思想，創建第一個 React 組件，理解組件的基本結構和命名規範",estimatedTime:30,completed:!1,checkpoints:["理解什麼是 React 組件","學會函式組件和類別組件的差別","掌握組件命名規則（大寫開頭）","實作第一個組件"]},{id:"2-2",title:"掌握 JSX 語法規則",description:"學習 JSX 的基本語法、注意事項和轉換機制",estimatedTime:40,completed:!1,checkpoints:["理解 JSX 的本質和轉換機制","掌握 JSX 語法規則（className, htmlFor 等）","學會在 JSX 中使用 JavaScript 表達式","了解 JSX 的限制和陷阱"]},{id:"2-3",title:"練習 JSX 表達式和條件渲染",description:"在 JSX 中使用 JavaScript 表達式、條件渲染和循環渲染",estimatedTime:30,completed:!1,checkpoints:["使用 {} 嵌入 JavaScript 表達式","練習三元運算子進行條件渲染","使用 && 運算子進行條件顯示","使用 map() 方法渲染列表"]},{id:"2-4",title:"創建可重複使用的組件",description:"設計並實作多個小組件，理解組件的組合模式",estimatedTime:20,completed:!1,checkpoints:["創建多個小組件","理解組件的組合模式","實作組件巢套結構","理解組件的單一職責原則"]}],practicalExercise:{title:"創建組件化的使用者介面",description:"建立一個完整的使用者介面，包含多個可重用的 React 組件，展示 JSX 語法的各種特性",template:`// Header 組件
function Header({ title, subtitle }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </header>
  );
}

// UserCard 組件
function UserCard({ user }) {
  const { name, age, email, isActive } = user;
  
  return (
    <div className={\`user-card \${isActive ? 'active' : 'inactive'}\`}>
      <h3>{name}</h3>
      <p>年齡: {age} 歲</p>
      <p>信箱: {email}</p>
      <span className="status">
        {isActive ? '線上' : '離線'}
      </span>
    </div>
  );
}

// UserList 組件
function UserList({ users }) {
  return (
    <div className="user-list">
      <h2>使用者列表</h2>
      {users.length > 0 ? (
        users.map(user => (
          <UserCard key={user.id} user={user} />
        ))
      ) : (
        <p>沒有使用者資料</p>
      )}
    </div>
  );
}

// 主應用程式
function App() {
  const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com', isActive: true },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com', isActive: false },
    { id: 3, name: 'Charlie', age: 28, email: 'charlie@example.com', isActive: true }
  ];

  return (
    <div className="app">
      <Header 
        title="React 組件化開發" 
        subtitle="JSX 語法實練" 
      />
      <UserList users={users} />
    </div>
  );
}`,expectedOutput:"顯示組件化的使用者介面，包含標題和使用者列表",hints:["記住 JSX 中使用 className 而非 class","在 JSX 中使用 {} 來嵌入 JavaScript 表達式","組件名稱必須以大寫字母開頭","使用 map() 渲染列表時不要忘記 key 屬性","善用條件渲染來控制組件顯示"],additionalChallenges:["為 UserCard 組件添加照片顯示功能","實作一個簡單的搜尋功能","使用 CSS 模組或 styled-components 美化組件","添加更多互動元素（按鈕、表單等）"]},questions:[{id:"2-1",title:"React 核心概念深入理解",content:"React 是由 Facebook 開發的用於建立使用者介面的 JavaScript 函式庫。它的核心思想是組件化開發，每個組件都是獨立的、可重複使用的程式碼片段。React 使用虛擬 DOM 來優化效能，只更新實際變更的部分。組件化開發的優勢包括代碼重用、易於維護、測試友善等。在組件化架構下，一個大型應用程式可以被分解成多個小的、功能單一的組件。",codeExample:`// 一個簡單的 React 組件
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// 帶有狀態的組件
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>計數: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}

// 組件組合
function App() {
  return (
    <div>
      <Welcome />
      <Counter />
    </div>
  );
}`,quiz:{question:"React 主要是用來做什麼的？",options:["建立使用者介面","處理資料庫","管理伺服器","編譯程式碼"],answer:"建立使用者介面",explanation:"React 是一個用於建立使用者介面的 JavaScript 函式庫，它的核心作用是管理和渲染 UI 組件。"},media:{image:"/src/assets/images/react-logo.png",audio:"/src/assets/audio/intro-bgm.mp3"}},{id:"2-2",title:"JSX 語法深入探討",content:"JSX 是 JavaScript 的語法擴充，讓我們可以在 JavaScript 中寫類似 HTML 的語法。JSX 並不是標準的 HTML，而是由 Babel 等工具轉換成 JavaScript 函式呼叫。JSX 需要遵循特定規則：使用 className 而非 class、使用 camelCase 命名屬性、用 {} 包裹 JavaScript 表達式、每個組件必須返回一個根元素或使用 Fragment。",codeExample:`// JSX 語法規則
function MyComponent() {
  const title = '標題';
  const isVisible = true;
  
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>內容</p>
      <button onClick={() => alert('clicked')}>
        點擊我
      </button>
      {isVisible && <p>這段文字只在條件為真時顯示</p>}
    </div>
  );
}

// 使用 Fragment 避免額外的 DOM 節點
function UserInfo({ user }) {
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>年齡: {user.age}</p>
    </>
  );
}

// 條件渲染的多種方式
function WelcomeMessage({ username, isLoggedIn }) {
  return (
    <div>
      {/* 使用三元運算子 */}
      {isLoggedIn ? (
        <h1>歡迎回來, {username}！</h1>
      ) : (
        <h1>請先登入</h1>
      )}
      
      {/* 使用 && 運算子 */}
      {isLoggedIn && <button>登出</button>}
    </div>
  );
}`,quiz:{question:"在 JSX 中，HTML 的 class 屬性要寫成什麼？",options:["className","class","cssClass","styleClass"],answer:"className",explanation:"因為 class 是 JavaScript 的保留字，所以在 JSX 中使用 className 來設定 CSS 類別。"},media:{image:"/src/assets/images/jsx-example.png",audio:"/src/assets/audio/jsx-explanation.mp3"}},{id:"2-3",title:"虛擬 DOM 的優勢和運作原理",content:"虛擬 DOM 是 React 的核心技術之一。它是真實 DOM 的 JavaScript 表示，存在於記憶體中。當組件狀態改變時，React 會先在虛擬 DOM 中進行更新，然後通過 diff 算法比較新舊虛擬 DOM 的差異，只更新實際變更的部分。這樣可以大幅減少 DOM 操作，提高效能。虛擬 DOM 的優勢包括：性能優化、跨瀏覽器相容性、可預測性、更好的程式化模式等。",codeExample:`// 虛擬 DOM 的運作原理
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');

  // 當狀態改變時，React 會先在虛擬 DOM 中更新
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>歡迎 {name}</h1>
      <p>你點擊了 {count} 次</p>
      <button onClick={handleClick}>點擊我</button>
    </div>
  );
}

// React 在幕後做的事情：
// 1. 當 setCount 被呼叫時，React 會安排重新渲染
// 2. 創建新的虛擬 DOM 樹
// 3. 與舊的虛擬 DOM 樹進行比較（diff）
// 4. 只更新實際變更的 DOM 節點（在這個例子中只有 <p> 元素的文字內容）`,quiz:{question:"虛擬 DOM 的主要作用是什麼？",options:["優化效能，減少 DOM 操作","儲存使用者資料","處理網路請求","管理路由"],answer:"優化效能，減少 DOM 操作",explanation:"虛擬 DOM 通過 diff 算法比較新舊狀態，只更新實際變更的 DOM 節點，大幅提高效能。"},media:{image:"/src/assets/images/virtual-dom.png",audio:"/src/assets/audio/virtual-dom.mp3"}},{id:"2-4",title:"組件設計模式和最佳實踐",content:"在 React 中，好的組件設計遵循一些重要原則：單一職責原則（一個組件只做一件事）、可重用性（通過 props 接收不同數據）、可組合性（能與其他組件配合使用）、組件層級的合理設計等。命名規範包括：組件名稱大寫開頭、使用有意義的名稱、文件名與組件名一致等。",codeExample:`// 好的組件設計範例

// 1. 單一職責原則 - 只負責顯示使用者信息
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// 2. 可重用性 - 通過 props 接收不同數據
function Button({ text, onClick, variant = 'primary' }) {
  return (
    <button 
      className={\`btn btn-\${variant}\`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// 3. 可組合性 - 能與其他組件配合使用
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <UserProfile user={user} />
      <div className="actions">
        <Button text="編輯" onClick={() => onEdit(user.id)} />
        <Button 
          text="刪除" 
          variant="danger" 
          onClick={() => onDelete(user.id)} 
        />
      </div>
    </div>
  );
}

// 4. 組件層級的合理設計
function UserList({ users, onEditUser, onDeleteUser }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
      ))}
    </div>
  );
}`,quiz:{question:"好的 React 組件設計應該遵循什麼原則？",options:["單一職責原則","複雜功能原則","不可重用原則","全域狀態原則"],answer:"單一職責原則",explanation:"單一職責原則要求每個組件只做一件事，這樣可以讓組件更容易理解、測試和維護。"},media:{image:"/src/assets/images/component-design.png",audio:"/src/assets/audio/component-design.mp3"}}]},{id:3,weekNumber:1,dayNumber:5,title:"第一週 Day 5: Props 與 State 基礎",description:"學習組件間資料傳遞和狀態管理，掌握 React 的核心概念，學會創建互動式組件",estimatedTime:120,difficulty:"beginner",tags:["Props","State","Hook","互動式組件"],learningObjectives:["理解 Props 的概念和使用方法","掌握 State 的基本原理和管理方式","學會使用 useState Hook","能夠創建互動式組件","理解單向數據流的概念"],dailyTasks:[{id:"3-1",title:"理解 Props 概念",description:"學習如何在組件間傳遞資料，理解 Props 的特性和使用方法",estimatedTime:30,completed:!1,checkpoints:["理解 Props 就像函式參數","理解 Props 是唯讀的（不可修改）","學會使用解構賦值接收 Props","理解 PropTypes 和預設值的使用"]},{id:"3-2",title:"創建 ProfileCard 組件",description:"實作可接收多種 props 的使用者卡片組件，展示不同數據類型的傳遞",estimatedTime:40,completed:!1,checkpoints:["創建可接收多個 props 的組件","處理字串、數字、布林、物件等不同數據類型","實作條件渲染和預設值處理","在父組件中使用 ProfileCard"]},{id:"3-3",title:"學習 useState Hook",description:"掌握 React 狀態管理的基本方法，理解 Hook 的基本原理",estimatedTime:30,completed:!1,checkpoints:["理解 useState 的基本語法","掌握狀態更新的異步性質","學會使用函式式狀態更新","理解 useState 的重新渲染機制"]},{id:"3-4",title:"創建 Counter 組件",description:"實作具有狀態的互動式計數器，結合事件處理和狀態管理",estimatedTime:20,completed:!1,checkpoints:["實作基本的計數功能","添加增加、減少、重置功能","處理邊界情況（負數、上限等）","結合事件處理和狀態更新"]}],practicalExercise:{title:"建立互動式的用戶管理系統",description:"結合 Props 和 State 創建一個完整的用戶管理系統，包含用戶資料展示和互動式統計功能",template:`import { useState } from 'react';

// ProfileCard 組件
function ProfileCard({ user, onUpdateScore }) {
  const { name, age, avatarUrl, occupation, score, skills = [] } = user;
  
  return (
    <div className="profile-card">
      <img src={avatarUrl || '/default-avatar.png'} alt={\`\${name}'s avatar\`} />
      <div className="profile-info">
        <h2>{name}</h2>
        <p>年齡: {age} 歲</p>
        <p>職業: {occupation}</p>
        <div className="skills">
          <h4>技能:</h4>
          {skills.length > 0 ? (
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>沒有技能資料</p>
          )}
        </div>
        <div className="score">
          <p>分數: {score}</p>
          <button onClick={() => onUpdateScore(user.id, score + 1)}>+1</button>
          <button onClick={() => onUpdateScore(user.id, score - 1)}>-1</button>
        </div>
      </div>
    </div>
  );
}

// Counter 組件
function Counter({ title = '計數器', initialValue = 0, step = 1 }) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prevCount => prevCount + step);
  const decrement = () => setCount(prevCount => prevCount - step);
  const reset = () => setCount(initialValue);
  
  return (
    <div className="counter">
      <h3>{title}: {count}</h3>
      <div className="counter-buttons">
        <button onClick={increment}>+{step}</button>
        <button onClick={decrement}>-{step}</button>
        <button onClick={reset}>重置</button>
      </div>
    </div>
  );
}

// 主應用程式
function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alice',
      age: 25,
      avatarUrl: '/alice-avatar.png',
      occupation: '前端工程師',
      score: 85,
      skills: ['React', 'JavaScript', 'CSS']
    },
    {
      id: 2,
      name: 'Bob',
      age: 30,
      avatarUrl: '/bob-avatar.png',
      occupation: '後端工程師',
      score: 92,
      skills: ['Node.js', 'Python', 'Database']
    }
  ]);

  const handleUpdateScore = (userId, newScore) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, score: newScore } : user
      )
    );
  };

  return (
    <div className="app">
      <h1>用戶管理系統</h1>
      
      <div className="users-section">
        <h2>用戶列表</h2>
        {users.map(user => (
          <ProfileCard
            key={user.id}
            user={user}
            onUpdateScore={handleUpdateScore}
          />
        ))}
      </div>
      
      <div className="counters-section">
        <h2>統計計數器</h2>
        <Counter title="網站訪問量" initialValue={1000} step={10} />
        <Counter title="用戶數量" initialValue={users.length} />
      </div>
    </div>
  );
}`,expectedOutput:"顯示完整的用戶管理系統，包含用戶資料卡片和可互動的計數器",hints:["Props 是唯讀的，不能在子組件中修改","使用 useState Hook 需要先 import","setState 函式會觸發組件重新渲染","使用函式式狀態更新避免關閉包問題","善用預設值讓組件更靈活","記得為列表項目設定唯一的 key"],additionalChallenges:["添加用戶新增和刪除功能","實作用戶資料編輯功能","添加更多類型的計數器（帶上限下限）","實作用戶資料的本地存儲功能","添加輸入驗證和錯誤處理"]},questions:[{id:"3-1",content:"Props (properties) 是組件之間傳遞資料的方式，就像函式的參數一樣。父組件可以透過 props 將資料傳遞給子組件。Props 是唯讀的，不能被子組件修改。",codeExample:`// ProfileCard 組件實作
function ProfileCard({ name, age, avatarUrl, occupation }) {
  return (
    <div className="profile-card">
      <img src={avatarUrl} alt={\`\${name}'s avatar\`} />
      <div className="profile-info">
        <h2>{name}</h2>
        <p>年齡: {age}</p>
        <p>職業: {occupation}</p>
      </div>
    </div>
  );
}

// 使用 ProfileCard 組件
function App() {
  return (
    <div>
      <ProfileCard 
        name="Alice" 
        age={25} 
        avatarUrl="/avatar1.jpg"
        occupation="前端工程師"
      />
    </div>
  );
}`,quiz:{question:"Props 的特性是什麼？",options:["唯讀的，不能被修改","可以被子組件修改","只能傳遞字串","只能在類別組件中使用"],answer:"唯讀的，不能被修改"},media:{image:"/src/assets/images/props-flow.png",audio:"/src/assets/audio/props-explanation.mp3"}},{id:"3-2",content:"State 是組件內部的狀態資料，當 state 改變時，React 會自動重新渲染組件。在函式組件中，我們使用 useState Hook 來管理狀態。",codeExample:`import { useState } from 'react';

// Counter 組件實作
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>計數器: {count}</h2>
      <div className="counter-buttons">
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>重置</button>
      </div>
    </div>
  );
}`,quiz:{question:"useState Hook 回傳什麼？",options:["一個陣列，包含狀態值和更新函式","只有狀態值","只有更新函式","一個物件"],answer:"一個陣列，包含狀態值和更新函式"},media:{image:"/src/assets/images/state-diagram.png",audio:"/src/assets/audio/state-management.mp3"}}]},{id:4,weekNumber:2,dayNumber:1,title:"第二週 Day 1-2: useEffect 與 API 資料獲取",description:"學習處理副作用和從 API 獲取資料，掌握 React 組件的生命週期管理和非同步操作",estimatedTime:120,difficulty:"intermediate",tags:["useEffect","API","副作用","非同步"],learningObjectives:["理解 useEffect 的作用和生命週期關係","掌握副作用的概念和處理方法","學會從 API 獲取資料的最佳實踐","掌握載入狀態和錯誤處理機制","理解 useEffect 的依賴陣列和清理機制"],dailyTasks:[{id:"4-1",title:"理解 useEffect 概念",description:"學習副作用的概念和 useEffect 的用途，理解生命週期關係",estimatedTime:30,completed:!1,checkpoints:["理解什麼是副作用（Side Effects）","學會 useEffect 的基本語法和用法","理解 useEffect 的執行時機","理解依賴陣列的作用"]},{id:"4-2",title:"創建 Timer 組件",description:"使用 useEffect 實作計時器功能，學習清理機制",estimatedTime:30,completed:!1,checkpoints:["使用 setInterval 實作計時器","學會 useEffect 的清理機制","處理組件卸載時的資源清理","實作可控制的計時器功能"]},{id:"4-3",title:"學習 API 資料獲取",description:"使用 fetch 從 API 獲取並顯示資料，學習非同步操作",estimatedTime:40,completed:!1,checkpoints:["使用 fetch API 進行網路請求","在 useEffect 中處理非同步操作","處理 JSON 資料的解析和顯示","實作資料獲取的取消機制"]},{id:"4-4",title:"處理載入和錯誤狀態",description:"實作完整的資料載入、錯誤處理流程，提升用戶體驗",estimatedTime:20,completed:!1,checkpoints:["實作 loading 狀態的管理","處理不同類型的錯誤情況","實作重試機制和錯誤恢復","提供良好的用戶回馔"]}],practicalExercise:{title:"建立完整的資料管理系統",description:"結合 useEffect 和 API 資料獲取，創建一個完整的用戶管理系統，包含載入、錯誤處理、重試機制和實時更新",template:`import { useState, useEffect } from 'react';

// 用戶管理系統
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  // 獲取用戶列表
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
      const userData = await response.json();
      setUsers(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 獲取用戶詳情
  const fetchUserDetails = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to fetch user details');
      const userDetails = await response.json();
      setSelectedUser(userDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 初始化載入
  useEffect(() => {
    fetchUsers();
  }, []);

  // 重試機制
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchUsers();
  };

  // 載入狀態
  if (loading && users.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>載入中...</p>
      </div>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <div className="error">
        <h3>發生錯誤</h3>
        <p>{error}</p>
        <button onClick={handleRetry}>重試 ({retryCount})</button>
      </div>
    );
  }

  return (
    <div className="user-management">
      <h1>用戶管理系統</h1>
      
      <div className="actions">
        <button onClick={fetchUsers}>重新載入</button>
        <p>總用戶數: {users.length}</p>
      </div>

      <div className="user-list">
        <h2>用戶列表</h2>
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <button onClick={() => fetchUserDetails(user.id)}>
              查看詳情
            </button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="user-details">
          <h2>用戶詳情</h2>
          <p>名稱: {selectedUser.name}</p>
          <p>用戶名: {selectedUser.username}</p>
          <p>Email: {selectedUser.email}</p>
          <p>網站: {selectedUser.website}</p>
          <p>公司: {selectedUser.company.name}</p>
          <button onClick={() => setSelectedUser(null)}>關閉</button>
        </div>
      )}
    </div>
  );
}

// 計時器組件
function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <div className="timer">
      <h3>計時器</h3>
      <div className="time-display">{formatTime(time)}</div>
      <div className="timer-controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? '暫停' : '開始'}
        </button>
        <button onClick={() => { setTime(0); setIsRunning(false); }}>
          重置
        </button>
      </div>
    </div>
  );
}

// 主應用程式
function App() {
  return (
    <div className="app">
      <UserManagement />
      <Timer />
    </div>
  );
}`,expectedOutput:"具有載入狀態、錯誤處理、重試機制和實時更新的完整用戶管理系統",hints:["useEffect 的依賴陣列為空時只在掛載時執行一次","記得處理 loading 和 error 狀態","使用 finally 確保 loading 狀態正確更新","使用清理函式防止記憶體洩漏","善用 async/await 處理非同步操作","提供良好的用戶回馔和錯誤資訊"],additionalChallenges:["實作資料緩存機制避免重複請求","添加資料築選和排序功能","實作無限滾動載入更多資料","添加離線狀態檢測和處理","實作資料同步和更新通知機制"]},questions:[{id:"4-1",content:"useEffect 是處理副作用的 Hook，如資料獲取、訂閱、定時器或手動更改 DOM。它在組件渲染後執行，可以透過依賴項陣列來控制何時執行。",codeExample:`import { useState, useEffect } from 'react';

// 基本的 useEffect 使用
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // 清理函式
    return () => clearInterval(interval);
  }, []); // 空依賴陣列，只在掛載時執行一次

  return <div>計時器: {seconds} 秒</div>;
}`,quiz:{question:"useEffect 的清理函式何時會被執行？",options:["組件卸載時或下次 effect 執行前","只在組件掛載時","每次狀態更新時","只在發生錯誤時"],answer:"組件卸載時或下次 effect 執行前"},media:{image:"/src/assets/images/useeffect-lifecycle.png",audio:"/src/assets/audio/useeffect-explanation.mp3"}},{id:"4-2",content:"從 API 獲取資料是 React 應用程式的常見需求。我們需要處理載入狀態、錯誤處理，並在組件卸載時清理請求。",codeExample:`// API 資料獲取範例
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div><h2>{user.name}</h2></div>;
}`,quiz:{question:"處理 API 請求時，通常需要管理哪些狀態？",options:["loading, data, error","只有 data","只有 loading","data, success"],answer:"loading, data, error"},media:{image:"/src/assets/images/api-fetch.png",audio:"/src/assets/audio/api-guide.mp3"}}]},{id:5,weekNumber:2,dayNumber:3,title:"第二週 Day 3-4: 列表渲染與表單處理",description:"學習渲染動態列表和建立互動式表單，掌握受控組件模式和表單驗證技巧",estimatedTime:120,difficulty:"intermediate",tags:["列表渲染","表單","受控組件","key 屬性"],learningObjectives:["掌握使用 map() 渲染動態列表","理解 key 屬性的重要性和最佳實踐","學會建立受控組件表單","掌握表單驗證和錯誤處理","實作完整的 CRUD 操作功能"],dailyTasks:[{id:"5-1",title:"掌握 map() 列表渲染",description:"學習使用 map() 渲染動態列表，理解陣列轉換為 JSX 的機制",estimatedTime:30,completed:!1,checkpoints:["理解 map() 方法的運作原理","學會將陣列轉換為 JSX 元素","掌握條件渲染和空狀態處理","實作巢套列表的渲染"]},{id:"5-2",title:"理解 key 屬性重要性",description:"學習為什麼需要 key 屬性以及如何正確使用，理解虛擬 DOM diff 算法",estimatedTime:20,completed:!1,checkpoints:["理解 key 屬性在虛擬 DOM 中的作用","學會選擇適當的 key 值","避免使用 index 作為 key 的理由","實作 key 屬性的最佳實踐"]},{id:"5-3",title:"創建 Todo List 基礎功能",description:"實作新增、顯示、標記完成、刪除等完整 CRUD 功能",estimatedTime:40,completed:!1,checkpoints:["實作新增待辦事項功能","實作標記完成/取消完成功能","實作刪除待辦事項功能","添加輸入驗證和錯誤處理"]},{id:"5-4",title:"學習受控組件表單處理",description:"掌握表單輸入和驗證的處理方式，學會表單狀態管理",estimatedTime:30,completed:!1,checkpoints:["理解受控組件與非受控組件的差別","實作表單輸入的狀態管理","添加表單驗證和錯誤訊息","處理表單提交和重置功能"]}],practicalExercise:{title:"建立 Todo List 應用",description:"創建一個具有增加、完成、刪除功能的待辦事項列表",template:`// Todo List 組件
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '學習 React', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="新增待辦事項..."
      />
      <button onClick={addTodo}>新增</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,expectedOutput:"功能完整的 Todo List 應用",hints:["每個列表項目都需要唯一的 key 屬性","使用展開運算子來複製陣列","記得清空輸入框在新增項目後"],additionalChallenges:["實作 Todo 項目編輯功能","添加 Todo 分類和標籤系統","實作 Todo 項目拖放排序","添加搜尋和篩選功能","實作 Todo 項目優先級排序","添加本地儲存功能"]},questions:[{id:"5-1",content:"在 React 中渲染列表時，我們使用 map() 方法來遍歷陣列。每個列表項目都需要一個唯一的 key 屬性來幫助 React 優化渲染效能和正確處理組件狀態。",codeExample:`import { useState } from 'react';

// Todo List 實作
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '學習 React', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="新增待辦事項..."
      />
      <button onClick={addTodo}>新增</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`,quiz:{question:"為什麼列表項目需要 key 屬性？",options:["幫助 React 優化渲染效能","讓 CSS 樣式正確套用","避免 JavaScript 錯誤","支援無障礙功能"],answer:"幫助 React 優化渲染效能"},media:{image:"/src/assets/images/list-rendering.png",audio:"/src/assets/audio/lists-and-keys.mp3"}},{id:"5-2",content:"在 React 中，受控組件的值由 React state 控制。每次輸入變更都會觸發 state 更新，這讓我們可以即時驗證輸入或動態更新 UI。",codeExample:`import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交表單:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="姓名"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="電子郵件"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="訊息"
      />
      <button type="submit">送出</button>
    </form>
  );
}`,quiz:{question:"受控組件的特徵是什麼？",options:["值由 React state 控制","值由 DOM 控制","不需要事件處理","不能驗證輸入"],answer:"值由 React state 控制"},media:{image:"/src/assets/images/controlled-components.png",audio:"/src/assets/audio/forms-explanation.mp3"}}]},{id:6,weekNumber:2,dayNumber:5,title:"第二週 Day 5: 組件化拆分與狀態提升",description:"學習將大型組件拆分成小組件並理解狀態提升",estimatedTime:120,difficulty:"intermediate",tags:["組件化","狀態提升","架構"],dailyTasks:[{id:"6-1",title:"理解組件拆分原則",description:"學習單一職責、可重複使用的組件設計原則",estimatedTime:30,completed:!1},{id:"6-2",title:"拆分 Todo List 組件",description:"將 Todo List 拆分成 TodoItem、AddTodoForm 等小組件",estimatedTime:40,completed:!1},{id:"6-3",title:"理解狀態提升概念",description:"學習將共享狀態移到公共父組件中管理",estimatedTime:30,completed:!1},{id:"6-4",title:"實作組件間通信",description:"使用 props 傳遞狀態和事件處理函式",estimatedTime:20,completed:!1}],practicalExercise:{title:"重構 Todo List 應用",description:"將 Todo List 拆分成多個小組件並實現狀態提升",template:`// TodoItem 組件
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>刪除</button>
    </li>
  );
}

// AddTodoForm 組件
function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="新增待辦事項..."
      />
      <button type="submit">新增</button>
    </form>
  );
}

// 主要的 TodoApp 組件
function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <AddTodoForm onAddTodo={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}`,expectedOutput:"結構清晰的組件化 Todo List 應用",hints:["每個組件都應該有單一職責","通過 props 傳遞狀態和事件處理函式","父組件負責管理所有共享狀態"],additionalChallenges:["設計一個可重用的彈窗組件","實作組件間的數據同步機制","創建一個完整的購物車組件系統","實作組件的懶加載和代碼分割","設計一個模塊化的表單組件架構"]},questions:[{id:"6-1",content:"當組件變得複雜時，我們需要將它拆分成更小的組件。拆分的原則包括：單一職責、可重複使用、邏輯清晰。狀態提升是指將共享狀態移動到公共父組件中管理。",codeExample:`// 組件拆分範例
// TodoItem 組件
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>刪除</button>
    </li>
  );
}

// AddTodoForm 組件
function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="新增待辦事項..."
      />
      <button type="submit">新增</button>
    </form>
  );
}

// 主要的 TodoApp 組件
function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <AddTodoForm onAddTodo={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}`,quiz:{question:"什麼是狀態提升？",options:["將共享狀態移動到公共父組件","增加組件的狀態","刪除不需要的狀態","複製狀態到子組件"],answer:"將共享狀態移動到公共父組件"},media:{image:"/src/assets/images/components-diagram.png",audio:"/src/assets/audio/components-intro.mp3"}}]},{id:7,weekNumber:3,dayNumber:1,title:"第三週 Day 1-2: React Router 路由系統",description:"學習使用 React Router 建立單頁應用程式的路由，掌握導航和頁面狀態管理",estimatedTime:120,difficulty:"intermediate",tags:["路由","SPA","導航","react-router-dom"],learningObjectives:["理解 SPA 的概念和優勢","掌握 React Router 的基本使用方法","學會建立多頁面應用程式","掌握動態路由和參數傳遞","理解路由守衛和導航控制"],dailyTasks:[{id:"7-1",title:"理解 SPA 概念",description:"學習單頁應用程式的概念和優勢，理解路由的運作原理",estimatedTime:20,completed:!1,checkpoints:["理解 SPA 與傳統多頁面應用的差別","學習客戶端路由的概念","理解 History API 的作用","理解 React Router 的優勢"]},{id:"7-2",title:"安裝和配置 React Router",description:"在專案中安裝 react-router-dom 並設定基本路由結構",estimatedTime:30,completed:!1,checkpoints:["安裝 react-router-dom 套件","學會使用 BrowserRouter 包裝應用","理解 Routes 和 Route 組件","實作基本的導航連結"]},{id:"7-3",title:"創建多頁面 Todo 應用",description:"為 Todo List 添加 /all、/active、/completed 路由，實作築選功能",estimatedTime:50,completed:!1,checkpoints:["建立不同的頁面組件","實作路由切換和導航","添加活動狀態的導航連結","實作按狀態築選待辦事項"]},{id:"7-4",title:"學習動態路由參數",description:"使用 useParams 處理動態路由參數，實作詳情頁面",estimatedTime:20,completed:!1,checkpoints:["學會使用 useParams Hook","實作動態路由參數传递","處理頁面參數驗證","實作面包屑導航功能"]}],practicalExercise:{title:"建立多頁面 Todo 應用",description:"為 Todo List 應用添加路由功能，支援不同的過濾檢視",template:`import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// 頁面組件
function AllTodos() {
  return <h2>所有待辦事項</h2>;
}

function ActiveTodos() {
  return <h2>進行中的待辦事項</h2>;
}

function CompletedTodos() {
  return <h2>已完成的待辦事項</h2>;
}

// 主要應用程式
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">全部</Link>
        <Link to="/active">進行中</Link>
        <Link to="/completed">已完成</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<AllTodos />} />
        <Route path="/active" element={<ActiveTodos />} />
        <Route path="/completed" element={<CompletedTodos />} />
      </Routes>
    </Router>
  );
}`,expectedOutput:"具有多頁面導航的 Todo List 應用",hints:["使用 BrowserRouter 包裹整個應用","Link 組件用於導航，Route 組件定義路由","useParams 可以取得動態路由參數","使用 NavLink 可以顯示活動狀態的導航連結","useNavigate 可以用於程式化導航"],additionalChallenges:["為 Todo 應用添加 /todo/:id 路由顯示單個待辦事項詳情","實作 404 頁面和 * 路由捕獲未匹配的路徑","使用 NavLink 實作帶有活動狀態的導航選單","添加面包屑導航顯示當前頁面位置","實作「返回上一頁」功能使用 useNavigate(-1)"]},questions:[{id:"7-1",title:"單頁應用程式 (SPA) 與 React Router 基礎",content:"單頁應用程式 (SPA) 是指在一個頁面中動態載入不同內容的網頁應用程式，而不是傳統的多頁面跳轉。React Router 是 React 生態系統中最受歡迎的路由解決方案，讓我們可以建立多個路由，每個路由對應不同的組件，實現頁面切換的效果。SPA 的主要優勢包括：更快的頁面切換、更好的用戶體驗、減少伺服器負載。React Router 使用 HTML5 History API 來實現客戶端路由，無需重新載入整個頁面。",codeExample:`import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// 頁面組件
function Home() {
  return (
    <div>
      <h1>首頁</h1>
      <p>歡迎來到我們的 SPA 應用程式</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>關於我們</h1>
      <p>這是一個使用 React Router 的單頁應用程式</p>
    </div>
  );
}

function UserProfile() {
  const { userId } = useParams();
  return (
    <div>
      <h1>使用者資料</h1>
      <p>使用者 ID: {userId}</p>
      <p>這是動態路由的範例</p>
    </div>
  );
}

// 主要應用程式
function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>首頁</Link>
        <Link to="/about" style={{ marginRight: '10px' }}>關於</Link>
        <Link to="/user/123">使用者資料</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:userId" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}`,quiz:{question:"單頁應用程式 (SPA) 的主要優勢是什麼？",options:["更快的頁面切換和更好的用戶體驗","更簡單的程式碼結構","更低的開發成本","更好的 SEO 效果"],answer:"更快的頁面切換和更好的用戶體驗",explanation:"SPA 通過避免整頁重新載入，提供更快的頁面切換和更流暢的用戶體驗，這是其主要優勢。"},media:{image:"/src/assets/images/react-router-spa.png",audio:"/src/assets/audio/spa-explanation.mp3"}},{id:"7-2",title:"React Router 核心組件詳解",content:"React Router 提供了幾個核心組件來構建路由系統：BrowserRouter 作為路由容器，使用 HTML5 History API；Routes 用於定義路由規則的容器；Route 定義單個路由規則；Link 用於導航連結；useParams 用於獲取動態路由參數。理解這些組件的作用和使用方式是掌握 React Router 的關鍵。BrowserRouter 通常包裹整個應用，Routes 包含多個 Route 組件，每個 Route 定義一個路徑和對應的組件。",codeExample:`import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// 使用 useNavigate 進行程式化導航
function NavigationExample() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/about');
  };
  
  return (
    <div>
      <h2>程式化導航範例</h2>
      <button onClick={handleClick}>前往關於頁面</button>
    </div>
  );
}

// 嵌套路由範例
function Products() {
  return (
    <div>
      <h2>產品列表</h2>
      <nav>
        <Link to="/products/1">產品 1</Link>
        <Link to="/products/2">產品 2</Link>
      </nav>
      <Routes>
        <Route path=":productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

function ProductDetail() {
  const { productId } = useParams();
  return <h3>產品詳情：{productId}</h3>;
}

// 路由守衛範例
function ProtectedRoute({ children }) {
  const isAuthenticated = true; // 實際應用中從狀態或 Context 獲取
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}`,quiz:{question:"在 React Router 中，哪個組件用於定義路由規則？",options:["Route","Link","Router","Navigate"],answer:"Route",explanation:"Route 組件用於定義單個路由規則，指定路徑和對應的組件。"},media:{image:"/src/assets/images/react-router-components.png",audio:"/src/assets/audio/router-components.mp3"}},{id:"7-3",title:"動態路由與參數處理",content:"動態路由允許我們在路由路徑中定義可變的部分，使用冒號(:)作為參數標識符。例如 /user/:userId 可以匹配 /user/123、/user/456 等。useParams Hook 讓我們能夠在組件中獲取這些動態參數。動態路由在構建詳情頁面、用戶資料頁面等場景中非常有用。我們還可以使用 useSearchParams 處理查詢參數，使用 useLocation 獲取當前位置信息。",codeExample:`import { useParams, useSearchParams, useLocation } from 'react-router-dom';

// 動態路由參數範例
function UserProfile() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const tab = searchParams.get('tab') || 'profile';
  
  return (
    <div>
      <h2>使用者資料</h2>
      <p>使用者 ID: {userId}</p>
      <p>當前標籤: {tab}</p>
      <p>完整路徑: {location.pathname}</p>
      
      <nav>
        <Link to={\`/user/\${userId}?tab=profile\`}>個人資料</Link>
        <Link to={\`/user/\${userId}?tab=settings\`}>設定</Link>
      </nav>
      
      {tab === 'profile' && <ProfileContent />}
      {tab === 'settings' && <SettingsContent />}
    </div>
  );
}

// 多層動態路由
function BlogPost() {
  const { category, postId } = useParams();
  
  return (
    <div>
      <h2>部落格文章</h2>
      <p>分類: {category}</p>
      <p>文章 ID: {postId}</p>
    </div>
  );
}

// 路由配置
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/blog/:category/:postId" element={<BlogPost />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}`,quiz:{question:"在動態路由 /user/:userId 中，如何在組件中獲取 userId 參數？",options:["useParams()","useSearchParams()","useLocation()","useNavigate()"],answer:"useParams()",explanation:"useParams() Hook 用於獲取動態路由參數，返回一個包含所有路由參數的物件。"},media:{image:"/src/assets/images/dynamic-routing.png",audio:"/src/assets/audio/dynamic-routing.mp3"}},{id:"7-4",title:"路由導航與狀態管理",content:"React Router 提供了多種導航方式：Link 組件用於聲明式導航、useNavigate Hook 用於程式化導航、NavLink 用於帶有活動狀態的導航連結。在 SPA 中，路由狀態的管理非常重要，我們需要考慮如何保持 URL 與應用狀態的同步。useLocation 可以讓我們監聽路由變化，useNavigate 可以讓我們根據條件進行導航。導航守衛則可以幫助我們控制路由的存取權限。",codeExample:`import { useNavigate, useLocation, NavLink } from 'react-router-dom';

// 活動狀態導航
function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        首頁
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        關於
      </NavLink>
    </nav>
  );
}

// 程式化導航與條件導航
function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 登入邏輯
    const isLoginSuccessful = true;
    
    if (isLoginSuccessful) {
      // 登入成功後導航到之前的頁面或首頁
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="使用者名稱" />
      <input type="password" placeholder="密碼" />
      <button type="submit">登入</button>
    </form>
  );
}

// 路由守衛
function RequireAuth({ children }) {
  const location = useLocation();
  const isAuthenticated = false; // 從狀態或 Context 獲取
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

// 面包屑導航
function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <nav>
      <Link to="/">首頁</Link>
      {pathnames.map((name, index) => {
        const routeTo = \`/\${pathnames.slice(0, index + 1).join('/')}\`;
        const isLast = index === pathnames.length - 1;
        
        return isLast ? (
          <span key={name}> / {name}</span>
        ) : (
          <span key={name}> / <Link to={routeTo}>{name}</Link></span>
        );
      })}
    </nav>
  );
}`,quiz:{question:"NavLink 組件與 Link 組件的主要差別是什麼？",options:["NavLink 可以顯示活動狀態","NavLink 載入速度更快","NavLink 支援動態路由","NavLink 可以傳遞參數"],answer:"NavLink 可以顯示活動狀態",explanation:"NavLink 提供了 isActive 屬性，可以根據當前路由狀態來顯示不同的樣式，這是與 Link 的主要差別。"},media:{image:"/src/assets/images/navigation-patterns.png",audio:"/src/assets/audio/navigation-patterns.mp3"}}]},{id:8,weekNumber:3,dayNumber:3,title:"第三週 Day 3: Context API 全域狀態管理",description:"學習使用 Context API 解決 Prop Drilling 問題",estimatedTime:120,difficulty:"intermediate",tags:["Context API","全域狀態","狀態管理"],learningObjectives:["理解 Prop Drilling 問題及其解決方案","掌握 Context API 的基本使用方法","學會創建和使用 Context Provider","能夠設計自定義 Hook 封裝 Context 邏輯","理解 Context 的效能考量和最佳實踐"],dailyTasks:[{id:"8-1",title:"理解 Prop Drilling 問題",description:"學習什麼是 Prop Drilling 以及它帶來的問題",estimatedTime:20,completed:!1,checkpoints:["理解 Prop Drilling 的定義和產生原因","識別 Prop Drilling 在實際應用中的表現","分析 Prop Drilling 帶來的維護問題","了解解決 Prop Drilling 的不同方案"]},{id:"8-2",title:"創建 Context 和 Provider",description:"使用 createContext 建立全域狀態管理",estimatedTime:40,completed:!1,checkpoints:["使用 createContext 創建新的 Context","設計 Context Provider 組件","定義 Context 的 value 結構","使用 Provider 包裹組件樹"]},{id:"8-3",title:"使用 Context API 重構 Todo 應用",description:"將 Todo List 改為使用 Context 管理狀態",estimatedTime:40,completed:!1,checkpoints:["將 Todo 狀態遷移到 Context 中","使用 useContext 消費 Context 資料","重構組件以使用 Context 狀態","測試重構後的應用功能"]},{id:"8-4",title:"創建自定義 Hook",description:"建立 useTodos Hook 封裝 Context 邏輯",estimatedTime:20,completed:!1,checkpoints:["設計 useTodos Hook 的 API 介面","實作 Hook 中的錯誤處理","在組件中使用自定義 Hook","驗證 Hook 的復用性和可維護性"]}],practicalExercise:{title:"使用 Context API 重構 Todo 應用",description:"將 Todo List 應用改為使用 Context API 管理狀態",template:`import { createContext, useContext, useState } from 'react';

// 創建 Context
const TodoContext = createContext();

// Context Provider 組件
function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const value = { todos, addTodo, toggleTodo, deleteTodo };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// 自定義 Hook
function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}

// 使用 Context 的組件
function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>刪除</button>
        </li>
      ))}
    </ul>
  );
}

// 主應用程式
function App() {
  return (
    <TodoProvider>
      <div>
        <h1>Todo App</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
}`,expectedOutput:"使用 Context API 的 Todo List 應用",hints:["createContext 用於創建 Context","useContext Hook 用於消費 Context","自定義 Hook 可以封裝 Context 邏輯","Context Provider 應該包裝需要存取狀態的組件","自定義 Hook 中要加入錯誤處理"],additionalChallenges:["創建多個 Context 分別管理不同的狀態領域","實作 Context 的 useReducer 版本替代 useState","添加本地儲存功能，讓 Todo 資料持久化","設計 Context 分割機制避免不必要的重新渲染","實作 Context 的 debug 功能，追蹤狀態變化"]},questions:[{id:"8-1",title:"Prop Drilling 問題與解決方案",content:"Prop Drilling 是指需要將 props 層層傳遞到深層組件的問題，這在大型應用中會導致維護困難。Context API 提供了一種在組件樹中傳遞資料的方式，避免 props 的層層傳遞。Prop Drilling 的主要問題包括：中間組件被迫接收和傳遞不需要的 props、程式碼維護困難、重構時需要修改多個組件。Context API 通過建立一個全域的狀態容器，讓深層組件可以直接存取所需的資料。",codeExample:`// Prop Drilling 問題範例
function App() {
  const [user, setUser] = useState({ name: 'Alice', theme: 'dark' });
  
  return <Header user={user} />;
}

function Header({ user }) {
  return (
    <nav>
      <UserProfile user={user} />
    </nav>
  );
}

function UserProfile({ user }) {
  return (
    <div>
      <UserAvatar user={user} />
      <UserName user={user} />
    </div>
  );
}

function UserAvatar({ user }) {
  return <img src={user.avatar} alt={user.name} />;
}

// Context API 解決方案
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'Alice', theme: 'dark' });
  
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}

function Header() {
  return (
    <nav>
      <UserProfile />
    </nav>
  );
}

function UserProfile() {
  return (
    <div>
      <UserAvatar />
      <UserName />
    </div>
  );
}

function UserAvatar() {
  const user = useContext(UserContext);
  return <img src={user.avatar} alt={user.name} />;
}

function UserName() {
  const user = useContext(UserContext);
  return <span>{user.name}</span>;
}`,quiz:{question:"Context API 主要解決什麼問題？",options:["Prop Drilling","性能優化","代碼重複","錯誤處理"],answer:"Prop Drilling",explanation:"Context API 的主要目的是解決 Prop Drilling 問題，讓深層組件可以直接存取需要的資料，無需透過中間組件傳遞。"},media:{image:"/src/assets/images/prop-drilling-context.png",audio:"/src/assets/audio/context-explanation.mp3"}},{id:"8-2",title:"Context API 核心概念與使用",content:"Context API 由三個核心部分組成：createContext 用於創建 Context、Provider 用於提供數據、useContext 用於消費數據。Context 允許我們在組件樹中的任何位置分享數據，而無需透過 props 層層傳遞。Provider 組件包裝需要存取共享狀態的組件子樹，而 useContext Hook 讓組件可以直接讀取 Context 中的值。設計良好的 Context 應該有清晰的職責分離，避免包含過多不相關的狀態。",codeExample:`import { createContext, useContext, useState, useReducer } from 'react';

// 創建 Context
const TodoContext = createContext();

// 使用 useReducer 管理複雜狀態
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

// Context Provider 組件
function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// 自定義 Hook
function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}

// 使用 Context 的組件
function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>刪除</button>
        </li>
      ))}
    </ul>
  );
}

function AddTodoForm() {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新增待辦事項..."
      />
      <button type="submit">新增</button>
    </form>
  );
}`,quiz:{question:"使用 Context API 時，哪個 Hook 用於消費 Context 資料？",options:["useContext","useProvider","useConsumer","useState"],answer:"useContext",explanation:"useContext Hook 用於在組件中消費 Context 資料，它接收一個 Context 物件並返回該 Context 的當前值。"},media:{image:"/src/assets/images/context-api-flow.png",audio:"/src/assets/audio/context-usage.mp3"}},{id:"8-3",title:"自定義 Hook 與 Context 封裝",content:"自定義 Hook 是封裝 Context 邏輯的最佳實踐，它可以提供更簡潔的 API 並包含錯誤處理。自定義 Hook 應該檢查 Context 是否在正確的 Provider 內使用，並提供有意義的錯誤訊息。良好的自定義 Hook 設計包括：清晰的命名、完整的錯誤處理、適當的類型定義、文檔說明。自定義 Hook 也可以包含派生狀態的計算，如過濾、排序等邏輯。",codeExample:`import { createContext, useContext, useState, useMemo } from 'react';

// 創建 Context
const TodoContext = createContext();

// TodoProvider 組件
function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// 自定義 Hook 包含錯誤處理和派生狀態
function useTodos() {
  const context = useContext(TodoContext);
  
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  
  const { todos, addTodo, toggleTodo, deleteTodo } = context;
  
  // 計算派生狀態
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }, [todos]);
  
  // 提供過濾功能
  const getFilteredTodos = (filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };
  
  return {
    todos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    getFilteredTodos
  };
}

// 使用自定義 Hook 的組件
function TodoStats() {
  const { stats } = useTodos();
  
  return (
    <div>
      <p>總計: {stats.total}</p>
      <p>已完成: {stats.completed}</p>
      <p>待完成: {stats.active}</p>
    </div>
  );
}

function FilteredTodoList({ filter }) {
  const { getFilteredTodos, toggleTodo, deleteTodo } = useTodos();
  const filteredTodos = getFilteredTodos(filter);
  
  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>刪除</button>
        </li>
      ))}
    </ul>
  );
}`,quiz:{question:"自定義 Hook 的命名約定是什麼？",options:["必須以 'use' 開頭","必須以 'hook' 開頭","必須以 'custom' 開頭","沒有命名約定"],answer:"必須以 'use' 開頭",explanation:"根據 React 的規則，自定義 Hook 必須以 'use' 開頭，這樣 React 才能正確地應用 Hook 的規則。"},media:{image:"/src/assets/images/custom-hooks.png",audio:"/src/assets/audio/custom-hooks.mp3"}},{id:"8-4",title:"Context 效能優化與最佳實踐",content:"Context 的效能問題主要來自於當 Context 值改變時，所有消費該 Context 的組件都會重新渲染。優化策略包括：分割 Context 避免不必要的重新渲染、使用 useMemo 和 useCallback 優化 Context 值、將頻繁變化的狀態與穩定的狀態分開。此外，Context 適合用於相對穩定的全域狀態，如主題、語言、用戶資訊等，對於頻繁變化的狀態，可能需要考慮其他狀態管理解決方案。",codeExample:`import { createContext, useContext, useState, useMemo, useCallback } from 'react';

// 分割 Context 避免不必要的重新渲染
const TodoStateContext = createContext();
const TodoActionsContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  
  // 使用 useCallback 避免每次渲染都創建新的函數
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  }, []);
  
  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);
  
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);
  
  // 使用 useMemo 避免每次渲染都計算派生狀態
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);
  
  const state = useMemo(() => ({ todos, stats }), [todos, stats]);
  const actions = useMemo(() => ({ addTodo, toggleTodo, deleteTodo }), [addTodo, toggleTodo, deleteTodo]);
  
  return (
    <TodoStateContext.Provider value={state}>
      <TodoActionsContext.Provider value={actions}>
        {children}
      </TodoActionsContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 分離的自定義 Hook
function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }
  return context;
}

function useTodoActions() {
  const context = useContext(TodoActionsContext);
  if (!context) {
    throw new Error('useTodoActions must be used within a TodoProvider');
  }
  return context;
}

// 使用優化後的 Context
function TodoList() {
  const { todos } = useTodoState();
  const { toggleTodo, deleteTodo } = useTodoActions();
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
}

// 使用 React.memo 避免不必要的重新渲染
const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>刪除</button>
    </li>
  );
});

function TodoStats() {
  const { stats } = useTodoState(); // 只會訂閱狀態變化
  
  return (
    <div>
      <p>總計: {stats.total}</p>
      <p>已完成: {stats.completed}</p>
      <p>待完成: {stats.active}</p>
    </div>
  );
}`,quiz:{question:"下列哪個是 Context 效能優化的最佳實踐？",options:["分割 Context 避免不必要的重新渲染","將所有狀態放在一個 Context 中","避免使用 useMemo 和 useCallback","頻繁更新 Context 值"],answer:"分割 Context 避免不必要的重新渲染",explanation:"分割 Context 可以讓組件只訂閱它們需要的狀態，避免因不相關狀態的改變而引起的不必要重新渲染。"},media:{image:"/src/assets/images/context-optimization.png",audio:"/src/assets/audio/context-performance.mp3"}}]},{id:9,weekNumber:3,dayNumber:4,title:"第三週 Day 4-5: UI 組件庫與 API 封裝",description:"學習整合 UI 組件庫和封裝 API 請求",estimatedTime:120,difficulty:"intermediate",tags:["UI 組件庫","API 封裝","第三方庫"],learningObjectives:["了解主流 UI 組件庫的特色和選擇標準","掌握 Ant Design 的基本使用方法","學會整合 UI 組件庫到現有專案中","理解 API 封裝的重要性和最佳實踐","能夠使用 axios 進行 HTTP 請求管理"],dailyTasks:[{id:"9-1",title:"了解主流 UI 組件庫",description:"認識 Ant Design、Material-UI、Chakra UI 等",estimatedTime:20,completed:!1,checkpoints:["比較不同 UI 組件庫的特色和優缺點","了解 Ant Design 的設計理念和組件體系","學習選擇 UI 組件庫的考量因素","查看各組件庫的官方文檔和範例"]},{id:"9-2",title:"安裝和配置 Ant Design",description:"在專案中安裝 Ant Design 並設定基本配置",estimatedTime:30,completed:!1,checkpoints:["使用 npm 安裝 antd 套件","設定 Ant Design 的主題和樣式","配置按需載入以優化打包大小","測試基本組件的正常運作"]},{id:"9-3",title:"使用 Ant Design 美化 Todo 應用",description:"使用 Ant Design 組件替換原有的 HTML 元素",estimatedTime:50,completed:!1,checkpoints:["使用 Input 和 Button 組件替換表單元素","使用 List 組件優化待辦事項顯示","使用 Checkbox 和 Icon 組件增強互動","應用 Ant Design 的主題和樣式系統"]},{id:"9-4",title:"封裝 API 請求",description:"使用 axios 封裝 API 請求函式",estimatedTime:20,completed:!1,checkpoints:["安裝並配置 axios 套件","設計 API 服務的基本結構","實作請求攔截器和響應攔截器","創建可重用的 API 請求函式"]}],practicalExercise:{title:"使用 Ant Design 美化 Todo 應用",description:"將 Todo List 應用改為使用 Ant Design 組件",template:`import { Button, Input, List, Checkbox, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Space.Compact style={{ width: '100%', marginBottom: '20px' }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="輸入新的待辦事項..."
          onPressEnter={addTodo}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={addTodo}>
          新增
        </Button>
      </Space.Compact>

      <List
        bordered
        dataSource={todos}
        renderItem={todo => (
          <List.Item
            actions={[
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />}
                onClick={() => deleteTodo(todo.id)}
              />
            ]}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
}`,expectedOutput:"具有專業 UI 設計的 Todo List 應用",hints:["需要先安裝 antd 套件","記得導入 Ant Design 的 CSS 樣式","可以使用 Ant Design 的圖標組件","使用 Space 組件管理間距和佈局","善用 Ant Design 的主題定制功能"],additionalChallenges:["使用 Ant Design 的 DatePicker 為待辦事項添加截止日期","實作 Tag 組件為待辦事項添加分類標籤","使用 Modal 組件創建待辦事項編輯功能","應用 Ant Design 的主題定制功能更改配色方案","使用 Notification 組件顯示操作成功/失敗訊息"]},questions:[{id:"9-1",title:"UI 組件庫概述與選擇標準",content:"UI 組件庫提供了預先設計好的組件，可以快速建立專業的使用者界面。主流的 React UI 庫包括 Ant Design、Material-UI、Chakra UI 等。選擇 UI 組件庫時需要考慮：設計風格是否符合專案需求、組件的豐富程度、文檔完整性、社群活躍度、包大小、客製化彈性等。Ant Design 以企業級應用為主，Material-UI 遵循 Google Material Design，Chakra UI 則強調簡潔和易用性。",codeExample:`// 比較不同 UI 組件庫的基本使用

// Ant Design
import { Button, Input, List } from 'antd';
function AntDesignExample() {
  return (
    <div>
      <Input placeholder="Ant Design 輸入框" />
      <Button type="primary">主要按鈕</Button>
      <List
        dataSource={['項目1', '項目2']}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}

// Material-UI (MUI)
import { Button, TextField, List, ListItem } from '@mui/material';
function MUIExample() {
  return (
    <div>
      <TextField label="MUI 輸入框" variant="outlined" />
      <Button variant="contained" color="primary">主要按鈕</Button>
      <List>
        <ListItem>項目1</ListItem>
        <ListItem>項目2</ListItem>
      </List>
    </div>
  );
}

// Chakra UI
import { Button, Input, List, ListItem } from '@chakra-ui/react';
function ChakraExample() {
  return (
    <div>
      <Input placeholder="Chakra UI 輸入框" />
      <Button colorScheme="blue">主要按鈕</Button>
      <List>
        <ListItem>項目1</ListItem>
        <ListItem>項目2</ListItem>
      </List>
    </div>
  );
}

// 組件庫比較表
const libraryComparison = {
  'Ant Design': {
    pros: ['企業級設計', '組件豐富', '中文文檔完整'],
    cons: ['包較大', '客製化相對困難'],
    useCase: '企業級應用、後台管理系統'
  },
  'Material-UI': {
    pros: ['Google 設計規範', '高度客製化', '活躍社群'],
    cons: ['學習曲線較陡', '初始配置複雜'],
    useCase: '遵循 Material Design 的應用'
  },
  'Chakra UI': {
    pros: ['簡潔易用', '優秀的 TypeScript 支援', '高效能'],
    cons: ['組件相對較少', '企業級組件不足'],
    useCase: '現代 Web 應用、個人專案'
  }
};`,quiz:{question:"選擇 UI 組件庫時，下列哪個不是主要考量因素？",options:["設計風格是否符合專案需求","組件的豐富程度","開發者的個人喜好","文檔完整性"],answer:"開發者的個人喜好",explanation:"雖然個人喜好很重要，但選擇 UI 組件庫應該以專案需求、技術適合度、維護性等客觀因素為主。"},media:{image:"/src/assets/images/ui-library-comparison.png",audio:"/src/assets/audio/ui-libraries.mp3"}},{id:"9-2",title:"Ant Design 安裝與配置",content:"Ant Design 是一個企業級 UI 設計語言和 React 組件庫，提供了豐富的組件和完整的設計規範。安裝 Ant Design 後需要引入樣式文件，可以選擇完整引入或按需引入。按需引入可以減少最終打包的文件大小，提高應用性能。Ant Design 還支援主題定制，可以通過修改 Less 變數或使用 ConfigProvider 來定制組件的外觀。",codeExample:`// 安裝 Ant Design
// npm install antd

// 完整引入
import { Button, Input, List } from 'antd';
import 'antd/dist/antd.css';

// 按需引入配置 (使用 babel-plugin-import)
// .babelrc 或 babel.config.js
{
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
    }]
  ]
}

// 主題定制
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          fontSize: 14,
          borderRadius: 6,
        },
      }}
    >
      <div className="App">
        <Button type="primary">主要按鈕</Button>
        <Input placeholder="請輸入內容" />
      </div>
    </ConfigProvider>
  );
}

// 使用 Ant Design 圖標
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined
} from '@ant-design/icons';

function IconExample() {
  return (
    <div>
      <Button icon={<PlusOutlined />} type="primary">新增</Button>
      <Button icon={<EditOutlined />}>編輯</Button>
      <Button icon={<DeleteOutlined />} danger>刪除</Button>
      <Button icon={<CheckOutlined />} type="dashed">完成</Button>
    </div>
  );
}`,quiz:{question:"Ant Design 中的 ConfigProvider 主要用於什麼？",options:["全域配置和主題定制","組件懶加載","狀態管理","API 請求"],answer:"全域配置和主題定制",explanation:"ConfigProvider 用於為整個應用提供全域配置，包括主題、語言、組件預設屬性等。"},media:{image:"/src/assets/images/antd-config.png",audio:"/src/assets/audio/antd-setup.mp3"}},{id:"9-3",title:"Ant Design 組件實際應用",content:"Ant Design 提供了豐富的組件，包括基礎組件（Button、Input）、佈局組件（Layout、Grid）、導航組件（Menu、Breadcrumb）、數據展示組件（Table、List、Card）、回饋組件（Message、Notification）等。在實際應用中，需要根據業務需求選擇合適的組件，並注意組件間的配合使用。良好的組件使用包括：遵循設計規範、保持界面一致性、合理使用組件屬性、適當的間距和佈局。",codeExample:`import React, { useState } from 'react';
import {
  Button,
  Input,
  List,
  Checkbox,
  Space,
  Card,
  Typography,
  Divider,
  Tag,
  Modal,
  Form,
  message
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

function AdvancedTodoApp() {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [form] = Form.useForm();

  const addTodo = (values) => {
    const newTodo = {
      id: Date.now(),
      text: values.text,
      completed: false,
      priority: values.priority || 'medium',
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [...prev, newTodo]);
    message.success('待辦事項添加成功！');
    form.resetFields();
    setIsModalVisible(false);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    message.success('待辦事項刪除成功！');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title level={2}>我的待辦事項</Title>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>
              已完成 {completedCount} / {totalCount} 項任務
            </Text>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              新增待辦事項
            </Button>
          </div>
          
          <Divider />
          
          <List
            dataSource={todos}
            renderItem={todo => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditingTodo(todo);
                      form.setFieldsValue(todo);
                      setIsModalVisible(true);
                    }}
                  />,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteTodo(todo.id)}
                  />
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                  }
                  title={
                    <span style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#999' : '#000'
                    }}>
                      {todo.text}
                    </span>
                  }
                  description={
                    <Space>
                      <Tag color={getPriorityColor(todo.priority)}>
                        {todo.priority}
                      </Tag>
                      <Text type="secondary">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Space>
      </Card>

      <Modal
        title={editingTodo ? '編輯待辦事項' : '新增待辦事項'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTodo(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={addTodo} layout="vertical">
          <Form.Item
            name="text"
            label="待辦事項"
            rules={[{ required: true, message: '請輸入待辦事項！' }]}
          >
            <Input placeholder="請輸入待辦事項內容" />
          </Form.Item>
          <Form.Item name="priority" label="優先級" initialValue="medium">
            <Select>
              <Select.Option value="high">高</Select.Option>
              <Select.Option value="medium">中</Select.Option>
              <Select.Option value="low">低</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingTodo ? '更新' : '新增'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}`,quiz:{question:"Ant Design 的 Message 組件主要用於什麼？",options:["顯示全域提示訊息","處理表單驗證","管理組件狀態","路由導航"],answer:"顯示全域提示訊息",explanation:"Message 組件用於顯示全域的回饋訊息，如成功、警告、錯誤等提示。"},media:{image:"/src/assets/images/antd-components.png",audio:"/src/assets/audio/antd-usage.mp3"}},{id:"9-4",title:"API 封裝與 HTTP 請求管理",content:"API 封裝是前端開發中的重要實踐，它可以統一管理 HTTP 請求、處理錯誤、添加攔截器等。axios 是最受歡迎的 HTTP 請求庫，提供了豐富的功能和靈活的配置選項。良好的 API 封裝包括：統一的請求/響應格式、錯誤處理、請求攔截器、響應攔截器、請求重試機制等。這樣可以提高代碼的可維護性和開發效率。",codeExample:`import axios from 'axios';

// 創建 axios 實例
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器
api.interceptors.request.use(
  (config) => {
    // 在發送請求之前做些什麼
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    
    // 顯示載入狀態
    console.log('開始請求:', config.url);
    return config;
  },
  (error) => {
    // 對請求錯誤做些什麼
    return Promise.reject(error);
  }
);

// 響應攔截器
api.interceptors.response.use(
  (response) => {
    // 對響應數據做點什麼
    console.log('請求成功:', response.config.url);
    return response.data;
  },
  (error) => {
    // 對響應錯誤做點什麼
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          // 未授權，跳轉到登入頁面
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('權限不足');
          break;
        case 404:
          console.error('資源不存在');
          break;
        case 500:
          console.error('伺服器錯誤');
          break;
        default:
          console.error('請求失敗:', data.message);
      }
    } else if (error.request) {
      console.error('網路錯誤');
    } else {
      console.error('請求配置錯誤');
    }
    return Promise.reject(error);
  }
);

// API 服務函式
const todoService = {
  // 獲取待辦事項列表
  getTodos: () => api.get('/todos'),
  
  // 創建待辦事項
  createTodo: (todo) => api.post('/todos', todo),
  
  // 更新待辦事項
  updateTodo: (id, todo) => api.put(\`/todos/\${id}\`, todo),
  
  // 刪除待辦事項
  deleteTodo: (id) => api.delete(\`/todos/\${id}\`),
  
  // 切換待辦事項狀態
  toggleTodo: (id) => api.patch(\`/todos/\${id}/toggle\`),
};

// 在組件中使用 API 服務
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // 載入待辦事項
  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('載入失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  // 新增待辦事項
  const addTodo = async (text) => {
    try {
      const newTodo = await todoService.createTodo({ text });
      setTodos(prev => [...prev, newTodo]);
    } catch (error) {
      console.error('新增失敗:', error);
    }
  };

  // 切換待辦事項狀態
  const toggleTodo = async (id) => {
    try {
      await todoService.toggleTodo(id);
      setTodos(prev => prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (error) {
      console.error('更新失敗:', error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      {loading ? (
        <div>載入中...</div>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onAdd={addTodo} />
      )}
    </div>
  );
}

export default api;
export { todoService };`,quiz:{question:"axios 攔截器的主要作用是什麼？",options:["在請求/響應前後執行通用邏輯","提高請求速度","減少代碼體積","簡化 API 調用"],answer:"在請求/響應前後執行通用邏輯",explanation:"攔截器允許在請求發送前和響應返回後執行通用邏輯，如添加認證標頭、錯誤處理等。"},media:{image:"/src/assets/images/axios-interceptors.png",audio:"/src/assets/audio/api-encapsulation.mp3"}}]},{id:10,weekNumber:4,dayNumber:1,title:"第四週 Day 1-3: 實戰專案開發",description:"綜合運用所學知識開發完整的 React 應用",estimatedTime:180,difficulty:"advanced",tags:["實戰","專案開發","綜合應用"],learningObjectives:["能夠獨立規劃和設計一個完整的 React 應用","掌握專案架構設計和目錄結構組織","綜合運用前三週所學的所有技術","學會創建可重用的自定義 Hook","具備獨立開發 React 應用的能力"],dailyTasks:[{id:"10-1",title:"專案規劃與設計",description:"規劃個人專案的功能和架構設計",estimatedTime:60,completed:!1,checkpoints:["選擇專案主題和核心功能","繪製應用的頁面結構和流程圖","設計組件層次結構和狀態管理策略","制定開發計劃和時程安排"]},{id:"10-2",title:"建立專案基礎架構",description:"搭建專案目錄結構和基本組件",estimatedTime:60,completed:!1,checkpoints:["建立清晰的資料夾結構","配置路由系統和基本頁面","設定 Context API 和狀態管理","創建通用組件和工具函式"]},{id:"10-3",title:"實作核心功能",description:"開發專案的主要功能模組",estimatedTime:90,completed:!1,checkpoints:["實作主要業務邏輯功能","整合 API 服務和資料處理","實現用戶互動和表單處理","添加錯誤處理和載入狀態"]},{id:"10-4",title:"創建自定義 Hook",description:"將可重複使用的邏輯提取到自定義 Hook 中",estimatedTime:30,completed:!1,checkpoints:["識別可重複使用的邏輯模式","設計 Hook 的 API 接口","實作自定義 Hook 並加入錯誤處理","在多個組件中測試 Hook 的可重用性"]}],practicalExercise:{title:"開發個人 React 專案",description:"綜合運用前三週所學知識，開發一個完整的 React 應用",template:`// 專案結構建議
/*
src/
├── components/          # 可重複使用的組件
│   ├── common/         # 通用組件
│   └── ui/             # UI 組件
├── hooks/              # 自定義 Hook
├── contexts/           # React Context
├── pages/              # 頁面組件
├── services/           # API 服務
├── utils/              # 工具函式
└── styles/             # 樣式檔案
*/

// 自定義 Hook 範例
function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo
  };
}`,expectedOutput:"功能完整的個人 React 專案",hints:["專案應該包含至少 5 個不同的頁面","使用 Context API 管理全域狀態","整合 UI 組件庫提升用戶體驗","添加載入狀態和錯誤處理機制","使用 React Router 實現多頁面導航"],additionalChallenges:["添加深色/淺色主題切換功能","實作本地儲存保存用戶偏好設定","添加搜索和篩選功能","實作拖拽排序功能","添加簡單的資料視覺化圖表"]},questions:[{id:"10-1",title:"React 專案架構設計",content:"在實戰專案中，我們需要綜合運用前三週所學的知識，包括組件設計、狀態管理、路由系統、API 整合等。專案應該具有清晰的架構和良好的用戶體驗。良好的專案架構包括：清晰的目錄結構、合理的組件分層、統一的狀態管理、高效的 API 封裝等。",codeExample:`// 完整的 React 項目結構
/*
src/
├── components/          # 可重複使用的組件
│   ├── common/         # 通用組件
│   └── ui/             # UI 組件
├── hooks/              # 自定義 Hook
├── contexts/           # React Context
├── pages/              # 頁面組件
├── services/           # API 服務
├── utils/              # 工具函式
└── styles/             # 樣式檔案
*/

// 自定義 Hook 範例
function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = useCallback(async (text) => {
    try {
      setLoading(true);
      const newTodo = { id: Date.now(), text, completed: false };
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo
  };
}`,quiz:{question:"自定義 Hook 的命名規範是什麼？",options:["必須以 'use' 開頭","必須以 'hook' 開頭","必須以 'custom' 開頭","沒有特殊規範"],answer:"必須以 'use' 開頭",explanation:"根據 React 的規則，自定義 Hook 必須以 'use' 開頭，這樣 React 才能正確地應用 Hook 的規則。"},media:{image:"/src/assets/images/react-project-structure.png",audio:"/src/assets/audio/project-architecture.mp3"}}]},{id:11,weekNumber:4,dayNumber:4,title:"第四週 Day 4: 代碼質量與性能優化",description:"學習配置開發工具和性能優化技巧",estimatedTime:120,difficulty:"advanced",tags:["代碼質量","性能優化","開發工具"],learningObjectives:["掌握 ESLint 和 Prettier 的配置和使用","理解 React 性能優化的核心概念","學會使用 React.memo、useMemo、useCallback","能夠分析和優化應用性能","建立代碼品質保證流程"],dailyTasks:[{id:"11-1",title:"配置 ESLint 和 Prettier",description:"設定代碼檢查和格式化工具",estimatedTime:30,completed:!1,checkpoints:["安裝和配置 ESLint 規則","設定 Prettier 格式化配置","整合 ESLint 和 Prettier 到 VS Code","配置 package.json 腳本自動化"]},{id:"11-2",title:"學習性能優化技巧",description:"掌握 React.memo、useMemo、useCallback 的使用",estimatedTime:40,completed:!1,checkpoints:["理解 React 重新渲染機制","學習使用 React.memo 避免不必要渲染","掌握 useMemo 記憶化計算結果","使用 useCallback 記憶化函式"]},{id:"11-3",title:"優化專案性能",description:"對實戰專案進行性能優化",estimatedTime:30,completed:!1,checkpoints:["使用 React DevTools 分析性能","識別性能瓶頸和優化點","應用優化技巧到實際專案","測試優化效果和性能提升"]},{id:"11-4",title:"設定 Git Hooks",description:"配置 pre-commit hook 自動檢查代碼",estimatedTime:20,completed:!1,checkpoints:["安裝 husky 和 lint-staged","配置 pre-commit hook 自動檢查","設定 commit message 格式規範","測試 Git hooks 的正常運作"]}],practicalExercise:{title:"優化專案代碼質量和性能",description:"使用 React.memo、useMemo 和 useCallback 優化應用性能",template:`import { memo, useMemo, useCallback } from 'react';

// 使用 React.memo 優化子組件
const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>刪除</button>
    </li>
  );
});

// 使用 useMemo 和 useCallback 優化父組件
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // 使用 useMemo 記憶化計算結果
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  // 使用 useCallback 記憶化函式
  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}`,expectedOutput:"性能優化的 React 應用",hints:["React.memo 用於避免不必要的重新渲染","useMemo 用於記憶化計算結果","useCallback 用於記憶化函式","使用 React DevTools 分析性能","適當使用優化工具，避免過度優化"],additionalChallenges:["配置 TypeScript 提升代碼類型安全","使用 React DevTools Profiler 分析性能","實作虛擬化長列表優化","設定 GitHub Actions CI/CD 流程","建立完整的代碼審查流程"]},questions:[{id:"11-1",title:"React 性能優化核心概念",content:"React 性能優化的核心是避免不必要的重新渲染。React.memo 可以防止函式組件的不必要重新渲染，useMemo 和 useCallback 可以記憶化計算結果和函式。代碼品質工具如 ESLint 和 Prettier 可以幫助維護一致的代碼風格和避免常見錯誤。",codeExample:`import { memo, useMemo, useCallback } from 'react';

// 使用 React.memo 優化子組件
const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log('TodoItem rendered:', todo.id);
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>刪除</button>
    </li>
  );
});

// 使用 useMemo 和 useCallback 優化父組件
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // 使用 useMemo 記憶化計算結果
  const filteredTodos = useMemo(() => {
    console.log('Computing filtered todos');
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  // 使用 useCallback 記憶化函式
  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}`,quiz:{question:"React.memo 的主要作用是什麼？",options:["防止不必要的重新渲染","加速計算","管理記憶體","處理錯誤"],answer:"防止不必要的重新渲染",explanation:"React.memo 會比較組件的 props，只有在 props 發生變化時才重新渲染組件，從而避免不必要的重新渲染。"},media:{image:"/src/assets/images/react-performance.png",audio:"/src/assets/audio/performance-optimization.mp3"}}]},{id:12,weekNumber:4,dayNumber:5,title:"第四週 Day 5: 部署與項目總結",description:"學習將 React 應用部署到生產環境並總結學習成果，完成実習生培訓的最後階段",estimatedTime:120,difficulty:"advanced",tags:["部署","項目總結","最佳實踐","CI/CD"],learningObjectives:["掌握 React 應用的部署流程","理解生產環境和開發環境的差別","學會使用現代部署平台","能夠總結學習成果和技能進步","規劃後續的學習方向和發展路徑"],dailyTasks:[{id:"12-1",title:"配置環境變數",description:"設定生產環境和開發環境的不同配置，學習環境管理",estimatedTime:20,completed:!1,checkpoints:["理解環境變數的作用和管理","建立 .env 檔案和環境配置","學習如何在不同環境中使用不同配置","理解安全性和機密資料管理"]},{id:"12-2",title:"打包和優化專案",description:"使用 build 指令打包專案並優化檔案大小，學習性能優化技巧",estimatedTime:30,completed:!1,checkpoints:["學習使用 npm run build 打包專案","理解打包結果和檔案結構","學習分析打包大小和優化策略","實作代碼分割和懶加載優化"]},{id:"12-3",title:"部署到 Vercel",description:"將專案部署到 Vercel 平台，學習現代部署流程",estimatedTime:30,completed:!1,checkpoints:["學習使用 Vercel 平台部署應用","配置自動部署和 Git 整合","設定自定義域名和 HTTPS","學習部署日誌和問題排查"]},{id:"12-4",title:"撰寫學習總結",description:"回顧四週學習過程並撰寫總結報告，規劃後續發展",estimatedTime:40,completed:!1,checkpoints:["總結四週學習的技能和成果","列出完成的專案和作品集","分析學習過程中的挑戰和解決方案","規劃後續的學習方向和技能提升"]}],practicalExercise:{title:"部署完整的 React 應用",description:"將完整的 React 專案部署到生產環境",template:`// package.json 部署腳本
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && vercel --prod"
  }
}

// 環境變數配置
// .env.production
VITE_APP_API_URL=https://api.production.com

// vercel.json 配置
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

// React 開發最佳實踐總結
// 1. 組件設計原則 - 單一職責、可重複使用
// 2. 狀態管理 - 適當使用 local state 和 global state
// 3. 性能優化 - 使用 memo、useMemo、useCallback
// 4. 代碼品質 - ESLint、Prettier、TypeScript
// 5. 測試 - 單元測試、集成測試
// 6. 部署 - 自動化部署、環境管理`,expectedOutput:"成功部署的線上 React 應用",hints:["部署前要先執行 npm run build","確保環境變數設定正確","測試線上版本的所有功能"],additionalChallenges:["設定 CI/CD 自動部署流程","配置多環境部署（開發、測試、生產）","實作錯誤監控和日誌分析","添加部署前的自動化測試","優化打包大小和載入速度","設定 CDN 和緩存策略"]},questions:[{id:"12-1",content:"React 應用程式需要打包成靜態檔案才能部署到生產環境。我們可以使用 Vercel、Netlify 等平台進行部署。部署前需要配置環境變數和優化打包設置。",codeExample:`// package.json 部署腳本
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && vercel --prod"
  }
}

// 環境變數配置
// .env.production
VITE_APP_API_URL=https://api.production.com

// vercel.json 配置
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

// React 開發最佳實踐總結
// 1. 組件設計原則 - 單一職責、可重複使用
// 2. 狀態管理 - 適當使用 local state 和 global state
// 3. 性能優化 - 使用 memo、useMemo、useCallback
// 4. 代碼品質 - ESLint、Prettier、TypeScript
// 5. 測試 - 單元測試、集成測試
// 6. 部署 - 自動化部署、環境管理`,quiz:{question:"部署 React 應用前需要執行什麼命令？",options:["npm run build","npm run start","npm run test","npm run dev"],answer:"npm run build"},media:{image:"/src/assets/images/list-rendering.png",audio:"/src/assets/audio/lists-and-keys.mp3"}}]}],Pe={courseInfo:ln,weeklyPlan:dn,modules:un},mn=[{id:1,title:"What is React?",description:"Learn the basic concepts and core features of React",questions:[{id:"1-1",content:"React is a JavaScript library developed by Facebook for building user interfaces (UI). It allows developers to build web applications in a component-based way, where each component can be reused, making code more modular and maintainable.",codeExample:`// A simple React component
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// Using the component
<Welcome />`,quiz:{question:"What is React primarily used for?",options:["Building user interfaces","Database management","Server management","Code compilation"],answer:"Building user interfaces"},media:{image:"/src/assets/images/react-logo.png",audio:"/src/assets/audio/intro-bgm.mp3"}},{id:"1-2",content:"React's core philosophy is component-based development. Each component is independent and reusable, making large applications more maintainable and scalable.",codeExample:`// Component with props
function UserProfile({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

<UserProfile name="John" age={25} />`,quiz:{question:"What is the main advantage of React components?",options:["Code reusability","Smaller file size","Faster network","Less memory usage"],answer:"Code reusability"},media:{image:"/src/assets/images/react-components.png",audio:"/src/assets/audio/components-intro.mp3"}}]},{id:2,title:"Introduction to JSX",description:"Master the basic usage of JSX syntax",questions:[{id:"2-1",content:"JSX is a syntax extension for JavaScript that allows us to write HTML-like syntax within JavaScript. It makes React component writing more intuitive.",codeExample:`// JSX syntax example
const element = <h1>Hello, World!</h1>;

// Using JavaScript expressions in JSX
const name = 'React';
const greeting = <h1>Hello, {name}!</h1>;`,quiz:{question:"What is JSX?",options:["JavaScript syntax extension","A new programming language","CSS framework","Database language"],answer:"JavaScript syntax extension"},media:{image:"/src/assets/images/jsx-example.png",audio:"/src/assets/audio/jsx-explanation.mp3"}}]},{id:3,title:"Components Basics",description:"Understand React components fundamentals",questions:[{id:"3-1",content:"Components are the core concept of React. They are like reusable code blocks that return JSX to describe what the UI should look like.",codeExample:`// Function component example
function Button() {
  return <button>Click me</button>;
}

// Using the component
function App() {
  return <Button />;
}`,quiz:{question:"What is the main purpose of React components?",options:["Building reusable UI elements","Handling network requests","Managing databases","Compiling CSS"],answer:"Building reusable UI elements"},media:{image:"/src/assets/images/components-diagram.png",audio:"/src/assets/audio/components-intro.mp3"}}]},{id:4,title:"Props",description:"Learn how to pass data between components",questions:[{id:"4-1",content:"Props (properties) are how components pass data to each other, similar to function parameters.",codeExample:`// Component receiving props
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}

// Passing props
<UserCard name="Alice" age={25} />`,quiz:{question:"What is the characteristic of props?",options:["Read-only, cannot be modified","Can be modified by child components","Can only pass strings","Only works in class components"],answer:"Read-only, cannot be modified"},media:{image:"/src/assets/images/props-flow.png",audio:"/src/assets/audio/props-explanation.mp3"}}]},{id:5,title:"State Management",description:"Master component internal state management",questions:[{id:"5-1",content:"State is component internal data. When state changes, React automatically re-renders the component. We use useState Hook in function components.",codeExample:`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`,quiz:{question:"What does useState Hook return?",options:["An array with state value and update function","Only the state value","Only the update function","An object"],answer:"An array with state value and update function"},media:{image:"/src/assets/images/state-diagram.png",audio:"/src/assets/audio/state-management.mp3"}}]},{id:6,title:"Event Handling",description:"Learn to handle user interaction events in React",questions:[{id:"6-1",content:"React event handling is similar to HTML, but uses SyntheticEvent, which is React's wrapper around native DOM events.",codeExample:`function Button() {
  const handleClick = (event) => {
    event.preventDefault();
    alert('Button clicked!');
  };

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}`,quiz:{question:"What is React's event object called?",options:["SyntheticEvent","NativeEvent","ReactEvent","DOMEvent"],answer:"SyntheticEvent"},media:{image:"/src/assets/images/event-handling.png",audio:"/src/assets/audio/events-explanation.mp3"}}]},{id:7,title:"Conditional Rendering",description:"Learn to dynamically display different content based on conditions",questions:[{id:"7-1",content:"Conditional rendering allows us to decide what content to render based on different conditions. Common methods include ternary operator and logical AND operator.",codeExample:`function Greeting({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
      {isLoggedIn && <button>Logout</button>}
    </div>
  );
}`,quiz:{question:"Which is NOT a common conditional rendering method in React?",options:["switch statement","ternary operator","logical AND operator","if statement"],answer:"switch statement"},media:{image:"/src/assets/images/conditional-rendering.png",audio:"/src/assets/audio/conditional-explanation.mp3"}}]},{id:8,title:"Lists and Keys",description:"Learn how to render lists and understand the importance of keys",questions:[{id:"8-1",content:"When rendering lists in React, we use the map() method to iterate through arrays. Each list item needs a unique key prop to help React optimize rendering performance.",codeExample:`function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`,quiz:{question:"Why do list items need key props?",options:["Help React optimize rendering performance","Make CSS styles work correctly","Prevent JavaScript errors","Support accessibility features"],answer:"Help React optimize rendering performance"},media:{image:"/src/assets/images/list-rendering.png",audio:"/src/assets/audio/lists-and-keys.mp3"}}]},{id:9,title:"useEffect Hook",description:"Learn to handle side effects and lifecycle",questions:[{id:"9-1",content:"useEffect is a Hook for handling side effects, such as data fetching, subscriptions, or manually changing the DOM. It can execute specific operations after component rendering.",codeExample:`import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Timer: {seconds} seconds</div>;
}`,quiz:{question:"When is the cleanup function in useEffect executed?",options:["When component unmounts or before next effect runs","Only when component mounts","Every state update","Only when errors occur"],answer:"When component unmounts or before next effect runs"},media:{image:"/src/assets/images/useeffect-lifecycle.png",audio:"/src/assets/audio/useeffect-explanation.mp3"}}]},{id:10,title:"Forms and Controlled Components",description:"Learn to handle forms and user input in React",questions:[{id:"10-1",content:"In React, controlled component values are controlled by React state. Every input change triggers a state update, allowing us to validate input in real-time or dynamically update the UI.",codeExample:`import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit:', name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}`,quiz:{question:"What is the characteristic of controlled components?",options:["Value controlled by React state","Value controlled by DOM","No event handling needed","Cannot validate input"],answer:"Value controlled by React state"},media:{image:"/src/assets/images/controlled-components.png",audio:"/src/assets/audio/forms-explanation.mp3"}}]}],pn={modules:mn};function je(){const{currentLanguage:t}=F(),[n,s]=g.useState([]),[o,a]=g.useState(!0),[r,d]=g.useState(null);g.useEffect(()=>{try{a(!0),d(null);const i=t==="en-US"?pn:Pe;if(i&&i.modules)s(i.modules);else throw new Error("Invalid module data structure")}catch(i){console.error("Failed to load modules:",i),d(i.message),s(Pe.modules||[])}finally{a(!1)}},[t]);const p=i=>{const m=parseInt(i);return n.find(h=>h.id===m)},l=g.useCallback(i=>{const m=p(i);if(!m||!m.questions||m.questions.length===0)return console.warn("getRandomQuestionFromModule: No questions found for module",i),null;const h=an(m.questions);return{...m,content:h.content,codeExample:h.codeExample,quiz:h.quiz,media:h.media,currentQuestion:h,totalQuestions:m.questions.length,questionIndex:m.questions.findIndex(k=>k.id===h.id)+1}},[n]),x=i=>p(i)?.questions||[],u=()=>n.length,b=i=>{const m=parseInt(i);return n.some(h=>h.id===m)};return{modules:n,isLoading:o,error:r,getModuleById:p,getRandomQuestionFromModule:l,getAllQuestionsFromModule:x,getTotalModules:u,moduleExists:b,getNextModuleId:i=>{const h=parseInt(i)+1;return b(h)?h:null},getPreviousModuleId:i=>{const h=parseInt(i)-1;return b(h)?h:null},getModuleProgress:i=>{const m=u(),h=parseInt(i);return{current:h,total:m,percentage:Math.round(h/m*100),isFirst:h===1,isLast:h===m}}}}function He({percent:t=0,color:n="#3498db",animated:s=!0,size:o="medium"}){const{isLanguage:a}=F(),[r,d]=g.useState(0),p=(b,R)=>a("en-US")?R:b;g.useEffect(()=>{if(s){const b=setTimeout(()=>{d(t)},100);return()=>clearTimeout(b)}else d(t)},[t,s]);const l=Math.max(0,Math.min(100,r)),u=(()=>l===0?{text:p("尚未開始","Not Started"),icon:"🎯",className:"not-started"}:l<25?{text:p("剛起步","Getting Started"),icon:"🌱",className:"beginner"}:l<50?{text:p("持續學習","Learning"),icon:"📚",className:"learning"}:l<75?{text:p("進步中","Progressing"),icon:"🚀",className:"progressing"}:l<100?{text:p("接近完成","Almost Done"),icon:"⭐",className:"almost-done"}:{text:p("全部完成","Completed"),icon:"🏆",className:"completed"})();return e.jsxs("div",{className:`progress-bar-container ${o}`,children:[e.jsxs("div",{className:"progress-bar-wrapper",children:[e.jsx("div",{className:"progress-bar-track",role:"progressbar","aria-valuenow":l,"aria-valuemin":"0","aria-valuemax":"100","aria-label":p(`學習進度 ${l}%`,`Learning progress ${l}%`),children:e.jsx("div",{className:`progress-bar-fill ${s?"animated":""}`,style:{width:`${l}%`,backgroundColor:n,transition:s?"width 1.5s cubic-bezier(0.4, 0, 0.2, 1)":"none"},children:e.jsx("div",{className:"progress-bar-shine"})})}),e.jsx("div",{className:"progress-text",children:e.jsxs("span",{className:"progress-percentage",children:[Math.round(l),"%"]})})]}),e.jsxs("div",{className:`progress-status ${u.className}`,children:[e.jsx("span",{className:"status-icon",children:u.icon}),e.jsx("span",{className:"status-text",children:u.text})]})]})}const gn={feedback:{title:{"zh-TW":"用戶回饋表單","en-US":"User Feedback Form"},description:{"zh-TW":"告訴我們您的使用體驗","en-US":"Tell us about your experience"},url:"https://docs.google.com/forms/d/e/YOUR_FEEDBACK_FORM_ID/viewform",height:"600px"},bug_report:{title:{"zh-TW":"錯誤回報表單","en-US":"Bug Report Form"},description:{"zh-TW":"回報您遇到的問題","en-US":"Report issues you encountered"},url:"https://docs.google.com/forms/d/e/YOUR_BUG_REPORT_FORM_ID/viewform",height:"700px"},feature_request:{title:{"zh-TW":"功能需求表單","en-US":"Feature Request Form"},description:{"zh-TW":"建議新功能或改進","en-US":"Suggest new features or improvements"},url:"https://docs.google.com/forms/d/e/YOUR_FEATURE_REQUEST_FORM_ID/viewform",height:"650px"},survey:{title:{"zh-TW":"學習需求調查","en-US":"Learning Needs Survey"},description:{"zh-TW":"幫助我們了解您的學習需求","en-US":"Help us understand your learning needs"},url:"https://docs.google.com/forms/d/e/YOUR_SURVEY_FORM_ID/viewform",height:"800px"}};function hn({isOpen:t,onClose:n,formType:s="feedback",prefilledData:o={},onSubmitSuccess:a}){const{currentLanguage:r}=F(),[d,p]=g.useState(!0),[l,x]=g.useState(""),u=gn[s],b=u?.title[r]||u?.title["zh-TW"],R=u?.description[r]||u?.description["zh-TW"];g.useEffect(()=>{if(u&&t){let i=u.url;const m=new URLSearchParams;switch(o.userAgent&&m.append("entry.123456789",o.userAgent),o.timestamp&&m.append("entry.987654321",o.timestamp),o.currentPage&&m.append("entry.456789123",o.currentPage),s){case"bug_report":o.errorMessage&&m.append("entry.111111111",o.errorMessage),o.reproductionSteps&&m.append("entry.222222222",o.reproductionSteps);break;case"feedback":o.currentTheme&&m.append("entry.333333333",o.currentTheme),o.completionProgress&&m.append("entry.444444444",o.completionProgress);break;case"feature_request":o.currentFeatures&&m.append("entry.555555555",o.currentFeatures);break;case"survey":o.learningGoals&&m.append("entry.666666666",o.learningGoals);break}m.append("embedded","true"),m.append("usp","pp_url"),m.toString()&&(i+=(i.includes("?")?"&":"?")+m.toString()),x(i)}},[u,s,o,t]);const E=()=>{p(!1)},S=()=>{p(!0),n()};return!t||!u?null:e.jsx("div",{className:"google-form-modal-overlay",onClick:S,children:e.jsxs("div",{className:"google-form-modal",onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"form-modal-header",children:[e.jsxs("div",{className:"form-modal-title",children:[e.jsx("h2",{children:b}),e.jsx("p",{className:"form-modal-description",children:R})]}),e.jsx("button",{className:"form-modal-close-btn",onClick:S,"aria-label":r==="en-US"?"Close":"關閉",children:"✕"})]}),e.jsxs("div",{className:"form-modal-content",children:[d&&e.jsxs("div",{className:"form-loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:r==="en-US"?"Loading form...":"載入表單中..."})]}),l&&e.jsx("iframe",{src:l,className:"google-form-iframe",style:{height:u.height},frameBorder:"0",marginHeight:"0",marginWidth:"0",onLoad:E,title:b,children:r==="en-US"?"Loading...":"載入中..."})]}),e.jsxs("div",{className:"form-modal-footer",children:[e.jsx("p",{className:"form-notice",children:r==="en-US"?"🔒 Your data is securely processed by Google Forms":"🔒 您的資料由 Google 表單安全處理"}),e.jsxs("p",{className:"form-help",children:[r==="en-US"?"Having trouble? You can also ":"遇到問題？您也可以 ",e.jsx("a",{href:u.url,target:"_blank",rel:"noopener noreferrer",className:"external-form-link",children:r==="en-US"?"open in new tab":"在新分頁開啟"})]})]})]})})}const xe={}.VITE_API_BASE_URL||"http://localhost:3001/api",D={}.VITE_N8N_BASE_URL||"https://your-n8n-instance.com/webhook",Ie={}.VITE_ENVIRONMENT==="development",Le={}.VITE_USE_MOCK_API==="true"||Ie,ne={modules:{getAll:`${xe}/modules`,getById:t=>`${xe}/modules/${t}`,n8nGetModules:`${D}/get-learning-themes`,n8nSwitchTheme:`${D}/switch-learning-theme`},challenge:{getChallenge:Le?`${xe}/challenge`:`${D}/get-challenge`,submitAnswer:Le?`${xe}/challenge/submit`:`${D}/submit-challenge-answer`,getChallengeLocal:`${xe}/challenge`,n8nGetChallenge:`${D}/generate-ai-questions`,n8nGenerateQuestion:`${D}/generate-ai-questions`,n8nBatchGenerate:`${D}/batch-generate-questions`},themes:{getAvailable:`${D}/get-available-themes`,switchTheme:`${D}/switch-theme`,getUserThemes:`${D}/get-user-themes`,saveThemePreference:`${D}/save-theme-preference`},progress:{updateProgress:`${D}/track-learning-progress`,getProgress:`${D}/get-progress`,notifyCompletion:`${D}/notify-completion`,syncUserData:`${D}/sync-user-data`},analytics:{trackEvent:`${D}/track-event`,getAnalytics:`${D}/get-analytics`,generateReport:`${D}/generate-learning-report`}},De={timeout:1e4,retries:3,headers:{"Content-Type":"application/json"}},$={useLocalData:{}.VITE_USE_LOCAL_DATA==="true"||Ie&&{}.VITE_USE_LOCAL_DATA!=="false",enableApiLogs:{}.VITE_DEBUG_MODE==="true"||Ie,simulateDelay:parseInt({}.VITE_MOCK_DELAY)||0,errorRate:parseFloat({}.VITE_MOCK_ERROR_RATE)||0,environment:{}.VITE_ENVIRONMENT||"development",useMockApi:{}.VITE_USE_MOCK_API==="true"};async function te(t,n={}){const s={...De,...n,headers:{...De.headers,...n.headers}};$.enableApiLogs&&console.log(`🌐 API Call: ${t}`,{options:s}),$.simulateDelay>0&&await new Promise(a=>setTimeout(a,$.simulateDelay));let o;for(let a=1;a<=s.retries;a++)try{const r=new AbortController,d=setTimeout(()=>r.abort(),s.timeout),p=await fetch(t,{...s,signal:r.signal});if(clearTimeout(d),!p.ok)throw new Error(`HTTP ${p.status}: ${p.statusText}`);const l=await p.json();return $.enableApiLogs&&console.log(`✅ API Success: ${t}`,l),l}catch(r){o=r,$.enableApiLogs&&console.warn(`⚠️ API Attempt ${a} failed: ${t}`,r.message),a<s.retries&&await new Promise(d=>setTimeout(d,1e3*a))}throw console.error(`❌ API Failed after ${s.retries} attempts: ${t}`,o),o}const Q={TOPIC_CATEGORY:"topic_category",DIFFICULTY_LEVEL:"difficulty_level",LANGUAGE_CODE:"language_code",QUESTION_TYPE:"question_type",CONTENT_SOURCE:"content_source",USER_PROGRESS:"user_progress",TIMESTAMP:"timestamp",SOURCE:"source",ACTION:"action"},we={GET_THEMES:"get_themes",GENERATE_QUESTIONS:"generate_questions",TRACK_PROGRESS:"track_progress",UPDATE_USER_DATA:"update_user_data"},K={MULTIPLE_CHOICE:"multiple-choice",CODE_BLOCKS:"code-blocks",TRUE_FALSE:"true-false",FILL_BLANK:"fill-blank"},N={BEGINNER:"beginner",INTERMEDIATE:"intermediate",ADVANCED:"advanced"};function Ae(t,n={}){return{[Q.TIMESTAMP]:new Date().toISOString(),[Q.SOURCE]:"react-learning-game",[Q.ACTION]:t,data:{[Q.LANGUAGE_CODE]:"zh-TW",...n}}}function Ue(t){if(!t||typeof t!="object")throw new Error("Invalid response format");if(!t.success)throw new Error(t.error||"n8n request failed");return t.data||{}}const Oe={async generateQuestion(t={}){const n=Ae(we.GENERATE_QUESTIONS,{[Q.TOPIC_CATEGORY]:t.topic_category||"react-basics",[Q.DIFFICULTY_LEVEL]:t.difficulty_level||N.INTERMEDIATE,[Q.QUESTION_TYPE]:t.question_type||K.CODE_BLOCKS,[Q.LANGUAGE_CODE]:t.language_code||"zh-TW",[Q.USER_PROGRESS]:t.user_context||{},generation_mode:"single",include_hints:!0,include_explanation:!0});try{const s=await te(ne.challenge.n8nGetChallenge,{method:"POST",body:JSON.stringify(n)}),o=Ue(s);return this.normalizeGeneratedQuestion(o.question||o)}catch(s){return console.warn("AI 題目生成失敗，使用本地降級題目:",s.message),this.getFallbackQuestion(t)}},async generateMultipleQuestions(t={},n=5){const s=Ae(we.GENERATE_QUESTIONS,{...t,generation_mode:"batch",question_count:n});try{const o=await te(ne.challenge.n8nGetChallenge,{method:"POST",body:JSON.stringify(s)});return(Ue(o).questions||[]).map(r=>this.normalizeGeneratedQuestion(r))}catch(o){return console.warn("批量 AI 題目生成失敗:",o.message),[]}},normalizeGeneratedQuestion(t){return{id:t.id||`ai-${Date.now()}`,prompt:t.prompt||t.description||"",codeBlocks:this.normalizeCodeBlocks(t.code_blocks||t.codeBlocks||[]),answerOrder:t.answer_order||t.answerOrder||[],hints:t.hints||[],explanation:t.explanation||"",difficulty:t.difficulty||N.INTERMEDIATE,estimatedTime:t.estimated_time||5,tags:t.tags||[],source:"ai-generated"}},normalizeCodeBlocks(t){return t.map((n,s)=>({id:n.id||String(s+1),text:n.text||n.content||"",isDistractor:n.is_distractor||n.isDistractor||!1}))},getFallbackQuestion(t){const n=t.language_code==="en-US";return{id:"fallback-question",prompt:n?"Create a simple React component (fallback question)":"建立一個簡單的 React 組件（降級題目）",codeBlocks:[{id:"1",text:"function MyComponent() {"},{id:"2",text:"  return <div>Hello World</div>;"},{id:"3",text:"}"}],answerOrder:["1","2","3"],hints:[n?"Start with function declaration":"從函數宣告開始"],source:"fallback"}}},Re={async trackProgress(t){const n=Ae(we.TRACK_PROGRESS,{[Q.USER_PROGRESS]:t,[Q.TIMESTAMP]:new Date().toISOString()});try{await te(ne.progress.updateProgress,{method:"POST",body:JSON.stringify(n)}),$.enableApiLogs&&console.log("✅ 進度追蹤成功")}catch(s){console.warn("進度追蹤失敗，但不影響用戶體驗:",s.message)}}};const fn={feedback:{icon:"💬",label:{"zh-TW":"意見回饋","en-US":"Feedback"},color:"#28a745",description:{"zh-TW":"分享使用體驗","en-US":"Share your experience"}},bug_report:{icon:"🐛",label:{"zh-TW":"回報問題","en-US":"Report Bug"},color:"#dc3545",description:{"zh-TW":"回報遇到的問題","en-US":"Report issues"}},feature_request:{icon:"💡",label:{"zh-TW":"建議功能","en-US":"Suggest Feature"},color:"#ffc107",description:{"zh-TW":"建議新功能","en-US":"Suggest new features"}},survey:{icon:"📊",label:{"zh-TW":"需求調查","en-US":"Survey"},color:"#17a2b8",description:{"zh-TW":"參與學習調查","en-US":"Participate in survey"}}};function Be({formType:t="feedback",variant:n="floating",position:s="bottom-right",customData:o={},onFormSubmit:a}){const{currentLanguage:r}=F(),[d,p]=g.useState(!1),[l,x]=g.useState(!1),u=fn[t],b=u?.label[r]||u?.label["zh-TW"],R=u?.description[r]||u?.description["zh-TW"],E=()=>{const k=JSON.parse(localStorage.getItem("reactGameProgress")||"{}"),w=JSON.parse(localStorage.getItem("themePreferences")||"{}");return{currentPage:window.location.pathname,userAgent:navigator.userAgent,timestamp:new Date().toISOString(),language:r,currentTheme:w.selectedTheme?.name||"default",completionProgress:`${k.completed?.length||0}/${k.unlocked?.length||0}`,...o}},S=async()=>{const k=E();try{await Re.trackProgress({action:"form_opened",form_type:t,page_context:k,timestamp:new Date().toISOString()})}catch(w){console.warn("表單開啟追蹤失敗:",w)}p(!0)},i=async k=>{console.log("📝 表單提交成功:",k);try{await Re.trackProgress({action:"form_submitted",form_type:t,submission_data:k,timestamp:new Date().toISOString()})}catch(w){console.warn("表單提交追蹤失敗:",w)}a&&a(k),p(!1)},m=()=>{p(!1)},h=()=>{const k={onClick:S,onMouseEnter:()=>x(!0),onMouseLeave:()=>x(!1),style:{"--button-color":u.color},title:R};switch(n){case"floating":return e.jsxs("button",{className:`form-button floating ${s} ${t}`,...k,children:[e.jsx("span",{className:"button-icon",children:u.icon}),l&&e.jsx("span",{className:"button-label",children:b})]});case"inline":return e.jsxs("button",{className:`form-button inline ${t}`,...k,children:[e.jsx("span",{className:"button-icon",children:u.icon}),e.jsxs("span",{className:"button-text",children:[e.jsx("span",{className:"button-label",children:b}),e.jsx("span",{className:"button-description",children:R})]})]});case"compact":return e.jsxs("button",{className:`form-button compact ${t}`,...k,children:[e.jsx("span",{className:"button-icon",children:u.icon}),e.jsx("span",{className:"button-label",children:b})]});default:return null}};return e.jsxs(e.Fragment,{children:[h(),e.jsx(hn,{isOpen:d,onClose:m,formType:t,prefilledData:E(),onSubmitSuccess:i})]})}function xn(){const{isLanguage:t}=F(),{modules:n,isLoading:s}=je(),[o,a]=g.useState(new Set),[r,d]=g.useState(new Set),p=g.useMemo(()=>n&&n.length>0?(console.log("📂 HomePage 使用實習學習計畫模組:",n.length,"個"),n):(console.log("⚠️ HomePage 沒有可用的模組資料，等待載入中..."),[]),[n]),l=p.length===0,x=s,u=p.length;g.useEffect(()=>{const i=Array.from({length:u},(h,k)=>k+1);a(new Set(i));const m=localStorage.getItem("reactGameProgress");if(m)try{const h=JSON.parse(m);d(new Set(h.completed||[]));const k={...h,unlocked:i};localStorage.setItem("reactGameProgress",JSON.stringify(k))}catch(h){console.error("讀取進度失敗:",h),d(new Set([]))}else{const h={unlocked:i,completed:[]};localStorage.setItem("reactGameProgress",JSON.stringify(h))}},[u]);const b=u>0?Math.round(r.size/u*100):0,R=i=>o.has(i),E=i=>r.has(i),S=(i,m)=>t("en-US")?m:i;return x?e.jsxs("div",{className:"homepage loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:S("載入中...","Loading...")})]}):e.jsxs("div",{className:"homepage",children:[e.jsxs("section",{className:"progress-section",children:[e.jsx("div",{className:"section-header",children:e.jsx("h2",{children:S("React 實習生學習計畫","React Intern Learning Plan")})}),e.jsxs("div",{className:"progress-overview",children:[e.jsx("p",{children:S(`已完成 ${r.size} / ${u} 個關卡`,`Completed ${r.size} / ${u} lessons`)}),e.jsx(He,{percent:b,color:"#27ae60"}),e.jsxs("div",{className:"progress-actions",children:[e.jsx(U,{to:"/result",className:"btn btn-secondary",children:S("查看詳細進度","View Detailed Progress")}),e.jsxs(U,{to:"/challenge",className:"btn btn-primary challenge-mode-btn",children:["🎯 ",S("挑戰模式","Challenge Mode")]})]})]})]}),e.jsxs("section",{className:"modules-section",children:[e.jsx("h2",{children:S("關卡選擇","Select Lesson")}),l&&!x?e.jsx("div",{className:"empty-modules",children:e.jsx("p",{children:S("載入實習學習計畫中...","Loading intern learning plan...")})}):e.jsx("div",{className:"modules-grid",children:p.map(i=>{if(!i||!i.id)return console.warn("Invalid module data:",i),null;const m=R(i.id),h=E(i.id);return e.jsxs("div",{className:`module-card ${h?"completed":m?"unlocked":"locked"}`,children:[e.jsxs("div",{className:"module-icon",children:[i.media?.image?e.jsx("img",{src:i.media.image,alt:S(`關卡 ${i.id} 圖示`,`Lesson ${i.id} icon`),onError:k=>{k.target.style.display="none",k.target.nextSibling.style.display="flex"}}):null,e.jsx("div",{className:"default-module-icon",style:{display:i.media?.image?"none":"flex",alignItems:"center",justifyContent:"center",width:"64px",height:"64px",fontSize:"24px",backgroundColor:"#f0f0f0",borderRadius:"8px"},children:"📘"})]}),e.jsxs("div",{className:"module-info",children:[e.jsx("h3",{children:S(`關卡 ${i.id}`,`Lesson ${i.id}`)}),e.jsx("h4",{children:i.title||S("未命名關卡","Unnamed Lesson")}),e.jsx("p",{className:"module-description",children:i.description?i.description.substring(0,100)+"...":i.questions&&i.questions[0]&&i.questions[0].content?i.questions[0].content.substring(0,100)+"...":S("暫無描述","No description available")}),e.jsxs("div",{className:"module-status",children:[h&&e.jsx("span",{className:"status-badge completed",children:S("已完成 ✓","Completed ✓")}),m&&!h&&e.jsx("span",{className:"status-badge unlocked",children:S("可學習","Available")}),!m&&e.jsx("span",{className:"status-badge locked",children:S("未解鎖 🔒","Locked 🔒")})]})]}),e.jsx("div",{className:"module-actions",children:e.jsx(U,{to:`/module/${i.id}`,className:"btn btn-primary",children:S(h?"複習":"開始學習",h?"Review":"Start Learning")})})]},i.id)})})]}),e.jsx(Be,{formType:"feedback",variant:"floating",position:"bottom-right",customData:{page:"homepage",totalModules:u,completedCount:r.size}})]})}function vn(){const{id:t}=Qe(),n=Je(),{isLanguage:s}=F(),{modules:o,getModuleById:a,getTotalModules:r,isLoading:d}=je(),[p,l]=g.useState(""),[x,u]=g.useState(!1),[b,R]=g.useState(!1),[E,S]=g.useState(!1),[i,m]=g.useState(!1);g.useState(0);const[h,k]=g.useState(new Set),[w,_]=g.useState(0),Z=g.useRef(null),q=r(),I=(v,A)=>s("en-US")?A:v,H=g.useMemo(()=>{if(d||!o.length)return null;const v=parseInt(t),A=a(v);if(!A||!A.questions||A.questions.length===0)return null;const c=A.questions[w]||A.questions[0],O=v*1e4+w*100,L=c.quiz?.options?sn([...c.quiz.options],O):[];return{...A,content:c.content,codeExample:c.codeExample,quiz:{...c.quiz,shuffledOptions:L},media:c.media,currentQuestion:c,totalQuestions:A.questions.length,questionIndex:w+1}},[t,a,o.length,d,w]),oe=g.useCallback(()=>{l(""),u(!1),R(!1),m(!1),_(0),k(new Set)},[]),J=g.useCallback(v=>{const A=localStorage.getItem("reactGameProgress");if(A)try{const O=JSON.parse(A).moduleProgress?.[v];if(O){const L=a(v);if(L&&L.questions){const z=L.questions.length,ie=Object.keys(O.completedQuestions||{}).length===z;S(ie),k(new Set(Object.keys(O.completedQuestions||{})));return}}S(!1),k(new Set)}catch(c){console.error("讀取進度失敗:",c),S(!1),k(new Set)}else S(!1),k(new Set)},[a]);g.useEffect(()=>{!H&&!d&&o.length>0&&n("/")},[H,n,d,o.length]);const y=H;g.useEffect(()=>{t&&J(parseInt(t))},[t,J]),g.useEffect(()=>{const v=parseInt(t);Z.current!==null&&Z.current!==v&&oe(),Z.current=v},[t,oe]),g.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[t]);const le=v=>{x||l(v)},V=()=>{if(!p){alert(I("請選擇一個答案","Please select an answer"));return}const v=p===H.quiz.answer;if(R(v),u(!0),v){const A=H.currentQuestion.id,c=new Set(h);c.add(A),k(c),de(A)}},de=(v,A)=>{const c=localStorage.getItem("reactGameProgress"),O=Array.from({length:q},(pe,ve)=>ve+1);let L={unlocked:O,completed:[],moduleProgress:{}};if(c)try{L=JSON.parse(c),L.unlocked=O,L.moduleProgress||(L.moduleProgress={})}catch(pe){console.error("讀取進度失敗:",pe)}const z=parseInt(t);L.moduleProgress[z]||(L.moduleProgress[z]={completedQuestions:{}}),L.moduleProgress[z].completedQuestions[v]=!0;const ae=H.totalQuestions;Object.keys(L.moduleProgress[z].completedQuestions).length===ae&&!L.completed.includes(z)&&(L.completed.push(z),S(!0)),localStorage.setItem("reactGameProgress",JSON.stringify(L))},ue=()=>{const v=document.getElementById("module-audio");v&&(i?(v.pause(),m(!1)):(v.play().catch(A=>{console.log("音訊播放失敗:",A)}),m(!0)))},G=()=>{l(""),u(!1),R(!1)},X=v=>{_(v),l(""),u(!1),R(!1)},se=()=>{w<H.totalQuestions-1&&X(w+1)},me=()=>{w>0&&X(w-1)};return d||!y?e.jsx("div",{className:"loading",children:I("載入中...","Loading...")}):e.jsxs("div",{className:"module-page",children:[e.jsxs("nav",{className:"module-nav",children:[e.jsxs(U,{to:"/",className:"btn btn-secondary",children:["← ",I("返回首頁","Back to Home")]}),e.jsx("div",{className:"module-progress",children:I(`關卡 ${y.id} / ${q}`,`Lesson ${y.id} / ${q}`)}),e.jsx(U,{to:"/result",className:"btn btn-secondary",children:I("查看進度","View Progress")})]}),e.jsxs("header",{className:"module-header",children:[e.jsxs("div",{className:"header-main",children:[e.jsx("h1",{children:y.title}),y.description&&e.jsx("p",{className:"module-description",children:y.description}),E&&e.jsx("span",{className:"completion-badge",children:I("已完成 ✓","Completed ✓")})]}),e.jsx("div",{className:"module-controls",children:y.totalQuestions>1&&e.jsxs("div",{className:"question-selector",children:[e.jsx("span",{className:"question-indicator",children:I(`題目 ${y.questionIndex} / ${y.totalQuestions}`,`Question ${y.questionIndex} / ${y.totalQuestions}`)}),e.jsx("div",{className:"question-dropdown",children:e.jsx("select",{value:w,onChange:v=>X(parseInt(v.target.value)),className:"question-select",children:Array.from({length:y.totalQuestions},(v,A)=>{const c=y.questions[A]?.id,O=h.has(c);return e.jsx("option",{value:A,children:I(`題目 ${A+1}${O?" ✓":""}`,`Question ${A+1}${O?" ✓":""}`)},A)})})}),e.jsxs("div",{className:"question-nav",children:[e.jsx("button",{className:"btn btn-secondary btn-small",onClick:me,disabled:w===0,title:I("上一題","Previous question"),children:"←"}),e.jsx("button",{className:"btn btn-secondary btn-small",onClick:se,disabled:w===y.totalQuestions-1,title:I("下一題","Next question"),children:"→"})]})]})})]}),e.jsxs("main",{className:"module-content",children:[e.jsxs("section",{className:"media-section",children:[e.jsx("div",{className:"module-image",children:e.jsx("img",{src:y.media?.image||"/src/assets/images/default-lesson.png",alt:I(`${y.title} 示意圖`,`${y.title} illustration`),onError:v=>{v.target.src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f0f0f0"/><text x="150" y="100" text-anchor="middle" dy=".3em" font-size="48">📚</text></svg>'}})}),e.jsxs("div",{className:"audio-controls",children:[e.jsx("button",{className:`btn audio-btn ${i?"playing":""}`,onClick:ue,children:i?I("⏸️ 暫停","⏸️ Pause"):I("▶️ 播放說明","▶️ Play Audio")}),e.jsxs("audio",{id:"module-audio",onEnded:()=>m(!1),children:[e.jsx("source",{src:y.media?.audio,type:"audio/mpeg"}),I("您的瀏覽器不支援音訊播放。","Your browser does not support audio playback.")]})]})]}),e.jsxs("section",{className:"content-section",children:[e.jsx("h2",{children:I("學習內容","Learning Content")}),e.jsx("div",{className:"content-text",children:y.content.split(`
`).map((v,A)=>e.jsx("p",{children:v},A))})]}),e.jsxs("section",{className:"code-section",children:[e.jsx("h2",{children:I("程式碼範例","Code Example")}),e.jsxs("div",{className:"code-container",children:[e.jsx("pre",{children:e.jsx("code",{children:y.codeExample})}),e.jsxs("button",{className:"btn btn-secondary copy-btn",onClick:()=>{navigator.clipboard.writeText(y.codeExample),alert(I("程式碼已複製到剪貼簿","Code copied to clipboard"))},children:["📋 ",I("複製程式碼","Copy Code")]})]})]}),e.jsxs("section",{className:"quiz-section",children:[e.jsx("h2",{children:I("小測驗","Quiz")}),e.jsxs("div",{className:"quiz-container",children:[e.jsx("h3",{children:y.quiz.question}),e.jsx("div",{className:"quiz-options",children:(y?.quiz?.shuffledOptions||[]).map((v,A)=>e.jsx("button",{className:`quiz-option ${p===v?"selected":""} ${x?v===y.quiz.answer?"correct":p===v?"incorrect":"":""}`,onClick:()=>le(v),disabled:x,children:v},`${v}-${A}`))}),x&&e.jsxs("div",{className:`quiz-result ${b?"correct":"incorrect"}`,children:[e.jsx("h4",{children:b?I("🎉 答對了！","🎉 Correct!"):I("❌ 答錯了","❌ Incorrect")}),e.jsx("p",{children:b?I(`題目完成！${E?"本關卡已全部完成！":""}`,`Question completed! ${E?"All questions in this lesson completed!":""}`):I(`正確答案是：${y.quiz.answer}`,`The correct answer is: ${y.quiz.answer}`)}),e.jsxs("div",{className:"quiz-actions",children:[!b&&e.jsx("button",{className:"btn btn-secondary",onClick:G,children:I("重新作答","Retry Quiz")}),b&&w<y.totalQuestions-1&&e.jsx("button",{className:"btn btn-primary",onClick:se,children:I("下一題 →","Next Question →")}),b&&E&&parseInt(t)<q&&e.jsx(U,{to:`/module/${parseInt(t)+1}`,className:"btn btn-primary",onClick:()=>{oe(),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},100)},children:I("下一關 →","Next Lesson →")}),b&&parseInt(t)===q&&e.jsx(U,{to:"/result",className:"btn btn-success",children:I("查看完成結果 🏆","View Results 🏆")})]})]}),!x&&e.jsx("div",{className:"quiz-submit",children:e.jsx("button",{className:"btn btn-primary",onClick:V,disabled:!p,children:I("提交答案","Submit Answer")})})]})]})]})]})}function bn(){const{isLanguage:t}=F(),{modules:n,getTotalModules:s}=je(),[o,a]=g.useState({unlocked:[],completed:[]}),[r,d]=g.useState([]),p=s(),l=(i,m)=>t("en-US")?m:i;g.useEffect(()=>{const i=localStorage.getItem("reactGameProgress");if(i)try{const m=JSON.parse(i);a({unlocked:m.unlocked||[1],completed:m.completed||[]}),x(m.completed||[])}catch(m){console.error("讀取進度失敗:",m),a({unlocked:[1],completed:[]})}else a({unlocked:[1],completed:[]})},[]);const x=i=>{const m=[],h=i.length;[{id:1,title:l("初學者","Beginner"),description:l("完成第一個關卡","Complete first lesson"),condition:h>=1,icon:"🎯"},{id:2,title:l("學習者","Learner"),description:l("完成 3 個關卡","Complete 3 lessons"),condition:h>=3,icon:"📚"},{id:3,title:l("進步者","Progressor"),description:l("完成 5 個關卡","Complete 5 lessons"),condition:h>=5,icon:"🚀"},{id:4,title:l("專精者","Expert"),description:l("完成 8 個關卡","Complete 8 lessons"),condition:h>=8,icon:"⭐"},{id:5,title:l("React 大師","React Master"),description:l("完成所有關卡","Complete all lessons"),condition:h>=p,icon:"🏆"},{id:6,title:l("連續學習","Consecutive Learning"),description:l("完成連續 3 個關卡","Complete 3 consecutive lessons"),condition:u(i,3),icon:"🔥"},{id:7,title:l("半程達陣","Halfway There"),description:l("完成一半以上關卡","Complete more than half lessons"),condition:h>=Math.ceil(p/2),icon:"🎊"}].forEach(w=>{w.condition&&m.push(w)}),d(m)},u=(i,m)=>{if(i.length<m)return!1;const h=[...i].sort((w,_)=>w-_);let k=1;for(let w=1;w<h.length;w++)if(h[w]===h[w-1]+1){if(k++,k>=m)return!0}else k=1;return!1},b=p>0?Math.round(o.completed.length/p*100):0,R=()=>{for(let i=1;i<=p;i++)if(!o.completed.includes(i)&&o.unlocked.includes(i))return i;return null},E=()=>{const i=l("確定要重置所有學習進度嗎？此操作無法復原。","Are you sure you want to reset all learning progress? This action cannot be undone.");confirm(i)&&(localStorage.removeItem("reactGameProgress"),a({unlocked:[1],completed:[]}),d([]))},S=R();return e.jsxs("div",{className:"result-page",children:[e.jsxs("header",{className:"result-header",children:[e.jsx("h1",{children:l("學習進度報告","Learning Progress Report")}),e.jsx("p",{children:l("檢視你的 React 學習成果","Review your React learning achievements")})]}),e.jsx("section",{className:"progress-overview-card",children:e.jsxs("div",{className:"overview-content",children:[e.jsxs("div",{className:"progress-stats",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-number",children:o.completed.length}),e.jsx("span",{className:"stat-label",children:l("已完成關卡","Completed Lessons")})]}),e.jsx("div",{className:"stat-divider",children:"／"}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-number",children:p}),e.jsx("span",{className:"stat-label",children:l("總關卡數","Total Lessons")})]})]}),e.jsx("div",{className:"main-progress",children:e.jsx(He,{percent:b,color:b===100?"#27ae60":"#3498db",size:"large",animated:!0})}),e.jsx("div",{className:"completion-message",children:b===100?e.jsxs("p",{className:"success-message",children:["🎉 ",l("恭喜！你已經完成了所有 React 基礎課程！","Congratulations! You have completed all React basic courses!")]}):e.jsx("p",{className:"encouragement-message",children:b>=70?l("就快完成了，加油！","Almost done, keep going!"):b>=40?l("學習進度不錯，繼續保持！","Great progress, keep it up!"):l("開始你的 React 學習之旅吧！","Start your React learning journey!")})})]})}),e.jsxs("section",{className:"modules-progress",children:[e.jsx("h2",{children:l("關卡進度詳情","Lesson Progress Details")}),e.jsx("div",{className:"modules-grid",children:n.map(i=>{const m=o.completed.includes(i.id),h=o.unlocked.includes(i.id);return e.jsxs("div",{className:`module-progress-card ${m?"completed":h?"unlocked":"locked"}`,children:[e.jsx("div",{className:"module-status-icon",children:m?"✅":h?"🔓":"🔒"}),e.jsxs("div",{className:"module-info",children:[e.jsx("h3",{children:l(`關卡 ${i.id}`,`Lesson ${i.id}`)}),e.jsx("p",{children:i.title})]}),e.jsxs("div",{className:"module-action",children:[m&&e.jsx(U,{to:`/module/${i.id}`,className:"btn btn-small btn-secondary",children:l("複習","Review")}),h&&!m&&e.jsx(U,{to:`/module/${i.id}`,className:"btn btn-small btn-primary",children:l("學習","Learn")})]})]},i.id)})})]}),r.length>0&&e.jsxs("section",{className:"achievements-section",children:[e.jsxs("h2",{children:["🏆 ",l("學習成就","Learning Achievements")]}),e.jsx("div",{className:"achievements-grid",children:r.map(i=>e.jsxs("div",{className:"achievement-card",children:[e.jsx("div",{className:"achievement-icon",children:i.icon}),e.jsxs("div",{className:"achievement-info",children:[e.jsx("h3",{children:i.title}),e.jsx("p",{children:i.description})]})]},i.id))})]}),e.jsxs("section",{className:"result-actions",children:[e.jsxs("div",{className:"action-buttons",children:[e.jsxs(U,{to:"/",className:"btn btn-primary",children:["🏠 ",l("返回首頁","Back to Home")]}),S&&e.jsxs(U,{to:`/module/${S}`,className:"btn btn-success",children:["📚 ",l(`繼續學習 (關卡 ${S})`,`Continue Learning (Lesson ${S})`)]}),b===100&&e.jsxs("button",{className:"btn btn-secondary",onClick:()=>window.open("https://react.dev/","_blank"),children:["🌐 ",l("深入學習 React","Learn More React")]})]}),e.jsx("div",{className:"developer-actions",children:e.jsx("button",{className:"btn btn-small btn-danger",onClick:E,style:{fontSize:"0.8rem",padding:"0.5rem 1rem"},children:l("重置進度","Reset Progress")})})]})]})}class Sn{constructor(){this.generationHistory=[],this.userPreferences=this.loadUserPreferences(),this.maxHistorySize=50}async generatePersonalizedQuestion(n={}){const s=this.analyzeUserContext(n.user_context),o=this.adjustDifficultyBasedOnPerformance({...n,user_context:s}),a=this.ensureQuestionUniqueness(o);try{const r=await Oe.generateQuestion(a),d=this.postProcessQuestion(r,a);return this.addToHistory(d,a),await Re.trackProgress({action:"ai_question_generated",question_id:d.id,generation_params:a,user_context:s,timestamp:new Date().toISOString()}),d}catch(r){return console.warn("AI 題目生成失敗，使用智能降級策略:",r.message),this.generateFallbackQuestion(a)}}async generateBatchQuestions(n={},s=5){try{const a=(await Oe.generateMultipleQuestions(n,s)).map(r=>this.postProcessQuestion(r,n));return a.forEach(r=>this.addToHistory(r,n)),a}catch(o){console.warn("批量 AI 題目生成失敗:",o.message);const a=[];for(let r=0;r<s;r++)try{const d=this.generateFallbackQuestion({...n,variation:r});a.push(d)}catch(d){console.warn(`降級題目 ${r} 生成失敗:`,d.message)}return a}}analyzeUserContext(n={}){const s=n.progress||this.getUserProgress(),o=this.userPreferences,a=this.calculateCompetencyLevel(s),r=this.analyzeLearningPattern(s),d=this.identifyWeakAreas(s);return{...n,competency_level:a,learning_pattern:r,weak_areas:d,preferences:o,session_performance:this.getSessionPerformance()}}adjustDifficultyBasedOnPerformance(n){const{user_context:s}=n,o=s.session_performance||{};let a=n.difficulty_level||N.INTERMEDIATE;o.recent_success_rate>.8?a=this.increaseDifficulty(a):o.recent_success_rate<.4&&(a=this.decreaseDifficulty(a));const r=this.adjustQuestionTypeForWeakAreas(n.question_type,s.weak_areas);return{...n,difficulty_level:a,question_type:r,adaptive_hints:!0,personalization_level:"high"}}ensureQuestionUniqueness(n){const o=this.getRecentQuestions(10).map(a=>a.topic||a.id);return{...n,exclude_topics:o,ensure_variety:!0,min_difference_threshold:.7}}postProcessQuestion(n,s){const o=s.language_code||"zh-TW",a=this.enhanceHints(n.hints||[],s),r=this.estimateQuestionDifficulty(n),d=this.generateQuestionTags(n,s),p=this.calculateQualityScore(n);return{...n,language:o,hints:a,estimated_difficulty:r,tags:d,quality_score:p,generated_at:new Date().toISOString(),generation_params:s,version:"1.0"}}enhanceHints(n,s){const a=(s.language_code||"zh-TW")==="en-US",r=this.generateDifficultySpecificHints(s.difficulty_level,a),d=this.generatePersonalizedHints(s.user_context,a);return[...n,...r,...d].slice(0,5)}generateFallbackQuestion(n){const o=(n.language_code||"zh-TW")==="en-US",a=n.difficulty_level||N.INTERMEDIATE,r=this.getQuestionTemplates(n.question_type,a),d=r[Math.floor(Math.random()*r.length)],p=this.generateFromTemplate(d,n,o);return this.postProcessQuestion(p,n)}getQuestionTemplates(n,s){const o={[K.CODE_BLOCKS]:[{type:"component-creation",blocks:["function","useState","return","jsx"],complexity:s===N.BEGINNER?"simple":"moderate"},{type:"hook-usage",blocks:["import","useEffect","useState","cleanup"],complexity:s===N.ADVANCED?"complex":"moderate"}]};return o[n]||o[K.CODE_BLOCKS]}generateFromTemplate(n,s,o){const a={id:`fallback-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,prompt:o?`Create a React ${n.type.replace("-"," ")} (AI generated)`:`建立一個 React ${n.type} 組件（AI 生成）`,codeBlocks:this.generateCodeBlocks(n,o),answerOrder:[],hints:[o?"Follow React conventions":"遵循 React 慣例",o?"Check the component structure":"檢查組件結構"],source:"ai-fallback"};return a.answerOrder=a.codeBlocks.filter(r=>!r.isDistractor).map(r=>r.id),a}generateCodeBlocks(n,s){const o=[];let a=1;return n.type==="component-creation"&&o.push({id:String(a++),text:"function MyComponent() {",isDistractor:!1},{id:String(a++),text:"  const [state, setState] = useState(0);",isDistractor:!1},{id:String(a++),text:"  return <div>{state}</div>;",isDistractor:!1},{id:String(a++),text:"}",isDistractor:!1},{id:String(a++),text:'  console.log("debug");',isDistractor:!0},{id:String(a++),text:'  const [unused] = useState("");',isDistractor:!0}),o}calculateCompetencyLevel(n){const s=n.completed?.length||0,o=n.total||10,a=s/o;return a<.3?N.BEGINNER:a<.7?N.INTERMEDIATE:N.ADVANCED}analyzeLearningPattern(n){return{preferred_pace:"moderate",strength_areas:["jsx","components"],improvement_areas:["hooks","state-management"]}}identifyWeakAreas(n){return["event-handling","lifecycle-methods"]}getSessionPerformance(){const n=this.getRecentQuestions(5),s=n.filter(o=>o.solved).length;return{recent_success_rate:n.length>0?s/n.length:.5,avg_completion_time:300,hint_usage_rate:.3}}getRecentQuestions(n=10){return this.generationHistory.slice(-n)}addToHistory(n,s){this.generationHistory.push({...n,generated_params:s,timestamp:new Date().toISOString()}),this.generationHistory.length>this.maxHistorySize&&(this.generationHistory=this.generationHistory.slice(-this.maxHistorySize)),this.saveGenerationHistory()}loadUserPreferences(){try{const n=localStorage.getItem("aiQuestionPreferences");return n?JSON.parse(n):{preferred_question_types:[K.CODE_BLOCKS],preferred_difficulty:N.INTERMEDIATE,enable_adaptive_hints:!0}}catch(n){return console.warn("載入用戶偏好失敗:",n),{}}}getUserProgress(){try{const n=localStorage.getItem("reactGameProgress");return n?JSON.parse(n):{}}catch(n){return console.warn("載取用戶進度失敗:",n),{}}}saveGenerationHistory(){try{const n=this.generationHistory.slice(-20);localStorage.setItem("aiGenerationHistory",JSON.stringify(n))}catch(n){console.warn("儲存生成歷史失敗:",n)}}increaseDifficulty(n){const s=[N.BEGINNER,N.INTERMEDIATE,N.ADVANCED],o=s.indexOf(n);return s[Math.min(o+1,s.length-1)]}decreaseDifficulty(n){const s=[N.BEGINNER,N.INTERMEDIATE,N.ADVANCED],o=s.indexOf(n);return s[Math.max(o-1,0)]}calculateQualityScore(n){let s=0;return n.prompt&&n.prompt.length>10&&(s+=25),n.codeBlocks&&n.codeBlocks.length>=3&&(s+=25),n.answerOrder&&n.answerOrder.length>0&&(s+=25),n.hints&&n.hints.length>0&&(s+=25),s}generateQuestionTags(n,s){const o=[];return s.difficulty_level&&o.push(s.difficulty_level),s.topic_category&&o.push(s.topic_category),n.source&&o.push(n.source),o}estimateQuestionDifficulty(n){const s=n.codeBlocks?.length||0,o=n.prompt?.split(" ").length||0;return s<=5&&o<=20?N.BEGINNER:s<=10&&o<=40?N.INTERMEDIATE:N.ADVANCED}adjustQuestionTypeForWeakAreas(n,s){return n}generateDifficultySpecificHints(n,s){return{[N.BEGINNER]:[s?"Start with the basics":"從基礎開始",s?"Read the question carefully":"仔細閱讀題目"],[N.INTERMEDIATE]:[s?"Consider the component lifecycle":"考慮組件生命週期",s?"Think about state management":"思考狀態管理"],[N.ADVANCED]:[s?"Focus on performance optimization":"專注於效能優化",s?"Consider edge cases":"考慮邊緣情況"]}[n]||[]}generatePersonalizedHints(n,s){const o=n?.weak_areas||[],a=[];return o.includes("event-handling")&&a.push(s?"Review event handling patterns":"複習事件處理模式"),a}}const $e=new Sn;async function Cn(t){return $e.generatePersonalizedQuestion(t)}function Tn(){const{isLanguage:t}=F(),[n,s]=g.useState(null),[o,a]=g.useState(!1),[r,d]=g.useState(null),[p,l]=g.useState([]),[x,u]=g.useState([]),[b,R]=g.useState(!1),[E,S]=g.useState(null),[i,m]=g.useState(0),[h,k]=g.useState(!1),[w,_]=g.useState(!1),[Z,q]=g.useState(!1),[I,H]=g.useState(null),[oe,J]=g.useState(new Set),[y,le]=g.useState(!1),[V,de]=g.useState({topic_category:"react-basics",difficulty_level:N.INTERMEDIATE,question_type:K.CODE_BLOCKS}),ue=async()=>{a(!0),d(null);try{let f;if(y?f=await G():f=await X(),f&&(f.codeBlocks||f.id))s(f),I||(H(f.id),J(T=>new Set([...T,f.id]))),u(ye(f.codeBlocks||[])),l([]),R(!1),S(null),d(null),m(0),k(!1),_(!1),q(!1);else throw new Error("Invalid challenge data received")}catch(f){console.error("挑戰獲取失敗，使用降級資料:",f);const T=v();s(T),I||(H(T.id),J(j=>new Set([...j,T.id]))),u(ye(T.codeBlocks)),l([]),R(!1),S(null),d(null)}finally{a(!1)}},G=async()=>{try{const f={language_code:t("en-US")?"en-US":"zh-TW",progress:se(),current_session:me()},T={...V,...f};console.log("🤖 正在使用 AI 生成題目...",T);const j=await Cn(T);return console.log("✅ AI 題目生成成功:",j.id),j}catch(f){return console.warn("🚨 AI 題目生成失敗，降級到本地資料:",f.message),v()}},X=async()=>{if($.useMockApi&&!$.useLocalData)try{const T=await te(ne.challenge.getChallenge,{method:"GET"});return console.log("✅ Mock API 調用成功"),T}catch(T){return console.warn("⚠️ Mock API 調用失敗，降級到本地資料:",T.message),v()}else return $.useLocalData?v():await te(ne.challenge.getChallenge,{method:"POST",body:JSON.stringify({language:t("en-US")?"en":"zh",difficulty:V.difficulty_level,topic:V.topic_category})})},se=()=>{try{const f=localStorage.getItem("reactGameProgress");return f?JSON.parse(f):{}}catch(f){return console.warn("獲取用戶進度失敗:",f),{}}},me=()=>{const f=sessionStorage.getItem("challengeSessionStart")||Date.now(),T=sessionStorage.getItem("sessionChallenges");return{session_start:f,challenges_attempted:T?JSON.parse(T).length:0,current_mode:y?"ai":"traditional"}},v=()=>{const f=[{id:"challenge-1",prompt:t("en-US")?"Arrange the code blocks to create a working React component that displays a counter with increment/decrement buttons.":"請排列程式碼區塊，建立一個可以顯示計數器並有增減按鈕的 React 組件。",codeBlocks:[{id:"1",text:"function Counter() {"},{id:"2",text:"  const [count, setCount] = useState(0);"},{id:"3",text:"  return ("},{id:"4",text:"    <div>"},{id:"5",text:"      <h2>Count: {count}</h2>"},{id:"6",text:"      <button onClick={() => setCount(count - 1)}>-</button>"},{id:"7",text:"      <button onClick={() => setCount(count + 1)}>+</button>"},{id:"8",text:"    </div>"},{id:"9",text:"  );"},{id:"10",text:"}"},{id:"11",text:'  const [name, setName] = useState("");'},{id:"12",text:'      <input type="text" />'},{id:"13",text:"  useEffect(() => {}, []);"}],answerOrder:["1","2","3","4","5","6","7","8","9","10"],hints:[t("en-US")?"Start with the function declaration":"從函數宣告開始",t("en-US")?"useState should come after function declaration":"useState 應該在函數宣告之後",t("en-US")?"Remember to return JSX":"記得要回傳 JSX"]},{id:"challenge-2",prompt:t("en-US")?"Create a React component that handles form input with controlled components.":"建立一個使用受控組件處理表單輸入的 React 組件。",codeBlocks:[{id:"1",text:"function LoginForm() {"},{id:"2",text:'  const [email, setEmail] = useState("");'},{id:"3",text:'  const [password, setPassword] = useState("");'},{id:"4",text:"  return ("},{id:"5",text:"    <form>"},{id:"6",text:"      <input value={email} onChange={(e) => setEmail(e.target.value)} />"},{id:"7",text:"      <input value={password} onChange={(e) => setPassword(e.target.value)} />"},{id:"8",text:"    </form>"},{id:"9",text:"  );"},{id:"10",text:"}"},{id:"11",text:"  const [count, setCount] = useState(0);"},{id:"12",text:"      <div>Hello World</div>"}],answerOrder:["1","2","3","4","5","6","7","8","9","10"],hints:[t("en-US")?"Form inputs need controlled values":"表單輸入需要受控值",t("en-US")?"Use onChange handlers to update state":"使用 onChange 處理器來更新狀態",t("en-US")?"Each input should have value and onChange":"每個輸入都應該有 value 和 onChange"]},{id:"challenge-3",prompt:t("en-US")?"Create a React component that uses useEffect to fetch data when mounted.":"建立一個使用 useEffect 在掛載時獲取資料的 React 組件。",codeBlocks:[{id:"1",text:"function DataFetcher() {"},{id:"2",text:"  const [data, setData] = useState(null);"},{id:"3",text:"  useEffect(() => {"},{id:"4",text:'    fetch("/api/data")'},{id:"5",text:"      .then(res => res.json())"},{id:"6",text:"      .then(setData);"},{id:"7",text:"  }, []);"},{id:"8",text:"  return ("},{id:"9",text:'    <div>{data ? data.message : "Loading..."}</div>'},{id:"10",text:"  );"},{id:"11",text:"}"},{id:"12",text:'  console.log("debug");'},{id:"13",text:"      <button>Click me</button>"}],answerOrder:["1","2","3","4","5","6","7","8","9","10","11"],hints:[t("en-US")?"useEffect runs after component mounts":"useEffect 在組件掛載後運行",t("en-US")?"Empty dependency array means run once":"空依賴陣列表示只運行一次",t("en-US")?"Handle loading state properly":"正確處理載入狀態"]},{id:"challenge-4",prompt:t("en-US")?"Build a React component with conditional rendering based on user authentication.":"建立一個根據用戶認證狀態進行條件渲染的 React 組件。",codeBlocks:[{id:"1",text:"function AuthComponent() {"},{id:"2",text:"  const [isLoggedIn, setIsLoggedIn] = useState(false);"},{id:"3",text:"  const handleLogin = () => setIsLoggedIn(true);"},{id:"4",text:"  const handleLogout = () => setIsLoggedIn(false);"},{id:"5",text:"  return ("},{id:"6",text:"    <div>"},{id:"7",text:"      {isLoggedIn ? ("},{id:"8",text:"        <button onClick={handleLogout}>Logout</button>"},{id:"9",text:"      ) : ("},{id:"10",text:"        <button onClick={handleLogin}>Login</button>"},{id:"11",text:"      )}"},{id:"12",text:"    </div>"},{id:"13",text:"  );"},{id:"14",text:"}"},{id:"15",text:"  const [error, setError] = useState(null);"},{id:"16",text:"      <p>Error occurred</p>"}],answerOrder:["1","2","3","4","5","6","7","8","9","10","11","12","13","14"],hints:[t("en-US")?"Use ternary operator for conditional rendering":"使用三元運算符進行條件渲染",t("en-US")?"Define handler functions before JSX":"在 JSX 前定義處理函數",t("en-US")?"Parentheses help with multi-line JSX":"括號有助於多行 JSX"]},{id:"challenge-5",prompt:t("en-US")?"Create a React component that renders a list of items with map function.":"建立一個使用 map 函數渲染項目列表的 React 組件。",codeBlocks:[{id:"1",text:"function ItemList() {"},{id:"2",text:'  const items = ["Apple", "Banana", "Orange"];'},{id:"3",text:"  return ("},{id:"4",text:"    <ul>"},{id:"5",text:"      {items.map((item, index) => ("},{id:"6",text:"        <li key={index}>{item}</li>"},{id:"7",text:"      ))}"},{id:"8",text:"    </ul>"},{id:"9",text:"  );"},{id:"10",text:"}"},{id:"11",text:"  const [selected, setSelected] = useState(null);"},{id:"12",text:"      <button>Add Item</button>"},{id:"13",text:"  items.forEach(item => console.log(item));"}],answerOrder:["1","2","3","4","5","6","7","8","9","10"],hints:[t("en-US")?"Use map() to transform array to JSX":"使用 map() 將陣列轉換為 JSX",t("en-US")?"Each list item needs a key prop":"每個列表項都需要 key 屬性",t("en-US")?"Wrap JSX expressions in curly braces":"將 JSX 表達式包裝在花括號中"]}],T=f.filter(B=>B.id!==I);if(T.length===0)return J(new Set),console.log("🔄 所有題目都已體驗過，重新開始選題"),f[Math.floor(Math.random()*f.length)];const j=T[Math.floor(Math.random()*T.length)];return H(j.id),J(B=>new Set([...B,j.id])),j};return{challenge:n,isLoading:o,error:r,userAnswer:p,availableBlocks:x,isCompleted:b,result:E,usedHintCount:i,hasViewedAnswer:h,showHintConfirm:w,showAnswerConfirm:Z,isAIMode:y,aiGenerationParams:V,fetchChallenge:ue,submitAnswer:async()=>{if(!n||p.length===0){d(t("en-US")?"Please arrange some code blocks":"請排列一些程式碼區塊");return}const f=cn(p,n.answerOrder,!0);S(f),R(!0),d(null);try{if($.useMockApi&&!$.useLocalData)try{await te(ne.challenge.submitAnswer,{method:"POST",body:JSON.stringify({challengeId:n.id,userAnswer:p,isCorrect:f.isCorrect,score:f.score,timestamp:new Date().toISOString()})}),console.log("✅ 答案提交到 Mock API 成功")}catch(j){console.warn("⚠️ Mock API 提交失敗，但不影響用戶體驗:",j.message)}else!$.useLocalData&&!$.useMockApi&&await te(ne.challenge.submitAnswer,{method:"POST",body:JSON.stringify({challengeId:n.id,userAnswer:p,isCorrect:f.isCorrect,score:f.score,timestamp:new Date().toISOString()})})}catch(T){console.warn("答案提交失敗，但不影響用戶體驗:",T)}},resetChallenge:()=>{n&&(u(ye(n.codeBlocks)),l([]),R(!1),S(null),d(null),m(0),k(!1),_(!1),q(!1))},addToAnswer:f=>{l(T=>[...T,f.id]),u(T=>T.filter(j=>j.id!==f.id))},removeFromAnswer:f=>{const T=n.codeBlocks.find(j=>j.id===f);T&&(l(j=>j.filter(B=>B!==f)),u(j=>[...j,T]))},moveInAnswer:(f,T)=>{l(j=>{const B=[...j],[he]=B.splice(f,1);return B.splice(T,0,he),B})},getBlockText:f=>n?.codeBlocks.find(j=>j.id===f)?.text||"",requestHint:()=>{i<3&&!h&&_(!0)},confirmHint:()=>{m(f=>f+1),_(!1)},cancelHint:()=>{_(!1)},requestAnswer:()=>{h||q(!0)},confirmAnswer:()=>{k(!0),R(!0),q(!1)},cancelAnswer:()=>{q(!1)},generateSmartHint:()=>{if(!n||!n.answerOrder)return t("en-US")?"Try arranging the code blocks in logical order.":"嘗試按邏輯順序排列程式碼區塊。";const f=n.answerOrder,T=p,j=f.length,B=T.length,he=B/j;let ke=0;const ze=Math.min(T.length,f.length);for(let Y=0;Y<ze;Y++)T[Y]===f[Y]&&ke++;if(B===0)return t("en-US")?"Start by placing the function declaration or import statement.":"先放置函數宣告或導入語句開始。";if(he<.3)return ke===0?t("en-US")?"Consider the basic structure: imports, function definition, state, return statement.":"考慮基本結構：導入、函數定義、狀態、回傳語句。":t("en-US")?"Good start! Continue with the component's internal logic.":"開始得不錯！繼續添加組件的內部邏輯。";if(he<.7)return f.some(W=>n.codeBlocks.find(ee=>ee.id===W)?.text.includes("return"))&&!T.some(W=>n.codeBlocks.find(ee=>ee.id===W)?.text.includes("return"))?t("en-US")?"Don't forget the return statement for your JSX.":"別忘了為你的 JSX 添加 return 語句。":f.some(W=>n.codeBlocks.find(ee=>ee.id===W)?.text.includes("}"))&&!T.some(W=>n.codeBlocks.find(ee=>ee.id===W)?.text.includes("}"))?t("en-US")?"Check if you need closing braces for functions or JSX elements.":"檢查是否需要為函數或 JSX 元素添加結束括號。":t("en-US")?"You're halfway there! Focus on the JSX structure and event handlers.":"你已經完成了一半！專注於 JSX 結構和事件處理器。";if(he<.9)return ke/B<.7?t("en-US")?"Most blocks are placed, but check the order. Try rearranging some blocks.":"大部分區塊都已放置，但檢查一下順序。嘗試重新排列一些區塊。":t("en-US")?"Almost done! You might be missing a few small elements like closing tags.":"快完成了！你可能遺漏了一些小元素，如結束標籤。";{const Y=f.filter(fe=>!T.includes(fe));if(Y.length>0){const fe=n.codeBlocks.find(W=>W.id===Y[0]);return t("en-US")?`You're very close! You might be missing: "${fe?.text}"`:`非常接近了！你可能遺漏了：「${fe?.text}」`}else return t("en-US")?"All blocks are placed! Try reordering them to match the correct sequence.":"所有區塊都已放置！嘗試重新排序以符合正確的順序。"}},toggleAIMode:()=>{le(f=>!f),console.log(`🤖 AI 模式已${y?"關閉":"開啟"}`)},updateAIGenerationParams:f=>{de(T=>({...T,...f})),console.log("🔧 AI 生成參數已更新:",f)},generateNewAIQuestion:async()=>{y||le(!0),await ue()},getAIModeInfo:()=>({isEnabled:y,currentParams:V,canGenerate:!o,generationHistory:$e.getRecentQuestions(5)})}}function kn(){const{isLanguage:t}=F(),{challenge:n,isLoading:s,error:o,userAnswer:a,availableBlocks:r,isCompleted:d,result:p,usedHintCount:l,hasViewedAnswer:x,showHintConfirm:u,showAnswerConfirm:b,isAIMode:R,aiGenerationParams:E,fetchChallenge:S,submitAnswer:i,resetChallenge:m,addToAnswer:h,removeFromAnswer:k,moveInAnswer:w,getBlockText:_,requestHint:Z,confirmHint:q,cancelHint:I,requestAnswer:H,confirmAnswer:oe,cancelAnswer:J,generateSmartHint:y,toggleAIMode:le,updateAIGenerationParams:V,generateNewAIQuestion:de,getAIModeInfo:ue}=Tn(),[G,X]=g.useState(null);g.useState(!1);const[se,me]=g.useState(!1),[v,A]=g.useState(N.BEGINNER);g.useState("all"),g.useState(!1);const c=(C,P)=>t("en-US")?P:C;g.useEffect(()=>{S()},[]);const O=C=>{const[P,M]=C.split("-");A(P),L(P)},L=async(C,P)=>{try{await S(C)}catch(M){console.error("獲取挑戰題目失敗:",M)}};g.useEffect(()=>{(u||b)&&setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},100)},[u,b]);const z=(C,P,M)=>{X({item:P,source:M}),C.dataTransfer.effectAllowed="move"},ae=()=>{X(null)},ie=C=>{C.preventDefault(),C.dataTransfer.dropEffect="move"},Ce=(C,P)=>{if(C.preventDefault(),!G)return;const{item:M,source:ge}=G;if(ge==="available")h(M);else if(ge==="answer"){const re=a.indexOf(M.id);re!==-1&&re!==P&&w(re,P)}},pe=C=>{if(C.preventDefault(),!G||G.source!=="answer")return;const{item:P}=G;k(P.id)},ve=C=>{h(C)},Te=C=>{k(C)};return s?e.jsx("div",{className:"challenge-page",children:e.jsxs("div",{className:"loading-container",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:c("載入挑戰中...","Loading challenge...")})]})}):o?e.jsx("div",{className:"challenge-page",children:e.jsxs("div",{className:"error-container",children:[e.jsx("h2",{children:c("載入失敗","Loading Failed")}),e.jsx("p",{children:o}),e.jsxs("div",{className:"error-actions",children:[e.jsx("button",{className:"btn btn-primary",onClick:S,children:c("重新載入","Retry")}),e.jsx(U,{to:"/",className:"btn btn-secondary",children:c("返回首頁","Back to Home")})]})]})}):n?e.jsxs("div",{className:"challenge-page",children:[e.jsxs("nav",{className:"challenge-nav",children:[e.jsxs(U,{to:"/",className:"btn btn-secondary",children:["← ",c("返回首頁","Back to Home")]}),e.jsxs("div",{className:"challenge-header",children:[e.jsxs("h1",{className:"challenge-title",children:[c("🎯 挑戰關卡","🎯 Challenge Mode"),R&&e.jsx("span",{className:"ai-badge",children:"🤖 AI"})]}),e.jsxs("div",{className:"challenge-controls",children:[e.jsx("div",{className:"challenge-selector",children:e.jsxs("select",{value:`${v}-${n?.id||"current"}`,onChange:C=>O(C.target.value),className:"challenge-select",children:[e.jsxs("optgroup",{label:c("初級挑戰","Beginner Challenges"),children:[e.jsx("option",{value:`${N.BEGINNER}-1`,children:c("初級 - React 基礎概念","Beginner - React Basics")}),e.jsx("option",{value:`${N.BEGINNER}-2`,children:c("初級 - JSX 語法練習","Beginner - JSX Syntax")}),e.jsx("option",{value:`${N.BEGINNER}-3`,children:c("初級 - Props 傳遞","Beginner - Props Passing")})]}),e.jsxs("optgroup",{label:c("中級挑戰","Intermediate Challenges"),children:[e.jsx("option",{value:`${N.INTERMEDIATE}-1`,children:c("中級 - State 管理","Intermediate - State Management")}),e.jsx("option",{value:`${N.INTERMEDIATE}-2`,children:c("中級 - 事件處理","Intermediate - Event Handling")}),e.jsx("option",{value:`${N.INTERMEDIATE}-3`,children:c("中級 - 條件渲染","Intermediate - Conditional Rendering")})]}),e.jsxs("optgroup",{label:c("進階挑戰","Advanced Challenges"),children:[e.jsx("option",{value:`${N.ADVANCED}-1`,children:c("進階 - Hooks 應用","Advanced - Hooks Usage")}),e.jsx("option",{value:`${N.ADVANCED}-2`,children:c("進階 - 性能優化","Advanced - Performance Optimization")}),e.jsx("option",{value:`${N.ADVANCED}-3`,children:c("進階 - 複雜狀態管理","Advanced - Complex State Management")})]})]})}),e.jsxs("button",{className:"btn btn-outline new-challenge-btn",onClick:()=>S(v),title:c("重新載入當前題目","Reload current challenge"),children:["🔄 ",c("重新載入","Reload")]})]})]}),e.jsx(U,{to:"/result",className:"btn btn-secondary",children:c("查看進度","View Progress")})]}),se&&e.jsxs("section",{className:"ai-control-panel",children:[e.jsxs("div",{className:"ai-panel-header",children:[e.jsxs("h3",{children:["🤖 ",c("AI 題目生成設定","AI Question Generation Settings")]}),e.jsx("button",{className:"panel-close-btn",onClick:()=>me(!1),children:"✕"})]}),e.jsxs("div",{className:"ai-settings-grid",children:[e.jsxs("div",{className:"setting-group",children:[e.jsx("label",{children:c("難度等級","Difficulty Level")}),e.jsxs("select",{value:E.difficulty_level,onChange:C=>V({difficulty_level:C.target.value}),className:"setting-select",children:[e.jsx("option",{value:N.BEGINNER,children:c("初學者","Beginner")}),e.jsx("option",{value:N.INTERMEDIATE,children:c("中級","Intermediate")}),e.jsx("option",{value:N.ADVANCED,children:c("進階","Advanced")})]})]}),e.jsxs("div",{className:"setting-group",children:[e.jsx("label",{children:c("主題類別","Topic Category")}),e.jsxs("select",{value:E.topic_category,onChange:C=>V({topic_category:C.target.value}),className:"setting-select",children:[e.jsx("option",{value:"react-basics",children:c("React 基礎","React Basics")}),e.jsx("option",{value:"hooks",children:c("Hooks","Hooks")}),e.jsx("option",{value:"state-management",children:c("狀態管理","State Management")}),e.jsx("option",{value:"components",children:c("組件","Components")}),e.jsx("option",{value:"lifecycle",children:c("生命週期","Lifecycle")})]})]}),e.jsxs("div",{className:"setting-group",children:[e.jsx("label",{children:c("題目類型","Question Type")}),e.jsxs("select",{value:E.question_type,onChange:C=>V({question_type:C.target.value}),className:"setting-select",children:[e.jsx("option",{value:K.CODE_BLOCKS,children:c("程式碼排序","Code Blocks")}),e.jsx("option",{value:K.MULTIPLE_CHOICE,children:c("選擇題","Multiple Choice")}),e.jsx("option",{value:K.TRUE_FALSE,children:c("是非題","True/False")})]})]}),e.jsx("div",{className:"setting-group full-width",children:e.jsxs("button",{className:"btn btn-primary generate-ai-btn",onClick:de,disabled:s,children:["🚀 ",c("生成 AI 題目","Generate AI Question")]})})]}),e.jsxs("div",{className:"ai-status",children:[e.jsxs("div",{className:"status-item",children:[e.jsxs("span",{className:"status-label",children:[c("當前模式","Current Mode"),":"]}),e.jsx("span",{className:`status-value ${R?"ai-active":""}`,children:R?c("AI 生成","AI Generated"):c("預設題目","Default Questions")})]}),n?.source&&e.jsxs("div",{className:"status-item",children:[e.jsxs("span",{className:"status-label",children:[c("題目來源","Question Source"),":"]}),e.jsx("span",{className:"status-value",children:n.source})]})]})]}),e.jsx("section",{className:"challenge-prompt",children:e.jsxs("div",{className:"prompt-content",children:[e.jsx("h2",{children:c("挑戰任務","Challenge Task")}),e.jsx("p",{className:"prompt-text",children:n.prompt}),e.jsxs("div",{className:"help-section",children:[!x&&e.jsxs("div",{className:"hints-section",children:[e.jsxs("button",{className:"btn btn-outline hints-toggle",onClick:Z,disabled:l>=3,children:["💡 ",c("查看智能提示","Get Smart Hint"),"(",l,"/3)"]}),l>0&&e.jsxs("div",{className:"hints-display",children:[e.jsx("h4",{children:c("💡 智能提示","💡 Smart Hint")}),e.jsxs("div",{className:"smart-hint-item",children:[e.jsx("span",{className:"hint-number",children:l}),e.jsx("span",{className:"hint-text",children:y()})]})]})]}),!x&&e.jsxs("button",{className:"btn btn-warning show-answer-btn",onClick:H,children:["🔍 ",c("顯示答案","Show Answer")]}),x&&n?.answerOrder&&e.jsxs("div",{className:"answer-display-inline",children:[e.jsx("h4",{children:c("🔍 正確答案","🔍 Correct Answer")}),e.jsx("div",{className:"correct-answer-inline",children:n.answerOrder.map((C,P)=>e.jsxs("div",{className:"answer-block-inline",children:[e.jsx("span",{className:"block-number",children:P+1}),e.jsx("code",{className:"block-code",children:_(C)})]},C))}),e.jsxs("div",{className:"answer-viewed-notice",children:["⚠️ ",c("已查看答案，挑戰結束","Answer viewed, challenge ended")]})]})]})]})}),e.jsxs("section",{className:"drag-drop-area",children:[e.jsxs("div",{className:"drag-container",children:[e.jsxs("div",{className:"available-blocks",children:[e.jsx("h3",{children:c("可用程式碼區塊","Available Code Blocks")}),e.jsxs("div",{className:"blocks-container",onDragOver:ie,onDrop:pe,children:[r.map(C=>e.jsxs("div",{className:"code-block available",draggable:!0,onDragStart:P=>z(P,C,"available"),onDragEnd:ae,onClick:()=>ve(C),title:c("點擊或拖曳添加到答案區","Click or drag to add to answer"),children:[e.jsx("span",{className:"block-id",children:C.id}),e.jsx("code",{className:"block-text",children:C.text})]},C.id)),r.length===0&&e.jsx("div",{className:"empty-message",children:c("所有區塊都已使用","All blocks are in use")})]})]}),e.jsxs("div",{className:"answer-area",children:[e.jsx("h3",{children:c("你的答案 (拖曳排序)","Your Answer (Drag to Sort)")}),e.jsxs("div",{className:"answer-container",children:[a.map((C,P)=>e.jsxs("div",{className:"code-block answer",draggable:!0,onDragStart:M=>{const ge=n.codeBlocks.find(re=>re.id===C);z(M,ge,"answer")},onDragEnd:ae,onDragOver:ie,onDrop:M=>Ce(M,P),onClick:()=>Te(C),title:c("點擊移除，或拖曳重新排序","Click to remove, or drag to reorder"),children:[e.jsx("span",{className:"block-order",children:P+1}),e.jsx("span",{className:"block-id",children:C}),e.jsx("code",{className:"block-text",children:_(C)}),e.jsx("button",{className:"remove-btn",onClick:M=>{M.stopPropagation(),Te(C)},children:"✕"})]},`${C}-${P}`)),a.length===0&&e.jsx("div",{className:"empty-answer",children:c("將程式碼區塊拖曳到這裡，或點擊區塊添加","Drag code blocks here, or click blocks to add")})]})]})]}),e.jsx("div",{className:"challenge-actions",children:d?e.jsxs("div",{className:"completion-actions",children:[e.jsx("button",{className:"btn btn-primary",onClick:S,children:c("🎯 下一個挑戰","🎯 Next Challenge")}),e.jsx("button",{className:"btn btn-secondary",onClick:m,children:c("🔄 重試此題","🔄 Retry This")})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-primary btn-large",onClick:i,disabled:a.length===0||x,children:x?c("🔒 已查看答案","🔒 Answer Viewed"):c("🚀 提交答案","🚀 Submit Answer")}),e.jsx("button",{className:"btn btn-secondary",onClick:m,children:c("🔄 重置","🔄 Reset")})]})})]}),d&&p&&e.jsx("section",{className:"result-section",children:e.jsxs("div",{className:`result-card ${p.isCorrect?"success":"error"}`,children:[e.jsxs("div",{className:"result-header",children:[e.jsx("span",{className:"result-icon",children:p.isCorrect?"🎉":"❌"}),e.jsx("h3",{children:p.isCorrect?c("挑戰成功！","Challenge Completed!"):c("繼續努力！","Try Again!")})]}),e.jsxs("div",{className:"result-details",children:[e.jsxs("div",{className:"score-display",children:[e.jsxs("span",{className:"score-label",children:[c("得分","Score"),": "]}),e.jsxs("span",{className:"score-value",children:[p.score,"%"]})]}),e.jsx("p",{className:"result-feedback",children:p.feedback})]}),p.isCorrect&&e.jsx("div",{className:"success-message",children:e.jsx("p",{children:c("🎊 太棒了！你成功完成了這個挑戰。","🎊 Awesome! You successfully completed this challenge.")})})]})}),e.jsx("section",{className:"instructions",children:e.jsxs("details",{className:"instructions-details",children:[e.jsx("summary",{children:c("📖 使用說明","📖 Instructions")}),e.jsx("div",{className:"instructions-content",children:e.jsxs("ul",{children:[e.jsx("li",{children:c("拖曳左側的程式碼區塊到右側答案區","Drag code blocks from left to right answer area")}),e.jsx("li",{children:c("在答案區內拖曳重新排序","Drag within answer area to reorder")}),e.jsx("li",{children:c("點擊區塊也可以快速添加/移除","Click blocks for quick add/remove")}),e.jsx("li",{children:c("可以丟棄不需要的干擾項","You can discard unnecessary distractor blocks")}),e.jsx("li",{children:c("完成排序後點擊提交驗證答案","Submit when finished to validate your answer")})]})})]})}),u&&e.jsx("div",{className:"modal-overlay",children:e.jsxs("div",{className:"confirm-dialog",children:[e.jsx("h3",{children:c("確認查看提示","Confirm View Hint")}),e.jsx("p",{children:c("確定要查看提示嗎？這會影響你的最終分數。","Are you sure you want to view the hint? This will affect your final score.")}),e.jsx("p",{className:"hint-info",children:c("提示將根據你的當前進度提供針對性建議。","The hint will provide targeted advice based on your current progress.")}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"btn btn-secondary",onClick:I,children:c("取消","Cancel")}),e.jsx("button",{className:"btn btn-primary",onClick:q,children:c("確認查看","Confirm")})]})]})}),b&&e.jsx("div",{className:"modal-overlay",children:e.jsxs("div",{className:"confirm-dialog",children:[e.jsx("h3",{children:c("確認查看答案","Confirm View Answer")}),e.jsx("p",{children:c("確定要查看答案嗎？這將結束當前挑戰，且無法再提交答案。","Are you sure you want to view the answer? This will end the current challenge and you won't be able to submit.")}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"btn btn-secondary",onClick:J,children:c("取消","Cancel")}),e.jsx("button",{className:"btn btn-warning",onClick:oe,children:c("確認查看","Confirm")})]})]})}),e.jsx(Be,{formType:"bug_report",variant:"floating",position:"bottom-left",customData:{page:"challenge",challengeId:n?.id,isAIMode:R,currentDifficulty:E.difficulty_level,hasError:!!o,errorMessage:o||"",userAnswer:a.join(","),challengeCompleted:d}})]}):e.jsx("div",{className:"challenge-page",children:e.jsxs("div",{className:"no-challenge",children:[e.jsx("h2",{children:c("暫無挑戰","No Challenge Available")}),e.jsx(U,{to:"/",className:"btn btn-primary",children:c("返回首頁","Back to Home")})]})})}function yn({variant:t="dropdown",size:n="medium"}){const{currentLanguage:s,changeLanguage:o,getCurrentLanguageInfo:a,supportedLanguages:r}=F(),d=a(),p=x=>{x!==s&&o(x)},l=()=>{const x=Object.keys(r),b=(x.indexOf(s)+1)%x.length,R=x[b];p(R)};return t==="dropdown"?e.jsxs("div",{className:`language-switcher dropdown ${n}`,children:[e.jsx("label",{htmlFor:"language-select",className:"visually-hidden",children:"Select Language"}),e.jsx("select",{id:"language-select",value:s,onChange:x=>p(x.target.value),className:"language-select","aria-label":"Change language",children:Object.entries(r).map(([x,u])=>e.jsxs("option",{value:x,children:[u.flag," ",u.name]},x))}),e.jsx("div",{className:"select-arrow",children:"▼"})]}):t==="buttons"?e.jsxs("div",{className:`language-switcher buttons ${n}`,children:[e.jsx("span",{className:"switcher-label",children:"Language:"}),e.jsx("div",{className:"language-buttons",children:Object.entries(r).map(([x,u])=>e.jsxs("button",{onClick:()=>p(x),className:`language-btn ${s===x?"active":""}`,"aria-pressed":s===x,title:`Switch to ${u.name}`,children:[e.jsx("span",{className:"flag",children:u.flag}),e.jsx("span",{className:"name",children:u.name})]},x))})]}):t==="toggle"?e.jsx("div",{className:`language-switcher toggle ${n}`,children:e.jsxs("button",{onClick:l,className:"language-toggle-btn","aria-label":`Current language: ${d.name}. Click to switch.`,title:`Switch language (${d.name})`,children:[e.jsx("span",{className:"current-flag",children:d.flag}),e.jsx("span",{className:"current-name",children:d.name}),e.jsx("span",{className:"toggle-icon",children:"⇄"})]})}):t==="icon"?e.jsx("div",{className:`language-switcher icon ${n}`,children:e.jsx("button",{onClick:l,className:"language-icon-btn","aria-label":`Current language: ${d.name}. Click to switch.`,title:`${d.name} - Click to switch`,children:d.flag})}):null}function Nn(){const{isLanguage:t}=F();return e.jsx("header",{className:"app-header",children:e.jsxs("div",{className:"header-content",children:[e.jsxs("div",{className:"header-text",children:[e.jsx("h1",{children:t("en-US")?"React Learning Game":"React 學習遊戲"}),e.jsx("p",{children:t("en-US")?"Modular React Development Learning":"模組化闖關學習 React 開發"})]}),e.jsx("div",{className:"header-controls",children:e.jsx(yn,{variant:"toggle",size:"medium"})})]})})}function In(){const{isLanguage:t}=F();return e.jsx("footer",{className:"app-footer",children:e.jsxs("p",{children:["© 2024 ",t("en-US")?"React Learning Game":"React 學習遊戲"]})})}function wn(){return e.jsx(on,{children:e.jsx(Ge,{children:e.jsxs("div",{className:"app",children:[e.jsx(Nn,{}),e.jsx("main",{className:"app-main",children:e.jsxs(We,{children:[e.jsx(be,{path:"/",element:e.jsx(xn,{})}),e.jsx(be,{path:"/module/:id",element:e.jsx(vn,{})}),e.jsx(be,{path:"/result",element:e.jsx(bn,{})}),e.jsx(be,{path:"/challenge",element:e.jsx(kn,{})})]})}),e.jsx(In,{})]})})})}const An=!1,Rn=Ne.createRoot(document.getElementById("root"));Rn.render(e.jsx(Ve.StrictMode,{children:e.jsx(wn,{})}));"serviceWorker"in navigator&&!An&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(t=>{console.log("✅ Service Worker 註冊成功:",t.scope),t.addEventListener("updatefound",()=>{const n=t.installing;n&&n.addEventListener("statechange",()=>{n.state==="installed"&&navigator.serviceWorker.controller&&(console.log("🔄 發現新版本，請重新載入頁面"),confirm("發現新版本！是否要重新載入以使用最新版本？")&&window.location.reload())})})}).catch(t=>{console.log("❌ Service Worker 註冊失敗:",t)})});window.addEventListener("error",t=>{console.error("🚨 全域錯誤:",t.error)});window.addEventListener("unhandledrejection",t=>{console.error("🚨 未處理的 Promise 錯誤:",t.reason),t.preventDefault()});window.addEventListener("online",()=>{console.log("🌐 網路連線已恢復")});window.addEventListener("offline",()=>{console.log("📵 網路連線已中斷 - 進入離線模式")});
