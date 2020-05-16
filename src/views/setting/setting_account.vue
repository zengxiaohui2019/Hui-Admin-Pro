/**
*   @description 个人设置
*   @author Xiaohui Zeng
*   @date 2019/10/17
*/
<template>
    <div class="setting_account-page flexC">
        <div class="pageHead flexC">
            <p>个人设置</p>
            <p>设置一些个人基础信息，用于新增或变更个人信息</p>
        </div>
        <div class="pageContent flexC">
            <City></City>
        </div>
    </div>
</template>

<script>
    import City  from "../../components/city/city";
    export default {
        name: "setting_account",
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
    .setting_account-page {

    }
</style>