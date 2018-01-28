const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === "test") {
  require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === "development") {
  require('dotenv').config({ path: '.env.development' })
}

module.exports = (env) => {
  const isProduction = (env === 'production')
  const CSSExtract = new ExtractTextPlugin('styles.css')
  //console.log('env:', env)

  return {
    entry: ['babel-polyfill', './src/app.js'],
    //entry: './playground/redux-expensify.js',
    //entry: './playground/hoc.js',
  
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
  
    module: {
      rules:[
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
          /*
          // either below or .babelrc config file. the below does not work with Jest tests
          query: { 
            "presets": ["env","react"],
            "plugins": ["transform-class-properties", "transform-object-rest-spread"]
          }
          */
        }, {
          test: /\.s?css$/,
          //use: ['style-loader', 'css-loader', 'sass-loader'] // if extract-text plugin not used
          use: CSSExtract.extract({
            use: [
              {loader: 'css-loader'   , options: {sourceMap: true}}, 
              {loader: 'sass-loader'  , options: {sourceMap: true}}
            ]
          })
        }
      ]
    },
  
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],

    // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
  
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  
    //watch: true
  
  }
}
