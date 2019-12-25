// 商品分类
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- card卡片区域 -->
        <el-card>
            <el-button>添加分类</el-button>
            <!-- 表格数据 -->
            <el-table
                :data="goodList"
                style="width: 100%">
                 <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="cat_name"
                    label="分类名称">
                </el-table-column>
                <el-table-column
                    prop="cat_deleted"
                    label="是否有效"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="cat_level"
                    label="排序">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作">
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>
<script>

export default {
  data () {
    return {
      // 商品列表数据
      goodList: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取商品列表
    async getList () {
      const { data: res } = await this.$http.get('categories')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.$message.success('获取商品列表成功')
      this.goodList = res.data
    }

  }

}
</script>
<style lang="less" scoped>

</style>
