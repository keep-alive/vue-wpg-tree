/*
 * @Description: 
 * @Author: zhangtianwen
 * @LastEditTime: 2020-05-14 14:02:05
 */
import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueWpgTree from './lib';
library.add(faCaretRight, faCaretDown);
Vue.use(VueWpgTree);
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  el: '#app',
  render: h => h(App)
})
