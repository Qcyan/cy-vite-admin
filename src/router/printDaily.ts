import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const printDailyRouter: RoutesDataItem = {
    icon: 'printDaily',
    title: '打印日志',
    path: '/printDaily',
    redirect: '/printDaily/index',
    component: DefaultLayout,
    children: [
        {
            title: '打印日志',
            path: 'index',
            component: () => import('@/views/printDaily/index.vue'),
            children: []
        }
    ]
}
export default printDailyRouter