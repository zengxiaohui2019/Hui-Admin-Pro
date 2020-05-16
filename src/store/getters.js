const getters = {
  token: state => state.user.token,
  // 是否登录
  isLogin: state => state.user.isLogin,
  // 权限id集合
  roles: state => state.user.roles,
  // 已打开的路由数据
  routerArr: state => state.tagsView.routerArr,
  // 用户信息
  userData:  state => state.user.userData,
  // 所有有权限的路由
  routes: state => state.permission.routes,
  // 异步路由
  addRoutes: state => state.permission.addRoutes,
}
export default getters
