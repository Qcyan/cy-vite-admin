<template>
    <div id="layout-right-top">
        <div class="layout-right-top-top">
            <!-- 左侧菜单收起展开 -->
            <div
                v-if="showBroadside"
                class="layout-flexible"
                @click="
                    () => {
                        if (toggleCollapsed) {
                            toggleCollapsed()
                        }
                    }
                "
            >
                <!--                <MenuUnfoldOutlined v-if="collapsed" style="font-size: 16px" />-->
                <!--                <MenuFoldOutlined v-else style="font-size: 16px" />-->
            </div>

            <div v-else class="cv-flex cv-flex-ai-c cv-mg-l-20px cv-mg-r-20px">
                <img
                    :alt="settings.sideTitle"
                    :src="settings.systemLogo"
                    width="35"
                    :title="settings.sideTitle"
                    class="cv-mg-r-8px cv-bd-radius-5"
                />
                <img
                    :alt="settings.sideTitle"
                    :src="settings.systemLogoText"
                    height="24"
                    :title="settings.sideTitle"
                />
            </div>

            <!-- 顶部菜单 -->
            <div class="layout-top-menu">
                <div ref="topMenuCon" :style="{ width: topMenuWidth }">
                    <template v-for="(item, key) in menuData">
                        <a-link
                            :key="key"
                            v-if="!item.hidden"
                            :to="item.path"
                            :class="{ active: belongTopMenu === item.path }"
                            class="layout-top-menu-li"
                        >
                            {{ item.title }}
                        </a-link>
                    </template>
                </div>
            </div>
            <!-- 顶部右侧 -->
            <div class="layout-top-menu-right">
                <right-top-user />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, toRefs, reactive } from 'vue'
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { RoutesDataItem } from '@/utils/routes'
import useTopMenuWidth from '../composables/useTopMenuWidth'
import settings, { SettingsType } from '@/config/settings'
import RightTopUser from './RightTopUser.vue'
import ALink from '@/components/ALink/index.vue'

interface RightTopSetupData {
    topMenuCon: Ref
    topMenuWidth: Ref
    settings: SettingsType
}

export default defineComponent({
    name: 'RightTop',
    components: {
        ALink,
        RightTopUser
        // MenuFoldOutlined,
        // MenuUnfoldOutlined
    },
    props: {
        collapsed: {
            type: Boolean,
            default: false
        },
        tabNavEnable: {
            type: Boolean,
            default: true
        },
        navEnable: {
            type: Boolean,
            default: true
        },
        showBroadside: {
            type: Boolean,
            default: true
        },
        belongTopMenu: {
            type: String,
            default: ''
        },
        toggleCollapsed: {
            type: Function as PropType<() => void>
        },
        menuData: {
            type: Array as PropType<RoutesDataItem[]>,
            default: () => {
                return []
            }
        },
        routeItem: {
            type: Object as PropType<RoutesDataItem>,
            required: true
        }
    },
    setup(props): RightTopSetupData {
        const { navEnable } = toRefs(props)
        const config = reactive<SettingsType>(settings)
        const { topMenuCon, topMenuWidth } = useTopMenuWidth(navEnable)

        return {
            settings,
            topMenuCon,
            topMenuWidth,
            ...toRefs(config)
        }
    }
})
</script>
<style lang="less" scoped>
#layout-right-top {
    width: 100%;
    height: @headerHeight;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 9;

    .layout-right-top-top {
        display: flex;
        width: 100%;
        height: @headerHeight;
        background-color: @menu-dark-bg;
        color: #c0c4cc;

        .layout-flexible {
            width: @headerHeight;
            height: @headerHeight;
            line-height: @headerHeight;
            text-align: center;
            cursor: pointer;

            &:hover {
                background-color: @menu-dark-bg;
                /*color: @menu-dark-highlight-color;*/
            }
        }

        .layout-top-menu {
            height: @headerHeight;
            line-height: @headerHeight;
            flex: 1;
            overflow: hidden;
            overflow-x: auto;

            .layout-top-menu-li {
                display: inline-block;
                padding: 0 30px;
                height: @headerHeight;
                text-decoration: none;
                color: #ffffff;
                font-size: 15px;

                &:hover,
                &.active {
                    color: @primary-color;
                }
            }

            .breadcrumb {
                line-height: @headerHeight;
            }
        }

        .layout-top-menu-right {
            //width: 150px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;

            .layout-top-message {
                height: @headerHeight;
                line-height: @headerHeight;
                color: #c0c4cc;

                .layout-top-message-badge {
                    margin-left: 5px;
                    margin-top: -20px;
                }
            }

            .layout-top-usermenu {
                padding-left: 10px;
                color: #c0c4cc;
            }

            .layout-top-selectlang {
                padding-left: 10px;
            }
        }

        .scrollbar();
    }

    &.tabNavEnable {
        height: (@headerHeight + @headerBreadcrumbHeight);
    }

    &.topNavEnable {
        height: (@headerHeight + @headerTabNavHeight);

        .layout-right-top-top {
            background-color: #ffffff;
            /*color: @text-color;*/

            .layout-flexible {
                &:hover {
                    background-color: @mainBgColor;
                    /*color: @heading-color;*/
                }
            }

            .layout-top-menu-right {
                .layout-top-message {
                    /*color: @heading-color;*/
                }

                .layout-top-usermenu {
                    /*color: @heading-color;*/
                }
            }
        }

        &.tabNavEnable {
            height: @headerHeight;
        }
    }
}
</style>
