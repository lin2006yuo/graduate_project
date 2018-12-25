// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'assets/css/reset.styl'
import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
//iconfont
import 'assets/icon/iconfont.css'

import ElementUI from 'element-ui';


Vue.use(ElementUI)

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if(to.matched.some(m => m.meta.auth)){
    if(store.state.admin.user.username){
      next()
    }else{
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；

      next({ path: '/admin/login' })
    }
  }else{
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
