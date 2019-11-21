// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';

Vue.use(Vant);

import { Lazyload } from 'vant';
Vue.use(Lazyload);

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
