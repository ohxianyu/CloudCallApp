<style lang="scss" scoped>
	.login{
		height:  100vh;
		background-color: #fff!important;
		.head{
			height: 400upx;
			background:url(../../static/image/bg.jpg);
			background-size: cover;
			display: flex;
			.tit{
				padding: 20upx;
				margin-top: auto;
				font-size: 60upx;
				color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				.line{
					margin-top: 4upx;
					width: 40upx;
					height: 4upx;
					background-color: #fff;
				}
			}
		}
	}
</style>
<template>
	<view class="login">
		<public-module></public-module>
		<!-- head -->
		<view class="head">
			<view class="tit">
				<text>云呼叫</text><text class="line"></text>
			</view>
		</view>
		<view class="input-box">
			<view class="input-item">
				<view class="input-label">
					<image src="../../static/image/acout.png" mode="widthFix" style="width: 40upx;"></image>账号:
				</view>
				<view class="input-body">
					<input v-model="userName" type="text" placeholder="" class="input">
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">
					<image src="../../static/image/password.png" mode="widthFix" style="width: 40upx;"></image> 密码:
				</view>
				<view class="input-body">
					<input v-model="password" type="password" :password="isHidePassword?true:false" style="margin-right: 50upx;"
					 placeholder="" maxlength="20" class="input" />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
			</view>
			<view class="select">
				<!-- <navigator url="/pages/register/register" hover-class="none">注册</navigator> -->
				<!-- <navigator url="/pages/forget-pwd/forget-pwd" hover-class="none">忘记密码？</navigator> -->
			</view>
		</view>
		<button class="button" @click="submit">立即登录</button>
	</view>
</template>
<script>
	import {
		checkPhone,
		checkPwd
	} from "@/common/common.js"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				isHidePassword: true,
				userName: "",
				password: ""
			};
		},
		onLoad() {},
		methods: {
			...mapMutations(['setUserInfo']),
			onPageJump(url) {
				uni.navigateTo({
					url: url
				});
			},
			isHidePasswordClick() {
				this.isHidePassword = !this.isHidePassword
			},
			submit() {
				if (!this.userName) {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					});
					return
				};
				if (!checkPwd(this.password)) {
					return;
				};
				/*
				 * 登录逻辑
				 */
				let httpData = {
					userName: this.userName,
					pwd: this.password,
				}

				this.$http.post('login/login', httpData).then(res => {
					this.setUserInfo(res);
					// socket.init();
					uni.showToast({
						title: '登录成功',
						duration: 2000,
						icon: 'none'
					});
					// setTimeout(() => {
					// 	uni.navigateBack();
					// }, 2000);
					uni.reLaunch({
						url:'/pages/index/index'
					})
				});
				// this.$store.commit('update',['isLogin',true])
			}
		}
	}
</script>
