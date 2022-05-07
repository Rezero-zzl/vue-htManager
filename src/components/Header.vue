<template>
    <div style="font-size: 12px; line-height: 60px; display: flex">
        <div style="flex: 1; font-size: 18px">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>
<!--            页签-->
            <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown style="width: 200px; cursor: pointer; text-align: right">
            <div style="display: inline-block">
<!--                发现img标签并无法通过file:协议访问绝对路径的本地图片，只能通过http方式请求-->
                <img :src="user.avatarUrl" alt=""
                     style="width: 30px;height: 30px; border-radius: 50%; position: relative; top: 5px; right: 10px">
                <span>{{user.nickName}}</span> <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <router-link to="/password" style="text-decoration: none; color: black; ">修改密码</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <router-link to="/person" style="text-decoration: none; color: black; ">个人信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <span style="text-decoration: none" @click="logout">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            collapseBtnClass: String,
            collapse: Function,
            user: Object
        },
        computed: {
            currentPathName() {
                return this.$store.state.currentPathName;
            }
        },
        watch: {
            currentPathName(newVal, oldVal){
                console.log(newVal)
            }
        },
        data() {
            return {

            }
        },
        methods: {
/*            collapse(){
               this.$emit("asideCollapse")
            },*/
            logout() {
                this.$store.commit("logout")
                this.$message.success("退出成功~")
            }
        },
    }
</script>

<style scoped>

</style>