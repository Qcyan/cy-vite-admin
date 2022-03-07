import request from '@/axios/index';

export async function dailynewArticles(): Promise<any> {
    return request({
        url: '/home/articles/dailynew',
        method: 'get'
    });
}