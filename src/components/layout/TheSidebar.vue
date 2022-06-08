<template>
  <div class="m-sidebar">
    <div class="m-logo-container">
      <div class="menu-container"></div>
      <div class="logo-icon"></div>
    </div>
    <div class="m-menu-item-list">
      <router-link
        v-for="(item, index) of menuItemList"
        :key="index"
        class="m-menu-item"
        :class="{ active: selectRowItem == item.icon }"
        :to="item.linkPath"
        :title="item.title"
        @click="clickMenuItem(item)"
      >
        <div class="m-icon" :class="item.icon"></div>
        <div class="item-title">{{ item.title }}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "the-sidebar",
  mounted() {
    this.menuItemList = this.MISA_UI.sideBarList;
    this.selectRowItem = this.MISA_UI.sideBarList[0].icon;
  },
  methods: {
    /**
     * Mô tả : sự kiện click item trong danh sách menu navbar
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 14:49 05/05/2022
     */
    clickMenuItem(item) {
      this.selectRowItem = item.icon;
    },
  },
  data() {
    return {
      menuItemList: [],
      selectRowItem: null,
    };
  },
};
</script>
<style scoped>
@import url("@/css/layout/sidebar.css");
</style>