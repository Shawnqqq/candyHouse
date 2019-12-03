<template>
  <div class="container">
    <div class="header">
      <div class="title">轮播图管理</div>
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
      console.log(1);
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
