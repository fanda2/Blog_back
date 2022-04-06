<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <!-- 表头显示信息 -->
    <div class="btn">
      <el-input v-model="stuNo" placeholder="请输文章名称查询"></el-input>
      <el-button type="primary"  icon="el-icon-search"
        >查询</el-button
      >
      <div class="tab">
        <el-table :data="tableData" border>
          <el-table-column
            prop="post_id"
            label="ID"
            width="60"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="文章描述"
            min-width="100"
          ></el-table-column>
          <el-table-column prop="cover" label="封面图" width="200">
            <!--插入图片链接的代码-->
            <template slot-scope="scope">
              <img
                :src="scope.row.cover"
                alt=""
                style="width: 190px; height: 80px"
                @click="previewPic(scope.row.cover)"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="tags"
            label="标签"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="seenum"
            label="Hot"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="评论数"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="stime"
            label="发布时间"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="stime"
            label="是否允许展示"
            width="160"
          ></el-table-column>

          <el-table-column prop="控制" label="控制" width="180">
            <template slot-scope="item">
              <el-button type="primary" icon="el-icon-edit"    @click="idGet2(item.row)"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="idGet3(item.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        :modal="false"
        title="图片预览"
        width="50%"
      >
        <img :src="previewpic" alt="" width="100%" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="num"
    ></el-pagination>

    <div class="edit">
      <div class="line"></div>
        <div class="form">
        <el-form
          label-position="left"
          label-width="100px"
          :model="form"
        >
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="文章描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="文件上传" class="img">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
              :show-file-list="true"
              :multiple="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <div class="imgview" v-show="form.cover"><img :src="form.cover" alt=""></div>
          </el-form-item>
        </el-form>
      </div>
      <div id="main">
      <mavon-editor v-model="form.content" />
    </div>
    <el-button class="submit" type="primary" @click="updatePost">确认修改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: {
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据
        limit: 5,
      },
      tableData: [],
      stuNo: "",
      currentPage4: 1,
      num: 0,
      dialogVisible: false,
      previewpic: "",  //用于图片预览
      fileList:[], //文件上传本地路径
      form:{
          title:"",
          description:"",
          cover:"",
          content:"",
          post_id:0,
      }
    };
  },
  created() {
    this.PostGet();
  },
  methods: {
    //获取所有文章信息
    async PostGet() {
      const rLoading = this.openLoading(); //打开loading界面
      var result = await this.$http.get("/post/all_post", {
        params: {
          page: this.query.page,
          limit: this.query.limit,
        },
      });
      console.log(result);
      sessionStorage.setItem("path", "adminpost");
      rLoading.close();
      this.tableData = result.data.row;
      this.num = result.data.total;
    },
    //预览大图
    previewPic(url) {
      console.log("url", url);
      this.previewpic = url;
      this.dialogVisible = true;
    },
    //获取文章信息
    async getOne() {
      //返回顶部
      backTop();
      var result = await this.$http.get("/post/post_byId", {
        params: {
          postid: this.postid,
        },
      });
      if (result.status == 200) {
        this.form = result.data.row2;
      } else {
        this.$Message.error("请检查网络或稍后重试");
      }
    },
     //获取文章信息
    async getOne() {
      var result = await this.$http.get("/post/post_byId", {
        params: {
          postid: this.postid,
        },
      });
      if (result.status == 200) {
        this.form = result.data.row2;
        // var res=JSON.stringify(result.data.row2);
        console.log(result)
      } else {
        this.$Message.error("请检查网络或稍后重试");
      }
    },
    //修改哦文章信息
    async updatePost(){
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("title",this.form.title); //接口需要传的参数
      formData.append("description",this.form.description); //接口需要传的参数
      formData.append("content",this.form.content); 
      formData.append("cover",this.form.cover); 
      formData.append("postid",this.form.post_id); 
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
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // 同步修改data中的pagesize
      this.query.page = newSize;
      // 重新发起数据请求
      this.PostGet();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.PostGet();
    },
    idGet2(value){
      this.postid=value.post_id;
      this.getOne();
    },
  },
};
</script>
<style lang="less" scoped>
.el-table-column {
  color: black;
}
.el-table {
  height: 100%;
  width: 100%;
}
.el-pagination {
  padding-top: 20px;
  background-color: white;
}
.el-input {
  width: 300px;
  padding: 10px;
}
.btn {
  background-color: white;
  border-radius: 5px;
  .el-table {
    height: 100%;
    width: 98%;
    margin-left: 1%;
  }
  .tab {
    padding-top: 10px;
  }
}
.edit {
  min-height: 400px;
  background: skyblue;
  .line {
    height: 4px;
    border: 0;
    background-color: #ddd;
    margin: 20px 0;
    background-image: repeating-linear-gradient(
      -45deg,
      #fff,
      #ff5777 5px,
      transparent 0,
      transparent 8px
    );
  }
  .submit{
  width: 100%;
  height: 50px;
  margin: 20px 0;
  }
  .img{
     position: relative;
  }
  .imgview{
      width: 300px;
      height: 180px;
      border-radius: 10px;
      position: absolute;
      left: 380px;
      top: 0;
      overflow: hidden;
      img{
          width: 300px;
          height: 100%;
      }
  }
}
</style>
