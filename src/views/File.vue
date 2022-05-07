<template>
    <div>
        <div style="margin: 10px 0">
            <div style="margin: 10px 0">
                <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
                <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
                <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
            </div>
                <el-upload action="'http://' + serverIp + ':9090/file/upload'" :show-file-list="false"
                       :on-success="handleFileUploadSuccess" style="display: inline-block">
                <el-button type="primary" class="ml-5">上传文件<i class="el-icon-top"></i></el-button>
            </el-upload>
            <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定批量删除这些数据吗？"
                    @confirm="delBatch"
            >
                <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>

        </div>
        <el-table :data="tableData" border stripe :header-cell-class-name="headBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="文件名"></el-table-column>
            <el-table-column prop="type" label="文件类型"></el-table-column>
            <el-table-column prop="size" label="文件大小（Kb）"></el-table-column>
            <el-table-column label="下载">
                <template slot-scope="scope">
                    <el-button type="primary" @click="download(scope.row.url,scope.row.enable)">下载</el-button>
                </template>
            </el-table-column>
            <el-table-column label="启用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="del(scope.row.id)"
                    >
                        <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline"></i> </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {serverIp} from "../../public/config";

    export default {
        name: "File",
        data() {
            return {
                serverIp: serverIp,
                tableData: [],
                name: '',
                multipleSelection: [],
                headBg: 'headBg',
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        },
        created() {
            this.load()
        },
        methods: {
            load(){
                this.request.get("/file/page",{
                    params:{
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        name: this.name
                    }
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data.records
                    this.total = res.data.total
                })
            },
            reset(){
                this.name = ""
                this.load()
            },
            del(id){
                this.request.delete("/file/delete/"+id).then(res => {
                    if (res.code === '200'){
                        this.$message.success("删除成功！")
                        this.load()
                    }else
                        this.$message.error("删除失败~")
                })
            },
            delBatch(){
                let ids = this.multipleSelection.map(v => v.id)
                this.request.post("/file/deleteBatch",ids).then(res => {
                    if (res.code == '200'){
                        this.$message.success("批量删除成功！")
                        this.load()
                    }else
                        this.$message.error("批量删除失败~")
                })
            },
            handleSelectionChange(val){
                console.log(val)
                this.multipleSelection = val
            },
            handleSizeChange(pageSize){
                console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum){
                console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },
            handleFileUploadSuccess(res) {
                console.log(res)
                this.load();
            },
            download(url,enable) {
                window.open(url+'/'+enable)
            },
            changeEnable(row) {
                this.request.post("/file/update",row).then(res => {
                    if (res.code === '200'){
                        this.$message.success("操作成功~")
                    }else {
                        this.$message.error("操作失败！")
                    }
                })
            }
        }
    }
</script>

<style>
    .headBg{
        background-color: #eee!important;
    }
</style>