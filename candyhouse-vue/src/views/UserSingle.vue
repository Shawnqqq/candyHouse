<template>
  <div class="container">
    <div class="header">
      <div class="title">用户信息</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <div class="user-avatar">
        <el-image
          v-if="userInfo.avatar"
          style="width: 70px; height: 70px"
          :src="userInfo.avatar"
          fit="fill"
        ></el-image>
      </div>
      <div class="user-info">
        <div class="user-item">
          <div class="user-title">用户昵称</div>
          <div class="user-value">{{userInfo.nickname}}</div>
        </div>
      </div>
      <div class="user-info">
        <div class="user-item">
          <div class="user-title">用户身份</div>
          <div class="user-value">{{userInfo.salesman}}</div>
        </div>
      </div>
      <el-table :data="addressData" style="width: 100%;margin:40px 0">
        <el-table-column label="用户地址">
          <el-table-column prop="name" label="收货人"> </el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
          <el-table-column label="收货地址">
            <template slot-scope="scope">
              <div>{{ scope.row.location}}{{scope.row.address}}{{scope.row.description}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="tag" label="标签"></el-table-column>
          <el-table-column label="默认">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.default === '1' ? 'success' : 'info'"
                disable-transitions
                >{{ scope.row.default === "1" ? '是' : '否' }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="orderData" style="width: 100%;">
        <el-table-column label="用户订单">
          <el-table-column prop="order" label="订单编号"> </el-table-column>
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
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import userService from "@/global/service/user.js";

export default {
  data(){
    return{
      userInfo:{},
      addressData:[],
      orderData:[]
    }
  },
  created(){
    let id  = this.$route.params.id
    userService.single(id).then(res=>{
      res.data.userInfo.salesman === 0 ? res.data.userInfo.salesman='普通用户' :
      res.data.userInfo.salesman = '配送人员';
      res.data.address.forEach(arr=>{
        arr.sex === '1' ? arr.sex = '男' : arr.sex = '女';
      })
      res.data.order.forEach(arr => {
        switch (arr.status) {
          case "1":
            arr.status = "已接单";
            break;
          case "2":
            arr.status = "配送中";
            break;
          case "3":
            arr.status = "已送达";
            break;
          default:
            arr.status = "未接单";
        }
      });
      this.userInfo = res.data.userInfo;
      this.addressData = res.data.address;
      this.orderData = res.data.order;
    })
  },
  methods:{
    handleReturn(){
      this.$router.push({ name: "user" });
    },
    tagType(status) {
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
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #fff;
  padding: 25px;
}
.user-info {
  padding: 8px;
  .user-item {
    display: flex;
    height: 30px;
    align-items: center;
    .user-title {
      font-size: 14px;
      color: #303133;
      margin-right: 20px;
    }
    .user-value {
      font-size: 14px;
      color: #555;
    }
  }
}
.user-avatar{
  padding:10px;
}
</style>
