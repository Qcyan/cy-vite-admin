import { RoutesDataItem } from '@/utils/routes'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const homeRouter: RoutesDataItem = {
    // icon: 'icon-shouye',
    title: '首页',
    path: '/home',
    redirect: '/home/index',
    component: DefaultLayout,
    children: [
        {
            icon: 'icon-shouye',
            title: '首页',
            path: 'index',
            component: () => import('@/views/home/index.vue'),
            children: []
        },
        {
            icon: 'icon-shouye',
            title: '测试1',
            path: 'test1',
            component: () => import('@/views/home/test1/index.vue'),
            children: []
            // children: [
            //     {
            //         icon: 'icon-shouye',
            //         title: '测试1-1',
            //         path: 'index',
            //         component: () => import('@/views/home/test1/index.vue'),
            //         children: []
            //     },
            //     {
            //         icon: 'icon-shouye',
            //         title: '测试1-2',
            //         path: 'other',
            //         component: () => import('@/views/home/test1/other.vue'),
            //         children: []
            //     }
            // ]
        }
    ]
}
export default homeRouter
