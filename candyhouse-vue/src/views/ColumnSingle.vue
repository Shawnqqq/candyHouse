<template>
  <div class="container">
    <div class="header">
      <div class="title">合辑推荐详情</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <el-tabs v-model="activeName">
        <el-tab-pane label="合辑相关内容" name="first">
          <el-form
            style="margin-top:20px"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="100px"
          >
            <el-form-item label="标题" prop="title" style="width:400px;">
              <el-input v-model="ruleForm.title" clearable></el-input>
            </el-form-item>
          </el-form>
          <div class="uploader">
            <p class="uploader-title">* 展示图</p>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="handleCover"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="submit-btn">
            <el-button type="success" @click="handleEdit()">确认修改</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="合辑推荐商品" name="goods">
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
              <el-table-column prop="category_name" label="分类">
              </el-table-column>
              <el-table-column prop="price" label="价格"> </el-table-column>
              <el-table-column prop="sold" label="已售"> </el-table-column>
              <el-table-column prop="sold_out" label="状态">
                <template slot-scope="scope">
                  <el-tag
                    :type="
                      scope.row.sold_out === '在售中' ? 'primary' : 'warning'
                    "
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
              >添加</el-button
            >
            <el-table
              :data="goodsData"
              tooltip-effect="dark"
              show-overflow-tooltip
              @selection-change="handleAddRecommend"
            >
              <el-table-column
                type="selection"
                :selectable="checkboxT"
                width="55"
              >
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
              <el-table-column prop="category_name" label="分类">
              </el-table-column>
              <el-table-column prop="price" label="价格"> </el-table-column>
              <el-table-column prop="sold" label="已售"> </el-table-column>
              <el-table-column prop="sold_out" label="状态">
                <template slot-scope="scope">
                  <el-tag
                    :type="
                      scope.row.sold_out === '在售中' ? 'primary' : 'warning'
                    "
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
              @current-change="getGoods"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import goodsService from "@/global/service/goods.js";
import qiniuService from "@/global/service/qiniu.js";
import columnService from "@/global/service/column.js";

export default {
  data() {
    return {
      activeName: "first",
      ruleForm: { title: "" },
      imageUrl: "",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
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
    this.getGoods();
    this.onLoad();
  },
  methods: {
    onLoad() {
      let id = this.$route.params.id;
      columnService.single(id).then(res => {
        if (!res.data.info) {
          this.$message.error("出错了，请返回活动页管理");
          return;
        }
        this.ruleForm.title = res.data.info.title;
        this.imageUrl = res.data.info.image_url;
        res.data.goods.forEach(arr => {
          arr.sold_out === "0"
            ? (arr.sold_out = "在售中")
            : (arr.sold_out = "已下架");
        });
        this.recommendData = res.data.goods;
      });
    },
    getGoods() {
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
      let id = this.$route.params.id;
      columnService.recommend(id, { goods_id: params }).then(res => {
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
    handleUnShow() {
      if (this.deleteRecommend.length === 0) {
        this.$message.error("没有选择任何商品喔");
        return;
      }
      let params = this.deleteRecommend.map(data => {
        return data.id;
      });
      let id = this.$route.params.id;
      columnService.unRecommend(id, { goods_id: params }).then(res => {
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
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleCover(files) {
      qiniuService.upload(files.file).then(res => {
        this.imageUrl = res;
      });
    },
    handleReturn() {
      this.$router.push({ name: "column" });
    },
    handleEdit() {
      let id = this.$route.params.id;
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.imageUrl) {
          let params = {
            title: this.ruleForm.title,
            image_url: this.imageUrl
          };
          columnService.update(id, params).then(res => {
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
        } else {
          this.$message({
            message: "缺少参数",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #fff;
  padding: 20px;
  border-radius: 7px;
  .submit-btn {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  .uploader {
    display: flex;
    font-size: 15px;
    color: #606266;
    .uploader-title {
      width: 100px;
    }
  }
}
.recommend-title {
  font-size: 16px;
  color: #777;
  text-align: center;
  margin: 10px 0;
}
.avatar-uploader,
.el-upload {
  width: 180px;
  height: 180px;
  border: 1px dashed #4169e1;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.avatar-uploader:hover {
  border-color: #000080;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 180px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
.avatar {
  width: 180px;
  height: 180px;
  display: block;
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
