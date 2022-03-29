import type { App } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()

store.use(piniaPluginPersist)

export function setupStore(app: App<Element>) {
    app.use(store)
}

// 传递一个返回函数,给所有store添加一个静态属性
// pinia.use(() => ({ env: 'dev' }))

export { store }
