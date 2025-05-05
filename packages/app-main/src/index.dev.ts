/**
 * Electron 开发 dev 环境入口
 */
import { app, ipcMain } from 'electron';
import electronLog from 'electron-log';
import electronDebug from 'electron-debug';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { performanceMark, performanceStart, performanceEnd } from './utils';

performanceStart();

performanceMark('dev-start');

electronDebug({ showDevTools: true, devToolsMode: 'previous' });

(async function dev() {
  await app.whenReady();

  /** ************** extensions start *************** */
  const results = await Promise.allSettled([installExtension(REACT_DEVELOPER_TOOLS)]);

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      electronLog.info(`Added Extension: ${result.value}`);
    }
    if (result.status === 'rejected') {
      electronLog.error('An error occurred when added extension: ', result.reason);
    }
  });
  /** ************** extensions end *************** */

  performanceMark('dev-end');

  electronLog.info('Dev Ready');
})().catch(console.error);

performanceEnd();
