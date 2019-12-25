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
                style="width: 100%"
                border
                stripe>
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
                    <template slot-scope="scope">
                        <pre>{{scope.row}}</pre>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cat_level"
                    label="排序">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="12">
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editDialog(scope.row.id)">编辑</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRoles(scope.row.id)">删除</el-button>
                            </el-col>
                        </el-row>
                    </template>

                </el-table-column>
            </el-table>
            <!-- 分页 -->
        </el-card>

    </div>
</template>
<script>

export default {
  data () {
    return {
      // 商品列表数据
      goodList: [],
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取商品列表
    async getList () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.$message.success('获取商品列表成功')
      this.goodList = res.data.result
      //   为总数据条数赋值
      this.total = res.data.total
    }

  }

}
</script>
<style lang="less" scoped>

</style>
