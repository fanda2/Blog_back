<template>
  <div class="container">
    <div class="login">
      <div class="title">邮箱登录</div>
      <el-form
        :model="ruleForm2"
        status-icon
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱号" prop="email"  :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]">
          <el-input
            type="text"
            v-model="ruleForm2.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm2.checkPass"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        email: "",
        checkPass: "",
      },
    };
  },
  methods: {
    //提交表单数据
    submitForm(formName) {
     console.log("点击登录")
     this.$router.push('/wel');
    },
    //重置表单数据
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
    position: relative;
   width: 100%;
   height: 100%;
   background: url("../img/bg1.jpg") 50% fixed;
  // background: skyblue;
  background-size: cover;
}
.login {
  width: 400px;
  height: 260px;
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
   transform: translate(-50%,-50%);
  border-radius: 5px;
  .title{
    line-height: 60px;
    font-size: 24px;
    text-align: center;
    color: #3C3C3C;
    font-weight: bold;
    letter-spacing: 4px;
  }
}
.el-form{
  width: 90%;
  margin: 0 auto;
  color: white;
  }
  .el-button{
    float: right;
    margin: 0 20PX;
  }
</style>
