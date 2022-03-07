import { createApp } from 'vue'

// 引入 Antd
import Antd from 'ant-design-vue'

// 导入 svg
import { importAllSvg } from '@/components/IconSvg/index'

importAllSvg()

import App from '@/App.vue'
import router from '@/router/index'
// import store from '@/store'
import {store} from '@/store2'

import {useAccountStore} from '@/store2/modules/test'
const accountStore = useAccountStore(store)

const app = createApp(App)
app.use(Antd)
app.use(store)
app.use(router)
app.mount('#app')
