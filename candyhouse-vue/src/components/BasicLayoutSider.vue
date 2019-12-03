<template>
  <div class="sider-section">
    <div class="sider-title">
      <img src="@/assets/logo.png" class="sider-logo" />
      <p class="sider-text">糖果屋</p>
    </div>
    <Menu />
  </div>
</template>

<script>
import Menu from "./BasicLayoutSiderMenu";

export default {
  data() {
    return {};
  },
  components: {
    Menu
  }
};
</script>

<style lang="less" scoped>
.sider-section {
  position: relative;
  background-color: #fff;
  width: 250px;
  box-shadow: 2px 0 15px 0 rgba(0, 0, 0, 0.07);
  transform: all 0.2s ease;
  .sider-title {
    height: 64px;
    box-shadow: 0 0 2px rgba(90, 88, 88, 0.4);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .sider-logo {
      width: 40px;
      height: 40px;
    }
    .sider-text {
      font-size: 18px;
      color: #555;
      margin-left: 10px;
      text-shadow: 1px 1px 8px rgba(56, 55, 55, 0.3);
    }
  }
}
</style>
