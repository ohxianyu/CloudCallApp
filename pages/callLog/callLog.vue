<template>
	<view class="container">
		<public-module></public-module>
		<view class="tit">
			<view class="ch">
				通话记录
			</view>
			<view class="eg">
				Call records
			</view>
		</view>
		<!--  -->
		<view class="dialpad">
			<span class="active">通话记录</span>
			<image @click="ref" :class="[rotate?'go':'aa']" src="../../static/image/ref.png" mode=""></image>
		</view>
		<!--  -->
		<view class="content">
			<view class="form-item" style="display: flex;">
				<input v-model="httpData.tel" type="number" maxlength="11" placeholder="联系电话" />
			</view>
			<button type="default" @click="search">搜索</button>
		</view>
		<!-- 表格 -->
		<view class="table_wrapper">
			<view class="table">
				<table v-if="list.length>0">
					<thead>
						<tr>
							<th>呼叫</th>
							<th>呼叫时间</th>
							<th>通话时长</th>
							<th>主叫</th>
							<th>被叫</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="num in list">
							<td>{{num.line}}</td>
							<td>{{num.callTime}}</td>
							<td>{{num.callLong}}</td>
							<td>{{num.caller}}</td>
							<td>{{num.callee}}</td>
							<td>
								<span v-if="num.line == 'B'&&num.isConnect=='1'" class="operation" @click="soundRecording(num.recordId)">[录音]</span>
							</td>
						</tr>
					</tbody>
				</table>
				<div v-else>
					<noData />
				</div>
				<view class="paginate">
					<view class="">
						<span></span>
						<div style="font-size: 24upx;padding: 10upx 20upx;color: #A9A9A9;">当前页：{{httpData.page}}，数据总量：{{countList}}条，每页数据：10</div>
					</view>
					<uni-pagination title="标题文字" total="20" @change="change" :totalPage="totalPage" :total="countList"></uni-pagination>
				</view>
			</view>
		</view>

		<voice-modal :visible.sync="visible" @cancel="handleCancel">
			<view class="input-box">
				<view class="page-section page-section-gap" style="text-align: center;">
					<luch-audio :src="current.src" :play.sync="audioPlay"></luch-audio>
				</view>

				<view style="text-align: center;margin-top: 40upx;">
					<button size="mini" type="primary" style="margin-right: 30upx;" @click="download">
						下载
					</button>
					<button size="mini" type="warn" @click="cancel">取消</button>
				</view>

			</view>
		</voice-modal>
	</view>
</template>

<script>
	import luchAudio from '../../components/luch-audio/luch-audio.vue'
	import noData from '../../components/noData/noData.vue'
	import voiceModal from '../../components/e-modal/e-modal.vue'
	export default {
		components: {
			noData,
			voiceModal,
			luchAudio
		},
		data() {
			return {
				list: [],
				httpData: {
					talkTime: 'all',
					intention: '',
					pageSize: 10,
					page: 1,
					tel: ''
				},
				visible: false,
				countList: 1,
				totalPage: 1,
				rotate: false,
				current: {
					poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
					name: '客户录音',
					author: '云呼叫',
					src: '',
				},
				audioAction: {
					method: 'pause'
				},
				audioPlay: false
			}
		},
		onLoad() {
			this.getRecordlist()
		},
		methods: {
			getRecordlist() {
				this.$http.post('worker/callRecord', this.httpData).then(res => {
					this.list = res.list
					this.countList = res.countList
					this.totalPage = res.totalPage
				});
			},
			handleCancel() {},
			ref() {
				this.rotate = !this.rotate;
				this.getRecordlist()
			},
			search() {
				this.getRecordlist()
			},
			change(e) {
				this.httpData.page = e.current
				this.getRecordlist()
			},
			soundRecording(id) {
				this.getAudioUrl(id)
			},
			getAudioUrl(id) {
				this.$http.post('worker/getrecord', {
					recordId: id
				}).then(res => {
					this.current.src = res
					this.visible = true;
				}).catch(() => {
					this.current.src = ''
				});
			},
			cancel() {
				this.visible = false;

			},
			download() {
				uni.downloadFile({
					url: this.current.src,
					success: function(data) {
						if (data.statusCode === 200) {
							uni.saveFile({
								tempFilePath: data.tempFilePath, //临时路径
								success: function(res) {
									uni.showToast({
										icon: 'none',
										mask: true,
										title: '文件已保存：' + res.savedFilePath, //保存路径
										duration: 3000,
									});
									setTimeout(() => {
										//打开文档查看
										uni.openDocument({
											filePath: res.savedFilePath,
											success: function(res) {
												// console.log('打开文档成功');
											}
										});
									}, 3000)
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	/deep/.uni-audio-default {
		min-width: auto !important;
	}

	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
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
			justify-content: space-between;
			align-items: center;

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

		.content {
			// padding: 40upx;

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

			.form-item {
				display: flex;
				padding: 50upx 0;

				input {
					color: $uni-color-p;
					font-size: 28upx;
					border-radius: 4upx;
					padding: 18upx;
					flex: 1;
					box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
					background-color: #fff;
					border-radius: 8upx;
				}
			}

			button {
				padding: 4upx 0;
				font-size: 28upx;
				background: $uni-color-primary;
				color: #fff;
			}
		}

		.table_wrapper {
			// padding: 0 40upx;
			margin-top: 40upx;

			overflow: hidden;

			// box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
			.table {
				// min-height: 400upx;
				border-radius: 8upx;
				background-color: #fff;

				// box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
				table {
					border-collapse: collapse;
					border-spacing: 0;
					display: block;
					// margin-bottom: 1rem;
					overflow: auto;
					width: 100%;

					tr th {
						text-align: center;
						// font-size: 30upx;
						font-weight: normal;
						background-color: #f8f8f8;
						color: $uni-color-theme;
						padding: 6px 20px;
						white-space: nowrap;
						border: 1px solid #ddd;
					}

					td {
						border: 1px solid #ddd;
						text-align: center;
						height: 40px;
						padding: 6px 20px;
						white-space: nowrap;
						font-size: 28upx;
						color: $uni-color-p;
					}
				}

			}
		}

		.paginate {
			border: 1upx solid #ddd;
			border-top: none;
		}
	}
</style>
