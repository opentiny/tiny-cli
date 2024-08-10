const {resolve} = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const {configDotenv,parse} = require('dotenv');
configDotenv({
  path:'./.env'
})
module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.ts'
  },
  output: {
    path: resolve(__dirname, 'dist'), // 打包后的文件输出的目录
    filename: `js/[name]_[chunkhash:8].js`, // 设置打包后的 js 文件名，如果在文件名前增加文件路径，会将打包后的 js 文件放在指定的文件夹下
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ts)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            },
          },
          {
            loader: 'import-meta-loader',
            options: {
            }
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
                patterns: resolve(__dirname,'src/assets/style/breakpoint.less')
            }
          }
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
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
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'index.html'),
      filename: 'index.html',
      chunks: ['main'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new DefinePlugin({
      'process.env': JSON.stringify({ ...process.env }),
      'import.meta.env': '""',
      'import.meta.env.VITE_CONTEXT': '"/vue-pro/"',
      'import.meta.env.VITE_BASE_API': '"/api"',
      'import.meta.env.VITE_SERVER_HOST': '"http://127.0.0.1:3000"',
      'import.meta.env.VITE_MOCK_HOST': '"http://127.0.0.1:8848"',
      'import.meta.env.VITE_USE_MOCK': 'false',
      'import.meta.env.VITE_MOCK_IGNORE': '"/api/user/userInfo,/api/user/login,/api/user/register,/api/employee/getEmployee"',
      'import.meta.env.VITE_MOCK_SERVER_HOST': '"/mock"',

    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'assets': resolve(__dirname, 'src/assets'),
      'vue-i18n$': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
      'vue$': 'vue/dist/vue.esm-bundler.js'
    },
    extensions: ['.ts', '.js', '.vue'],
  },
  cache: {
    type: 'filesystem',
  },
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
  }
}
