import { defineStore } from 'pinia'
import { StoreModuleType } from '@/utils/store'
import { ResponseData } from '@/axios/index'
import { queryCurrent, queryMessage } from '@/api/user'
import { removeToken } from '@/utils/localToken'

export interface CurrentUser {
    id: number
    name: string
    avatar: string
    roles: string[]
}
export interface StateType {
    currentUser: CurrentUser
    message: number
}

const initState: StateType = {
    currentUser: {
        id: 0,
        name: '',
        avatar: '',
        roles: []
    },
    message: 0
}

export const useUserStore = defineStore({
    id: 'store-user',
    state: () => initState,
    actions: {
        saveCurrentUser(payload) {
            this.currentUser = {
                ...this.currentUser,
                ...payload
            }
        },
        saveMessage(payload) {
            this.message = payload
        },
        async fetchCurrent() {
            try {
                const response: ResponseData = await queryCurrent()
                const { data } = response
                // this.saveCurrentUser(data)
                return true
            } catch (error) {
                return false
            }
        },
        async logout() {
            console.log(this)
            try {
                await removeToken()
                // this.saveCurrentUser({ ...initState.currentUser })
                return true
            } catch (error) {
                return false
            }
        }
    }
})
