<template>
  <div class="container">
    <div class="header">
      <div class="title">商品添加</div>
    </div>
    <div class="body">
      <div class="block">
        <div class="tips">
          展示图请选择方正图片，点击图片进行更换；划线价可填可不填哟
        </div>
        <div class="show-image">
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
          <el-form
            class="form"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="60px"
          >
            <el-form-item label="价格" prop="price" style="width:300px;">
              <el-input v-model="ruleForm.price" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="划线价"
              prop="price_origin"
              style="width:300px;"
            >
              <el-input v-model="ruleForm.price_origin" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";

export default {
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        price: "",
        price_origin: ""
      }
    };
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
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.block {
  background-color: #fff;
  padding: 20px;
  .tips {
    font-size: 14px;
    color: #a1aab2;
    margin: 10px 10px 30px 10px;
  }
}
.avatar-uploader,
.el-upload {
  width: 130px;
  height: 130px;
  border: 1px dashed #4169e1;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 10px 0 10px 50px;
}
.avatar-uploader:hover {
  border-color: #000080;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
.show-image {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  .form {
    margin: 30px 200px 10px 10px;
  }
}
</style>
