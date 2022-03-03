import request from '@/axios/index';

/**
 * 获取店铺列表信息
 * @param params
 */
export function getShopList(params: object): Promise<any> {
    return request({
        url: '/orderPdd/shopApi/getShopList',
        method: 'get',
        params
    });
}

/**
 * 获取店铺列表信息
 * @param params
 */
export function getShopListByPageParam(params: object): Promise<any> {
    return request({
        url: '/orderPdd/shopApi/getShopListByPageParam',
        method: 'get',
        params
    });
}

/**
 * 删除店铺
 * @param data
 */
export function deleteShop(data: object): Promise<any> {
    return request({
        url: '/orderPdd/shopApi/deleteShop',
        method: 'post',
        data
    });
}

/**
 * 切换店铺
 * @param params
 */
export function changeMainShop(params: object): Promise<any> {
    return request({
        url: '/orderPdd/shopApi/changeMainShop',
        method: 'get',
        params,
        loading: true,
        loadingTip: '正在为您切换店铺'
    });
}


/**
 * 添加账号手机号码
 * @param params
 */
export function addMobile(params: object): Promise<any> {
    return request({
        url: '/orderPdd/accountApi/addMobile',
        method: 'post',
        data: params
    });
}


/**
 * 查询当前账号是否有手机号码
 * @param params
 */
export function isHasMobile(params: object): Promise<any> {
    return request({
        url: '/orderPdd/accountApi/isHasMobile',
        method: 'get',
        params
    });
}


