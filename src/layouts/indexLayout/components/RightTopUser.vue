<template>
    <el-dropdown>
        <div class="user-info">
            <ElAvatar
                src="https://img0.baidu.com/it/u=325674188,3280397254&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500"
            />
            <a class="indexlayout-top-usermenu" @click="e => e.preventDefault()">
                {{ currentUser.name }}
            </a>
        </div>
    </el-dropdown>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user.ts'

export default defineComponent({
    name: 'RightTopUser',
    setup() {
        const userStore = useUserStore()
        const router = useRouter()

        // 获取当前登录用户信息
        const currentUser = computed(() => userStore.currentUser)

        // 点击菜单
        const onMenuClick = async (event: any) => {
            const { key } = event
            // 退出登录
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

<style lang="scss" scoped>
.user-info {
    display: flex;
    align-items: center;
}
</style>
