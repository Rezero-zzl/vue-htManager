<template>
    <div>
        <div style="margin: 10px 0">
            <!--            轮播图-->
<!--            <el-carousel height="500px" :interval="3000">-->
<!--                <el-carousel-item v-for="item in HotActivities" :key="item">-->
<!--                    <img :src="item.img" alt="热门活动信息" style="width: 100%; object-fit: contain; object-position: center;">-->
<!--                </el-carousel-item>-->
<!--            </el-carousel>-->
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in HotActivities" :key="item">
                    <img :src="item.img" alt="热门活动信息" >
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
                HotActivities: []
            }
        },
        created() {
            this.request.get("/normal/user/getHot").then(res => {
                this.HotActivities = res.data
            })
        },
        methods: {

        }
    }
</script>

<style>

</style>