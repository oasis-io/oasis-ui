import useUserStore from '@/store/user';
import axios from 'axios';



const service = axios.create({
    baseURL: 'http://127.0.0.1:9590/v1',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
})


service.interceptors.request.use(
    (config) => {
        const userStore = useUserStore()
        config.headers['x-token'] = userStore.token
        config.headers['x-username'] = userStore.userInfo.username
        return config
    },
    (error) => {
        console.log("request error！")
        return error
    }
)


service.interceptors.response.use(
    (response) => {
        const userStore = useUserStore()

        if (response.headers['new-token']) {
            userStore.setToken(response.headers['new-token'])
        }
        
        return response
    },
    (error) => {
        console.log("response error！")
        return error
    }
)



export default service

