import {indexPage} from '@/config/config'
const state = {
    // 已打开的路由数据
    routerArr: [] // localStorage.getItem('dataRouter') ? JSON.parse(localStorage.getItem('dataRouter')) :
}

const mutations = {
    setRouterArr(state, data) { // 设置路由
        state.routerArr = data
    },
    pushRouterArr(state, data) { // 增加路由
        const flag = state.routerArr.some(r => r.path === data.path)
        if(!flag) {
            // 如果是默认主页 就放到第一个
            if(data.name === indexPage) {
                state.routerArr.unshift(data)
            } else {
                state.routerArr.push(data)
            }
        }
    },
    delRouterArr(state, index) { // 删除路由
        state.routerArr.splice(index, 1)
    }
}

const actions = {
    setRouterArr(context, data) { // 设置路由
        context.commit('setRouterArr', data);
    },
    pushRouter(context, data) { // 增加路由
        context.commit('pushRouterArr', data);
    },
    delRouter(context, index) { // 删除路由
        context.commit('delRouterArr', index);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
