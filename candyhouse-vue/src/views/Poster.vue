<template>
  <div class="container">
    <div class="header">
      <div class="title">海报图管理</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in posterData" :key="item.id">
          <el-card
            :body-style="{ padding: '30px 8px 8px 8px' }"
            class="el-card"
          >
            <div class="close" @click="handleDelete(item)">
              <i class="el-icon-circle-close"></i>
            </div>
            <el-image :src="item.image_url" class="image" fit="contain">
            </el-image>
            <div class="bottom">
              <el-cascader
                style="width:100%;"
                :options="options"
                :value="item.options"
              ></el-cascader>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import posterService from "@/global/service/poster.js";
import pathOptionsService from "@/global/service/pathOptions.js";

export default {
  data() {
    return {
      posterData: [],
      options: [
        {
          value: "/pages/column/column?id=",
          label: "活动页",
          children: [],
          disabled: true
        },
        {
          value: "/pages/product/product?id=",
          label: "商品页",
          children: [],
          disabled: true
        }
      ]
    };
  },
  created() {
    pathOptionsService.list().then(res => {
      this.options[1].children = res.data.goodsOptions;
      this.options[0].children = res.data.landing;
    });
    this.getData();
  },
  methods: {
    getData() {
      posterService.list().then(res => {
        this.posterData = res.data;
      });
    },
    handleInsert() {
      this.$router.push({ name: "posterCreate" });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          posterService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.getData();
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
  margin-top: 10px;
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
