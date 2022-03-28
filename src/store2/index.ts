import { createPinia, storeToRefs } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

export const pinia = createPinia()

pinia.use(piniaPluginPersist)

// 传递一个返回函数,给所有store添加一个静态属性
// pinia.use(() => ({ env: 'dev' }))
