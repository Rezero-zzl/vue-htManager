<template>
    <el-container style="min-height: 100vh">
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246); box-shadow: rgba(0,21,41,0.25) 2px 0px 6px;">
        <Aside :isCollapse="isCollapse" :logoText="logoText" />
      </el-aside>

      <el-container>
        <el-header style=" border-bottom: 1px solid #ccc;">
          <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" :user="user"/>
        </el-header>

        <el-main>
<!--          表示当前页面的子路由会在<router-view /> 里面展示-->
          <router-view @refreshUser="getUser"/>
        </el-main>

      </el-container>
    </el-container>
</template>

<script>

import Aside from "../components/Aside";
import Header from "../components/Header";

export default {
  name: 'Home',
  data(){
    return {  //定义初始值
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoText: true,
      user: {}
    }
  },
  components: {
    Aside,
    Header
  },
  created() {
      // 从后台获取最新数据
    this.getUser()
  },
    methods: {
    collapse(){ //点击收缩按钮触发函数
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoText = false
      }else{
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoText = true
      }
    },
    getUser() {
        let userName = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).userName : ""
        // 从后台获取数据
        this.request.get("/user/username/" + userName).then(res => {
            // 重新复制后台最新数据
            this.user = res.data
        })
    }
  }
}
</script>


