<template>
    <div id="layout">
        <left
            :collapsed="collapsed"
            :menuData="permissionMenuData"
            :belongTopMenu="belongTopMenu"
            :selectedKeys="selectedKeys"
            :openKeys="leftOpenKeys"
            :onOpenChange="onOpenChange"
        ></left>

        <div id="layout-right" :class="{ 'fiexd-header': headFixed }">
            <right-top
                :collapsed="collapsed"
                :toggleCollapsed="toggleCollapsed"
                :menuData="permissionMenuData"
                :belongTopMenu="belongTopMenu"
                :routeItem="routeItem"
                :showBroadside="showBroadside"
            ></right-top>
            <div class="layout-right-main">
                <router-view />
            </div>
        </div>
        <settings v-if="devEnvParams" />
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    ComputedRef,
    watch,
    ref,
    Ref,
    nextTick,
    reactive,
    toRefs
} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import {
    RoutesDataItem,
    vueRoutes,
    getRouteItem,
    getPermissionMenuData,
    getRouteBelongTopMenu,
    getSelectLeftMenuPath,
    formatRoutePathTheParents
} from '@/utils/routes'
import { mergeUnique as ArrayMergeUnique } from '@/utils/array'
import settings from '@/config/settings'

import useTitle from '@/hooks/useTitle'
import IndexLayoutRoutes from '@/router/indexLayout'
import Left from '@/layouts/IndexLayout/components/Left.vue'
import Settings from '@/layouts/IndexLayout/components/Settings.vue'
import RightTop from '@/layouts/IndexLayout/components/RightTop.vue'

import { globalStateType as GlobalStateType } from '@/store/global'
import { ThemeSettingType } from '@/store/theme'

interface IndexLayoutSetupData {
    collapsed: ComputedRef<boolean>
    permissionMenuData: ComputedRef<RoutesDataItem[]>
    belongTopMenu: ComputedRef<string>
    selectedKeys: ComputedRef<string[]>
    leftOpenKeys: Ref<string[]>
    routeItem: ComputedRef<RoutesDataItem>
    onOpenChange: (key: any) => void
    toggleCollapsed: () => void
    devEnvParams: ComputedRef<boolean>
    showBroadside: ComputedRef<boolean>
}

export default defineComponent({
    name: 'IndexLayout',
    components: {
        Left,
        RightTop,
        Settings
    },
    setup(): IndexLayoutSetupData {
        const store = useStore<{ global: GlobalStateType; themeSetting: ThemeSettingType }>()
        const config = reactive(settings)
        const route = useRoute()

        // 所有菜单路由
        const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes)

        // 当前路由 item
        const routeItem = computed<RoutesDataItem>(() => getRouteItem(route.path, menuData))

        // 有权限的菜单
        const permissionMenuData = computed<RoutesDataItem[]>(() => getPermissionMenuData(menuData))

        // 当前路由的顶部菜单path
        const belongTopMenu = computed<string>(() => getRouteBelongTopMenu(routeItem.value))

        // 左侧选择菜单key
        const selectedKeys = computed<string[]>(() => {
            const selectedKey = getSelectLeftMenuPath(routeItem.value)
            return [selectedKey]
        })

        // 当前路由的父路由path[]
        const routeParentPaths = computed<string[]>(() =>
            formatRoutePathTheParents(routeItem.value.path)
        )

        // 收缩左侧
        // const collapsed = computed<boolean>(() => store.state.global.collapsed)
        const collapsed = computed<boolean>(() => false)
        // 是否显示左侧侧边栏
        // const showBroadside = computed(() => store.getters['themeSetting/getShowBroadside'])
        const showBroadside = computed(() => true)

        // 判断环境
        const devEnvParams = computed<boolean>(() => process.env.NODE_ENV === 'development')

        const toggleCollapsed = (): void => {
            store.commit('global/changeLayoutCollapsed', !collapsed.value)
        }

        // 左侧菜单展开收起
        const onOpenChange = (key: any) => {
            leftOpenKeys.value = key
        }

        // 左侧展开菜单keys
        const leftOpenKeys = ref<string[]>(routeParentPaths.value)
        watch([routeParentPaths, collapsed], () => {
            if (routeParentPaths.value.length && !collapsed.value) {
                leftOpenKeys.value = ArrayMergeUnique<string>(
                    leftOpenKeys.value,
                    routeParentPaths.value
                )
            } else {
                nextTick(() => {
                    leftOpenKeys.value = []
                })
            }
        })

        // 设置title
        useTitle(routeItem)

        return {
            showBroadside,
            devEnvParams,
            collapsed,
            belongTopMenu,
            permissionMenuData,
            selectedKeys,
            leftOpenKeys,
            routeItem,
            ...toRefs(config),
            onOpenChange,
            toggleCollapsed
        }
    }
})
</script>

<style lang="less" scoped>
#layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
}

#layout-right {
    position: relative;
    flex: 1;
    overflow: auto;
    background-color: @mainBgColor;

    &.fiexd-header {
        display: flex;
        flex-direction: column;

        .layout-right-main {
            flex: 1;
            overflow: hidden auto;
        }
    }
}

.layout-content {
    width: 100%;
    height: 100%;
    padding: 12px 6px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
</style>
