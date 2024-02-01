import path from 'node:path';
import { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const webpackProdConfig: Configuration = {
  cache: false,
  devtool: 'source-map',
  mode: 'development',
  target: 'electron-main',
  entry: {
    index: path.resolve(process.cwd(), './src/index.ts'),
    preload: path.resolve(process.cwd(), './src/preload.ts'),
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
    strictExportPresence: true,
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(process.cwd(), './src'),
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar({
      name: 'Electron Main',
      profile: true,
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
    //   openAnalyzer: false,
    //   analyzerPort: 'auto',
    //   reportTitle: `Main Process`,
    // }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin({
      cache: false,
      extensions: ['ts'],
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
  node: {
    __dirname: false,
    __filename: false,
  },
};

export default webpackProdConfig;
