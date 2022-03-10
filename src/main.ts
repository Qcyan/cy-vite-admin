import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import { createPinia, storeToRefs } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
if (typeof (window as any).global === 'undefined') {
    (window as any).global = window;
}

// 组件
import { importAllSvg } from '@/components/IconSvg/index'
importAllSvg()

// import store from '@/store'
// import { store } from '@/store2'
const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App)
app.use(Antd)
app.use(pinia)
app.use(router)
app.use(ElementPlus);
app.mount('#app')
