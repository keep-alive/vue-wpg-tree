/*
 * @Description: 入口文件
 * @Author: zhangtianwen
 * @LastEditTime: 2020-06-15 15:52:01
 */ 
import VueWpgTree from './VueWpgTree.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faCaretRight, faCaretDown);
import * as treeUtil from './treeUtil';
export default class Tree {
    static install(Vue){
        Vue.prototype.$wpgTreeUtil = treeUtil;
        Vue.component('font-awesome-icon', FontAwesomeIcon);
        Vue.component('vue-wpg-tree', VueWpgTree)
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Tree);
}