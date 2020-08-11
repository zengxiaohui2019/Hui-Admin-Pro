import { AgGridVue } from "ag-grid-vue"
import ModalMiddleWare from "./ModalMiddleWare";
import AgGridActionCell from "./AgGridActionCell";
// import TestForm from "./TestForm";
export default {
    AgGridVue,
    // modal中间动态组件渲染组件
    ModalMiddleWare,
    // 快速操作列渲染组件
    AgGridActionCell,
    // TestForm: () => import('./TestForm'),
}