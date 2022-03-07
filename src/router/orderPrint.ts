import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const orderPrintRouter: RoutesDataItem = {
    icon: 'orderPrint',
    title: '订单打印',
    path: '/orderPrint',
    redirect: '/orderPrint/index',
    component: DefaultLayout,
    children: [
        {
            title: '订单打印',
            path: 'index',
            component: () => import('@/views/orderPrint/index.vue'),
            children: []
        }
    ]
}
export default orderPrintRouter