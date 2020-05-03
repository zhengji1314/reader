// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import App from './App'

Vue.use(ElementUI);
// Vue.use(Mint);

// import 'animate.css';
import '@/assets/less/reset.css';
Vue.prototype.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODcyODIwMDMsInVzZXJfaWQiOjExOTMzNjczMDQ4ODk0MzQxMTIsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0._M54Ds0q2cvQL0qaNEFAJW6g7S49_Nk_auJhTxZJ26I'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
