<template>
    <a-menu
        theme="light"
        mode="inline"
        :inline-collapsed="collapsed"
        :selectedKeys="selectedKeys"
        :openKeys="openKeys"
        @openChange="key => openChange(key)"
    >
        <slider-menu-item
            v-for="item in newMenuData"
            :key="item.path"
            :routeItem="item"
            :topNavEnable="topNavEnable"
            :belongTopMenu="belongTopMenu"
            :collapsed="collapsed"
        ></slider-menu-item>
    </a-menu>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, toRefs } from 'vue'
import { RoutesDataItem } from '@/utils/routes'
import SliderMenuItem from './SliderMenuItem.vue'

interface SliderMenuSetupData {
    newMenuData: ComputedRef<RoutesDataItem[]>
    openChange: (key: any) => void
}

export default defineComponent({
    name: 'SliderMenu',
    props: {
        collapsed: {
            type: Boolean,
            default: false
        },
        topNavEnable: {
            type: Boolean,
            default: true
        },
        belongTopMenu: {
            type: String,
            default: ''
        },
        selectedKeys: {
            type: Array as PropType<string[]>,
            default: () => {
                return []
            }
        },
        openKeys: {
            type: Array as PropType<string[]>,
            default: () => {
                return []
            }
        },
        onOpenChange: {
            type: Function as PropType<(key: any) => void>
        },
        menuData: {
            type: Array as PropType<RoutesDataItem[]>,
            default: () => {
                return []
            }
        }
    },
    components: {
        SliderMenuItem
    },
    setup(props): SliderMenuSetupData {
        const { menuData, topNavEnable } = toRefs(props)

        const newMenuData = computed<RoutesDataItem[]>(() => {
            if (!topNavEnable.value) {
                return menuData.value as RoutesDataItem[]
            }
            const MenuItems: RoutesDataItem[] = []
            for (let index = 0, len = menuData.value.length; index < len; index += 1) {
                const element = menuData.value[index]
                if (element.children) {
                    MenuItems.push(...(element.children as RoutesDataItem[]))
                }
            }
            return MenuItems
        })
        const openChange = (key: string): void => {
            props.onOpenChange && props.onOpenChange(key)
        }

        return {
            newMenuData,
            openChange
        }
    }
})
</script>

<style lang="less" scoped>
.ant-menu {
    height: 100%;
    background-color: #fff;
    ::v-deep(.ant-menu-item) {
        padding-top: 0;
        margin: 0;
    }
}
</style>
