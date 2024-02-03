import path from 'node:path';
import webpack, { Configuration, LoaderContext } from 'webpack';
import WebpackBar from 'webpackbar';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

function getCSSModuleLocalIdent(context: LoaderContext<any>, _localIdentName: string, localName: string) {
  const resourcePath = context.resourcePath.replace(/\\/g, '/');
  return `${resourcePath.split('/').slice(-5, -1).join('_')}__${localName}`;
}

const webpackBaseConfig: Configuration = {
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
  mode: 'development',
  target: 'web',
  entry: {
    app: [path.resolve(process.cwd(), './src/index.tsx')],
  },
  output: {
    globalObject: 'this',
    path: path.resolve(process.cwd(), './dist'),
    publicPath: '/',
    pathinfo: !isProduction,
    filename: 'statics/scripts/[name]-[chunkhash:8].js',
    chunkFilename: 'statics/scripts/[name]-[chunkhash:8].chunk.js',
  },
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
                '@babel/preset-react', // https://babeljs.io/docs/en/babel-preset-react
                ['babel-preset-react-app', { flow: false, typescript: true }], // https://github.com/facebook/create-react-app#readme
              ],
              plugins: [],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          isDevelopment ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  require.resolve('postcss-flexbugs-fixes'),
                  [
                    require.resolve('postcss-preset-env'),
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.module\.less$/,
        exclude: /node_modules/,
        use: [
          isDevelopment ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  require.resolve('postcss-flexbugs-fixes'),
                  [
                    require.resolve('postcss-preset-env'),
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|bmp|gif)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10240,
          name: 'statics/assets/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  plugins: [
    new WebpackBar({
      name: 'Electron Render',
      profile: true,
    }),
    new webpack.DefinePlugin({}),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   openAnalyzer: true,
    //   analyzerPort: 'auto',
    //   reportTitle: `Main Process`,
    // }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin({
      cache: false,
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new StylelintPlugin({
      fix: true,
      cache: false,
      context: path.resolve(process.cwd(), './src'),
      files: ['**/*.(le|c)ss'],
      extensions: ['css', 'less'],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      publicPath: '/',
      template: path.resolve(process.cwd(), './public/index.html'),
      meta: {
        name: 'name',
        version: 'version',
      },
    }),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default webpackBaseConfig;
