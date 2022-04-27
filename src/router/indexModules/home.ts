import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const homeRouter: RoutesDataItem = {
    icon: 'home',
    title: '首页',
    path: '/home',
    redirect: '/home/index',
    component: DefaultLayout,
    children: [
        {
            icon: 'control',
            title: '主记录',
            path: 'index',
            component: () => import('@/views/home/index.vue'),
            children: []
        }
    ]
}
export default homeRouter
