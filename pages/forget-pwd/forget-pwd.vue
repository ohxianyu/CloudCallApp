<template>
	<view class="forget">
		<view class="head">
			<view class="tit">
				<text>修改密码</text><text class="line"></text>
			</view>
		</view>
		<view class="input-box">
			<view class="input-item">
			    <view class="input-label">用户名</view>
				<view class="input-body">
					<input v-model="userName" maxlength="11" type="text" style="margin-right: 160upx;" placeholder="请输入用户名" class="input" >
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">新密码</view>
				<view class="input-body">
					<input v-model="pwd" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入密码" maxlength="20"  class="input" />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
			</view>
			<view class="input-item">
			    <view class="input-label">确认密码</view>
				<view class="input-body">
					<input v-model="rePwd" maxlength="11" type="number" style="margin-right: 160upx;" placeholder="确认密码" class="input" >
				</view>
			</view>
			<view class="input-item">
			    <view class="input-label">手机号</view>
				<view class="input-body">
					<input v-model="phone" maxlength="11" type="number" style="margin-right: 160upx;" placeholder="请输入手机号" class="input" >
					<button :disabled="!isCanSendCode" class="btn-code"  @click="sendCode">{{sendMsg}}</button>
				</view>
			</view>
			
			<view class="input-item">
				<view class="input-label">验证码</view>
				<view class="input-body">
					<input placeholder="请输入验证码" type="number" v-model="code" maxlength="6" class="input">
				</view>
			</view>
		</view>
		<button class="button" @click="submit">点击修改密码</button>
	</view>
</template>

<script>
	let timer = '';
	import {checkPhone,checkPwd,checkCode} from "@/common/common.js"
	export default {
		data() {
			return {
				sendMsg:"发送验证码",
				isCanSendCode:true,
				isHidePassword:true,
				userName:'',
				pwd:'',
				rePwd:'',
				phone:"",
				password:"",
				code:""
			};
		},
		onLoad() {
		},
		methods: {
			isHidePasswordClick(){
				this.isHidePassword=!this.isHidePassword
			},
			setCodeInterval () {
				//设置验证码重新发送定时器
			    let time = 60;
			    clearInterval(timer);
			    timer = setInterval(() => {
			        time--;
			        this.isCanSendCode=false;
			        this.sendMsg=time + "s"
			        if (time <= 0) {
			            this.isCanSendCode=true;
			            this.sendMsg="重新获取";
			            clearInterval(timer);
			        }
			    }, 1000)
			},
			clearCodeInterval(){
			    clearInterval(timer);
			    this.codemsg="获取验证码";
			},
			sendCode () {
				//发送验证码
			    if (!checkPhone(this.phone)) {
			        return
			    } 
				/*
				* 发送验证码逻辑
				*/
			   this.$http.post('login/sendForgetPwd', {tel: this.phone}).then(res => {
			   	uni.showToast({
			   		title: '发送成功',
			   		duration: 2000,
			   		icon:'none'
			   	});
			   });
			   this.setCodeInterval();
			},
			submit() {
				if(!checkPhone(this.phone)){
					return;
				};
				if(!checkPwd(this.pwd)){
					return;
				};
				if(!checkCode(this.code)){
					return;
				};
				/*
				* 修改密码逻辑
				*/
				this.$store.commit('update',['isLogin',true]);
				let httpData = {
					userName: this.userName,
					pwd: this.pwd,
					rePwd:this.rePwd,
					tel:this.phone,
					code:this.code
				}
				this.$http.post('login/modifyPwd', httpData).then(res => {
					console.log(res)
					uni.showToast({
						title: res.msg,
						duration: 2000,
						icon:'none'
					});
				});
			}
		}
	}
</script>

<style lang="scss">
.forget{
	background-color: #fff;
	height: calc(100vh - 88upx);
	.head{
		height: 400upx;
		background:url(../../static/image/bg.jpg);
		background-size: cover;
		display: flex;
		.tit{
			padding: 20upx 20upx 20upx 40upx;
			margin-top: auto;
			font-size: 60upx;
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			.line{
				margin-top: 14upx;
				width: 40upx;
				height: 6upx;
				background-color: #fff;
			}
		}
	}
}
</style>

