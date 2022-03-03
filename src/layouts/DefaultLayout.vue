<template>
    <router-view v-slot="{ Component }">
        <PageToggleTransition>
            <component v-if="reFreshState" :is="Component" />
        </PageToggleTransition>
    </router-view>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { ReFreshType } from '@/store/refresh'
import { computed } from 'vue'
import PageToggleTransition from '@/layouts/transition/PageToggleTransition.vue'

export default {
    name: 'DefaultLayout',
    components: {
        PageToggleTransition
    },
    setup() {
        const store = useStore<{ refresh: ReFreshType }>()
        const reFreshState = computed(() => {
            return true
            // return store.state.refresh.reFreshState
        })
        return {
            reFreshState
        }
    }
}
</script>
