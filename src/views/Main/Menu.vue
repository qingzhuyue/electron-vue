<!--
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-13 22:28:17
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-13 22:32:38
 * @FilePath: /Electron/src/views/Main/Menu.vue
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
-->
<template>
    <el-menu :default-active="defaltActive" class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened router
        @select="handleSelect" @open="handleOpen" @close="handleClose" background-color="#191a23"
        text-color="hsla(0,0%,100%,.7)" active-text-color="#fff">
        <menu-item v-for="item in menuList" :key="item.index" :item="item"></menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
import { computed, reactive, watch } from "vue";
import MenuItem from "./MenuItem.vue";
import { forIndexGetTitle } from "@/util";
// 存储菜单index对应标题，用于面包屑回显
const menuMap: any = {};
// 状态管理
const menuStore = [];
// 菜单展开/隐藏
// const isCollapse = computed(() => menuStore.getIsCollapse);
// 菜单默认选中项
// const defaltActive = computed(() => menuStore.getDefaltActive);
// 获取菜单数据
const menuList = computed(() => menuStore.getMenuList);
// 循环获取 title
const loopGetTitle = (data: any[]) => {
    for (var i = 0; i < data.length; i++) {
        let o = data[i];
        menuMap[o.index] = o;
        if (o.children && o.children.length) {
            loopGetTitle(o.children);
        }
    }
};

watch(
    menuList,
    (val) => {
        loopGetTitle(val);
        // menuStore.setMenuMap(menuMap);
    },
    {
        immediate: true,
        deep: true,
    }
);

const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath);
};
const handleSelect = (
    index: string,
    indexPath: string[],
    item: any,
    routeResult: boolean
) => {
    // console.log(index, indexPath, item, routeResult);
    let breadArr = <any>[];
    indexPath.forEach((r) => {
        if (menuMap[r]) {
            breadArr.push(menuMap[r]);
        }
    });
    // menuStore.setBreadList(breadArr);
    // menuStore.setDefaltActive(index);
    // menuStore.addTag(index);
};

const browserHandle = (e: any) => {
    let path = e.state.current;
    if (path.includes("/redirect")) return;
    let arr = [] as any;
    // forIndexGetTitle(menuList.value, path, arr);
    // menuStore.setBreadList(arr);
    // menuStore.setDefaltActive(path);
    // menuStore.addTag(path);
};

// 监听浏览器前进 后退
window.addEventListener("popstate", (e) => browserHandle(e));
</script>
  
<style lang="scss" scoped>
.el-menu-vertical-demo {
    border-top: solid 1px var(--el-menu-border-color);
    border-right: none;
    height: calc(100% - 60px);

    :deep(.el-menu-item.is-active) {
        background-color: var(--color-menu-active-bg);
    }
}
</style>
  