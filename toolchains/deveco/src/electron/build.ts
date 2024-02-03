import path from 'node:path';
import chalk from 'chalk';
import { rimraf } from 'rimraf';

import webpackProdConfig from '../config/webpack.prod.config';
import { webpackBuilder } from '../utils';

export default function buildElectron() {
  rimraf(path.resolve(process.cwd(), './dist')).then((success) => {
    if (!success) {
      throw new Error('rimraf fail');
    }
    Promise.all([webpackBuilder(webpackProdConfig)])
      .then((res) => {
        console.log(chalk.green('------------------∽-★-∽--- 构建日志输出开始 ---∽-★-∽------------------'));
        res.forEach((item, index) => {
          if (index) {
            console.log(
              chalk.green('------------------∽-★-∽--- 构建日志输出分割 ---∽-★-∽------------------'),
            );
          }
          console.log(`${item}`);
        });
        console.log(chalk.green('------------------∽-★-∽--- 构建日志输出结束 ---∽-★-∽------------------'));
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  });
}
