import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import createHtmlPlugin from 'vite-plugin-html';
import path from 'path';
import UnoCssConfig from './uno.config';
import AutoComponents from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Markdown from 'vite-plugin-md';
import { MdExt, mdInstall } from './md.extend.config';

export default defineConfig({
  envDir: './env',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx({
      include: [/\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
    }),
    createHtmlPlugin({
      inject: {
        data: {
        },
      },
    }),
    // 支持md转为vue组件：   https://github.com/antfu/vite-plugin-md#configuration--options
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        mdInstall(md);
      },
      markdownItUses: MdExt,
    }),
    Unocss(UnoCssConfig),
    // 自动导入和项目组件   https://github.com/antfu/unplugin-vue-components#configuration
    AutoComponents({
      resolvers: [NaiveUiResolver()],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
  base: '/tiny-ng/', // TODO: 此处待修改为命令行
  resolve: {
    alias: {
      '@': path.resolve('src'),
      '@demos': path.resolve('node_modules/@huawei/tinydoc-ng-tiny'),
      '@style.css': path.resolve('node_modules/@huawei/tinydoc-ng-tiny/scripts/assets/theme/basic-var.min.css'),
      '@demo': path.resolve('src/views/components/demo.vue'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3101,
    fs: {
      allow: ['..'],
    },
  },
});
