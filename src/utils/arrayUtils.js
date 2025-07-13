/**
 * 陣列操作工具函數
 * 用於題目選項洗牌、隨機選擇等功能
 */

/**
 * Fisher-Yates 洗牌演算法
 * 用於隨機打亂陣列順序（如測驗選項）
 * 
 * @param {Array} array - 要洗牌的陣列
 * @returns {Array} 新的已洗牌陣列
 */
export function shuffleArray(array) {
  if (!Array.isArray(array)) {
    console.warn('shuffleArray: 輸入不是陣列:', array);
    return [];
  }
  
  // 建立陣列副本，避免修改原陣列
  const shuffled = [...array];
  
  // Fisher-Yates 洗牌
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * 帶種子的 Fisher-Yates 洗牌演算法
 * 基於給定種子產生穩定的洗牌結果
 * 
 * @param {Array} array - 要洗牌的陣列
 * @param {number} seed - 隨機種子
 * @returns {Array} 新的已洗牌陣列
 */
export function shuffleArrayWithSeed(array, seed) {
  if (!Array.isArray(array)) {
    console.warn('shuffleArrayWithSeed: 輸入不是陣列:', array);
    return [];
  }
  
  // 建立陣列副本，避免修改原陣列
  const shuffled = [...array];
  
  // 簡單的線性同餘發生器作為偽隨機數生成器
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % (2 ** 32);
    return currentSeed / (2 ** 32);
  };
  
  // Fisher-Yates 洗牌，使用穩定的隨機數
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * 從陣列中隨機選擇一個元素
 * 用於從多題庫中隨機抽題
 * 
 * @param {Array} array - 源陣列
 * @returns {*} 隨機選中的元素
 */
export function getRandomItem(array) {
  if (!Array.isArray(array) || array.length === 0) {
    console.warn('getRandomItem: 陣列為空或無效:', array);
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * 從陣列中隨機選擇多個不重複的元素
 * 
 * @param {Array} array - 源陣列
 * @param {number} count - 要選擇的數量
 * @returns {Array} 隨機選中的元素陣列
 */
export function getRandomItems(array, count) {
  if (!Array.isArray(array)) {
    return [];
  }
  
  if (count >= array.length) {
    return shuffleArray(array);
  }
  
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

/**
 * 檢查陣列是否相等（順序敏感）
 * 用於驗證拖曳排序的答案
 * 
 * @param {Array} arr1 - 第一個陣列
 * @param {Array} arr2 - 第二個陣列
 * @returns {boolean} 是否相等
 */
export function arraysEqual(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }
  
  if (arr1.length !== arr2.length) {
    return false;
  }
  
  return arr1.every((item, index) => item === arr2[index]);
}

/**
 * 移動陣列中的元素位置
 * 用於拖曳排序功能
 * 
 * @param {Array} array - 源陣列
 * @param {number} fromIndex - 起始位置
 * @param {number} toIndex - 目標位置
 * @returns {Array} 新陣列
 */
export function moveArrayItem(array, fromIndex, toIndex) {
  if (!Array.isArray(array)) {
    return [];
  }
  
  const result = [...array];
  const [movedItem] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, movedItem);
  return result;
}

/**
 * 從陣列中移除指定元素
 * 
 * @param {Array} array - 源陣列
 * @param {*} item - 要移除的元素
 * @returns {Array} 新陣列
 */
export function removeArrayItem(array, item) {
  if (!Array.isArray(array)) {
    return [];
  }
  
  return array.filter(arrayItem => arrayItem !== item);
}

/**
 * 在指定位置插入元素
 * 
 * @param {Array} array - 源陣列
 * @param {number} index - 插入位置
 * @param {*} item - 要插入的元素
 * @returns {Array} 新陣列
 */
export function insertArrayItem(array, index, item) {
  if (!Array.isArray(array)) {
    return [item];
  }
  
  const result = [...array];
  result.splice(index, 0, item);
  return result;
}

/**
 * 生成指定範圍的隨機整數
 * 
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 隨機整數
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 根據權重隨機選擇元素
 * 
 * @param {Array} items - 選項陣列
 * @param {Array} weights - 對應的權重陣列
 * @returns {*} 選中的元素
 */
export function getWeightedRandomItem(items, weights) {
  if (!Array.isArray(items) || !Array.isArray(weights) || items.length !== weights.length) {
    return getRandomItem(items);
  }
  
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let randomWeight = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    randomWeight -= weights[i];
    if (randomWeight <= 0) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
}

/**
 * 驗證拖曳排序答案的工具函數
 * 
 * @param {Array} userAnswer - 使用者的排序
 * @param {Array} correctAnswer - 正確答案
 * @param {boolean} strictOrder - 是否嚴格順序比對
 * @returns {Object} 驗證結果
 */
export function validateDragAnswer(userAnswer, correctAnswer, strictOrder = true) {
  const result = {
    isCorrect: false,
    score: 0,
    feedback: ''
  };
  
  if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) {
    result.feedback = '答案格式錯誤';
    return result;
  }
  
  if (strictOrder) {
    // 嚴格順序比對
    result.isCorrect = arraysEqual(userAnswer, correctAnswer);
    result.score = result.isCorrect ? 100 : 0;
    result.feedback = result.isCorrect ? '完全正確！' : '順序不正確，請重新排列。';
  } else {
    // 包含比對（順序不重要）
    const userSet = new Set(userAnswer);
    const correctSet = new Set(correctAnswer);
    const intersection = new Set([...userSet].filter(x => correctSet.has(x)));
    
    result.score = Math.round((intersection.size / correctSet.size) * 100);
    result.isCorrect = result.score === 100;
    result.feedback = result.isCorrect 
      ? '完全正確！' 
      : `答對了 ${intersection.size}/${correctSet.size} 個項目。`;
  }
  
  return result;
}

export default {
  shuffleArray,
  shuffleArrayWithSeed,
  getRandomItem,
  getRandomItems,
  arraysEqual,
  moveArrayItem,
  removeArrayItem,
  insertArrayItem,
  getRandomInt,
  getWeightedRandomItem,
  validateDragAnswer
};