import service from "@/utils/request";

export interface sql {
    mysql: string
}

export const myQuery = (data: any ) => {
    return service({
        url: `/sql/query`,
        method: 'post',
        data: data
    })    
}