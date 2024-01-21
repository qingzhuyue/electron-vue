/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-01 00:39:52
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-24 01:13:02
 * @FilePath: /electron-vue/vite.config.ts
 * @Description:
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from "vite-plugin-electron";
import electronRenderer from "vite-plugin-electron-renderer";
import polyfillExports from "vite-plugin-electron-renderer";
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ViteComponents, {
  AntDesignVueResolver
} from 'vite-plugin-components';
import vitePluginImp from "vite-plugin-imp";

// 查找路径
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
const alias: Record<string, string> = {
  "@": pathResolve("src"),
};

// https://vitejs.dev/config/
export default defineConfig((mode: any) => ({
  base: mode == "development" ? "" : "./",
  plugins: [
    vue(),
    electron([{
      entry: "electron-main/index.ts", //主进程
    }, {
      entry: "electron-preload/preload.ts"
    }]),
    electronRenderer(),
    polyfillExports(),
    // 按需引入AntDesignVue
    // AutoImport({
    //   imports: ['vue', 'vue-router'],
    //   dts: "src/auto-import.d.ts",
    //   //ant-design-vue
    //   resolvers: [AntDesignVueResolver()]
    // }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    // ViteComponents({customComponentResolvers: [AntDesignVueResolver()],}),
    // 按需引入elementUI
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }), Components({
    //   resolvers: [ElementPlusResolver()],
    // })
  ],
  resolve: {
    alias,
  },
  build: {
    emptyOutDir: true, // outDir在root在根目录下，vite在构建的时候，会自动清空目录
    outDir: "dist-electron",
  }
}))
