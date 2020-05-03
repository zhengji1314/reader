<template>
  <el-container>
    <el-aside :width="isCollapse?'65px': '200px'">
      <el-menu :collapse="isCollapse" default-active="2" class="el-menu-vertical-demo" background-color="#323745"
        text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false" router>
        <el-menu-item index="/shouye" :style="{width:isCollapse?'65px': '200px'}">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>

    <!--    <el-menu-item index="/bookList" :style="{width:isCollapse?'65px': '200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">作品管理</span>
        </el-menu-item> -->

       <el-submenu index="/bookList" :style="{width:isCollapse?'65px': '200px'}">
           <template slot="title">
          <i class="el-icon-menu"></i>
          <span>作品管理</span>
        </template>
        <el-menu-item index="/bookList">我的作品</el-menu-item>
        <el-menu-item index="/material">素材管理</el-menu-item>
       </el-submenu>

        <el-menu-item index="/audit" :style="{width:isCollapse?'65px': '200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">审核管理</span>
        </el-menu-item>

        <el-menu-item index="/bookrack" :style="{width:isCollapse?'65px': '200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">我的书架</span>
        </el-menu-item>
        <el-menu-item index="/account" :style="{width:isCollapse?'65px': '200px'}">
          <i class="el-icon-setting"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="fl">
          <i :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
          <span style="font-size: 20px;margin-left: 50px;">悦读中文网,开始你的阅读生活</span>
        </div>
        <div class="fr">
            <el-button @click="loginOut" style="margin-right: 10px;">退出</el-button>
        </div>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
      name: "home",
    data() {
      return {
        row:'',
        isCollapse: false,
        tmpname: '', // 临时账户名称
        tmpphoto: '' // 临时账户头像
      }
    },
    created() {
        this.rou = this.$route.path
        console.log(this.rou)
    },
    methods: {

      loginOut() {
        this.$confirm("确定退出登录吗？", "提示", {
        	confirmButtonText: "确定",
        	cancelButtonText: "取消",
        	type: "warning"
        }).then(() => {
            this.$message({
            	type: "success",
            	message: "已退出"
            });
            window.localStorage.removeItem('userInfo')
            this.$router.push('/login');
        }).catch(() => {
        	this.$message({
        		type: "info",
        		message: "已取消"
        	});
        });
      },
    },
  }
</script>

<style lang="less" scoped>
  .el-container {
    height: 100%;

    .el-aside {
      background-color: rgb(50, 55, 69);
    }

    // 头部样式
    .el-header {

      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      min-width: 800px;

      .fl {
        height: 100%;
        width: 40%;

        display: flex;
        align-items: center;
      }

      .fr {
        height: 100%;
        width: 50%;

        display: flex;
        justify-content: flex-end;
        align-items: center;

        .el-dropdown-link {
          display: flex;
          align-items: center;
        }
      }
    }

    .el-main {
      background-color: rgb(242, 243, 245);
    }
  }
</style>
