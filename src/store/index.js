/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-10 23:53:43
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-13 22:25:47
 * @FilePath: /Electron/src/store/index.js
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { createStore } from "vuex";

export default createStore({
    state: {
        info: { name: "duxin" },
        menuMap: {}, // 存储菜单index对应标题，用于面包屑回显
        menuList: [], // 菜单列表
        isCollapse: false, // 菜单是否折叠
        defaltActive: '', // 菜单默认选中项
        breadList: [], // 面包屑集合
        tagList: [], // 选项卡集合
    },// 初始数据
    
    mutations: {

    }, // 修改数据的方法
})