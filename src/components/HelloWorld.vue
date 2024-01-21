<!--
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-03 08:59:21
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-09 23:58:28
 * @FilePath: /Electron/src/components/HelloWorld.vue
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
-->
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
