<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">{{$t('ufwd.home')}}</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/article/writer">{{$t('ufwdArticle.article.writer')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('ufwdArticle.article.addWriter')}}</li>
		</ol>
	</nav>

	<h3>{{$t('ufwdArticle.article.addWriter')}}</h3>
	<hr>

	<div class="row">
		<div class="col-6">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>频道列表</span>
                </div>
                <el-radio-group v-model="checkedChannel">
                    <el-radio border v-for="channel in channelList"
                        :key="channel.id" :label="channel.id">{{channel.name}}</el-radio>
                </el-radio-group>
            </el-card>
		</div>

		<div class="col-6">
            <data-tables
				ref="accountList"
				@selection-change="handleSelection"
				:data="account.accountList"
				:search-def="account.searchDef"
				:pagination-def="account.paginationDef">
				<el-table-column
					type="selection"
					width="55"
					align="center">
				</el-table-column>
				<el-table-column
					v-for="(column, index) in account.accountColumn"
					:key="index"
					align="center"
					:min-width="column.minWidth"
					:width="column.width"
					:label="column.label"
					:prop="column.prop">
				</el-table-column>
			</data-tables>
		</div>
	</div>
    <div  class="text-center">
        <el-button type="primary" @click="createWriter">{{$t('ufwdArticle.article.create')}}</el-button>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'add-writer',
    data() {
        return {
            account: {
                accountList: [],
                accountColumn: [
                    {
                        label: this.$t('ufwd.user.name'),
                        prop: 'name',
                        width: '150'
                    },
                    {
                        label: this.$t('ufwd.user.street'),
                        prop: 'street',
                        minWidth: '180'
                    }
                ],
                searchDef: {
                    show: true,
                    colProps: {
                        span: 8
                    },
                    props: ['street']
                },
                paginationDef: {
                    pageSize: 10,
                    pageSizes: [5, 10, 20],
                }
            },
            channelList: [],
            checkedChannel: null,
            checkedAccount: []
        }
    },
    methods: {
        getUserList() {
			return axios.get(`/api/ufwd/service/account`)
				.then(res => {
                    const list = res.data.data;
                    
                    list.forEach(element => {
                        if (element.examine) {
                            element.name = element.name ? element.name : '--';
                            this.account.accountList.push(element);
                        }
                    });
				});
        },
        getChannelList() {
            return axios.get(`/api/ufwd/service/channel`)
				.then(res => {
                    this.channelList = res.data.data;
				});
        },
        handleSelection(val) {
            val.forEach(element => {
                this.checkedAccount.push(element.id);
            });
        },
        createWriter() {
            if (!this.checkedChannel) {
                this.$notify.error({
						title: '失败',
						message: '未进行频道选择！'
                    });
                    
                return;
            }

            if (!this.checkedAccount) {
                this.$notify.error({
						title: '失败',
						message: '未进行用户选择！'
                    });
                    
                return;
            }

            return axios.post(`/api/ufwd/service/writer`, {
                accountList: this.checkedAccount,
                channelId: this.checkedChannel
            }).then(res => {
                this.$notify({
						title: '成功',
						message: '作家创建成功！',
						type: 'success'
					});
            });
        }
    },
    mounted() {
        this.getUserList();
        this.getChannelList();
    }
}
</script>
