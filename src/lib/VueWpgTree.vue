<template>
    <div class="tree">
        <tree-node 
            :source="treeSource" 
            :checkable="checkable" 
            :checkedkeys="checkedkeys"
            :dropkeys="_dropkeys"
            :selectedkeys="selectedkeys"
            :paddingl="paddingl" 
            :deafultPdl="deafultPdl" 
            :level="level"
            :render-content="renderContent"
            :render-node-content="renderNodeContent"
            @SOURCECREATOR="sourceCreator"
        />
    </div>
</template>
<script>
import TreeNode from './TreeNode';
function getDropKeys(arr){
    return arr.reduce((pre,cur) => {
        let {children,key} = cur;
        if(children){
            pre = [...pre,key,...getDropKeys(children)]
        }
        return pre;
    },[])
}
function setKey(arr,val){
     return arr.map(item => {
        let {children,key} = item;
        if(children){
            children = setKey(children,key)
            return {
                ...item,
                parentKey:val,
                children
            }
        }else{
            return {
                ...item,
                parentKey:val
            }
        }
    })
}
function setParentKey(arr){
    return arr.map(node => {
        let {children,key} = node;
        if(children){
            children = setKey(children,key)
            return {
                ...node,
                children,
                parentKey:''
            }
        }else{
            return {
                ...node,
                parentKey:''
            }
        }
    })
}

function getCheckList(arr){
    return arr.reduce((pre,cur) => {
        let { children,checked,key } = cur;
        if(checked){
            pre = [...pre,key]
        }
        if(children){
            pre = [...pre,...getCheckList(children)]
        }
        return pre;
    },[])
}
export default {
    componentName:'VueWpgTree',
    name:'VueWpgTree',
    components:{
        TreeNode
    },
    props:{
        source:{
            type:Array,
            required:true
        },
        expandall:{
            type:Boolean,
            default:true
        },
        checkable:{
            type:Boolean,
            default:false
        },
        dropkeys:{
            type:Array,
            default(){
                return []
            }
        },
        selectedkeys:{
            type:Array,
            default(){
                return []
            }
        },
        checkedkeys:{
            type:Array,
            default(){
                return []
            }
        },
        paddingl:{
            type:Number,
            default:12
        },
        deafultPdl:{
            type:Number,
            default:10
        },
        level:{
            type:Number,
            default:-1
        },
        renderContent:Function,
        renderNodeContent:Function,
    },
    computed: {
        _dropkeys(){
            let {source,dropkeys,expandall} = this; 
            if(dropkeys.length > 0){
                return dropkeys;
            }
            if(expandall){
                return getDropKeys(source)
            }else{
                return dropkeys;
            }
        },
        treeSource:{
            get(){
                return setParentKey(this.source)
            }
        }
    },
    
    methods:{
        sourceCreator(v){
            let treeData = this.treeSource.map( root =>{
                let {key} = root;
                return key === v.key ? v : root
            })
            let checkList = getCheckList(treeData);
            this.$emit('nodeCheck',{
                source:treeData,
                checkList
            })
        }
    }
}
</script>
<style>
    .tree{
        width:100%;
        height:100%;
    }
</style>