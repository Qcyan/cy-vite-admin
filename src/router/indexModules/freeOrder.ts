import { RoutesDataItem } from "@/utils/routes";
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const freeOrderRouter: RoutesDataItem = {
    icon: 'freeOrder',
    title: '自由打印',
    path: '/freeOrder',
    redirect: '/freeOrder/index',
    component: DefaultLayout,
    children: [
        {
            title: '自由打印',
            path: 'index',
            component: () => import('@/views/freeOrder/index.vue'),
            children: []
        }
    ]
}
export default freeOrderRouter