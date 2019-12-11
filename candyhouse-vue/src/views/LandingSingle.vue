<template>
  <div class="container">
    <div class="header">
      <div class="title">活动页详情</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <el-tabs v-model="activeName">
        <el-tab-pane label="活动页内容" name="first">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="80px"
          >
            <el-form-item label="标题" prop="title" style="width:500px;">
              <el-input v-model="ruleForm.title" clearable></el-input>
            </el-form-item>
          </el-form>
          <div class="editor">
            <div class="editor-title">* 内容</div>
            <quill-editor
              class="quill-editor"
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              style="height:500px;max-width:80%;"
            >
            </quill-editor>
          </div>
          <div class="color-select">
            <div class="color-title">* 颜色</div>
            <el-color-picker v-model="color" show-alpha></el-color-picker>
          </div>
          <div class="submit-btn">
            <el-button type="success" @click="handleEdit()">确认修改</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="活动页商品" name="goods">
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
import landingService from "@/global/service/landing.js";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

const uploadConfig = {
  name: "image_url",
  size: 2048, // 图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg", // 可选 可上传的图片格式
  QINIU_API: "http://upload-z2.qiniup.com"
};
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"]
];
const handlers = {
  image: function() {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", uploadConfig.accept);
    fileInput.classList.add("ql-image");
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (uploadConfig.size && file.size >= uploadConfig.size * 1024) {
        fileInput.value = "";
        return;
      }
      qiniuService.upload(file).then(res => {
        let length = this.quill.getSelection(true).index;
        this.quill.insertEmbed(length, "image", res);
        this.quill.setSelection(length + 1);
      });
    });
    fileInput.click();
  }
};

export default {
  data() {
    return {
      activeName: "first",
      ruleForm: { title: "" },
      content: "",
      color: "rgba(128, 128, 128, 0.8)",
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
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: handlers
          }
        }
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
      landingService.single(id).then(res => {
        if (!res.data.info) {
          this.$message.error("出错了，请返回活动页管理");
          return;
        }
        this.ruleForm.title = res.data.info.title;
        this.content = res.data.info.content;
        this.color = res.data.info.color;
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
      landingService.recommend(id, { goods_id: params }).then(res => {
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
      landingService.unRecommend(id, { goods_id: params }).then(res => {
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
    handleReturn() {
      this.$router.push({ name: "index" });
    },
    handleEdit() {
      let id = this.$route.params.id;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.content || !this.color) {
            this.$message.error("缺少内容");
            return;
          }
          let params = {
            title: this.ruleForm.title,
            content: this.content,
            color: this.color
          };
          landingService.update(id, params).then(res => {
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
          this.$message.error("输入有误");
        }
      });
    }
  },
  components: {
    "quill-editor": quillEditor
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #fff;
  padding: 20px;
  border-radius: 7px;
  .editor {
    display: flex;
    font-size: 14px;
    color: #606266;
    height: 600px;
    .editor-title {
      width: 80px;
    }
  }
  .color-select {
    display: flex;
    font-size: 14px;
    color: #606266;
    height: 60px;
    .color-title {
      width: 80px;
    }
  }
  .submit-btn {
    display: flex;
    justify-content: center;
  }
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
