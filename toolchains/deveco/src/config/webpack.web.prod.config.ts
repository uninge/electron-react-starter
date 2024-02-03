import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';

import webpackBaseConfig from '../config/webpack.web.base.config';

const config: Configuration = {
  bail: true,
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // new CopyWebpackPlugin({
    // 	patterns: [
    // 		{
    // 			from: paths.appWebPublicAssetsPath,
    // 			to: paths.appWebDistPath,
    // 			globOptions: {
    // 				ignore: ['**/favicon.ico', '**/index.html'],
    // 			},
    // 			noErrorOnMissing: false,
    // 		},
    // 	],
    // }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: 'statics/styles/[name].[contenthash:8].css',
      chunkFilename: 'statics/styles/[name].[contenthash:8].chunk.css',
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    runtimeChunk: {
      name: (entrypoint: { name: string }) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      new TerserWebpackPlugin({
        exclude: /\.min\.js$/,
        parallel: true,
        extractComments: true,
        terserOptions: {
          compress: {
            ecma: 5,
            inline: 2,
            unused: true,
            comparisons: false,
            drop_console: true,
            drop_debugger: true,
          },
          keep_classnames: true,
          keep_fnames: true,
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerWebpackPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
};

const webpackProdConfig = merge(webpackBaseConfig, config);
export default webpackProdConfig;
