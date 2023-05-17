import service from "@/utils/request";


export const asyncMenu = () => {
    return service({
        url: `/menu`,
        method: 'post',
    })
}