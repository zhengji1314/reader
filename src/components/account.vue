<template>
    <el-card class="box-card">
        <!--命名插槽，头部内容设置-->
        <div slot="header" class="clearfix">
            <span style="font-size: 20px;font-weight: 700;">账户信息</span>
        </div>
        <!--匿名插槽，卡片主体内容-->
        <div class="text item cardbody">
            <div id="lt">
                <div style="margin-left: 20px;">
                    <el-row :gutter="10" style="margin: 20px 0;">
                        <el-col :span="8">
                            <div class="label-style">昵称：</div>
                        </el-col>
                        <el-col :span="16">
                            <el-input size='small' v-model="dataList.nickname" clearable placeholder="请输入内容">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 20px 0;">
                        <el-col :span="8">
                            <div class="label-style">邮箱：</div>
                        </el-col>
                        <el-col :span="16">
                            <el-input size='small' v-model="dataList.email" clearable placeholder="请输入内容">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 20px 0;">
                        <el-col :span="8">
                            <div class="label-style">手机号码：</div>
                        </el-col>
                        <el-col :span="16" >
                            <el-input size='small' v-model="dataList.number" clearable placeholder="请输入内容">
                            </el-input>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 20px 0;">
                        <el-col :span="8">
                            <div class="label-style">性别：</div>
                        </el-col>
                        <el-col :span="16" >
                            <el-radio v-model="dataList.radio" label="1">男</el-radio>
                            <el-radio v-model="dataList.radio" label="2">女</el-radio>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 20px 0;">
                        <el-col :span="8">
                            <div class="label-style">出生日期：</div>
                        </el-col>
                        <el-col :span="16">
                            <el-date-picker type="date" placeholder="选择日期" v-model="dataList.date" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 20px 0;">
                        <el-col :span="8">
                            <div class="label-style">个人简介：</div>
                        </el-col>
                        <el-col :span="16">
                            <el-input size='small' type="textarea" v-model='dataList.remark' show-word-limit :rows="2" clearable
                                placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>

                </div>
                <div style="text-align:center;margin-top: 30px;">
                    <el-button type="primary" plain @click="saveDataFn()">保存</el-button>
                </div>
            </div>
           <div id="rt" style="text-align: center;">
               <img :src="dataList.image" class="avatar" width="150" height="200">
               <el-upload
                 action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                 :headers="setToken"
                 name="image"
                 :show-file-list="false"
                 :on-success="onSuccess"
               >
                 <el-button size="small" type="primary">选择头像</el-button>
               </el-upload>
            </div>
        </div>
    </el-card>
</template>
<script>
    // 导入公共的bus的vue对象
    // import bus from '@/utils/bus.js'
    import {account , getaccount ,image} from "../fetch";
    export default {
        name: 'account',
        data() {
            return {
                // flag:false,
                imageList: [],
                url:'',
                userid:'',
                dataList: {
                    nickname: '',
                    number: '',
                    radio: '1',
                    date: '',
                    email: '',
                    remark: '',
                    image:''
                },
            }
        },
        // 计算属性
        computed: {
          setToken () {
            let id = this.token
            return { Authorization: 'Bearer ' + id }
          }
        },
        created() {
            this.userid = JSON.parse(localStorage.getItem('userInfo')).id
            this.getAccountInfo(this.userid)
        },

        methods: {
            // 回调函数
            onSuccess (res) {
              this.$message.success('图片上传成功')
              console.log(res)
               this.url = res.data.url
                account({
                    url: this.url,
                    userid: JSON.parse(localStorage.getItem('userInfo')).id,
                }).then(res => {
                    this.getAccountInfo(this.userid)
                })
            },

            // 修改个人信息
            saveDataFn() {
                account({
                    nickname: this.dataList.nickname,
                    number: this.dataList.number,
                    radio: this.dataList.radio,
                    date: this.dataList.date,
                    remark: this.dataList.remark,
                    email: this.dataList.email,
                    userid: JSON.parse(localStorage.getItem('userInfo')).id,
                }).then(res => {
                    this.$message.success('修改成功')
                    this.getAccountInfo(this.userid)
                })
            },

            // 获得账户基本信息
            getAccountInfo(value) {
                getaccount(value).then(res => {
                    console.log(res);
                    this.dataList = res;
                })
            },

        }
    }
</script>

<style lang="less" scoped>
    // 给表单 和 头像区域做布局样式设计
    .box-card {
        height: 100%;
    }
    .setCommonTallHeight {
        height: 500px;
    }
    .cardbody {
        display: flex;
        justify-content: space-between;

        #lt {
            width: 40%;
        }

        #rt {
            width: 30%;
        }
    }
    .item {
        img {
            width: 100px;
            height: 133px;
        }
    }
</style>
