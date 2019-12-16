<template>
  <div class="container">
    <div class="header">
      <div class="title">分类推荐修改</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
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
        <el-form-item label="分类" prop="category_id" style="width:400px;">
          <el-select v-model="ruleForm.category_id" placeholder="请选择分类">
            <el-option
              v-for="item in category_value"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
        <el-button type="success" @click="handleSubmit()">确认修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import categoryService from "@/global/service/category.js";
import classifyService from "@/global/service/classify.js";

export default {
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        title: "",
        category_id: ""
      },
      category_value: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category_id: [
          { required: true, message: "请选择分类", trigger: "change" }
        ]
      }
    };
  },
  created() {
    categoryService.list().then(res => {
      this.category_value = res.data;
    });
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      classifyService.single(id).then(res => {
        if (!res.data) {
          this.$message.error("出错了，请返回分类推荐管理");
          return;
        }
        this.imageUrl = res.data.image_url;
        this.ruleForm.title = res.data.title;
        this.ruleForm.category_id = Number(res.data.category_id);
      });
    },
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
      this.$router.push({ name: "classify" });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.imageUrl) {
          let params = {
            title: this.ruleForm.title,
            category_id: this.ruleForm.category_id,
            image_url: this.imageUrl
          };
          let id = this.$route.params.id;
          classifyService.update(id, params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.getData();
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
