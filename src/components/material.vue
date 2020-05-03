<template>
  <div class="box-card">
    <!--命名插槽，头部内容设置-->
    <div slot="header" class="clearfix">
      <span style="font-size: 20px;font-weight: 700;">素材管理</span>
             <!--
        默认上传动作
        1. action设置地址
        2. 需要传递token信息，通过headers属性设置
        3. 通过name属性设置被上传图片的传递名字,服务器端要求是image
        4. :show-file-list="false" 禁止形成列表效果
        5. on-success 文件上传成功后回调处理
      -->
       <el-upload
        style="float: right; padding: 3px 0"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="setToken"
        name="image"
        :show-file-list="false"
        :on-success="onSuccess"
      >
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
    </div>

     <!--匿名插槽，卡片主体内容-->
    <div class="text item">
      <ul>
        <li class="image-box" v-for="item in imageList" :key="item.id">
          <img :src="item.url" alt>
          <div class="image-bot">
            <el-button type="danger" icon="el-icon-delete" @click="deleteImg(item.id)" circle></el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {image , getImage ,deleteImg} from "../fetch";
export default {
  name: 'Material',
  data () {
    return {
        userid:'',
      // 接收素材图片列表
      imageList: [],

      querycdt: {
        collect: false,
        page: 1,
        per_page: 20
      }
    }
  },
  // 计算属性
  computed: {
    setToken () {
      let id = this.token
      return { Authorization: 'Bearer ' + id }
    }
  },
  created () {
      this.userid = JSON.parse(localStorage.getItem('userInfo')).id
    this.getImageList()
  },

  methods: {
      // 删除素材图片
      deleteImg(id) {
          this.$confirm("确定从素材库删除此图片吗？", "提示", {
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	type: "warning"
          }).then(() => {
              deleteImg(id).then(res => {
                  console.log(res);
                  this.getImageList()
              })
          }).catch(() => {
          	this.$message({
          		type: "info",
          		message: "已取消"
          	});
          });

      },
    //获取素材图片
    getImageList () {
        getImage(this.userid).then(res => {
            console.log(res);
            this.imageList = res;
        })
    },
    // 回调函数
    onSuccess (res) {
      this.$message.success('图片上传成功')
      console.log(res)
      image({
          userid:this.userid,
          id:res.data.id,
          url:res.data.url
      }).then(res => {
        this.getImageList()
      })

    }
  }
}
</script>

<style lang="less" scoped>

// 素材图片列表样式
.box-card {
    // height:calc(100vh);
}
.image-box {
  list-style: none;
  width: 150px;
  height: 200px;
  background-color: #fff;
  margin: 30px 10px;
  float: left;
  border: 1px solid #eee;
  img {
    width: 150px;
    height: 200px;
  }
  .image-bot {
    width: 150px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
