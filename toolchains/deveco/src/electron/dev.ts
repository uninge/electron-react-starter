import webpack from 'webpack';
import webpackMainProdConfig from './webpack/webpack.prod.config';

export default function devElectron() {
  const compiler = webpack(webpackMainProdConfig);
  compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
    console.log('Main', 'Main process compiling...');

    done();
  });

  compiler.watch({}, (err, stats) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('--->>>Main', stats?.hasErrors());
  });
  compiler.hooks.done.tap('done', (stats) => {
    if (stats.hasErrors()) {
      console.log('--->>>error', stats);
      return;
    }
  });
}
