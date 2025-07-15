const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

/**
 * Electron 主進程文件
 * 用於創建和管理 Windows 桌面應用程式
 */

let mainWindow;

function createWindow() {
  // 創建瀏覽器視窗
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'dist/icons/icon-512.png'), // 應用程式圖標
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    show: false, // 先不顯示，等載入完成再顯示
    titleBarStyle: 'default'
  });

  // 載入應用程式
  if (isDev) {
    // 開發模式：載入開發伺服器
    mainWindow.loadURL('http://localhost:3000');
    // 開啟開發者工具
    mainWindow.webContents.openDevTools();
  } else {
    // 生產模式：載入打包好的檔案
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // 視窗載入完成後顯示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // 可選：最大化視窗
    if (!isDev) {
      mainWindow.maximize();
    }
  });

  // 視窗關閉時的處理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 創建應用程式選單
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: '檔案',
      submenu: [
        {
          label: '重新載入',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (mainWindow) {
              mainWindow.reload();
            }
          }
        },
        {
          label: '強制重新載入',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.reloadIgnoringCache();
            }
          }
        },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: '編輯',
      submenu: [
        { label: '復原', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: '重做', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: '剪下', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: '複製', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: '貼上', accelerator: 'CmdOrCtrl+V', role: 'paste' }
      ]
    },
    {
      label: '檢視',
      submenu: [
        { label: '放大', accelerator: 'CmdOrCtrl+Plus', role: 'zoomin' },
        { label: '縮小', accelerator: 'CmdOrCtrl+-', role: 'zoomout' },
        { label: '實際大小', accelerator: 'CmdOrCtrl+0', role: 'resetzoom' },
        { type: 'separator' },
        { label: '全螢幕', accelerator: 'F11', role: 'togglefullscreen' },
        { type: 'separator' },
        {
          label: '開發者工具',
          accelerator: 'F12',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.toggleDevTools();
            }
          }
        }
      ]
    },
    {
      label: '說明',
      submenu: [
        {
          label: '關於 React 學習遊戲',
          click: () => {
            // 可以顯示關於對話框或開啟關於頁面
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                alert('React 學習遊戲 v1.1.1\\n\\n模組化的 React 教學闖關遊戲\\n支援離線使用和跨平台部署');
              `);
            }
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// 當 Electron 完成初始化並準備創建瀏覽器視窗時調用
app.whenReady().then(createWindow);

// 當所有視窗都關閉時退出應用程式
app.on('window-all-closed', () => {
  // 在 macOS 上，應用程式通常會保持活動狀態，即使沒有開啟視窗
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在 macOS 上，當點擊 dock 圖標且沒有其他視窗開啟時，
  // 通常會重新創建視窗
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 安全性：防止新視窗創建
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (navigationEvent, navigationURL) => {
    event.preventDefault();
    // 可以選擇在預設瀏覽器中開啟外部連結
    // require('electron').shell.openExternal(navigationURL);
  });
});