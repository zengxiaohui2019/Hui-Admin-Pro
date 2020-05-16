import { login } from '@/api/user'
const state = {
    // 用户信息数据
    userData: sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : {},
    // 是否登陆
    isLogin: sessionStorage.getItem('userData') ? true : false,
    // 角色权限集合
    roles: []
}

const mutations = {
    // 设置角色
    setRoles: (state, roles) => {
        state.roles = roles
    },
    // 设置用户数据
    setUserData(state, data) {
        state.userData = data
    },
    // 修改登陆状态
    setIsLogin(state, data) {
        state.isLogin = data
    }
}

const actions = {
    // 登录
    login({ commit }, userInfo) {
        const { userName, passWord } = userInfo
        return new Promise((resolve, reject) => {
            login({ userName: userName.trim(), passWord: passWord }).then(response => {
                const { data } = response
                sessionStorage.setItem('userData', JSON.stringify(data.userInfo))
                sessionStorage.setItem('userToken', JSON.stringify(data.token))
                commit('setUserData', data.userInfo)
                // 设置登录状态为false
                commit('setIsLogin', true)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            if (!sessionStorage.getItem('userData')) {
                reject('验证失败，请重新登录')
            }
            const userInfo = JSON.parse(sessionStorage.getItem('userData'))
            if(!userInfo.roles) {
                console.error('权限不能为空数组，否则路由死循环')
                return
            }
            // userInfo.roles = ['admin']
            commit('setRoles', userInfo.roles)
            resolve(userInfo)
        })
    },

    // 退出登录
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            // commit('setToken', '')
            // 清除用户数据
            commit('setUserData', '')
            // 清楚用户权限集合
            commit('setRoles', [])
            // 设置登录状态为false
            commit('setIsLogin', false)
            // 清除缓存的用户数据
            sessionStorage.removeItem('userData')
            sessionStorage.removeItem('userToken')
            // 清除缓存的多页签数据
            dispatch('tagsView/setRouterArr', [], { root: true })
            localStorage.removeItem('dataRouter')
            resolve()
        })
    },

    // 设置用户数据
    setUserData(context, data) {
        context.commit('setUserData', data);
    },
    // 修改登陆状态
    setIsLogin(context, data) {
        context.commit('setIsLogin', data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
