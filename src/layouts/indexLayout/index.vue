<template>
    <div id="indexlayout">
        <!-- 收缩状态，有权限的菜单，当前路由的顶部菜单，左侧选择菜单key ，左侧展开菜单keys -->
        <left
            :collapsed="collapsed"
            :menuData="permissionMenuData"
            :belongTopMenu="belongTopMenu"
            :selectedKeys="selectedKeys"
            :openKeys="leftOpenKeys"
            :onOpenChange="onOpenChange"
        ></left>

        <div id="indexlayout-right" :class="{ 'fiexd-header': headFixed }">
            <!-- 收缩状态，切换收缩，有权限的菜单，当前路由的顶部菜单，当前路由  -->
            <right-top
                :collapsed="collapsed"
                :toggleCollapsed="toggleCollapsed"
                :menuData="permissionMenuData"
                :belongTopMenu="belongTopMenu"
                :routeItem="routeItem"
            ></right-top>

            <div class="indexlayout-right-main">
                <permission :roles="routeItem.roles">
                    <router-view></router-view>
                </permission>
            </div>
        </div>
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
    PropType,
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
import { useGlobalStore } from '@/store/modules/global'
import { useUserStore } from '@/store/modules/user'

import { mergeUnique as ArrayMergeUnique } from '@/utils/array'
import settings from '@/config/settings'
import useTitle from '@/composables/useTitle'

import IndexLayoutRoutes from '@/router/indexLayout'

import Left from '@/layouts/IndexLayout/components/Left.vue'
import RightTop from '@/layouts/IndexLayout/components/RightTop.vue'

interface IndexLayoutSetupData {
    collapsed: ComputedRef<boolean>
    permissionMenuData: ComputedRef<RoutesDataItem[]>
    belongTopMenu: ComputedRef<string>
    selectedKeys: ComputedRef<string>
    leftOpenKeys: Ref<string[]>
    routeItem: ComputedRef<RoutesDataItem>
    onOpenChange: (key: any) => void
    toggleCollapsed: () => void
}

export default defineComponent({
    name: 'IndexLayout',
    components: {
        Left,
        RightTop
    },
    setup(): IndexLayoutSetupData {
        const globalStore = useGlobalStore()
        const userStore = useUserStore()

        console.log(globalStore, 'globalStore')

        const config = reactive(settings)
        const route = useRoute()

        // 所有菜单路由
        const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes)
        // 当前路由 item
        const routeItem = computed<RoutesDataItem>(() => getRouteItem(route.path, menuData))

        // 有权限的菜单
        const permissionMenuData = computed<RoutesDataItem[]>(() => {
            // store.state.user.currentUser.roles
            return getPermissionMenuData(userStore.currentUser.roles, menuData)
        })

        // 当前路由的顶部菜单path
        const belongTopMenu = computed<string>(() => getRouteBelongTopMenu(routeItem.value))

        // 左侧选择菜单key /other/index
        const selectedKeys = computed<string>(() => {
            const selectedKey = getSelectLeftMenuPath(routeItem.value)
            return selectedKey
        })

        // 当前路由的父路由path[]
        const routeParentPaths = computed<string[]>(() =>
            formatRoutePathTheParents(routeItem.value.path)
        )

        // 收缩左侧
        const collapsed = computed<boolean>(() => globalStore.collapsed)
        const toggleCollapsed = (): void => {
            globalStore.changeLayoutCollapsed(!collapsed.value)
        }

        // 左侧菜单展开收起
        const onOpenChange = (key: any) => {
            leftOpenKeys.value = key
        }

        // 左侧展开菜单keys  /other
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
            ...toRefs(config),
            collapsed,
            belongTopMenu,
            permissionMenuData,
            selectedKeys,
            leftOpenKeys,
            routeItem,
            onOpenChange,
            toggleCollapsed
        }
    }
})
</script>

<style lang="scss">
@import '../../assets/css/variables.scss';
#indexlayout {
    display: flex;
    height: 100vh;
    overflow: hidden;
}
#indexlayout-right {
    position: relative;
    flex: 1;
    overflow: auto;
    background-color: $mainBgColor;
    &.fiexd-header {
        display: flex;
        flex-direction: column;
        .indexlayout-right-main {
            flex: 1;
            overflow: auto;
        }
    }
}
.indexlayout-main-content {
    width: 100%;
    height: 100%;
    padding: 13px 6px 0;
    position: relative;
    display: flex;
    flex-direction: column;
}
</style>
