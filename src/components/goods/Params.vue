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
            <!-- 动态参数，静态参数 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 动态参数 -->
                <el-tab-pane label="动态参数" name="many">
                    <el-button size="mini" :disabled="isBtnDisable">添加参数</el-button>
                </el-tab-pane>
                <!-- 静态参数 -->
                <el-tab-pane label="静态参数" name="only">
                    <el-button size="mini" :disabled="isBtnDisable">添加参数</el-button>
                </el-tab-pane>
            </el-tabs>
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
      selectedCateKeys: [],
      //   被激活的页签
      activeName: 'many',
      // 动态参数的数据
      manyTable: [],
      // 静态参数的数据
      onlyTable: []

    }
  },
  mounted () {
    this.getList()
  },
  computed: {
    //   只有在选择商品分类的时候，添加参数的按钮才可以操作
    isBtnDisable () {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    // 当前选中的三级分类的Id
    cateId () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    }

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
    // 级联选择器变化,触发函数
    async handleChange () {
      this.getParamsData()
    },
    // tabs切换
    handleClick (tab, event) {
      console.log(tab, event)
      this.getParamsData()
    },
    // 获取参数的列表数据
    async getParamsData () {
      // 实现只有在是三级分类的时候才能够被选择，否则就被清空
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        return
      }
      //   console.log(this.selectedCateKeys)
      // 根据所选分类Id获取当前参数
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
        { params: { sel: this.activeName } })
      //   console.log(res)
      if (res.meta.status !== 200) this.$message.error('获取参数列表失败')
      this.$message.success('获取参数列表成功')
      if (this.activeName === 'many') {
        this.manyTable = res.data
      } else {
        this.onlyTable = res.data
      }
    }

  }

}
</script>

<style lang="less" scoped>
.goods_allot{
    margin-top: 20px;
}
.el-tabs{
    margin-top:15px;
}

</style>
