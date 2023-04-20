<template>
    <div class="my-following">
        <h2>我的关注</h2>
        <div class="user-info">
            <div class="avatar-container">
                <img :src="avatarUrl" :alt="nickName" class="avatar">
            </div>
            <div class="info">
                <p>昵称：{{ nickName }}</p>
                <p>邮箱：{{ email }}</p>
                <p>性别：{{ gender }}</p>
                <p>城市：{{ city }}</p>
                <p>注册时间：{{ formatTime(regTime) }}</p>
                <div class="label">
                    <span style="display: inline-block;"> 标签：</span>

                    <div v-for="tag in tags" :key="tag" class="tag">
                        {{ tag }}
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>
  
<script>
export default {
    name: "MySubList",
    data() {
        return {
            nickName: "33",
            email: "3",
            gender: "男",
            city: "北京",
            regTime: "2022-01-01T00:00:00.000Z",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            tags: ["学习", "手工"],
        };
    },
    created() {
        this.userId = JSON.parse(localStorage.getItem('user')).userName
        // this.load()
    },
    methods: {
        load() {
            this.request.get("/normal/user/getAttentionUserList", {
                params: {
                    pageNum: 1,
                    pageSize: 100,
                    userId: this.userId
                }
            }).then(res => {
                console.log(res.data);
                this.activities = res.data
            })
        },
        formatTime(timeStr) {
            const date = new Date(timeStr);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },

    },
};
</script>
  
<style lang="css" scoped >
.my-following {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.my-following h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.my-following .user-info {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 20px;
}

.my-following .avatar-container {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 20px;
}

.my-following .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.my-following .info p {
    font-size: 16px;
    margin-bottom: 5px;
}

.my-following .info ul {
    margin-top: 10px;
    list-style: none;
    padding-left: 0;
}

.my-following .info .tag {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
}

.label {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>