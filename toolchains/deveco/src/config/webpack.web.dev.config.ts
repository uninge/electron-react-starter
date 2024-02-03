import path from 'node:path';
import { Configuration, DefinePlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const webpackWebBaseConfig: Configuration = {
  bail: true,
  cache: true,
  devtool: 'source-map',
  mode: 'production',
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
  resolve: {
    symlinks: true,
    extensions: ['.js', '.ts', '.json', '.node'],
    alias: {},
  },
  plugins: [
    new WebpackBar({
      name: 'Electron Main',
      profile: true,
    }),
    new DefinePlugin({
      'process.env.ASDF': JSON.stringify(8),
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   openAnalyzer: true,
    //   analyzerPort: 'auto',
    //   reportTitle: `Main Process`,
    // }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin({
      cache: true,
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    // new CleanWebpackPlugin({
    // 	// verbose: true,
    // }),
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
  optimization: {
    usedExports: true,
    minimize: true,
  },
  node: {
    __dirname: true,
    __filename: true,
  },
};

export default webpackWebBaseConfig;
