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
            <ul class="flexC">
                <li class="flexC" v-for="(item,index) in userList" :key="item.name+index">
                    <div class="flexR">
                        <Avatar :src="item.img"/>
                        <span>{{item.name}}</span>
                    </div>
                    <div class="flexC">
                        <span>ID：{{item.id}}</span>
                        <span>邮箱地址：{{item.email}}</span>
                    </div>
                    <div class="flexR">
                        <span :class="item.isCheck?'isCheck':'noCheck'" >已验证邮箱</span>
                        <p class="flexR">
                            <span v-for="(it,i) in item.roles" :key="it+i" :class="[{'ordinary':it==='ordinary'}, {'admin':it==='admin'}, {'super':it==='super'}, {'test':it==='test'}]" >
                                {{it}}
                            </span>
                        </p>
                        <Button icon="md-list" size="small" @click="openEdit(item)">展开操作</Button>
                    </div>
                    <div class="flexR" v-if="item.isEdit">
                        <Poptip v-for="(item1,index1) in roles" :key="item1+index1"
                                @on-popper-show="enterRole(item,item1)"
                                transfer
                                confirm
                                :title="enterTitle"
                                @on-ok="roleEdit(item,item1)"
                                @on-cancel="">
                            <Button type="primary" size="small" >{{item1}}</Button>
                        </Poptip>
                    </div>
                </li>
            </ul>
            <div class="pageDiv flexR">
                <Page :total="50" show-elevator />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user_list",
        data() {
            return {
                roles: ['ordinary','admin','super','test'], // 所有角色数据 普通人员 管理员 超级管理员 测试人员
                userList: [
                    {
                        id: 1,
                        name: '曾小晖',
                        email: '1257538859@qq.com',
                        img: 'https://www.zengxiaohui.com/vueImg/avatar.jpg',
                        roles: ["test","admin"],
                        isCheck: true,
                        isEdit: false
                    },
                    {
                        id: 2,
                        name: '晖小曾',
                        email: '1257538859@qq.com',
                        img: 'https://www.zengxiaohui.com/vueImg/avatar1.jpg',
                        roles: ["ordinary"],
                        isCheck: false,
                        isEdit: false
                    },
                    {
                        id: 3,
                        name: '小曾晖',
                        email: '1257538859@qq.com',
                        img: 'https://www.zengxiaohui.com/vueImg/avatar2.jpg',
                        roles: ["admin"],
                        isCheck: true,
                        isEdit: false
                    },
                    {
                        id: 4,
                        name: '晖小晖',
                        email: '1257538859@qq.com',
                        img: 'https://www.zengxiaohui.com/vueImg/avatar3.jpg',
                        roles: ["super"],
                        isCheck: false,
                        isEdit: false
                    }
                ],
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
            // 打开角色选择
            openEdit(item){
                if(item.isEdit) {
                    item.isEdit = false
                } else {
                    item.isEdit = true
                }
            },
            // 打开确认提示框
            enterRole(item,it){
                let flag = false
                if(item.roles.length > 0) {
                    for(let [index, v] of item.roles.entries()) {
                        if(v === it){
                            flag = false
                            break
                        } else {
                            flag = true
                        }
                    }
                } else {
                    flag = true
                }
                if(flag){
                    this.enterTitle = '确定新增角色 '+it+' 吗？'
                } else {
                    this.enterTitle = '确定取消角色 '+it+' 吗？'
                }
            },
            // 处理操作
            roleEdit(item,it){
                let flag = false
                if(item.roles.length > 0) {
                    for(let [index, v] of item.roles.entries()) {
                        if(v === it){
                            item.roles.splice(index,1)
                            flag = false
                            break
                        } else {
                            flag = true
                        }
                    }
                } else {
                    flag = true
                }
                if(flag){
                    item.roles.push(it)
                }
            }
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