<template>
    <div class="icon-list">
        <div v-for="action in filterActionCellList" :key="action.actionId" @click="() => activeModal(action)">
            <Icon :title="action.name" :size="20" :type="action.icon" />
            <ModalMiddleWare
                    :propsList="action.propsList"
                    :active.sync="action.active"
                    :title="action.name"
                    :component-id="action.id"
                    :component-name="action.component"
                    :component-url="action.componentUrl"
                    :prop-list="action.propsList"
            ></ModalMiddleWare>
        </div>
    </div>
</template>

<script>
    import ModalMiddleWare from "./ModalMiddleWare";
    import Vue from 'vue'
    import { transPropsListByProps, dynamicSetComponent } from './AgGridUtil'
    export default {
        name: "AgGridActionCell",
        data() {
          return {
              active: false,
              title: 'action cell modal title',
              paramsData: null,
              actionCellList: [],
          }
        },
        computed: {
          filterActionCellList() {
              if(this.actionCellList.length > 0) return this.actionCellList.filter(e => e.renderFlag && e.component)
              return []
          }
        },
        components: {
            ModalMiddleWare,
        },
        methods: {
            showParams() {
                console.log('params', this.params)
                this.active = true
            },
            activeModal(action) {
                dynamicSetComponent(action.componentName, action.componentUrl, () => {
                    this.$set(action, 'active', true)
                })
            },
            okClick() {
                console.log('action cell ok click')
            },
            cancelClick() {
                console.log('action cell cancel click')
            },
            init() {
                this.paramsData = this.params.data
                if(this.params && this.params.frameworkComponentWrapper && this.params.frameworkComponentWrapper.parent) {
                    const { $vnode } = this.params.frameworkComponentWrapper.parent
                    if($vnode) {
                        const { actionColumn } = $vnode.context
                        this.actionCellList = actionColumn.map(e => {
                            let propsList = {}
                            const actionId = `${e.id}-${this.paramsData.id}`
                            let { renderFlag, props } = e
                            props = props()
                            if(props.length > 0) propsList = transPropsListByProps(this.paramsData, props)
                            if(typeof renderFlag === 'function') renderFlag = renderFlag(this.paramsData)
                            const data = {...e}
                            this.$set(data, 'actionId', actionId)
                            this.$set(data, 'renderFlag', renderFlag)
                            this.$set(data, 'propsList', propsList)
                            // console.log('data', data)
                            return data
                            // return {
                            //     ...e,
                            //     actionId,
                            //     renderFlag,
                            //     propsList,
                            // }
                        })
                    }
                }
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style lang="scss">
.icon-list {
    display: inline-flex;
}
</style>