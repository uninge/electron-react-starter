import webpack from 'webpack';
import { ip } from 'address';
// import open from "open";
import { getPortPromise } from 'portfinder';
import WebpackDevServer from 'webpack-dev-server';
import webpackDevConfig from '../config/webpack.web.dev.config';
import { printInstructions } from '../utils';

export default async function devWeb() {
  const port = await getPortPromise({
    port: 3000,
  });
  const compiler = webpack(webpackDevConfig);
  const server = new WebpackDevServer(
    {
      port,
      host: '0.0.0.0',
      // open: true, // 默认为false，本项目不启用，下面需要定制逻辑
      // hot: true, // 默认为true，启用webpack.HotModuleReplacementPlugin()
      liveReload: false, // devServer.hot 配置项必须禁用
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
        logging: 'error',
        progress: true,
      },
    },
    compiler,
  );

  await server.start();

  let firstTapDone = false;
  const localUrl = `http://localhost:${port}`;
  const networkUrl = `http://${ip()}:${port}`;

  compiler.hooks.done.tap('done', () => {
    if (!firstTapDone) {
      firstTapDone = true;
      // open(localUrl);
    }

    setTimeout(() => {
      printInstructions(localUrl, networkUrl);
    }, 30);
  });
}
