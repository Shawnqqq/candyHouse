<template>
  <div class="container">
    <div class="header">
      <div class="title">海报页添加</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <div class="uploader">
        <p class="uploader-title">* 展示图</p>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="handleCover"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="path">
        <div class="path-title">* 跳转路径</div>
        <el-cascader
          style="width:300px;"
          :options="options"
          @change="changePath"
          clearable
        ></el-cascader>
      </div>
      <div class="submit-btn">
        <el-button type="success" @click="handleSubmit()">确认添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import pathOptionsService from "@/global/service/pathOptions.js";
import posterService from "@/global/service/poster.js";

export default {
  data() {
    return {
      imageUrl: "",
      options: [
        {
          value: "/pages/column/column?id=",
          label: "活动页",
          children: []
        },
        {
          value: "/pages/product/product?id=",
          label: "商品页",
          children: []
        }
      ],
      page_path: "",
      selectoptions: []
    };
  },
  created() {
    pathOptionsService.list().then(res => {
      this.options[1].children = res.data.goodsOptions;
      this.options[0].children = res.data.landing;
    });
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleCover(files) {
      qiniuService.upload(files.file).then(res => {
        this.imageUrl = res;
      });
    },
    changePath(value) {
      let page_path = value[0] + value.slice(-1);
      this.page_path = page_path;
      this.selectoptions = value;
    },
    handleReturn() {
      this.$router.push({ name: "poster" });
    },
    handleSubmit() {
      if (!this.imageUrl || !this.page_path || !this.selectoptions) {
        this.$message.error("缺少必要参数");
        return;
      }
      let params = {
        image_url: this.imageUrl,
        page_path: this.page_path,
        options: this.selectoptions
      };
      posterService.insert(params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({ name: "poster" });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #ffffff;
  padding: 30px;
  .uploader {
    display: flex;
    font-size: 15px;
    color: #606266;
    .uploader-title {
      width: 100px;
    }
  }
  .path {
    display: flex;
    font-size: 15px;
    color: #606266;
    margin-top: 30px;
    .path-title {
      width: 100px;
    }
  }
}
.submit-btn {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.avatar-uploader,
.el-upload {
  width: 180px;
  height: 180px;
  border: 1px dashed #4169e1;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.avatar-uploader:hover {
  border-color: #000080;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 180px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
.avatar {
  width: 180px;
  height: 180px;
  display: block;
}
</style>
