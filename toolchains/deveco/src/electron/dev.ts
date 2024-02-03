import chalk from 'chalk';
import webpack from 'webpack';
import path from 'node:path';
import process from 'node:process';
import { spawn, ChildProcessWithoutNullStreams } from 'node:child_process';

import webpackMainProdConfig from '../config/webpack.prod.config';
import { printElectronLog } from '../utils';

let firstTapDone = false;
let isElectronManualRestarting = false;
let electronProcess: ChildProcessWithoutNullStreams;

function watchBuildMain() {
  webpackMainProdConfig.entry.index.unshift(path.resolve(process.cwd(), './src/index.dev.ts'));

  const compiler = webpack(webpackMainProdConfig);

  return new Promise((resolve, reject) => {
    compiler.hooks.watchRun.tapAsync('watch-run', (_compilation, done) => {
      done();
    });

    compiler.watch({}, (err, stats) => {
      console.log(chalk.gray('------------------∽-★-∽--- compiler::watch start ---∽-★-∽------------------'));

      if (err) {
        console.log(err);
        return;
      }

      if (stats?.hasErrors()) {
        console.error(
          stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
          }),
        );
        return;
      }
      console.log(chalk.gray('------------------∽-★-∽---  compiler::watch end  ---∽-★-∽------------------'));
    });

    compiler.hooks.done.tap('done', (stats) => {
      if (stats.hasErrors()) {
        console.error(
          stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
          }),
        );
        if (!firstTapDone) {
          firstTapDone = true;
          reject(stats);
        }
        return;
      }

      if (electronProcess?.pid) {
        isElectronManualRestarting = true;

        killElectronProcess();

        startElectron().then(() => {
          setTimeout(() => {
            isElectronManualRestarting = false;
          }, 10000);
        });
      }

      if (!firstTapDone) {
        firstTapDone = true;
        resolve(true);
      }
    });
  });
}

function startElectron() {
  return new Promise((resolve) => {
    const hook = path.resolve(__dirname, './hooks.js');
    const app = path.resolve(process.cwd(), './dist/index.js');
    const argv = ['--inspect=5858', '--require', app, hook];

    electronProcess = spawn(require('electron'), argv, {
      cwd: process.cwd(),
      windowsHide: false,
      env: Object.assign({}, process.env, {
        RENDER_DEV_HOST_NAME: 'localhost',
        RENDER_DEV_PORT: 7890,
      }),
    });

    electronProcess.stdout.on('data', (data) => {
      printElectronLog(data, 'cyan');
    });

    electronProcess.stderr.on('data', (data) => {
      printElectronLog(data, 'red');
    });

    electronProcess.once('close', (code) => {
      if (!isElectronManualRestarting) {
        process.exit(code || 1);
      }
    });

    resolve(true);
  });
}

function killElectronProcess() {
  if (electronProcess.pid) {
    process.kill(electronProcess.pid);
  }
}

function addProcessListener() {
  process.on('SIGINT', () => {
    killElectronProcess();
  });
  process.on('SIGTERM', () => {
    killElectronProcess();
  });
}

export default async function devElectron() {
  addProcessListener();

  await watchBuildMain();

  await startElectron();
}
