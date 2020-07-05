/**
*   @description 商品列表
*   @author Xiaohui Zeng
*   @date 2019/11/10
*/
<template>
    <div class="goods_list-page flexC">
        <div class="pageHead flexC">
            <p>商品列表</p>
            <p>以卡片的形式展现商品或图片信息，以下商品摘自豆瓣，仅用于效果展示。</p>
        </div>
        <div class="pageContent flexC">
            <div class="body flexR">
                <div class="item hui-box-shadow flexC" v-for="(item,index) in dataList" :key="item.id+index">
                    <a :href="item.src" class="flexC" target="_blank">
                        <div class="tag" :class="[{ 'red': item.type === 0 },{ 'green': item.type === 1 },{ 'rexiao': item.type === 2 }]">{{item.type | tagType}}</div>
                        <img :src="item.img" alt="">
                        <p class="title">{{item.title}}</p>
                        <p class="desc">{{item.desc}}</p>
                        <p class="price">¥ {{item.price}} 元</p>
                    </a>
                </div>
            </div>
            <div class="pageDiv flexR">
                <Page :total="50" show-elevator show-total />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goods_list",
        data() {
            return {
                dataList: [
                    {
                        id: 1,
                        title: 'Vue.js项目实战',
                        img: 'https://githup.zengxiaohui.com/vueImg/douban/s29939950.jpg',
                        type: 2,
                        desc: 'Vue.js 核心团队成员-[法]纪尧姆·周 ',
                        price: 69,
                        src: 'https://book.douban.com/subject/30395202/'
                    },
                    {
                        id: 1,
                        title: '史蒂夫·乔布斯传',
                        img: 'https://githup.zengxiaohui.com/vueImg/douban/s6974202.jpg',
                        type: 2,
                        desc: '[美] 沃尔特·艾萨克森 / 管延圻',
                        price: 68,
                        src: 'https://book.douban.com/subject/6798611/'
                    },
                    {
                        id: 1,
                        title: '自私的基因',
                        img: 'https://githup.zengxiaohui.com/vueImg/douban/s11214645.jpg',
                        type: 1,
                        desc: '[英]理查德·道金斯 / 卢允中',
                        price: 68,
                        src: 'https://book.douban.com/subject/11445548/'
                    },
                    {
                        id: 1,
                        title: '平凡的世界',
                        img: 'https://githup.zengxiaohui.com/vueImg/douban/s1144911.jpg',
                        type: 1,
                        desc: '路遥',
                        price: 64,
                        src: 'https://book.douban.com/subject/1200840/'
                    },
                    {
                        id: 1,
                        title: '如何让你爱的人爱上你',
                        img: 'https://githup.zengxiaohui.com/vueImg/douban/s6639653.jpg',
                        type: 0,
                        desc: '[美] 莉尔·朗兹 译: 毛燕鸿',
                        price: 38.5,
                        src: 'https://book.douban.com/subject/6507262/'
                    },
                    {
                        id: 1,
                        title: '去西伯利亚走江湖',
                        img: 'https://githup.zengxiaohui.com/vueImg/douban/32524069.jpg',
                        type: 1,
                        desc: '樊北溟',
                        price: 0,
                        src: 'https://read.douban.com/column/32524069/'
                    },
                ]
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        watch: {},
        filters: {
            tagType(data) {
                switch (data) {
                    case 0:
                        return '缺货'
                        break
                    case 1:
                        return '推荐'
                        break
                    case 2:
                        return '热销'
                        break
                }
            }
        }
    }
</script>

<style lang="less">
    .goods_list-page {
        &>.pageContent{
            background-color: #F5F7F9!important;
            padding: 0;
            &>.body{
                flex-wrap: wrap;
                &>.item{
                    padding: 16px;
                    width: calc(25% - 16px);
                    margin: 0 10px 20px 10px;
                    border-radius: 4px;
                    position: relative;
                    transition: all .2s ease-in-out;
                    background-color: white;
                    &:first-child{
                        margin-left: 3px;
                    }
                    &:nth-child(5n){
                        margin-left: 3px;
                    }
                    &:nth-child(4n){
                        margin-right: 0px;
                    }
                    &>a{
                        align-items: center;
                        &>.tag{
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            margin: 2px 4px 2px 0;
                            padding: 0 8px;
                            border: 1px solid #e8eaec;
                        }
                        .green {
                            background: #f6ffed;
                            border-color: #b7eb8f!important;
                            color: #52c41a;
                        }
                        .rexiao{
                            color: #FFA100;
                            background: rgb(255, 251, 240);
                            border-color: #FFA100!important;
                        }
                        .red{
                            color: #f5222d;
                            background: #fff1f0;
                            border-color: #ffa39e!important;
                        }
                        &>img{
                            width: 60%;
                            height: 280px;
                        }
                        &>.title{
                            font-size: 16px;
                            font-weight: 700;
                            margin: 8px 0;
                            color: #515A85;
                        }
                        &>.desc{
                            color: #808695;
                        }
                        &>.price{
                            color: #ff6700;
                            margin: 8px 0;
                        }
                    }
                }
            }
            &>.pageDiv{
                justify-content: center;
            }
        }
    }
</style>
