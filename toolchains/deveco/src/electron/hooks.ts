require('electron').ipcMain.on('debug-run', (msg: any) => {
  console.log('--->>>hooks', msg);
});
