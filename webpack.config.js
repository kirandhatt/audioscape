import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isElectronMain = argv.target === 'electron-main';

  return {
    entry: isElectronMain ? './electron/main.js' : './src/main.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isElectronMain ? 'main.js' : 'renderer.js'
    },
    target: isElectronMain ? 'electron-main' : 'electron-renderer',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    plugins: [],
    optimization: {
      minimize: false
    }
  };
};