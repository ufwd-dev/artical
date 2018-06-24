<template>

<div>
	<b-breadcrumb :items="[
		{ text: $t('ufwd.home'), href: '#/'},
		{ text: '频道', active: true },
	]"/>
	
	<h3>频道管理</h3><hr>
	
	<b-card title="编辑频道">
		<b-row>
			<b-col cols="auto">
				<b-form-group
					label="频道名称"
					style="width: 12em">
					<b-form-input
						v-model="form.name" />
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group
					label="频道描述">
					<b-form-input
						v-model="form.description" />
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group
					label="操作?">
					<b-btn variant="success"
						v-if="selectedChannel"
						@click="updateChannel()">保存</b-btn>
					<b-btn variant="primary"
						v-if="!selectedChannel"
						@click="createChannel()">创建</b-btn>
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
		:total-rows="channelList.length"
		:per-page="10" />

	<b-table
		:fields="[
			{ key: 'name', label: '名称' },
			{ key: 'description', label: '描述' },
			{ key: 'created_at', label: '创建时间' },
		]"
		:per-page="10"
		:current-page="currentPage"
		:items="channelList">
		
		<template slot="name" slot-scope="data">
			<b-btn variant="link" size="sm"
				@click="openToForm(data.item)">{{data.item.name}}</b-btn>
		</template>

		<template slot="created_at" slot-scope="data">
			{{data.item.created_at|isoDateTime}}
		</template>
	</b-table>
	
	
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

const CHANNEL_URL = '/api/ufwd/service/channel';

export default {
	name: 'channel',
	data() {
		return {
			currentPage: 1,
			selectedChannel: null,
			channelList: [],
			form: {
				name: '',
				description: ''
			},
		}
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
		}
	},
	methods: {
		getChannelList() {
			return axios.get(CHANNEL_URL).then(res => {
				this.channelList = res.data.data;
			});
		},
		openToForm(channel) {
			this.selectedChannel = channel;

			this.form.name = channel.name;
			this.form.description = channel.description;
		},
		createChannel() {
			return axios.post(CHANNEL_URL, this.form)
				.then(this.reset())
				.then(() => this.getChannelList());
		},
		deleteChannel(id) {
			return axios.delete(`${CHANNEL_URL}/${id}`)
				.then(() => this.getChannelList());
		},
		updateChannel() {
			return axios.put(`${CHANNEL_URL}/${this.channelId}`, this.form)
				.then(this.reset())
				.then(() => this.getChannelList());
		},
		reset() {
			this.form = {
				name: '',
				description: ''
			};

			this.selectedChannel = null;
		}
	},
	mounted() {
		this.getChannelList();
	}
}
</script>
