<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card卡片区域 -->
    <el-card>
        <el-table
            :data="roleList"
            border
            stripe
            >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    {{scope.row.id}}
                    <el-row >
                        <el-col :span="8">
                            <el-button type="primary" size="mini" icon="el-icon-edit" >编辑</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="danger" size="mini" icon="el-icon-delete" >删除</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="warning" size="mini" icon="el-icon-setting" >分配权限</el-button>
                        </el-col>
                    </el-row>

                </template>

            </el-table-column>
        </el-table>
    </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 角色列表
      roleList: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    //   获取角色列表数据
    async getList () {
      const { data: res } = await this.$http.get('roles')
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.$message.success('获取角色列表成功')
      this.roleList = res.data
    }
  }

}
</script>
<style lang="less" scoped>

</style>
