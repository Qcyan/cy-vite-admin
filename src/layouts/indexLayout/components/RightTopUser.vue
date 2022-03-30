<template>
    <el-dropdown>
        <div class="user-info">
            <el-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <a class="indexlayout-top-usermenu ant-dropdown-link" @click="e => e.preventDefault()">
                {{ currentUser.name }}
                <DownOutlined />
            </a>
        </div>
        <template #overlay>
            <el-dropdown-menu @click="onMenuClick">
                <el-dropdown-item key="userinfo">
                    {{ t('index-layout.topmenu.userinfo') }}
                </el-dropdown-item>
                <el-dropdown-item key="logout">
                    {{ t('index-layout.topmenu.logout') }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { computed, ComputedRef, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user.ts'

export default defineComponent({
    name: 'RightTopUser',
    components: {
        DownOutlined
    },
    setup() {
        const userStore = useUserStore()
        const router = useRouter()

        // 获取当前登录用户信息
        const currentUser = computed(() => userStore.currentUser)

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
