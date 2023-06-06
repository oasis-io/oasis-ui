import service from "@/utils/request";


export interface Instance {
    name: string,
    type: string,
    host: string,
    port: string,
    user: string,
    password: string,
}

export const getInstanceList = (data: any) => {
    return service({
        url: `/instance/list`,
        method: 'post',
        data: data
    })
}

export const getIns = (data: any) => {
    return service({
        url: `/instance`,
        method: 'post',
        data: data
    })
}

export const createIns = (data: any ) => {
    return service({
        url: `/instance/add`,
        method: 'post',
        data: data
    })    
}

export const updateIns = (data: any) => {
    return service({
        url: `/instance`,
        method: 'patch',
        data: data
    })
}

export const deleteIns = (data: any ) => {
    return service({
        url: `/instance`,
        method: 'delete',
        data: data
    })    
}

export const pingIns = (data: any) => {
    return service({
        url: `/instance/ping`,
        method: 'post',
        data: data
    })
}