<template>
  <div class="container">
    <div class="header">
      <div class="title">合辑推荐管理</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in columnData" :key="item.id">
          <el-card
            :body-style="{ padding: '30px 8px 8px 8px' }"
            class="el-card"
          >
            <div class="close" @click="handleDelete(item.id, index)">
              <i class="el-icon-circle-close"></i>
            </div>
            <el-image :src="item.image_url" class="image" fit="contain">
            </el-image>
            <div class="bottom">
              <div class="bottom-title">{{ item.title }}</div>
              <el-button type="text" @click="hanleSingle(item.id)"
                >管理</el-button
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import columnService from "@/global/service/column.js";

export default {
  data() {
    return {
      columnData: []
    };
  },
  created() {
    columnService.list().then(res => {
      this.columnData = res.data;
    });
  },
  methods: {
    handleInsert() {
      this.$router.push({ name: "columnCreate" });
    },
    hanleSingle(id) {
      this.$router.push({ name: "columnSingle", params: { id } });
    },
    handleDelete(id, index) {
      this.$confirm("此操作将永久删除该推荐, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          columnService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.columnData.splice(index, 1);
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
  padding: 15px;
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  padding: 0 5px;
  .bottom-title {
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.el-card {
  position: relative;
  .close {
    position: absolute;
    right: 5px;
    top: 5px;
    display: none;
  }
  .image {
    width: 100%;
    height: 15vh;
    image {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
}
.el-card:hover {
  .close {
    display: block;
  }
}
</style>
