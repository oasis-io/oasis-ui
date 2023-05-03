import router from '@/router'
import { useUserStore } from "@/store/user";
import asyncRouter from './router/modules/asyncRouter';
import useRouterStore from './store/router';



// router.beforeEach(async (to, from, next) => {
//     const userStore = useUserStore()
//     const token = userStore.token
    
//     if (to.name !== 'Login' && !token) {
//         next({ name: 'Login' })
//     } else {
//         if (token) {
//             await userStore.GetUserInfo()
//         }
//         next()
//     }
// })

const getRouter = async(userStore: any) => {
    const userPermissions = ["3","4","5"]

    const store = useRouterStore()

    store.SetAsyncRouter(userPermissions)
}