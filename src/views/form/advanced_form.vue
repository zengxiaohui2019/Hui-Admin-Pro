/**
*   @description 基础表单
*   @author Xiaohui Zeng
*   @date 2019/10/12
*/
<template>
    <div class="advanced_form-page flexC">
        <div class="pageHead flexC">
            <p>高级表单</p>
            <p>高级表单用于一次性提交大量信息，本页面用于文章发布等复杂的业务交互。</p>
        </div>
        <div class="pageContent flexC">
            <Form ref="json" :model="json" :rules="checkdate" :label-width="90">
                <FormItem label="标题" prop="title" style="margin: 0">
                    <Input v-model="json.title" placeholder="请输入标题" maxlength="100" show-word-limit></Input>
                </FormItem>
                <FormItem style="margin: 15px 0 24px 0;">
                    <div class="flexR">
                        <div class="flexR">
                            <span style="margin-right: 10px">属性: </span>
                            <CheckboxGroup v-model="json.attributes" size="small">
                                <Checkbox label="粗体"></Checkbox>
                                <Checkbox label="斜体"></Checkbox>
                                <Checkbox label="删除线"></Checkbox>
                            </CheckboxGroup>
                        </div>
                        <div class="flexR" style="margin-left: 20px">
                            <span style="margin-right: 10px">颜色: </span>
                            <ColorPicker v-model="json.titleColor" size="small"/>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="副标题" prop="subtitle">
                    <Input v-model="json.subtitle" placeholder="请输入副标题"></Input>
                </FormItem>

                <FormItem label="特殊属性" prop="specialAttribute" class="zdyFormItem">
                    <div class="flexR">
                        <div class="flexR" style="min-width: 150px">
                            <span style="margin-right: 10px">信息属性: </span>
                            <Checkbox v-model="json.informationAttribute" label="审核">审核</Checkbox>
                        </div>
                        <div class="flexR" style="margin: 0 20px">
                            <span style="margin-right: 10px">推荐: </span>
                            <Select v-model="json.recommend" style="width:200px">
                                <Option v-for="item in recommendData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div class="flexR">
                            <span style="margin-right: 10px">头条: </span>
                            <Select v-model="json.headline" style="width:200px">
                                <Option v-for="item in headlineData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="flexR">
                        <div class="flexR" style="width: 100%;">
                            <span style="margin-right: 10px;min-width: 60px;">关键字: </span>
                            <Input v-model="json.keyword" style="width: calc(100% - 60px)" :placeholder="keywordInfo"></Input>
                        </div>
                    </div>
                    <div class="flexR">
                        <div class="flexR" style="width: 100%;">
                            <span style="margin-right: 10px;min-width: 60px;">外部链接: </span>
                            <Input v-model="json.externalLink" style="width: calc(100% - 60px)" placeholder="(填写后信息连接地址将为此链接)"></Input>
                        </div>
                    </div>
                </FormItem>

                <FormItem label="发布时间" prop="time">
                    <DatePicker v-model="json.time" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择时间"style="width: 35%"></DatePicker>
                </FormItem>
                <FormItem label="内容简介" prop="introduction">
                    <Input v-model="json.introduction" maxlength="300" show-word-limit type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入内容简介..."></Input>
                </FormItem>
                <FormItem label="作者" prop="author">
                    <div class="flexR">
                        <div class="flexR" style="width: 100%;">
                            <Select v-model="json.author" filterable placeholder="搜索/选择作者">
                                <Option v-for="item in authorData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                            <Button style="margin-left: 10px">增加作者</Button>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="信息来源" prop="source">
                    <div class="flexR">
                        <div class="flexR" style="width: 100%;">
                            <Select v-model="json.source" placeholder="选择来源" style="width: 204px">
                                <Option v-for="item in sourceData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                            <Button style="margin-left: 10px">增加来源</Button>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="正文" prop="content" class="editor">
                    <Editor ref="Editor" v-model="json.content"></Editor>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('json')">提交</Button>
                    <Button @click="handleReset('json')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    let moment = require('moment')
    import Editor from "../../components/editor/editor";
    export default {
        name: "advanced_form",
        components:{Editor},
        data() {
            // 时间自定义校验
            const checkTime = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择时间'));
                } else {
                    callback();
                }
            };
            // 作者校验
            const checkAuthor = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择作者'));
                } else {
                    callback();
                }
            };
            // 正文校验
            const checkContent = (rule, value, callback) => {
                if (value === '<p><br></p>' || !value) {
                    callback(new Error('请输入正文内容'));
                } else {
                    callback();
                }
            };
            return {
                json: {
                    title: '', // 标题
                    attributes: [], // 属性
                    titleColor: '#333333', // 标题颜色
                    subtitle: '', // 副标题

                    informationAttribute: true, // 信息属性 默认审核
                    recommend: '0', // 推荐
                    headline: '0', // 头条
                    keyword: '', // 关键字
                    externalLink: '', // 外部链接

                    time: moment().format('YYYY-MM-DD hh:mm:ss'), // 默认当前时间
                    introduction: '', // 简介
                    author: '', // 作者
                    source: '', // 信息来源
                    content: ''
                },
                checkdate: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    time: [
                        { required: true, validator: checkTime}
                    ],
                    author: [
                        { required: true, validator: checkAuthor }
                    ],
                    content: [
                        { required: true, validator: checkContent }
                    ]
                }, // 数据校验
                recommendData: [
                    {
                        value: '0',
                        label: '不推荐'
                    },
                    {
                        value: '1',
                        label: '一级推荐'
                    },
                    {
                        value: '2',
                        label: '二级推荐'
                    },
                    {
                        value: '3',
                        label: '三级推荐'
                    },
                    {
                        value: '4',
                        label: '四级推荐'
                    }
                ], // 推荐数据
                headlineData: [
                    {
                        value: '0',
                        label: '非头条'
                    },
                    {
                        value: '1',
                        label: '一级头条'
                    },
                    {
                        value: '2',
                        label: '二级头条'
                    },
                    {
                        value: '3',
                        label: '三级头条'
                    },
                    {
                        value: '4',
                        label: '四级头条'
                    }
                ], // 头条数据
                keywordInfo: '(关键词，多个请用","隔开)',
                authorData: [
                    {
                        id: 1,
                        name: '曾小晖'
                    },
                    {
                        id: 2,
                        name: '晖小晖'
                    },
                    {
                        id: 3,
                        name: '曾小曾'
                    }
                ], // 作者数据
                sourceData: [
                    {
                        id: 1,
                        name: '原创'
                    },
                    {
                        id: 2,
                        name: '转载'
                    }
                ], // 信息来源数据
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            // 校验
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('校验通过!');
                    } else {
                        this.$Message.error('请完善必填项!');
                    }
                })
            },
            // 重置
            handleReset (name) {
                this.$refs[name].resetFields();
                this.json.recommend = '0' // 推荐
                this.json.headline = '0' // 头条
                this.json.keyword = '' // 关键字
                this.json.time = '' // 发布时间
                this.json.externalLink = '' // 外部链接
                this.$refs.Editor.onClear() // 清空编辑器
            }
        },
        watch: {},
        filters: {}
    }
</script>

<style lang="less">
    @import "css/advanced_form";
</style>