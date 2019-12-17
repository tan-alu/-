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
              class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button>添加用户</el-button>
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
                  <el-switch v-model="scope.row.mg_state"></el-switch>
                </template>
              </el-table-column>
              <el-table-column  label="操作" width="180">
                <!-- <template slot-scope="scope"> -->
                  <!-- {{scope.row}} -->
                <el-row :gutter="20">
                  <!-- 修改 -->
                  <el-col :span="8">
                    <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
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
                <!-- </template> -->
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
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        'query': '',
        // 当前页数
        'pagenum': 1,
        // 当前显示多少条
        'pagesize': 2
      },
      userList: [],
      total: 0

    }
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
    }
  }

}
</script>

<style lang="less" scoped>

</style>
