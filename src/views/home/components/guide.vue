<template>
	<div class="cv-bd-org guide cv-flex cv-pd-tb-3px cv-pd-lr-5px cv-bd-radius-2">
		<span class="cv-mg-r-4px">!</span>
		<div class="guideCont">
			<div><span>1. 打印前需要设置发货人信息，设置完成才可以使用订单打印，</span><span class="cv-t-org">去设置</span></div>
			<div><span>2. 打印前需要开通电子面单服务，开通完成才可以使用订单打印，</span><span class="cv-t-org">去开通</span></div>
			<div><span>3. 打印前需快递单模板，添加后才可以使用订单打印，</span><span class="cv-t-org">去添加</span></div>
			<div><span>4. 打印前需先下载安装并启用组件，启用组件后才可以使用订单打印，</span><span class="cv-t-org">下载组件</span></div>
		</div>
	</div>
</template>

<style lang="less">
	.guide{
		background: rgba(203, 151, 73, 0.1);
	}
	.guideCont{
		line-height: 26px;
		span{
			cursor: pointer;
		}
	}
</style>
