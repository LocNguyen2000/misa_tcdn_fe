<template>
  <div class="page-wrapper">
    <div class="tab-container">
      <div class="m-tab">
          <router-link class="m-tab-content" to="/CA/CAProcess">Quy trình</router-link>
          <router-link class="m-tab-content" to="/CA/ReceiptPaymentList">Thu, chi tiền</router-link>
      </div>
      <span class="m-tab-line"> </span>
    </div>
    <router-view ref="cash"/>
  </div>
</template>
<script>

export default {
  name: "cash-page",
  components: {
  },
};
</script>
<style scoped>
    .page-wrapper{
      width: 100%;
      height: 100%;
    }
    @import url("@/css/components/tab.css");

</style>