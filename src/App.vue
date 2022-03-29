<template>
    <el-config-provider :locale="zhCn">
        <router-view #="{ Component, route }">
            <component :is="Component" :key="route.path" />
        </router-view>
    </el-config-provider>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style>
</style>
