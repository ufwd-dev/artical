<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item active">作家</li>
		</ol>
	</nav>

	<h3>全部作家</h3>
	<hr>

	<data-tables
		:data="writerList"
		:search-def="searchDef"
		:pagination-def="paginationDef">
		<el-table-column
			v-for="(column, index) in writerColumns"
			:key="index"
			align="center"
			:label="column.label"
			:prop="column.prop"
			:sortable="column.sortable"
			:width="column.width"
			:minWidth="column.minWidth">
		</el-table-column>
		<!-- <el-table-column
			label="操作"
			prop="view"
			align="center"
			width="140">
			<template slot-scope="scope">
				<el-button
					type="text"
					@click="getWriterById(scope.row.id)">查看</el-button>
			</template>
		</el-table-column> -->
	</data-tables>

</div>
</template>

<script>
import axios from 'axios';
import DataTables from 'vue-data-tables';
import dateFormat from 'dateformat';

export default {
	name: 'writer',
	components: { DataTables },
	data() {
		return {
			writerList: [],
			writerColumns: [
				{
					label: '作家ID',
					prop: 'id',
					width: '200'
				},
				{
					label: '账户ID',
					prop: 'accountId',
					width: '200'
				},
				{
					label: '频道ID',
					prop: 'channelId',
					minWidth: '200'
				},
				{
					label: '创建时间',
					prop: 'created_at',
					sortable: 'custom',
					width: '180'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			}
		}
	},
	methods: {
		getWriterById(id) {
			this.$router.push(`account/${id}/info`);
		},
		getWriter() {
			return axios.get(`/api/ufwd/service/writer`)
				.then(res => {
					const writerData = res.data.data;

					writerData.forEach(writer => {
						writer.created_at = dateFormat(writer.created_at, 'yyyy/mm/dd HH:MM');
					})

					this.writerList = writerData;
				})
		}
	},
	mounted() {
		this.getWriter();
	}
}
</script>
