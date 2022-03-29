import { defineStore } from 'pinia'
import { TabNavItem } from '@/utils/routes'
import settings from '@/config/settings'
import router from '@/router/index'

const homeRoute = () => {
    return router.resolve(settings.homeRouteItem.path)
}

export interface StateType {
    // 左侧展开收起
    collapsed: boolean
    // 顶部菜单开启
    topNavEnable: boolean
    // 头部固定开启
    headFixed: boolean
    // tab菜单开启
    tabNavEnable: boolean
    // 头部tab导航列表
    headTabNavList: TabNavItem[]
}

const initState: StateType = {
    collapsed: false,
    topNavEnable: settings.topNavEnable,
    headFixed: settings.headFixed,
    tabNavEnable: settings.tabNavEnable,
    headTabNavList: [
        {
            route: homeRoute,
            menu: settings.homeRouteItem
        }
    ]
}

export const useGlobalStore = defineStore({
    id: 'store-global',
    state: () => initState,
    actions: {
        changeLayoutCollapsed(payload) {
            this.collapsed = payload
        },
        setTopNavEnable(payload) {
            this.topNavEnable = payload
        },
        setHeadFixed(payload) {
            this.headFixed = payload
        },
        setTabNavEnable(payload) {
            this.tabNavEnable = payload
        },
        setHeadTabNavList(payload) {
            this.headTabNavList = payload
        }
    }
})
