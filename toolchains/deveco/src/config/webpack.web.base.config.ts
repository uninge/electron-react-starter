import path from 'node:path';
import webpack, { Configuration, LoaderContext } from 'webpack';
import { merge } from 'webpack-merge';
import WebpackBar from 'webpackbar';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import postcssNormalize from 'postcss-normalize';

import webpackBaseConfig from './webpack.base.config';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

function getCSSModuleLocalIdent(context: LoaderContext<any>, _localIdentName: string, localName: string) {
  const resourcePath = context.resourcePath.replace(/\\/g, '/');
  return `${resourcePath.split('/').slice(-5, -1).join('_')}__${localName}`;
}

const config: Configuration = {
  mode: 'production',
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
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(process.cwd(), './src'),
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
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
        test: /\.css$/,
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
                  postcssNormalize(),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
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
                  postcssNormalize(),
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
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  plugins: [
    new ESLintWebpackPlugin({
      cache: false,
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      eslintPath: require.resolve('eslint'),
      formatter: require.resolve('react-dev-utils/eslintFormatter'),
      lintDirtyModulesOnly: true,
    }),
    new StylelintPlugin({
      fix: true,
      files: ['**/*.(le|c)ss'],
      extensions: ['css', 'less'],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      publicPath: '/',
      favicon: path.resolve(process.cwd(), './public/favicon.ico'),
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

const webpackWebBaseConfig = merge(webpackBaseConfig, config);

export default webpackWebBaseConfig;
