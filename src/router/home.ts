import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

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
        }
    ]
}
export default homeRouter
