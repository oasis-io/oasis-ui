import { User } from '@/api/user';
import { defineStore } from "pinia";
import { login, getUserInfo, LoginParams } from "@/api/user";
import router from '@/router/index'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({
        username: '',
        roles: {},
    })

    // 如果前面的命令为真，在后面的命令不会执行
    const token = ref(window.localStorage.getItem('token') || '')
 
    const setUserInfo = (val: any) => {
        userInfo.value = val
    }

    const setToken = (val: string) => {
        token.value = val
    }

    // 通过 watch 来响应数据的变化,监听token, 达到持久化保存
    watch(token, () => {
        window.localStorage.setItem('token', token.value)
    })   

    const GetUserInfo = async() => {
        const res = await getUserInfo()
        if (res.status === 200) {
          setUserInfo(res.data.user)
        }
        return res
    }   
    
    const ClearStorage = async() => {
        token.value = ''
        sessionStorage.clear()
        localStorage.clear()
    }    

    // Login
    const LoginIn = async (user: LoginParams) => {
        const res = await login(user)
        if (res.status === 200) {
            setUserInfo(res.data.user)
            setToken(res.data.data.token)
            router.push({ name: "Home" })
            ElMessage.success('Login success!');
        } else {
            ElMessage.error('Username or password is error!')
        }
    }

    // Login Out
    const LoginOut = async () => {
        token.value = ''
        sessionStorage.clear()
        localStorage.clear()
        router.push({ name: 'Login', replace: true })
        window.location.reload()
    }

    return {
        userInfo,
        token,
        setToken,
        GetUserInfo,
        LoginIn,
        LoginOut,
        ClearStorage,
    }

})



export default useUserStore