import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const settingRouter: RoutesDataItem = {
    icon: 'setting',
    title: '设置',
    path: '/setting',
    redirect: '/setting/index',
    component: DefaultLayout,
    children: [
        {
            title: '个人信息',
            path: 'index',
            component: () => import('@/views/setting/index.vue'),
            children: []
        }
    ]
}
export default settingRouter
