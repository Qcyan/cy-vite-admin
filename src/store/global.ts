import {Mutation} from 'vuex';
// import {defineStore} from 'pinia'
import {StoreModuleType} from "@/utils/store";
import {TabNavItem} from '@/utils/routes';
import settings from '@/config/settings';

export interface FormSearchType {
    ExpressSort?: any[];
    LogisticsCompanyName?: any[];
    PrintCount?: any[];
    TimeSearch?: any[];
    exactSearch?: any[];
    mark?: any[];
    orderSortType?: any[];
    printStatus?: any[];
    quickSearch?: any[];
}

export interface globalStateType {
    // 左侧展开收起
    collapsed: boolean;
    // 顶部菜单开启
    topNavEnable: boolean;
    // 头部固定开启
    headFixed: boolean;
    // tab菜单开启
    tabNavEnable: boolean;

    // 头部tab导航列表
    headTabNavList: TabNavItem[];
    // 打印机列表
    printerList: [],
    // 默认打印机
    defaultPrinter: string | null,
    // 全局loading
    loading: boolean,
    // 全局loading加载提示
    loadingTip: string,
    // 全局搜索的条件
    formSearchCondition: FormSearchType
}
/*export const useGlobalStore = defineStore({
    id: 'app-global',
    state: ():globalStateType=>({
        ...initState
    });
    getters: {},
    actions: {};
})*/

export interface ModuleType extends StoreModuleType<globalStateType> {
    state: globalStateType;
    mutations: {
        changeLayoutCollapsed: Mutation<globalStateType>;
        setTopNavEnable: Mutation<globalStateType>;
        setHeadFixed: Mutation<globalStateType>;
        setTabNavEnable: Mutation<globalStateType>;
        setHeadTabNavList: Mutation<globalStateType>;
        setPrinterList: Mutation<globalStateType>;
        setLoadingStatus: Mutation<globalStateType>;
        setLoadingTip: Mutation<globalStateType>;
        setFormSearchCondition: Mutation<globalStateType>;
        setFormDefaultPrinter: Mutation<globalStateType>;
    };
    actions: {

    };
}

// const homeRoute = router.resolve(settings.homeRouteItem.path);


const initState: globalStateType = {
    collapsed: false,
    topNavEnable: settings.topNavEnable,
    headFixed: settings.headFixed,
    tabNavEnable: settings.tabNavEnable,
    headTabNavList: [],
    printerList: [],
    loading: false, // 全局加载中
    loadingTip: '', // 全局加载中提示
    formSearchCondition: {},
    defaultPrinter: null,
};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'global',
    state: {
        ...initState
    },
    mutations: {
        changeLayoutCollapsed(state, payload) {
            state.collapsed = payload;
        },
        setTopNavEnable(state, payload) {
            state.topNavEnable = payload;
        },
        setHeadFixed(state, payload) {
            state.headFixed = payload;
        },
        setTabNavEnable(state, payload) {
            state.tabNavEnable = payload;
        },
        setHeadTabNavList(state, payload) {
            state.headTabNavList = payload;
        },
        setPrinterList(state, payload) {
            state.printerList = payload;
        },
        setFormDefaultPrinter(state,payload){
            state.defaultPrinter = payload;
        },
        setLoadingStatus(state, status) {
            state.loading = status;
        },
        setLoadingTip(state,tip){
            state.loadingTip = tip;
        },
        setFormSearchCondition(state, payload: FormSearchType) {
            state.formSearchCondition = {};
            state.formSearchCondition = payload;
        }
    },
    actions: {}
}


export default StoreModel;
