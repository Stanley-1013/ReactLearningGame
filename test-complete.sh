#!/bin/bash

echo "🚀 開始完整功能測試..."

# 確保在正確目錄
cd "$(dirname "$0")"

# 停止任何現有的服務器
echo "🛑 停止現有服務器..."
pkill -f "mock-server" || true
pkill -f "vite" || true

# 等待端口釋放
sleep 2

# 啟動 Mock API 服務器
echo "🎯 啟動 Mock API 服務器..."
npm run mock-server &
MOCK_PID=$!

# 等待服務器啟動
sleep 3

# 運行 API 測試
echo "🧪 運行 API 測試..."
npm run test-api

API_TEST_RESULT=$?

if [ $API_TEST_RESULT -eq 0 ]; then
    echo "✅ API 測試通過！"
    
    # 啟動 React 應用進行手動測試
    echo "🌐 啟動 React 應用進行手動測試..."
    echo "請訪問 http://localhost:5173/challenge 測試挑戰功能"
    echo "按 Ctrl+C 停止所有服務器"
    
    npm run dev &
    VITE_PID=$!
    
    # 等待用戶中斷
    trap "echo '🛑 停止所有服務器...'; kill $MOCK_PID $VITE_PID 2>/dev/null; exit 0" INT
    
    # 保持腳本運行
    wait
else
    echo "❌ API 測試失敗！"
    kill $MOCK_PID 2>/dev/null
    exit 1
fi