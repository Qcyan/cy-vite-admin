import { RoutesDataItem } from '@/utils/routes'
import { ConfigEnv, loadEnv, UserConfig } from 'vite'

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
     * 平台名称
     */
    platformTitle: string
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
    sideTitle: string

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
    /**
     * 系统logo文字
     */
    systemLogoText: any
    /**
     * 授权信息
     */
    proUrl: {
        component: string
        surface: string
        auth: string
        authLocalKey: string
        authParamsKey: string
        authParamsValue: string
    }
    // 打印机列表
    printerList: Array<{ name: string; wsUrl: string }>
    // 打印机名称
    printerBaseName: string

    // 系统布局设置
    systemLayoutList: Array<{ layout: boolean; src: string; name: string }>
    // 系统颜色设置
    systemColorList: Array<string>
}
// const CWD = process.cwd();
// const { mode } = ConfigEnv
// const { VUE_APP_NAME } = loadEnv(mode, CWD);

const settings: SettingsType = {
    systemLogo: new URL(`@/assets/images/logo.png`, import.meta.url).href,
    systemLogoText: new URL(`@/assets/images/logo-text.png`, import.meta.url).href,
    // siteTitle: VUE_APP_NAME,
    siteTitle: '',
    // sideTitle: VUE_APP_NAME,
    sideTitle: '',
    platformTitle: '拼多多',
    printerBaseName: '拼多多',
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
    ajaxResponseNoVerifyUrl: [],
    iconfontUrl: [],
    proUrl: {
        // 打印组件下载地址
        component:
            'https://api.pinduoduo.com/api/app/v1/latest/xunmeng.merchant.windows.orderprinter/windows',
        // 开通面单
        // surface: 'https://mms.pinduoduo.com/logistics/open',
        surface: 'https://mms.pinduoduo.com/daxue/detail?courseId=1280',
        // 授权地址
        // auth: 'http://mms.pinduoduo.com/open.html?response_type=code&client_id=7acbff902ee24274982ed02d9b508919&redirect_uri=http://pdddd.zhufa139.com',
        auth: 'https://fuwu.pinduoduo.com/service-market/auth?response_type=code&client_id=7acbff902ee24274982ed02d9b508919&redirect_uri=http://pdddd.zhufa139.com',
        // 多店铺授权参数
        authLocalKey: 'AUTH_SHOP_PHONE',
        authParamsKey: 'state',
        authParamsValue: 'AUTH_SHOP_STATE'
    },
    printerList: [
        { name: '拼多多', wsUrl: 'ws://localhost:5000' },
        { name: '菜鸟', wsUrl: 'ws://localhost:13528' }
    ],
    systemLayoutList: [
        {
            layout: true,
            src: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
            name: '侧边导航'
        },
        {
            layout: false,
            src: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
            name: '顶部导航'
        }
    ],
    systemColorList: [
        '#45A1FF',
        '#f5222d',
        '#fa541c',
        '#fadb14',
        '#3eaf7c',
        '#13c2c2',
        '#1890ff',
        '#722ed1',
        '#eb2f96'
    ]
}

export default settings
