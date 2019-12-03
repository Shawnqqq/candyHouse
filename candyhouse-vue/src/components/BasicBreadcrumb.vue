<template>
  <div
    class="breadcrumb-section"
    v-if="breadcrumbValue.length || title || description"
  >
    <el-breadcrumb
      class="breadcrumb-list"
      separator-class="el-icon-arrow-right"
      v-if="breadcrumbValue.length"
    >
      <template v-for="item in breadcrumbValue">
        <el-breadcrumb-item
          v-if="item.to"
          :replace="true"
          :key="item.name"
          :to="item.to"
          >{{ item.name }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else :key="item.name"
          >{{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <div class="breadcrumb-title" v-if="title">{{ title }}</div>
    <div class="breadcrumb-description" v-if="description">
      {{ description }}
    </div>
  </div>
</template>

<script>
/*
 * @params breadcrumb
 * @params breadcrumb.name
 * @params breadcrumb.to
 * @params title
 * @params description
 */
export default {
  props: {
    breadcrumb: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  computed: {
    breadcrumbValue() {
      const { breadcrumb } = this;
      if (breadcrumb.length) {
        return breadcrumb;
      }
      return this.$route.matched
        .filter(data => data.meta && data.meta.breadcrumb)
        .map(data => ({
          name: data.meta.breadcrumb.title,
          to: { name: data.name }
        }));
    }
  }
};
</script>

<style lang="less">
.breadcrumb-section {
  background-color: #fff;
  padding: 16px 32px;
  padding-bottom: 0;
  overflow: hidden;
  flex: none;
  .breadcrumb-list,
  .breadcrumb-title,
  .breadcrumb-description {
    margin-bottom: 16px;
  }
  .breadcrumb-title {
    line-height: 30px;
    font-size: 20px;
    font-weight: 500;
    margin-top: 20px;
  }
  .breadcrumb-description {
    line-height: 20px;
    font-size: 14px;
    color: #666;
  }
}
</style>
