<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2023-04-20 19:59:43
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-20 22:39:47
-->
<template>
    <div class="activity-detail">
        <h2>{{ activity.name }}</h2>
        <img :src="activity.img" alt="activity image">
        <p class="description">{{ activity.description }}</p>
        <div class="info">
            <p>创建者：{{ activity.creater }}</p>
            <p>创建时间：{{ activity.createTime }}</p>
            <p>开始时间：{{ activity.startTime }}</p>
            <p>结束时间：{{ activity.endTime }}</p>
            <p>标签：{{ activity.tag }}</p>
            <p>地点：{{ activity.place }}</p>
            <p>浏览次数：{{ activity.viewCount }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Test",
    props: {

    },
    data() {
        return {
            activityId: this.$route.query.Id,
            activity: {
                id: 3,
                name: '读书会',
                img: 'http://rt9exk1jx.hn-bkt.clouddn.com/userImgs/Read3.jpg',
                description: '读书会是一种促进团体信息共享、智慧共享、情绪共鸣、深度对话的学习形式。在这样一种团体碰撞的氛围中，参与的每个人都能突破自己原有的思维局限，实现跨界创新。',
                creater: '蒋维健',
                createTime: '2023-04-19 13:57:52',
                startTime: '2023-04-26 07:46:56',
                endTime: '2023-04-29 07:47:04',
                tag: 5,
                place: '南校第一图书馆',
                viewCount: 2,
            }
        }
    },
    created() {
        console.log(this.$route.query.Id)
    },
    methods: {
        load() {
            this.request.get("/normal/user/getActivityById", {
                params: {
                    id: activityId
                }
            }).then(res => {
                console.log(res.data);

            })
        }
    }
}
</script>

<style lang="css" scoped>
.activity-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.activity-detail h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
}

.activity-detail img {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 5px;
}

.activity-detail p.description {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}

.activity-detail .info p {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    color: #666;
}
</style>