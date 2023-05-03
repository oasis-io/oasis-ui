import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from "vue-router";



export const useRouterStore = defineStore('router', () => {
    const asyncRouters = ref(
       {
        permissions: [] as string[]
       }
    )
    const router = useRouter();

 

    // 从后台获取路由
    const SetAsyncRouter = async(permiss: string[]) => {
        asyncRouters.value.permissions = permiss;
    }

    
return {
    asyncRouters,
    SetAsyncRouter,
}

})



export default useRouterStore