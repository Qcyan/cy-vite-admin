import { defineStore } from 'pinia'
const useAccountStore = defineStore({
    id: 'app-test',
    state: () => ({
        token: '123456'
    })
})
export default useAccountStore
