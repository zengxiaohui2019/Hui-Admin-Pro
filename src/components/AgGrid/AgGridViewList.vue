<template>
    <div>
        <div class="ag-grid-view-list">
            <Row type="flex" class="code-row-bg mb-1 prl-1">
                <Col span="4">
                    <Input
                        v-if="search"
                        v-model="searchQuery"
                        :search="true"
                        @on-search="updateSearchQuery"
                        placeholder="搜索"
                    />
                </Col>
                <Col span="20">
                    <Row type="flex" justify="end">
                        <Col style="padding:0 5px;" v-for="dropDownItem in dropDownMenu" :key="dropDownItem.id">
                            <Button
                                @click="takeComponentAction(dropDownItem.id, dropDownItem.componentUrl)"
                                :type="dropDownItem.buttonColor">{{ dropDownItem.name }}</Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <!-- AgGrid Table -->
            <ag-grid-vue
                    ref="agGridTable"
                    @grid-ready="onGirdReady"
                    @row-clicked="onRowClick"
                    :paginationAutoPageSize="false"
                    :components="componentsList"
                    :gridOptions="gridOptions"
                    class="ag-theme-material sm:w-full my-4 ag-grid-table"
                    style="height: 100%;"
                    :columnDefs="currentColumnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="dataList"
                    rowSelection="multiple"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :domLayout="'autoHeight'"
                    :treeData="treeData"
                    :autoGroupColumnDef="autoGroupColumnDef"
                    :groupDefaultExpanded="groupDefaultExpanded"
                    :getDataPath="getDataPath"
                    :tooltipShowDelay="0"
            ></ag-grid-vue>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col>
                    <Page class="mt-1" :total="dataListTotalLen" :current.sync="currentPage" show-sizer
                          @on-page-size-change="setAgGridPageSize"></Page>
                </Col>
            </Row>
            <ModalMiddleWare
                    v-for="component in modalComponent"
                    :key="component.id"
                    :propsList="component.propsList"
                    :active.sync="component.active"
                    :title="component.name"
                    :component-id="component.id"
                    :component-name="component.component"
                    :component-url="component.componentUrl"
                    :prop-list="component.propsList"
            ></ModalMiddleWare>
        </div>
    </div>

</template>

