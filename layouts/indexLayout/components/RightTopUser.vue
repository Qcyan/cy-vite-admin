<template>
    <div class="cv-flex cv-flex-ai-c">
        <a-button class="cv-btn cv-btn-red ">续订</a-button>
        <a-button class="cv-btn cv-btn-org cv-mg-lr-20px">下载到桌面</a-button>
        <div class="cv-flex cv-flex-ai-c cv-mg-lr-10px">
            <div>切换店铺：</div>
            <a-select ref="select" class="select-shop" :value="currentShop.shopId" @change="switchShopInfo">
                <template v-for="(item,index) in currentShopList" :key="index">
                    <a-select-option :value="item.shopId">{{ item.shopName }}</a-select-option>
                </template>
            </a-select>
        </div>
        <div class="user-info">
            <a-popover placement="bottomRight" trigger="click">
				<template #content>
					<div class="cv-flex-join-c-sb">
						<a-avatar src="http://qingqingxuan.gitee.io/admin-work/assets/img_avatar.1d4c4a34.gif"/>
						<div class="cv-mg-l-10px">
							<span>软件版本：标准版</span>
							<div>剩余时间：16天</div>
							<div>到期时间：2021-12-09 11:45:00</div>
						</div>
					</div>
				</template>
				<a-avatar src="http://qingqingxuan.gitee.io/admin-work/assets/img_avatar.1d4c4a34.gif"  @click.stop="null" />
				<a class="layout-top-user" @click="(e) => e.preventDefault()">
					{{ currentShop.shopName || '暂无' }}
					<caret-down-outlined />
				</a>
            </a-popover>
        </div>
    </div>
</template>
<script lang="ts">
import {
	computed,
	ComputedRef,
	defineComponent, nextTick,
	Ref,
	ref
} from "vue";
import {CaretDownOutlined} from "@ant-design/icons-vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {globalStateType as UserStateType} from "@/store/user";
import {globalStateType as authStateType} from "@/store/auth";
import {changeMainShop} from "@/api/shopConfigApi";
import {message} from "ant-design-vue";
interface RightTopUserSetupData {
    onMenuClick: (event: any) => Promise<void>;
    currentSelectShop: Ref<string>;
    currentShopList: ComputedRef<any[]>;
    currentShop: ComputedRef<object>;
	switchShopInfo: (shopId: number) => void;
}

export default defineComponent({
    name: "RightTopUser",
    components: {
        CaretDownOutlined,
    },
    setup(): RightTopUserSetupData {
        const router = useRouter();
        const store = useStore<{ user: UserStateType, authorization: authStateType }>();

        // 当前选中的店铺
        const currentSelectShop = ref<string>('');
        // 当前店铺列表
        const currentShopList = computed(() => store.state.authorization.shopInfo.shopList);
        // 获取当前店铺信息
        const currentShop = computed(() => store.state.authorization.shopInfo.mainShop);
		// 切换店铺
        const switchShopInfo = async (shopId: number) => {
	        try {
		        const res = await changeMainShop({shopId});
		        store.commit('authorization/setAuthorization',res.data);
	            store.commit('refresh/changeReFreshType',false);
		        nextTick(()=>{
		            store.commit('refresh/changeReFreshType',true);
		            message.success('切换店铺成功');
		        })
	        }catch (e) {}
        }

        // 点击菜单
        const onMenuClick = async (event: any) => {
            const {key} = event;
            if (key === "logout") {
                const res: boolean = await store.dispatch("user/logout");
                if (res) {
                    router.replace({
                        path: "/user/login",
                        query: {
                            redirect: router.currentRoute.value.path,
                            ...router.currentRoute.value.query,
                        },
                    });
                }
            }
        };
        return {
            currentSelectShop,
            currentShopList,
            currentShop,
            onMenuClick,
	        switchShopInfo
        };
    },
});
</script>

<style lang="less" scoped>
.select-shop{
    width: 159px;
    color: @white;
    ::v-deep(.ant-select-selector){
        background-color: #4C5564 !important;
        border-radius: 5px;
        border: none !important;
    }
    ::v-deep(.ant-select-arrow){
        color: white !important;
    }
}
.user-info {
    display: flex;
    align-items: center;
	.layout-top-user{
		color: @white;
	    vertical-align: middle;
		padding-left: 5px;
		&:hover{
			color: @primary-color;
		}
	}
    .ant-dropdown-link{
        &:hover{
            color: @white;
        }
    }
}
</style>
