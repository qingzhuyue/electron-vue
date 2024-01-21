<template>
  <a-alert :message="`今日: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`"/>
  <a-calendar v-model:value="tagetDate" @select="onSelect" @panelChange="onPanelChange">
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <a-badge :status="item.type" :text="item.content"/>
        </li>
      </ul>
    </template>
  </a-calendar>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import 'dayjs/locale/zh-cn';
import dayjs, {Dayjs} from 'dayjs';
const date = ref(dayjs('2017-01-25'));
const selectedValue = ref(dayjs(Date.now()));
const tagetDate = ref<Dayjs>();
const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 2:
      listData = [
        {type: 'warning', content: ''},
        {type: 'success', content: 'This is usual event.'},
      ];
      break;
    case 10:
      listData = [
        {type: 'warning', content: 'This is warning 4545645.'},
        {type: 'success', content: 'This is usual event.'},
        {type: 'error', content: 'This is error event.'},
      ];
      break;
    case 15:
      listData = [
        {type: 'warning', content: 'This is warning event'},
        {type: 'success', content: 'This is very long usual event。。....'},
        {type: 'error', content: 'This is error event 1.'},
        {type: 'error', content: 'This is error event 2.'},
        {type: 'error', content: 'This is error event 3.'},
        {type: 'error', content: 'This is error event 4.'},
      ];
      break;
    default:
  }
  return listData || [];
};

const onSelect = (value: Dayjs) => {
  date.value = value;
  window?.electron?.ipcRenderer?.selectDate(JSON.stringify(value))
  selectedValue.value = value;
};
const onPanelChange = (value: Dayjs) => {
  date.value = value;
};
let alertOnlineStatus = function() {
  console.log("网络状态：",navigator.onLine)
};
console.log(window)
window?.electron?.ipcRenderer?.returnInfo(res=>{
  console.log("主进程返回的消息",res)
})
window.addEventListener('online',  alertOnlineStatus);
window.addEventListener('offline',  alertOnlineStatus);

alertOnlineStatus();
</script>

