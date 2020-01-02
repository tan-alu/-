// 添加商品组件页面
<template>
    <div>
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- card区域 -->
      <el-card>
          <!-- 警告 -->
            <el-alert
                title="添加商品信息"
                type="info"
                center
                :closable="false"
                show-icon>
            </el-alert>
            <!-- 步骤条 -->
            <el-steps :space="200" :active="activeIndex" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>

            </el-steps>

      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0
    }
  }

}
</script>
<style lang="less" scoped>

</style>
