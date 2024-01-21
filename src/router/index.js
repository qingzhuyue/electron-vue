/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-09 00:09:43
 * @LastEditors: weiyy26445 weiyy26445@yunrong.cn
 * @LastEditTime: 2023-11-21 23:53:56
 * @FilePath: /electron-vue/src/router/index.js
 * @Description:
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { createRouter, createMemoryHistory } from "vue-router";

const routes = [{
    path: '/',
    name: 'main',
    component: () => import("../views/Edit/EditFile.vue"),
    // redirect: '/home',
    // children:[
    //     {
    //         path: '/home',
    //         name: 'home',
    //         meta: {
    //           keepAlive: false,
    //           transition: '',
    //           affix: true,
    //         },
    //         component: () => import('@/views/Home/Home.vue')
    //       },
    // ]
}];

const router = createRouter({
    history: createMemoryHistory(import.meta.env.BASE_URL),
    routes
})

export default router
