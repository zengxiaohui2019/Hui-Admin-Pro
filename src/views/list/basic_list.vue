/**
*   @description 基础列表
*   @author Xiaohui Zeng
*   @date 2019/10/17
*/
<template>
    <div class="basic_list-page flexC">
        <div class="pageHead flexC">
            <p>基础列表</p>
            <p>常见的标准列表，包含增删改查等基础操作。</p>
        </div>
        <div class="pageContent item1 flexR">
            <div class="flexC">
                <span>进行中的任务</span>
                <span>10 个任务</span>
            </div>
            <div class="flexC">
                <span>剩余任务</span>
                <span>3 个任务</span>
            </div>
            <div class="flexC">
                <span>任务总耗时</span>
                <span>120 个小时</span>
            </div>
        </div>
        <div class="pageContent item2 flexC">
            <div class="pageContent_head flexR">
                <div class="flexR">基础列表</div>
                <div class="flexR">
                    <RadioGroup type="button" v-model="radioCheck">
                        <Radio label="全部"></Radio>
                        <Radio label="进行中"></Radio>
                        <Radio label="已完成"></Radio>
                    </RadioGroup>
                    <Input search placeholder="Enter something..." />
                </div>
            </div>
            <!--列表-->
            <div class="list flexC">
                <ul class="flexC">
                    <li class="flexR">
                        <Button type="dashed" icon="md-add" long @click="openModel(0)">添加</Button>
                    </li>
                    <li class="flexR" v-for="(item,index) in dataList" :key="item.name+index">
                        <div class="left flexR">
                            <Avatar :src="item.img" size="large"/>
                            <div class="flexC">
                                <span>{{item.name}}</span>
                                <span>{{item.desc}}</span>
                            </div>
                        </div>
                        <div class="right flexR">
                            <div class="flexC">
                                <span>负责人</span>
                                <span>{{item.user}}</span>
                            </div>
                            <div class="flexC">
                                <span>开始时间</span>
                                <span>{{item.time}}</span>
                            </div>
                            <div class="flexC">
                                <Progress :percent="item.progress" status="active" style="min-width: 150px;" :stroke-width="6"/>
                            </div>
                            <div class="flexR btns">
                                <span class="blueText" @click="openModel(1,item)">编辑</span>
                                <span class="blueText">详情</span>
                            </div>
                            <div class="flexC">
                                <Dropdown placement="bottom-end" @on-click="option">
                                    <a href="javascript:void(0)">
                                        更多
                                        <Icon type="ios-arrow-down"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem :name="'sh@'+index" disabled>审核</DropdownItem>
                                        <DropdownItem :name="'del@'+index">删除</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="pageDiv flexR">
                <Page :total="50" show-elevator />
            </div>
        </div>
        <Modal
            :title="modelTitle"
            v-model="addModel"
            class-name="vertical-center-modal basic_list_model">
            <div class="model_body flexC">
                <Form ref="json" :model="json" :rules="checkJson" :label-width="80">
                    <FormItem label="任务名称" prop="name">
                        <Input v-model="json.name" placeholder="请输入任务名称"></Input>
                    </FormItem>
                    <FormItem label="负责人" prop="user">
                        <Select v-model="json.user" placeholder="请选择负责人">
                            <Option :value="item" v-for="(item,index) in userData" :key="item+index">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="开始时间" prop="time">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" style="width: 100%" placeholder="请选择开始时间" v-model="json.time"></DatePicker>
                    </FormItem>
                    <FormItem label="工作进度" prop="progress">
                        <InputNumber :max="100" :min="0" v-model="json.progress" style="width: 100%"></InputNumber>
                    </FormItem>
                    <FormItem label="项目描述" prop="desc">
                        <Input v-model="json.desc" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入项目描述，不可少于5个字。"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="text" @click="addModel=false">取消</Button>
                <Button type="primary" @click="saveData('json')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    let moment = require('moment')
    export default {
        name: "basic_list",
        data() {
            // 时间自定义校验
            const checkTime = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择开始时间'));
                } else {
                    callback();
                }
            };
            return {
                addModel: false,
                modelTitle: '任务新增',
                radioCheck: '全部',
                json: {
                    name: '',
                    desc: '',
                    user: '',
                    time: '',
                    progress: 0,
                    img: 'https://www.zengxiaohui.com/vueImg/avatar1.jpg'
                },
                checkJson: {
                    name: [
                        { required: true, message: '请选择负责人', trigger: 'blur' }
                    ],
                    user: [
                        { required: true, message: '请选择负责人', trigger: 'change' }
                    ],
                    time: [
                        { required: true, validator: checkTime }
                    ],
                    desc: [
                        { required: true, message: '请输入项目描述', trigger: 'blur' },
                        { type: 'string', min: 5, message: '描述不可少于5个字', trigger: 'blur' }
                    ]
                },
                dataList: [
                    {
                        id: 1,
                        name: 'Hui Admin Pro',
                        desc: '基于 iView 的企业级中后台系统 专业版',
                        user: '曾小晖',
                        time: '2019-10-04 09:00',
                        progress: 65,
                        img: 'https://www.zengxiaohui.com/vueImg/avatar.jpg'
                    },
                    {
                        id: 2,
                        name: 'Hui Admin Template',
                        desc: '基于 iView 的企业级中后台系统 基础框架版',
                        user: '曾小晖',
                        time: '2019-10-01 09:00',
                        progress: 80,
                        img: 'https://www.zengxiaohui.com/vueImg/avatar1.jpg'
                    },
                    {
                        id: 3,
                        name: 'ZengXiaoHui Blog',
                        desc: '大屏响应式 原创个人博客',
                        user: '曾小晖',
                        time: '2019-08-08 09:00',
                        progress: 100,
                        img: 'https://www.zengxiaohui.com/vueImg/avatar2.jpg'
                    },
                    {
                        id: 4,
                        name: 'ZengXiaoHui Blog',
                        desc: '微信小程序 曾小晖个人博客',
                        user: '曾小晖',
                        time: '2019-09-15 09:00',
                        progress: 90,
                        img: 'https://www.zengxiaohui.com/vueImg/avatar3.jpg'
                    }
                ],
                userData: ['曾小晖','晖小晖','小曾晖','小晖曾','晖小曾',]
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            // 打开model
            openModel(type,item){
                delete this.json.id
                this.$refs['json'].resetFields() // 清空表单
                if(type === 0){
                    this.modelTitle = '任务新增'
                } else {
                    this.modelTitle = '任务编辑'
                    this.json = JSON.parse(JSON.stringify(item)) // 为什么使用这个JSON.parse(JSON.stringify(item))？ 因为vue会响应数据改变 触发不希望看到的效果
                }
                this.addModel = true
            },
            saveData(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('保存成功')
                        this.json.time = moment(this.json.time).format('YYYY-MM-DD hh:mm') // 处理时间格式
                        if(this.json.id) {
                            for (let i = 0; i < this.dataList.length; i++) {
                                if(this.dataList[i].id === this.json.id) {
                                    this.dataList[i] = JSON.parse(JSON.stringify(this.json))
                                }
                            }
                        } else {
                            this.json.id = this.dataList.length + 1
                            this.dataList.push(JSON.parse(JSON.stringify(this.json)))
                        }
                        this.addModel = false
                    } else {
                        this.$Message.warning('请完善必填项');
                    }
                })
            },
            // 下拉框操作
            option(data){
                let type = data.split('@')[0]
                let index = data.split('@')[1]
                if(type === 'del'){
                    // 删除
                    this.Del(index)
                } else {
                    // 审核
                }
            },
            // 删除
            Del(index){
                this.dataList.splice(index,1)
            }
        },
        watch: {},
        filters: {}
    }
