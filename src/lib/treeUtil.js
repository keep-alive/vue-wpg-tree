/**
 * @description: Method for root, Such as expand or scale operations
 * @param {Array} arr treeData
 * @param {String} targetkey nodeKey
 * @param {String} field nodeProp
 * @return: treeData
 */
function menuCaculate(arr, targetkey, field) {
    return arr.map(item => {
        let { key, children } = item;
        let _field = !!item[field];
        if (targetkey === key) {
            return {
                ...item,
                [field]: !_field
            }
        } else {
            if (children) {
                children = menuCaculate(children, targetkey, field)
                return {
                    ...item,
                    children
                }
            } else {
                return { ...item }
            }
        }
    })
}

/**
 * @description: Method for node, Such as one property are added when selected
 * @param {Array} arr treeData
 * @param {String} targetkey nodeKey
 * @param {String} prop nodeProp
 * @return: treeData
 */
function selectList(arr, targetkey, prop) {
    return arr.map(item => {
        let { key, children } = item;
        if (targetkey === key) {
            return {
                ...item,
                [prop]: true
            }
        } else {
            if (children) {
                children = selectList(children, targetkey, prop)
                return {
                    ...item,
                    children
                }
            } else {
                return { ...item, [prop]: false }
            }
        }
    })
}
function nodeMenuSelect(arr, targetkey, prop){
    return arr.map(item => {
        let { key, children } = item;
        let val = targetkey === key;
        if (children) {
            children = nodeMenuSelect(children, targetkey, prop)
            return {
                ...item,
                [prop]: val,
                children
            }
        } else {
            return {
                ...item,
                [prop]: val
            }
        }
    })
}
/**
 * @description: Method for root or node, Such as one property are changed when hovered
 * @param {Array} arr treeData
 * @param {String} targetkey nodeKey
 * @param {String} prop nodeProp
 * @param {Boolean} val nodePropValue
 * @return: treeData
 */
function commonCaculate(arr, targetkey, prop, val = true) {
    return arr.map(item => {
        let { key, children } = item;
        if (targetkey === key) {
            return {
                ...item,
                [prop]: val
            }
        } else {
            if (children) {
                children = commonCaculate(children, targetkey, prop, val)
                return {
                    ...item,
                    children
                }
            } else {
                return { ...item }
            }
        }
    })
}
export { menuCaculate, selectList, nodeMenuSelect, commonCaculate }