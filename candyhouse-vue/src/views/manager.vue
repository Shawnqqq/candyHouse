<template>
  <div class="container">
    <div class="header">
      <div class="title">管理员列表</div>
      <el-button type="primary">添加</el-button>
    </div>
    <div class="body">
      <div class="tips">只有管理员可以添加运营或者修改运营信息，且只有您一位管理员</div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import managerService from "@/global/service/manager.js";

export default {
  data(){
    return{
      tableData:[{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created(){
    managerService.list().then(res=>{
      console.log(res)
    })
  }
};
</script>

<style lang="less" scoped>
.header{
  display: flex;
  justify-content: space-between;
  margin:10px;
  .title{
    font-size: 16px;
    font-weight: 500;
  }
}
.body{
  background-color: #fff;
  padding: 15px;
  .tips{
    font-size: 14px;
    color: #a1aab2;
    margin: 10px 10px 30px 10px;
  }
}
</style>