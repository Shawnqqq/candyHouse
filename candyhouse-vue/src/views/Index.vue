<template>
  <div class="container">
    <div class="header">
      <div class="title">活动页管理</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="box-title">卡片名称11111111111111111111</span>
          <el-button style="float: right; padding: 5px 0" type="text"
            >详情</el-button
          >
        </div>
        <div class="text">
          {{ "列表内容 " }}
        </div>
      </el-card>
    </div>
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
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
}
.box-card {
  width: 280px;
  flex: none;
  margin: 0 20px 20px 0;
  .clearfix {
    display: flex;
  }
  .box-title {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text {
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
