<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Category</li>
		</ol>
	</nav>

	<!-- <div class="row">
		<div class="col-1">
			<router-link tag="button"
				to="/ufwd/article/add-category"
				class="btn btn-primary"
				>+ New</router-link>
			
		</div>
		<div class="col-7">
            <div class="input-group mb-3">
				<input type="text"
					class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
            </div>

			
        </div>
	</div> -->

	<h3>All category</h3>
	<hr>

	<div class="row">
		<div class="col-8">
			<!-- <table class="table table-bordered">
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Number of article</th>
					</tr>
				</thead>
				<tbody>
					<tr @click="getSelectedCategory(index)"
						v-for="(category, index) in categoryList"
						:key="index">
						<td>{{category.name}}</td>
						<td>{{category.description}}</td>
						<td>{{category.ariticleNumber}}</td>
					</tr>
				</tbody>
			</table> -->

			<data-tables
				:data="categoryList"
				:search-def="searchDef"
				:pagination-def="paginationDef"
				>
				<el-table-column
					v-for="(column, index) in categoryColumns"
					:key="index"
					align="center"
					:label="column.label"
					:prop="column.prop"
					:sortable="column.sortable"
					:width="column.width"
					:minWidth="column.minWidth">
				</el-table-column>
				<el-table-column
					label="view"
					prop="view"
					align="center"
					width="120">
					<template slot="scope">
						<el-button
							type="text"
							@click.native.prevent=""><i
								class="fa fa-pencil"></i>
						</el-button>
					</template>
				</el-table-column>
			</data-tables>
		</div>

		<div class="col-sm-4">
			<!-- <div class="card">
				<h5 class="card-header">Edit category</h5>
				<div class="card-body">
					<div class="form-group">
						<label for="">Name</label>
						<input type="text"
							class="form-control"
							v-model="categoryInfo.name">
					</div>
					<div class="form-group">
						<label for="">Description</label>
						<textarea type="text"
							class="form-control"
							v-model="categoryInfo.description"></textarea>
					</div>
					<button class="btn btn-primary mt-3"
						@click="modifyCategory()">Modify</button>
					<button class="btn btn-danger mt-3">Remove</button>
				</div>
			</div> -->

			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>Edit Category</span>
				</div>
				<el-form :model="categoryInfo">
					<el-form-item label="Name">
						<el-input v-model="categoryInfo.name"></el-input>
					</el-form-item>
					<el-form-item label="Description">
						<el-input
							type="textarea"
							rows="3"
							v-model="categoryInfo.description"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">Modify</el-button>
						<el-button type="danger">Remove</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import DataTables from 'vue-data-tables';

export default {
	name: 'category-manage',
	components: { DataTables },
	data() {
		return {
			categoryList: [],
			articleNumberOfCategory: 0,
			categoryColumns: [
				{
					label: 'Name',
					prop: 'name',
					width: '180'
				},
				{
					label: 'Description',
					prop: 'description',
					minWidth: '200'
				},
				{
					label: 'Number of Articles',
					prop: 'number',
					width: '160'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20]
			},
			categoryInfo: {
				name: '',
				description: '',
				id: ''
			}
		}
	},
	methods: {
		getCategoryList() {
			return axios.get(`/api/ufwd/service/category`)
			.then(res => {
				this.categoryList = res.data.data;
				this.getSelectedCategory(0);
			}).then(() => {
				this.categoryList.forEach(category => {
					return axios.get(`/api/ufwd/service/category/${category.id}/artical`)
						.then(res => {
							category.ariticleNumber = res.data.data.length;
						})
					
				});
			})
		},
		getSelectedCategory(index) {
			this.categoryInfo = {
				name: this.categoryList[index].name,
				description: this.categoryList[index].description,
				id: this.categoryList[index].id
			}
		},
		modifyCategory() {
			return axios.put(`/api/ufwd/service/category/${this.categoryInfo.id}`, {
				name: this.categoryInfo.name,
				description: this.categoryInfo.description
			}).then(this.getCategoryList())
		}
	},
	mounted() {
		this.getCategoryList();
	}
}
</script>
