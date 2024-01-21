<!--
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-03 08:59:21
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-11-17 00:29:52
 * @FilePath: /electron-vue/src/views/Home/Home.vue
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
-->
<script setup lang="ts">
console.log("window", window.electron)
const openFile = () => {
  console.log("打开文件")
  window.electron.ipcRenderer.openFile()
}
</script>

<template>
  <a-button type="primary" @click="openFile">打开文件</a-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
