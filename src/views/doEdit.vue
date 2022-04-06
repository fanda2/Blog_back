<template>
  <div class="content">
    <div class="top">
      <div class="form">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="form"
        >
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="文章描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="是否原创">
            <el-radio-group v-model="form.originality">
              <el-radio label="是"></el-radio>
              <el-radio label="非原创"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="form.practice">
              <el-radio label="普通文章"></el-radio>
              <el-radio label="实战文章"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文件上传">
            <el-upload
              class="upload-demo"
              drag
              action="http:www.fjtbkyc.net:3000/file/upload"
              :file-list="fileList"
              :show-file-list="true"
              :multiple="false"
              :on-success="uploadfile"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签" prop="type">
            <el-checkbox-group v-model="form.tags">
              <el-checkbox label="node" name="type"></el-checkbox>
              <el-checkbox label="vue" name="type"></el-checkbox>
              <el-checkbox label="Css" name="type"></el-checkbox>
              <el-checkbox label="JavaScript" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="photo"></div>
    </div>
    <div id="main">
      <mavon-editor v-model="value" />
    </div>
    <el-button type="primary" @click="sendpost">发布文章</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      labelPosition: "right",
      fileList: [],
      cover:"232323",
      categories:"学习笔记",
      form: {
        title: "",
        description: "",
        originality: "是",
        practice: "普通文章",
        tags: [],
      },
    };
  },
  methods: {
    //发布文章
     async sendpost() {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("title",this.form.title); //接口需要传的参数
      formData.append("description",this.form.description); //接口需要传的参数
      formData.append("content",this.value); 
      formData.append("cover",this.cover); 
      formData.append("tags",this.form.tags); 
      formData.append("categories",this.categories); 
      var result = await this.$http.post("/post/put_post", formData);
       if (result.status == 200) {
          this.$message({
          message: '上传成功',
          type: 'success'
        });
      }else{
           this.$message({
          message: '发布文章信息失败，请稍后重试',
          type: 'warning'
        });
      }
    },
    //文件上传
    uploadfile(response, file, fileList){
        console.log(response, file, fileList);
    }
  },
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
