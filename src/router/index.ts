import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ElNotification, ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false, easing: 'ease', speed: 1000 }) // NProgress Configuration

// 路由
import IndexLayoutRoutes from '@/router/indexLayout'

// 组件
import IndexLayout from '@/layouts/IndexLayout/index.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
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
    }
]
const router = createRouter({
    scrollBehavior(/* to, from, savedPosition */) {
        return { top: 0 }
    },
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    // start progress bar
    NProgress.start()

    // 设置浏览器标题
    if (to.meta.title) {
        document.title = String(to.meta.title)
    } else {
        document.title = 'cyan平台'
    }

    // 路由出错处理
    if (to.matched.length === 0 && !to.name) {
        ElNotification({
            title: 'Error',
            message: 'This is an error message',
            type: 'error',
            duration: 5000
        })
        ElMessage.error('404')
        router.push('/404')
    }

    next()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

export default router
