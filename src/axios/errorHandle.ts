import { notification } from "ant-design-vue";
import router from '@/router/index';
import settings from '@/config/settings';
import { customCodeMessage, serverCodeMessage } from './errCode'

/**
 * 异常处理程序
 */
export const errorHandler = (error: any) => {
    const { response, message } = error;
    if (message === 'CustomError') {
        // 自定义错误
        const { config, data } = response;
        const { url, baseURL } = config;
        const { code, msg } = data;
        const reqUrl = url.split("?")[0].replace(baseURL, '');
        const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
        if (!noVerifyBool) {
            notification.error({
                message: `提示`,
                description: customCodeMessage[code] || msg || 'Error',
            });

            if (code === 10002) {
                router.replace('/user/login');
            }
        }
    } else if (message === 'CancelToken') {
        // 取消请求 Token
        // eslint-disable-next-line no-console
        console.log(message);
    } else if (response && response.status) {
        const errorText = serverCodeMessage[response.status] || response.statusText;
        const { status, request } = response;
        notification.error({
            message: `请求错误 ${status}: ${request.responseURL}`,
            description: errorText,
        });
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
    }

    return Promise.reject(error);
}