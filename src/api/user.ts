import service from "@/utils/request";


export interface LoginParams {
    username: string;
    password: string;
}

export interface Username {
    username: string;
}

export interface User {
    username: string;
    password: string;
    email: string;
    phone: string;
}

export interface Role {
    name: string;
}


export interface UserGroup {
    name: string;
}

export const login = (data: any) => {
    return service({
        url: `/user/login`,
        method: 'post',
        data: data
    })
}


export const getUserInfo = () => {
    return service({
        url: `/user`,
        method: 'get',
    })
}

// User List
export const register = (data: User) => {
    return service({
        url: `/user/register`,
        method: 'post',
        data: data
    })    
}


export const getUser = (data: any) => {
    return service({
        url: `/user`,
        method: 'post',
        data: data
    })
}

export const getUserList = (data: any) => {
    return service({
        url: `/user/list`,
        method: 'post',
        data: data
    })
}

export const createUser = (data: User ) => {
    return service({
        url: `/user/add`,
        method: 'post',
        data: data
    })    
}

export const updateUser = (data: any) => {
    return service({
        url: `/user`,
        method: 'patch',
        data: data
    })
}

export const deleteUser = (data: any ) => {
    return service({
        url: `/user`,
        method: 'delete',
        data: data
    })
}    


export const updatePassword = (data: any ) => {
    return service({
        url: `/user/password`,
        method: 'patch',
        data: data
    })
}   

// User Role
export const getRoles = () => {
    return service({
        url: `/user/role`,
        method: 'get',
    })
}


export const getRoleList = (data: any) => {
    return service({
        url: `/user/role/list`,
        method: 'post',
        data: data
    })
}

export const createRole = (data: any ) => {
    return service({
        url: `/user/role/add`,
        method: 'post',
        data: data
    })    
}

export const updateRole = (data: any) => {
    return service({
        url: `/user/role`,
        method: 'patch',
        data: data
    })
}

export const deleteRole = (data: any ) => {
    return service({
        url: `/user/role`,
        method: 'delete',
        data: data
    })
}    


// User Group
export const getGroupList = (data: any) => {
    return service({
        url: `/group/list`,
        method: 'post',
        data: data
    })
}

export const createGroup = (data: any ) => {
    return service({
        url: `/group/add`,
        method: 'post',
        data: data
    })    
}

export const updateGroup = (data: any) => {
    return service({
        url: `/group`,
        method: 'patch',
        data: data
    })
}

export const deleteGroup = (data: any ) => {
    return service({
        url: `/group`,
        method: 'delete',
        data: data
    })
}        
    