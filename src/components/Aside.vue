// 侧边栏
<template>
  <el-aside :width="isCollapse ? '64px':'200px'" >
      <div class="toggle_box" @click="Collapse">|||</div>
      <!-- 导航 -->
      <el-menu
        text-color="salmon"
        active-text-color="#409BFF"
        :collapse="isCollapse"
        :collapse-transition="false"
        unique-opened
        :default-active="activePath"
        router
        >
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
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNav('/' + subItem.path)">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文字 -->
                  <span>{{subItem.authName}}</span>
              </el-menu-item>
          </el-submenu>
      </el-menu>
  </el-aside>
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
      },
      //   菜单是否折叠
      isCollapse: false,
      // 点击的菜单路径
      activePath: ''
    }
  },
  created () {
    this.getList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    //   获取菜单数据
    async getList () {
      const { data: res } = await this.$http.get('menus')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.data.msg)
      this.menulist = res.data
    },
    // 菜单是否折叠
    Collapse () {
      this.isCollapse = !this.isCollapse
    //   console.log(this.isCollapse)
    },
    // 保存二级菜单导航，高亮问题
    saveNav (activePath) {
      // 将点击的菜单路径保存到sessionStorage里
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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
.toggle_box{
  // background-color: #fff;
  text-align: center;
  font-size:10px;
  line-height: 24px;
  letter-spacing: .2em;
  cursor: pointer;
  border:1px solid salmon;
}

</style>
