<!--
 * @Description: 
 * @Author: zhangtianwen
 * @LastEditTime: 2020-06-16 17:35:05
 -->
<template>
  <div id="app">
    <div class="tree-wrapper">
        <vue-wpg-tree
            :source="treeData" 
            :checkable="true"
            :dropkeys="dropkeys"
            :selectedkeys="selectedkeys"
            :checkedkeys="checkedkeys"
            @select="treeselects"
            @menudrop="menudrop"
            @nodeCheck="nodeCheck"
        />
        
    </div>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            treeData:[
                {
                    key:'1',
                    title:'根节点',
                    type:'0',
                    children:[
                        {
                            key:'11',
                            title:'父节点',
                            type:'0',
                            children:[
                                {
                                    key:'111',
                                    title:'子节点1',
                                    type:'0',
                                },
                                {
                                    key:'112',
                                    title:'子节点2',
                                    type:'0',
                                }
                            ]
                        }
                    ]
                }
            ],
            dropkeys:[],
            selectedkeys:[],
            checkedkeys:['1'],
        }
    },
    methods:{
        treeselects(target){
            let {key:targetkey,type} = target;
            if(type === '0'){
                this.selectedkeys = [targetkey]; 
            }
        },
        menudrop(v){
            this.dropkeys = [...v];
        },
        nodeCheck({source,checkList}){
            this.checkedkeys = [...checkList]
            this.treeData = source;
        },
    }
}
</script>
<style>
    .tree-wrapper{
        width: 200px;
    }
</style>

