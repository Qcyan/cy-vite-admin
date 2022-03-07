/**
 * 自定义 request 网络请求工具,基于axios
 * @author LiQingSong
 */
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notification } from "ant-design-vue";
import router from '@/router/index';
import settings from '@/config/settings';
import { getToken, setToken } from '@/utils/localToken';
import { errorHandler } from './errorHandle'

export interface ResponseData {
    code: number;
    data?: any;
    msg?: string;
    token?: string;
}


/**
 * 配置request请求时的默认参数
 */
const request = axios.create({
    baseURL: import.meta.env.VUE_APP_APIHOST, // url = api url + request url
    withCredentials: true, // 当跨域请求时发送cookie
    timeout: 0 // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

// 全局设置 - post请求头
// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * 请求前
 * 请求拦截器
 */
request.interceptors.request.use(
    async (config: AxiosRequestConfig & { cType?: boolean }) => {

        // 如果设置了cType 说明是自定义 添加 Content-Type类型 为自定义post 做铺垫
        if (config['cType']) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }

        // 自定义添加token header
        const headerToken = await getToken();
        if (headerToken) {
            config.headers[settings.ajaxHeadersTokenKey] = headerToken;
        }

        return config;
    },
    /* error=> {} */ // 已在 export default catch
);

/**
 * 请求后
 * 响应拦截器
 */
request.interceptors.response.use(
    async (response: AxiosResponse) => {

        const res: ResponseData = response.data;
        const { code, token } = res;

        // 自定义状态码验证
        if (code !== 0) {
            return Promise.reject({
                response,
                message: 'CustomError',
            });
        }

        // 重置刷新token
        if (token) {
            await setToken(token);
        }

        return response;
    },
    /* error => {} */ // 已在 export default catch
);

export default function (config: AxiosRequestConfig): AxiosPromise<any> {
    return request(config).then((response: AxiosResponse) => response.data).catch(error => errorHandler(error));
}
