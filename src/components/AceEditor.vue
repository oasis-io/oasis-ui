<template>
  <div ref="editor" class="ace-editor"></div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-textmate';
import { format } from 'sql-formatter';

let editor = ref();

onMounted(() => {
  editor.value = ace.edit(editor.value, {
    theme: 'ace/theme/textmate',  // 主题
    mode: 'ace/mode/sql',
    maxLines: 40,
    minLines: 20,
    fontSize: 14,
    tabSize: 4,
    showPrintMargin: false, // 隐藏打印边界
    cursorStyle: 'ace', // 光标样式
    highlightActiveLine: false, // 高亮当前行
  });
});

// 获取编辑器的值
const getValue = () => {
  return editor.value.getValue();
};

// 设置值能回退
const setEditorValue = (value: string) => {
  editor.value.setValue(value);
};

// 格式化SQL
const formatCode = () => {
  if (editor.value) {
    const fullText = editor.value.getValue();
    const formatted = format(fullText, { language: 'mysql', keywordCase: 'upper', useTabs: true });
    setEditorValue(formatted);  // 将格式化后的内容设置回编辑器
  }
};

defineExpose({
  getValue,
  formatCode,
  setEditorValue,
});
</script>
