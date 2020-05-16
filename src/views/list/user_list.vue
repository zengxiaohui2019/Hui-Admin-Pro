/**
*   @description 用户列表
*   @author Xiaohui Zeng
*   @date 2019/11/01
*/
<template>
    <div class="user_list-page flexC">
        <div class="pageHead flexC">
            <p>用户列表</p>
            <p>展示用户信息的列表，带有常规操作。一般用于用户管理</p>
        </div>
        <div class="pageContent flexC">
        </div>
    </div>
</template>

<script>
    export default {
        name: "user_list",
        data() {
            return {
                enterTitle: ''
            }
        },
        created() {
        },
        mounted() {
        },
        computed: {
        },
        methods: {
        },
        watch: {},
        filters: {}
    }
</script>

<style lang="less">
    .user_list-page {
        .pageContent{
            &>ul{
                &>li{
                    border-bottom: 1px solid #e8eaec;
                    padding: 12px 0;
                    &>div:first-child{
                        margin-bottom: 16px;
                        &>span:first-child{
                            margin-right: 16px;
                        }
                        &>span:last-child{
                            color: rgba(0,0,0,.85);
                            font-size: 16px;
                        }
                    }
                    &>div:nth-child(3){
                        margin-top: 8px;
                        &>span:nth-child(1){
                            margin: 2px 4px 2px 0;
                            padding: 0 8px;
                            border: 1px solid #e8eaec;
                            border-radius: 3px
                        }
                        /*已验证邮箱*/
                        .isCheck{
                            background: #f6ffed;
                            border-color: #b7eb8f!important;
                            color: #52c41a!important;
                        }
                        .noCheck{
                            background: #fff1f0;
                            border-color: #ffa39e!important;
                            color: #f5222d!important;
                        }
                        &>p{
                            span{
                                margin: 2px 4px 2px 0;
                                padding: 0 8px;
                                border: 1px solid #e8eaec;
                                border-radius: 3px
                            }
                            .ordinary{
                                background: #e6f7ff;
                                border-color: #91d5ff!important;
                                color: #1890ff!important;
                            }
                            .admin{
                                background: #f9f0ff;
                                border-color: #d3adf7!important;
                                color: #722ed1!important;
                            }
                            .super{
                                background: #fff2e8;
                                border-color: #ffbb96!important;
                                color: #fa541c!important;
                            }
                            .test{
                                background: #ffdff5;
                                border-color: #fcc3f5!important;
                                color: #c449b8 !important;
                            }
                        }
                        button{
                            margin-left: 16px;
                        }
                    }
                    &>div:nth-child(4){
                        margin-top: 8px;
                        button{
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
</style>
