<!--
<template>
    <a-button type="primary" @click="show" class="theme-btn">
        <template #icon>
            &lt;!&ndash;			<SettingOutlined :style="{ fontSize: '22px',color: 'white'}"/>&ndash;&gt;
        </template>
    </a-button>
    <a-drawer
        title="系统布局配置"
        :visible="visible"
        @close="close"
        :bodyStyle="{ padding: '16px' }"
        :headerStyle="{ padding: '16px' }"
    >
        <div class="setting-wrap">
            <div class="style-setting">
                <div class="style-item">
                    <h3>整体风格设置</h3>
                    <div>
                        <template v-for="(item, index) in layoutStyle" :key="index">
                            <a-tooltip
                                placement="top"
                                :overlayStyle="{ zIndex: 2001 }"
                                :title="item.name"
                            >
                                <div class="layout-item" @click="onChangeTopNavEnable(item.layout)">
                                    <img :src="item.src" :alt="item.name" />
                                    <span class="check-item" v-if="item.layout === showBroadside">
                                        <check-outlined class="check-item-icon" />
                                    </span>
                                </div>
                            </a-tooltip>
                        </template>
                    </div>
                </div>
                <div class="style-item">
                    <h3>主题色</h3>
                    <div>
                        <template v-for="(item, index) in colorStyle" :key="index">
                            <div
                                class="layout-color-item"
                                :style="{ backgroundColor: item }"
                                @click="changeThemeColorHandle(item)"
                            >
                                <span class="check-item" v-if="pureColor === item">
                                    <check-outlined class="check-item-icon color-icon" />
                                </span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="style-item">
                    <h3>页面切换动画</h3>
                    <div>
                        <a-list item-layout="horizontal" :data-source="[1]" :split="false">
                            <a-list-item>
                                <span>禁用动画</span>
                                <a-switch
                                    @change="val => setAnimate({ ...animate, disabled: val })"
                                    :checked="animate.disabled"
                                    slot="actions"
                                />
                            </a-list-item>
                            <a-list-item>
                                <span>动画效果</span>
                                <a-select
                                    :value="animate.name"
                                    @change="val => setAnimate({ ...animate, name: val })"
                                    style="width: 100px"
                                    size="small"
                                    slot="actions"
                                >
                                    <a-select-option
                                        :key="index"
                                        :value="item.name"
                                        v-for="(item, index) in animates"
                                    >
                                        {{ item.alias }}
                                    </a-select-option>
                                </a-select>
                            </a-list-item>
                        </a-list>
                    </div>
                </div>
            </div>
        </div>
    </a-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
// import {SettingOutlined, CheckOutlined} from '@ant-design/icons-vue';
import { ThemeSettingType } from '@/store/theme'
import { message } from 'ant-design-vue'
import { changeThemeColor } from '@/config/themeColor'
import settings from '@/config/settings'
import { preset as animates } from '@/config/animate'

export default defineComponent({
    name: 'Settings',
    components: {
        // SettingOutlined,
        // CheckOutlined
    },
    setup() {
        const store = useStore<{ themeSetting: ThemeSettingType }>()
        // 动画
        const animate = computed<{ disabled: boolean; name: string }>(
            () => store.getters['themeSetting/getAnimates']
        )
        // 当前颜色
        const pureColor = computed(() => store.getters['themeSetting/themeColor'])
        // 侧边导航
        const showBroadside = computed(() => true)
        // const showBroadside = computed(() => store.getters['themeSetting/getShowBroadside'])
        // 显示
        const visible = ref<boolean>(false)
        // 设置切换动画
        const setAnimate = (animate: { disabled: boolean; name: string }) => {
            const hide = message.loading('正在设置页面切换动画', 0)
            const timer = setTimeout(() => {
                store.commit('themeSetting/setAnimates', animate)
                hide()
                clearTimeout(timer)
            }, 500)
        }

        // 启用侧边导航
        const onChangeTopNavEnable = (v: boolean): void => {
            store.commit('themeSetting/setShowBroadside', v)
        }

        // 关闭
        const close = () => (visible.value = false)
        // 显示
        const show = () => (visible.value = true)
        // 改变颜色
        const changeThemeColorHandle = (color: string) => {
            const hide = message.loading('正在切换主题色', 0)
            changeThemeColor(color)
                .then(t => {
                    message.success('切换主题色成功')
                    store.commit('themeSetting/changeThemeSettingType', color)
                })
                .catch(error => {
                    message.error('切换主题色失败')
                })
                .finally(() => {
                    hide()
                })
        }

        return {
            animate,
            pureColor,
            animates,
            visible,
            showBroadside,
            layoutStyle: settings.systemLayoutList,
            colorStyle: settings.systemColorList,
            close,
            show,
            setAnimate,
            onChangeTopNavEnable,
            changeThemeColorHandle
        }
    }
})
</script>

<style lang="less" scoped>
.theme-btn {
    position: fixed;
    display: block;
    width: 45px;
    height: 45px;
    right: 0;
    top: 33%;
    text-align: center;
    border-radius: 5px 0 0 5px;
    z-index: 126;
}

.title {
    font-size: 14px;
    color: @title-color;
    line-height: 22px;
    margin-bottom: 12px;
}

.style-item {
    margin-bottom: 25px;
}

.check-item-icon {
    color: @title-color;

    &.color-icon {
        color: @white;
    }
}

.layout-item {
    display: inline-block;
    margin-right: 16px;
    position: relative;
    border-radius: 4px;
    cursor: pointer;

    .check-item {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        font-size: 14px;
        font-weight: bold;
    }
}

.layout-color-item {
    margin-right: 8px;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;

    .check-item {
        font-size: 14px;
        font-weight: bold;
        box-sizing: border-box;
    }
}
</style>
-->
