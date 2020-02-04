import webpack from 'webpack';
import path from 'path';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const webpackconfiguration: webpack.Configuration = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  output: {
    filename: 'typescript-datastructures.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
    sourceMapFilename: 'typescript-datastructures.map',
    library: 'typescript-datastructures'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [{ test: /\.(ts|js)x?$/, use: ['babel-loader', 'source-map-loader'], exclude: /node_modules/ }]
  }
};

export default webpackconfiguration;
