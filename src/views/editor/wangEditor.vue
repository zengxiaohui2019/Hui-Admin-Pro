<template>
    <div class="wangEditor-page flexC">
        <div class="pageHead flexC">
            <p>wangEditor 编辑器</p>
            <p>对 wangEditor 进行过封装，可以使用 v-model 绑定数据。支持本地存储，支持拖拽图片上传，支持base64位</p>
        </div>
        <div class="pageContent">
            <Editor ref="Editor" v-model="content"></Editor>
            <div style="margin-top: 20px">
                <Button style="margin-right: 20px" @click="add">增加内容</Button>
                <Button @click="clear">清空</Button>
            </div>
            <div class="flexC" style="margin-top: 20px;width: 100%;">
                <p style="border-bottom: 1px solid #e8eaec;padding-bottom: 15px">HTML内容  <span style="margin-left: 20px">{{info}}</span></p>
                <p style="margin-top: 10px">{{content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Editor from "../../components/editor/editor";
    export default {
        name: "wangEditor",
        components:{Editor},
        data() {
            return {
                content: '',
                info: '说明：<p><br></p>是插件清空时保留的 强迫症可修改源码去除 wangEditor.js(开发) wangEditor.min.js(生产)'
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            add(){
                this.$refs.Editor.onAppend(this.content+='<p>新增的文本内容</p>')
            },
            clear(){
                this.$refs.Editor.onClear() // 清空编辑器 二选一
                // this.content = ''
            }
        },
        watch: {},
        filters: {}
    }
</script>

<style lang="less">
    .wangEditor-page {

    }
</style>