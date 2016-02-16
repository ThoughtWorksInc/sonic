import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'

const baseConfig = {
  target: 'web',
  cache: true,
  entry: {
    index: ['./src/index']
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?cacheDirectory', 'eslint'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          'postcss-loader'
        )
      }, {
        test: /\.module\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
        ]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist/assets/'),
    filename: '[name].js',
    pathInfo: false
  },
  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: false }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  externals: [],
  postcss() {
    return [autoprefixer({ browsers: ['> 5%'] })];
  }
}
const config = Object.assign({}, baseConfig)

if (process.env.NODE_ENV === 'development') {
  config.debug = true
  config.entry.index.unshift(
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server'
  )
  config.devtool = 'cheap-module-eval-source-map'
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  )
  config.devServer = {
    contentBase: './dist',
    publicPath: '/assets/',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    noInfo: false
  }
} else {
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

export default config
