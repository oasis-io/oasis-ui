<template>
    <div ref="editorRef" class="monaco-editor"></div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as monaco from 'monaco-editor';
import { format } from 'sql-formatter';

const editorRef = ref<HTMLElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

onMounted(() => {
    editor = monaco.editor.create(editorRef.value!, {
        value: '',
        language: 'sql',
        theme: 'vs',
        fontSize: 14,            // 调整字体大小
        lineHeight: 22,          // 调整行高
        wordWrap: 'on',          // 启用自动换行        
        automaticLayout: true, 
        lineNumbersMinChars: 2,
        minimap: { enabled: false },  // 关闭滚动预览条
        renderLineHighlight: 'none',
        scrollBeyondLastLine: true, // 阻止编辑器滚动到最后一行之外
    });
});

// 获取编辑器的值
const getValue = () => {
    return editor?.getModel()?.getValue() || '';
};


// 设置值能回退
const setEditorValue = (value: string) => {
    if (editor) {
        const model = editor.getModel();
        if (model) {
            const fullRange = model.getFullModelRange();
            editor.executeEdits(null, [
                {
                    range: fullRange,
                    text: value,
                },
            ]);
        }
    }
};

// 格式化SQL
const formatCode = () => {
    if (editor) {
        const model = editor.getModel();
        if (model) {
            const fullText = model.getValue();
            const formatted = format(fullText, { language: 'mysql', keywordCase: 'upper', useTabs: true }); 
            setEditorValue(formatted);
        }
    }
};


defineExpose({
    setEditorValue,
    formatCode,
    getValue,
});
</script>



<style>
.monaco-editor {
    width: 100%;
    height: 400px;
}
</style>