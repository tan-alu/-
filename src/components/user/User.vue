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
      </el-card>
      <!-- 分页 -->
    </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        'query': '',
        'pagenum': 1,
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
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = res.data.users
      this.total = res.data.total
    }

  }

}
</script>

<style lang="less" scoped>

</style>
