import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 使用meta.roleId确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roleId) {
    return roles.includes(route.meta.roleId)
  } else {
    // 如果存在子路由 子路由有一个有权限就返回true 否则false
    if (route.children) {
      const tmp = route.children
      let flag = false
      for (const v of tmp) {
        flag = hasPermission(roles, v)
        if (flag) {
          break
        }
      }
      return flag
    } else {
      return true
    }
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  // 所有有权限的路由
  routes: [],
  // 异步路由
  addRoutes: []
}
// 处理路由数据 添加父级name
const routersArr = (routers)=>{
  for(let v of routers) {
    if (v.children) {
      setFuName(v.children, v)
    }
    function setFuName(chid, v) {
      // 开始处理子级
      for (let k of chid) {
        k.meta.fuName = v.name
        k.meta.fuTitle = v.meta.title
      }
    }
  }
  return routers
}

const mutations = {
  setRoutes: (state, routes) => {
    state.addRoutes = routes
    state.routes = routersArr(constantRoutes.concat(routes))
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('setRoutes', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
