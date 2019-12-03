<template>
  <el-container class="page-wrapper">
    <sider class="page-sider" />
    <el-main class="page-mainer">
      <el-header style="padding:0px">
        <Header class="page-header" />
      </el-header>
      <div class="page-body">
        <router-view></router-view>
      </div>
      <Footer class="page-footer" />
    </el-main>
  </el-container>
</template>

<script>
import Header from "./BasicLayoutHeader";
import Footer from "./BasicLayoutFootert";
import Sider from "./BasicLayoutSider";
import DataStore from "@/global/storage/index.js";

export default {
  data() {
    return {
      collapse: false
    };
  },
  created() {
    let token = DataStore.storage.get("token");
    if (!token) {
      return this.$router.replace({ name: "login" });
    }
  },
  components: {
    Header,
    Footer,
    Sider
  }
};
</script>

<style lang="less">
.page-wrapper {
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  .page-header {
    position: relative;
    z-index: 10;
    height: 64px;
  }
  .page-sider {
    position: relative;
  }
  .page-mainer {
    display: flex;
    flex-direction: column;
    background-color: #ecf0f4;
    width: 100%;
    padding: 0px;
    .page-header {
      height: 64px !important;
    }
    .page-body {
      flex: 1;
      padding: 15px;
      // width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
