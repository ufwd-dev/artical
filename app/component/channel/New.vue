<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/system/channel">Channel</router-link>
			</li>
			<li class="breadcrumb-item active">New channel</li>
		</ol>
	</nav>


	<div class="row">
		<div class="col-6">
			<h3>New channel</h3>
			<hr>
			<form>
				<div class="form-group">
					<label for="channel-name">Name</label>
					<input type="text"
						id="channel-name"
						class="form-control"
						placeholder="xx channel ..."
						v-model="channelName">
				</div>
				<div class="form-group">
					<label for="channel-comment">Description</label>
					<textarea type="text"
						id="channel-comment"
						class="form-control"
						v-model="channelDescription"></textarea>
				</div>

				<button class="btn btn-primary"
					type="button"
					@click="createChannel()">Create</button>
			</form>

		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'add-channel',
	data() {
		return {
			channelName: '',
			channelDescription: ''
		}
	},
	methods: {
		createChannel() {
			return axios.post('/api/ufwd/service/channel', {
				name: this.channelName,
				description: this.channelDescription
			}).then(() => {
				this.$router.go(-1);
			});

		}
	}
}
</script>
