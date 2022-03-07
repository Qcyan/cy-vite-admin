<template>
    <div id="indexlayout-right-top">
        <div class="indexlayout-right-top-top">
            <!-- 收起左侧菜单 -->
            <div
                class="indexlayout-flexible"
                @click="
                    () => {
                        if (toggleCollapsed) {
                            toggleCollapsed()
                        }
                    }
                "
            >
                <MenuUnfoldOutlined v-if="collapsed" style="font-size: 16px" />
                <MenuFoldOutlined v-else style="font-size: 16px" />
            </div>

            <!-- 顶部菜单 -->
            <div class="indexlayout-top-menu">
                <div ref="topMenuCon" :style="{ width: topMenuWidth }">
                    <template v-for="(item, key) in menuData">
                        <a-link
                            :key="key"
                            v-if="!item.hidden"
                            :to="item.path"
                            :class="{ active: belongTopMenu === item.path }"
                            class="indexlayout-top-menu-li"
                        >
                            {{ item.title }}
                        </a-link>
                    </template>
                </div>
            </div>
            <!-- 顶部右侧 -->
            <div class="indexlayout-top-menu-right">
                <template v-if="isShowMessage">
                    <!--          <right-top-message />-->
                </template>
                <template v-if="isShowSelectLang">
                    <!--          <select-lang class="indexlayout-top-selectlang" />-->
                </template>
                <right-top-user />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, toRefs, reactive } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'
import { RoutesDataItem } from '@/utils/routes'
import useTopMenuWidth from '../composables/useTopMenuWidth'
import settings, { SettingsType } from '@/config/settings'
import RightTopUser from './RightTopUser.vue'
import ALink from '@/components/ALink/index.vue'

interface RightTopSetupData {
    // t: (key: string | number) => string;
    topMenuCon: Ref
    topMenuWidth: Ref
}

export default defineComponent({
    name: 'RightTop',
    components: {
        ALink,
        RightTopUser,
        MenuFoldOutlined,
        MenuUnfoldOutlined
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
        topNavEnable: {
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
        const { topNavEnable } = toRefs(props)
        const config = reactive(settings)
        const { topMenuCon, topMenuWidth } = useTopMenuWidth(topNavEnable)

        return {
            topMenuCon,
            topMenuWidth,
            ...toRefs(config)
        }
    }
})
</script>

<style lang="less">
@import '../../../assets/css/global.less';
#indexlayout-right-top {
    width: 100%;
    height: (@headerHeight);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 9;
    .indexlayout-right-top-top {
        display: flex;
        width: 100%;
        height: @headerHeight;
        background-color: @menu-dark-bg;
        color: #c0c4cc;
        .indexlayout-flexible {
            width: @headerHeight;
            height: @headerHeight;
            line-height: @headerHeight;
            text-align: center;
            cursor: pointer;
            &:hover {
                background-color: @menu-dark-bg;
                // color: @menu-dark-highlight-color;
            }
        }

        .indexlayout-top-menu {
            height: @headerHeight;
            line-height: @headerHeight;
            flex: 1;
            /* display: flex; */
            overflow: hidden;
            overflow-x: auto;
            .indexlayout-top-menu-li {
                display: inline-block;
                padding: 0 15px;
                height: @headerHeight;
                text-decoration: none;
                color: #c0c4cc;
                font-size: 15px;
                border-bottom: solid 3px transparent;
                &:hover,
                &.active {
                    background-color: @menu-dark-bg;
                    // color: @menu-dark-highlight-color;
                    border-bottom-color: @primary-color;
                }
            }

            .breadcrumb {
                line-height: @headerHeight;
            }
        }

        .indexlayout-top-menu-right {
            width: 150px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;
            .indexlayout-top-message {
                height: @headerHeight;
                line-height: @headerHeight;
                color: #c0c4cc;
                .indexlayout-top-message-badge {
                    margin-left: 5px;
                    margin-top: -20px;
                }
            }
            .indexlayout-top-usermenu {
                padding-left: 10px;
                color: #c0c4cc;
            }
            .indexlayout-top-selectlang {
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
        .indexlayout-right-top-top {
            background-color: #ffffff;
            color: @text-color;
            .indexlayout-flexible {
                &:hover {
                    background-color: @mainBgColor;
                    color: @heading-color;
                }
            }
            .indexlayout-top-menu-right {
                .indexlayout-top-message {
                    color: @heading-color;
                }
                .indexlayout-top-usermenu {
                    color: @heading-color;
                }
            }
        }
        &.tabNavEnable {
            height: (@headerHeight);
        }
    }
}
</style>
