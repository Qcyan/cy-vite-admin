import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const otherRouter: RoutesDataItem = {
    icon: 'other',
    title: '其他模块',
    path: '/other',
    redirect: '/other/index',
    component: DefaultLayout,
    children: [
        {
            title: '其他模块下1',
            path: 'index',
            // component: () => import('@/views/other/index.vue'),
            component: DefaultLayout, // 有children时
            children: [{
                title: '首页下1下1',
                path: 'indexPath',
                component: () => import('@/views/other/index.vue'),
                children: []
            }]
        }
    ]
}
export default otherRouter