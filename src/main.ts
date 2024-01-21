/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-03 08:59:21
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-24 12:21:43
 * @FilePath: /electron-vue/src/main.ts
 * @Description:
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store/index.js";
import request from './service/request.js';

import './style.css'

const app  = createApp(App);

app.config.globalProperties.request = request;
app.use(router).use(store).mount('#app')
