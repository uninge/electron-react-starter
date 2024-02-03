import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import webpackWebBaseConfig from './webpack.web.base.config';

const config: Configuration = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: '/',
    filename: '[name]-[fullhash:8].js',
  },
  resolve: {
    alias: {},
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new ReactRefreshWebpackPlugin({
    // 	overlay: false,
    // }),
    //
  ],
  optimization: {
    moduleIds: 'named',
    emitOnErrors: false,
  },
};

const webpackDevConfig = merge(webpackWebBaseConfig, config);

export default webpackDevConfig;
