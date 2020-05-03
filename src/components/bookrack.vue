<template>
    <div class="book-shelf">
        <ul class="vertical-list">
            <li v-for="item in bookList">
                <router-link :to="{path:'book',query:{bookId:item.bookid}}">
                    <div class="image">
                        <img :src="item.images" :alt="item.name">
                    </div>
                    <div class="base">
                        <h4>{{item.bookname}}</h4>
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
                <el-button type="danger" @click="deleteBook(item.bookid)" icon="el-icon-delete" style="width: 40px;height: 40px;float: right;" circle></el-button>
                <!-- <el-button class="el-icon-delete" style="width: 70px;height: 40px;float: right;"></el-button> -->
            </li>
        </ul>
    </div>
</template>

<script>
    import {getShelf,deleteBook} from "../fetch";

    export default {
        name: "BookShelf",
        data(){
            return{
                bookList:[]
            }
        },
        methods: {
            deleteBook(id) {
                this.$confirm("确定从书架删除此书籍吗？", "提示", {
                	confirmButtonText: "确定",
                	cancelButtonText: "取消",
                	type: "warning"
                }).then(() => {
                    deleteBook(JSON.parse(localStorage.getItem('userInfo')).id, id).then(res => {
                        console.log(res);
                        getShelf(JSON.parse(localStorage.getItem('userInfo')).id).then(res => {
                            console.log(res);
                            this.bookList = res;
                        })
                    })
                }).catch(() => {
                	this.$message({
                		type: "info",
                		message: "已取消"
                	});
                });


            },
            goBack() {
                this.$router.go(-1);
            }
        },
        created() {
            getShelf(JSON.parse(localStorage.getItem('userInfo')).id).then(res => {
                console.log(res);
                this.bookList = res;
            })
        }
    }
</script>

<style scoped>

</style>
