/**
*   @description 定义本地模拟接口，最好与正式接口一致，避免联调阶段修改工作量
*   @author Xiaohui Zeng
*   @date 2019/10/5
*/
import Mock from 'mockjs'
// 引入接口模板
import {login} from './mock'

Mock.setup({
    timeout: '200 - 400', // 设置延迟响应，模拟向后端请求数据
})

// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock(/\/api\/healthPlat\/getRecipe\/\w*\/\w*/, 'post', )
Mock.mock('/api/login', 'post', login)

export default Mock;