<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2023-04-19 19:58:44
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-20 23:25:53
-->
<template>
  <div id="app">
    <div v-if="showHeader" class="header">
      <div class="header_left">
        <div style="width: 300px; display: flex; padding-left: 30px">
          <div style="width: 60px">
            <img src="./assets/logo.png" alt="" style="width: 50px; position: relative; top: 5px; right: 0">
          </div>
          <div>欢迎来到xx系统</div>
        </div>

      </div>
      <div class="header_right" style="width: 200px">
        <div v-if="!user.userName" style="text-align: right; padding-right: 30px">
          <el-button @click="$router.push('/login')">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </div>
        <div v-else>
          <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
            <div style="display: inline-block">
              <!--                发现img标签并无法通过file:协议访问绝对路径的本地图片，只能通过http方式请求-->
              <img :src="user.avatarUrl" alt=""
                style="width: 30px;height: 30px; border-radius: 50%; position: relative; top: 5px; right: 10px">
              <span>{{ user.nickName }}</span> <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/password" style="text-decoration: none; color: black; ">修改密码</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/person" style="text-decoration: none; color: black; ">个人信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/Front/MyCollection" style="text-decoration: none; color: black; ">我的收藏</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/Front/MySubList" style="text-decoration: none; color: black; ">我的关注</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <span style="text-decoration: none" @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "FrontHome",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      showHeader: Boolean(JSON.parse(localStorage.getItem('user'))?.role === 'ROLE_USER')
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout")
      this.$message.success("退出成功~")
    }
  }
}

</script>
<style lang="css">
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}

.item {
  display: inline-block;
  width: 100px;
  color: white;
  text-align: center;
  cursor: pointer;
}

.item a {
  color: white;
  /*去除下划线*/
  text-decoration: none;
}

.item:hover {
  background-color: blue;
}

.header {
  width: 100vw;
  display: flex;
  justify-content: space-between;
}

.header_left {
  display: flex;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #eee
}

.header_right {
  padding: 10px 20px 0 0;
}
</style>