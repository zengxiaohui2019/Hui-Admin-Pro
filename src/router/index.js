import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Main from "@/components/main/main";

/**
 meta: {
    hide: false, 是否在左侧菜单显示 不显示请设为 true
    title: "列表页面", 菜单标题
    icon: "md-grid", 图标
    roleId: 1 菜单权限id 不填写等同于不需要权限校验
    singlePage: true 单页 非嵌套栏目显示
}
 */

// 不需要权限校验的静态路由
export const constantRoutes = [
    {
        path: "/login",
        name: "login",
        meta: {
            hide: true,
            title: "登录"
        },
        component: () => import("@/views/login/login")
    },
    {
        path: "/",
        name: "Dashboard",
        redirect: '/master_workplace',
        component: Main,
        meta: {
            hide: false,
            title: "Dashboard",
            icon: "md-speedometer",
        },
        children: [
            {
                path: "/master_workplace",
                name: "master_workplace",
                meta: {
                    hide: false,
                    title: "主控台"
                },
                component: () => import("@/views/Dashboard/master_workplace")
            },
            {
                path: "/workplace",
                name: "workplace",
                meta: {
                    hide: false,
                    title: "工作台",
                    permission: ['admin']
                },
                component: () => import("@/views/Dashboard/workplace")
            },
        ]
    },
    {
        path: "/brief",
        name: "brief",
        component: Main,
        meta: {
            hide: false,
            title: "简叙",
            icon: "md-heart-outline",
            singlePage: true
        },
        children: [
            {
                path: "/brief/brief",
                name: "brief_brief",
                meta: {
                    hide: false,
                    title: "简叙",
                    icon: 'md-heart-outline'
                },
                component: () => import("@/views/brief/brief")
            }
        ]
    },
]
// 需要权限校验的异步路由
export const asyncRoutes = [
    {
      path: "/permission",
      name: "permission",
      redirect: '/permission-index',
      component: Main,
      meta: {
        hide: false,
        title: "权限测试",
        icon: "ios-switch-outline",
        roleId: 8,
        singlePage: true
      },
      children: [
        {
          path: "/permission-index",
          name: "permission-index",
          meta: {
            hide: false,
            title: "权限测试",
            roleId: 8
          },
          component: () => import("@/views/permission")
        },
      ]
    },
    {
        path: "/form",
        name: "form",
        component: Main,
        meta: {
            hide: false,
            title: "表单页面",
            icon: "md-cube",
            roleId: 1
        },
        children: [
            {
                path: "/form/basic_form",
                name: "basic-form",
                meta: {
                    hide: false,
                    title: "基础表单",
                    roleId: 2
                },
                component: () => import("@/views/form/basic_form")
            },
            {
                path: "/form/advanced_form",
                name: "advanced_form",
                meta: {
                    hide: false,
                    title: "高级表单",
                    roleId: 3
                },
                component: () => import("@/views/form/advanced_form")
            },
        ]
    },
    {
        path: "/list",
        name: "list",
        component: Main,
        meta: {
            hide: false,
            title: "列表页面",
            icon: "md-grid",
            roleId: 4
        },
        children: [
            {
                path: "/list/basic_list",
                name: "basic_list",
                meta: {
                    hide: false,
                    title: "基础列表",
                    roleId: 5
                },
                component: () => import("@/views/list/basic_list")
            },
            {
                path: "/list/user_list",
                name: "user_list",
                meta: {
                    hide: false,
                    title: "用户列表",
                    roleId: 6
                },
                component: () => import("@/views/list/user_list")
            },
            {
                path: "/list/goods_list",
                name: "goods_list",
                meta: {
                    hide: false,
                    title: "商品列表",
                    roleId: 7
                },
                component: () => import("@/views/list/goods_list")
            }
        ]
    },
    {
        path: "/search",
        name: "search",
        component: Main,
        meta: {
            hide: false,
            title: "搜索页面",
            icon: "md-search",
        },
        children: [
            {
                path: "/search/search_article",
                name: "search_article",
                meta: {
                    hide: false,
                    title: "搜索列表（文章）",
                },
                component: () => import("@/views/search/search_article")
            },
            {
                path: "/search/search_projects",
                name: "search_projects",
                meta: {
                    hide: false,
                    title: "搜索列表（项目）",
                },
                component: () => import("@/views/search/search_projects")
            }
        ]
    },
    {
        path: "/detail",
        name: "detail",
        component: Main,
        meta: {
            hide: false,
            title: "详情页面",
            icon: "md-list-box",
            roleId: 11
        },
        children: [
            {
                path: "/detail/basic_detail",
                name: "basic_detail",
                meta: {
                    hide: false,
                    title: "基础详情",
                    roleId: 12
                },
                component: () => import("@/views/detail/basic_detail")
            },
            {
                path: "/detail/advanced_detail",
                name: "advanced_detail",
                meta: {
                    hide: false,
                    title: "高级详情",
                    roleId: 13
                },
                component: () => import("@/views/detail/advanced_detail")
            }
        ]
    },
    {
        path: "/result",
        name: "result",
        component: Main,
        meta: {
            hide: false,
            title: "结果页面",
            icon: "md-checkmark-circle-outline",
            roleId: 14
        },
        children: [
            {
                path: "/result/result_success",
                name: "result_success",
                meta: {
                    hide: false,
                    title: "成功页面",
                    roleId: 15
                },
                component: () => import("@/views/result/result_success")
            },
            {
                path: "/result/result_fail",
                name: "result_fail",
                meta: {
                    hide: false,
                    title: "失败页面",
                    roleId: 16
                },
                component: () => import("@/views/result/result_fail")
            }
        ]
    },
    {
        path: "/setting",
        name: "setting",
        component: Main,
        meta: {
            hide: false,
            title: "设置页面",
            icon: "md-options",
        },
        children: [
            {
                path: "/setting/setting_user",
                name: "setting_user",
                meta: {
                    hide: false,
                    title: "个人中心",
                },
                component: () => import("@/views/setting/setting_user")
            },
            {
                path: "/setting/setting_account",
                name: "setting_account",
                meta: {
                    hide: false,
                    title: "个人设置",
                },
                component: () => import("@/views/setting/setting_account")
            }
        ]
    },
    {
        path: "/editor",
        name: "editor",
        component: Main,
        meta: {
            hide: false,
            title: "编辑器",
            icon: "ios-create-outline",
        },
        children: [
            {
                path: "/editor/wangEditor",
                name: "editor_wangEditor",
                meta: {
                    hide: false,
                    title: "wangEditor",
                    icon: 'ios-create-outline'
                },
                component: () => import("@/views/editor/wangEditor")
            }
        ]
    },
    {
        path: "/city",
        name: "city",
        component: Main,
        meta: {
            hide: false,
            title: "高级组件",
            icon: "ios-paper-plane-outline",
        },
        children: [
            {
                path: "/city/city",
                name: "city_city",
                meta: {
                    hide: false,
                    title: "城市选择",
                    icon: 'ios-create-outline'
                },
                component: () => import("@/views/city/city")
            }
        ]
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
// 解决跳转同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router
