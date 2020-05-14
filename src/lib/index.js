import VueWpgTree from './VueWpgTree.vue'
import * as treeUtil from './treeUtil';
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueWpgTree);
    window.Vue.prototype.$wpgTreeUtil = treeUtil;
}
export default class Tree {
    static install(Vue){
        Vue.prototype.$wpgTreeUtil = treeUtil;
        Vue.component('vue-wpg-tree', VueWpgTree)
    }
}