/**
 * Store 入口
 */
import { createStore } from 'vuex'
import { importAllStore } from '@/utils/store'
import VuexPersistence from 'vuex-persist'

/*
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['global']
})
*/
export default createStore({
    modules: importAllStore(),
    getters: {},
    // plugins: [vuexLocal.plugin]
})
