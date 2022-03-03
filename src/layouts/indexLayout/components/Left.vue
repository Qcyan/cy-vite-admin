<template>
	<div
		id="layout-left"
		v-if="showBroadside"
		:class="{ narrow: collapsed }"
	>
		<div class="layout-left-logo">
			<router-link to="/" class="logo-url">
				<template v-if="collapsed">
					<img
						:alt="config.sideTitle"
						:src="config.systemLogo"
						width="35"
						:title="config.sideTitle"
						class="cv-bd-radius-5"
					/>
				</template>
				<div v-else class="cv-flex cv-flex-ai-c">
					<img
						:alt="config.sideTitle"
						:src="config.systemLogo"
						width="35"
						:title="config.sideTitle"
						class="cv-mg-r-8px cv-bd-radius-5"
					/>
					<img
						:alt="config.sideTitle"
						:src="config.systemLogoText"
						height="24"
						:title="config.sideTitle"
					/>
				</div>
			</router-link>
		</div>
		<!-- 菜单 -->
		<div class="layout-left-menu">
			<slider-menu
				:menuData="menuData"
				:belongTopMenu="belongTopMenu"
				:selectedKeys="selectedKeys"
				:openKeys="openKeys"
				:collapsed="collapsed"
			>
			</slider-menu>
		</div>
	</div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from "vue";
import {RoutesDataItem} from "@/utils/routes";
import SliderMenu from "./SliderMenu.vue";
import settings, {SettingsType} from "@/config/settings";
import { useStore} from "vuex";
import {globalStateType as GlobalStateType, globalStateType} from "@/store/global";
import {ThemeSettingType} from "@/store/theme";

export default defineComponent({
	name: "Left",
	props: {
		collapsed: {
			type: Boolean,
			default: false,
		},
		topNavEnable: {
			type: Boolean,
			default: true,
		},
		belongTopMenu: {
			type: String,
			default: "",
		},
		selectedKeys: {
			type: Array as PropType<string[]>,
			default: () => {
				return [];
			},
		},
		openKeys: {
			type: Array as PropType<string[]>,
			default: () => {
				return [];
			},
		},
		onOpenChange: {
			type: Function as PropType<(key: any) => void>,
		},
		menuData: {
			type: Array as PropType<RoutesDataItem[]>,
			default: () => {
				return [];
			},
		},
	},
	components: {
		SliderMenu,
	},

	setup(ctx, props) {
		const store = useStore<{ themeSetting: ThemeSettingType }>();
		const config = ref<SettingsType>(settings);
		const showBroadside = computed(() => true);
		return {
			config,
			showBroadside
		};
	},
});
</script>

<style lang="less" scoped>
#layout-left {
	height: 100vh;
	display: flex;
	flex-direction: column;
	width: @leftSideBarWidth;
	color: #c0c4cc;
	transition-duration: 0.1s;

	.layout-left-logo {
		width: 100%;
		height: @headerHeight;
		line-height: @headerHeight;
		text-align: center;
		vertical-align: middle;
		background-color: @menu-dark-bg;

		.logo-url {
			display: inline-flex;
			width: 100%;
			height: 100%;
			overflow: hidden;
			align-items: center;
			justify-content: center;

			.logo-title {
				display: inline-block;
				margin: 0;
				font-size: 18px;
				font-family: Roboto, sans-serif;
				color: #fff;
				padding-left: 6px;
			}
		}

		img {
			vertical-align: middle;
		}
	}

	.layout-left-menu {
		flex: 1;
		overflow: hidden auto;
		height: calc(100vh - 50px);

		.left-scrollbar {
			width: 100%;
			height: 100%;
		}
	}

	&.narrow {
		width: @menu-collapsed-width;
	}

	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, .1);
		border-radius: 3px;
		box-shadow: inset 0 0 5px hsla(0,0%,100%,.05);
	}
	::-webkit-scrollbar-track {
		background: hsla(0,0%,100%,.15);
		border-radius: 3px;
		box-shadow: inset 0 0 5px rgba(37,37,37,.05);
	}
}
</style>

