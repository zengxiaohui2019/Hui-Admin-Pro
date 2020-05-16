/**
*   @description 城市选择
*   @author Xiaohui Zeng
*   @date 2019/10/29
*/
<template>
    <div class="city-page flexC">
        <div class="pageHead flexC">
            <p>城市选择</p>
            <p>简介的城市选择组件 搭配搜索更方便</p>
        </div>
        <div class="pageContent flexC">
            <City></City>
        </div>
    </div>
</template>

<script>
    import City  from "../../components/city/city";
    export default {
        name: "city-page",
        components: {City},
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
    .city-page {

    }
</style>