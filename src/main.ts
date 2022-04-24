import { createApp } from 'vue'
import App from '@/App.vue'

import router from './router/'
import { setupStore } from './store/'


// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { setupElementPlus } from './plugins/element-plus'

if (typeof (window as any).global === 'undefined') {
    ;(window as any).global = window
}

const app = createApp(App)

// 配置store
setupStore(app)
// 使用element-plus插件
setupElementPlus(app)

// app.use(Antd)
app.use(router)
// app.use(ElementPlus)

// 路由准备完毕再挂载
router.isReady().then(() => app.mount('#app'))
