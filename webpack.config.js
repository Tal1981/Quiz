const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  entry
    : './src/js/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

  mode: 'development', //? عندما تنتهي من تطوير المشروع حول الى production
  devtool: 'source-map', //! تلك تساعد بابل على العمل بدونها لن يعمل

  module: {
    rules: [
      {//* أعداد بابل للعمل في ويب باك
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {//?  يعمل ملف سي اس اس ويكون ملف مستقل لها عن جافاسكريبت
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ //* لكي يعرف ويب باك اين هو ملف اش تي ام ال
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],

  devServer: {//* لكي يتم عمل live server on browser
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },

}