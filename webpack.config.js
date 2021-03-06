const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: './dist/',
    filename: './index.js'
  },
  module: {  
    rules: [
      {
        test:/\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]-[hash:base64:5]'
        ]
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
            }
          }, {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, 'src/assets/style/global.scss'),
              ]
            },
          }]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/'
        }
      },
      {
        test: /.tsx?$/,
        loaders: ['ts-loader'],
        include: [
            path.resolve(__dirname, 'src')
        ]
      }
    ]  
  },  
  resolve: {  
      extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.json']  
  } ,
  plugins: [
    new WebpackPwaManifest({
      name: 'VisualDota',
      short_name: 'DotaV',
      start_url: '/',
      description: 'An isomorphic progressive dota info app built by React',
      orientation: 'any',
      background_color: '#333',
      theme_color: '#333',
      filename: 'manifest.json',
      publicPath: './',
      icons: [
        {
          src: path.resolve('./', 'icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: path.join('icons')
        }
      ],
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    // new uglify()
  ]
}