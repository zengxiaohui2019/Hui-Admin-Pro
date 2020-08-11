import Vue from 'vue'

/**
 * 根据props将paramsData转换成带有指定属性和属性值的对象
 * @param {Object} paramsData 被转换的数据
 * @param {Array} props 指定生成对象的属性值的对象数组（或者字符串）
 *
 * */
export const transPropsListByProps = (paramsData, props) => {
    const propsList = {}
    if(props.length === 0 || !props) return propsList
    props.forEach(e => {
        if(typeof e === 'object') {
            const { tag, required } = e
            if(!!tag && !!required) {
                Object.defineProperty(propsList, required, {value: paramsData[tag]})
            } else if(!required && !!tag) {
                Object.defineProperty(propsList, tag, {value: paramsData[tag]})
            }
        } else {
            Object.defineProperty(propsList, e, {value: paramsData[e]})
        }
    })
    return propsList
}

/**
 * 动态注入表单组件
 * @param {String} componentUrl 组件相对地址
 * @param {Function} callBack 组件注入成功后的回调函数
 *
 * */
export const dynamicSetComponent = async (componentName, componentUrl, callBack) => {
    const requireComponent = async () => {
        const component = require(`@/${componentUrl}`)
        Vue.component(component.default.name, component.default)
        console.log(component.default.name, component.default)
    }
    await requireComponent()
    callBack && callBack()
}