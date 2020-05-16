/**
*   @description 权限测试
*   @author Xiaohui Zeng
*   @date 2020-05-16
*/
<template>
    <div class="permission-page flexC">
        <div class="pageHead flexC">
            <p>权限测试</p>
            <p>按钮级别的精准权限分配</p>
        </div>
        <div class="pageContent flexC" v-if="$checkPermission([9,10])">
            <p style="margin-top: 20px">
                <span>测试权限需要登录不同账户</span>
                <span>test账户 账号：test 密码：123456</span>
                <span>admin账户 账号：admin 密码：123456</span>
            </p>
            <p>
                <span>说明：根据登录接口返回</span>
                <span style="margin: 0 20px">admin 拥有1-10的权限[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>
                <span>test 拥有6-10的权限[6, 7, 8, 9, 10]</span>
            </p>
            <p style="margin-top: 20px">
                使用方法：
                <code>
                    v-if="$checkPermission([6,9])"
                </code>
                存在两个以上权限id 必须同时满足才会通过
            </p>

            <Divider>admin 有 "全部"权限；test 只有权限 "新增"权限</Divider>
            <div class="flexR" style="justify-content: center">
                <Button :disabled="!$checkPermission([6,9])" type="primary" style="margin-right: 20px">新增</Button>
                <Button type="error" :disabled="!$checkPermission([5])">删除</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "permission",
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        watch: {},
        filters: {}
    }
</script>

<style lang="less">
    .permission-page {

    }
</style>
