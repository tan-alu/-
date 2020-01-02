// 商品列表
<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- card区域 -->
      <el-card>
        <!-- 添加商品搜索功能 -->
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getList">
              <el-button slot="append" icon="el-icon-search" @click="getList" ></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
             <el-button @click="goAddpage">添加商品</el-button>
          </el-col>
        </el-row>
        <!-- 表格数据开始 -->
        <el-table
          :data="goodList"
          style="width: 100%"
          border
          stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column label="商品价格（元）" prop="goods_price" width="95px"></el-table-column>
          <el-table-column label="商品数量" prop="goods_weight" width="70px"></el-table-column>
          <el-table-column label="创建时间" prop="add_time" width="140px"></el-table-column>
          <el-table-column label="操作" width="130px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteGoods(scope.row.goods_id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格数据结束 -->
        <!-- 分页功能 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      goodList: [],
      // 查询参数对象
      queryInfo: {
        'query': '',
        // 当前页数
        'pagenum': 1,
        // 当前显示多少条
        'pagesize': 10
      },
      total: 0

    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 商品列表数据
    async getList () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.$message.success('获取商品列表成功')
      // 赋值给表格数据
      this.goodList = res.data.goods
      this.total = res.data.total
    },

    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getList()
    },
    // 根据Id删除对应的商品
    async deleteGoods (id) {
      // console.log(1)
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(result)
      if (result !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const { data: res } = await this.$http.delete(`goods/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getList()
    },
    // 添加商品通过编程时导航跳转到新页面
    goAddpage () {
      this.$router.push('/goods/add')
    }

  }

}
</script>

<style lang="less" scoped>
// .el-input{
//   width: 300px;

// }

</style>
