const pathModule = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode:"production",
    entry:"./src/index.js",
    output:{
        filename:"bundle.js",
        path:pathModule.resolve(__dirname,"dist"),
        assetModuleFilename: 'images/[name][ext]'
       
    },
    module:{
        rules: [
            //css files
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
          ],
    },
    plugins:[
      new HtmlWebpackPlugin({template:"src/main.html"}),
      new MiniCssExtractPlugin({filename:"style.min.css"})

    ],
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["mozjpeg",{ quality: 60}],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      convertShapeToPath: {
                        convertArcs: true
                      },
                      convertPathData: false
                    }
                  }
            }
              ],
            ],
          },
        },
      }),
    ],
     
    },
          
       
}