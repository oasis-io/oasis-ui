<template>
    <div ref="editor" style="height: 400px" class="editor"></div>
  </template>
  
  <script setup lang="ts">
import { onMounted, ref } from 'vue';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-monokai';

let editor = ref();

onMounted(() => {
  editor.value = ace.edit(editor.value, {
    theme: 'ace/theme/monokai',
    mode: 'ace/mode/sql',
  });
});

const getValue = () => {
  return editor.value.getValue();
};

const setEditorValue = (value: string) => {
  editor.value.setValue(value);
};

defineExpose({
  getValue,
  setEditorValue,
});
</script>
