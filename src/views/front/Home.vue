<template>
    <div>
        <div style="margin: 10px 0">
            <el-carousel height="450px" :interval="5000">
                <el-carousel-item v-for="item in imgs" :key="item">
                    <img :src="item" alt="" style="width: 100%">
                </el-carousel-item>
            </el-carousel>
        </div>

        <div style="margin: 10px 0">
            <el-row :gutter="5">
                <el-col :span="6">
                    1
                </el-col>
                <el-col :span="6">
                    2
                </el-col>
                <el-col :span="6">
                    3
                </el-col>
                <el-col :span="6">
                    4
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FrontHomme",
        data() {
            return {

                imgs: [
                    'https://img30.360buyimg.com/babel/s1580x830_jfs/t1/188382/20/33547/20174/63fdb9c9F4f84069f/28daa90392ab9e5a.jpg!cc_1580x830.webp',
                    'https://img12.360buyimg.com/babel/s1580x830_jfs/t1/206269/29/28448/65329/63fc7552Ff89604bf/42468d34e889b785.jpg!cc_1580x830.webp'
                ],

                activities: [

                ]
            }
        },
        methods: {}
    }
</script>

<style>

</style>