import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const shopConfigRouter: RoutesDataItem = {
    icon: 'shopConfig',
    title: '店铺配置',
    path: '/shopConfig',
    redirect: '/shopConfig/index',
    component: DefaultLayout,
    children: [
        {
            title: '店铺配置',
            path: 'index',
            component: () => import('@/views/shopConfig/index.vue'),
            children: []
        }
    ]
}
export default shopConfigRouter