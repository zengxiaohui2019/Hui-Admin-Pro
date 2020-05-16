import router from './index'
import store from '../store'
import {indexPage, loginPage, siteTitle} from "../config/config";
import Vue from "vue";
import ViewUI from 'view-design';

const whiteList = ['/login', '/forget-password'] // 无需权限路由集合

router.beforeEach(async(to, from, next) => {
  // 开始加载进度条
  ViewUI.LoadingBar.start()

  // 设置页面title
  document.title = to.meta.title+' -'+siteTitle

  // 确定用户是否已登录
  const isLogin = store.getters.isLogin
  if (isLogin) { // 判断是否有token
    if (to.path === '/login') {
      // 如果已登录，重定向到主页
      next({ name: indexPage })
      // 停止加载进度条
      ViewUI.LoadingBar.finish()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // debugger
        let item = {
          fullPath: to.fullPath,
          meta: to.meta,
          name: to.name,
          path: to.path
        }
        // 增加tab多页签数据
        store.dispatch('tagsView/pushRouter', item)
        next()
      } else {
        try {
          // 获取用户信息 这里可以进行一些操作
          const { roles } = await store.dispatch('user/getInfo')

          // 根据角色生成可访问的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 增加异步路由
          router.addRoutes(accessRoutes)

          // hack方法，以确保addRoutes是完整的
          // 设置replace：true，导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token并进入登录页面以重新登录
          // await store.dispatch('user/resetToken')
          ViewUI.Message.error(error || 'Has Error')
          next({name: loginPage})
          // 停止加载进度条
          ViewUI.LoadingBar.finish()
        }
      }
    }
  } else {
    /* 没有 token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 免权限直接进入
      next()
    } else {
      // 其他无权访问的页面将重定向到登录页面
      next({name: loginPage})
      // 停止加载进度条
      ViewUI.LoadingBar.finish()
    }
  }
})

router.afterEach((to, from, next) => {
  // 停止加载进度条
  ViewUI.LoadingBar.finish()
  // 路由切换 滚到到顶部
  window.scrollTo(0, 0);
  if(to.name !== loginPage){
    // 如果不是登录页 内容区域滚动到顶部
    Vue.nextTick(() => {
      if (document.getElementById('main_content')) {
        document.getElementById('main_content').scrollTo(0, 0);
      }
    })
  }
})
