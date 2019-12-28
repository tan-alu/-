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
            <el-button @click="addCategory">添加分类</el-button>
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
            <el-pagination
                class="treeTable"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[3, 5, 10, 15]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加分类对话框 -->
        <el-dialog
            title="添加分类"
            :visible.sync="dialogVisible"
            width="50%"
            @close="addCateDialogClosed">
            <el-form :model="addCateForm"
                ref="addCateRef"
                :rules="addCateRules"
                label-width="100px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input
                        placeholder="请输入内容"
                        v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类" >
                  <el-cascader
                    v-model="selectedKeys"
                    expand-trigger="hover"
                    :options="parenCatetList"
                    :props="cascaderProps"
                    style="width:100%;"
                    @change="parentsCateChange"
                    clearable
                    change-on-select
                   ></el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>

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
      ],
      // 添加分类对话框
      dialogVisible: false,
      // 表单验证规则
      addCateRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        // 分类的登记 默认要添加一级分类
        cat_level: 0
      },
      // 父级列表数据
      parenCatetList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 选中的父级分类的id数组
      selectedKeys: []
    }
  },
  mounted () {
    this.getList()
    // this.getParentList()
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
    },
    // 监听Pagesize改变
    handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      this.getList()
    },

    handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getList()
    },
    // 添加分类
    addCategory () {
    //   console.log('添加分类')
      this.getParentList()
      this.dialogVisible = true
    },
    // 获取父级分类列表
    async getParentList () {
      const { data: res } = await this.$http.get('categories',
        { params: { type: 2 } })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取父级数据失败')
      // this.$message.success('获取父级数据成功')
      this.parenCatetList = res.data
    },
    // 选择项发生变化的时候触发这个函数
    parentsCateChange () {
      console.log(this.selectedKeys)
      // 如果selectedKeys中数组中的Length大于0.就说明选中了父级分类，反之没选中
      if (this.selectedKeys.length > 0) {
        // 选择最后一项的索引
        // 父级分类的Id
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    // 添加分类对话框，点击确认按钮发送数据
    addCate () {
      // console.log(this.addCateForm)
      // 表单预验证
      this.$refs.addCateRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories',
          this.addCateForm)
        // console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('失败')
        }
        this.$message.success('成功')
        this.getList()
        this.dialogVisible = false
      })
    },
    // 监听对话框 关闭事件 重置表单数据
    addCateDialogClosed () {
      this.$refs.addCateRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    }

  }

}
</script>
<style lang="less" scoped>
.zk-table{
    margin-top:15px;
}

</style>
