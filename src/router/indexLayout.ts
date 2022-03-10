import { RouteRecordRaw } from 'vue-router'

// 使用vite中的globEager方法读取目录下的所有ts文件
const routes: RouteRecordRaw[] = []
const modules = import.meta.globEager('./indexModules/*.ts')
for (const path in modules) {
    routes.push({ ...modules[path].default })
}

const IndexLayoutRoutes: Array<RouteRecordRaw> = routes

export default IndexLayoutRoutes
