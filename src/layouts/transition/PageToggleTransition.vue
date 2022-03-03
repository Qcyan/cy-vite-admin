<template>
    <transition
        v-if="!animateInfo.disabled && animateInfo.name"
        :enter-active-class="`animated ${enterAnimate} page-toggle-enter-active`"
        :leave-active-class="`animated ${leaveAnimate} page-toggle-leave-active`"
    >
        <slot></slot>
    </transition>
    <transition v-else-if="!animateInfo.disabled && !animateInfo.name" name="fade-slide" appear>
        <slot></slot>
    </transition>
    <transition v-else>
        <slot></slot>
    </transition>
</template>

<script lang="ts">
import { preset as animates } from '@/config/animate'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { globalStateType as GlobalStateType } from '@/store/global'
import { ThemeSettingType } from '@/store/theme'
export default {
    name: 'PageToggleTransition',
    setup(props, ctx) {
        const store = useStore<{ themeSetting: ThemeSettingType }>()
        const animateInfo = computed<{ disabled: boolean; name: string }>(() => {
            return {
                disabled: false,
                name: ''
            }
            // return store.getters['themeSetting/getAnimates']
        })
        const direction = [
            'x',
            'y',
            'left',
            'right',
            'up',
            'down',
            'downLeft',
            'upRight',
            'downRight',
            'upLeft',
            'downBig',
            'upBig',
            'downLeft',
            'downRight',
            'topRight',
            'bottomLeft',
            'topLeft',
            'bottomRight',
            'default'
        ]
        const reverse = ref<boolean>(true)

        const reversePosition = (direction, directions) => {
            if (direction.length == 0 || direction == 'x' || direction == 'y') {
                return direction
            }
            let index = directions.indexOf(direction)
            index = index % 2 == 1 ? index - 1 : index + 1
            return directions[index]
        }

        const activeClass = isLeave => {
            let animate = animates.find(item => animateInfo.value.name == item.name)
            if (!animate) return ''
            let direction: any = ''
            if (!direction) {
                direction = animate.directions[0]
            } else {
                direction = animate.directions.find(item => item == direction)
            }
            direction = direction == undefined || direction === 'default' ? '' : direction
            if (direction != '') {
                direction =
                    isLeave && reverse ? reversePosition(direction, animate.directions) : direction
                direction = direction[0].toUpperCase() + direction.substring(1)
            }
            let t = isLeave ? 'Out' : 'In'
            return animate.name + t + direction
        }

        const enterAnimate = computed(() => activeClass(false))
        const leaveAnimate = computed(() => activeClass(true))

        return {
            animateInfo,
            enterAnimate,
            leaveAnimate
        }
    }
}
</script>

<style lang="less" scoped>
.page-toggle-enter-active {
    position: absolute !important;
    animation-duration: 0.8s !important;
    width: calc(100%) !important;
}

.page-toggle-leave-active {
    position: absolute !important;
    animation-duration: 0.8s !important;
    width: calc(100%) !important;
}

.page-toggle-enter {
}

.page-toggle-leave-to {
}
</style>
