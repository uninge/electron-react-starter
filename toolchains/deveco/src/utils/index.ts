import chalk from 'chalk';
import webpack, { Configuration } from 'webpack';

export function webpackBuilder(config: Configuration) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err);
      }

      let message: string = 'success';

      if (stats) {
        message = stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        });

        if (stats.hasErrors()) {
          reject(message);
        }
      }

      resolve(message);
    });
  });
}

export function printElectronLog(data: any, color: 'cyan' | 'red') {
  let log = '';
  data = data.toString().split(/\r?\n/);
  data.forEach((line: string) => {
    line = line.replace(/\r?\n/gm, '').trim();
    if (line) {
      log += `  ${line}\n`;
    }
  });

  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron ---------------------------') +
        '\n' +
        log.replace(/^(\r?\n)*/, '').replace(/(\r?\n)*&/, '') +
        chalk[color].bold('┗ ------------------------------------'),
    );
  }
}
