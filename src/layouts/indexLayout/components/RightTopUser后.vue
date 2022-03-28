<template>
    <a-dropdown>
        <div class="user-info">
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <a class="indexlayout-top-usermenu ant-dropdown-link" @click="e => e.preventDefault()">
                <!--                {{ currentUser.name }}-->
                <DownOutlined />
            </a>
        </div>
        <template #overlay>
            <a-menu @click="onMenuClick">
                <a-menu-item key="userinfo">
                    {{ t('index-layout.topmenu.userinfo') }}
                </a-menu-item>
                <a-menu-item key="logout">
                    {{ t('index-layout.topmenu.logout') }}
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { computed, ComputedRef, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store2/modules/user.ts'

export default defineComponent({
    name: 'RightTopUser',
    components: {
        DownOutlined
    },
    setup() {
        const userStore = useUserStore()

        const router = useRouter()

        // 获取当前登录用户信息
        // const currentUser = computed(() => useUserStore.currentUser)
        const currentUser = false

        // 点击菜单
        const onMenuClick = async (event: any) => {
            const { key } = event

            if (key === 'logout') {
                const res: boolean = await userStore.logout()
                if (res === true) {
                    router.replace({
                        path: '/user/login',
                        query: {
                            redirect: router.currentRoute.value.path,
                            ...router.currentRoute.value.query
                        }
                    })
                }
            }
        }

        return {
            currentUser,
            onMenuClick
        }
    }
})
</script>

<style lang="less" scoped>
.user-info {
    display: flex;
    align-items: center;
}
</style>
