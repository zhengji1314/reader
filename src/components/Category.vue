<template>
    <div class="cate">
        <div style="height: 10px;">
            <div style="font-size: 20px;">当前类型：{{title}}</div>
            <el-button style="float: right;margin-top: -20px;" @click="back">返回</el-button>
        </div>
        <ul class=vertical-list style="margin-top: 10px;">
            <li v-for="item in bookList">
                <router-link :to="{path:'book',query:{bookId:item.id}}">
                    <div class="image">
                        <img :src="item.images" :alt="item.name">
                    </div>
                    <div class="base">
                        <h4>{{item.name}}</h4>
                        <p>{{item.intro}}</p>
                        <div class="author">
                            <i class="icon icon-author"></i>
                            <span>{{item.author}}</span>
                        </div>
                        <div class="category">
                            <span>{{item.type}}</span>
                            <span>{{item.serialize}}</span>
                            <span>{{item.wordcount}}万字</span>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getBookType} from "../fetch";

    export default {
        name: "Category",
        data() {
            return {
                title: '',
                bookList: []
            }
        },
        methods: {
            back() {
                this.$router.back(-1)
            },
        },
        created() {
            this.$store.dispatch('getType', this.$route.query.type).then(res => {
                console.log(res);
                this.title = res;
                getBookType(res).then(response => {
                    console.log(response);
                    this.bookList = response;
                })
            });
        }
    }
</script>

<style lang="less">
    .cate {

    }

</style>
