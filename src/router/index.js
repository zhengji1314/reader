import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
            path: '/',
            name: 'shouye',
            redirect: '/shouye',
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/login'], resolve)
        },
        {
            path: '/home', // 主体
            name: 'home',
            component: resolve => require(['@/components/home'], resolve),
            children: [{
                    path: '/shouye', // 首页
                    name: 'shouye',
                    component: resolve => require(['@/components/shouye'], resolve)
                }, {
                    path: '/bookrack', // 我的书架
                    name: 'bookrack',
                    component: resolve => require(['@/components/bookrack'], resolve)
                }, {
                    path: '/bookList', // 作品管理
                    name: 'bookList',
                    component: resolve => require(['@/components/bookList'], resolve)
                },{
                    path: '/articleList/:id', // 章节列表
                    name: 'articleList',
                    component: resolve => require(['@/components/articleList'], resolve)
                },{
                    path: '/material', // 素材管理
                    name: 'material',
                    component: resolve => require(['@/components/material'], resolve)
                }, {
                    path: '/account', // 账户信息
                    name: 'account',
                    component: resolve => require(['@/components/account'], resolve)
                }, {
                    path: '/audit', // 作品审核  
                    name: 'audit',
                    component: resolve => require(['@/components/audit'], resolve)
                }, {
                    path: '/apply', // 申请审核  
                    name: 'apply',
                    component: resolve => require(['@/components/role'], resolve)
                }, {
                    path: '/book', // 书籍信息
                    name: 'book',
                    component: resolve => require(['@/components/BookDetail'], resolve)
                },
                {
                    path: '/content', // 阅读界面
                    name: 'content',
                    component: resolve => require(['@/components/Reader'], resolve)
                }, {
                    path: '/category', // 分类列表
                    name: 'category',
                    component: resolve => require(['@/components/Category'], resolve)
                }, {
                    path: '/search', // 搜索页面
                    name: 'search',
                    component: resolve => require(['@/components/Search'], resolve)
                },
            ],
            }
        ]

        const router = new Router({
            routes
        })

        router.beforeEach((to, from, next) => {
            var userinfo = window.localStorage.getItem('userInfo')
            // console.log(userinfo)
            if (!userinfo && (to.path == '/material' ||to.path == '/apply' ||to.path == '/bookrack' || to.path == '/bookList' || to.path == '/account' || to.path ==
                    '/audit')) {
                return next('/login')
            }
            next()
        })

        export default router
