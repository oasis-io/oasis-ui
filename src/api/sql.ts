import service from "@/utils/request";

export interface sql {
    sql: string
}

export const myQuery = (data: sql ) => {
    return service({
        url: `/sql/query`,
        method: 'post',
        data: data
    })    
}

