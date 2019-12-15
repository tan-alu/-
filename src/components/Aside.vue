// 侧边栏
<template>
    <!-- 导航 -->
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="rgba(0,0,0,0)"
        text-color="salmon"
        active-text-color="#ffd04b">
        <el-submenu index="1">
            <!-- 一级菜单 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template>
            <!-- 二级菜单 -->
            <el-submenu index="1-4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
            </el-submenu>
        </el-submenu>
    </el-menu>

</template>
<script>
export default {

}
</script>
<style lang="less" scoped>

</style>
