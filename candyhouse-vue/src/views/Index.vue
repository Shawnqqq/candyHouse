<template>
  <div class="container">
    <div class="header">
      <div class="title">活动页管理</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <el-table :data="landingData" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="created_time" label="创建时间">
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
    </div>
  </div>
</template>

<script>
import landingService from "@/global/service/landing.js";

export default {
  data() {
    return {
      landingData: []
    };
  },
  created() {
    landingService.list().then(res => {
      this.landingData = res.data;
    });
  },
  methods: {
    handleInsert() {
      this.$router.push({ name: "landingCreate" });
    },
    handleSingle(row) {
      let id = row.id;
      this.$router.push({ name: "landingSingle", params: { id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该活动页, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          landingService.deleted(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.landingData.splice(index, 1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    justify-content: space-between;
    align-items: center;
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