<script>
    /* eslint-disable */
    import componentsList from "./AgGridListComponentList.js";
    console.log(componentsList)
    import { dynamicSetComponent } from "./AgGridUtil";
    // import {mapGetters} from "vuex";
    import Vue from 'vue'

    export default {
        name: 'AgGridListView',
        props: {
            dataList: {
                typeof: Array,
                required: true,
                default: function () {
                    return [];
                }
            },
            columnDefs: {
                typeof: Array,
                required: true
            },
            componentsList: {
                typeof: Object,
                required: false,
                default: function () {
                    return {};
                }
            },
            search: {
                typeof: Boolean,
                required: false,
                default: true
            },
            dropDownMenu: {
                typeof: Array,
                required: false,
                default: () => {
                    return []
                }
            },
            pagination: {
                typeof: Boolean,
                required: false,
                default: true
            },
            eventProps: {
                typeof: Object,
                required: false,
                default: function () {
                    return {}
                }
            },
            hasSizeColumnsToFit: {
                typeof: Boolean,
                required: false,
                default: true
            },
            treeData: {
                typeof: Boolean,
                required: false,
                default: false,
            },
            autoGroupColumnDef: {
                typeof: Object,
                required: false,
                default: null
            },
            groupDefaultExpanded: {
                typeof: Number,
                required: false,
                default: null,
            },
            getDataPath: {
                typeof: Function,
                required: false,
                default: null,
            },
            listType: {
                typeof: String,
                required: false,
                default: '系统视图',
            },
            pageSize: {
                typeof: Number,
                required: false,
                default: 10,
            },
            listResMethod: {
                typeof: Function,
                required: false,
            },
            totalSize: {
                typeof: Number,
                required: false,
            },
            actionColumn: {
                typeof: Array,
                required: false,
            }
        },
        provide() {
            return {
                takeComponentAction: this.takeComponentAction
            }
        },
        components: componentsList,
        data() {
            return {
                roleId: null,
                searchQuery: "",
                renderButtonList: {},
                otherComponents: [],
                dropDownItemLength: this.dropDownMenu.length,

                // AgGrid
                gridApi: null,
                gridOptions: {},
                componentsList2: componentsList,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    // suppressMenu: true,
                    // suppressSizeToFit: false,
                    // rowSelection: 'multiple',
                },
                // 绑定了ag——grid——col的api
                gridApi2: null,
                components: {},
                currentPage: 1,
            };
        },
        watch: {
            windowWidth(value) {
                if (this.hasSizeColumnsToFit) this.gridApi2.api.sizeColumnsToFit();
            },
            currentPage(newValue, oldValue) {
                // console.log('currentPage', newValue)
                this.setCurrentPage(newValue, oldValue)
            },
            paginationPageSize(newValue) {
                this.setCurrentPage(this.currentPage)
            }
        },
        computed: {
            windowWidth() {
                return this.$store.state.windowWidth
            },
            componentsRenderList() {
                if (this.componentsList) return this.componentsList;
                else return {};
            },
            paginationPageSize() {
                if (this.gridApi) return this.gridApi.paginationGetPageSize();
                else return 10;
            },
            totalPages() {
                if (this.gridApi) {
                    const currentPageSize = this.paginationPageSize
                    if (this.totalSize && this.totalSize > 0) {
                        const remainder = this.totalSize % currentPageSize
                        let pageNum = (this.totalSize / currentPageSize).toFixed(0) * 1
                        if (remainder < 5) pageNum += 1
                        return pageNum * 1
                    } else {
                        return this.gridApi.paginationGetTotalPages()
                    }
                } else return 0
            },
            dataListTotalLen() {
                if (this.totalSize && this.totalSize > 0) return this.totalSize
                return this.dataList.length
            },
            modalComponent() {
                if(this.dropDownMenu && this.dropDownMenu.length > 1) return this.dropDownMenu.filter(component => !!component.component)
                return []
            },
            currentColumnDefs() {
                if(this.actionColumn.length > 0) return [...this.columnDefs, {
                    headerName: "操作",
                    field: 'action',
                    cellRendererFramework: "AgGridActionCell"
                }]
                return this.columnDefs
            }
        },
        methods: {
            onRowClick(rowData) {
                if (this.eventProps && this.eventProps.event) this.eventProps.event(rowData, this)
            },
            selectedNode(node) {
                const {level, parent} = node
                node.setSelected(!node.selected)
                if (level === 0) return
                this.selectedNode(parent)

            },
            onGirdReady(params) {
                this.gridApi2 = params;
                if (this.hasSizeColumnsToFit) params.api.sizeColumnsToFit();

                // 传送agGridApi给父组件
                this.$emit('api', this.gridApi2)

            },
            updateSearchQuery(val) {
                this.gridApi.setQuickFilter(val);
            },
            async takeComponentAction(componentId, componentUrl) {
                const button = this.dropDownMenu.find(menu => menu.id === componentId)
                if(button && button.event) {
                    button.event()
                }
                if(button && button.component !== null) {
                    // try {
                    //     require.ensure([], () => {
                    //         const component = require(`@/${componentUrl}`)
                    //         Vue.component(component.default.name, component.default)
                    //         console.log('component', component.default)
                    //         this.$set(button, 'active', true)
                    //     })
                    // } catch(error) {
                    //     console.log('button click active failed', error)
                    // }
                    await dynamicSetComponent(button.componentName, componentUrl, () => {
                        this.$set(button, 'active', true)
                    })

                }
                if(button && button.component === null) {
                    const { type, content, propsList } = button
                    this.$renderModal(type, content, null, propsList.accept, propsList.cancel)
                }
            },
            setRenderButtonFlag() {
                const fun = async e => {
                    const {permission, id, projectId, workstationId, skipValidateFlag} = e;
                    if (!skipValidateFlag) {
                        await this.$renderButton(this.listType, permission, projectId, workstationId)
                            .then(flag => {
                                Vue.set(this.renderButtonList, id, flag)
                                Vue.set(e, 'renderFlag', flag)
                                // this.renderButtonList[id] = flag
                                // e.renderFlag = flag
                            })
                    } else {
                        e.renderFlag = skipValidateFlag
                        this.renderButtonList[id] = skipValidateFlag
                    }
                }
                Promise.all(this.dropDownMenu.map(e => {
                    return new Promise(resolve => {
                        resolve(fun(e))
                    })
                }))
            },
            createAsyncComponents() {
                Vue.component('DropDownButtons', (resolve, reject) => {
                    let className = `sm:w-1/${this.dropDownMenu.length}`
                    if (this.windowWidth <= 574) {
                        className = `w-full`
                    }
                    const takeComponentAction = this.takeComponentAction
                    const createTemplate = () => {
                        let template = ``
                        const fun = async (e) => {
                            const {permission, id, projectId, workstationId, skipValidateFlag, name} = e;
                            if (!skipValidateFlag) {
                                await this.$renderButton(this.listType, permission, projectId, workstationId)
                                    .then(flag => {
                                        console.log(permission, flag)
                                        this.renderButtonList[id] = flag
                                        e.renderFlag = flag
                                        if (flag) {
                                            template += `
                      <vs-button size="small" @click="takeComponentAction('${id}')" class="vx-col">${name}</vs-button>
                  `
                                        }
                                    })
                            } else {
                                this.renderButtonList[id] = true
                                template += `
                  <vs-button size="small" @click="takeComponentAction('${id}')"  class="vx-col">${name}</vs-button>
              `
                            }
                        }
                        Promise.all(this.dropDownMenu.map((e) => {
                            return new Promise((resolve2, reject2) => {
                                resolve2(fun(e))
                            })
                        }))
                            // .then(() => console.log('create template done', template))
                            .then(() => resolve({
                                template: `<div class="vx-col w-full">${template}</div>`,
                                inject: ['takeComponentAction']
                            }))
                            .catch(error => console.log('compile button failed', error))
                    }
                    createTemplate()
                })
            },
            setAgGridPageSize(size) {
                this.gridApi.paginationSetPageSize(size)
                this.currentPage = 1
            },
            // setTotalPagesNum() {
            //   const currentPageSize = this.gridApi.paginationGetPageSize()
            //   if(this.totalSize && this.totalSize > 0) {
            //     const remainder = this.totalSize % currentPageSize
            //     let pageNum = (this.totalSize / currentPageSize).toFixed(0)
            //     if (remainder < 5) pageNum += 1
            //     this.totalPages = pageNum
            //   } else {
            //     this.totalPages = this.gridApi.paginationGetTotalPages()
            //   }
            // },
            async setCurrentPage(newValue, oldValue) {
                const currentPageSize = this.gridApi.paginationGetPageSize()
                // console.log('listResMethod', this.listResMethod)
                if (this.listResMethod) await this.listResMethod(newValue, currentPageSize)
                if (this.gridApi) this.gridApi.paginationGoToPage(newValue * 1 - 1);
            },
            init() {
                this.$emit('getPageCriteria', {
                    pageNum: this.currentPage * 1,
                    pageSize: this.paginationPageSize * 1,
                })
                // this.setTotalPagesNum()
                // this.createAsyncComponents()
            }
        },
        mounted() {
            this.gridApi = this.gridOptions.api
            this.gridApi.paginationSetPageSize(this.pageSize)
        },
        created() {
            this.init()
        },
    };
</script>

<style lang="scss">

</style>
