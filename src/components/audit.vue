<template>
  <div>
		<el-card class="box-card">
            <div style="margin:10px 0 10px;">
                <el-select size='small'  v-model="setbooklist" placeholder="请选择">
                    <el-option v-for="item in visitList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button size='small' type="primary" plain icon="el-icon-search" @click="getData(setbooklist)">查询</el-button>
            </div>
		    <div class="text item">
		        <el-table :data="articleList" size='small' stripe border style="width:100%;" height='calc(69vh)'>
		            <el-table-column label="序号" width='60' align="center">
		                <template slot-scope="scope">
		                    {{scope.$index+1}}
		                </template>
		            </el-table-column>
		            <el-table-column label="作品名称" prop="bookName" width="150" align="center"></el-table-column>
		            <el-table-column label="章节名称" prop="title" width="200" align="center"></el-table-column>
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
		            <el-table-column label="操作" width='80' align="center">
		                <template slot-scope="scope">
		                    <el-button type="primary" size="mini" v-if="scope.row.serialize == '1'" @click="editor(scope.row)">审核</el-button>
		                    <el-button type="primary" size="mini" v-if="scope.row.serialize == '2' || scope.row.serialize == '3'" @click="editor(scope.row)">查看</el-button>		                </template>
		            </el-table-column>
		        </el-table>
		    </div>
		</el-card>
        <el-dialog class="version-msg" v-if="addModelState" width="50%" :visible.sync="addModelState"
            :close-on-click-modal="false" title="审批页面">
            <div>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="label-style">作品名称：</div>
                    </el-col>
                    <el-col :span="8">
                        <el-input size='small' class='full-width' clearable v-model="checkData.bookName" placeholder="请输入内容">
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <div class="label-style">章节名称：</div>
                    </el-col>
                    <el-col :span="8">
                        <el-input size='small' class='full-width' clearable v-model="checkData.title" placeholder="请输入内容">
                        </el-input>
                    </el-col>
                </el-row>
                <div style="margin:20px 0;">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <div class="label-style">作品简介：</div>
                        </el-col>
                        <el-col :span="20">
                            <el-input size='small' type="textarea" v-model='checkData.content' show-word-limit :rows="10"
                                clearable placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div style="text-align:center;margin-top: 20px;">
                    <el-button type="primary" v-if="setbooklist == '1'" plain @click="pass()">通过</el-button>
                    <el-button type="primary" v-if="setbooklist == '1'" plain @click="reject()">驳回</el-button>
                    <el-button type="primary" plain  @click="addModelState=false">关闭</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 驳回页面 -->
        <el-dialog class="version-msg" v-if="materialModelState" width="50%" :visible.sync="materialModelState"
            :close-on-click-modal="false" title="驳回原因">
            <div style="margin:20px 0;">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="label-style">驳回原因：</div>
                    </el-col>
                    <el-col :span="20">
                        <el-input size='small' type="textarea" v-model='cause' show-word-limit :rows="4"
                            clearable placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
            </div>
            <div style="text-align:center;margin-top: 20px;">
                <el-button type="primary" plain @click="confirm()">确定</el-button>
                <el-button type="primary" plain  @click="materialModelState=false">关闭</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script>
    import {
        getcheck,
        getArticleList,
        checkBook,
        booktitle
    } from "../fetch";
    export default {
        data() {
            return {
                cause:'',
                titleDataList:[],
                articleList:[],
                addModelState:false,
                checkData:[],
                materialModelState:false,
                dataList:{},
                setbooklist:'1',
                visitList: [ {
                    label: "未审核",
                    value: '1'
                }, {
                    label: "已审核",
                    value: '2'
                },
                {
                    label: "已驳回",
                    value: '3'
                }],
                titlts:'',
            }
        },
        created() {
            this.getData('1')
        },
        methods:{
            // 生成目录
            directory(val){
                if(val.length>=0) {
                     this.titlts = val[0].title
                    val.forEach((item,index) => {
                        if(index>0 && item.serialize == '2') {
                            this.titlts = this.titlts + '-' + item.title
                        }

                    })
                }
                booktitle({
                    titles : this.titlts,
                    id : this.dataList.book_id
                }).then(res => {
                    console.log('创建目录成功')
                })
                console.log(this.titlts)
            },
            // 查询章节列表
            getData(val) {
                getcheck(val).then(res => {
                    this.articleList = res
                    console.log(res)
                })
            },
            // 获取审核数据
            editor(row) {
                console.log(row)
                this.dataList = row
                this.addModelState = true
                getArticleList(row.book_id ,'',row.article_id).then(res => {
                    this.checkData = res[0]
                    console.log(res)
                })
            },
            // 审核通过
            pass() {
                checkBook({
                    bookid:this.dataList.book_id,
                    id:this.dataList.article_id,
                    serialize:'2',
                    cause : '审核通过'
                }).then(res => {
                    this.$message.success('审核成功')
                    this.addModelState = false
                    this.getData('1')

                    getArticleList(this.dataList.book_id,'').then(res => {
                        this.titleDataList = res
                        console.log(res)
                        this.directory(this.titleDataList)
                    })
                })
            },

            // 驳回
            reject(){
                this.materialModelState = true
            },
            // 填写驳回原因
            confirm() {
                checkBook({
                    bookid:this.dataList.book_id,
                    id:this.dataList.article_id,
                    serialize:'3',
                    cause : this.cause
                }).then(res => {
                    this.$message.success('驳回成功')
                    this.materialModelState = false
                    this.addModelState = false
                    this.getData('1')
                })
            }
        }
    }
</script>

<style>
</style>
