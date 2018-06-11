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
		:pagination-def="paginationDef"
		:actions-def="actionDef">
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
		<el-table-column
			label="操作"
			prop="view"
			align="center"
			width="140">
			<template slot-scope="scope">
				<el-button
					type="text"
					@click="deleteWriter(scope.row.id)">
						<i class="fa fa-trash" aria-hidden="true"></i>
					</el-button>
			</template>
		</el-table-column>
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
					label: '账户ID',
					prop: 'accountId',
					width: '200'
				},
				{
					label: '姓名',
					prop: 'name',
					width: '200'
				},
				{
					label: '频道',
					prop: 'channelName',
					minWidth: '200'
				},
				{
					label: '街道',
					prop: 'street',
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
			},
			actionDef: {
				colProps: {
					span: 3
				},
				def: [
					{
						name: this.$t('ufwd.notification.new'),
						type: 'primary',
						handler: () => {
							this.$router.push('add-writer');
						}
					}
				]
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
		},
		deleteWriter(id) {
			return axios.delete(`/api/ufwd/service/writer/${id}`)
				.then(res => {
					this.$notify({
						title: '成功',
						message: '作家删除成功！',
						type: 'success'
					});

					this.getWriter();
				})
		}
	},
	mounted() {
		this.getWriter();
	}
}
</script>
