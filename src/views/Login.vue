<template>
    <div class="wrapper">
        <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
            <el-form :model="user" :rules="rules" ref="userForm">
                <el-form-item prop="userName">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0; text-align: right">
                    <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
                    <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/register')">注册</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
import {setRoutes} from "../router";

export default {
    name: "Login",
    data() {
        return {
            user: {},
            rules: {
                userName: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                ],
            }
        }
    },
    methods: {
        login() {
            this.$refs['userForm'].validate((valid) => {
                if (valid) { // 表单参数校验合法再发送请求
                    this.request.post("/sys/loginByUserInfo",this.user).then(res => {
                        if (res.code === '200'){
                            localStorage.setItem("user",JSON.stringify(res.data))   //存储登录用户信息到浏览器
                            localStorage.setItem("menus",JSON.stringify(res.data.menus))   //存储登录用户菜单信息到浏览器

                            // 动态设置当前用户路由
                        setRoutes()
                            this.$message.success("登录成功")

                            // 2月28新增不同角色，跳转不同页面（前/后台）
                            if(res.data.role === 'ROLE_USER'){
                                this.$router.push("/front/home")
                            }else{
                                this.$router.push("/")
                            }
                            //this.$router.push("/")

                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }
            });
        }
    }
}
</script>

<style>
    .wrapper{
        height: 100vh;
        background-image: linear-gradient(to bottom right,#FC466B,#3F5EFB);
        overflow: hidden;
    }
</style>