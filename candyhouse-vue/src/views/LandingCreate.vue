<template>
  <div class="container">
    <div class="header">
      <div class="title">活动页添加</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title" style="width:500px;">
          <el-input v-model="ruleForm.title" clearable></el-input>
        </el-form-item>
      </el-form>
      <div class="editor">
        <div class="editor-title">* 内容</div>
        <quill-editor
          class="quill-editor"
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          style="height:500px;max-width:80%;"
        >
        </quill-editor>
      </div>
      <div class="color-select">
        <div class="color-title">* 颜色</div>
        <el-color-picker v-model="color" show-alpha></el-color-picker>
      </div>
      <div class="submit-btn">
        <el-button type="success" @click="handleSubmit()">确认添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import landingService from "@/global/service/landing.js";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

const uploadConfig = {
  name: "image_url",
  size: 2048, // 图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg", // 可选 可上传的图片格式
  QINIU_API: "http://upload-z2.qiniup.com"
};
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"]
];
const handlers = {
  image: function() {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", uploadConfig.accept);
    fileInput.classList.add("ql-image");
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (uploadConfig.size && file.size >= uploadConfig.size * 1024) {
        fileInput.value = "";
        return;
      }
      qiniuService.upload(file).then(res => {
        let length = this.quill.getSelection(true).index;
        this.quill.insertEmbed(length, "image", res);
        this.quill.setSelection(length + 1);
      });
    });
    fileInput.click();
  }
};

export default {
  data() {
    return {
      ruleForm: { title: "" },
      content: "",
      color: "rgba(128, 128, 128, 0.8)",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: handlers
          }
        }
      }
    };
  },
  methods: {
    handleReturn() {
      this.$router.push({ name: "index" });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.content || !this.color) {
            this.$message.error("缺少内容");
            return;
          }
          let params = {
            title: this.ruleForm.title,
            content: this.content,
            color: this.color
          };
          landingService.insert(params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$router.push({ name: "index" });
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          this.$message.error("输入有误");
        }
      });
    }
  },
  components: {
    "quill-editor": quillEditor
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #ffffff;
  padding: 30px;
}
.editor {
  display: flex;
  font-size: 14px;
  color: #606266;
  height: 600px;
  .editor-title {
    width: 80px;
  }
}
.color-select {
  display: flex;
  font-size: 14px;
  color: #606266;
  height: 60px;
  .color-title {
    width: 80px;
  }
}
.submit-btn {
  display: flex;
  justify-content: center;
}
</style>
