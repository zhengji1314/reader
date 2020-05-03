<template>
    <div class="container">
        <div class="login-container" v-if="flag">
            <div class="login-box">

                <el-form ref="loginForm" style="margin-top: 30px;" :model="loginForm" label-width="60px" class="demo-ruleForm">
                    <h3 style="text-align: center;font-size: 20px;">悦读中文网</h3>
                    <el-form-item style="margin-top: 10px;" label="账号:" prop="username" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
                        <el-input v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                        <el-input v-model="loginForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item prop="xieyi" :rules="[{type: 'array',required: true, message: '请选择协议',  trigger: 'change' }]">
                        <el-checkbox v-model="loginForm.xieyi" name="xieyi"></el-checkbox>
                        <span>我已阅读并同意用户协议和隐私条款</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="isActive" :disabled="isActive" style="width:100%;margin-left: -30px;margin-top: 10px;"
                            type="primary" @click="login('loginForm')">登录</el-button>
                        <div style="text-align: center;margin-left:-70px" @click="mfzc">免费注册</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="register" v-if="zhuce">
            <el-form :model="loginForm" ref="loginForm" label-width="85px" class="demo-ruleForm">
                <h3 style="text-align: center;font-size: 20px;">悦读中文网</h3>
                <el-form-item label="账号:" style="margin-top: 10px;" prop="username" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="password2" :rules="[{ required: true, message: '请再次输入密码', trigger: 'blur' }]">
                    <el-input v-model="loginForm.password2" type="password"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: -30px;" prop="xieyi" :rules="[{type: 'array',required: true, message: '请选择协议',  trigger: 'change' }]">
                    <el-checkbox v-model="loginForm.xieyi" name="xieyi"></el-checkbox>
                    <span>我已阅读并同意用户协议和隐私条款</span>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%;margin-left: -30px;" type="primary" @click="submitForm('loginForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="xinxi">
            <!--      <div>个人信息</div> -->
            <el-dialog title="个人信息" class="version-msg" center :visible.sync="xinxi" v-if="xinxi" width="300"
                :close-on-click-modal="false" custom-class="setCommonTallHeight">
                <div>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <div class="label-style">昵称：</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input size='small' v-model="dataList.nickname" clearable placeholder="请输入内容">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 10px 0;">
                        <el-col :span="8">
                            <div class="label-style">邮箱：</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input size='small' v-model="dataList.email" clearable placeholder="请输入内容">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 10px 0;">
                        <el-col :span="8">
                            <div class="label-style">手机号码：</div>
                        </el-col>
                        <el-col :span="10" style="margin-top: 10px;">
                            <el-input size='small' v-model="dataList.number" clearable placeholder="请输入内容">
                            </el-input>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 10px 0;">
                        <el-col :span="8">
                            <div class="label-style">性别：</div>
                        </el-col>
                        <el-col :span="10" style="margin-top: 10px;">
                            <el-radio v-model="dataList.radio" label="1">男</el-radio>
                            <el-radio v-model="dataList.radio" label="2">女</el-radio>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 10px 0;">
                        <el-col :span="8">
                            <div class="label-style">出生日期：</div>
                        </el-col>
                        <el-col :span="10">
                            <el-date-picker type="date" placeholder="选择日期" v-model="dataList.date" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin: 10px 0;">
                        <el-col :span="8">
                            <div class="label-style">个人简介：</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input size='small' v-model='dataList.remark' show-word-limit :rows="2" clearable
                                placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>

                </div>
                <div style="text-align:center;margin-top: 20px;">
                    <el-button type="primary" plain @click="saveDataFn()">保存</el-button>
                    <el-button type="primary" plain @click="cancleDataFn()">跳过</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {
        login,
        register,
        account
    } from "../fetch";
    import md5 from 'md5'
    import '@/assets/js/gt.js'
    export default {
        data() {
            return {
                id: '15290238712',
                isActive: false,
                catObj: null,
                dataList: {
                    nickname: '',
                    number: '',
                    radio: '1',
                    date: '',
                    email: '',
                    remark: '',
                },
                flag: true,
                zhuce: false,
                xinxi: false,
                ruleForm: {},
                // rules:'',
                loginForm: {
                    password: '', // 密码
                    password2: '',
                    username: '', // 账号
                    xieyi: [] // 协议
                }
            }
        },
        methods: {
            mfzc() {
                this.flag = false
                this.zhuce = true
            },
            // 登录方法
            login(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 判断极验窗口存在就直接使用
                        if (this.catObj !== null) {
                            return this.catObj.verify() // 显示窗口
                            // console.log(this)
                        }
                        let that = this
                        // 登录按钮禁用、等待
                        this.isActive = true
                        axios.get(`http://ttapi.research.itcast.cn/mp/v1_0/captchas/${this.id}`)
                            .then(function(res) {
                                let {
                                    data
                                } = res.data
                                window.initGeetest({
                                    gt: data.gt,
                                    challenge: data.challenge,
                                    offline: !data.success,
                                    new_captcha: true,
                                    product: 'bind'
                                }, captchaObj => {
                                    captchaObj.onReady(() => {
                                        console.log(111)
                                        // 验证码ready之后才能调用verify方法显示验证码
                                        // 生成窗口
                                        captchaObj.verify()
                                        // 把窗口对象赋予给ctaObj对象
                                        that.catObj = captchaObj
                                        // 登录按钮状态恢复
                                        that.isActive = false
                                    }).onSuccess(() => {
                                        // 人的行为正确，登录后台系统
                                        console.log(222)
                                        that.isActive = false
                                        login(that.loginForm.username, md5(that.loginForm.password))
                                            .then(res => {
                                                console.log(res);
                                                if (res) {
                                                    that.$store.dispatch('getInfo', res);
                                                    localStorage.setItem('userInfo',
                                                        JSON.stringify(res));
                                                    that.$router.push('/')
                                                    that.$message.success('登录成功！')
                                                } else {
                                                    that.$message.error('用户名或密码错误')
                                                }
                                            })
                                    }).onError(() => {
                                        console.log(333)
                                    })
                                })
                            })
                            .catch(err => {
                                console.log(444)
                                return this.$message.error('验证错误')
                            })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 注册方法
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        if (this.loginForm.password != this.loginForm.password2) {
                            this.$message({
                                type: "error",
                                message: "两次输入密码不一致，请重新输入！"
                            });
                            return
                        }
                        register({
                            user: this.loginForm.username,
                            pwd: md5(this.loginForm.password),
                        }).then(res => {
                            if (res.insertStatus === 2) {
                                this.$message.error('该账号已被注册，请重新填写')
                            } else if (res.insertStatus === 0) {
                                this.$message.error('注册失败，请重新注册')
                            } else {
                                this.$message.success('注册成功')
                                this.$store.dispatch('getInfo', res.userInfo);
                                localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
                                this.zhuce = false;
                                this.xinxi = true;
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            // 个人信息保存方法
            saveDataFn() {
               account({
                   nickname: this.dataList.nickname,
                   number: this.dataList.number,
                   radio: this.dataList.radio,
                   date: this.dataList.date,
                   remark: this.dataList.remark,
                   email: this.dataList.email,
                   userid: JSON.parse(localStorage.getItem('userInfo')).id
               }).then(res => {
                   this.xinxi = false;
                   this.$message.success('保存成功')
                   this.$router.push('/shouye')
               })
            },
            // 个人信息跳过
            cancleDataFn() {
                this.xinxi = false;
                this.$router.push('/shouye')
            },
        }
    }
</script>

<style lang="less" scoped>
    .setCommonTallHeight {
        height: 50%;
    }

    .label-style {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: right;
        width: 100%;
    }

    .container {
        background-image: url('./rate/login_bg.jpg');
        background-size: cover;
        height: 100%;
        // background-color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-container {
        height: 100%;
        // background-color: gray;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-box {
            width: 450px;
            height: 345px;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;

            .el-form {
                width: 75%;
            }
        }
    }

    .register {
        width: 450px;
        height: 400px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;

        .el-form {
            width: 75%;
        }
    }
</style>
