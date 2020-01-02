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
                    <el-button
                      size="mini"
                      :disabled="isBtnDisable"
                      @click="addParams"
                      >添加参数</el-button>
                    <!-- 动态参数表格 -->
                    <el-table :data="manyTable" border stripe>
                      <el-table-column type="expand">
                        <template slot-scope="scope">
                          <!-- 渲染循环出来的数据 -->
                          <el-tag v-for="(item,i) in scope.row.attr_vals"
                            :key="i"
                            closable
                            @close="handleClose(i,scope.row)">{{item}}</el-tag>
                            <!-- New Tag -->
                            <el-input
                              class="input-new-tag"
                              v-if="scope.row.inputVisible"
                              v-model="scope.row.inputValue"
                              ref="saveTagInput"
                              size="small"
                              @keyup.enter.native="handleInputConfirm(scope.row)"
                              @blur="handleInputConfirm(scope.row)"
                            >
                            </el-input>
                            <el-button
                              v-else class="button-new-tag"
                              size="small"
                              @click="showInput(scope.row)">+ New Tag</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column type="index"></el-table-column>
                      <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="editDialog(scope.row.attr_id)"
                          >编辑</el-button>
                          <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="deleteParams(scope.row.attr_id)"
                            >删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 静态参数 -->
                <el-tab-pane label="静态参数" name="only">
                    <el-button size="mini" :disabled="isBtnDisable" @click="addParams">添加属性</el-button>
                    <!-- 静态参数表格 -->
                    <el-table :data="onlyTable" border stripe>
                      <el-table-column type="expand">
                        <template slot-scope="scope">
                          <!-- 循环数据 -->
                          <el-tag v-for="(item,i) in scope.row.attr_vals"
                            :key="i"
                            closable>{{item}}</el-tag>
                            <!-- New Tag -->
                            <el-input
                              class="input-new-tag"
                              v-if="scope.row.inputVisible"
                              v-model="scope.row.inputValue"
                              ref="saveTagInput"
                              size="small"
                              @keyup.enter.native="handleInputConfirm(scope.row)"
                              @blur="handleInputConfirm(scope.row)"
                            >
                            </el-input>
                            <el-button
                              v-else class="button-new-tag"
                              size="small"
                              @click="showInput(scope.row)">+ New Tag</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column type="index"></el-table-column>
                      <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="editDialog(scope.row.attr_id)"
                          >编辑</el-button>
                          <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="deleteParams(scope.row.attr_id)"
                            >删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 添加参数对话框 -->
        <el-dialog
          :title="'添加'+titleText"
          :visible.sync="addParamsDialogVisible"
          width="50%"
          @close="addParamsClosed"
         >
          <el-form
            :model="addParamsForm"
            ref="addParamsFormRef"
            :rules="addParamsFormRules"
            label-width="80px"
            >
            <el-form-item :label="titleText" prop="attr_name">
              <el-input v-model="addParamsForm.attr_name"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addParamsDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addParamsSure">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改参数对话框 -->
        <el-dialog
          :title="'修改'+titleText"
          :visible.sync="editParamsDialogVisible"
          width="50%"
          @close="editParamsClosed"
         >
          <el-form
            :model="editParamsForm"
            ref="editParamsFormRef"
            :rules="editParamsFormRules"
            label-width="80px"
            >
            <el-form-item :label="titleText" prop="attr_name">
              <el-input v-model="editParamsForm.attr_name"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editParamsDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editParams">确 定</el-button>
          </span>
        </el-dialog>
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
      onlyTable: [],
      // 添加动态参数对话框
      addParamsDialogVisible: false,
      // 动态表单的数据
      addParamsForm: {
        attr_name: ''
      },
      // 动态表单的数据规则
      addParamsFormRules: {
        attr_name: [
          { required: true,
            message: '请输入参数名称',
            trigger: 'blur' }]

      },
      // 编辑页面对话框
      editParamsDialogVisible: false,
      // 编辑页面数据
      editParamsForm: {},
      // 规则
      editParamsFormRules: {
        attr_name: [
          { required: true,
            message: '请输入参数名称',
            trigger: 'blur' }]
      }

    }
  },
  created () {
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
    },
    // 动态计算标题文本
    titleText () {
      if (this.activeName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
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
        this.manyTable = []
        this.onlyTable = []
        return
      }
      //   console.log(this.selectedCateKeys)
      // 根据所选分类Id获取当前参数
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
        { params: { sel: this.activeName } })
      // console.log(res)

      if (res.meta.status !== 200) this.$message.error('获取参数列表失败')
      this.$message.success('获取参数列表成功')
      // 遍历
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        // console.log(item.attr_vals.split(','))
        // 控制文本框的显示与隐藏
        item.inputVisible = false
        // 文本框中输入的字
        item.value = ''
      })
      if (this.activeName === 'many') {
        this.manyTable = res.data
      } else {
        this.onlyTable = res.data
      }
    },
    // 添加动态参数对话框的点击事件
    addParams () {
      this.addParamsDialogVisible = true
    },
    // 关闭参数对话框
    addParamsClosed () {
      // 关闭之后重置
      this.$refs.addParamsFormRef.resetFields()
    },
    // 点击按钮，添加参数
    addParamsSure () {
      // 表单数据预验证
      this.$refs.addParamsFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        // 发起请求
        // 级联选择框，选择的id
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`,
          { params: {
            attr_name: this.addParamsForm.attr_name,
            attr_sel: this.activeName
          } })
        // console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('失败')
        }
        this.$message.error('成功')
      })
    },
    // 点击编辑按钮，弹出对话框
    async editDialog (attrId) {
      // 查询当前参数的信息
      const { data: res } =
      await this.$http.get(`categories/${this.cateId}/attributes/${attrId}`, {
        attr_name: this.editParamsForm.attr_name,
        attr_sel: this.activeName
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取参数信息失败')
      }
      this.$message.success('获取参数信息成功')
      this.editParamsForm = res.data
      this.editParamsDialogVisible = true
    },
    // 关闭编辑对话框页面，重置表单数据
    editParamsClosed () {
      // 重置表单数据
      this.$refs.editParamsFormRef.resetFields()
    },
    // 点击确认，发送数据
    editParams () {
      this.$refs.editParamsFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editParamsForm.attr_id}`,
          {
            attr_name: this.editParamsForm.attr_name,
            attr_sel: this.activeName
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('获取参数信息失败')
        }
        this.$message.success('获取参数信息成功')
        this.getList()
        this.editParamsDialogVisible = false
      })
    },
    // 根据Id删除对应的参数项
    async deleteParams (attrId) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      // 取消操作
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 删除的业务逻辑
      const { data: res } =
      await this.$http.delete(` categories/${this.cateId}/attributes/${attrId}`
      )
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('删除参数信息失败')
      }
      this.$message.success('删除参数信息成功')
      this.getParamsData()
    },
    // 文本框失去焦点，或者按了enter之后触发
    handleInputConfirm (row) {
      // console.log(11)
      // let inputValue = this.inputValue
      // if (inputValue) {
      //   this.dynamicTags.push(inputValue)
      // }
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 如果没return 则证明输入的内容，需要做后续处理
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      this.saveAttrVal(row)
    },
    // 将对attr_vals保存到数据库里
    async saveAttrVal (row) {
      // 发起请求，保存操作
      const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(',')
      })
      if (res.meta.status !== 200) {
        return this.$message.error('修改参数失败')
      }
      this.$message.success('修改参数成功')
    },
    // 点击输入文本框
    showInput (row) {
      row.inputVisible = true
      // 让文本框自动获得焦点
      // $nextTick方法：当页面上的元素被重新渲染之后，才会制定回调函数中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除对应的参数操作
    handleClose (i, row) {
      row.attr_vals.splice(i, 1)
      this.saveAttrVal(row)
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
.el-tag{
  margin: 10px;
}
.input-new-tag{
  width: 120px;
}
</style>
