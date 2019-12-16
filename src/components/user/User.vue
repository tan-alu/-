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

    }
  }

}
</script>

<style lang="less" scoped>

</style>
