import path from 'node:path';
import url from 'node:url';
import electronLog from 'electron-log';
import { app, BrowserWindow, globalShortcut } from 'electron';
import { performanceMark, performanceStart, performanceEnd } from './utils';
import process from 'node:process';

performanceStart();
performanceMark('main-start');

process.on('unhandledRejection', (error) => {
  electronLog.error('An error occurred(unhandledRejection)', error);
  if (process.env.BUILD_ENV !== 'development') {
    app.quit();
  }
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

function createWindow() {
  performanceMark('main-window-create-start');

  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 830,
    minHeight: 560,
    width: 830,
    height: 560,
    frame: true,
    show: true,
    transparent: false,
    backgroundColor: '#333',
    titleBarStyle: 'hidden',
    webPreferences: {
      webviewTag: true,
      webSecurity: false,
      nodeIntegration: true, // 加载第三方网页强烈建议置为false。
      contextIsolation: true, // 自Electron 12将默认为true。
      preload: path.resolve(
        __dirname,
        process.env.NODE_ENV === 'development' ? '../dist/preload.js' : './preload.js',
      ),
    },
  });

  const originUa = mainWindow.webContents.getUserAgent();
  mainWindow.webContents.setUserAgent(`${originUa} ${'Bifrost'}/${'0.0.1'}`);

  performanceMark('main-window-source-load-start');

  const options = {
    protocol: 'http',
    pathname: '127.0.0.1:3000',
    slashes: true,
  };

  mainWindow
    .loadURL(url.format(options))
    .then(() => {
      electronLog.info('Main Window Load Success');
    })
    .catch((err) => {
      electronLog.error(err);
    });

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.center();
    }
    performanceMark('main-window-create-end');
  });

  mainWindow.webContents.on('did-finish-load', () => {
    performanceMark('main-window-source-load-end');
    try {
      // const list = getMarks();
      // electronLog.log('performance:', JSON.stringify(list, null, 2));
    } catch (err) {
      electronLog.error(err);
    }

    performanceEnd();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  setTimeout(() => {
    mainWindow?.webContents.reloadIgnoringCache();
  }, 5000);

  if (process.env.BUILD_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app
  .whenReady()
  .then(() => {
    // if (true) {
    //   // banShortcuts();
    // }

    createWindow();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch((err) => {
    electronLog.error(err);
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

performanceMark('main-end');
