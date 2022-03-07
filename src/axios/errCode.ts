export const customCodeMessage: { [key: number]: string } = {
    10002: '当前用户登入信息已失效，请重新登入再操作', // 未登陆
};

export const serverCodeMessage: { [key: number]: string } = {
    200: '服务器成功返回请求的数据',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: '服务器发生错误，请检查服务器(Internal Server Error)',
    502: '网关错误(Bad Gateway)',
    503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
    504: '网关超时(Gateway Timeout)',
};
