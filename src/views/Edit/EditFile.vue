<template>
  <a-button type="primary" @click="onSelectFile">选择文件</a-button>
  <div class="edit-container">
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
          style="border-bottom: 1px solid #ccc"
      />
      <Editor
          :defaultConfig="editorConfig"
          :mode="mode"
          v-model="valueHtml"
          style="height: 400px; overflow-y: hidden"
          @onCreated="handleCreated"
          @onChange="handleChange"
          @onDestroyed="handleDestroyed"
          @onFocus="handleFocus"
          @onBlur="handleBlur"
          @customAlert="customAlert"
          @customPaste="customPaste"
      />
    </div>
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue';
import {Editor, Toolbar} from '@wangeditor/editor-for-vue';

window.electron.ipcRenderer.getAppVersion((res) => {
  console.log("主进程发送的版本信息", res)
});
window.electron.ipcRenderer.getFilePath((filePath) => {
  console.log("文件路径", filePath)
});

export default {
  components: {Editor, Toolbar},
  setup() {
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref('<p></p>');

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      window.electron.ipcRenderer.getFileContent((data) => {
        console.log("文件内容", data)
        if(data){
          valueHtml.value = `<p>${data}</p>`
        }
      })
    });

    const toolbarConfig = {};
    const editorConfig = {placeholder: '请输入内容...'};

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.destroy();
    });

    // 编辑器回调函数
    const handleCreated = (editor) => {
      console.log('created', editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor) => {
      console.log('change:', editor.getHtml());
    };
    const handleDestroyed = (editor) => {
      console.log('destroyed', editor);
    };
    const handleFocus = (editor) => {
      console.log('focus', editor);
    };
    const handleBlur = (editor) => {
      console.log('blur', editor);
    };
    const customAlert = (info, type) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    const customPaste = (editor, event, callback) => {
      console.log('ClipboardEvent 粘贴事件对象', event);

      // 自定义插入内容
      editor.insertText('xxx');

      // 返回值（注意，vue 事件的返回值，不能用 return）
      callback(false); // 返回 false ，阻止默认粘贴行为
      // callback(true) // 返回 true ，继续默认的粘贴行为
    };

    const insertText = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.insertText('hello world');
    };

    console.log(window)
    const onSelectFile = () => {
      console.log("选择文件")
      window.electron.ipcRenderer.openFile()
    };


    return {
      editorRef,
      mode: 'default',
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      onSelectFile,
    };
  },
};
</script>

<style>
.edit-container {
  width: 80%;
  margin: 20px auto;
}
</style>
