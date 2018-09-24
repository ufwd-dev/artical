<template>
	<div>
		<b-breadcrumb :items="[
			{ text: $t('ufwd.home'), href: '#/'},
			{ text: '文章列表', href: '#/ufwd/article/article/list'},
			{ text: article.title, active: true },
		]"/>

		<b-container>
			<b-btn variant="success"
				@click="openExamine()">打开审阅</b-btn>
			<h3 class="text-center">{{article.title}}</h3>

			<ul class="nav nav-justified my-3">
				<li class="nav-item">来源：原创</li>
				<li class="nav-item">时间：{{article.created_at|isoDateTime}}</li>
			</ul>

			<div v-html="rendererHtml" class="article-content"></div>

		</b-container>

		<b-modal ref="examine" title="审阅窗口" centered>
			<b-form>
				<b-form-group
					label="通过?">
					<b-form-radio-group
						buttons
						button-variant="outline-success"
						size="sm"
						v-model="form.examine"
						:options="[
							{ text: '是', value: true },
							{ text: '否', value: false }
						]" />
				</b-form-group>
				<b-form-group
					label="审查意见">
					<b-form-textarea
						v-model="form.comments"
						rows="7"
						no-resize
						size="sm" />
				</b-form-group>
			</b-form>

			<div slot="modal-footer">
				<b-btn
					@click="updateExamine()"
					variant="primary">发送</b-btn>
			</div>
		</b-modal>
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
			article: {
				title: null
			},
			form: {
				examine: null,
				comments: ''
			}
		}
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
		}
	},
	computed: {
		articleId() {
			return this.$route.params.id;
		},
		rendererHtml() {
			return this.article.content && _.unescape(md.render(this.article.content));
		}
	},
	methods: {
		openExamine() {
			this.$refs.examine.show();
		},
		updateExamine() {
			return axios.put(`${ARTICLE_URL}/${this.articleId}`, this.form)
				.then(() => {
					this.$refs.examine.hide();
					this.$router.push('/ufwd/article/article/list');
				});
		},
		getArticle() {
			return axios.get(`${ARTICLE_URL}/${this.articleId}`)
				.then(res => {
					this.article = res.data.data;

					this.form.examine = this.article.examine;
					this.form.comments = this.article.comments;
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
