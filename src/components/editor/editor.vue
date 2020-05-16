<template>
    <div class="editor-page">
        <div :id="editorId"></div>
    </div>
</template>

<script>
    import Editor from 'wangeditor'
    export default {
        name: "Editor",
        props:{
            // 绑定的值
            value: {
                type: String,
                default: ''
            },
            // 绑定的值的类型, enum: ['html', 'text']
            valueType: {
                type: String,
                default: 'html',
                validator: (val) => {
                    // {String|Number} value 要验证的字符串或数值 validList 用来验证的列表
                    function oneOf (value, validList) {
                        for (let i = 0; i < validList.length; i++) {
                            if (value === validList[i]) {
                                return true
                            }
                        }
                        return false
                    }
                    return oneOf(val, ['html', 'text'])
                }
            },
            // 设置change事件触发时间间隔
            changeInterval: {
                type: Number,
                default: 500
            },
            // 是否开启本地存储
            cache: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            }
        },
        created() {
        },
        mounted() {
            this.init()
        },
        computed: {
            editorId () {
                return `editor${this._uid}`
            }
        },
        methods: {
            init(){
                this.editor = new Editor(`#${this.editorId}`)
                this.editor.customConfig.onchangeTimeout = this.changeInterval // 设置change事件触发时间间隔
                this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
                this.editor.customConfig.zIndex = 100 // 配置编辑区域的 z-index

                this.editor.customConfig.onchange = (html) => {
                    let text = this.editor.txt.text()
                    if (this.cache) {
                        localStorage.editorCache = html
                    }
                    this.$emit('input', this.valueType === 'html' ? html : text)
                    this.$emit('on-change', html, text)
                }
                this.editor.create() // create这个方法一定要在所有配置项之后调用
                // this.editor.txt.html('<p>用 JS 设置的内容</p>') // 设置内容
                // this.editor.txt.append('<p>追加的内容</p>') // 可继续追加内容。
                // this.editor.txt.clear()清空编辑器内容
                // console.log('this.editor.txt.html()----------'+this.editor.txt.html())// 显示内容
                // console.log('this.editor.txt.getJSON()----------'+JSON.stringify(this.editor.txt.getJSON()))// 获取json格式内容

                // 如果本地有存储加载本地存储内容
                let html = ''
                if (localStorage.getItem('editorCache')){
                    html = localStorage.getItem('editorCache')
                } else {
                    html = this.value
                }
                if (html) {
                    this.editor.txt.html(html)
                    this.editor.change() // 更新编辑器
                }
            },
            // 清除事件
            onClear(){
                this.editor.txt.clear()
                localStorage.removeItem('editorCache')
                this.editor.change() // 更新编辑器
            },
            onAppend(html){
                console.log(html)
                this.editor.txt.html(html)
                this.editor.change() // 更新编辑器
            }
        },
        watch: {
        },
        filters: {}
    }
</script>

<style lang="less">
    .editor-page {

    }
</style>