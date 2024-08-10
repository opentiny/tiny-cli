const {resolve} = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rspack = require('@rspack/core');
const {configDotenv,parse} = require('dotenv');
const { default: importMetaLoader } = require('import-meta-loader');
configDotenv({
  path:'./.env'
})

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: './src/main.ts',
  },
  experiments: {
    css: true
  },
  plugins:[
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      'import.meta.env.VITE_CONTEXT': '"/vue-pro/"',
      'import.meta.env.VITE_BASE_API': '"/api"',
      'import.meta.env.VITE_SERVER_HOST': '"http://127.0.0.1:3000"',
      'import.meta.env.VITE_MOCK_HOST': '"http://127.0.0.1:8848"',
      'import.meta.env.VITE_USE_MOCK': 'false',
      'import.meta.env.VITE_MOCK_IGNORE': '"/api/user/userInfo,/api/user/login,/api/user/register,/api/employee/getEmployee"',
      'import.meta.env.VITE_MOCK_SERVER_HOST': '"/mock"',
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy:[
      {
        context: [process.env.VITE_BASE_API],
        target: process.env.VITE_SERVER_HOST,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      {
        context: [process.env.VITE_MOCK_SERVER_HOST],
        target: process.env.VITE_MOCK_HOST,
        changeOrigin: true,
        pathRewrite:{
          '^/mock': ''
        }
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.ts$/,
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
        type: 'css',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
            options:{
              additionalData: `@import "${resolve('./src/assets/style/breakpoint.less')}";`
            }
          },
        ],
        type: "css"
      },
      {
        test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{
          filename:'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{
          filename:'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{
          filename:'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'assets': resolve(__dirname, 'src/assets'),
      'vue-i18n$': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
      'vue$': 'vue/dist/vue.esm-bundler.js'
    },
    extensions: ['.ts', '.js', '.vue'],
  },
}
module.exports = config;