</script>

<style lang="less">
    .basic_list-page {
        &>.item1{
            justify-content: space-around;
            &>div{
                margin: 16px 0;
                text-align: center;
                span:last-child{
                    font-size: 24px;
                }
            }
        }
        &>.item2{
            padding: 0;
            .ivu-radio-group{
                display: inline-flex;
                flex-direction: row;
                margin-right: 16px;
            }
            &>.list{
                padding: 16px;
                &>ul{
                    &>li{
                        justify-content: space-between;
                        padding: 12px 0;
                        border-bottom: 1px solid #e8eaec;
                        &:first-child{
                            border: none;
                        }
                        .left{
                            flex: 1;
                            .ivu-avatar{
                                border-radius: 4px;
                                margin-right: 16px;
                            }
                            &>div{
                                span:first-child{
                                    font-weight: 500;
                                    margin-bottom: 4px;
                                    color: #515a6e;
                                }
                            }
                        }
                        .right{
                            flex: 0 0 auto;
                            &>div{
                                margin-left: 32px;
                                color: #808695;
                                span:first-child{
                                    font-weight: 500;
                                    margin-bottom: 4px;
                                }
                            }
                            .btns{
                                margin-left: 48px;
                                &>span{
                                    margin-right: 16px;
                                    margin-bottom: 0px!important;
                                    &:last-child{
                                        margin-right: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /*model*/
    .basic_list_model{
        .model_body{
            width: 100%;
            textarea {
                resize: vertical;
            }
        }
    }
</style>