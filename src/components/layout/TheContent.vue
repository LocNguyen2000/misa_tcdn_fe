<template lang="">
    <div class="m-content">
        <router-view/>
    </div>
</template>
<script>
export default {
  name: "the-content",
};
</script>
<style scoped>
.m-content {
  position: absolute;
  top: 48px;
  width: calc(100% - 20px);
  height: calc(100% - 48px);
  overflow-y: hidden;
  background-color: #eceef1;
  padding-left: 20px;
}
</style>