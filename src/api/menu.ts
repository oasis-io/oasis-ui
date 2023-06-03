import service from "@/utils/request";

export const asyncMenu = () => {
  return service({
    url: `/menu`,
    method: "post",
  });
};

export const getBaseMenuTree = () => {
  return service({
    url: "/menu/getBaseMenuTree",
    method: "post",
  });
};


export const getMenuAuthorized = (data: any) => {
  return service({
    url: '/menu/getMenuAuthorized',
    method: 'post',
    data
  })
}

export const AddMenuPermissions = (data: any) => {
  return service({
    url: "/menu/permissions",
    method: "post",
    data,
  });
};

// API
export const getBaseMenuApi = () => {
    return service({
      url: "/menu/getBaseMenuApi",
      method: "post",
    });
  };
  
  export const AddApiPermissions = (data: any) => {
    return service({
      url: "/menu/api",
      method: "post",
      data,
    });
  };