<script lang="ts" setup>
import { computed } from 'vue'
import { useAccountStore } from '@/store2/modules/test'

const routesStore = useAccountStore()
const tokens = computed(() => routesStore.token)
console.log(tokens, 'tokenstokens')
</script>

<template>
    <div>首页</div>
</template>

<style lang="less"></style>
