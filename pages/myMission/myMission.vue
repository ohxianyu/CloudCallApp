<template>
	<view class="cloudCall">
		<view class="tips">
			<image src="../../static/image/loc.png" mode=""></image>您当前的位置：云呼叫-呼叫记录
		</view>
		<view class="content">
			<view class="tit">
				<image src="../../static/image/tel.png" mode=""></image>
				<h4>我的任务</h4>
			</view>
			<view class="form-item" style="display: flex;">
				<input type="number" maxlength="11" placeholder="任务名" />
				<input type="number" maxlength="11" placeholder="任务状态" />
			</view>
			<button type="default">搜索</button>
		</view>

		<!-- 表格 -->
		<view class="table_wrapper">
			<view class="table">
				<table>
					<thead>
						<tr>
							<th>任务名</th>
							<th>任务状态</th>
							<th>进度</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>[录音]</td>
							<td>A</td>
							<td>+17600141415</td>
							<td>2020-08-04 18:09:05</td>
						</tr>
						<tr>
							<td>[录音]</td>
							<td>A</td>
							<td>+17600141415</td>
							<td>2020-08-04 18:09:05</td>
						</tr>
						<tr>
							<td>[录音]</td>
							<td>A</td>
							<td>+17600141415</td>
							<td>2020-08-04 18:09:05</td>
						</tr>
					</tbody>
				</table>
				<view class="">
					<view class="">
						<span></span>
						<span style="font-size: 24upx;padding: 20upx;color: #A9A9A9;">当前页：1，数据总量：0条，每页数据：10</span>
					</view>
					<uni-pagination title="标题文字" total="20"></uni-pagination>
					
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniPagination from '../../components/uni-pagination/uni-pagination.vue'
	export default {
		components: {
			uniPagination
		},
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

		.form-item {
			display: flex;
			padding: 30upx 0;
			input {
				font-size: 28upx;
				border-radius: 8upx;
				padding: 16upx;
				flex: 1;
				box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
				margin-right: 20upx;
			}
		}

		button {
			font-size: 28upx;
			background: $uni-bg-theme;
			color: #fff;
		}
	}

	.table_wrapper {
		padding: 0 40upx;

		.table {
			// min-height: 400upx;
			border-radius: 8upx;
			box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);

			table {
				border-collapse: collapse;
				border-spacing: 0;
				display: block;
				margin-bottom: 1rem;
				overflow: auto;
				width: 100%;

				tr th {
					text-align: center;
					font-size: 30upx;
					background-color: #f8f8f8;
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
</style>
