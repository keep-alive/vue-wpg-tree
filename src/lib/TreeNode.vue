<template>
    <div class="treenoderoot">
        <ul class="treenode" v-for="(item) of datasource" :key="item.key">
            <template v-if="item.children">
                <li class="menuitem" 
                    :style="{'padding-left':setPaddingL(item)}"
                    :class="isSelected(item)"
                    @mouseenter="handleEnter(item)"
                    @mouseleave="handleleave(item)"
                >
                    <div class="itemicon"  @click="handledrop(item)">
                        <font-awesome-icon v-if="isExpand(item)" icon="caret-down"/>
                        <font-awesome-icon v-else icon="caret-right"/>
                    </div>
                    <div v-if="checkable" class="itemCheckbox">
                        <span 
                            class="ant-checkbox" 
                            :class="{'ant-checkbox-checked': item.checked,'ant-checkbox-indeterminate' : item.halfChecked}"
                        >
                            <input type="checkbox" class="ant-checkbox-input" @change="handleCheck($event,item)">
                            <span class="ant-checkbox-inner"></span>
                        </span>
                        <!-- <a-checkbox :indeterminate="item.halfChecked" :checked="item.checked" @change="handleCheck($event,item)"></a-checkbox> -->
                    </div>
                    <div class="itemname wfc2" @click="select(item)">
                        <node-content :node="item"/>
                    </div>
                    <extra-content :node="item"/>
                </li>
                <tree-node 
                    v-if="isExpand(item)" 
                    :checkable="checkable"
                    :level="_level" 
                    :source="item.children" 
                    :dropkeys="dropkeys"
                    :selectedkeys="selectedkeys"
                    :checkedkeys="checkedkeys"
                    :paddingl="paddingl" 
                    :deafultPdl="deafultPdl" 
                    :render-content="renderContent" 
                    :render-node-content="renderNodeContent"
                    @SOURCECREATOR = "sourceCreator"
                ></tree-node>
            </template>
            <template v-else>
                <li 
                    class="menulist wfc2" 
                    :style="{'padding-left':setPaddingL(item)}" 
                    :class="isSelected(item)"
                    @mouseenter="handleEnter(item)"
                    @mouseleave="handleleave(item)"
                >
                    <div v-if="checkable" class="itemCheckbox">
                        <span 
                            class="ant-checkbox" 
                            :class="{'ant-checkbox-checked': item.checked,'ant-checkbox-indeterminate' : item.halfChecked}"
                        >
                            <input type="checkbox" class="ant-checkbox-input" @change="handleCheck($event,item)">
                            <span class="ant-checkbox-inner"></span>
                        </span>
                        <!-- <a-checkbox 
                            :indeterminate="item.halfChecked"  
                            :checked="item.checked" 
                            @change="handleCheck($event,item)">
                        </a-checkbox> -->
                    </div>
                    <div 
                        class="itemname wfc2"
                        @click="select(item)"
                    >
                        <node-content :node="item"/>
                    </div>
                    <extra-content :node="item"/>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
