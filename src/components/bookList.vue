<template>
    <div class="conten">
        <el-card class="box-card">
            <div style="margin:10px 0 10px;">
                <el-input size='small' clearable style="width:150px;margin-right:10px" v-model="setbooklist"
                    placeholder="作品名称"></el-input>
                <el-button size='small' type="primary" plain icon="el-icon-search" @click="getData()">查询</el-button>
                <el-button size='small' style="float:right" plain type="primary" icon="el-icon-circle-plus-outline"
                    @click="addDataFn()">新增</el-button>
            </div>
            <div class="text item">
                <el-table :data="articleList" size='small' stripe border style="width:100%;" height='calc(66vh)'>
                    <el-table-column label="序号" width='60' align="center">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column label="封面" width='80' align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.images" alt="没有图标" width="50" height="67">
                        </template>

                    </el-table-column>
                    <el-table-column label="书名" prop="name" width="100" align="center"></el-table-column>
                    <el-table-column label="简介" prop="intro"  align="center"></el-table-column>
                    <el-table-column label="状态" prop="serialize" width="60" align="center"></el-table-column>
                    <el-table-column label="创建时间" prop="time" width="150" align="center"></el-table-column>
                    <el-table-column label="操作" width='240' align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="$router.push(`/articleList/${scope.row.id}`)">查看</el-button>
                            <el-button type="primary" size="mini" @click="editor(scope.row)">修改</el-button>
                            <el-button type="danger" size="mini" @click="delleteBook(scope.row.id)">删除</el-button>
                        </template>

                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!-- 新增/编辑窗口 -->
        <el-dialog class="version-msg" v-if="addModelState" width="50%" :visible.sync="addModelState"
            :close-on-click-modal="false" :title="title">
            <div>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="label-style">作品名称：</div>
                    </el-col>
                    <el-col :span="8">
                        <el-input size='small' class='full-width' clearable v-model="addData.bookName" placeholder="请输入内容">
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <div class="label-style">作品类型：</div>
                    </el-col>
                    <el-col :span="8">
                        <el-select size='small' style='width: 100%;' v-model="addData.bookType" placeholder="请选择">
                            <el-option v-for="item in visitList" :key="item.value" :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <div style="margin:20px 0;">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <div class="label-style">创建日期：</div>
                        </el-col>
                        <el-col :span="8">
                            <el-date-picker size='small' :disabled="title == '编辑作品'" style='width:100%' value-format="yyyy-MM-dd" v-model="addData.createDate"
                                type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="4" v-if="title == '编辑作品'">
                            <div class="label-style">作品状态：</div>
                        </el-col>
                        <el-col :span="8" v-if="title == '编辑作品'">
                            <el-input size='small' class='full-width' clearable v-model="addData.serialize" placeholder="请输入内容">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin:20px 0;">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <div class="label-style">作品封面：</div>
                        </el-col>
                        <el-col :span="4">

                            <el-upload action="http://ttapi.research.itcast.cn/mp/v1_0/user/images" :headers="setToken"
                                name="image" :show-file-list="false" :on-success="onSuccess">
                                <img :src="addData.image" class="avatar" width="100" height="133">
                            </el-upload>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" plain @click="material">选择封面</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin:20px 0;">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <div class="label-style">作品简介：</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input size='small' type="textarea" v-model='addData.remark' show-word-limit :rows="2"
                                clearable placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div style="text-align:center;margin-top: 20px;">
                    <el-button type="primary" plain @click="saveDataFn()">保存</el-button>
                    <el-button type="primary" plain style='margin-left:30px' @click="addModelState=false">关闭</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 图片素材 -->
        <el-dialog class="version-msg" v-if="materialModelState" width="50%" :visible.sync="materialModelState"
            :close-on-click-modal="false" title="新增作品">
            <ul class="zhanshi">
                <li class="image-box" v-for="item in imageList" :key="item.id" @click="clkImage(item.url)">
                    <img :src="item.url" alt width="100" height="133">
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getImage,
        addbook,
        getaccount,
        getbook,
        deleteBookList,
        updataBook
    } from "../fetch";
    export default {
        name: 'ArticleList',
        data() {
            return {
                id: '',
                title: '',
                setbooklist: '',
                nickname: '',
                userid: '',
                // 接收素材图片列表
                imageList: [],
                addData: {
                    bookName: '',
                    bookType: '',
                    createDate: '',
                    image: '',
                    remark: ''
                },
                materialModelState: false,
                addModelState: false,
                // 日期
                timetotime: [],
                visitList: [{
                    label: '玄幻',
                    value: 0
                }, {
                    label: "修真",
                    value: 1
                }, {
                    label: "都市",
                    value: 2
                }, {
                    label: "历史",
                    value: 3
                }, {
                    label: "游戏",
                    value: 4
                }],
                // 文章列表
                articleList: [],
            }
        },

        watch: {

        },

        created() {
            this.userid = JSON.parse(localStorage.getItem('userInfo')).id
            this.getAccountInfo(this.userid)
            this.getBook(this.userid)
        },
        // 计算属性
        computed: {
            setToken() {
                let id = this.token
                return {
                    Authorization: 'Bearer ' + id
                }
            }
        },
        methods: {
            // 编辑作品信息
            editor(row) {
                this.title = '编辑作品'
                this.id = row.id
                this.addModelState = true
                this.addData.bookName = row.name
                this.addData.bookType = row.type
                this.addData.createDate = row.time
                this.addData.bookType = row.type
                this.addData.serialize = row.serialize
                this.addData.remark = row.intro
                this.addData.image = row.images
                console.log(this.addData)
            },
            // 删除作品
            delleteBook(id) {
                this.$confirm("确定删除此书籍吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    deleteBookList(id).then(res => {
                        this.$message.success('删除成功')
                        this.getBook(this.userid)
                        console.log('删除成功')
                    })
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消"
                    });
                });

                console.log(id)
            },
            // 获取作品列表
            getBook(val) {
                getbook(val).then(res => {
                    console.log(res)
                    this.articleList = res
                })
            },
            // 获得账户基本信息
            getAccountInfo(value) {
                getaccount(value).then(res => {
                    console.log(res);
                    this.nickname = res.nickname;
                })
            },
            // 从素材库中选择图片
            clkImage(val) {
                console.log(val)
                this.addData.image = val
                this.materialModelState = false
            },
            // 选择封面，控制对话框弹出
            material() {
                this.materialModelState = true;
                this.getImageList()
            },
            //获取素材图片
            getImageList() {
                getImage(this.userid).then(res => {
                    console.log(res);
                    this.imageList = res;
                })
            },
            // 回调函数
            onSuccess(res) {
                this.$message.success('图片上传成功')
                console.log(res)
                this.addData.image = res.data.url

            },
            // 查询
            getData() {
                getbook(this.userid, this.setbooklist).then(res => {
                    console.log(res)
                    this.articleList = res
                })
            },

            // 新增作品
            addDataFn() {
                this.title = '新增作品'
                this.addModelState = true;
                this.addData = {
                    bookName: '',
                    bookType: '',
                    createDate: '',
                    image: '',
                    remark: '',
                    serialize: ''
                }
            },
            // 新增窗口保存
            saveDataFn() {
                if (!this.addData.bookName || !this.addData.bookType || !this.addData.createDate || !this.addData.image) {
                    this.$message.error('请将作品信息填写完整！')
                    return
                } else {
                    if (this.title == '编辑作品') {
                        if (!this.addData.serialize) {
                            this.$message.error('请将作品信息填写完整！')
                            return
                        }
                        updataBook({
                            id: this.id,
                            name: this.addData.bookName,
                            images: this.addData.image,
                            type: this.addData.bookType,
                            intro: this.addData.remark,
                            serialize: this.addData.serialize,
                            time: this.addData.createDate,
                        }).then(res => {
                            console.log(res)
                            this.addModelState = false;
                            this.getBook(this.userid)
                        })
                    } else {
                        addbook({
                            name: this.addData.bookName,
                            author: this.nickname,
                            images: this.addData.image,
                            wordcount: '0',
                            type: this.addData.bookType,
                            intro: this.addData.remark,
                            serialize: '连载',
                            time: this.addData.createDate,
                            userid: this.userid
                        }).then(res => {
                            console.log(res)
                            this.addModelState = false;
                            this.getBook(this.userid)
                        })
                    }


                }

            },
        }
    }
</script>

<style lang="less" scoped>
    /*给卡片区设置向下的外边距*/
    .box-card {
        margin-bottom: 15px;
        // height: 100%;
    }

    .image-box {
        list-style: none;

        background-color: #fff;
        margin: 10px;
        float: left;
        border: 1px solid #eee;

        .image-bot {
            width: 150px;
            height: 60px;
            line-height: 60px;
            text-align: center;
        }
    }

    .el-dialog {
        overflow: auto;
    }


    .zhanshi {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
