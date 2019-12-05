<template>
  <div class="container">
    <div class="header">
      <div class="title">商品列表</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in goodsData" :key="item.id">
          <el-card :body-style="{ padding: '8px' }" class="el-card">
            <el-image :src="item.image_url" class="image" fit="contain">
            </el-image>
            <div class="bottom">
              <div class="item name">{{ item.name }}</div>
              <div class="item desc">{{ item.description }}</div>
              <div class="item category">分类：{{ item.category_name }}</div>
              <div></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="pagination.pageSize"
        :pager-count="7"
        :current-page.sync="pagination.nowPage"
        :total="pagination.total"
        @current-change="onLoad"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import goodsService from "@/global/service/goods.js";

export default {
  data() {
    return {
      goodsData: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      }
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage
      };
      goodsService.list(params).then(res => {
        this.goodsData = res.data;
        this.total = res.total;
      });
    },
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
.el-card {
  margin: 20px 0;
  width: 100%;
}
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
