<template>
	<view class="container">
		<view class="tit">
			<view class="ch">
				拨号盘
			</view>
			<view class="eg">
				Dialpad
			</view>
		</view>
		<!-- 手动拨号与通讯录 -->
		<view class="dialpad">
			<view>
				<span class="active">手动拨号</span>
				<span @click="getContact">通讯录</span>
			</view>
			<image  @click="ref" :class="[rotate?'go':'aa']" src="../../static/image/ref.png" mode=""></image>
		</view>
		<!-- 手动拨号 -->
		<view class="">
			<view class="shownumber">
				<text>{{phone}}</text>
				<image src="../../static/image/clear.png" mode="widthFix" v-show="!showClear" @click="clearPhone" style="width: 40upx;"></image>
			</view>
			<!-- keyboard -->
			<view class="keyboard">
				<view class="item" v-for="(item,index) in list" @click="pressKey(item)">
					<text class="tit">{{item.number}}</text>
					<text class="txt">{{item.text}}</text>
				</view>
			</view>
			<!-- 操作 -->
			<view class="oper">
				<view class="call">
					<image @click="call" src="../../static/image/call.png" mode="widthFix"></image>
				</view>
				<view class="back" @click="back" >
					<image v-show="this.phone.length>0" src="../../static/image/back.png" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<e-modal :visible.sync="visible" @cancel="handleCancel">
			<view class="input-box">
				<view class="input-item">
					<view class="input-label">验证码</view>
					<view class="input-body">
						<input v-model="code" maxlength="6" type="number" placeholder="请输入验证码" class="input">
						<button :disabled="!isCanSendCode" class="btn-code" @click="sendCode">{{sendMsg}}</button>
					</view>
				</view>
				<!-- <button style="margin-top: 40upx;" class="button" @click="submit">确定</button> -->
				<view style="text-align: center;margin-top: 40upx;">
					<button size="mini" type="primary" style="margin-right: 30upx;" @click="submit">
						确定
					</button>
					<button size="mini" type="warn" @click="cancel">取消</button>
				</view>
			</view>
		</e-modal>
	</view>
</template>

<script>
	let timer = '';
	import {
		checkPhone,
		checkPwd,
		checkCode
	} from "@/common/common.js"
	import nativeCommon from '@/js_sdk/WH-VisitContacts/native.common.js';
	import eModal from '../../components/e-modal/e-modal.vue'
	export default {
		components: {
			eModal
		},
		data() {
			return {
				visible: false,
				sendMsg: "获取验证码",
				code: '',
				isCanSendCode: true,
				tabIndex: 0,
				phone: '',
				rotate:false,
				showClear: true,
				tabBars: [{
					name: '手动拨号',
					id: 'renwu'
				}, {
					name: '通讯录',
					id: 'kefu'
				}],
				list: [{
						number: 1,
						text: '',
					},
					{
						number: 2,
						text: 'ABC',
					},
					{
						number: 3,
						text: 'DEF',
					},
					{
						number: 4,
						text: 'GHI',
					},
					{
						number: 5,
						text: 'JKL',
					},
					{
						number: 6,
						text: 'MNO',
					},
					{
						number: 7,
						text: 'PQRS',
					},
					{
						number: 8,
						text: 'TUV',
					},
					{
						number: 9,
						text: 'WXYZ',
					}, {
						number: '*',
						text: ''
					}, {
						number: 0,
						text: ''
					},
					{
						number: '#',
						text: ''
					}
				]
			}
		},
		watch: {
			phone(val) {
				if (this.phone) {
					this.showClear = false
				} else {
					this.showClear = true
				}
			}
		},
		methods: {
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			getContact() {
				let self = this
				//#ifdef APP-PLUS
				nativeCommon.contacts.getContact(function(name, number) {
					self.phone = number
				});
				//#endif
			},
			clearPhone() {
				this.phone = ''
			},
			pressKey(e) {
				if (this.phone.length >= 11) {
					return false
				}
				this.phone = this.phone.concat(e.number)
			},
			ref() {
				this.rotate = !this.rotate;
			},
			call() {
				let self = this;
				let httpData = {
					tel: this.phone,
				}
				this.$http.post('worker/callOne', httpData).then(res => {
					uni.showToast({
						title: res.msg,
						icon:'loading',
						mask:true,
						duration: 5500
					});
				}).catch(err => {
					if (err.errMsg === '【request】请输入短信验证码以确认为本人操作!') {
						setTimeout(() => {
							self.visible = true
						}, 1000)
					}
				});
			},
			back() {
				if(!this.phone){
					return
				}
				const str = this.phone
				this.phone = str.substr(0,str.length-1)
			},
			handleCancel() {
				
			},
			setCodeInterval() {
				//设置验证码重新发送定时器
				let time = 60;
				clearInterval(timer);
				timer = setInterval(() => {
					time--;
					this.isCanSendCode = false;
					this.sendMsg = time + "s"
					if (time <= 0) {
						this.isCanSendCode = true;
						this.sendMsg = "重新获取";
						clearInterval(timer);
					}
				}, 1000)
			},
			clearCodeInterval() {
				clearInterval(timer);
				this.codemsg = "获取验证码";
			},
			sendCode() {
				//发送验证码
				// if (!checkPhone(this.phone)) {
				// 	return
				// }
				/*
				 * 发送验证码逻辑
				 */
				this.$http.post('/worker/sendLoginSms').then(res => {
					uni.showToast({
						title: '发送成功',
						duration: 1000,
						icon: 'none'
					});
				});
				this.setCodeInterval();
			},
			//确认验证码
			submit() {
				this.$http.post('/worker/commitcode', {
					code: this.code
				}).then(res => {
					uni.showToast({
						title: res.msg,
						duration: 1000,
						icon: 'none'
					});
					this.visible = false
				});
			},
			cancel(){
				this.visible = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .input-box .input-item .input-label {
	// 	width: 100upx;
	// }

	body {
		background-color: #F6F6F6;
	}
	.aa {
		transition: all 1s;
	}
	
	.go {
		transform: rotate(-360deg);
		transition: all 1s;
	}
	
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		height: calc(100vh - 138px);
		background-color: #F6F6F6;

		.tit {
			.ch {
				color: $uni-color-theme;
				font-weight: bolder;
				font-size: 36upx;
				letter-spacing: 4upx;
			}

			.eg {
				color: $uni-color-p;
			}
		}

		.dialpad {
			padding: 16upx 0;
			border-bottom: 1px solid #D9D9D9;
			display: flex;
			align-items: center;
			justify-content: space-between;

			span {
				color: #9D9D9D;
				margin-right: 20upx;

				&.active {
					color: $uni-color-primary;
				}
			}

			image {
				width: 30upx;
				height: 30upx;
				vertical-align: middle;

			}
		}

		.shownumber {
			height: 40upx;
			padding: 40upx 80upx 0 20upx;
			font-size: 50upx;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				margin-left: 20upx;
			}
		}

		.keyboard {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 70upx;

			.item {
				background-color: #fff;
				text-align: center;
				border-radius: 50%;
				margin-top: 20upx;
				width: 140upx;
				height: 140upx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				.tit {
					font-size: 50upx;
					font-weight: bolder;
				}

				.txt {
					color: $uni-color-p;
				}
			}
		}
		.oper{
			position: relative;
			padding: 20upx 70upx;
			.call {
				text-align: center;
				align-self: center;
				image {
					width: 220upx;
					height: 220upx;
				}
			}
			.back {
				position: absolute;
				top: 10upx;
				right: 88upx;
				image {
					width: 120upx;
					height: 20upx;
				}
			}
		}
		
	}
</style>
