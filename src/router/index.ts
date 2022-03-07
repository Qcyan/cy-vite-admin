import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: false, easing: 'ease', speed: 1000 }); // NProgress Configuration

import { createRouter, createWebHashHistory } from 'vue-router';
import { RoutesDataItem } from "@/utils/routes";

import settings from "@/config/settings";

// 路由
import IndexLayoutRoutes from '@/router/indexLayout';

// 组件
import IndexLayout from '@/layouts/IndexLayout/index.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';


const routes: RoutesDataItem[] = [
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
    // ...IndexLayoutRoutes
]
const router = createRouter({
    scrollBehavior(/* to, from, savedPosition */) {
        return { top: 0 }
    },
    history: createWebHashHistory(),
    routes: routes,
});

router.beforeEach((/* to, from */) => {
    // start progress bar
    NProgress.start();
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});

export default router;