function diff(arr1,arr2){
    return [...arr1.filter(item => !arr2.includes(item)),...arr2.filter(item => !arr1.includes(item))]
}
export default {
    name:'TreeNode',
    props:['source','dropkeys','selectedkeys','checkable','checkedkeys','paddingl','deafultPdl','level','renderContent','renderNodeContent'],
    components:{
        ExtraContent:{
            props:{
                node:Object
            },
            render(h) {
                let {node} = this;
                return this.$parent.renderContent ? this.$parent.renderContent(h,node) : {};
            }
        },
        NodeContent:{
            props:{
                node:Object
            },
            render(h) {
                let {node} = this;
                return this.$parent.renderNodeContent ? this.$parent.renderNodeContent(h,node) : h(
                    'span',
                    {
                        attrs:{
                            title : node.title
                        }
                    },
                    [
                        node.title
                    ]
                )
            }
        },
    },
    computed:{
        _level(){
            return this.level+1;
        },
        
        datasource:{
            get: function () {
                let {_level} = this;
                return this.source.map( node => {
                    return {...node,level:_level}
                })
            },
            set: function (newValue) {}
        }
    },
    watch:{
        checkedkeys:{
            handler(keys=[],preKeys=[]){
                let next = diff(keys,preKeys).length > 0;
                if(next){
                    keys.forEach(key => {
                        this.handleCheck({target:{checked:true}},{key})
                    })
                }
            },
            immediate: true
        },
    },
    methods:{
        dispatch(componentName, eventName, params) {
            let parent = this.$parent;
            let name = parent.$options.componentName;
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        handledrop({ key }){
            let { dropkeys } = this;
            let _dropkeys = dropkeys.includes(key) ? 
            dropkeys.filter(id => {
                return id !== key
            }) : [...dropkeys,key];
            this.dispatch('VueWpgTree','menudrop',[_dropkeys]);
        },
        select(item){
            this.dispatch('VueWpgTree','select',item);
        },
        handleEnter(item){
            this.dispatch('VueWpgTree','nodehover',item);
        },
        handleleave(item){
            this.dispatch('VueWpgTree','nodeleave',item);
        },
        handleCheck(e,{key}){
            let {target:{checked}} = e;
            let item = this.datasource.find( node => key === node.key);
            if(!item) return;
            let setProp = function(arr){
                return arr.map(item => {
                    let {children} = item;
                    if(children){
                        children = setProp(children)
                        return {
                            ...item,
                            children,
                            checked,
                            halfChecked:false
                        }
                    }else{
                        return {
                            ...item,
                            checked,
                            halfChecked:false
                        }
                    }
                })
            }
            let {children} = item;
            if(children){
                children = setProp(children);
            }
            this.$emit('SOURCECREATOR',{
                ...item,
                checked,
                halfChecked:false,
                children,
            })
        },
        sourceCreator(v){
            let {parentKey,key,halfChecked:childHalfChecked} = v;
            let parent = this.datasource.find( ({key}) => key === parentKey);
            let {children} = parent;
            children = children.map(child => {
                if(child.key === key){
                    return v
                }else{
                    return child
                }
            })
            let checked = children.every(({checked}) => checked === true);
            let halfChecked = children.some(({checked}) => checked === true) && checked === false || childHalfChecked === true;
            this.$emit('SOURCECREATOR',{
                ...parent,
                children,
                checked,
                halfChecked
            })
        },
        /**
         * @description: 设置每个节点的缩进
         * @param {Object node}
         */
        setPaddingL(item){
            const { paddingl,deafultPdl,_level } = this;
            return _level*paddingl+deafultPdl+'px';
        },
        /**
         * @description: 是否展开
         * @param {Object node}
         */
        isExpand({key}){
            const { dropkeys } = this;
            return dropkeys.includes(key);
        },
        /**
         * @description: 是否选中
         * @param {Object node}
         */
        isSelected({key}){
            let { selectedkeys } = this;
            return selectedkeys.includes(key) ? 'wfc-tree-active wbgc-tree-active selected':'';
        },
    }
}
</script>

<style lang="less" scoped>
ul{
    padding: 0;
}
li{
    list-style: none;
    box-sizing: border-box;
}
.treenoderoot{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .treenode{
        width: 100%;
        .menuitem,.menulist{
            width: 100%;
            height: 36px;
            line-height: 36px;
            padding-right: 6px;
            border-width: 0 2px 0 0;
            border-style: solid;
            border-color: transparent;
            position: relative;
            .extranode{
                position: absolute;
                right: 12px;
                color:#4285f4;
            }
        }
        .menulist{
            font-size: 14px;
            a,span{
                font-size: 12px;
            }
            &.selected{
                border-color: #71A3F8;
            }
        }
        .itemname,.itemicon{
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            float: left;
            cursor:pointer;
        }
        .itemname{
            font-size: 14px;
            padding-left: 6px;
            max-width: 65%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
        }
        .itemicon{
            width: 12px;
            text-align: right;
            font-size: 14px;
        }
        .itemCheckbox{
            height: 36px;
            width: 20px;
            line-height: 36px;
            padding-left: 4px;
            float: left;
            .ant-checkbox {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                color: rgba(0,0,0,.65);
                font-size: 14px;
                font-variant: tabular-nums;
                line-height: 1.5;
                list-style: none;
                font-feature-settings: "tnum";
                position: relative;
                top: -.09em;
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                vertical-align: middle;
                outline: none;
                cursor: pointer;
                .ant-checkbox-inner {
                    position: relative;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 16px;
                    height: 16px;
                    background-color: #fff;
                    border: 1px solid #d9d9d9;
                    border-radius: 2px;
                    border-collapse: separate;
                    transition: all .3s;
                    box-sizing: border-box;
                }
                .ant-checkbox-inner:after {
                    position: absolute;
                    top: 50%;
                    left: 22%;
                    display: table;
                    width: 5.71428571px;
                    height: 9.14285714px;
                    border: 2px solid #fff;
                    border-top: 0;
                    border-left: 0;
                    transform: rotate(45deg) scale(0) translate(-50%,-50%);
                    opacity: 0;
                    transition: all .1s cubic-bezier(.71,-.46,.88,.6),opacity .1s;
                    content: " ";
                }
                &.ant-checkbox-checked{
                    .ant-checkbox-inner {
                        background-color: #1890ff;
                        border-color: #1890ff;
                    }
                    .ant-checkbox-inner:after {
                        position: absolute;
                        display: table;
                        border: 2px solid #fff;
                        border-top: 0;
                        border-left: 0;
                        transform: rotate(45deg) scale(1) translate(-50%,-50%);
                        opacity: 1;
                        transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
                        content: " ";
                    }
                }
                &.ant-checkbox-indeterminate{
                    .ant-checkbox-inner {
                        background-color: #fff;
                        border-color: #d9d9d9;
                    }
                    .ant-checkbox-inner:after {
                        top: 50%;
                        left: 50%;
                        width: 8px;
                        height: 8px;
                        background-color: #1890ff;
                        border: 0;
                        transform: translate(-50%,-50%) scale(1);
                        opacity: 1;
                        content: " ";
                    }
                } 
            }
            .ant-checkbox-input {
                position: absolute;
                margin: 0;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                width: 100%;
                height: 100%;
                cursor: pointer;
                opacity: 0;
            }
        }
    }
}
</style>


