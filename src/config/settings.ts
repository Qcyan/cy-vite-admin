import { RoutesDataItem } from '@/utils/routes'

/**
 * 站点配置
 * @author LiQingSong
 */
export interface SettingsType {
    /**
     * 站点名称
     */
    siteTitle: string

    /**
     * 顶部菜单开启
     */
    topNavEnable: boolean

    /**
     * 头部固定开启
     */
    headFixed: boolean

    /**
     * tab菜单开启
     */
    tabNavEnable: boolean

    /**
     * 站点首页路由
     */
    homeRouteItem: RoutesDataItem

    /**
     * 站点本地存储Token 的 Key值
     */
    siteTokenKey: string

    /**
     * Ajax请求头发送Token 的 Key值
     */
    ajaxHeadersTokenKey: string

    /**
     * Ajax返回值不参加统一验证的api地址
     */
    ajaxResponseNoVerifyUrl: string[]

    /**
     * iconfont.cn 项目在线生成的 js 地址
     */
    iconfontUrl: string[]

    /**
     * 侧边栏标题
     */
    silderTitle: string

    /**
     * 是否显示消息
     */
    isShowMessage: boolean

    /**
     * 是否显示多语言
     */
    isShowSelectLang: boolean

    /**
     * 是否显示右边配置菜单
     */
    isShowSysConfig: boolean

    /**
     * 系统logo
     */

    systemLogo: any
}

const settings: SettingsType = {
    systemLogo: import('@/assets/images/logo.png'),
    // systemLogo: null,
    siteTitle: '易掌柜打单',
    silderTitle: '易掌柜打单',
    isShowMessage: false,
    isShowSysConfig: false,
    isShowSelectLang: false,
    topNavEnable: true,
    headFixed: true,
    tabNavEnable: true,
    homeRouteItem: {
        icon: 'control',
        title: 'index-layout.menu.home.workplace',
        path: '/home/index',
        component: () => import('@/views/home/index.vue')
    },
    siteTokenKey: 'Authentication', // 保存的token的key
    ajaxHeadersTokenKey: 'x-token',
    ajaxResponseNoVerifyUrl: [
        '/user/login', // 用户登录
        '/user/info' // 获取用户信息
    ],
    iconfontUrl: []
}

export default settings
