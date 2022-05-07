<template>
    <div>
        <el-row :gutter="10" style="margin-bottom: 60px">
            <el-col :span="6">
                <el-card style="color: #409EFF">
                    <div><i class="el-icon-user" /> 用户总数</div>
                    <div style="padding: 10px 0; text-align: center; font-weight: bold">
                        100
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card style="color: #F56C6C">
                    <div><i class="el-icon-bank-card" /> 销售总量</div>
                    <div style="padding: 10px 0; text-align: center; font-weight: bold">
                        ￥ 10350
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card style="color: #67C23A">
                    <div><i class="el-icon-money" /> 收益总额</div>
                    <div style="padding: 10px 0; text-align: center; font-weight: bold">
                        ￥ 6800
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card style="color: #E6A23C">
                    <div><i class="el-icon-s-shop" /> 门店总数</div>
                    <div style="padding: 10px 0; text-align: center; font-weight: bold">
                        100
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div id="main" style="width: 500px; height: 400px"></div>
            </el-col>

            <el-col :span="12">
                <div id="pie" style="width: 500px; height: 400px"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import * as echarts from 'echarts'

    export default {
        name: "Home",
        data() {
            return {

            }
        },
        mounted() { // 页面元素div渲染好之后触发
            var option = {
                title: {
                  text: '各季度用户注册数量',
                  subtext: '趋势图',
                  left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                xAxis: {
                    type: 'category',
                    data: ['第一季度','第二季度','第三季度','第四季度']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '用户数',
                        data: [],
                        type: 'line'
                    },
                    {
                        name: '用户数',
                        data: [],
                        type: 'bar'
                    },
                    {
                        name: '会员数',
                        data: [],
                        type: 'line'
                    },
                    {
                        name: '会员数',
                        data: [],
                        type: 'bar'
                    }
                ]
            };

            // 饼图
            var pieOption = {
                title: {
                    text: '各季度用户注册数量',
                    subtext: '比例图',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '70%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inner',  // 标签位置
                                textStyle: {
                                    fontWeight: 300,
                                    fontSize: 14,
                                    color: "#fff"
                                },
                                formatter: '{d}%'
                            }
                        },
                        data: [], // 数据填充
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            // 折线、柱状图
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            // 饼图
            var pieDom = document.getElementById('pie');
            var pieChart = echarts.init(pieDom)
            // 图表数据请求
            this.request.get("/echarts/members").then(res => {
                // 数据填充
                //option.xAxis.data = res.data.x
                option.series[0].data = res.data
                option.series[1].data = res.data
                option.series[2].data = [2,3,1,0]
                option.series[3].data = [2,3,1,0]
                myChart.setOption(option);

                pieOption.series[0].data = [
                    {name: '第一季度',value: res.data[0]},
                    {name: '第二季度',value: res.data[1]},
                    {name: '第三季度',value: res.data[2]},
                    {name: '第四季度',value: res.data[3]}
                ]
                pieChart.setOption(pieOption)
            })
        }
    }
</script>

<style scoped>

</style>