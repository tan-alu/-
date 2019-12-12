<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.jpg" alt="">
            </div>
            <!-- 表单区域 -->
            <el-form class="form_box">
                <!-- 账户 -->
                <el-form-item class="input_box">
                    <el-input></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item class="input_box">
                    <el-input></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="button_box">
                    <el-button type="primary" size="small">登陆</el-button>
                    <el-button type="info" size="small">重置</el-button>
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
.form_box {
    width: 100%;
    height: 200px;
    position:absolute;
    bottom:0;

    .input_box{
        width: 100%;
        padding:0 20px;
        box-sizing: border-box;
    }

    .button_box{
        position: absolute;
        right: 0;
        padding:0 20px;
        box-sizing: border-box;

    }
}

</style>
