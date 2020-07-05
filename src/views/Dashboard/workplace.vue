/**
*   @description 工作台
*   @author Xiaohui Zeng
*   @date 2019/10/7
*/
<template>
    <div class="workplace-page flexC">
        <div class="head flexC">
            <div class="flexR">
                <div class="left flexR">
                    <div>
                        <Avatar :src="avatarImg" />
                    </div>
                    <div class="flexC">
                        <span>早安，{{$store.getters.userData.userName}}，新的一天新的开始！</span>
                        <span> <Icon type="md-rainy" />今日阴转小雨，22℃ - 32℃，出门记得带伞哦。</span>
                    </div>
                </div>
                <div class="right flexC">
                </div>
            </div>
        </div>

        <div class="content flexR">
            <div class="left flexC">
                <!--项目-->
                <div class="item flexC">
                    <div class="title flexR">
                        <div class="left flexR">
                            <Avatar icon="md-apps" style="color: rgb(24, 144, 255); background-color: rgb(230, 247, 255);" size="small"/>
                            <span>最近使用的产品</span>
                        </div>
                        <div class="right flexR">
                            <span class="blueText">全部产品</span>
                        </div>
                    </div>
                    <div class="body flexR">
                        <div class="flexC" v-for="(item,index) in myProjectData" :key="item.name_en+index">
                            <div class="bg flexC" :style="{ backgroundImage:  'url('+item.img+')'}">
                                <div class="flexC">
                                    <span>{{item.name_en}}</span>
                                    <span>{{item.name_cn}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--动态-->
                <div class="item dynamic flexC">
                    <div class="title flexR">
                        <div class="left flexR">
                            <Avatar icon="md-bulb" style="color: rgb(114, 46, 209); background-color: rgb(249, 240, 255);" size="small"/>
                            <span>资源预警</span>
                        </div>
                    </div>
                    <div class="body flexR">
                        <div class="flexR">
                            <div>
                                <Avatar src="https://githup.zengxiaohui.com/vueImg/avatar1.jpg" size="large"/>
                            </div>
                            <div class="flexC">
                                <span>
                                    <strong>ECS</strong>
                                    <span> 实例负载过高 </span>
                                    <span class="blueText">查看</span>
                                </span>
                                <span>10-01 11:35</span>
                            </div>
                        </div>
                        <div class="flexR">
                            <div>
                                <Avatar src="https://githup.zengxiaohui.com/vueImg/avatar2.jpg" size="large"/>
                            </div>
                            <div class="flexC">
                                <span>
                                    <strong>Cpu</strong>
                                    <span> 超负荷响应 </span>
                                    <span class="blueText">HUi Admin Pro 管理系统</span>
                                </span>
                                <span>10-07 11:35</span>
                            </div>
                        </div>
                        <div class="flexR">
                            <div>
                                <Avatar src="https://githup.zengxiaohui.com/vueImg/avatar.jpg" size="large"/>
                            </div>
                            <div class="flexC">
                                <span>
                                    <strong>磁盘不足</strong>
                                    <span> 当前服务器预警 </span>
                                    <span class="blueText">检查</span>
                                </span>
                                <span>10-01 11:35</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right flexC">
                <div class="item flexC">
                    <div class="title flexR">
                        <div class="left flexR">
                            <Avatar icon="md-heart" style="color: rgb(255, 77, 79); background-color: rgb(255, 241, 240);" size="small"/>
                            <span>快捷操作</span>
                        </div>
                        <div class="right flexR">
                            <Tooltip content="配置" placement="top">
                                <Icon class="pointer" type="md-settings"/>
                            </Tooltip>
                        </div>
                    </div>
                    <div class="body flexR">
                        <div class="pointer flexC">
                            <Icon type="md-speedometer" style="font-size: 24px; color: rgb(82, 196, 26);"/>
                            <span>主控台</span>
                        </div>
                        <div class="pointer flexC">
                            <Icon type="ios-list-box-outline" style="font-size: 24px; color: rgb(24, 144, 255);"/>
                            <span>表单</span>
                        </div>
                        <div class="pointer flexC">
                            <Icon type="ios-paper-outline" style="font-size: 24px; color: rgb(250, 173, 20);"/>
                            <span>列表</span>
                        </div>
                        <div class="pointer flexC">
                            <Icon type="ios-search" style="font-size: 24px; color: rgb(114, 46, 209);"/>
                            <span>搜索</span>
                        </div>
                        <div class="pointer flexC">
                            <Icon type="md-settings" style="font-size: 24px; color: rgb(19, 194, 194);"/>
                            <span>设置</span>
                        </div>
                        <div class="pointer flexC">
                            <Icon type="ios-briefcase-outline" style="font-size: 24px; color: rgb(235, 47, 150);"/>
                            <span>工具</span>
                        </div>
                    </div>

                    <Divider style="width: 90%; min-width: 90%;margin: 16px auto;"/>

                    <div class="options flexR">
                        <span>操作一</span>
                        <span>操作一</span>
                        <span>
                            <Button icon="md-add" size="small" class="optionsBtn">添加</Button>
                        </span>
                    </div>
                </div>
                <!--小组成员-->
                <div class="item Group_member flexC">
                    <div class="title flexR">
                        <div class="left flexR">
                            <Avatar icon="ios-people" style="color: rgb(82, 196, 26); background-color: rgb(246, 255, 237);" size="small"/>
                            <span>小组成员</span>
                        </div>
                        <!--<div class="right flexR">
                            <span class="blueText">更多动态</span>
                        </div>-->
                    </div>
                    <div class="body flexC">
                        <div class="flexR">
                            <div class="flexR">
                                <div>
                                    <Avatar src="https://githup.zengxiaohui.com/vueImg/avatar1.jpg"/>
                                </div>
                                <div class="flexC">
                                    <span>
                                        <strong>曾小晖</strong>
                                    </span>
                                    <span>zeng xiaohui</span>
                                </div>
                            </div>
                            <div>
                                <span class="status">在线</span>
                            </div>
                        </div>
                        <div class="flexR">
                            <div class="flexR">
                                <div>
                                    <Avatar src="https://githup.zengxiaohui.com/vueImg/avatar2.jpg"/>
                                </div>
                                <div class="flexC">
                                    <span>
                                        <strong>石乐志</strong>
                                    </span>
                                    <span>zhong xiaoyu</span>
                                </div>
                            </div>
                            <div>
                                <span class="status red">迟到</span>
                            </div>
                        </div>
                        <div class="flexR">
                            <div class="flexR">
                                <div>
                                    <Avatar src="https://githup.zengxiaohui.com/vueImg/avatar3.jpg"/>
                                </div>
                                <div class="flexC">
                                    <span>
                                        <strong>晖小晖</strong>
                                    </span>
                                    <span>hui xiaohui</span>
                                </div>
                            </div>
                            <div>
                                <span class="status">在线</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "workplace",
        data() {
            return {
                avatarImg: 'https://githup.zengxiaohui.com/vueImg/avatar1.jpg',
                myProjectData: [
                    {
                        name_en: 'Hui Admin Pro',
                        name_cn: '企业级中台前端解决方案',
                        img: 'https://githup.zengxiaohui.com/vueImg/img8.jpg'
                    },
                    {
                        name_en: 'ZengXiaoHui Boke',
                        name_cn: '曾小晖个人博客',
                        img: 'https://githup.zengxiaohui.com/vueImg/img2.jpg'
                    },
                    {
                        name_en: 'Hui Admin Pro',
                        name_cn: '企业级中台前端解决方案',
                        img: 'https://githup.zengxiaohui.com/vueImg/img3.jpg'
                    },
                    {
                        name_en: 'Hui Admin Pro',
                        name_cn: '企业级中台前端解决方案',
                        img: 'https://githup.zengxiaohui.com/vueImg/img4.jpg'
                    },
                    {
                        name_en: 'Hui Admin Pro',
                        name_cn: '企业级中台前端解决方案',
                        img: 'https://githup.zengxiaohui.com/vueImg/img9.jpg'
                    },
                    {
                        name_en: 'Hui Admin Pro',
                        name_cn: '企业级中台前端解决方案',
                        img: 'https://githup.zengxiaohui.com/vueImg/img6.jpg'
                    }
                ], // 我的项目
            }
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
    @import "css/workplace";
</style>
