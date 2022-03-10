import { defineStore } from 'pinia'
export const useAccountStore = defineStore({
    id: 'app-test',
    state: () => ({
        token: '123456'
    })
})
// export default useAccountStore
