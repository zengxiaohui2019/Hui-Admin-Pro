<template>
    <AgGridViewList style="width: 100%; height: 100%;"
                 class="ag-theme-alpine"
                 :columnDefs="columnDefs"
                 :dataList="rowData"
                 :dropDownMenu="dropDownMenu"
                 :actionColumn="actionColumn">
    </AgGridViewList>
</template>

<script>
    import AgGridViewList from "./AgGridViewList";
    import componentsList from "./AgGridListComponentList";

    export default {
        name: "AgGridView",
        data() {
            return {
                columnDefs: null,
                rowData: null,
                dropDownMenu: [
                    {
                        id: "TestForm",
                        name: "测试按钮1",
                        component: "TestForm",
                        componentUrl: "components/AgGrid/TestForm",
                        permission: 'system:addSensorType',
                        type: 'info',
                        buttonColor: 'success',
                        active: false,
                        propsList: {
                            message: 'hello',
                            phoneNumber: 132009090909,
                        },
                        event: function() {
                        }
                    },
                    {
                        id: "DeleteSensorType",
                        name: "测试按钮2",
                        component: null,
                        type: 'error',
                        buttonColor: 'error',
                        permission: 'system:deleteSensorType',
                        content: '删除传感器',
                        propsList: {
                            accept: () => {
                                console.log('accept')
                            },
                            cancel: () => {
                                console.log('cancel')
                            }
                        },
                        event: () => {
                            // this.$renderModal('info', '删除传感器')
                        }
                    }
                ],
                actionColumn: [
                    {
                        id: 'TestForm',
                        name: "测试按钮1",
                        component: "TestForm",
                        componentUrl: "components/AgGrid/TestForm",
                        permission: 'system:addSensorType',
                        type: 'info',
                        active: false,
                        props: function () {
                            return [
                                {
                                    tag: 'make',
                                    required: 'message'
                                },
                                {
                                    tag: 'price',
                                    required: 'phoneNumber'
                                }
                            ]
                        },
                        icon: 'ios-create-outline',
                        renderFlag: (paramsData) => {
                            const { make } = paramsData
                            return make === 'Toyota'
                        },
                        propsList: {
                        },
                        event: function() {
                        }
                    },
                    {
                        id: 'TestForm2',
                        name: "测试按钮2",
                        component: "TestForm2",
                        componentUrl: "components/AgGrid/TestForm2",
                        permission: 'system:addSensorType',
                        type: 'info',
                        active: false,
                        props: function () {
                            return [
                                {
                                    tag: 'make',
                                    required: 'message'
                                },
                                {
                                    tag: 'price',
                                    required: 'phoneNumber'
                                }
                            ]
                        },
                        icon: 'ios-cog-outline',
                        renderFlag: (paramsData) => {
                            const { make } = paramsData
                            return make === 'Toyota'
                        },
                        propsList: {
                        },
                        event: function() {
                        }
                    },
                ]
            }
        },
        components: {
            AgGridViewList
        },
        beforeMount() {
            this.columnDefs = [
                {headerName: 'Make', field: 'make'},
                {headerName: 'Model', field: 'model'},
                {headerName: 'Price', field: 'price'}
            ];

            this.rowData = [
                {make: 'Toyota', model: 'Celica', price: 35000, id: 1,},
                {make: 'Ford', model: 'Mondeo', price: 32000, id: 2,},
                {make: 'Porsche', model: 'Boxter', price: 72000, id: 3},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},
                // {make: 'Toyota', model: 'Celica', price: 35000},
                // {make: 'Ford', model: 'Mondeo', price: 32000},
                // {make: 'Porsche', model: 'Boxter', price: 72000},

            ];
        },
    }
</script>

<style scoped>

</style>