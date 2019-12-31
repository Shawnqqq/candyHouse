<template>
  <div class="container">
    <div class="overview">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="card-box blue">
            <div class="box-info">
              <div class="info-title">TODAY ORDER</div>
              <div class="info-num">{{indexData.todayOrderNum}}</div>
              <div class="info-zh">今日订单</div>
            </div>
            <img class="box-image" src="@/assets/statistics.png">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="card-box yellow">
            <div class="box-info">
              <div class="info-title">TODAY PROFIT</div>
              <div class="info-num">{{indexData.total}}</div>
              <div class="info-zh">今日收益</div>
            </div>
            <img class="box-image" src="@/assets/money.png">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="card-box cyan">
            <div class="box-info">
              <div class="info-title">ALL USER</div>
              <div class="info-num">{{indexData.user}}</div>
              <div class="info-zh">用户数</div>
            </div>
            <img class="box-image" src="@/assets/people.png">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="card-box red">
            <div class="box-info">
              <div class="info-title">ALL ORDER</div>
              <div class="info-num">{{indexData.order}}</div>
              <div class="info-zh">订单数</div>
            </div>
            <img class="box-image" src="@/assets/order.png">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="order">
      <el-table :data="todayData" style="width: 100%;">
        <el-table-column label="今日订单">
          <el-table-column prop="order" label="订单编号"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="tagType(scope.row.status)" disable-transitions>{{
                scope.row.status
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="金额"> </el-table-column>
          <el-table-column prop="created_time" label="下单日期">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleSingle(scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import indexService from "@/global/service/index.js";

export default {
  data(){
    return{
      indexData:{},
      todayData:[]
    }
  },
  created(){
    indexService.list().then(res=>{
      let total = 0
      res.data.todayOrder.forEach(data=>{
        switch (data.status) {
          case "1":
            data.status = "已接单";
            break;
          case "2":
            data.status = "配送中";
            break;
          case "3":
            data.status = "已送达";
            break;
          default:
            data.status = "未接单";
        }
        total += data.total
      })
      res.data.total = total
      this.indexData = res.data
      this.todayData = res.data.todayOrder
    })
  },
  methods:{
    tagType(status){
      let value = "";
      switch (status) {
        case "已送达":
          value = "info";
          break;
        case "配送中":
          value = "success";
          break;
        case "已接单":
          value = "";
          break;
        default:
          value = "warning";
      }
      return value;
    },
    handleSingle(row){
      let id = row.id;
      this.$router.push({ name: "orderSingle", params: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.container{
  padding: 10px;
}
.card-box{
  padding: 20px;
  font-family: inherit;
  display: flex;
  justify-content: space-between;
  .info-title{
    font-size: 14px;
    color: #fff;
  }
  .info-num{
    font-size: 34px;
    color: #fff;
  }
  .info-zh{
    font-size: 14px;
    color: #fff;
  }
}
.blue{
  background-color: #64b0f2;
}
.yellow{
  background-color: #f1b53d;
}
.cyan{
  background-color: #3db9dc;
}
.red{
  background-color: #ff5d48;
}
.order{
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}
</style>
