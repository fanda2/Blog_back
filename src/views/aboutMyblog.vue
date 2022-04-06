<template>
  <div>
    <div id="main">
      <mavon-editor v-model="form.content" />
    </div>
    <el-button type="primary" @click="updatePost">发布文章</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
          title:"",
          description:"",
          content:"",
          cover:"",

      }
    };
  },
  methods: {
    //修改哦文章信息
    async updatePost(){
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("title",this.form.title); //接口需要传的参数
      formData.append("description",this.form.description); //接口需要传的参数
      formData.append("content",this.form.content); 
      formData.append("cover",this.form.cover); 
      formData.append("postid",6); 
      var result = await this.$http.post("/post/update_post", formData);
       if (result.status == 200) {
          this.$message({
          message: '修改信息成功',
          type: 'success'
        });
        this.PostGet();  //再次加载页面
      }else{
           this.$message({
          message: '修改信息失败，请稍后重试',
          type: 'warning'
        });
      }
    },
    //获取文章信息
    async getpost() {
      var result = await this.$http.get("/post/post_byId", {
        params: {
          postid: 6,
        },
      });
      if (result.status == 200) {
        this.form = result.data.row2;
      } else {
        this.$Message.error("请检查网络或稍后重试");
      }
    },
    //文件上传
    uploadfile(response, file, fileList) {
      console.log(response, file, fileList);
    },
  },
  created()
  {
      this. getpost();
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  .top {
    height: 600px;
    width: 100%;
    background: skyblue;
  }
  .form {
    width: 90%;
    height: 100px;
    padding: 10px 0;
  }
}
.el-input {
  width: 500px;
}
#main {
  min-height: 700px;
}
.mavon-editor {
  height: 700px !important;
}
.el-button {
  width: 100%;
  height: 50px;
  margin: 20px 0;
}
</style>
