<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.jpg" alt="">
            </div>
            <!-- 表单区域 -->
            <el-form>
                <el-form-item label="密码" prop="pass">
                    <!-- <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input> -->
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.login_container {
    background-color: pink;
    height: 100%;
}
.login_box {
    background-color: #fff;
    width: 400px;
    height: 300px;
    border-radius: 3px;
    position: relative;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding:10px;
    background-color:#fff ;
    position:absolute;
    left: 50%;
    transform:translate(-50%,-50%);
    box-shadow: 0 0 10px #ddd;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
}
}

</style>
