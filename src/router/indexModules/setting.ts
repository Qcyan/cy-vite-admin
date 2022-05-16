import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const settingRouter: RoutesDataItem = {
    icon: 'icon-shouye1',
    title: '设置',
    path: '/setting',
    redirect: '/setting/index',
    component: DefaultLayout,
    children: [
        {
            icon: 'icon-shouye1',
            title: '个人信息',
            path: 'index',
            component: () => import('@/views/setting/index.vue'),
            children: []
        }
    ]
}
export default settingRouter
