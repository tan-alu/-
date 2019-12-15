<template>
  <el-container class="container_box">
      <!-- 头部区域 -->
    <el-header>
        <div>
            <img src="../assets/logo.jpg" alt="">
            <span>后台管理系统 </span>
        </div>
        <el-button type="danger" plain size="small" @click='exit'>退 出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
        <!-- 左侧 -->
        <el-aside width="200px">
            <a-side></a-side>
        </el-aside>
        <!-- 内容中心 -->
        <el-main>Main</el-main>
    </el-container>
</el-container>
</template>

<script>
// 导入侧边栏
import aSide from '../components/Aside'
export default {
  data () {
    return {

    }
  },
  components: {
    aSide
  },
  methods: {
    // 退出
    exit () {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    }
  }

}
</script>

<style lang="less" scoped>
.container_box{
    height: 100%;
}

.el-header{
    background-color: salmon;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    align-items: center;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        span{
            margin-left: 20px;
        }
    }

}
.el-aside{
    background-color: pink;
}
.el-main{
    background-color: #eee;
}
</style>
