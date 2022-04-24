import { App, Component } from 'vue'
import 'element-plus/dist/index.css'

import { Cellphone, Avatar, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'

import {
    ElAffix,
    ElSkeleton,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElScrollbar,
    ElSubMenu,
    ElButton,
    ElCol,
    ElRow,
    ElSpace,
    ElDivider,
    ElCard,
    ElDropdown,
    ElDialog,
    ElMenu,
    ElMenuItem,
    ElDropdownItem,
    ElDropdownMenu,
    ElIcon,
    ElLink,
    ElAvatar,
    ElInput,
    ElForm,
    ElFormItem,
    ElLoading,
    ElPopover,
    ElPopper,
    ElTooltip,
    ElDrawer,
    ElPagination,
    ElAlert,
    ElRadioButton,
    ElRadioGroup,
    ElInfiniteScroll
} from 'element-plus'

const iconComponents = [Cellphone, Avatar, DArrowLeft, DArrowRight]

const components = [
    ElAffix,
    ElSkeleton,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElScrollbar,
    ElSubMenu,
    ElButton,
    ElCol,
    ElRow,
    ElSpace,
    ElDivider,
    ElCard,
    ElDropdown,
    ElDialog,
    ElMenu,
    ElMenuItem,
    ElDropdownItem,
    ElDropdownMenu,
    ElIcon,
    ElLink,
    ElAvatar,
    ElInput,
    ElForm,
    ElFormItem,
    ElPopover,
    ElPopper,
    ElTooltip,
    ElDrawer,
    ElPagination,
    ElAlert,
    ElRadioButton,
    ElRadioGroup
]

const plugins = [ElLoading, ElInfiniteScroll]

export function setupElementPlus(app: App) {
    components.forEach((component: Component) => {
        app.component(component.name!, component)
    })
    for (const iconName of iconComponents) {
        app.component(iconName.name, iconName)
    }
    plugins.forEach(plugin => {
        app.use(plugin)
    })
}
