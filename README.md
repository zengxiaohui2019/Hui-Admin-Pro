# Hui-Admin Pro
## 专业全功能版

1. 简述：

        Hui-Admin Pro专业版 是基于基础版 增加更多复杂功能
    
2. 主要技术：

        iview4.0 + vuecli3.0
        vue-router路由跳转 (层级嵌套适配、跳转前的拦截、跳转后页面自动滚到顶部)
        vuex管理 (导航高亮、多分页标签切换、浏览器刷新路由状态控制等)
        less flex弹性布局

## 启动 

        npm install 安装依赖包 使用淘宝镜像 npm install --registry=https://registry.npm.taobao.org
        npm run dev 开发模式运行
        npm run build 打包

### 已安装插件
1. axios 0.19.0 // 接口请求控件
2. view-design 4.0.0
3. mockjs 1.0.1-beta3 // 数据模拟控件 不用可删除
4. moment 2.24.0 // 时间处理控件 不用可删除
5. vue-router 3.0.3
6. vuex 3.0.1
7. less 3.0.4
8. babel-polyfill 6.26.0 // ie兼容必须
9. echarts 4.3.0
10. wangeditor 3.1.1

### 目录说明

        huivue-admin
            node_modules            npm install 后安装的依赖包
            other                   md文档需要的图片
            public                  公共目录
            src                     核心业务目录
                assets                  图片
                    main                    主框架用到的图片
                components              组件
                    main                    主框架
                    message                 消息通知
                config                  基础配置
                    config.js               基础配置文件
                    util.js                 常用业务文件(判断是否为空 等)
                css                     css
                    public.less             全局公共css
                router                  路由配置
                    index.js                路由数据文件
                    router.js               路由操作处理文件
                views                   页面
                    tmp.vue                 模板页面 (已包含常用的vue生命周期 可删除)
            App.vue                 主入口vue
            main.js                 主入口js
            store.js                vuex文件
            babel.config.js         babel配置文件
            package.json            npm包管理文件
            README.md               说明文档
            vue.config.js           开发打包配置文件

### 配置说明

1. 基本配置 config->config.js 里面有详细的说明
        
        // 默认首页
        export const indexPage = 'workplace'
        
        // 主题风格
         export const themeData = {
             themeType: 'dark', // 主题风格配置 dark(经典酷黑) 或者 light(极简雅白) 默认dark经典酷黑
             isTabsShow: true, // 是否显示多页签 默认true
             headMaxWidth: false // 栏目头部是否通顶（最大宽度） 默认false
        }
    
2. 用户数据 在store.js里面配置 (实际项目可根据接口设置)
        
        state: {
            // 已打开的路由数据
            routerArr: localStorage.getItem('dataRouter') ? JSON.parse(localStorage.getItem('dataRouter')) : [],
            // 用户信息数据
            userData: {
                roles: ['admin'],
                userName: '曾小晖'
            }
        }
    
3. 路由鉴权 (已测就算错误访问地址程序报错崩溃 非法的路由也可以重定向到默认首页)

            // 一级栏目
            {
                path: "/form",
                name: "form",
                component: Main,
                meta: {
                    hide: false, // 是否显示
                    title: "Dashboard", // 显示文字
                    icon: "md-speedometer", // 显示图标
                    permission: ['admin1','admin'] // 权限 数组
                },
                // 二级栏目
                children: [
                    {
                        path: "/form/basic_form",
                        name: "basic-form",
                        meta: {
                            hide: false, // 是否显示
                            title: "基础表单", // 显示文字
                            permission: ['admin1'] // 权限 数组
                        },
                        component: () => import("@/views/form/basic_form")
                    }
                ]
            }
4. 路由权限测试账户 密码都是123456
    > admin 拥有admin角色
    
    > admin1 拥有admin1角色
    
    > admin2 拥有admin admin1双重角色

### 遇到的问题汇总
1. ie 对象不支持“findIndex”属性或方法

        npm install babel-polyfill --save
        在main.js 
        import 'babel-polyfill'
    
2. 存储路由数据到vuex 路由跳转时把vuex数据存到本地 一直报错

        Cannot assign to read only property 'matched' of object '#<Object>'
        无法分配为对象“＃<Object>”的只读属性“ matched”
        解决办法： 重新定义数据格式保存
        
        也有个潜在的问题：在路由跳转之前拦截 直接用JSON.stringify(to) 报错看不出问题原因
    
### 效果
https://www.zengxiaohui.com/Hui-Admin-Pro
![时尚酷黑主题](https://gitee.com/zengxiaohui2019/Hui-Admin-Pro/raw/master/other/admin1.jpg)

![时尚酷黑主题](https://gitee.com/zengxiaohui2019/Hui-Admin-Pro/raw/master/other/admin1-1.jpg)

![时尚酷黑主题](https://gitee.com/zengxiaohui2019/Hui-Admin-Pro/raw/master/other/admin1-2.jpg)

![极简雅白主题](https://gitee.com/zengxiaohui2019/Hui-Admin-Pro/raw/master/other/admin2.jpg)

![极简雅白主题](https://gitee.com/zengxiaohui2019/Hui-Admin-Pro/raw/master/other/admin2-1.jpg)

### 支持作者

1. 本软件Hui-Admin-Pro，是一个完全免费开源的产品，您可以任意使用，包括修订、发布，但请遵守开源底线：禁止以进行任何形式出售。
2. 如果你觉得它给你的项目带来了帮助，提高了开发效率，您可以通过以下的方式来表示你的谢意！
3. 网站程序开发、管理系统、小程序开发请找我，WeiXin：badiweier  昵称：[曾小晖]

4. 使用 支付宝 或 微信 请我喝杯咖啡

![收款码](https://gitee.com/zengxiaohui2019/Hui-Admin-Pro/raw/master/other/skm.jpg)
     
### 免责申明

1. 本软件代码全为曾小晖本人手写，不存在侵犯任何第三方著作权。
2. 禁止使用本软件从事违法犯罪的事情，在使用时产生的任何法律刑事责任于本软件无关 (想不出来能做什么违法的事情，但还是要申明一下)。
3. 由于个人才识技术浅薄，在使用本软件造成的一切损失于本软件无关 (应该不存在，只是一个前端页面而已)。
4. 有问题可联系本人 (大前提：请先百度尝试解决后最终没有找到解决办法)，可付费或免费获得支持。
