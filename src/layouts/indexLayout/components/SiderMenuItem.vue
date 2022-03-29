<template>
    <template v-if="!item.hidden">
        <template
            v-if="item.children && Array.isArray(item.children) && hasChildRoute(item.children)"
        >
            <el-sub-menu :index="item.path">
                <template #title>
                    <span>
                        <!--<Icon v-if="item.icon" :type="item.icon" class="anticon" />-->
                        <span>{{ item.title }}</span>
                    </span>
                </template>
                <sider-menu-item
                    v-for="item2 in item.children"
                    :key="item2.path"
                    :routeItem="item2"
                    :topNavEnable="topNavEnable"
                    :belongTopMenu="belongTopMenu"
                    style="display: block"
                ></sider-menu-item>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item :key="item.path">
                <el-link :to="item.path">
                    <!--<Icon v-if="item.icon" :type="item.icon" class="anticon" />-->
                    <span>{{ item.title }}</span>
                </el-link>
            </el-menu-item>
        </template>
    </template>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs, computed, ComputedRef, Ref } from 'vue'
import {
    RoutesDataItem,
    setRoutePathForParent,
    getRouteBelongTopMenu,
    hasChildRoute
} from '@/utils/routes'
import ALink from '@/components/ALink/index.vue'
// import Icon from './Icon.vue'

interface SiderMenuItemSetupData {
    item: Ref
    topMenuPath: ComputedRef<string>
    hasChildRoute: (children: RoutesDataItem[]) => boolean
}

export default defineComponent({
    name: 'SiderMenuItem',
    props: {
        routeItem: {
            type: Object as PropType<RoutesDataItem>,
            required: true
        },
        topNavEnable: {
            type: Boolean,
            default: true
        },
        belongTopMenu: {
            type: String,
            default: ''
        }
    },
    components: {
        // Icon,
        ALink
    },
    setup(props): SiderMenuItemSetupData {
        const { routeItem } = toRefs(props)

        const topMenuPath = computed<string>(() =>
            getRouteBelongTopMenu(routeItem.value as RoutesDataItem)
        )

        return {
            item: routeItem,
            topMenuPath,
            hasChildRoute
        }
    }
})
</script>

<style lang="less" scoped>
:deep(.ant-menu-item) {
    margin: 0 !important;
}
</style>
