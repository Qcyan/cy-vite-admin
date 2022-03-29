<template>
    <div id="indexlayout-left" :class="{ narrow: collapsed }">
        <!-- 顶部logo -->
        <div class="indexlayout-left-logo">
            <router-link to="/" class="logo-url">
                <template v-if="collapsed">
                    <img
                        :alt="config.silderTitle"
                        :src="config.systemLogo"
                        width="30"
                        :title="config.silderTitle"
                    />
                </template>
                <template v-else>
                    <img
                        :alt="config.silderTitle"
                        :src="config.systemLogo"
                        width="30"
                        :title="config.silderTitle"
                    />
                    <h3 class="logo-title">{{ config.silderTitle }}</h3>
                </template>
            </router-link>
        </div>
        <!-- 菜单 -->
        <div class="indexlayout-left-menu">
            <sider-menu
                :menuData="menuData"
                :belongTopMenu="belongTopMenu"
                :selectedKeys="selectedKeys"
                :openKeys="openKeys"
            ></sider-menu>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { RoutesDataItem } from '@/utils/routes'
import SiderMenu from './SiderMenu.vue'
import settings, { SettingsType } from '@/config/settings'

export default defineComponent({
    name: 'Left',
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
            type: String,
            default: ''
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
        SiderMenu
    },

    setup(ctx, props) {
        console.log(ctx, props)
        const config = ref<SettingsType>(settings)
        return {
            config
        }
    }
})
</script>

<style lang="less" scoped>
@import '../../../assets/css/global.less';
#indexlayout-left {
    display: flex;
    flex-direction: column;
    width: @leftSideBarWidth;
    height: 100vh;
    background-color: @menu-dark-bg;
    color: #c0c4cc;
    transition-duration: 0.1s;
    .indexlayout-left-logo {
        width: 100%;
        height: @headerHeight;
        line-height: @headerHeight;
        text-align: center;
        vertical-align: middle;
        /* background-color: $subMenuBg; */
        .logo-url {
            display: inline-flex;
            width: 100%;
            height: 100%;
            overflow: hidden;
            align-items: center;
            justify-content: center;
            .logo-title {
                display: inline-block;
                margin: 0;
                font-size: 18px;
                font-family: Roboto, sans-serif;
                color: #fff;
                padding-left: 6px;
            }
        }
        img {
            vertical-align: middle;
        }
    }

    .indexlayout-left-menu {
        flex: 1;
        overflow: hidden auto;
        height: calc(100vh - 50px);
        .left-scrollbar {
            width: 100%;
            height: 100%;
        }
    }

    &.narrow {
        width: @menu-collapsed-width;
    }

    .scrollbar();
}
</style>
