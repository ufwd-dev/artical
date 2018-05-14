<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/ufwd/article/list">文章列表</router-link>
			</li>
			<li class="breadcrumb-item active">{{article.title}}</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-sm-9">
			<h3 class="text-center">{{article.title}}</h3>

			<ul class="nav nav-justified my-3">
				<li class="nav-item">来源：原创</li>
				<li class="nav-item">时间：{{article.created_at}}</li>
			</ul>

			<div v-html="article.content"
				class="article-content"></div>
		</div>

		<div class="col-sm-3">
			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>文章审核</span>
				</div>

				<el-form :model="articleExamineForm">
					<el-form-item label="审核状态" prop="examine">
						<el-switch v-model="articleExamineForm.examine"></el-switch>
					</el-form-item>

					<el-form-item label="审核意见" prop="comment">
						<el-input
							type="textarea"
							rows="3"
							v-model="articleExamineForm.comments"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary"
							@click="updateExamine()">提交</el-button>
					</el-form-item>
				</el-form>

			</el-card>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import _ from 'lodash';
import dateFormat from 'dateformat';

const ARTICLE_URL = '/api/ufwd/service/article';
const md = MarkdownIt({
	breaks: true
});

export default {
	name: 'article-detail',
	data() {
		return {
			article: [],
			articleExamineForm: {
				examine: null,
				comments: ''
			}
		}
	},
	computed: {
		articleId() {
			return this.$route.params.id;
		}
	},
	methods: {
		updateExamine() {
			return axios.put(`${ARTICLE_URL}/${this.articleId}`, this.articleExamineForm)
				.then(() => {
					this.$notify({
						title: '成功',
						message: '文章审核成功！',
						type: 'success'
					});

					this.$router.go(-1);
				})
				.catch(err => {
					this.$notify.error({
						title: '失败',
						message: '文章审核失败。'
					})
				})
		},
		getArticle() {
			return axios.get(`${ARTICLE_URL}/${this.articleId}`)
				.then(res => {
					this.article = res.data.data;

					this.articleExamineForm.examine = this.article.examine;
					this.articleExamineForm.comments = this.article.comments;

					this.article.content = _.unescape(md.render(res.data.data.content));
					this.article.created_at = dateFormat(this.article.created_at, 'yyyy/mm/dd HH:MM');
				})
		}
	},
	mounted() {
		this.getArticle();
	}
}
</script>

<style lang="less">
.article-content {
	p {
		text-indent: 2rem;
	}
	.image {
		margin: 1rem 0;
		text-align: center;
	}
}
</style>
