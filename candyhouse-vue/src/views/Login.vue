<template>
  <div class="container">
    <div class="login">
      <h1>login</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          v-model="phone"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <button type="button" class="submit-btn" @click="handSubmit">
          Let me in.
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import authLoginService from "@/global/service/authLogin.js";
import DataStore from "@/global/storage/index.js";

export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  created: function() {
    let token = DataStore.getToken();
    if (token) {
      return this.$router.replace({ name: "Dashboard" });
    }
  },
  methods: {
    handSubmit() {
      let phone = this.phone;
      let password = this.password;
      if(!phone || !password){
        return this.$message.error('请输入手机号和密码');
      }
      authLoginService.login({phone,password}).then(res=>{
        if(res.code === 0){
          return this.$message.error(res.message);
        }
        DataStore.setToken(res.data.token)
        DataStore.setName(res.data.name)
        DataStore.setStatus(res.data.status)
        this.$router.replace({ name: "Dashboard" });
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: -webkit-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    linear-gradient(
      to bottom,
      rgba(57, 173, 219, 0.25) 0%,
      rgba(42, 60, 87, 0.4) 100%
    ),
    linear-gradient(135deg, #670d10 0%, #092756 100%);
  position: relative;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  transform: translateX(-50%) translateY(-50%);
  h1 {
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
    text-align: center;
    margin: 30px 0;
  }
  input {
    width: 100%;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.3);
    outline: none;
    padding: 10px;
    font-size: 13px;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
      0 1px 1px rgba(255, 255, 255, 0.2);
    transition: box-shadow 0.5s ease;
  }
  .submit-btn {
    width: 100%;
    background-color: #4c71bb;
    background-image: -webkit-linear-gradient(top, #6eb6de, #4a77d4);
    background-repeat: repeat-x;
    border: 1px solid #3762bc;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.5);
    padding: 9px 14px;
    font-size: 15px;
    color: #fff;
    line-height: normal;
    border-radius: 5px;
  }
}
</style>
