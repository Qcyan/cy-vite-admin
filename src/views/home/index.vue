<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import useAccountStore from '@/store/modules/test'

// const routesStore = useAccountStore()
// const tokens = computed(() => routesStore.token)

const token = storeToRefs(useAccountStore()).token

console.log(token, 'tokenstokens')
</script>

<template>
    <div>首页</div>
</template>

<style lang="less"></style>
