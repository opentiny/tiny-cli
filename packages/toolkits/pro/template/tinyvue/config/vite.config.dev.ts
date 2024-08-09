import { mergeConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

const proxyConfig = {
  [loadEnv('', process.cwd()).VITE_BASE_API]: {
    target: loadEnv('', process.cwd()).VITE_SERVER_HOST,
    changeOrigin: true,
    logLevel: 'debug',
    rewrite: (path: string) =>
      path.replace(
        new RegExp(`${loadEnv('', process.cwd()).VITE_BASE_API}`),
        ''
      ),
  },
  [loadEnv('', process.cwd()).VITE_MOCK_SERVER_HOST]: {
    target: loadEnv('', process.cwd()).VITE_MOCK_HOST,
    changeOrigin: true,
    rewrite: (path:string) => path.replace(/^\/mock/, '')
  }
};
export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      proxy: {
        ...proxyConfig,
      },
    },
    plugins: [
      eslint({
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
