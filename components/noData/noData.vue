<template>
	<view class="no-data">
		<view class="img">
			<image src="../../static/image/noData.png" mode="widthFix"></image>
		</view> 
		<view>暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.no-data{
		margin: auto;
		text-align: center;
		padding: 60upx;
		color: $uni-color-p;
		.img {
			margin: auto;
			max-width: 80upx;
			image{
				width: 100%;
			}
		}
	}
</style>
