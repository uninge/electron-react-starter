import { Configuration, DefinePlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

const webpackElectronProdConfig: Configuration = {
  cache: {
    // 1. 将缓存类型设置为文件系统
    type: 'filesystem',

    buildDependencies: {
      // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
      config: [__filename],

      // 3. 如果你有其他的东西被构建依赖，你可以在这里添加它们
      // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
    },
  },
  devtool: 'source-map',
  mode: 'production',
  // externals: isDevelopment ? [] : [...Object.keys(dependencies || {}), ...Object.keys(devDependencies || {})],
  module: {
    strictExportPresence: true,
  },
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
    alias: {},
  },
  plugins: [
    new WebpackBar({
      name: 'WebpackBar',
      profile: true,
    }),
    new DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
    // 	verbose: true,
    // }),
  ],
  // node: {
  // 	__dirname: true,
  // 	__filename: true,
  // },
};

export default webpackElectronProdConfig;
