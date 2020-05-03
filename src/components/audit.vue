<template>
  <div>
		<el-card class="box-card">
		    <div class="text item">
		        <el-table :data="articleList" size='small' stripe border style="width:100%;" height='calc(76vh)'>
		            <el-table-column label="序号" width='60' align="center">
		                <template slot-scope="scope">
		                    {{scope.$index+1}}
		                </template>
		            </el-table-column>
		            <el-table-column label="作品名称" prop="title" width="150" align="center"></el-table-column>
		            <el-table-column label="状态" prop="serialize" width="80" align="center">
		                <template slot-scope="scope">
		                    <span v-if="scope.row.serialize == '0'">草稿</span>
		                    <span v-if="scope.row.serialize == '1'">已提交</span>
		                    <span v-if="scope.row.serialize == '2'">已审核</span>
		                    <span v-if="scope.row.serialize == '3'">已驳回</span>
		                </template>
		            </el-table-column>
		            <el-table-column label="简介" prop="content" align="center">
		                <template slot-scope="scope">{{scope.row.content.substr(0,40)}}</template>
		            </el-table-column>
		            <el-table-column label="操作" width='180' align="center">
		                <template slot-scope="scope">
		                    <el-button type="primary" size="mini" @click="editor(scope.row)">修改</el-button>
		                    <el-button type="danger" size="mini" @click="delleteBook(scope.row)">删除</el-button>
		                </template>
		            </el-table-column>
		        </el-table>
		    </div>
		</el-card>
	</div>
</template>

<script>
    import {
        getcheck,
    } from "../fetch";
    export default {
        data() {
            return {
                articleList:[],
            }
        },
        created() {
            this.getData()
        },
        methods:{
            // 查询章节列表
            getData() {
                getcheck().then(res => {
                    this.articleList = res
                    console.log(res)
                })
            },
        }
    }
</script>

<style>
</style>
