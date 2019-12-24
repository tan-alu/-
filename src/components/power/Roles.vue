<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card卡片区域 -->
    <el-card>
        <el-button  @click="dialogVisible=true">添加角色</el-button>
        <el-table
            :data="roleList"
            border
            stripe
            >
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-row >
                        <el-col :span="8">
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editDialog(scope.row.id)">编辑</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="danger" size="mini" icon="el-icon-delete" >删除</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="warning" size="mini" icon="el-icon-setting" >分配权限</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog
        title="添加角色"
        :visible.sync="dialogVisible"
        width="50%"
        @close="addDiaglogClosed"
        >
        <el-form :model="addForm"  ref="addFormRef" label-width="70px" >
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="addForm.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="addForm.roleDesc"></el-input>
              </el-form-item>
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRoles">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog
        title="编辑角色"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDiaglogClosed"
        >
        <el-form :model="editForm"  ref="editFormRef" label-width="70px" >
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="editForm.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="editForm.roleDesc"></el-input>
              </el-form-item>
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editRoles">确 定</el-button>
        </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 角色列表
      roleList: [],
      dialogVisible: false,
      editDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: '',
        roleId: ''
      },
      editForm: {
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    //   获取角色列表数据
    async getList () {
      const { data: res } = await this.$http.get('roles')
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      //   this.$message.success('获取角色列表成功')
      this.roleList = res.data
    },
    // 关闭窗口表格内容重置
    addDiaglogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加角色
    addRoles () {
      // 对表格数据进行预验证
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.addForm)
        // console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('添加角色失败')
        }
        this.$message.success('添加角色成功')
        this.dialogVisible = false
        this.getList()
      })
    },
    // 编辑角色对话框打开
    async editDialog (id) {
      // console.log(111)
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色失败')
      }
      this.$message.success('获取角色成功')
      this.editForm = res.data
    },
    // 关闭编辑对话框表格重置
    editDiaglogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 编辑角色
    editRoles (id) {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        let params = {
          roleName: this.editForm.roleName,
          roleDesc: this.editForm.roleDesc
        }
        const { data: res } = await this.$http.put('roles/' + this.editForm.roleId, params)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('失败')
        this.editDialogVisible = false
        this.getList()
        this.$message.success('成功')
      })
    }

  }

}
</script>
<style lang="less" scoped>

</style>
