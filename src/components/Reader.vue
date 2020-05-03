<template>
    <div class="reader">

        <!--内容-->
        <div class="reader-container" :bg="currentStyle" :night="night">
			<div style="margin-top: -20px;">当前阅读：{{bookName}}</div>
            <el-button style="float: right;margin-top: -40px;" @click="back">返回</el-button>
            <el-button style="float: right;margin-top: -40px;margin-right: 100px;" @click="showMenu">菜单</el-button>
            <div style="text-align: center;font-size: 20px;font-weight: 500;">{{title}}</div>
            <br>
            <div class="content">
                <p v-for="item in contents" :style="{fontSize: `${fontSize}px`}" v-html="item"></p>
            </div>
            <ul class="btns">
                <li @click="preChapter">上一章</li>
                <li @click="nextChapter">下一章</li>
            </ul>
        </div>
        <!--底部菜单-->
        <bottom-menu :class="{show: menu}"></bottom-menu>
        <!--目录-->
        <title-list :class="{show: cover}" :book-id="bookId"></title-list>
        <!--字体-->
        <fonts :class="{show: font}"></fonts>
    </div>
</template>

<script>
    import {getBookContent, getLate, postLately,getArticleList} from "../fetch";
    import {mapState} from 'vuex'

    import TopMenu from './common/TopMenu'
    import BottomMenu from './common/BottomMenu'
    import TitleList from './common/TitleList'
    import Fonts from './common/Fonts'

    export default {
        name: "Reader",
        data() {
            return {
                id:'',
                articleList:[],
                bookId: '',
                title: '',
				bookName:'',
                contents: [],
                counts: 0
            }
        },
        components: {
            'top-menu': TopMenu,
            'bottom-menu': BottomMenu,
            'title-list': TitleList,
            'fonts': Fonts
        },
        computed: {
            ...mapState([
                'currentCpt', 'cover', 'fontSize', 'font', 'menu', 'night', 'currentStyle'
            ])
        },
        watch: {
            currentCpt(value) {
                this.getBookContent(this.$route.params.bookId, value);
                console.log(this.$route.params)
            }
        },
        methods: {
            // 查询章节列表
            getData() {
                getArticleList(this.$route.params.bookId, '').then(res => {
                    this.articleList = res
                    console.log(res)
                })
            },
            // 返回
            back() {
                this.$router.back(-1)
            },
            // 获取当前章节内容
            getBookContent(id, chapter) {
                getBookContent(id, chapter).then(res => {
                    console.log(res)
                    this.title = res.title;
                    this.id = res.id;
					this.bookName = res.bookName
                    if(res.content) {
                        this.contents = res.content.split('-');
                    }else {
                        this.contents = '暂无内容'
                    }

                })
            },
            // 上一章
            preChapter() {
                if(this.id == '1') {
                    this.$message.error('当前已经是第一章！')
                }else {
                    this.$store.dispatch('preCpt').then(() => {
                        this.$nextTick(() => {
                            window.scrollTo(0, 0)
                        })
                    });
                }

            },
            // 下一章
            nextChapter() {
                const val = this.articleList.length
                if(val == this.id) {
                    this.$message.error('当前已经是最后一章！')
                }else {
                    console.log(val)
                    this.$store.dispatch('nextCpt', 500).then(() => {
                        this.$nextTick(() => {
                            window.pageYOffset = 0
                            window.scrollTo(0, 0)
                        })
                    });
                }

            },
            // 显示菜单
            showMenu() {
                this.$store.dispatch('menus')
            },
        },
        created() {
            this.getData();
            this.bookId = this.$route.params.bookId;
            this.getBookContent(this.$route.params.bookId, this.$store.state.currentCpt)
        },
        // 添加最近阅读记录
        destroyed() {
            postLately(JSON.parse(localStorage.getItem('userInfo')).id, this.bookId, this.currentCpt).then(res => {
                this.$store.dispatch('menus')
                console.log(res);
            })
        },
    }
</script>

<style lang="less">
    .reader {
        .bgc(@color) {
            background-color: @color;
            .mint-header {
                background-color: @color;
            }
        }

        .reader-container {
            padding: 50px 15px 0;
            color: #555;

            &[bg='style1'] {
                .bgc(#e9dfc7);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            &[bg='style2'] {
                .bgc(#e7eee5);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            &[bg='style3'] {
                .bgc(#a4a4a4);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            &[bg='style4'] {
                .bgc(#cdefcd);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            &[bg='style5'] {
                .bgc(#283548);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            .mint-header {
                height: 50px;
                line-height: 50px;
                background-color: #fff;
                font-size: 18px;
                color: #555;
            }

            .content {
                p {
                    text-indent: 2em;
                    font-size: 16px;
                    line-height: 1.8;
                    margin-bottom: 10px;
                }
            }

            .btns {
                width: 100%;
                padding: 15px 0;
                height: 40px;
                font-size: 0;
                text-align: center;
                // z-index: 99;

                li {
                    width: 100px;
                    display: inline-block;
                    line-height: 40px;
                    color: #fff;
                    text-align: center;
                    background-color: #26a2ff;
                    font-size: 14px;
                    -webkit-border-radius: 6px;
                    -moz-border-radius: 6px;
                    border-radius: 6px;
                    margin: 0 15px;
                }
            }
        }

        .show-menus {
            position: fixed;
            top: 30%;
            width: 100px;
            height: 35%;
                z-index: 5;
        }

        // .page-up {
        //     position: fixed;
        //     top: 50px;
        //     height: 30%;
        //     width: 100%;
        //     text-indent: -9999px;
        //     z-index: 5;
        // }

        // .page-down {
        //     position: fixed;
        //     bottom: 70px;
        //     height: 30%;
        //     width: 100%;
        //     text-indent: -9999px;
        //     z-index: 5;
        // }

    }
</style>
