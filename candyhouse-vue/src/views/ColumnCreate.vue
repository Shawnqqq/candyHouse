<template>
  <div class="container">
    <div class="header">
      <div class="title">合辑推荐添加</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <div class="tips">
        添加完后，可以到合辑详情页添加展示商品哦
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title" style="width:400px;">
          <el-input v-model="ruleForm.title" clearable></el-input>
        </el-form-item>
      </el-form>
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
      <div class="submit-btn">
        <el-button type="success" @click="handleSubmit()">确认添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import columnService from "@/global/service/column.js";

export default {
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        title: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
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
      });
    },
    handleReturn() {
      this.$router.push({ name: "column" });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.imageUrl) {
          let params = {
            title: this.ruleForm.title,
            image_url: this.imageUrl
          };
          columnService.insert(params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$router.push({ name: "column" });
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          this.$message({
            message: "缺少参数",
            type: "warning"
          });
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
  .tips {
    font-size: 14px;
    color: #a1aab2;
    margin: 0 8px 25px 8px;
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
