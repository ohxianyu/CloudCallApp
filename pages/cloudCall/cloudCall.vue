<template>
	<view class="cloudCall">
		<view class="tips">
			<image src="../../static/image/loc.png" mode=""></image>您当前的位置：云呼叫-呼叫记录
		</view>
		<view class="content">
			<view class="tit">
				<image src="../../static/image/tel.png" mode=""></image>
				<h4>拨打号码</h4>
			</view>
			<view class="form-item" style="display: flex;">
				<span>请输入电话号码：</span>
				<input type="number" maxlength="11"/>
			</view>
			<button type="default">拨打</button>
		</view>

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
	.tips {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		justify-content: center;
		align-items: center;
		font-size: 18upx;
		display: flex;
		color: $uni-color-p;
		box-shadow: 0 0 13px rgba(0, 0, 0, .2);

		image {
			margin-right: 20upx;
			width: 40upx;
			height: 40upx;
		}
	}

	.content {
		padding: 40upx;
		.tit {
			align-items: center;
			font-size: 18upx;
			display: flex;
			padding: 40upx 0;
			border-bottom: 1px solid $uni-color-p;

			image {
				margin-right: 20upx;
				width: 60upx;
				height: 60upx;
			}

			h4 {
				color: $uni-bg-theme;
				font-size: 40upx;

			}
		}
		.form-item{
			display: flex;
			padding: 50upx 0;
			span{
				font-size: 30upx;
				padding: 10upx 0;
				color: $uni-color-p;
			}
			input {
				border-radius: 4upx;
				padding: 10upx;
				flex: 1;
				box-shadow: 0 0 5px 1px rgba(0,0,0,.1);
			}
		}
		button{
			background: $uni-bg-theme;
			color: #fff;
		}
	}
</style>
