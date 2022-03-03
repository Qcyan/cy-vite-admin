import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@/store/index'
import { setToken } from '@/utils/localToken'
import { errorHandler } from './errorHandle'

export interface ResponseData {
    code: number
    data?: any
    msg?: string
    token?: string
}

/**
 * 配置request请求时的默认参数
 */
const request = axios.create({
    baseURL: process.env.VUE_APP_API_HOST, // url = api url + request url
    withCredentials: true, // 当跨域请求时发送cookie
    timeout: 100000, // 请求超时时间,5000(单位毫秒) / 0 不做限制
    loading: false
})

/**
 * 请求拦截器
 */
request.interceptors.request.use(async (config: AxiosRequestConfig) => {
    return config
})

/**
 * 响应拦截器
 */
request.interceptors.response.use(async (response: AxiosResponse) => {
    /*  store.commit('global/setLoadingStatus', false)
        store.commit('global/setLoadingTip', '')
        const res: ResponseData = response.data;
        const {code = 0, token = null} = res;
        // 自定义状态码验证
        if (code !== 0) return Promise.reject({response, message: 'CustomError'});
        // 重置刷新token
        if (token) await setToken(token);*/
    // 正常请求
    return response
})
/**
 * 重写Catch
 * @param config
 */
export default function (config: AxiosRequestConfig): AxiosPromise {
    return request(config)
        .then((response: AxiosResponse) => response.data)
        .catch(error => errorHandler(error))
}
