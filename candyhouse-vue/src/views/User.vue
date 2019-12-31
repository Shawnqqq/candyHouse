<template>
  <div class="container">
    <div class="header">
      <div class="title">用户列表</div>
    </div>
    <div class="body">
      <div class="select">
        <el-input
          style="width:200px;margin:20px"
          placeholder="请输入昵称"
          v-model="nickname"
          @change="onLoad"
          clearable
        >
        </el-input>
      </div>
      <el-table :data="userData" style="width: 100%;">
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.avatar"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称"> </el-table-column>
        <el-table-column prop="salesman" label="身份">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleSingle(scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.row)"
              >修改</el-button
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
</template>

<script>
import userService from "@/global/service/user.js";

export default {
  data(){
    return{
      nickname:'',
      userData:[],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      }
    }
  },
  created(){
    this.onLoad()
  },
  methods:{
    onLoad(){
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage,
        nickname: this.nickname
      }
      userService.list(params).then(res=>{
        res.data.forEach(arr=>{
          arr.salesman === 0 ? arr.salesman='普通用户' : arr.salesman='配送人员'
        })
        this.userData = res.data;
        this.pagination.total = res.total;
      })
    },
    handleSingle(row){
      let id = row.id
      this.$router.push({ name: "userSingle", params: { id } });
    },
    handleEdit(row){
      let status = row.salesman === '配送人员' ? '普通用户' : '配送人员';
      this.$confirm(`此操作将他转变为${status}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          userService.update(id).then(res=>{
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.onLoad()
            }
          })
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
  padding: 20px;
}
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
