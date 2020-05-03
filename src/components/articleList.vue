<template>
    <div class="article">
        <el-card class="box-card">
            <div style="margin:10px 0 10px;">
                <el-input size='small' clearable style="width:150px;margin-right:10px" v-model="setbooklist"
                    placeholder="章节名称"></el-input>
                <el-button size='small' type="primary" plain icon="el-icon-search" @click="getData()">查询</el-button>
                <el-button size='small' style="float:right" plain type="primary" @click="addDataFn()">新增</el-button>
                <el-button size='small' style="float:right" plain type="primary" @click="$router.back(-1)">返回</el-button>
            </div>
            <div class="text item">
                <el-table :data="articleList" size='small' stripe border style="width:100%;" height='calc(66vh)'>
                    <el-table-column label="序号" width='60' align="center">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column label="标题" prop="title" width="150" align="center"></el-table-column>
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
        <!-- 新增/编辑窗口 -->
        <el-dialog class="version-msg" v-if="addModelState" width="50%" :visible.sync="addModelState"
            :close-on-click-modal="false" :title="title" fullscreen>
            <div slot="header" class="cllearfix">
                <span>发表文章</span>
            </div>

            <div class="text item">
                <el-form ref="addFormRef" :model="addForm" label-width="120px" :rules="addFormRules">
                    <el-form-item label="标题：" prop="title">
                        <el-input v-model="addForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：" prop="serialize" style="margin-top: 20px;" v-if="title=='修改章节'">
                        <span v-if="addForm.serialize == '0'">草稿</span>
                        <span v-if="addForm.serialize == '1'">已提交</span>
                        <span v-if="addForm.serialize == '2'">已审核</span>
                        <span v-if="addForm.serialize == '3'">已驳回</span>
                    </el-form-item>
                    <el-form-item label="驳回原因：" prop="err" style="margin-top: 20px;" v-if="addForm.serialize == '3'">
                        <el-input v-model="addForm.err"></el-input>
                    </el-form-item>
                    <el-form-item label="内容：" prop="content">
                        <quillEditor v-model="addForm.content" style="height: calc(60vh);"></quillEditor>
                    </el-form-item>
                    <el-form-item style="margin-top: 100px;text-align: center;">
                        <el-button type="primary" @click="addarticle(1)">发布</el-button>
                        <el-button @click="addarticle(0)">存入草稿</el-button>
                        <el-button @click="addModelState=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getBook,
        addArticle,
        getArticleList,
        updataArticle,
        deleteArticle,
        booktitle
    } from "../fetch";
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {
        quillEditor
    } from 'vue-quill-editor'
    export default {
        name: 'articleList',
        components: {
            quillEditor,
        },
        data() {
            return {
                id: '',
                titlts:'',
                bookName: '',
                addForm: {
                    title: '',
                    content: '',
                },
                articleList: [],
                setbooklist: '',
                addModelState: false,
                title: '',
                addFormRules: {
                    title: [{
                            required: true,
                            message: '标题必填'
                        },
                        {
                            min: 5,
                            max: 30,
                            message: '标题长度介于5-30个字符'
                        }
                    ],
                    content: [{
                        required: true,
                        message: '内容必填'
                    }],
                    channel_id: [{
                        required: true,
                        message: '频道必选'
                    }]
                },
            }
        },
        created() {
            this.id = this.$route.params.id
            this.getBookName(this.id)
            this.getData()

            // this.userid = JSON.parse(localStorage.getItem('userInfo')).id
        },

        methods: {
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
                    id : this.id
                }).then(res => {
                    console.log('创建目录成功')
                })
                console.log(this.titlts)
            },
            // 获取书名
            getBookName(val) {
                getBook(val).then(res => {
                    console.log(res)
                    this.bookName = res.name
                })
            },
            // 查询章节列表
            getData() {
                getArticleList(this.id , this.setbooklist).then(res => {
                    this.articleList = res
                    console.log(res)
                })
            },
            // 新增章节
            addDataFn() {
                this.addModelState = true
                this.title = '新增章节'
            },
            // 章节内容修改
            editor(row) {
                this.addModelState = true
                this.title = '修改章节'
                console.log(row)
                this.addForm.title = row.title
                this.addForm.id = row.id
                this.addForm.content  = row.content
                this.addForm.bookName  = row.bookName
                this.addForm.serialize  = row.serialize

            },
            //删除章节
            delleteBook(row) {
                this.$confirm("确定删除此书籍吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    console.log(row)
                    deleteArticle(row.id , this.id).then(res => {
                        this.$message.success('删除成功')
                        this.getData()
                        setTimeout(() =>{
                            this.directory(this.articleList)
                        }, 3000);

                    })
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消"
                    });
                });

            },
            // 新增/修改弹框保存
            addarticle(val) {
                if(this.articleList.length >= 0){
                    var id = this.articleList.length +1
                }
                if(this.title == '新增章节') {
                    addArticle({
                        id : id,
                        bookid: this.id,
                        bookName: this.bookName,
                        title: this.addForm.title,
                        content: this.addForm.content,
                        serialize: val
                    }).then(res => {
                        console.log(res)
                        this.getData()
                        this.$message.success('保存成功')
                        this.addModelState = false
                        setTimeout(() =>{
                            this.directory(this.articleList)
                        }, 3000);
                    })
                }else if(this.title == '修改章节') {
                    updataArticle({
                        bookid: this.id,
                        title: this.addForm.title,
                        content: this.addForm.content,
                        id: this.addForm.id,
                        serialize: val
                    }).then(res => {
                        this.getData()
                        this.$message.success('修改成功')
                        this.addModelState = false
                        setTimeout(() =>{
                            this.directory(this.articleList)
                        }, 3000);
                    })
                }

            },
        }
    }
</script>

<style lang="less" scoped>
    .box-card {
        margin-bottom: 15px;
        // height: 100%;
    }

    .zhanshi {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
