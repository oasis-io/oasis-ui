import service from "@/utils/request";


export interface Instance {
    name: string,
    type: string,
    host: string,
    port: string,
    user: string,
    password: string,
}


export const getInstanceName = () => {
    return service({
        url: `/instance/name`,
        method: 'get',
    }) 
}

export const getInstanceDatabase = (data: any) => {
    return service({
        url: `/instance/database`,
        method: 'post',
        data: data,
    }) 
}


export const getInstanceList = (data: any) => {
    return service({
        url: `/instance/list`,
        method: 'post',
        data: data
    })
}

export const getInstance = (data: any) => {
    return service({
        url: `/instance`,
        method: 'post',
        data: data
    })
}

export const createInstance = (data: any ) => {
    return service({
        url: `/instance/add`,
        method: 'post',
        data: data
    })    
}

export const updateInstance = (data: any) => {
    return service({
        url: `/instance`,
        method: 'patch',
        data: data
    })
}

export const updateInstancePassword = (data: any ) => {
    return service({
        url: `/instance/password`,
        method: 'patch',
        data: data
    })
}   

export const deleteInstance = (data: any ) => {
    return service({
        url: `/instance`,
        method: 'delete',
        data: data
    })    
}

export const pingInstance = (data: any) => {
    return service({
        url: `/instance/ping`,
        method: 'post',
        data: data
    })
}