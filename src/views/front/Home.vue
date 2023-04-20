<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2023-04-19 19:58:44
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-20 22:31:01
-->
<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2023-04-19 19:58:44
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-20 19:54:17
-->
<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2023-04-19 19:58:44
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-20 19:48:08
-->
<template>
    <div class="father">

        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in HotActivities" :key="item">
                <img @click="toActivityDetail(item)" :src="item.img" alt="热门活动信息">

            </el-carousel-item>
        </el-carousel>

        <el-row style="padding: 0 170px;">
            <el-col v-for="activity in activityList" :key="activity.id" :xs="24" :sm="12" :md="8" :lg="6">
                <div class="wrapper">
                    <div @click="toActivityDetail(activity)" class="activity-card">
                        <img :src="activity.img" class="activity-img">
                        <div class="activity-info">
                            <div class="activity-creator">{{ activity.creater }}</div>
                            <div class="activity-name">{{ activity.name }}</div>
                            <div class="activity-time">{{ activity.startTime }} - {{ activity.endTime }}
                            </div>
                            <div class="activity-place">{{ activity.place }}</div>
                            <div class="activity-description">{{ activity.description }}</div>
                        </div>

                    </div>
                    <div class="bottom_button">
                        <el-button @click="collect(activity)" type="primary" plain>收藏活动</el-button>
                        <el-button @click="subscribe(activity)" type="success" plain>关注该用户</el-button>
                    </div>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
    name: "FrontHome",
    data() {
        return {
            userId: 0,
            HotActivities: [],
            activityList: []
        }
    },
    created() {

        this.userId = JSON.parse(localStorage.getItem('user')).userName
        console.log(this.userId, 'this.userId');


        this.load()
    },
    methods: {
        //开始调用
        load() {
            this.request.get("/normal/user/getHot").then(res => {
                this.HotActivities = res.data
            })
            this.request.get("/normal/user/getPersonal", {
                params: {
                    userId: this.userId
                }
            }).then(res => {
                console.log(res.data);
                this.activityList = res.data
                console.log(activityList);
            })
        },
        toActivityDetail(item) {
            this.$router.push({ path: "ActivityDetail", query: { Id: item.id } })
        },
        //收藏
        collect(activity) {
            this.request.post("/normal/user/favorite", {
                userId: this.userId,
                activityId: activity.id
            }).then(res => {
                console.log(res, '收藏');
                if (res.code == 200) {
                    this.$message({
                        message: '收藏成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error('失败了哦');
                }
            })
        },
        subscribe(activity) {
            this.request.post("/normal/user/addAttention", {
                userId: this.userId,
                attentionUserId: 13//接口没id
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '关注成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error('失败了哦');
                }
            })
        }
    }
}
</script>

<style lang="css" scoped>
img {
    width: 400px;
    height: 300px;
}

/* .el-button {
    width: 100px;
    height: 40px;
    padding: 10px;
} */



.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.activity-card {
    width: 220px;
    height: 360px;
    border-radius: 4px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;

}

.bottom_button {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 16px 0 32px 0;

}

.activity-img {
    width: 100%;
    height: 160px;
    display: block;
}

.activity-info {
    padding: 16px;
    height: 200px;
    overflow: hidden;
}

.activity-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
}

.activity-time {
    font-size: 14px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.activity-place {
    font-size: 14px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.activity-description {
    font-size: 14px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.activity-creator {
    font-size: 14px;
    color: #999;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.father {
    display: flex;
    flex-direction: column;
}

.el-carousel {
    width: 60vw;
    margin: 0 auto;
}
</style>