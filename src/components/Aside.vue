// 侧边栏
<template>
    <!-- 导航 -->
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="rgba(0,0,0,0)"
        text-color="salmon"
        active-text-color="#ffd04b">
        <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id">
            <!-- 一级菜单 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-submenu
                index="1-4-1"
                v-for="subItem in item.children"
                :key="subItem.id">
                <template slot="title">
                    <i class="el-icon-location"></i>
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
      menulist: []
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

</style>
