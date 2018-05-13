<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Channel</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-1">
			<router-link tag="a"
				to="add-channel"
				class="btn btn-primary">+ New</router-link>
		</div>
		<div class="col-7">
			<div class="input-group">
				<input type="text" class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>
		</div>
	</div>

	<h3 class="mt-4">All channels</h3>
	<hr>

	<div class="row">
		<div class="col-8">
			<data-tables
				:data="channelList"
				:search-def="searchDef"
				:pagination-def="paginationDef">
				<el-table-column
					v-for="(column, index) in channelColumns"
					:key="index"
					:label="column.label"
					:prop="column.field"
					sortable="custom">
				</el-table-column>
				<el-table-column label="Action" width="80">
					<template slot-scope="scope">
						<el-button type="text"
							@click="getChannelInfo(scope.row.id)">Edit</el-button>
					</template>
				</el-table-column>
			</data-tables>
		</div>

		<div class="col-4">
			<div class="card mt-4">
				<div class="card-header">
					{{channelInfo.name}}
				</div>
				<div class="card-body">
					<h5 v-if="hasWriter"
						class="card-title">Writer : {{channelInfo.number}}</h5>
					<table class="table table-bordered text-center"
						v-if="hasWriter">
						<thead>
							<tr>
								<th>Account ID</th>
								<th>Created Time</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(writer, index) in writerList"
								:key="index">
								<td>{{writer.accountId}}</td>
								<td>{{writer.created_at|time}}</td>
							</tr>
						</tbody>
					</table>
					<h5 class="card-title">Description : </h5>
					<p class="card-text">{{channelInfo.description}}</p>
				</div>
			</div>
		</div>
	</div>
	
	
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'channel',
	data() {
		return {
			channelList: [],
			channelColumns: [
				{
					label: 'Name',
					field: 'name'
				},
				{
					label: 'Created time',
					field: 'created_at'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			channelInfo: {},
			writerList: [],
			hasWriter: false
		}
	},
	methods: {
		getChannelInfo(id) {
			this.channelList.forEach(channel => {
				if (channel.id === id) {
					this.channelInfo = {
						name: channel.name,
						description: channel.description
					}

				return axios.get(`/api/ufwd/service/writer?channelId=${channel.id}`)
					.then(res => {
						this.hasWriter = true;
						this.writerList = res.data.data;
						this.channelInfo = {
							name: channel.name,
							description: channel.description,
							number: this.writerList.length,
						};
					}).catch(err => {
						this.hasWriter = false;
					});
				}
			});
		},
	},
	mounted() {
		return axios.get('/api/ufwd/service/channel')
			.then(res => {
				this.channelList = res.data.data;
				this.getChannelInfo(this.channelList[0].id);
			});
	},
	filters: {
		time(value) {
			return dateFormat(value, 'yyyy/mm/dd HH:MM');
		},
	},
}
</script>
