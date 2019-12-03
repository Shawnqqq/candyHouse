<template>
  <div class="container">
    <section v-if="!lock">
      <div class="header">
        <div class="title">管理员列表</div>
        <el-button type="primary" @click="handleInsert">添加</el-button>
      </div>
      <div class="body">
        <div class="tips">
          只有管理员可以添加运营或者修改运营信息，且只有您一位管理员
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="角色">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '管理员' ? 'warning' : 'success'"
                disable-transitions
                >{{ scope.row.status }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.row)"
                >修改</el-button
              >
              <el-button
                v-if="scope.row.status !== '管理员'"
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <section v-else>
      <div class="auth">您没有管理员权限</div>
    </section>
  </div>
</template>

<script>
import managerService from "@/global/service/manager.js";
import DataStore from "@/global/storage/index";

export default {
  data() {
    return {
      tableData: [],
      lock: true
    };
  },
  created() {
    managerService.list().then(res => {
      res.data.forEach(arr => {
        switch (arr.status) {
          case "0":
            arr.status = "管理员";
            break;
          default:
            arr.status = "运营";
        }
        this.tableData = res.data;
      });
    });
    let status = DataStore.getStatus();
    status === "0" ? (this.lock = false) : "";
  },
  methods: {
    handleInsert() {
      this.$router.push({ name: "managerCreate" });
    },
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ name: "managerEdit", params: { id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          managerService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.tableData.splice(index, 1);
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
  background-color: #fff;
  padding: 15px;
  .tips {
    font-size: 14px;
    color: #a1aab2;
    margin: 10px 10px 30px 10px;
  }
}
</style>
