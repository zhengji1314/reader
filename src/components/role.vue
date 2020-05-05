<template>
    <div>
        <el-card class="box-card">
            <div style="margin:10px 0 10px;">
                <el-select size='small' v-model="setbooklist" placeholder="请选择">
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
                    <el-table-column label="用户昵称" prop="nickname" width="100" align="center"></el-table-column>
                    <el-table-column label="邮箱" prop="email" width="150" align="center"></el-table-column>
                    <el-table-column label="手机号" prop="number" width="150" align="center"></el-table-column>
                    <el-table-column label="身份证号" prop="ID_number" width="250" align="center"></el-table-column>
                    <el-table-column label="状态" prop="role" width="80" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.role == '1'">未审核</span>
                            <span v-if="scope.row.role == '2'">已审核</span>
                            <span v-if="scope.row.role == '3'">已驳回</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请原因" prop="cause" align="center">
                        <template slot-scope="scope">{{scope.row.cause.substr(0,20)}}</template>
                    </el-table-column>
                    <el-table-column label="操作" width='80' align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" v-if="scope.row.role == '1'" @click="editor(scope.row)">审核</el-button>
                            <el-button type="primary" size="mini" v-if="scope.row.role == '2' || scope.row.serialize == '3'"
                                @click="editor(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog class="version-msg" v-if="addModelState" width="50%" :visible.sync="addModelState"
            :close-on-click-modal="false" title="审核页面">
            <div>
                <div style="margin:20px 0;">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <div class="label-style">用户昵称：</div>
                        </el-col>
                        <el-col :span="8">
                            <el-input size='small' class='full-width' clearable v-model="checkData.nickname"
                                placeholder="请输入内容">
                            </el-input>
                        </el-col>
                        <el-col :span="4">
                            <div class="label-style">邮箱：</div>
                        </el-col>
                        <el-col :span="8">
                            <el-input size='small' class='full-width' clearable v-model="checkData.email" placeholder="请输入内容">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin:20px 0;">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <div class="label-style">手机号：</div>
                        </el-col>
                        <el-col :span="8">
                            <el-input size='small' class='full-width' clearable v-model="checkData.number" placeholder="请输入内容">
                            </el-input>
                        </el-col>
                        <el-col :span="4">
                            <div class="label-style">身份证号：</div>
                        </el-col>
                        <el-col :span="8">
                            <el-input size='small' class='full-width' clearable v-model="checkData.ID_number"
                                placeholder="请输入内容">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin:20px 0;">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <div class="label-style">申请原因：</div>
                        </el-col>
                        <el-col :span="20">
                            <el-input size='small' type="textarea" v-model='checkData.cause' show-word-limit :rows="6"
                                clearable placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div style="text-align:center;margin-top: 20px;">
                    <el-button type="primary" v-if="setbooklist == '1'" plain @click="pass()">通过</el-button>
                    <el-button type="primary" v-if="setbooklist == '1'" plain @click="reject()">驳回</el-button>
                    <el-button type="primary" plain @click="addModelState=false">关闭</el-button>
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
                        <el-input size='small' type="textarea" v-model='cause' show-word-limit :rows="4" clearable
                            placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
            </div>
            <div style="text-align:center;margin-top: 20px;">
                <el-button type="primary" plain @click="confirm()">确定</el-button>
                <el-button type="primary" plain @click="materialModelState=false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getRole,
        changeRole
    } from "../fetch";
    export default {
        data() {
            return {
                cause: '',
                articleList: [],
                addModelState: false,
                checkData: {},
                materialModelState: false,
                dataList: {},
                setbooklist: '1',
                visitList: [{
                        label: "未审核",
                        value: '1'
                    }, {
                        label: "已审核",
                        value: '2'
                    },
                    {
                        label: "已驳回",
                        value: '3'
                    }
                ],
                userid:'',
            }
        },
        created() {
            this.getData('1')
        },
        methods: {
            // 查询章节列表
            getData(val) {
                getRole(val).then(res => {
                    this.articleList = res
                    console.log(res)
                })
            },
            // 获取审核数据
            editor(row) {
                console.log(row)
                this.checkData = row
                this.userid = row.user_id
                this.addModelState = true
            },
            // 审核通过
            pass() {
                changeRole({
                    id: this.userid,
                    role: '2',
                    cause: '审核通过'
                }).then(res => {
                    this.$message.success('审核成功')
                    this.addModelState = false
                    this.getData('1')
                })
            },
            // 驳回
            reject() {
                this.materialModelState = true
            },
            // 填写驳回原因
            confirm() {
                checkBook({
                    id: this.userid,
                    role: '2',
                    cause: this.cause
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
    .label-style {
        float: right;
    }
</style>
