<template>
    <div class="city_components flexC">
        <div class="flexC">
            <Dropdown trigger="custom" class="city_Dropdown" :visible="visible" :stop-propagation="true" @on-visible-change="visibleStatus">
                <a href="javascript:void(0)" @click="visible=true" id="DropdownA">
                    {{checkName}}
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list" id="DropdownMenu">
                    <div class="listDiv flexC">
                        <div class="meun flexR">
                            <!--<RadioGroup type="button" size="small" class="flexR">
                                <Radio label=""></Radio>
                                <Radio label="热门城市"></Radio>
                            </RadioGroup>-->
                            <span>按省份</span>
                            <Select class="Select" filterable transfer clearable size="small" placeholder="输入城市名称搜索" @on-change="checkCity">
                                <template v-for="item in schList">
                                    <Option v-if="!it.name.includes('直辖')" v-for="it in item.children" :value="it.name" :key="it.code">{{ it.name | cityName1}}</Option>
                                </template>
                            </Select>
                        </div>
                        <div class="list flexC">
                            <div class="flexR">
                                <span class="flexC" v-for="(item,index) in cityMark" :key="item+index" @click="gundong(item,index)">{{item}}</span>
                            </div>
                            <!--省市列表-->
                            <div class="flexC" id="list">
                                <div class="item flexR" :class="item.pin" v-for="(item,index) in cityList" :key="item.name+index">
                                    <span>{{item.name | cityName}}</span>
                                    <div class="flexR">
                                        <span class="flexC" v-if="!it.name.includes('直辖')" v-for="(it,index) in item.children" :key="it.name+index"
                                              @click="checkCity(it.name)">{{it.name | cityName1}}</span>
                                    </div>
                                </div>
                                <div class="item flexR" :class="item.pin" v-for="(item,index) in cityShi" :key="item.name+index">
                                    <span>{{item.name}}</span>
                                    <div class="flexR">
                                        <span class="flexC" v-for="(it,i) in item.children" :key="it.name+i" @click="checkCity(it.name)">{{it.name | cityName1}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>
    import cityData from '@/lib/city_code.json'
    let self
    export default {
        name: "city_components",
        data() {
            self = this
            return {
                visible: false, // 是否显示
                cityList: [],
                cityMark: [], // 字母标识
                cityShi: [], // 直辖市 & 港澳
                schList: [], // 搜索的数据
                checkName: '选择城市'
            }
        },
        created() {
        },
        mounted() {
            this.getCityData()
            // 自定义关闭下拉框
            document.addEventListener('click',(event)=>{
                let spa = document.getElementById("DropdownA")
                let sp = document.getElementById("DropdownMenu")
                if(spa && sp){
                    //如果我们点击到了id为Dropdown以外的区域
                    if(!spa.contains(event.target) && !sp.contains(event.target)){
                        this.visible = false
                    }
                }
            })
        },
        computed: {
            sortList() {
                return cityData.sort((a, b) => {
                    return a['pin'].localeCompare(b['pin'])
                })
            }
        },
        methods: {
            // 处理数据
            getCityData() {
                let pinArr = []
                let shiArr = []
                let gaArr = []
                for (let v of this.sortList) {
                    if (v.name.includes('市')) {
                        // 直辖市
                        shiArr.push({name: v.name, code: v.code})
                    }else if (v.name.includes('特别行政区')) {
                        // 特别行政区
                        gaArr.push({name: v.name, code: v.code})
                    } else {
                        pinArr.push(v.pin)
                        this.cityList.push(v)
                    }
                }
                this.cityShi.push({name: '直辖：',pin: 'ZXS',children: shiArr})
                this.cityShi.push({name: '港澳：',pin: 'GA',children: gaArr})
                let setArr = new Set([...pinArr])
                this.cityMark = Array.from(setArr).sort()
                this.cityMark.push('直辖市', '港澳')

                // 搜索数据
                this.schList = JSON.parse(JSON.stringify(this.cityList))
                for(let v of this.cityShi) {
                    this.schList.push(v)
                }
            },
            // 首字母索引 滚动到指定位置
            gundong(pin,index) {
                // offsetTop：距离上层的顶部距离
                let arr = document.getElementById('list').childNodes;
                for (let i = arr.length - 1; i >= 0; i--) {
                    if(pin === '直辖市'){
                        if(arr[i].className.includes('ZXS')) {
                            index = i
                        }
                    } else if(pin === '港澳') {
                        if(arr[i].className.includes('GA')) {
                            index = i
                        }
                    } else {
                        if(arr[i].className.includes(pin)) {
                            index = i
                        }
                    }
                    arr[index].parentNode.scrollTo(0, arr[index].offsetTop - arr[index].parentNode.offsetTop)
                }
            },
            // 处理城市显示格式
            cityName2(name) {
                if (name.indexOf('自治') > 0) {
                    return name.substr(0, name.indexOf('自治'))
                } else if (name.indexOf('市') > 0) {
                    return name.substr(0, name.indexOf('市'))
                } else if (name.indexOf('县') > 0) {
                    return name.substr(0, name.indexOf('县'))
                } else if (name.indexOf('地区') > 0) {
                    return name.substr(0, name.indexOf('地区'))
                } else if (name.indexOf('特别行政区') > 0) {
                    return name.substr(0, name.indexOf('特别行政区'))
                }
            },
            // 选择城市
            checkCity(name){
                if(name){
                    this.checkName = this.cityName2(name)
                    this.visible = false
                }
            },
            // 每次打开下拉框回到滚动条顶部
            visibleStatus(status){
                if(!status){
                    document.getElementById('list').scrollTo(0,0)
                }
            }
        },
        watch: {},
        filters: {
            cityName(name) {
                if (name.indexOf('省') > 0) {
                    return name.substr(0, name.indexOf('省')) + '：'
                } else if (name.indexOf('自治区') > 0) {
                    return name.substr(0, 2) + '：'
                }else if (name.indexOf('市') > 0) {
                    return name.substr(0, name.indexOf('市'))
                }
            },
            cityName1(name) {
                return self.cityName2(name)
            }
        }
    }
</script>

<style lang="less">
    .city_components {
        .city_Dropdown {
            width: 400px;

            .listDiv {
                width: 100%;
                padding: 2px 8px;

                .meun {
                    justify-content: space-between;
                    margin-bottom: 8px;
                    &>span{
                        margin-left: 5px;
                    }
                    .Select{
                        width: calc(100% - 60px);
                    }
                }

                .list {
                    & > div:first-child {
                        flex-wrap: wrap;
                        margin-bottom: 8px;

                        span {
                            cursor: pointer;
                            font-size: 12px;
                            border: 1px solid #e8eaec;
                            color: #515a6e;
                            margin: 2px 4px 2px 0;
                            padding: 0 8px;
                            border-radius: 3px;
                        }
                    }

                    /*省市*/

                    & > div:last-child {
                        max-height: 200px;
                        overflow-y: auto;

                        & > .item {
                            justify-content: flex-start;
                            align-items: flex-start;
                            margin-bottom: 8px;
                            & > span {
                                white-space: nowrap;
                                font-weight: bold;
                                min-width: 50px;
                            }

                            & > div {
                                flex-wrap: wrap;
                                flex-shrink: 1;

                                & > span {
                                    margin-right: 10px;
                                    margin-bottom: 5px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>