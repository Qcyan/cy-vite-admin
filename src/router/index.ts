import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // 进度条样式
import IndexLayoutRoutes from './indexLayout'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import IndexLayout from '@/layouts/indexLayout/index.vue'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 1000 }) // NProgress Configuration

// @ts-ignore
const routes: Array<RouteRecordRaw> = [
    {
        title: 'empty',
        path: '/',
        component: DefaultLayout,
        children: [
            {
                title: 'empty',
                path: '/',
                redirect: '/home/index',
                component: IndexLayout,
                children: IndexLayoutRoutes
            }
        ]
    },
    {
        title: '404',
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

router.beforeEach(async (to: any, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
