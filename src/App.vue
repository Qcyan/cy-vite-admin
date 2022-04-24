<template>
    <el-config-provider :locale="zhCn">
        <router-view #="{ Component, route }">
            <component :is="Component" :key="route.path" />
        </router-view>
    </el-config-provider>
</template>

<script  lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent, computed, onMounted } from 'vue'

export default defineComponent({
    name: 'App',
    setup() {
        // const { locale } = useI18n();
        // const antdLocales = computed(()=> antdMessages[locale.value]);

        onMounted(() => {
            // setHtmlLang(locale.value);
        })

        return {
            zhCn
        }
    }
})
</script>

<style></style>
