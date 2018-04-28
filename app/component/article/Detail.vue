<template>

<div>
	<el-breadcrumb class="mb-4">
		<el-breadcrumb-item to="/">Home</el-breadcrumb-item>
		<el-breadcrumb-item to="/ufwd/article/list">Article list</el-breadcrumb-item>
		<el-breadcrumb-item>{{articleInfoPool.title}}</el-breadcrumb-item>
	</el-breadcrumb>

	<h3>{{articleInfoPool.title}}</h3>
	<hr>

	<div class="row">
		<div class="col-8">

		</div>
		<div class="col-4">
			<!-- <div class="card">
				<div class="card-header">
					Info
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="">Examine</label>
						<div class="form-check">
							<input type="checkbox" class="form-check-input">
							<label for="" class="form-check-label">Yes</label>
						</div>
						<div class="form-check">
							<input type="checkbox" class="form-check-input">
							<label for="" class="form-check-label">No</label>
						</div>
					</div>
					<div class="form-group">
						<label for="">Category</label>
						<input type="text" class="form-control">
					</div>
					<div class="form-group">
						<label for="">Comment</label>
						<input type="text" class="form-control">
					</div>
				</div>
			</div> -->

			<el-card class="box-card">
				<div slot="header">
					<span>Article Examine</span>
				</div>
				<el-form label-position="top" :model="articleActionForm">
					<el-form-item label="Adopt" prop="examine">
						<el-switch v-model="articleExamineForm.examine"></el-switch>
					</el-form-item>
					<el-form-item label="Comment" prop="comment">
						<el-input v-model="articleExamineForm.comment"></el-input>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'article-detail',
	data() {
		return {
			articleInfoPool: [],
			articleExamineForm: {
				examine: '',
				comment: ''
			}
		}
	},
	computed: {
		articleId() {
			return this.$route.params.id;
		}
	},
	mounted() {
		return axios.get(`/api/ufwd/service/article/${this.articleId}`)
			.then(res => {
				this.articleInfoPool = res.data.data;
				this.articleExamineForm.examine = this.articleInfoPool.examine;
				this.articleExamineForm.comment = this.articleInfoPool.comments;
			})
	}
}
</script>
