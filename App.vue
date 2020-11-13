<script>
export default {
	onLaunch: function() {
		const self  = this;
		uni.getStorage({
			 key: 'userInfo',
			    success: function (res) {
			        self.$store.state.userInfo =  Object.assign({}, self.$store.state.userInfo,res.data);
			    },
				fail: function (err) {
					uni.redirectTo({
						url:'/pages/login/login'
					})
				}
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
body{
	background-color: #F6F6F6;
}
.operation{
	color: $uni-color-primary;
	padding: 4upx;
}
	/*每个页面公共css */
	button::after{
		border: none;
	}
	.input-box {
		padding: 50upx;
		font-size: 30upx;
		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			// height: 100upx;
			.input-label {
				width: 150upx;
				display: flex;
				align-items: center;
				color: $uni-color-p;
				image{
					margin-right: 20upx;
				}
			}
			.input-body{
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 100upx;
					height: 100upx;
					position: relative;
					font-size: 28upx;
				}
				.eye{
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.btn-code{
				    position: absolute;
				    right: 0upx;
				    top:50%;
				    transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100upx;
					line-height: 100upx;
				}
			}
			
		}
		.select {
			text-align: right;
			padding-top: 40upx;
			// display: flex;
			// justify-content: space-between;
			color: #003B67;
			navigator{
				text-align: right!important;
			}
		}
	}
	.button{
		margin:0 30upx;
		background: $uni-color-primary;
		border-radius:10upx;
		line-height: 80upx;
		height: 80upx;
		color: white;
		font-size: 32upx;
	}
</style>
