<template>
    <template v-if="!item.hidden">
        <template
            v-if="item.children && Array.isArray(item.children) && hasChildRoute(item.children)"
        >
            <a-sub-menu :key="item.path">
                <template #title>
                    <span>
                        <Icon v-if="item.icon" :type="item.icon" class="anticon" />
                        <span>{{ item.title }}</span>
                    </span>
                </template>
                <sider-menu-item
                    v-for="item2 in item.children"
                    :key="item2.path"
                    :routeItem="item2"
                    :topNavEnable="topNavEnable"
                    :belongTopMenu="belongTopMenu"
                ></sider-menu-item>
            </a-sub-menu>
        </template>
        <template v-else>
            <a-menu-item :key="item.path">
                <a-link :to="item.path">
                    <Icon v-if="item.icon" :type="item.icon" class="anticon" />
                    <span>{{ item.title }}</span>
                </a-link>
            </a-menu-item>
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
import Icon from './Icon.vue'

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
        Icon,
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
::v-deep .ant-menu-item {
    margin: 0 !important;
}
</style>
