<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/article/channel">频道</router-link>
			</li>
			<li class="breadcrumb-item active">{{channel.name}}</li>
		</ol>
	</nav>

	<h3>修改频道</h3>
	<hr>

	<el-form :model="channel">
		<el-form-item label="名称">
			<el-input v-model="channel.name"></el-input>
		</el-form-item>

		<el-form-item label="描述">
			<el-input
				type="textarea"
				rows="3"
				v-model="channel.description"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary"
				@click="updateChannel()">更新</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
import axios from 'axios';

const CHANNEL_URL = '/api/ufwd/service/channel';

export default {
	name: 'channel-detail',
	computed: {
		channelId() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			channel: {}
		}
	},
	methods: {
		getChannel() {
			return axios.get(`${CHANNEL_URL}/${this.channelId}`)
				.then(res => {
					this.channel = res.data.data;
				})
		},
		updateChannel() {
			return axios.put(`${CHANNEL_URL}/${this.channelId}`, {
				name: this.channel.name,
				description: this.channel.description
			}).then(() => {
				this.$notify({
					title: '成功',
					message: '频道修改成功！',
					type: 'success'
				});

				this.$router.go(-1);
			})
			.catch(err => {
				this.$notify.error({
					title: '失败',
					message: '频道修改失败。'
				})
			})
		}
	},
	mounted() {
		this.getChannel();
	}
}
</script>
