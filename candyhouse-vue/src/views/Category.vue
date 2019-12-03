<template>
  <div class="container">
    <div class="header">
      <div class="title">商品分类</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <el-table :data="tableData">
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
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
import categoryService from "@/global/service/category.js";

export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      categoryService.list().then(res => {
        this.tableData = res.data;
      });
    },
    handleInsert() {
      let h = this.$createElement;
      this.$msgbox({
        title: "增加分类",
        message: h("p", null, [h("span", null, "输入分类名称： ")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showInput: true
      })
        .then(active => {
          if (!active.value) {
            this.$message.error("值不能为空");
            return;
          }
          categoryService.insert({ name: active.value }).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.onLoad();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    handleEdit(index, row) {
      let id = row.id;
      let h = this.$createElement;
      this.$msgbox({
        title: "修改分类",
        message: h("p", null, [h("span", null, "输入分类名称： ")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showInput: true
      })
        .then(active => {
          if (!active.value) {
            this.$message.error("值不能为空");
            return;
          }
          categoryService.update(id, { name: active.value }).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.tableData[index].name = active.value;
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          categoryService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.tableData.splice(index, 1);
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
  padding: 25px;
}
</style>
