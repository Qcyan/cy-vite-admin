<script setup lang="ts">
import { provide } from 'vue'
</script>

<template>
    <!--    <el-config-provider :locale="zhCn">-->
    <router-view #="{ Component, route }">
        <component :is="Component" :key="route.path" />
    </router-view>
    <!--    </el-config-provider>-->
</template>

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
