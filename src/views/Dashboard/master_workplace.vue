/**
*   @description 主控台
*   @author Xiaohui Zeng
*   @date 2019/10/5
*/
<template>
    <div class="master_workplace-page flexC">
        <div class="fourDIv flexR">
            <div class="flexC">
                <div class="item flexC">
                    <div class="flexR">
                        <span>访问量</span>
                        <span class="day">日</span>
                    </div>
                    <div class="flexC">
                        <span>25,848</span>
                        <div class="percentage flexR">
                            <div>
                                <span>日同比 12.5%</span>
                                <Icon type="md-arrow-dropup" style="color: #ed4014;"/>
                            </div>
                            <div>
                                <span>周同比 5%</span>
                                <Icon type="md-arrow-dropdown" style="color: #19be6b;"/>
                            </div>
                        </div>
                    </div>
                    <div class="flexR">
                        <span>总访问量</span>
                        <span>280 万</span>
                    </div>
                </div>
            </div>

            <div class="flexC">
                <div class="item flexC">
                    <div class="flexR">
                        <span>销售额</span>
                        <span class="day month">月</span>
                    </div>
                    <div class="flexC">
                        <span>¥12,000</span>
                        <div class="percentage flexR">
                            <Tooltip content="65% 已达标" style="width: 100%">
                                <Progress :percent="65" status="active" :hide-info="true"/>
                            </Tooltip>
                        </div>
                    </div>
                    <div class="flexR">
                        <span>总销售额</span>
                        <span>68 万</span>
                    </div>
                </div>
            </div>

            <div class="flexC">
                <div class="item flexC">
                    <div class="flexR">
                        <span>订单量</span>
                        <span class="day week">周</span>
                    </div>
                    <div class="flexC">
                        <span>1,680</span>
                        <div class="percentage flexR">
                            <div id="order_quantity_chart" style="width: 100%;height: 35px"></div>
                        </div>
                    </div>
                    <div class="flexR">
                        <span>转化率</span>
                        <span>60%</span>
                    </div>
                </div>
            </div>

            <div class="flexC">
                <div class="item flexC">
                    <div class="flexR">
                        <span>新增用户</span>
                        <span>
                            <Tooltip content="指标说明" placement="top" transfer>
                                <Icon type="ios-help-circle-outline"/>
                            </Tooltip>
                        </span>
                    </div>
                    <div class="flexC">
                        <span>128 <span style="font-size: 24px;">位</span></span>
                        <div class="percentage flexR">
                            <div>
                                <span>日同比 12.5%</span>
                                <Icon type="md-arrow-dropup" style="color: #ed4014;"/>
                            </div>
                            <div>
                                <span>周同比 5%</span>
                                <Icon type="md-arrow-dropdown" style="color: #19be6b;"/>
                            </div>
                        </div>
                    </div>
                    <div class="flexR">
                        <span>总用户</span>
                        <span>35255 人</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="moreFast flexR">
            <div class="flexC">
                <Icon type="md-people"/>
                <span>用户</span>
            </div>
            <div class="flexC">
                <Icon type="md-podium"/>
                <span>分析</span>
            </div>
            <div class="flexC">
                <Icon type="md-cart"/>
                <span>商品</span>
            </div>
            <div class="flexC">
                <Icon type="md-clipboard"/>
                <span>订单</span>
            </div>
            <div class="flexC">
                <Icon type="md-card"/>
                <span>发票</span>
            </div>
            <div class="flexC">
                <Icon type="md-mail"/>
                <span>消息</span>
            </div>
            <div class="flexC">
                <Icon type="md-pricetags"/>
                <span>标签</span>
            </div>
            <div class="flexC">
                <Icon type="md-switch"/>
                <span>配置</span>
            </div>
        </div>

        <div class="access flexC">
            <div class="head flexR">
                <div class="left flexR">
                    <Avatar icon="md-podium" size="small"/>
                    <span>访问量</span>
                </div>
                <div class="right flexR">
                    <div class="flexR">
                        <span :class="{ 'blueText': accessTab === 1 }" @click="accessTabSwitch(1)">今日</span>
                        <span :class="{ 'blueText': accessTab === 2 }" @click="accessTabSwitch(2)">本月</span>
                        <span :class="{ 'blueText': accessTab === 3 }" @click="accessTabSwitch(3)">全年</span>
                    </div>
                    <div class="flexC">
                        <DatePicker :options="optionsEnd" type="daterange" v-model="startDate" placement="bottom-end"
                                    format="yyyy-MM-dd" placeholder="请选择时间段" style="width: 200px"></DatePicker>
                    </div>
                </div>
            </div>
            <div class="content flexR">
                <div class="flexC">
                    <p>访问量趋势</p>
                    <div id="trendChart" style="width: 100%;height: 240px"></div>
                </div>
                <div class="flexC">
                    <p>访问量排行</p>
                    <div class="ranking flexC">
                        <div class="flexR" v-for="(item ,index) in rankingList" :key="item+index">
                            <span class="flexR">
                                <Avatar size="small" :class="{ 'active': index<3 }">{{index+1}}</Avatar>
                                <span>{{item.name}}</span>
                            </span>
                            <span>{{item.num}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sch flexR">
            <div class="flexC" id="popular_searches_div">
                <div class="head flexR">
                    <div class="left flexR">
                        <Avatar icon="ios-search" size="small"/>
                        <span>热门搜索</span>
                    </div>
                    <div class="right flexR">
                        <Dropdown transfer placement="bottom">
                            <a href="javascript:void(0)">
                                <Icon class="pointer" type="md-more"/>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>操作一</DropdownItem>
                                <DropdownItem>操作二</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div class="content flexR">
                    <div class="item1 flexC">
                        <div class="flexR">
                            <span>搜索用户数</span>
                            <span style="margin-left: 10px">
                                <Tooltip content="指标说明" placement="top">
                                    <Icon type="ios-help-circle-outline"/>
                                </Tooltip>
                            </span>
                        </div>
                        <div class="flexC">
                            <div class="flexR">
                                <p>23,378</p>
                                <div>
                                    <span>12.5</span>
                                    <Icon type="md-arrow-dropup" style="color: #ed4014;"/>
                                </div>
                            </div>
                        </div>
                        <div class="charts" id="sch_users_chart" style="width: 100%; height: 35px"></div>
                    </div>
                    <div class="item1 flexC">
                        <div class="flexR">
                            <span>人均搜索次数</span>
                            <span style="margin-left: 10px">
                                <Tooltip content="指标说明" placement="top">
                                    <Icon type="ios-help-circle-outline"/>
                                </Tooltip>
                            </span>
                        </div>
                        <div class="flexC">
                            <div class="flexR">
                                <p>23,378</p>
                                <div>
                                    <span>12.5</span>
                                    <Icon type="md-arrow-dropdown" style="color: rgb(25, 190, 107)"/>
                                </div>
                            </div>
                        </div>
                        <div class="charts" id="per_capita_chart" style="width: 100%; height: 35px"></div>
                    </div>
                </div>
                <div class="tableDiv flexC">
                    <Table tooltip-theme="light" :columns="popular_sch_head" :data="popular_sch_data">
                        <template slot-scope="{ row, index }" slot="name">
                            <span>{{row.name + '-' + parseInt(index+1)}}</span>
                        </template>
                    </Table>
                    <div class="page flexR">
                        <Page :total="50" :page-size="5" size="small"/>
                    </div>
                </div>
            </div>

            <div class="flexC">
                <div class="head flexR">
                    <div class="left flexR">
                        <Avatar icon="ios-people" size="small"/>
                        <span>地区销量</span>
                    </div>
                    <div class="right flexR">
                        <Tooltip content="下载数据" placement="top">
                            <Icon class="pointer" type="ios-download-outline"/>
                        </Tooltip>
                    </div>
                </div>
                <div class="content flexR">
                    <div id="areaChart" style="width: 100%;height: 340px"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let moment = require('moment');
    import echarts from 'echarts'
    import 'echarts/map/js/china.js' // 引入中国地图数据
    export default {
        name: "master_workplace",
        data() {
            return {
                accessTab: 1, // 默认今天
                startDate: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')], // 默认时间
                // 不可选今天之后的日期
                optionsEnd: {
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                rankingList: [
                    {name: '美丽街 1 号', num: '358,125'},
                    {name: '美丽街 2 号', num: '348,125'},
                    {name: '美丽街 3 号', num: '358,125'},
                    {name: '美丽街 3 号', num: '358,125'},
                    {name: '美丽街 3 号', num: '358,125'},
                    {name: '美丽街 3 号', num: '358,125'},
                    {name: '美丽街 3 号', num: '358,125'}
                ],
                popular_sch_head: [
                    {
                        title: '排名',
                        key: 'id',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '搜索关键词',
                        slot: 'name'
                    },
                    {
                        title: '用户数',
                        key: 'num',
                        sortable: true
                    },
                    {
                        title: '周涨幅',
                        key: 'zzf',
                        width: 100,
                        align: 'center',
                        sortable: true
                    }
                ],
                popular_sch_data: [
                    {
                        name: '搜索关键词',
                        num: 18,
                        zzf: 5,
                        id: 1
                    },
                    {
                        name: '搜索关键词',
                        num: 18,
                        zzf: 5,
                        id: 2
                    },
                    {
                        name: '搜索关键词',
                        num: 18,
                        zzf: 5,
                        id: 3
                    },
                    {
                        name: '搜索关键词',
                        num: 18,
                        zzf: 5,
                        id: 4
                    },
                    {
                        name: '搜索关键词',
                        num: 18,
                        zzf: 5,
                        id: 5
                    },
                ]
            }
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.order_quantity_chart() // 渲染 订单量
                this.trendChart() // 渲染 柱形图
                this.sch_users_chart() // 渲染 搜索用户数
                this.per_capita_chart()
                this.$nextTick(() => {
                    // 渲染 人均搜索次数
                    setTimeout(()=>{
                        let h =  document.getElementById('popular_searches_div').offsetHeight
                        document.getElementById('areaChart').style.height = h-(16+53+16)+'px'
                        this.areaChart() // 渲染 地区area地图
                    },500)
                })
            })
        },
        computed: {},
        methods: {
            // 今日 本月 本年切换
            accessTabSwitch(type) {
                this.accessTab = type
                if (type === 1) {
                    this.startDate = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                } else if (type === 2) {
                    this.startDate = [moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                } else {
                    this.startDate = [moment(new Date()).subtract(1, 'years').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                }
            },
            // 渲染 柱形图
            trendChart() {
                let myChart = echarts.init(document.getElementById('trendChart'))
                window.addEventListener("resize",()=>{
                    myChart.resize();
                })
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {  // 坐标轴指示器，坐标轴触发有效
                            type: 'line',   // 默认为直线，可选为：'line' | 'shadow'
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        }
                    },
                    xAxis: {
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisLine: {
                            lineStyle: {
                                color: '#D7DDE4'
                            }
                        },
                        axisLabel: {
                            color: '#7F8B9C',
                            fontSize: 14,
                        },
                        axisTick: { //X轴刻度线 和文字对齐
                            alignWithLabel: {
                                boundaryGap: true
                            }
                        },
                    },
                    yAxis: {
                        axisTick: { //y轴刻度线
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#D7DDE4'
                            },
                            show: false
                        },
                        axisLabel: {
                            color: '#7F8B9C',
                            fontSize: 14,
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#F5F7F9'
                            }
                        },
                        // interval:500,
                        // max:5000
                    },
                    grid: {
                        x: '8%', //相当于距离左边效果:padding-left
                        y: '5%', //相当于距离上边效果:padding-top
                        bottom: '10%',
                        right: '3%',
                    },
                    series: [{
                        type: 'bar',
                        // barWidth: 63,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#66CBFE'
                                }, {
                                    offset: 0.8,
                                    color: '#1898EC'
                                }], false)
                            },
                        },
                        data: [2354, 3254, 1654, 2454, 4757, 2011, 1211, 3500, 4500, 5000, 8588, 6500]
                    }]
                });
            },
            // 渲染 地区area地图
            areaChart() {
                let self = this
                let myChart = echarts.init(document.getElementById('areaChart'))
                window.addEventListener("resize",()=>{
                    myChart.resize();
                })
                let mapName = 'china'
                let data = [
                    {name: "北京", value: 199},
                    {name: "天津", value: 42},
                    {name: "河北", value: 102},
                    {name: "山西", value: 81},
                    {name: "内蒙古", value: 47},
                    {name: "辽宁", value: 67},
                    {name: "吉林", value: 82},
                    {name: "黑龙江", value: 123},
                    {name: "上海", value: 24},
                    {name: "江苏", value: 92},
                    {name: "浙江", value: 114},
                    {name: "安徽", value: 109},
                    {name: "福建", value: 116},
                    {name: "江西", value: 91},
                    {name: "山东", value: 119},
                    {name: "河南", value: 137},
                    {name: "湖北", value: 116},
                    {name: "湖南", value: 114},
                    {name: "重庆", value: 91},
                    {name: "四川", value: 125},
                    {name: "贵州", value: 62},
                    {name: "云南", value: 83},
                    {name: "西藏", value: 9},
                    {name: "陕西", value: 80},
                    {name: "甘肃", value: 56},
                    {name: "青海", value: 10},
                    {name: "宁夏", value: 18},
                    {name: "新疆", value: 180},
                    {name: "广东", value: 123},
                    {name: "广西", value: 59},
                    {name: "海南", value: 14},
                ];

                let geoCoordMap = {};
                /*let toolTipData = [
                    {name: "北京", value: [{name: "科技人才总数", value: 95}, {name: "理科", value: 82}]},
                ];*/

                /*获取地图数据*/
                myChart.showLoading();
                let mapFeatures = echarts.getMap(mapName).geoJson.features;
                myChart.hideLoading();
                mapFeatures.forEach(function (v) {
                    // 地区名称
                    let name = v.properties.name;
                    // 地区经纬度
                    geoCoordMap[name] = v.properties.cp;

                });

                // console.log(data)
                let max = 480,
                    min = 9; // todo
                let maxSize4Pin = 100,
                    minSize4Pin = 20;

                let convertData = function (data) {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value),
                            });
                        }
                    }
                    return res;
                };

                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        padding: 0,
                        enterable: true,
                        transitionDuration: 1,
                        textStyle: {
                            color: '#000',
                            decoration: 'none',
                        },
                        // position: function (point, params, dom, rect, size) {
                        //   return [point[0], point[1]];
                        // },
                        formatter: function (params) {
                            // console.log(params)
                            let value = 0
                            if (self.$isBlank(params.data)) {
                                return
                            }
                            if (Array.isArray(params.data.value)) {
                                value = params.data.value[params.data.value.length - 1]
                            } else {
                                value = params.data.value
                            }
                            let tipHtml = `
                            <div style="width:280px;height:180px;background:rgba(22,80,158,0.4);border:1px solid rgba(7,166,255,0.7);border-radius: 5px">
                                <div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">
                                    <i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;"></i>
                                    <span style="margin-left:10px;color:#fff;font-size:16px;">${params.name}</span>
                                </div>
                                    <div style="padding:20px">
                                        <p style="color:#fff;font-size:12px;">
                                            <i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px"></i>
                                            门店数：
                                            <span style="color:#11ee7d;margin:0 6px;">3</span>
                                            个
                                        </p>
                                        <p style="color:#fff;font-size:12px;">
                                            <i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px"></i>
                                            总销量：
                                            <span style="color:#16d6ff;margin:0 6px;">${value}</span>
                                            万
                                        </p>
                                        <p style="color:#fff;font-size:12px;">
                                            <i style="display:inline-block;width:10px;height:10px;background:#95DE64;border-radius:40px;margin:0 8px"></i>
                                            总占比：
                                            <span style="color:#95DE64;margin:0 6px;">26%</span>
                                        </p>
                                        <p style="color:#fff;font-size:12px;">
                                            <i style="display:inline-block;width:10px;height:10px;background:#FF85C0;border-radius:40px;margin:0 8px"></i>
                                            往年同比：
                                            <span style="color:#FF85C0;margin:0 6px;">上浮 0.35</span>
                                        </p>
                                    </div>
                                </div>
                            `
                            return tipHtml;
                        }

                    },
                    grid: {
                        x: '0', //相当于距离左边效果:padding-left
                        y: '0', //相当于距离上边效果:padding-top
                        bottom: '0',
                        right: '3%',
                    },
                    // 不显示图例
                    visualMap: {
                        show: true,
                        min: 0,
                        // max: 200,
                        left: '5%',
                        bottom: '10',
                        calculable: true,
                        seriesIndex: [1],
                        inRange: {
                            color: ['#62C9FD', '#1898EC'] // 蓝绿
                        }
                    },
                    geo: {
                        show: true,
                        map: mapName,
                        zoom: 1.26,   //地图大小设置
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#1898EC',
                                borderColor: '#1180c7',
                            },
                            emphasis: {
                                areaColor: '#4499d0',
                            }
                        }
                    },
                    series: [{
                        name: '散点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#fff'
                            }
                        }
                    },
                        {
                            type: 'map',
                            map: mapName,
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#3B5077',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7'
                                }
                            },
                            animation: false,
                            data: data
                        },
                        {
                            name: '点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            zlevel: 6,
                        },
                        {
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(data.sort(function (a, b) {
                                return b.value - a.value;
                            }).slice(0, 10)),
                            symbolSize: function (val) {
                                return val[2] / 10;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'left',
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'yellow',
                                    shadowBlur: 10,
                                    shadowColor: 'yellow'
                                }
                            },
                            zlevel: 1
                        },

                    ]
                });
            },
            // 渲染 订单量
            order_quantity_chart() {
                let myChart = echarts.init(document.getElementById('order_quantity_chart'))
                window.addEventListener("resize",()=>{
                    myChart.resize();
                })
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        formatter(params) {
                            // console.log(params[0])
                            let text = `
                            <div style="display: flex;flex-direction: column;">
                               <span>${params[0].name}</span>
                               <div style="display: inline-flex;flex-direction: row;align-items: center">
                                    <span style="height: 10px;width: 10px;border-radius: 50%;background-color: #00CC66;margin-right: 5px"></span>
                                    <span>${params[0].value}</span>
                               </div>
                            </div>`
                            return text;
                        }
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        left: '0',
                        top: '3',
                        right: '0',
                        bottom: '0',
                        containLabel: false
                    },
                    xAxis: [{
                        show: false,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    }],
                    yAxis: [{
                        show: false,
                        type: 'value',
                    }],
                    series: [{
                        name: '移动',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 2
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#B2F0D1',
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#00CC66'
                            },
                        },
                        data: [120, 300, 150, 350, 70, 210, 130]
                    }]
                });
            },
            // 渲染 搜索用户数
            sch_users_chart(){
                {
                    let myChart = echarts.init(document.getElementById('sch_users_chart'))
                    window.addEventListener("resize",()=>{
                        myChart.resize();
                    })
                    // 绘制图表
                    myChart.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {
                                    color: 'rgba(0,0,0,0)'
                                }
                            },
                            formatter(params) {
                                // console.log(params[0])
                                let text = `
                                    <div style="display: flex;flex-direction: column;">
                                       <span>${params[0].name}</span>
                                       <div style="display: inline-flex;flex-direction: row;align-items: center">
                                            <span style="height: 10px;width: 10px;border-radius: 50%;background-color: #1495EB;margin-right: 5px"></span>
                                            <span>${params[0].value}</span>
                                       </div>
                                    </div>`
                                return text;
                            }
                        },
                        legend: {
                            show: false
                        },
                        grid: {
                            left: '0',
                            top: '3',
                            right: '0',
                            bottom: '0',
                            containLabel: false
                        },
                        xAxis: [{
                            show: false,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#57617B'
                                }
                            },
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        }],
                        yAxis: [{
                            show: false,
                            type: 'value',
                        }],
                        series: [{
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 5,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 2
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: '#D0EAFB',
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#1495EB'
                                },
                            },
                            data: [120, 300, 150, 350, 70, 210, 130]
                        }]
                    });
                }
            },
            // 渲染 人均搜索次数
            per_capita_chart(){
                let myChart = echarts.init(document.getElementById('per_capita_chart'))
                window.addEventListener("resize",()=>{
                    myChart.resize();
                })
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        formatter(params) {
                            // console.log(params[0])
                            let text = `
                                <div style="display: flex;flex-direction: column;">
                                   <span>${params[0].name}</span>
                                   <div style="display: inline-flex;flex-direction: row;align-items: center">
                                        <span style="height: 10px;width: 10px;border-radius: 50%;background-color: #1495EB;margin-right: 5px"></span>
                                        <span>${params[0].value}</span>
                                   </div>
                                </div>`
                            return text;
                        }
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        left: '0',
                        top: '3',
                        right: '0',
                        bottom: '0',
                        containLabel: false
                    },
                    xAxis: [{
                        show: false,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    }],
                    yAxis: [{
                        show: false,
                        type: 'value',
                    }],
                    series: [{
                        name: '移动',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 2
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#D0EAFB',
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#1495EB'
                            },
                        },
                        data: [120, 300, 150, 350, 70, 210, 130]
                    }]
                });
            }
        },
        watch: {},
        filters: {}
    }
</script>

<style lang="less">
    @import "css/master_workplace.less";
</style>