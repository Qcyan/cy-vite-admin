import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // 进度条样式

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 1000 }) // NProgress Configuration

// @ts-ignore
const routes: Array<RouteRecordRaw> = [
    {
        title: 'empty',
        path: '/',
        component: () => import('@/view/home.vue'),
        // component: DefaultLayout,
        children: [
            {
                title: 'home',
                path: '/home',
                component: () => import('@/view/home.vue')
                // component: IndexLayout,
                // children: IndexLayoutRoutes
            }
        ]
    },
    {
        title:      '404',
        name: '404',
        path: '/404',
        component: () => import('@/components/404.vue')
    },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
        path: '/:pathMatch(.*)',
        title: 'NotFound',
        component: () => import('@/components/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})
/**
 * 路由白名单
 */
export const whitePath = ['/404']

router.beforeEach(() => {
    NProgress.start()
    return true
})

router.afterEach(() => {
    NProgress.done()
})

export default router
