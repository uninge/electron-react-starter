import { globalShortcut } from 'electron';
// import electronLog from 'electron-log';

// 禁用快捷键
export function banShortcuts() {
  // F5刷新、control or command + R 刷新、control or command + shift + R 刷新
  const banArray = ['F5', 'CommandOrControl+R', 'CommandOrControl+Shift+R'];

  globalShortcut.registerAll(banArray, () => {
    console.warn('快捷键点击');
    return false;
  });
}
