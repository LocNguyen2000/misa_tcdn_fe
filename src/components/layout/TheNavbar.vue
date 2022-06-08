<template>
  <div class="m-navbar">
    <div class="m-icon icon--threestripe"></div>
    <div class="branch-name-wrapper">
      <div class="branch-name">CÔNG TY CỔ PHẦN MISA</div>
      <div class="m-icon icon--arrowdown"></div>
    </div>
    <div class="current-db">DC-01</div>

    <div class="m-space"></div>

    <div class="navbar-icon">
      <div class="m-icon icon--download"></div>
    </div>
    <base-input
      propName="navBarInput"
      placeholder="Nhập từ khóa tìm kiếm"
      iconName="search"
    />
    <div class="navbar-icon first-green">
      <div class="m-icon icon--category"></div>
    </div>
    <div class="navbar-icon">
      <div class="m-icon icon--setting"></div>
    </div>

    <div class="navbar-icon">
      <div class="m-icon icon--chatnav"></div>
    </div>
    <div class="navbar-icon">
      <div class="m-icon icon--help"></div>
    </div>
    <div class="navbar-icon">
      <div class="m-icon icon--notify"></div>
    </div>

    <div class="m-dropdown-user">
      <div class="m-icon icon--avatar"></div>
      <div class="display-user">Nguyễn Hữu Lộc</div>
      <div class="m-icon icon--arrowdown--small"></div>
    </div>
  </div>
</template>
<script>
import BaseInput from "@/components/base/BaseInput.vue";

export default {
  components: { BaseInput },
  name: "the-navbar",
  component: {
    BaseInput,
  },
};
</script>
<style scoped>
@import url("@/css/layout/navbar.css");
</style>
    