<template>
  <div class="container">
    <div class="header">
      <div class="title">商品列表</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <div class="select">
        <el-select
          v-model="select_category"
          placeholder="请选择分类"
          clearable
          @change="select"
        >
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in goodsData" :key="item.id">
          <el-card :body-style="{ padding: '8px' }" class="el-card">
            <el-image :src="item.image_url" class="image" fit="contain">
            </el-image>
            <div class="bottom">
              <div class="item name">{{ item.name }}</div>
              <div class="item desc">{{ item.description }}</div>
              <div class="item category">分类：{{ item.category_name }}</div>
              <div class="item sold">已售：{{ item.sold }}</div>
              <div class="item price">
                <div class="item-price">¥ {{ item.price }}</div>
                <div class="item-price-origin" v-if="item.price_origin">
                  ¥ {{ item.price_origin }}
                </div>
              </div>
              <div class="item handle">
                <el-button type="text" @click="hanleSingle(item.id)"
                  >管理</el-button
                >
                <el-button type="text" @click="hanleSoldOut(item.id)"
                  >下架</el-button
                >
              </div>
            </div>
            <div class="sold_out" v-if="item.sold_out !== '0'">
              <p>该商品已下架咯~</p>
              <p class="sold_out-btn" @click="hanleSold(item.id)">上架</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
import goodsService from "@/global/service/goods.js";
import categoryService from "@/global/service/category.js";

export default {
  data() {
    return {
      goodsData: [],
      pagination: {
        pageSize: 12,
        total: 0,
        nowPage: 1
      },
      category: [],
      select_category: ""
    };
  },
  created() {
    this.onLoad();
    categoryService.list().then(res => {
      this.category = res.data;
    });
  },
  methods: {
    onLoad() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage,
        category_id: this.select_category
      };
      goodsService.list(params).then(res => {
        this.goodsData = res.data;
        this.pagination.total = res.total;
      });
    },
    select() {
      this.pagination.nowPage = 1;
      this.onLoad();
    },
    handleInsert() {
      this.$router.push({ name: "goodsCreate" });
    },
    hanleSingle(id) {
      this.$router.push({ name: "goodsSingle", params: { id } });
    },
    hanleSoldOut(id) {
      goodsService.soldOut(id).then(res => {
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
    },
    hanleSold(id) {
      goodsService.sold(id).then(res => {
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
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #ffffff;
  padding: 15px;
  .select {
    margin: 10px;
  }
}
.el-card {
  margin: 20px 0;
  width: 100%;
  position: relative;
}
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
.bottom {
  .item {
    margin: 5px 0;
    display: flex;
    align-items: center;
  }
  .name {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    font-size: 13px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .category {
    font-size: 14px;
    color: #777;
  }
  .price {
    margin: 10px 0;
    font-size: 16px;
    color: #ff1493;
    .item-price {
      margin-right: 6px;
    }
    .item-price-origin {
      font-size: 13px;
      color: #999;
      text-decoration: line-through;
    }
  }
  .sold {
    font-size: 14px;
    color: #777;
  }
  .handle {
    justify-content: space-between;
    padding: 5px;
  }
  .el-button {
    padding: 0;
  }
}
.sold_out {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 17px;
    color: #fff;
    letter-spacing: 1px;
  }
  .sold_out-btn {
    font-size: 16px;
    color: #00ffff;
    cursor: pointer;
    margin-top: 20px;
  }
  .sold_out-btn:hover {
    color: #409eff;
  }
}
</style>
