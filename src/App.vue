<!--<script setup lang="ts">
import { provide } from 'vue'
</script>-->

<template>
    <a-config-provider :locale="locale">
        <router-view #="{ Component, route }">
            <component :is="Component" :key="route.path" />
        </router-view>
    </a-config-provider>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    onBeforeMount,
    watch,
    onBeforeUnmount,
    nextTick
} from 'vue'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default defineComponent({
    name: 'App',
    setup() {
        const locale = ref(zhCN)
        return {
            locale
        }
    }
})
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
