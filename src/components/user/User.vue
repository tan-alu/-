// User
<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- card -->
      <el-card>
        <el-row :gutter="20">
          <el-col :span="10">
            <!-- 输入搜索框 -->
            <el-input
              placeholder="请输入内容"
              class="input-with-select"
              v-model="queryInfo.query"
              clearable
              @clear="getList">
              <!-- 搜索按钮 -->
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="dialogVisible=true">添加用户</el-button>
          </el-col>
        </el-row>
        <!-- 用户表格 -->
          <el-table
              :data="userList"
              style="width: 100%"
              stripe
              border>
              <el-table-column type="index">
              </el-table-column>
              <el-table-column prop="username" label="姓名">
              </el-table-column>
              <el-table-column prop="email" label="邮箱">
              </el-table-column>
              <el-table-column prop="mobile" label="电话">
              </el-table-column>
              <el-table-column prop="role_name" label="角色">
              </el-table-column>
              <el-table-column  prop="mg_state" label="状态">
                <template slot-scope="scope">
                  <!-- {{scope.row}} -->
                  <el-switch v-model="scope.row.mg_state" @change="status(scope.row)"></el-switch>
                </template>
              </el-table-column>
              <el-table-column  label="操作" width="180">
                <template slot-scope="scope">
                  <!-- {{scope.row}} -->
                <el-row :gutter="20">
                  <!-- 修改 -->
                  <el-col :span="8">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
                  </el-col>
                  <!-- 删除 -->
                  <el-col :span="8">
                    <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                  </el-col>
                  <!-- 分配角色 -->
                  <el-col :span="8">
                    <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                      <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
                    </el-tooltip>
                  </el-col>
                </el-row>
                </template>
              </el-table-column>
          </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1,2,5,10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- 添加用户对话框 -->
        <el-dialog
          title="添加用户"
          :visible.sync="dialogVisible"
          width="50%"
          @close="addDiaglogClosed"
          >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
              </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>

      </el-card>
        <!-- 修改用户对话框 -->
        <el-dialog
          title="修改用户"
          :visible.sync="editDialogVisible"
          width="50%"
          >
              <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
                <el-form-item label="用户名" prop="username" >
                  <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
              </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
  data () {
    // 验证邮箱的规则
    // var checkEmail = (rule, value, cb) => {
    //   // 验证邮箱的正则表达式
    //   const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    //   if (regEmail.test(value)) {
    //     // 合法的邮箱
    //     return cb()
    //   }
    //   cb(new Error('请输入合法的邮箱'))
    // }
    // // 验证手机号的规则
    // var checkMobile = (rule, value, cb) => {
    //   // 验证手机号的正则表达式
    //   const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    //   if (regMobile.test(value)) {
    //     return cb()
    //   }
    //   cb(new Error('请输入合法的手机号'))
    // }

    return {
      queryInfo: {
        'query': '',
        // 当前页数
        'pagenum': 1,
        // 当前显示多少条
        'pagesize': 2
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      editDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''

      },
      // 添加表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在3到10个字之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '用户名长度在6到15个字之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: 'checkEmail', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: 'checkMobile', trigger: 'blur' }
        ]
      },
      editForm: {},
      // 编辑修改校验规则
      editFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在3到10个字之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: 'checkEmail', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: 'checkMobile', trigger: 'blur' }
        ]

      }

    }
  },
  components: {
    // userDialog// 对话框
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取用户列表
    async getList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听pagesize改变的事件
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getList()
    },
    // 状态改变
    async status (userInfo) {
      console.log(userInfo)
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      // console.log(res)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('状态更新成功')
    },
    // 监听表单的关闭事件，将里面内容重置
    addDiaglogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击添加对表单进行预校验
    addUser () {
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.post('users', this.addForm)
        // console.log(vaild)
        // console.log(res)
        if (res.meta.status !== 201) { return this.$message.error('创建用户失败') }
        this.$message.success('添加用户成功')
        // 隐藏对话框
        this.dialogVisible = false
        this.getList()
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('users/' + id)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户信息失败')
      this.$message.success('获取用户信息成功')
      this.editForm = res.data
      this.editDialogVisible = true
    }

  }
}
</script>

<style lang="less" scoped>

</style>
