<template>
  <div class="box">
    <el-drawer
      title="个人信息"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handsleClose"
    >
      <div class="content">
        <div class="inbox">
          <label class="tab">姓名:</label><span>{{ username }}</span>
        </div>
        <div class="inbox">
          <label class="tab">账号:</label><span>{{ number }}</span>
        </div>
        <div class="inbox">
          <label class="tab">所属部门:</label><span>{{ branch }}</span>
        </div>
      </div>
    </el-drawer>
    <el-container>
      <el-header>
        <span>
          <i v-if="!isCollapse" @click="btn1" class="el-icon-s-fold"></i>
          <i v-if="isCollapse" @click="btn2" class="el-icon-s-unfold"></i
        ></span>
        <span style="font-size: 24px">fandaBlog后台管理系统</span>
        <div class="right">
          <span>欢迎：</span><span>{{ username }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="myinfo"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item @click.native="path2"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- <el-button type="info" plain >退出系统</el-button> -->
      </el-header>
      <el-container>
        <el-menu
          :default-active="path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :unique-opened="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="wel" class="el-icon-document-delete"
            >系统首页</el-menu-item
          >
          <el-menu-item index="1-2" class="el-icon-document-checked"
            >用户管理</el-menu-item
          >
          <el-menu-item index="edit" class="el-icon-s-finance"
            >文章发布</el-menu-item
          >
          <el-menu-item index="adminpost" class="el-icon-s-data"
            >文章管理</el-menu-item
          >
          <el-menu-item index="1-5" class="el-icon-s-finance"
            >友链管理</el-menu-item
          >
          <el-menu-item index="aboutme" class="el-icon-s-flag"
            >关于本站</el-menu-item
          >
          <el-menu-item index="1-7" class="el-icon-s-data"
            >时间线</el-menu-item
          >
          <el-menu-item index="1-8" class="el-icon-s-finance"
            >评论管理</el-menu-item
          >
          <el-menu-item index="1-9" class="el-icon-s-flag"
            >图库</el-menu-item
          >
         
        </el-menu>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: sessionStorage.getItem("path"),
      isCollapse: false,
      username: "Admin",
      number: "2003441",
      branch: "计算机与软件工程学院",
      showcontrol: false,
      drawer: false,
      direction: "rtl",
    };
  },
  methods: {
    // 退出系统的方法
    path2() {
      console.log("点击");
      this.$router.push("/");
      localStorage.clear();
      sessionStorage.clear();
    },
    //查看个人信息
    myinfo() {
      this.drawer = true;
    },
    handsleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //展开或关闭侧边栏
    btn1() {
      this.isCollapse = true;
    },
    btn2() {
      this.isCollapse = false;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  width: 100%;
  position: absolute;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
// .el-aside:not(.el-menu--collapse) {
//   width: 50px !important;
//   //   min-height: 400px;
// }
.content {
  width: 80%;
  margin: 0 auto;
  .inbox {
    width: 100%;
    height: 50px;
    font-size: 24px;
    .tab {
      font-weight: bold;
      width: 100px;
    }
    span {
      margin-left: 20px;
    }
  }
}
.el-container {
  height: 96%;
}
.el-header {
  margin: 0;
  background-color: #294a4d;
  color: #333;
  line-height: 120px;
  span {
    float: left;
    display: block;
    padding-left: 30px;
    line-height: 60px;
    font-size: 30px;
    color: white;
  }
  .el-button {
    float: right;
    margin-top: 10px;
    margin-right: 50px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.right {
  height: 60px;
  line-height: 60px;
  float: right;
  color: white;
  margin-right: 80px;
  span {
    font-size: 18px;
    padding-left: 10px;
  }
  img {
    width: 30px;
    height: 30px;
    margin: 15px;
  }
}
.el-aside {
  width: 220px !important;
  background-color: #5c7a6f;
  height: 90%;
  .el-menu {
    border: 0;
  }
  .el-submenu {
    width: 220px;
  }
}
.el-main {
  
  background-color: #ebeef5;
}
.el-menu-item {
  width: 200px;
}
a {
  color: rgb(44, 44, 44);
  text-decoration: none;
}

.copyright {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;
  line-height: 40px;
  background-color: rgb(170, 170, 170);
  color: white;
}
</style>
