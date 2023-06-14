import { defineStore } from "pinia";
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
    // 设置初始值为 false
    const isCollapse = ref(false)

    // 切换 isCollapse 的值
    const handleCollapse = () => {
        isCollapse.value = !isCollapse.value;
    }

	// watch(isCollapse, () => {
    //     window.localStorage.setItem('isCollapse', String(isCollapse.value));
    // });

    return {
        isCollapse,
        handleCollapse,
    }
})

export default useSidebarStore;
