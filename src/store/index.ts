import { createStore } from 'vuex'
import { importAllStore } from '@/utils/store'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['global']
})

export default createStore({
    modules: importAllStore(),
    getters: {},
    plugins: [vuexLocal.plugin]
})

/*import type { App } from 'vue';
import { createPinia } from 'pinia';
import { useGlobalStore } from './global'

const store = createPinia();
const globalStore = useGlobalStore(store)
export function setupStore(app: App<Element>) {
    app.use(store);
}

export { store };*/

