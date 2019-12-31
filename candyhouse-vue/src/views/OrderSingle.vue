<template>
  <div class="container">
    <div class="header">
      <div class="title">订单详情</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <div class="order-info">
        <div class="order-item">
          <div class="order-title">订单编号:</div>
          <div class="order-value">{{ orderInfo.order }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">订单状态:</div>
          <div class="order-value">{{ orderInfo.status }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">下单时间:</div>
          <div class="order-value">{{ orderInfo.created_time }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">订单金额:</div>
          <div class="order-value">{{ orderInfo.total }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">订单用户名称:</div>
          <div class="order-value">{{ orderInfo.name }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">订单用户性别:</div>
          <div class="order-value">{{ orderInfo.sex }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">订单用户手机:</div>
          <div class="order-value">{{ orderInfo.phone }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">订单配送地址:</div>
          <div class="order-value">
            {{ orderInfo.location }}{{ orderInfo.address
            }}{{ orderInfo.description }}
          </div>
        </div>
      </div>
      <el-table :data="skuData" style="width: 100%;">
        <el-table-column label="展示图">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.image_url"
              style="width: 60px; height: 60px"
              :src="scope.row.image_url"
              fit="fill"
            ></el-image>
            <div v-else>已失效商品</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="商品名称"> </el-table-column>
        <el-table-column prop="name" label="商品SKU"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="num" label="数量"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import orderService from "@/global/service/order.js";

export default {
  data() {
    return {
      skuData: [],
      orderInfo: {}
    };
  },
  created() {
    let id = this.$route.params.id;
    orderService.single(id).then(res => {
      switch (res.data.order.sex) {
        case "2":
          res.data.order.sex = "男";
          break;
        default:
          res.data.order.sex = "女";
      }
      switch (res.data.order.status) {
        case "1":
          res.data.order.status = "已接单";
          break;
        case "2":
          res.data.order.status = "配送中";
          break;
        case "3":
          res.data.order.status = "已送达";
          break;
        default:
          res.data.order.status = "未接单";
      }
      this.orderInfo = res.data.order;
      this.skuData = res.data.sku;
    });
  },
  methods: {
    handleReturn() {
      this.$router.push({ name: "order" });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #fff;
  padding: 25px;
}
.order-info {
  padding: 10px;
  .order-item {
    display: flex;
    height: 50px;
    align-items: center;
    .order-title {
      font-size: 15px;
      color: #303133;
      margin-right: 20px;
    }
    .order-value {
      font-size: 15px;
      color: #555;
    }
  }
}
</style>
