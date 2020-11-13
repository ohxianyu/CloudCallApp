<template>
	<view class="user-wrap">
		<view class="user">
			<view class="head">
			</view>
			<text>{{info.userName}}</text>
			<text>[人工外呼坐席]</text>
		</view>
		<button type="primary" @click="logOut">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods:{
			logOut(){
				uni.removeStorage({
					key:'userInfo'
				})
				// uni.navigateTo({
				// 	url:'../login/login'
				// })
				this.$http.post('login/logout').then(res => {
					uni.showToast({
						title: res.msg,
						duration: 1000,
						icon: 'none'
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1300)
				}).catch(err=>{
					uni.navigateTo({
						url:'../login/login'
					})
				});
			},
			getInfo(){
				this.info = this.$store.state.userInfo;
			}
		}
	}

</script>

<style lang="scss" scoped>
	.user-wrap {
		.user {
			height: 400upx;
			background-color: $uni-color-primary;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			color: #fff;
			font-size: 32upx;

			.head {
				width: 200upx;
				height: 200upx;
				border-radius: 50%;
				background-color: #fff;
				background: url(../../static/image/default-img.png) no-repeat;
				background-size: cover;
				margin-bottom: 20upx;
			}

			text {
				margin-bottom: 6upx;
			}
		}
		button {
			margin: 100upx 40upx;
		}
	}
</style>
