<template>

<div>
	<b-breadcrumb :items="[
		{ text: $t('ufwd.home'), href: '#/'},
		{ text: '作家', active: true },
	]"/>
	
	<h3>作家管理</h3><hr>
	
	<b-card title="新建作家">
		<b-row>
			<b-col cols="auto">
				<div class="position-relative">
					<b-form-group
						style="width: 20em"
						label="搜索用户">
						<b-input-group>
							<b-form-input
								placeholder="账户名 / 姓名 / 手机号"
								v-model.trim="filter.keyword" />
						</b-input-group>
					</b-form-group>
					<b-card no-body
						:footer="`共${filteredAccount.length}个结果`"
						v-if="filter.keyword&&!isFilteredAccountUniqueByName"
						id="account-search-box">
						<b-list-group flush>
							<b-list-group-item
								class="search-list"
								:key="index"
								@click="selectAccount(account)"
								v-for="(account, index) in filteredAccountWithSlice">
								<b-media>
									<h5>[#{{account.id}}]&nbsp;{{account.name}}</h5>
									<p class="my-0 float-right">电话：{{account.ufwd.phone}}</p>
									<p class="my-0">姓名：{{account.ufwd.name}}</p>
								</b-media>
							</b-list-group-item>
						</b-list-group>
					</b-card>
				</div>
			</b-col>
			<b-col cols="auto">
				<b-form-group
					style="width: 12em"
					label="选择频道">
					<b-form-select
						v-model="selectedChannel"
						:options="channelOptions" />
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group
					label="操作?">
					<b-btn variant="primary"
						@click="createWriter()">创建</b-btn>
					<b-btn variant="danger"
						@click="reset()">重置</b-btn>
				</b-form-group>
			</b-col>
		</b-row>
	</b-card>

	<hr><b-pagination
		:limit="7"
		align="right"
		v-model="currentPage"
		:total-rows="writerList.length"
		:per-page="10" />

	<b-table
		striped hover bordered small
		:fields="[
			{ key: 'accountId', label: '账户ID' },
			{ key: 'name', label: '名称' },
			{ key: 'channelName', label: '描述' },
			{ key: 'created_at', label: '创建时间' },
			{ key: 'action', label: '删除' },
		]"
		:per-page="10"
		:current-page="currentPage"
		:items="writerList">
		
		<template slot="name" slot-scope="data">
			{{data.item.name||'N/A'}}
		</template>

		<template slot="created_at" slot-scope="data">
			{{data.item.created_at|isoDateTime}}
		</template>

		<template slot="action" slot-scope="data">
			<b-btn
				@click="deleteWriter(data.item.id)"
				variant="outline-danger"
				size="sm"><i
					class="fa fa-trash" /></b-btn>
		</template>
	</b-table>
</div>

</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'writer',
	data() {
		return {
			filter: {
				keyword: ''
			},
			selectedChannel: null,
			selectedAccount: null,
			currentPage: 1,
			writerList: [],
			channelList: []
		}
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
		}
	},
	computed: {
		channelOptions() {
			return this.channelList.map(channel => {
				return {
					text: channel.name,
					value: channel
				};
			});
		},
		filteredAccount() {
			const kw = new RegExp(this.filter.keyword);

			return this.accountList.filter(account => {
				if (kw.test(account.name)) {
					return true;
				}

				if (kw.test(account.ufwd.name)) {
					return true;
				}

				if (kw.test(account.ufwd.phone)) {
					return true;
				}

				return false;
			});
		},
		filteredAccountWithSlice() {
			return this.filteredAccount.slice(0, 5);
		},
		isFilteredAccountUniqueByName() {
			return this.accountList.filter(account => {
				if (this.filter.keyword === account.name) {
					this.selectedAccount = account;
					return true;
				}

				return false;
			}).length === 1;
		}
	},
	methods: {
		selectAccount(account) {
			this.filter.keyword = account.name;
			this.selectedAccount = account;
		},
    getAccountList() {
      axios.get('/api/ufwd/service/account').then(res => {
        this.accountList = res.data.data;
      });
    },
		getChannelList() {
			return axios.get(`/api/ufwd/service/channel`).then(res => {
				this.channelList = res.data.data;
			});
		},
		getWriterById(id) {
			this.$router.push(`account/${id}/info`);
		},
		getWriter() {
			return axios.get(`/api/ufwd/service/writer`)
				.then(res => this.writerList = res.data.data);
		},
		deleteWriter(id) {
			return axios.delete(`/api/ufwd/service/writer/${id}`)
				.then(() =>this.getWriter());
		},
		createWriter() {
			return axios.post(`/api/ufwd/service/writer`, {
				accountId: this.selectedAccount.id,
				channelId: this.selectedChannel.id
			}).then(() => this.getWriter()).then(() => this.reset());
		},
		reset() {
			this.filter.keyword = '';
			this.selectedAccount = null;
		}
	},
	mounted() {
		this.getWriter();
		this.getAccountList();
		this.getChannelList();
	}
}
</script>

<style lang="less">
#account-search-box {
	position: absolute;
	top: 100%;
	width: 100%;
	z-index: 100;
	.search-list:hover {
		background: #f0f0f0;
		cursor: pointer;
	}
}
</style>