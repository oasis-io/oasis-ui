<template>
    <el-form>
        <el-form-item>
            <el-button icon="CaretRight" type="primary" text @click.prevent="codeSubmit">执行</el-button>
        </el-form-item>
        <el-form-item>
            <AceEditor ref="aceEditorRef" />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AceEditor from "@/components/AceEditor.vue";

let aceEditorRef = ref();

const codeSubmit = () => {
    const sql = aceEditorRef.value?.getValue();
    console.log(sql)
}
</script>
  