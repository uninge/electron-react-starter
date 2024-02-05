import chalk from 'chalk';
import path from 'node:path';
import { rimraf } from 'rimraf';
import webpackWebProdConfig from '../config/webpack.web.prod.config';
import { webpackBuilder } from '../utils';

export default async function buildWeb() {
  rimraf(path.resolve(process.cwd(), './dist')).then((success) => {
    if (!success) {
      throw new Error('rimraf fail');
    }

    console.log(
      chalk.yellowBright(` 构建目录【${path.resolve(process.cwd(), './dist')}】清理成功, 开始构建...`),
    );

    webpackBuilder(webpackWebProdConfig)
      .then((res) => {
        // 启用webpack-bundle-analyzer不输出日志
        console.log(chalk.green('------------------∽-★-∽--- 构建日志输出开始 ---∽-★-∽------------------'));
        console.log(`${res}`);
        console.log(chalk.green('------------------∽-★-∽--- 构建日志输出结束 ---∽-★-∽------------------'));
        console.log();
        console.log(
          ` ${chalk.bold.greenBright('✔')} ${chalk.cyanBright(
            `构建完成！可在${chalk.greenBright(`【${path.resolve(process.cwd(), './dist')}】`)}目录查看或进行下一步操作`,
          )}`,
        );
        console.log();
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  });
}
