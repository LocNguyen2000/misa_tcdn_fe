<template>
  <div class="m-app">
    <the-sidebar />
    <div class="m-content-wrapper">
      <the-navbar />
      <the-content />
    </div>
  </div>
</template>

<script>
import TheSidebar from "@/components/layout/TheSidebar.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";
import TheContent from "@/components/layout/TheContent.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheNavbar,
    TheContent,
  },
};
</script>

<style>
@import url("@/css/main.css");
@import url("@/css/common/width.css");
@import url("@/css/common/icon.css");
@import url("@/css/common/index.css");
@import url("@/css/common/padding.css");
@import url("@/css/common/animation.css");
</style>
