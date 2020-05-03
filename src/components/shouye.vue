<template>
    <div class="shouye">
        <!-- 轮播图 -->
        <div class="swipe">
            <el-carousel :interval="4000" type="card"  height="298px">
                <el-carousel-item v-for="item in imagesbox" :key="item.id">
                    <img :src="item.idView"  class="image">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 分类菜单 -->
        <div class="type-nav">
            <router-link class="nav-item" v-for="item in bookTypes"
                         :to="{path:'category',query: {type: item.type}}"
                         :key="item.type">
                <i class="icon icon-types"></i>
                <h5>{{item.title}}</h5>
            </router-link>
        </div>
        <!-- 搜索框 -->
        <router-link class="searchs" to="/search">🔍搜索</router-link>
        <div>
            <horizontal title="热门小说" :list="bookList | hot">
                <!-- <a slot="links" @click="getMore">换一换</a> -->
            </horizontal>
            <horizontal title="排行榜" :list="bookList | tops"></horizontal>
            <horizontal title="限时免费" :list="bookList | free"></horizontal>
            <vertical title="新书抢鲜" :list="bookList | fresh"></vertical>
            <vertical title="畅销完本" :list="bookList | finish"></vertical>
        </div>
    </div>
</template>

<script>
    import {getBookList} from "../fetch";
    import Horizontal from '@/components/common/HorizontalList'
    import Vertical from '@/components/common/VerticalList'
    export default {
        name: "shouye",
        components: {
            'horizontal': Horizontal,
            'vertical': Vertical,
        },
        data() {
            return {
                bookTypes: [],
                bookList: [],
                imagesbox: [{
                        id: 0,
                        idView: require("../../static/images/1.jpg")
                    }, {
                        id: 1,
                        idView: require("../../static/images/2.jpg")
                    }, {
                        id: 2,
                        idView: require("../../static/images/3.jpg")
                    }, {
                        id: 3,
                        idView: require("../../static/images/4.jpg")
                    }, {
                        id: 4,
                        idView: require("../../static/images/5.jpg")
                    }
                ]
            }
        },
        filters: {
            tops(value) {
                if (!value) return ''
                var arr = []
                value.forEach((item, index) => {
                    //简单更改下首页加载数据太多,可自行修改
                    if (index > 20 && index < 50) {
                        if (index % 3 == 1) {
                            arr.push(item)
                        }
                    }
                })
                return arr
            },
            hot(value) {
                if (!value) return ''
                var arr = []
                value.forEach((item, index) => {
                    //简单更改下首页加载数据太多,可自行修改
                    if (index < 20) {
                        if (index % 2 == 1) {
                            arr.push(item)
                        }
                    }
                })
                return arr
            },
            free(value) {
                if (!value) return ''
                var arr = []
                value.forEach((item, index) => {
                    //简单更改下首页加载数据太多,可自行修改
                    if (index < 50) {
                        if (index % 5 == 0) {
                            arr.push(item)
                        }
                    }
                })
                return arr
            },
            fresh(value) {
                if (!value) return ''
                let arr = []
                value.map((item) => {
                    if (parseFloat(item.wordcount) < 120) {
                        arr.push(item)
                    }
                })
                return arr.slice(0, 3);
            },
            finish(value) {
                if (!value) return ''
                return value.slice(0, 5);
            }
        },
        created() {
            // console.log(window.localStorage.getItem('userInfo'))
            this.bookTypes = this.$store.state.types;
            getBookList().then(res => {
                console.log(res);
                this.bookList = res;
            })
        }
    }
</script>

<style lang="less" scoped>
    .swipe {
        margin-top: -45px;
    }
    .el-carousel__item {
        display: flex;
        align-items: center;
        justify-content: center;
        .image {
            max-width: 100%; height-width: 100%
        }
    }

    .searchs {
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        width: 90%;
        margin: 15px auto;
        background-color: #fff;
        font-size: 16px;
    }
    .type-nav {
        display: flex;
        background-color: #a7fafa;
        padding: 10px 0;

        .nav-item {
            flex: 1;
            text-align: center;

            &:nth-of-type(1) {
                i {
                    background-position: -63px -28px;
                }
            }

            &:nth-of-type(2) {
                i {
                    background-position: 0 0;
                }
            }

            &:nth-of-type(3) {
                i {
                    background-position: 0 -30px;
                }
            }

            &:nth-of-type(4) {
                i {
                    background-position: 0 -60px;
                }
            }

            &:nth-of-type(5) {
                i {
                    background-position: -30px -30px;
                }
            }
        }
    }
    .el-carousel__item:nth-child(2n) {
        // background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        // background-color: #d3dce6;urur
    }
</style>
