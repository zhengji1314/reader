<template>
    <div class="search">
        <div style="margin-top: 50px;">
           <el-input class="search-item" v-model="value" placeholder="请输入搜索内容"></el-input>
           <el-button style="float: right;" @click="back">返回</el-button>
           <ul v-for="item in list" :key="item.id">
               <li>
                  <router-link :to="{path:'book',query:{bookId:item.id}}">
                      <h5>{{item.name}}</h5>
                      <p>{{item.author}}</p>
                  </router-link>
               </li>
           </ul>
        </div>
    </div>
</template>

<script>
    import {search} from "../fetch";

    export default {
        name: "Search",
        data() {
            return {
                value: '',
                list: []
            }
        },
        watch: {
            value(value) {
                if(value) {
                    search(value).then(res => {
                        console.log(res);
                        this.list = res;
                    })
                }else {
                     this.list = ''
                }

            }
        },
        methods: {
            back() {
                this.$router.back(-1)
            },
        }
    }
</script>

<style lang="less">
    .search {
        overflow: hidden;
        height: 100%;
        margin-top: -30px;
        .el-input {
            width: 90%;
        }
        li {
            border-bottom: 1px solid #d9d9d9;

            // .el-option-wrapper {
            //     -webkit-box-shadow: none;
            //     -moz-box-shadow: none;
            //     box-shadow: none;
            //     background: none;
            // }

                h5 {
                    line-height: 1.8;
                }

                p {
                    font-size: 14px;
                }

        }


    }
</style>
