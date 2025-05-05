import path from 'node:path';
import { Configuration, DefinePlugin } from 'webpack';
import { merge } from 'webpack-merge';
import WebpackBar from 'webpackbar';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpackBaseConfig from './webpack.base.config';

interface IConfiguration extends Configuration {
  entry: {
    index: string[];
    preload: string[];
  };
}

const config: Configuration = {
  devtool: 'source-map',
  mode: 'production',
  target: 'electron-main',
  entry: {
    index: [path.resolve(process.cwd(), './src/index.ts')],
    preload: [path.resolve(process.cwd(), './src/preload.ts')],
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: '[name].js',
    library: {
      type: 'commonjs',
    },
  },
  // externals: isDevelopment ? [] : [...Object.keys(dependencies || {}), ...Object.keys(devDependencies || {})],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: path.resolve(process.cwd(), './src'),
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: false,
              presets: [
                '@babel/preset-typescript', // https://babeljs.io/docs/en/babel-preset-typescript
              ],
              plugins: [],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: paths.appElectronPublicAssetsPath,
    //       to: paths.appElectronDistPublicPath,
    //       globOptions: {
    //         ignore: ['**/favicon.ico', '**/index.html'],
    //       },
    //       noErrorOnMissing: false,
    //     },
    //   ],
    // }),
  ],
};

const webpackElectronProdConfig = merge(webpackBaseConfig, config) as IConfiguration;

export default webpackElectronProdConfig;
