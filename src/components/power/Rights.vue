<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card视图 -->
    <el-card>
        123
    </el-card>

    </div>
</template>
<script>
export default {
  data () {
    return {
      // 权限列表
      rightsList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    async getList () {
      const { data: res } = await this.$http.get('rights/list')
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取列表失败')
      }
      this.$message.success('获取列表成功')
      this.rightsList = res.data
    }
  }

}
</script>

<style lang="less" scoped>

</style>
