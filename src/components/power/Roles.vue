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
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row
                :class="['bdbottom',i1===0?'bdtop':'']"
                v-for="(item1,i1) in scope.row.children"
                :key="item1.id">
                <!-- 一级权限 -->
                <el-col  :span="5">
                  <el-tag
                    closable
                    @close='removeRightById(scope.row,item1.id)'>{{item1.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 二级三级权限 -->
                <el-col :span="19">
                  <el-row
                    :class="[i2 ===0?'':'bdtop']"
                    v-for="(item2,i2) in item1.children"
                    :key="item2.id">
                    <!-- 二级权限 -->
                    <el-col :span="6">
                      <el-tag
                        type="success"
                        closable
                        @close='removeRightById(scope.row,item2.id)'>{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 三级权限 -->
                    <el-col :span="18">
                      <el-tag
                        v-for="(item3) in item2.children"
                        :key="item3.id"
                        type="warning"
                        closable
                        @close='removeRightById(scope.row,item3.id)'>
                        {{item3.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!-- <pre>{{scope.row}}</pre> -->
            </template>
          </el-table-column>
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
                          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRoles(scope.row.id)">删除</el-button>
                      </el-col>
                      <el-col :span="8">
                          <el-button type="warning" size="mini" icon="el-icon-setting" @click="showRightDialog(scope.row)">分配权限</el-button>
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
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightClosed"
      >
        <el-tree
          :data="rightList"
          :props="treeProps"
          node-key="id"
          ref="treeRef"
          default-expand-all
          :default-checked-keys="defKeys"
          show-checkbox></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setRightDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotRight">确 定</el-button>
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
      setRightDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: '',
        roleId: ''
      },
      editForm: {},
      // 权限角色数据
      rightList: [],
      // 树形控件属性绑定
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中的节点Id数组
      defKeys: [],
      roleId: ''
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
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('失败')
        this.editDialogVisible = false
        this.getList()
        this.$message.success('成功')
      })
    },
    // 删除角色
    async deleteRoles (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除角色失败')
      }
      this.$message.success('删除角色成功')
      this.getList()
    },
    // 根据Id删除对应的权限
    async removeRightById (role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('取消删除')
      // 发起删除业务请求
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }
      // this.getList()
      role.children = res.data
    },
    // 分配权限对话框
    async showRightDialog (role) {
      this.roleId = role.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('获取数据失败')
      this.rightList = res.data
      // console.log(this.rightList)
      // 递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    // 通过递归的形式，获取角色下所有三级权限的Id,并保存到defKeys
    getLeafKeys (node, arr) {
      // 如果当前Node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item =>
        this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框关闭事件
    setRightClosed () {
      // 给defKeys清空 重新赋值
      this.defKeys = []
    },
    // 为角色分配权限
    async allotRight () {
      // 拿到节点和半节点的Id
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log(keys)
      // 拼接成字符串
      const idStr = keys.join(',')
      // 发送请求
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.setRightDialogVisible = false
      // this.roleId = res.data
      this.getList()
    }

  }
}
</script>
<style lang="less" scoped>
.el-tag{
  margin: 10px;
}

.bdtop{
  border-top:1px solid #eee;
}

.bdbottom{
  border-bottom:1px solid #eee;
}
</style>
