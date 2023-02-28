import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
    plugins: [
      eslint({
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConig
);
