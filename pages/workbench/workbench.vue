<template>
	<view class="container">
		<public-module></public-module>
		<view class="tit">
			<view class="ch">
				工作台
			</view>
			<view class="eg">
				Workbench
			</view>
		</view>

		<view class="dialpad">
			<view>
				<span v-for="(tab,index) in tabBars" :key="tab.id" :data-current="index" @click="ontabtap" :class="tabIndex==index ? 'active' : ''">{{tab.name}}</span>
			</view>
			<image @click="ref" :class="[rotate?'go':'aa']" src="../../static/image/ref.png" mode=""></image>
		</view>
		<!-- 我的任务 -->
		<view v-if="tabIndex==0" class="task">
			<view class="form-item" style="display: flex;">
				<input type="text" v-model="httpData.taskName" maxlength="11" placeholder="任务名" />
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="form-item" style="display: flex;">
				<button type="default" @click="search">搜索</button>
				<!-- <button type="" :disabled="true">添加</button> -->
			</view>
			<!-- 表格 -->
			<view class="table_wrapper">
				<view class="table">
					<table v-if="list.length>0">
						<thead>
							<tr>
								<th>任务名</th>
								<th>任务状态</th>
								<th>进度</th>
								<th>创建时间</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in list" :key="item.twId">
								<td>{{item.taskName}}</td>
								<td>{{item.taskStatus}}</td>
								<td>{{item.jindu}}</td>
								<td>{{item.createTime}}</td>
								<td>

									<span v-if="item.taskStatus == '暂停中'||item.taskStatus=='异常暂停'&&(item.taskStatus!=='商家暂停'||item.taskStatus!=='已完成'||item.taskStatus!=='失效')"
									 class="operation" @click="goOn(item.twId)">[执行]</span>
									<span v-if="item.taskStatus=='执行中'&&(item.taskStatus!=='商家暂停'||item.taskStatus!=='已完成'||item.taskStatus!=='失效')"
									 class="operation" @click="stop(item.twId)">[暂停]</span>
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
							<div style="font-size: 24upx;padding:10upx 20upx;color: #A9A9A9;">当前页：{{httpData.page}}，数据总量：{{countList}}条，每页数据：10</div>
						</view>
						<x-pagination @change="changeTask" title="我的任务" total="20" :totalPage="totalPage" :total="countList"></x-pagination>
						<!-- <zhini-pagination :totalPage="totalPage" :currentPage.sync="currentPage" @pageNum="getNum"></zhini-pagination> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 我的客户 -->
		<view v-else class="customer">
			<view class="form-item" style="display: flex;">
				<input type="number" v-model="httpData2.tel" maxlength="11" placeholder="联系电话" />
				<input type="text" v-model="httpData2.taskName" maxlength="11" placeholder="任务名" />
			</view>
			<view class="form-item" style="display: flex;">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange2" :value="index2" :range="serchallPurposes" range-key="value">
								<!-- <view class="uni-input">{{allPurposes[index2]['value']}}</view> -->
								<view class="uni-input">{{serchallPurposes[index2]['value']}}</view>
								<!-- <view class="uni-input" v-else style="color: #9D9D9D;;">请选择意向度</view> -->
							</picker>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChangeYx" :value="index3" :range="array3">
								<view class="uni-input">{{array3[index3]}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<button type="default" @click="search2">搜索</button>
			<view class="table_wrapper">
				<view class="table">
					<table v-if="customers.length>0">
						<thead>
							<tr>
								<th>联系电话</th>
								<th>接通状态</th>
								<th>呼叫状态</th>
								<th>任务名</th>
								<th>客户意向</th>
								<th>备注信息</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in customers" :key="item.customerId">
								<td>{{item.tel}}</td>
								<td>{{item.isConnect}}</td>
								<td>{{item.isCall}}</td>
								<td>{{item.taskName}}</td>
								<td>{{item.purpose}}</td>
								<td>{{item.remark}}</td>
								<td><span class="operation" @click="edit(item)">[编辑]</span> <span class="operation" @click="callCustomer(item.customerId)">[呼叫]</span></td>
							</tr>
						</tbody>
					</table>
					<div v-else>
						<noData />
					</div>
					<view class="paginate">
						<view class="">
							<span></span>
							<div style="font-size: 24upx;padding:10upx 20upx;color: #A9A9A9;">当前页：{{httpData2.page}}，数据总量：{{countList_customer}}条，每页数据：10</div>
						</view>
						<uni-pagination title="我的客户" @change="changeCustomers" total="20" :totalPage="totalPage_customer" :total="countList_customer"></uni-pagination>

					</view>
				</view>
			</view>
		</view>
		<!-- 编辑modal -->
		<e-modal :visible.sync="visible" @cancel="handleCancel">
			<view class="input-box">
				<view class="input-item" v-for="(v,customer) in fields" :key="v">
					<view class="input-label">{{v}}</view>
					<view class="input-body">
						<input v-model="customerInfo[customer]" :placeholder="v" class="input">
					</view>
				</view>
				<view class="input-item">
					<view class="input-label">意向度</view>

					<picker @change="bindPickerYxd" :value="yxdIndex" :range="allPurposes" range-key="value">
						<view class="uni-input" v-if="showyxdSelect">{{allPurposes[yxdIndex]['value']}}</view>
						<view class="uni-input" v-else style="color: #9D9D9D;;">请选择意向度</view>
					</picker>
				</view>

				<view class="input-item">
					<view class="input-label">备注信息</view>
					<view class="input-body">
						<input v-model="customerInfo['remark']" placeholder="请输入备注信息" class="input">
					</view>
				</view>

				<view style="text-align: center;margin-top: 40upx;">
					<button size="mini" type="warn" @click="cancel">取消</button>
					<button size="mini" type="primary" style="margin-left: 30upx;" @click="submit">确定</button>

				</view>

			</view>
		</e-modal>
		<!-- 意向度搜集 -->
		<yx-modal :visible.sync="visible_yx" @cancel="handleCancel">
			<view class="input-box">
				<view class="input-item" v-for="(k,item) of fields2" :key="item">
					<view class="input-label">{{k}}</view>
					<view class="input-body">
						<input v-model="customerInfos[item]" class="input">
					</view>
				</view>
				<view class="input-item">
					<view class="input-label">意向度</view>
					<view class="input-body">
						<picker @change="bindPickerYxc" :value="yxcIndex" :range="allPurposes" range-key="value">
							<view class="uni-input" v-if="showyxcSelect">{{allPurposes[yxcIndex]['value']}}</view>
							<view class="uni-input" v-else style="color: #9D9D9D;">请选择意向度</view>
						</picker>
					</view>
				</view>
				<view class="input-item">
					<view class="input-label">备注</view>
					<textarea v-model="remark" auto-height />
					</view>
				<view style="text-align: center;margin-top: 40upx;">
					<button size="mini" type="warn" @click="cancel">取消</button>
					<button size="mini" type="primary" style="margin-left: 30upx;" @click="purposeSubmit">确定</button>
	
				</view>
			</view>
		</yx-modal>
		<!-- 二维码 -->
		<code-modal :visible.sync="visible_code" @cancel="handleCancel">
			<view class="input-box">
				<view class="input-item">
					<view class="input-label">验证码</view>
					<view class="input-body">
						<input v-model="code" maxlength="6" type="number" placeholder="请输入验证码" class="input">
						<button :disabled="!isCanSendCode" class="btn-code" @click="sendCode">{{sendMsg}}</button>
					</view>
				</view>
				<view style="text-align: center;margin-top: 40upx;">
					<button size="mini" type="warn" @click="cancel">取消</button>
					<button size="mini" type="primary" style="margin-left: 30upx;" @click="submitCode">确定</button>
				</view>
				<!-- <button style="margin-top: 40upx;"  class="button" @click="submitCode">确定</button> -->
			</view>
		</code-modal>
	</view>
</template>

<script>
	let timer = '';
	import noData from '../../components/noData/noData.vue'
	import eModal from '../../components/e-modal/e-modal.vue'
	import yxModal from '../../components/e-modal/e-modal.vue'
	import codeModal from '../../components/e-modal/e-modal.vue'
	import ZhiniPagination from '@/components/zhini-pagination/zhini-pagination.vue';
	import xPagination from '@/components/x-pagination/x-pagination.vue'
	export default {
		components: {
			noData,
			eModal,
			yxModal,
			xPagination,
			codeModal,
			ZhiniPagination
		},
		data() {
			return {
				rotate:false,
				tabIndex: 0,
				tabBars: [{
					name: '我的任务',
					id: 'renwu'
				}, {
					name: '我的客户',
					id: 'kefu'
				}],
				array: ['任务状态', '暂停', '执行中', '商家暂停', '异常暂停','已完成', '失效'],
				array2: ['客户满意度', '完全没意向', '意向强烈', '意向度高', '一般', '意向度低'],
				array3: ['接通状态','未接通','已接通'],
				array4: ['客户满意度', '完全没意向', '意向强烈', '意向度高', '一般', '意向度低'],
				index: 0,
				index2: 0,
				index3: 0,
				index4: 0,
				yxdIndex:0,
				yxcIndex:0,
				list: [],
				customers: [],
				httpData: {
					taskName: '',
					taskStatus: '',
					pageSize: 10,
					page: 1,
				},
				httpData2: {
					page: 1,
					pageSize: 10,
					tel: '',
					purpose: '',
					isConnect: '',
					taskName: ''
				},
				countList: 1,
				totalPage: 1,
				countList_customer:1,
				totalPage_customer:1,
				visible: false,
				visible_yx:false,
				visible_code:false,
				sendMsg: "获取验证码",
				code: '',
				isCanSendCode: true,
				fields: '',
				customerInfo: '',
				workerId:'',
				name:'',
				tel:'',
				address:'',
				received_msg:'',
				remark:'',
				purpose:'',
				allPurposes:[],
				serchallPurposes:[],
				showyxdSelect:false,
				showyxcSelect:false,
				showyxdSelect2:true,
				fields2:[],
				customerInfos:[],
				currentPage:1
			}
		},
		onReady() {
			
		},
		onLoad() {
			this.getWorkerId()
			this.getTasklist()
			this.getCustomers()
			this.allPurpose()
		},
		methods: {
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				if(index==1){
					this.httpData2.page =1 
					this.getCustomers()
				}else{
					this.httpData.page=1
					this.getTasklist()
				}
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
				this.httpData.taskStatus = e.target.value
			},
			bindPickerChange2: function(e) {
				this.index2 = e.target.value
				this.httpData2.purpose = this.serchallPurposes[e.target.value]['purpose']
			},
			bindPickerChangeYx: function(e) {
				this.index3 = e.target.value
				this.httpData2.isConnect = e.target.value
			},
			// 编辑意向度
			bindPickerYxd: function(e){	
				this.yxdIndex = e.target.value
				this.customerInfo.purpose = this.allPurposes[e.target.value]['purpose']
				this.showyxdSelect = true;
			},
			bindPickerYxc: function(e) {
				this.yxcIndex = e.target.value
				// this.purpose = this.array4[e.target.value]
				this.customerInfos.purpose = this.allPurposes[e.target.value]['purpose']
				this.showyxcSelect = true;
			},
			getTasklist() {
				this.$http.post('worker/taskList', this.httpData).then(res => {
					this.list = res.list
					this.countList = res.countList
					this.totalPage = res.totalPage
				});
			},
			getCustomers() {
				this.$http.post('worker/customerList', this.httpData2).then(res => {
					this.customers = res.list
					this.countList_customer = res.countList
					this.totalPage_customer = res.totalPage_customer
				});
			},
			allPurpose(){
				this.$http.post('worker/allPurpose').then(res => {
					this.allPurposes = res;
					this.serchallPurposes = [{
						purpose:'',
						value:'客户意向度'
					},...res]
				});
			},
			search() {
				this.getTasklist()
			},
			search2() {
				this.getCustomers()
			},
			edit(customer) {
				this.visible = true;
				this.yxdIndex = 0;
				if(!!customer.purpose){
					this.showyxdSelect = true
				}else{
					this.showyxdSelect = false
				}
				this.allPurposes.map((item,idx)=>{
					if(item.value == customer.purpose){this.yxdIndex = idx}
				})
				this.$http.post('worker/customerInfo', {
					customerId:customer.customerId
				}).then(res => {
					this.customerInfo = res.customerInfo
					this.fields = res.fields
				});
			},
			callCustomer(id) {
				const self = this;
				this.$http.post('worker/callCustomer', {
					customerId: id
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'loading',
						mask:true,
						duration:5000
					})
				}).catch(err=>{
					if(err.errMsg==='【request】请输入短信验证码以确认为本人操作!'){
						setTimeout(()=>{
							self.visible_code = true
						},800)
					}
				});
			},
			handleCancel(){},
			cancel() {
				this.visible = false
				this.visible_yx= false
				this.visible_code = false
			},
			submit() {
				this.allPurposes.map((item,indx)=>{
					if(item.value == this.customerInfo.purpose){
						this.customerInfo.purpose = item.purpose;
					}
				})
				this.$http.post('worker/modifyCustomer', this.customerInfo).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.visible = false
					this.getCustomers()
				});
			},
			getWorkerId(){
				this.$http.post('worker/getWorkerId').then(res => {
					this.connectSocket(res.workerId)
				});
			},
			connectSocket(workerId){
				const self = this
				var socketOpen = false;
				var socketMsgQueue = [];
				uni.connectSocket({
				  url: 'ws://47.108.51.162:8813'
				});
				uni.onSocketOpen(function (res) {
					socketOpen = true
				    sendSocketMessage(`{"medthod":"keepFd","data":{"workerId":${workerId}}}`);
				});
				uni.onSocketMessage(function (res) {
				  let  received_msg = JSON.parse(res.data);
				  // console.log('收到服务器内容：' + res.data);
				  self.fields2 = received_msg.fields;
				  self.customerInfos = received_msg.customerInfo;
				  if(!!self.customerInfos.purpose){
				  	self.showyxcSelect = true
				  }else{
				  	self.showyxcSelect = false;
					self.allPurposes.map(item=>{
						if(item.value==self.customerInfos.purpose){
							self.customerInfos.purpose = item.purpose
						}
					})
				  }
				  self.visible_yx = true
				});
				function sendSocketMessage(msg) {
				  if (socketOpen) {
				    uni.sendSocketMessage({
				      data: msg
				    });
				  } else {
				    socketMsgQueue.push(msg);
				  }
				}
			},
			goOn(twId) {
				const self = this
				this.$http.post('worker/runTask', {twId:twId}).then(res => {
					this.getTasklist()
				}).catch(err=>{
					if(err.errMsg==='【request】请输入短信验证码以确认为本人操作!'){
						setTimeout(()=>{
							self.visible_code = true
						},1000)
					}
				});;
			},
			stop(twId){
				this.$http.post('worker/stopTask', {twId:twId}).then(res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.getTasklist()
				});
			},
			purposeSubmit(){
				// const sendData = {
				//   companyId: this.received_msg.company_id,
				//   customerId: this.received_msg.customerId,
				//   remark: this.remark,
				//   purpose: this.purpose
				// }
				this.customerInfos.customerId = this.customerInfos.id;
				this.customerInfos.remark  = this.remark;
				// this.customerInfos.purpose = this.purpose;
				this.allPurposes.map(item=>{
					if(item.value==this.customerInfos.purpose){
						this.customerInfos.purpose = item.purpose
					}
				})
				this.$http.post('worker/modifyCustomer', this.customerInfos).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.visible_yx = false
					this.remark=''
					this.purpose=''
					this.getTasklist()
				});
			},
			changeTask(e){
				this.httpData.page = e.current
				this.getTasklist()
			},
			changeCustomers(e){
				this.httpData2.page = e.current
				this.getCustomers()
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
			submitCode(){
				this.$http.post('/worker/commitcode',{
					 code:this.code
				}).then(res => {
					uni.showToast({
						title: res[0],
						duration: 1000,
						icon: 'none'
					});
					this.visible_code = false
				});
			},
			ref(){
				this.rotate = !this.rotate
				this.getTasklist()
				this.getCustomers()
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
	textarea{
		    position: relative;
		    height: 50px;
		    width: calc(100% - 75px);
			padding: 20upx 0;
	}
	
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		// height: calc(100vh - 138px);
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
		.task {
			padding: 20upx 0;
			.form-item {
				display: flex;
				padding: 20upx 0;
				input,
				.uni-list {
					height: 40upx;
					color: $uni-color-p;
					font-size: 28upx;
					border-radius: 4upx;
					padding: 16upx;
					flex: 1;
					box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
					margin-right: 30upx;
					background-color: #fff;
					border-radius: 8upx;
					&:last-child {
						margin-right: 0;
					}
				}
			}
			button {
				flex: 1;
				font-size: 30upx;
				background-color: $uni-color-primary;
				color: #fff;
				margin-right: 30upx;

				&:last-child {
					margin-right: 0;
				}
			}
		}
		.customer {
			padding: 20upx 0;
			.form-item {
				display: flex;
				padding: 20upx 0;
				input,
				.uni-list {
					height: 40upx;
					color: $uni-color-p;
					font-size: 28upx;
					border-radius: 4upx;
					padding: 16upx;
					flex: 1;
					box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
					margin-right: 30upx;
					background-color: #fff;
					border-radius: 8upx;

					&:last-child {
						margin-right: 0;
					}
				}
			}
			button {
				margin-top: 20upx;
				flex: 1;
				font-size: 30upx;
				background-color: $uni-color-primary;
				color: #fff;
			}
		}


		.table_wrapper {
			// padding: 0 40upx;
			overflow: hidden;
			margin-top: 40upx;
			.table {
				// min-height: 400upx;
				background-color: #fff;
				border-radius: 8upx;
				// box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
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
	}
	.paginate {
		border: 1upx solid #ddd;
		border-top: none;
	}
</style>
