<template>
    <Modal
        v-model="currentActive"
        :scrollable="scrollable"
        :draggable="draggable"
        :fullscreen="fullscreen"
        :title="title"
        @on-ok="okEvent2"
        @on-cancel="cancelEvent2">
        <component v-if="currentActive" :ref="`${componentId}-child`" :is="componentName" :id="componentId" v-bind="propsList" @okEvent="getOkEvent"></component>
<!--        <component v-if="currentActive" :ref="`${componentId}-child`" :is="`async-${componentName}`" :id="componentId" v-bind="propsList" @okEvent="getOkEvent"></component>-->
<!--        <DynamicComponent v-if="currentActive" :ref="`${componentId}-parent`" :propsList="propsList" />-->
    </Modal>
</template>

<script>
    import componentsList from "./AgGridListComponentList.js";
    // console.log(componentsList)
    export default {
        name: "ModalMiddleWare",
        props: {
            draggable: {
                typeof: Boolean,
                default: true,
            },
            scrollable: {
                typeof: Boolean,
                default: true,
            },
            fullscreen: {
                typeof: Boolean,
                default: false,
            },
            active: {
                typeof: Boolean,
                required: true,
                default: false,
            },
            title: {
                typeof: String,
                required: true,
                default: "",
            },
            componentId: {
                typeof: String,
                required: true,
            },
            componentName: {
                typeof: String,
                required: true,
            },
            componentUrl: {
                typeof: String,
                required: true,
            },
            propsList: {
                typeof: Object,
                required: true,
            },
        },
        components: componentsList,
        data() {
            return {
                okEvent: null,
                cancelEvent: null,
            }
        },
        methods: {
            createComponent() {
                let attributeStr = ``
                const componentModule = require(`@/${this.componentUrl}`)
                const components = {}
                Object.defineProperty(components, this.componentName, {value: componentModule.default, enumerable: true})
                console.log('this.propsList', this.propsList)
                for(const [key, value] of Object.entries(this.propsList)) {
                    attributeStr += ` :${key}="${key}" `
                }
                const template = `
                    <component
                        :ref="'${this.componentId}-child'"
                        :is="'${this.componentName}'"
                        id="${this.componentId}"
                        ${attributeStr}
                        @okEvent="getOkEvent">
                    </component>`
                const componentData = {
                    components,
                    template,
                    props: {
                        propsList: {
                            typeof: Object,
                            required: true,
                        }
                    },
                    data() {
                        return {
                            event: {
                                okEvent: () => {},
                                cancelEvent: () => {},
                            },
                            ...this.propsList,
                        }
                    },
                    methods: {
                        getOkEvent(event) {
                            // this.event.okEvent = event
                            this.$set(this.event, 'okEvent', () => {
                                if(event && typeof event === 'function') event()
                            })
                        }
                    },
                }
            },
            getOkEvent(event) {
                // this.event.okEvent = event
                this.okEvent = event
            },
            okEvent2() {
                this.okEvent && this.okEvent()
            },
            cancelEvent2() {
                this.cancelEvent && this.cancelEvent()
            },
            init() {
                // this.createComponent()
            }
        },
        computed: {
          currentActive: {
              get () {
                  return this.active
              },
              set (newValue) {
                  this.$emit('update:active', newValue)
              }
          },
        },
        created() {
            this.init()
            // console.log('AgGridListComponentList', AgGridListComponentList)
            // console.log(`${this.componentId}-parent`, this.$refs[`${this.componentId}-parent`].event.okEvent())
        }
    }
</script>

<style scoped>

</style>