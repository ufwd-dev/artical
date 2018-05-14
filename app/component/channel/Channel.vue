<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item active">频道</li>
		</ol>
	</nav>

	<h3>全部频道</h3>
	<hr>

	<div class="row">
		<div class="col-sm-9">
			<data-tables
				:data="channelList"
				:search-def="searchDef"
				:pagination-def="paginationDef"
				style="margin-top: -20px;">
				<el-table-column
					v-for="(column, index) in channelColumns"
					:key="index"
					align="center"
					:label="column.label"
					:prop="column.prop"
					:sortable="column.sortable"
					:width="column.width"
					:minWidth="column.minWidth">
				</el-table-column>
				<el-table-column
					label="操作"
					prop="view"
					align="center"
					width="140">
					<template slot-scope="scope">
						<el-button
							type="text"
							@click="getChannelById(scope.row.id)">查看</el-button>
					</template>
				</el-table-column>
			</data-tables>
		</div>

		<div class="col-sm-3">
			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>添加新频道</span>
				</div>

				<el-form :model="channelForm">
					<el-form-item label="名称" required>
						<el-input v-model="channelForm.name"></el-input>
					</el-form-item>

					<el-form-item label="描述" required>
						<el-input
							type="textarea"
							rows="3"
							v-model="channelForm.description"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary"
							@click="createChannel()">创建</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
	
	
</div>
</template>

<script>
import axios from 'axios';
import DataTables from 'vue-data-tables';
import dateFormat from 'dateformat';

const CHANNEL_URL = '/api/ufwd/service/channel';

export default {
	name: 'channel',
	components: { DataTables },
	data() {
		return {
			channelList: [],
			channelColumns: [
				{
					label: '名称',
					prop: 'name',
					width: '180'
				},
				{
					label: '描述',
					prop: 'description',
					minWidth: '200'
				},
				{
					label: '创建时间',
					prop: 'created_at',
					width: '180',
					sortable: 'custom'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			channelForm: {},
		}
	},
	methods: {
		getChannelList() {
			return axios.get(CHANNEL_URL)
				.then(res => {
					const channelData = res.data.data;

					channelData.forEach(channel => {
						channel.created_at = dateFormat(channel.created_at, 'yyyy/mm/dd HH:MM');
					});

					this.channelList = channelData;
				})
		},
		getChannelById(id) {
			return this.$router.push(`channel/${id}/detail`);
		},
		createChannel() {
			return axios.post(CHANNEL_URL, this.channelForm)
				.then(() => {
					this.$notify({
						title: '成功',
						message: '频道创建成功！',
						type: 'success'
					});

					this.getChannelList();
				})
				.catch(err => {
					this.$notify.error({
						title: '失败',
						message: '频道创建失败。'
					})
				})
		}
	},
	mounted() {
		this.getChannelList();
	}
}
</script>
