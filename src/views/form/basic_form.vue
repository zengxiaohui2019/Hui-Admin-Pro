/**
*   @description 基础表单
*   @author Xiaohui Zeng
*   @date 2019/10/12
*/
<template>
    <div class="basic-form-page flexC">
        <div class="pageHead flexC">
            <p>基础表单</p>
            <p>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</p>
        </div>
        <div class="pageContent flexC">
            <Form ref="json" :model="json" :rules="checkdate" :label-width="130" style="width: 700px">
                <FormItem label="项目名称" prop="name">
                    <Input v-model="json.name" placeholder="请输入项目名称" maxlength="50" show-word-limit></Input>
                </FormItem>
                <FormItem label="项目简介" prop="content">
                    <Input v-model="json.content" placeholder="请输入项目简介"></Input>
                </FormItem>
                <FormItem label="起止时间" prop="time">
                    <DatePicker v-model="json.time" format="yyyy-MM-dd hh:mm" type="datetimerange" placement="bottom-start" placeholder="请选择起止时间"
                    style="width: 100%"
                    ></DatePicker>
                </FormItem>
                <FormItem label="办公地点" prop="location">
                    <Select v-model="json.location" placeholder="请选择办公地点">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="参入人员（选填）" prop="user">
                    <Select v-model="json.user" filterable multiple placeholder="选择或搜索参入人员">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
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
    export default {
        name: "basic-form",
        data() {
            // 时间自定义校验
            const checkTime = (rule, value, callback) => {
                if (value[0] === '') {
                    callback(new Error('请选择起止时间'));
                } else {
                    callback();
                }
            };
            return {
                json: {
                    name: '',
                    content: '',
                    time: [moment().format('YYYY-MM-DD hh:mm'), moment().add(2, "hour").format('YYYY-MM-DD hh:mm')], // 默认当前时间到2小时后
                    location: '',
                    user: [],
                    desc: '',
                    video: '否'
                },
                checkdate: {
                    name: [
                        { required: true, message: '请输入会议名称', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入会议内容简要', trigger: 'blur' }
                    ],
                    location: [
                        { required: true, message: '请选择会议地点', trigger: 'change' }
                    ],
                    time: [
                        { required: true, validator: checkTime}
                    ],
                }
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
            }
        },
        watch: {},
        filters: {}
    }
</script>

<style lang="less">
    @import "css/basic-form";
</style>
