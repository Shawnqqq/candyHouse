<template>
  <div class="header-section">
    <v-bread class="header-hd" />
    <div class="header-bd"></div>
    <div class="header-ft">
      <el-dropdown style="height:100%;" @command="handleCommand">
        <div class="bar-info-container">
          <i class="el-icon-user-solid userInfo-avatar"></i>
          <span class="userInfo-name">{{ name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-video-pause" command="out"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import DataStore from "@/global/storage/index";
import Bread from "./BasicBreadcrumb";

export default {
  data() {
    return {
      name: ""
    };
  },
  created() {
    this.name = DataStore.getName();
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "v-bread": Bread
  },
  methods: {
    handleCollapse() {
      this.$emit("update:collapse", !this.collapse);
    },
    handleCommand() {
      DataStore.clear();
    }
  }
};
</script>

<style lang="less" scoped>
.header-section {
  border-left: 1px solid rgb(223, 222, 222);
  position: relative;
  padding: 0 20px;
  background-color: #fff;
  height: 64px;
  z-index: 10;
  display: flex;
  box-shadow: 0px 2px 15px 0 rgba(0, 0, 0, 0.06);
  .header-bd {
    flex: 1;
  }
  .header-bd,
  .header-hd,
  .header-ft {
    display: flex;
    align-items: center;
  }
  .bar-info-container {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: #ecf5ff;
    }
    .userInfo-name {
      font-size: 14px;
      vertical-align: middle;
    }
    .userInfo-avatar {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: rgb(189, 187, 187);
      border-radius: 50%;
      outline: none;
      margin: 0 10px;
    }
    .el-icon--right {
      margin-left: 10px;
    }
  }
}
</style>
