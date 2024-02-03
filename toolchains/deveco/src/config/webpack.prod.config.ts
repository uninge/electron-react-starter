import path from 'node:path';
import { Configuration, DefinePlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface IConfiguration extends Configuration {
  entry: {
    index: string[];
    preload: string[];
  };
}

const webpackProdConfig: IConfiguration = {
  cache: false,
  devtool: 'source-map',
  mode: 'development',
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
    strictExportPresence: true,
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
  resolve: {
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
    __dirname: true,
    __filename: true,
  },
};

export default webpackProdConfig;
