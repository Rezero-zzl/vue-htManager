<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2023-04-19 19:58:44
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-20 22:59:21
-->
<template>
    <div class="wrapper">
        <div
            style="margin: 100px auto; background-color: #fff; width: 350px; height: 350px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>注 册</b></div>
            <el-form :model="user" :rules="rules" ref="userForm">
                <el-form-item prop="userName">
                    <el-input placeholder="请输入账号" size="medium" style="margin: 5px 0" prefix-icon="el-icon-user"
                        v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
                        show-password v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input placeholder="请确认密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
                        show-password v-model="user.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item style="margin: 5px 0; text-align: right">
                    <el-button type="primary" size="small" autocomplete="off" @click="login">注册</el-button>
                    <el-button type="warning" size="small" autocomplete="off"
                        @click="$router.push('/login')">返回登录</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            user: {},
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        login() {
            this.$refs['userForm'].validate((valid) => {
                if (valid) { // 表单参数校验合法再发送请求
                    if (this.user.password !== this.user.confirmPassword) {
                        this.$message.error("两次输入密码不一致！")
                        return false
                    }
                    this.request.post("/sys/register", this.user).then(res => {
                        if (res.code === '200') {
                            this.$message.success("注册成功")
                            this.$router.push("/login")
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            });
        }
    }
}
</script>

<style scoped>
.wrapper {
    height: 100vh;
    background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
    overflow: hidden;
}
</style>