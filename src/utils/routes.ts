import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import { isExternal } from './validate'

export type RoutesDataItem = RouteRecordRaw

/**
 * 面包屑类型
 */
export interface BreadcrumbType {
    // 标题，路由在菜单、浏览器title 或 面包屑中展示的文字，目前可以使用locales
    title: string
    // 路由地址或外链
    path: string
}

/**
 * tab导航存储规则类型
 */
export type TabNavType = 'path' | 'querypath'

/**
 * 头部tab导航类型
 */
export interface TabNavItem {
    route: RouteLocationNormalizedLoaded
    menu: RoutesDataItem
}

/**
 * 根据父path 设置当前项 path
 * @param pathname path
 * @param parentPath 父path - 默认 /
 * @param headStart 路由起始头 - 默认 /
 */
export const setRoutePathForParent = (
    pathname: string,
    parentPath = '/',
    headStart = '/'
): string => {
    if (isExternal(pathname)) {
        return pathname
    }

    return pathname.substr(0, headStart.length) === headStart
        ? pathname
        : `${parentPath}/${pathname}`
}

/**
 * 格式化返回 vue 路由, 主要处理特殊情况
 * @param routesData routes
 * @param parentPath 父path - 默认 /
 * @param headStart 路由起始头 - 默认 /
 */
export const vueRoutes = (
    routesData: RoutesDataItem[],
    parentPath = '/',
    headStart = '/'
): RoutesDataItem[] => {
    return routesData.map(item => {
        const { children, ...other } = item
        const itemChildren = children || []
        const newItem: RoutesDataItem = { ...other }
        newItem.path = setRoutePathForParent(newItem.path, parentPath, headStart)

        if (item.children) {
            newItem.children = [...vueRoutes(itemChildren, newItem.path, headStart)]
        }
        return newItem
    })
}

/**
 * 根据 hidden 判断是否有数据子集
 * @param children RoutesDataItem[]
 */
export const hasChildRoute = (children: RoutesDataItem[]): boolean => {
    const showChildren = children.filter(item => {
        if (item.hidden) {
            return false
        }
        return true
    })
    if (showChildren.length > 0) {
        return true
    }
    return false
}

/**
 * 获取当前路由对应的顶部菜单path
 * @param route route
 */
export const getRouteBelongTopMenu = (route: RoutesDataItem): string => {
    if (route.belongTopMenu) {
        return route.belongTopMenu
    }
    return `/${route.path.split('/')[1]}`
}

/**
 * 获取 route
 * @param pathname path
 * @param routesData routes
 */
export const getRouteItem = (pathname: string, routesData: RoutesDataItem[]): RoutesDataItem => {
    let item: RoutesDataItem = { title: '', path: '', redirect: '', roles: [] }
    for (let index = 0, len = routesData.length; index < len; index += 1) {
        const element = routesData[index]
        if (element.path === pathname) {
            item = element
            break
        }

        if (element.children) {
            item = getRouteItem(pathname, element.children)
            if (item.path !== '') {
                break
            }
        }
    }

    return item
}

/**
 * 获取当前路由选中的侧边栏菜单path
 * @param route route
 */
export const getSelectLeftMenuPath = (route: RoutesDataItem): string => {
    return route.selectLeftMenu || route.path
}

/**
 * 根据路由 path 格式化 - 获取 父path
 * @param pathname path
 * @param separator 路由分割符- 默认 /
 */
export const formatRoutePathTheParents = (pathname: string, separator = '/'): string[] => {
    const arr: string[] = []
    if (!pathname || pathname === '') {
        return arr
    }

    const pathArr = pathname.split(separator)
    for (let index = 1, len = pathArr.length - 1; index < len; index += 1) {
        arr.push(pathArr.slice(0, index + 1).join(separator))
    }

    return arr
}

/**
 * 根据 自定义传入权限名 判断当前用户是否有权限
 * @param userRoles 用户的权限
 * @param roles 自定义权限名
 */
export const hasPermissionRouteRoles = (
    userRoles: string[],
    roles?: string | string[]
): boolean => {
    if (userRoles.includes('admin')) return true
    if (typeof roles === 'undefined') return true
    if (typeof roles === 'string') return userRoles.includes(roles)
    if (roles instanceof Array && roles.length > 0) {
        return roles.some(role => userRoles.includes(role))
    }
    return false
}

/**
 * 根据 route.roles 判断当前用户是否有权限
 * @param roles 用户的权限
 * @param route 当前路由
 */
export const hasPermission = (roles: string[], route: RoutesDataItem): boolean => {
    if (roles.includes('admin')) return true
    if (route.roles) {
        return route.roles.some(role => roles.includes(role))
        //return roles.some(role => route.roles?.includes(role));
    }

    return true
}

/**
 * 根据用户权限 获取 对应权限菜单
 * @param roles 用户的权限
 * @param routes 框架对应路由
 */
export const getPermissionMenuData = (
    roles: string[],
    routes: RoutesDataItem[]
): RoutesDataItem[] => {
    const menu: RoutesDataItem[] = []
    for (let index = 0, len = routes.length; index < len; index += 1) {
        const element = { ...routes[index] }
        if (hasPermission(roles, element)) {
            if (element.children) {
                element.children = getPermissionMenuData(roles, element.children)
            }
            menu.push(element)
        }
    }
    console.log(menu, routes, roles,66666666666666)

    return menu
}

/**
 * 判断tabNav，对应的route是否相等
 * @param route1 vue-route
 * @param route2 vue-route
 * @param type 判断规则
 * @returns
 */
export const equalTabNavRoute = (
    route1: RouteLocationNormalizedLoaded,
    route2: RouteLocationNormalizedLoaded,
    type: TabNavType = 'path'
): boolean => {
    let is = false
    switch (type) {
        case 'querypath': // path + query
            is = equalObject(route1.query, route2.query) && route1.path === route2.path
            break
        default:
            // path
            is = route1.path === route2.path
            break
    }

    return is
}
