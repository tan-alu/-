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
            <tree-table
                :data="goodList"
                :columns="columns"
                :selection-type="false"
                :expand-type="false"
                :show-index="true"
                index-text="#"
                :show-row-hover="true"
                border>
                <!-- 是否有效 -->
                <template slot="isok" slot-scope="scope">
                    <i class="el-icon-success" v-if="scope.row.cat_deleted==true" style="color:lightgreen;"></i>
                    <i class="el-icon-error" v-else style="color:red;"></i>
                </template>
                <!-- 排序 -->
                <template slot="sort" slot-scope="scope">
                    <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
                    <el-tag v-else-if="scope.row.cat_level==1" type="success">二级</el-tag>
                    <el-tag v-else type="warning">三级</el-tag>
                </template>
                <!-- 是否操作 -->
                <template slot="operate" slot-scope="scope">
                    <el-row>
                       <el-col :span="12">
                          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editDialog(scope.row.id)">编辑</el-button>
                      </el-col>
                      <el-col :span="12">
                          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRoles(scope.row.id)">删除</el-button>
                      </el-col>
                    </el-row>
                </template>
            </tree-table>
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
      total: 0,
      columns: [
        { label: '分类名称',
          prop: 'cat_name' },
        { label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        { label: '排序',
          type: 'template',
          template: 'sort'
        },
        { label: '是否操作',
          type: 'template',
          template: 'operate'
        }
      ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取商品列表
    async getList () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      console.log(res)
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
.zk-table{
    margin-top:15px;
}

</style>
