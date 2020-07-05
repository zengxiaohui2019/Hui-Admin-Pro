/**
*   @description 简叙单页面
*   @author Xiaohui Zeng
*   @date 2019/10/6
*/
<template>
    <div class="brief-page flexC">
        <div class="pageContent flexC">
            <p style="font-size: 16px">1.《项目初衷》</p>
            <p>打造一个完善的企业级中台前端管理系统</p>
        </div>
        <div class="pageContent flexC">
            <p style="font-size: 16px">2.《基础框架简洁版》</p>
            <p>为什么开发？ 在2019-10-01 吃早餐的时候突发奇想，问自己，如果我也能做一套这样的项目出来该有多好？</p>
            <p>其实，自己本身vue技术一般般，做出这样的一个比较完善的系统，感觉很有难度，当时就想试试看反正可以练练手，失败了也无所谓。</p>
            <p>考虑到一些路由鉴权、多页签滚动切换、导航鉴权、导航收缩展开、导航显隐高亮判断、页面局部刷新，主题切换等挺麻烦的，最后用了vuex状态管理解决了大部分问题，终于在2019-10-03凌晨的时候完成了基础版1.0</p>
            <p>
                就这样差不多3天时间做出《基础框架简洁版》 <a href="https://githup.zengxiaohui.com/Hui-Admin-Template" target="_blank" title="基础框架简洁版-预览">(预览)</a>
                <a href="https://gitee.com/zengxiaohui2019/Hui-Admin-Template" target="_blank" style="margin-left: 15px" title="基础框架简洁版-码云">(码云)</a>
                ，感觉也没那么难，就给我增加了很大的信心！
            </p>
        </div>
        <div class="pageContent flexC">
            <p style="font-size: 16px">3.《专业版》</p>
            <p>
                2019-10-04 新开项目《专业版》 <a href="https://githup.zengxiaohui.com/Hui-Admin-Pro" target="_blank" title="专业版-预览">(预览)</a>
                <a href="https://gitee.com/zengxiaohui2019/Hui-Admin-Pro" target="_blank" style="margin-left: 15px" title="专业版-码云">(码云)</a>
            </p>
            <p>目前设计了七大板块功能，涵盖常见业务处理功能，目前正在开发中，个人正常上班，开发只有利用休息时间。</p>
            <p>以上板块全部完成后，新增地图板块、图表板块...</p>
        </div>
        <div class="pageContent flexC">
            <p style="font-size: 16px">4.《愿景》</p>
            <p>
                希望有人用它，更多人用它，希望能帮助更多人，在实践学习中一起成长...
            </p>
        </div>
        <div class="pageContent flexC">
            <p style="font-size: 16px">5.《鸣谢》</p>
            <p class="mingxie">
                <span>感谢iview开发团队</span><span>感谢vue开发团队</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "brief",
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
    .brief-page {
        .pageContent{
            p{
                margin-top: 10px;
                margin-left: 20px;
            }
            p:first-child{
                margin-left: 0px;
            }
            .mingxie{
                span{
                    margin-right: 15px;
                }
            }
        }
    }
</style>
