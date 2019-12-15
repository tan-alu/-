// 侧边栏
<template>
    <!-- 导航 -->
    <el-menu
        background-color="rgba(0,0,0,0)"
        text-color="salmon"
        active-text-color="#409EFF"
        unique-opened="true">
        <!-- 一级菜单 -->
        <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id">
            <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-submenu
                index="1-4-1"
                v-for="subItem in item.children"
                :key="subItem.id">
                <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <!-- 文字 -->
                    <span>{{subItem.authName}}</span>
                </template>
            </el-submenu>
        </el-submenu>
    </el-menu>

</template>
<script>
export default {
  data () {
    return {
      // 菜单列表数据
      menulist: [],
      // 一级菜单图标
      iconObj: {
        '125': 'iconfont iconwode',
        '101': 'iconfont icontouxiang',
        '103': 'iconfont iconkucunchaxun1',
        '102': 'iconfont iconguadan',
        '145': 'iconfont iconbaobiao'

      }

    }
  },
  created () {
    this.getList()
  },
  methods: {
    //   获取菜单数据
    async getList () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.data.msg)
      this.menulist = res.data
    }

  }

}
</script>
<style lang="less" scoped>
.iconfont{
    padding-right:20px;
    color: salmon;
}
.el-menu{
    border-right:0
}

</style>
