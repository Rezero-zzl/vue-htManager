<template>
    <div>
        <!--     定义搜索框     -->
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
                       <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <!--     定义功能按钮     -->
        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
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
<!--            <el-upload action="http://localhost:9090/user/import" :show-file-list="false" accept="xlsx"-->
<!--                       :on-success="handleExcelImportSuccess" style="display: inline-block">-->
<!--                <el-button type="primary" class="ml-5">导入<i class="el-icon-bottom"></i></el-button>-->
<!--            </el-upload>-->
<!--            <el-button type="primary" @click="exp" class="ml-5">导出<i class="el-icon-top"></i></el-button>-->
        </div>
        <!--     数据表格     -->
        <el-table :data="tableData" border stripe :header-cell-class-name="headBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="flag" label="唯一标识" ></el-table-column>
            <el-table-column prop="description" label="描述" ></el-table-column>
            <el-table-column label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <el-button type="info" @click="selectMenu(scope.row)">分配菜单<i class="el-icon-menu"></i> </el-button>
                    <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i> </el-button>
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
        <!--    分页插件      -->
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
        <!--    嵌套表单（对话框）      -->
        <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="名称" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="唯一标识" >
                    <el-input v-model="form.flag" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="菜单分配" :visible.sync="menuDialogVis" width="30%">
            <el-form label-width="80px" size="small">
                <el-tree
                        :props="props"
                        :data="menudata"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :default-expanded-keys="expends"
                        :default-checked-keys="checks"
                        >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span><i :class="data.icon"></i> {{ data.name }}</span>
                    </span>
                </el-tree>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="menuDialogVis = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "User",
    data(){
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            name: "",
            form: {},
            dialogFormVisible: false,
            menuDialogVis: false,
            multipleSelection: [],
            menudata: [],
            props: {
                label: 'name',
                //children: 'zones'
            },
            expends: [],
            checks: [],
            roleId: 0,
            roleFlag: '',
            headBg: 'headBg'
        }
    },
    created() {
        this.load()
    },
    methods: {
        load(){
            this.request.get("/role/page",{
                params:{
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name: this.name,
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
        handleAdd(){
            this.dialogFormVisible = true
            this.form = {}
        },
        handleEdit(row){
            this.form = row
            this.dialogFormVisible = true
        },
        del(id){
            this.request.delete("/role/delete/"+id).then(res => {
                if (res.code === '200'){
                    this.$message.success("删除成功！")
                    this.load()
                }else
                    this.$message.error("删除失败~")
            })
        },
        delBatch(){
            let ids = this.multipleSelection.map(v => v.id)
            this.request.post("/role/deleteBatch",ids).then(res => {
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
        save(){
            this.request.post("/role/add",this.form).then(res => {
                if (res.code === '200'){
                    this.$message.success("保存成功~")
                    this.dialogFormVisible = false
                    this.load()
                }else{
                    this.$message.error("保存失败!")
                }
            })
        },
        saveRoleMenu(){
            this.request.post("/role/roleMenu/" + this.roleId,this.$refs.tree.getCheckedKeys()).then(res => {
                if (res.code === '200'){
                    this.$message.success("保存成功~")
                    this.menuDialogVis = false
                    // 操作管理员权限的时候需要重新登录一下
                    if (this.roleFlag === 'ROLE_ADMIN') {
                        this.$store.commit("logout")
                    }
                }else{
                    this.$message.error("保存失败!")
                }
            })
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
        selectMenu(role) {
            // this.menuDialogVis = true
            this.roleId = role.id
            this.roleFlag = role.flag
            // 请求菜单数据
            this.request.get("/menu/query").then(res => {
                this.menudata = res.data

                // 设置默认展开所有的角色权限,把后台返回的菜单处理成id数组
                this.expends = this.menudata.map(v => v.id)
            })

            // 请求菜单数据
            this.request.get("/role/roleMenu/" + this.roleId).then(res => {
                this.checks = res.data

                this.request.get("/menu/ids").then(r => {
                    const ids = r.data
                    ids.forEach(id => {
                        if (!this.checks.includes(id)) {
                            // 懒加载,以防tree还没有实体化就调用其方法
                            this.$nextTick(() => {
                                this.$refs.tree.setChecked(id,false)
                            })
                            this.menuDialogVis = true
                        }
                    })
                })


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