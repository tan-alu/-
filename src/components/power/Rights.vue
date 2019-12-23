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
        <el-table :data="rightsList">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="权限名称" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="权限等级" prop="level"></el-table-column>

        </el-table>
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
    //   console.log(this.rightsList)
    }
  }

}
</script>

<style lang="less" scoped>

</style>
