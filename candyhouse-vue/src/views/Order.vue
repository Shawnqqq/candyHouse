<template>
  <div class="container">
    <div class="header">
      <div class="title">订单列表</div>
    </div>
    <div class="body">
      <div class="select">
        <el-input
          style="width:200px;margin-right:20px"
          placeholder="请输入订单编号"
          v-model="order"
          @change="onLoad"
          clearable
        >
        </el-input>
        <el-select
          v-model="status"
          placeholder="请选择状态"
          clearable
          @change="onLoad"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-table :data="orderData" style="width: 100%;">
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleSingle(scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
import orderService from "@/global/service/order.js";

export default {
  data() {
    return {
      orderData: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      },
      options: [
        {
          value: "0",
          label: "未接单"
        },
        {
          value: "1",
          label: "已接单"
        },
        {
          value: "2",
          label: "配送中"
        },
        {
          value: "3",
          label: "已送达"
        }
      ],
      order: "",
      status: ""
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage,
        order: this.order,
        status: this.status
      };
      orderService.list(params).then(res => {
        res.data.forEach(arr => {
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
        this.orderData = res.data;
        this.pagination.total = res.total;
      });
    },
    handleSingle(row) {
      let id = row.id;
      this.$router.push({ name: "orderSingle", params: { id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          orderService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.orderData.splice(index, 1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
  padding: 20px;
}
.select {
  display: flex;
  padding: 10px;
}
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
