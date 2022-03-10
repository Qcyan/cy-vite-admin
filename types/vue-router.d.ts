/* 路由声明文件，扩展基础路由对象属性 */
import { _RouteRecordBase } from 'vue-router';

declare module 'vue-router' {
    interface _RouteRecordBase {
        /** 不在菜单中显示 */
        hideInMenu?: boolean
        /** 标题 */
        title: string | Title18n
        /** 菜单图标 */
        icon?: string
        /** 当前路由是否需要权限验证 */
        isAuth?: boolean
        /** 当前路由权限 */
        roles?: string[]
        /**
         * 面包屑自定义内容：
         *     1、默认不配置按照路由自动读取；
         *     2、设置为 false , 按照路由自动读取并不读当前自己；
         *     3、配置对应的面包屑格式如下：
         */
        breadcrumb?: BreadcrumbType[] | false
        /**
         * 设置tab导航存储规则类型
         *    1、默认不配置按照path(route.path)规则
         *    2、querypath：path + query (route.path+route.query) 规则
         */
        tabNavType?: TabNavType
        /** 是否需要缓存 */
        keepAlive?: boolean
        /**
         * 设置tab导航存储规则类型
         *    1、默认不配置按照path(route.path)规则
         *    2、querypath：path + query (route.path+route.query) 规则
         */
        tabNavType?: TabNavType
        /**
         * 设置该字段，则在关闭当前tab页时，作为关闭前的钩子函数
         * @param close 关闭回调函数
         */
        tabNavCloseBefore?: (close: () => void) => void
        /**
         * 左侧菜单选中，如果设置路径，侧栏将突出显示你设置的路径对应的侧栏导航
         *   1、（默认 route.path），此参数是为了满足特殊页面特殊需求，
         *   2、如：详情页等选中侧栏导航或在模块A下面的页面，想选模块B为导航选中状态
         */
        selectLeftMenu?: string
        /**
         * 所属顶级菜单,当顶级菜单存在时，用于选中顶部菜单，与侧栏菜单切换
         *   1、三级路由此参数的作用是选中顶级菜单
         *   2、二级路由此参数的作用是所属某个顶级菜单的下面，两个层级的必须同时填写一致，如果path设置的是外链，此参数必填
         *   3、(默认不设置 path.split('/')[0])，此参数是为了满足特殊页面特殊需求
         */
        belongTopMenu?: string
        /** 当前页面切换动画 */
        transitionName?: string
    }
}
