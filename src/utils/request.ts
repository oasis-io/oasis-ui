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
        return error
    }
)


service.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const userStore = useUserStore()
        if (error.response.data.code === 1002 ) {
            console.log("token is expired！")
            userStore.LoginOut()
        } 
       
        return error.response
    }
)



export default service

