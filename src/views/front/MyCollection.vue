<template>
    <div class="my-favorite-activity">
        <h2>我的收藏活动</h2>
        <div v-for="activity in activities" :key="activity.id" class="activity">
            <img :src="activity.img" alt="activity image">
            <div class="info">
                <h3>{{ activity.name }}</h3>
                <p>创建者：{{ activity.creater }}</p>
                <p>开始时间：{{ activity.startTime }}</p>
                <p>结束时间：{{ activity.endTime }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "MyFavoriteActivity",
    data() {
        return {
            userId: 0,
            activities: [
                {
                    id: 1,
                    name: "美食节",
                    img: "http://rt9exk1jx.hn-bkt.clouddn.com/userImgs/Food3.jpg",
                    creater: "余秉文",
                    startTime: "2023-04-20T07:33:32.000+00:00",
                    endTime: "2023-04-22T07:33:49.000+00:00"
                },
                // 在这里添加更多的活动
            ],
        };
    },
    created() {
        this.userId = JSON.parse(localStorage.getItem('user')).userName
        this.load()
    },
    methods: {
        load() {
            this.request.get("/normal/user/getFavoriteActivity", {
                params: {
                    pageNum: 1,
                    pageSize: 100,
                    userId: this.userId
                }
            }).then(res => {
                console.log(res.data);
                this.activities = res.data
            })
        }

    },
};
</script>
  
<style>
.my-favorite-activity {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.my-favorite-activity h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.my-favorite-activity .activity {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.my-favorite-activity .activity img {
    width: 250px;
    height: 150px;
    margin-right: 20px;
    object-fit: cover;
}

.my-favorite-activity .activity .info {
    flex: 1;
}

.my-favorite-activity .activity h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.my-favorite-activity .activity p {
    font-size: 16px;
    margin-bottom: 5px;
}
</style>