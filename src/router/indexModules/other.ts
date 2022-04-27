import { RoutesDataItem } from '@/utils/routes'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const otherRouter: RoutesDataItem = {
    icon: 'other',
    title: '其他模块',
    path: '/other',
    redirect: '/other/maps/line',
    component: DefaultLayout,
    children: [
        {
            title: '地图模块',
            path: 'maps',
            // component: () => import('@/views/other/index.vue'),
            redirect: '/other/maps/line',
            component: DefaultLayout, // 有children时
            children: [
                {
                    title: '折线图',
                    path: 'line',
                    component: () => import('@/views/other/index.vue'),
                    children: []
                }
            ]
        }
    ]
}
export default otherRouter
