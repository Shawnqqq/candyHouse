<template>
  <div class="container">
    <div class="header">
      <div class="title">商品推荐</div>
    </div>
    <div class="body">
      <div class="goods-recommend">
        <p class="recommend-title">推荐商品</p>
        <el-button size="mini" type="success" @click="handleUnShow"
          >取消</el-button
        >
        <el-table
          :data="recommendData"
          tooltip-effect="dark"
          show-overflow-tooltip
          @selection-change="handleDeleteRecommend"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="展示图">
            <template slot-scope="scope">
              <el-image
                style="width: 60px; height: 60px"
                :src="scope.row.image_url"
                fit="fill"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="名称" width="300">
            <template slot-scope="scope">
              <span class="goods-name">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="category_name" label="分类"> </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="sold" label="已售"> </el-table-column>
          <el-table-column prop="sold_out" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.sold_out === '在售中' ? 'primary' : 'warning'"
                disable-transitions
                >{{ scope.row.sold_out }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleSingle(scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="goods-container">
        <p class="recommend-title">全部商品</p>
        <el-button size="mini" type="success" @click="handleShow"
          >推荐</el-button
        >
        <el-table
          :data="goodsData"
          tooltip-effect="dark"
          show-overflow-tooltip
          @selection-change="handleAddRecommend"
        >
          <el-table-column type="selection" :selectable="checkboxT" width="55">
          </el-table-column>
          <el-table-column label="展示图">
            <template slot-scope="scope">
              <el-image
                style="width: 60px; height: 60px"
                :src="scope.row.image_url"
                fit="fill"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="名称" width="300">
            <template slot-scope="scope">
              <span class="goods-name">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="category_name" label="分类"> </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="sold" label="已售"> </el-table-column>
          <el-table-column prop="sold_out" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.sold_out === '在售中' ? 'primary' : 'warning'"
                disable-transitions
                >{{ scope.row.sold_out }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleSingle(scope.row)"
                >详情</el-button
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
  </div>
</template>

<script>
import goodsService from "@/global/service/goods.js";
import recommendService from "@/global/service/recommend.js";

export default {
  data() {
    return {
      recommendData: [],
      goodsData: [],
      addRecommend: [],
      deleteRecommend: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      }
    };
  },
  created() {
    this.onLoad();
    this.recommend();
  },
  methods: {
    recommend() {
      recommendService.list().then(res => {
        res.data.forEach(arr => {
          arr.sold_out === "0"
            ? (arr.sold_out = "在售中")
            : (arr.sold_out = "已下架");
        });
        this.recommendData = res.data;
      });
    },
    onLoad() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage
      };
      goodsService.list(params).then(res => {
        res.data.forEach(arr => {
          arr.sold_out === "0"
            ? (arr.sold_out = "在售中")
            : (arr.sold_out = "已下架");
        });
        this.goodsData = res.data;
        this.pagination.total = res.total;
      });
    },
    handleAddRecommend(val) {
      this.addRecommend = val;
    },
    handleShow() {
      if (this.addRecommend.length === 0) {
        this.$message.error("没有选择任何商品喔");
        return;
      }
      let params = this.addRecommend.map(data => {
        return data.id;
      });
      recommendService.insert({ id: params }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.recommend();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleUnShow() {
      if (this.deleteRecommend.length === 0) {
        this.$message.error("没有选择任何商品喔");
        return;
      }
      let params = this.deleteRecommend.map(data => {
        return data.id;
      });
      recommendService.delete({ id: params }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.recommend();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleDeleteRecommend(val) {
      this.deleteRecommend = val;
    },
    handleSingle(row) {
      let id = row.id;
      this.$router.push({ name: "goodsSingle", params: { id } });
    },
    checkboxT(row) {
      if (row.sold_out === "在售中") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #fff;
  padding: 20px;
  border-radius: 7px;
}
.recommend-title {
  font-size: 16px;
  color: #777;
  text-align: center;
  margin: 10px 0;
}
.goods-recommend {
  margin-bottom: 40px;
  padding: 0 20px;
  border: 1px solid #f1f1f1;
}
.goods-container {
  margin-top: 30px;
  padding: 0 20px;
  border: 1px solid #f1f1f1;
}
.goods-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
