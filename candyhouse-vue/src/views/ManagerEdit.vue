<template>
  <div class="container">
    <div class="header">
      <div class="title">管理员修改</div>
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
        <el-form-item label="姓名" prop="name" style="width:400px;">
          <el-input v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="width:400px;">
          <el-input v-model="ruleForm.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width:400px;">
          <el-input v-model="ruleForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="btn" @click="handleEdit"
            >修改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import managerService from "@/global/service/manager.js";

export default {
  data() {
    return {
      id: "",
      ruleForm: {
        name: "",
        phone: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /\d{6}$/,
            message: "不能少于6位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    this.id = id;
    managerService.single(id).then(res => {
      if (res.data) {
        this.ruleForm.name = res.data.name;
        this.ruleForm.phone = res.data.phone;
      } else {
        this.$message.error("出错了，请返回管理员列表");
      }
    });
  },
  methods: {
    handleEdit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            password: this.ruleForm.password
          };
          let id = this.id;
          managerService.update(id, params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$router.push({ name: "manager" });
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          this.$message({
            message: "输入有误",
            type: "warning"
          });
        }
      });
    },
    handleReturn() {
      this.$router.push({ name: "manager" });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #fff;
  padding: 30px;
}
</style>
