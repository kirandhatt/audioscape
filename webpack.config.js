import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAIN_ENTRY_POINT = './electron/main.js';
const RENDERER_ENTRY_POINT = './src/main.jsx';

export default (env, argv) => {
  const isElectronMain = argv.target === 'electron-main';

  return {
    entry: isElectronMain 
      ? { main: MAIN_ENTRY_POINT, preload: './electron/preload.js' }
      : RENDERER_ENTRY_POINT,
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isElectronMain ? '[name].js' : 'renderer.js'
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
    
    devtool: 'source-map'
  };
};