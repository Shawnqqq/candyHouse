<template>
  <div class="container">
    <div class="header">
      <div class="title">分类推荐管理</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <div class="tips">
        为了布局美观，最好推荐五个或十个
      </div>
      <el-table :data="classifyData" style="width: 100%;">
        <el-table-column label="展示图">
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.image_url"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="name" label="分类"> </el-table-column>
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
import classifyService from "@/global/service/classify.js";

export default {
  data() {
    return {
      classifyData: []
    };
  },
  created() {
    classifyService.list().then(res => {
      this.classifyData = res.data;
    });
  },
  methods: {
    handleInsert() {
      this.$router.push({ name: "classifyCreate" });
    },
    handleSingle(row) {
      let id = row.id;
      this.$router.push({ name: "classifyEdit", params: { id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该推荐, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          classifyService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.classifyData.splice(index, 1);
            } else {
              this.$message.error(res.message);
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
  padding: 15px 20px;
  .tips {
    font-size: 14px;
    color: #a1aab2;
    margin: 10px 10px 30px 10px;
  }
}
</style>
