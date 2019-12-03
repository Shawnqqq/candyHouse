<template>
  <div class="container">
    <div class="header">
      <div class="title">商品列表</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleInsert() {
      this.$router.push({ name: "goodsCreate" });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #ffffff;
  padding: 15px;
}
</style>
