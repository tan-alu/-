// 分类参数
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- card视图 -->
        <el-card>
            <!-- 警示标语 -->
            <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon :closable="false"></el-alert>
            <!-- 选择商品分类区域 -->
            <el-row class="goods_allot">
                <el-col :span="4"><span>选择商品分类：</span></el-col>
                <el-col :span="20">
                    <el-cascader
                        v-model="selectedCateKeys"
                        expand-trigger="hover"
                        :options="cateList"
                        :props="cateProps"
                        @change="handleChange"></el-cascader>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 商品分类列表
      cateList: [],
      //   级联选择框的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定的数据
      selectedCateKeys: []

    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 列表数据
    async getList () {
      const { data: res } = await this.$http.get('categories')
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      this.$message.success('获取商品分类成功')
      this.cateList = res.data
    },
    // 级联选择器变化
    handleChange () {
      console.log(this.selectedCateKeys)
    }

  }

}
</script>

<style lang="less" scoped>
.goods_allot{
    margin-top: 20px;
}

</style>
