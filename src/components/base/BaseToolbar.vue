<template>
  <div class="m-toolbar">
    <div class="check-all-icon">
        <div class="m-icon icon--check-arrow-all"></div>
    </div>
    <!-- THANH DROP DOWN THỰC HIỆN HÀNG LOẠT -->
    <div class="m-dropdown">
      <button class="m-btn-dropdown" :disabled="checkedList.length < 2" @click.prevent="setShowDropdown($event, !this.isShowDropdown)">
        <span> Thực hiện hàng loạt </span>
        <div class="m-icon icon--arrowup" :class="{'opacity': checkedList.length < 2}"></div>
      </button>
    </div>

    <!-- THANH DROP DOWN THỰC HIỆN LỌC -->
    <div class="m-dropdown"  ref="dropDown">
      <button class="m-btn-dropdown" @click.prevent="setShowFilter">
        <span> Lọc </span>
        <div class="m-icon icon--arrowup"></div>
      </button>
    </div>

    <!-- TEXT HIỂN THỊ BỘ LỌC -->
    <span v-if="false">Đầu năm tới hiện tại</span>

    <div class="flex-grow"></div>

    <!-- THANH TÌM KIẾM, LOAD DỮ LIỆU, XUẤT FILE, TÙY CHỈNH UI   -->
    <base-input
      placeholder="Nhập từ khóa tìm kiếm"
      iconName="search"
      :canFocus="true"
      @input="delaySearch"
    />

    <div class="toolbar-btn-wrapper">
      <div class="m-icon icon--refresh" title="Lấy lại dữ liệu" @click.prevent="onReloadClick"></div>
      <div class="m-icon icon--excel" title="Xuất ra Excel" @click="exportData"></div>
      <div class="m-icon icon--setting-grey" @click.prevent="setShowSetting" title="Tùy chỉnh giao diện"></div>
    </div>
  </div>
</template>
<script>
import BaseInput from "@/components/base/BaseInput.vue";

export default {
  name: "base-toolbar",
  props: {
    checkedList: {
      type: Array,
      default: () => []
    },
    isShowDropdown: {
      type: Boolean,
    }
  },  
  methods: {
    /**
    * Mô tả : Hiện tùy chỉnh giao diện (Truyền lên cha)
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 16:50 09/05/2022
    */
    setShowSetting(){
      this.$emit("setShowSetting", true)
    },
    /**
    * Mô tả : Xuất file
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 18:06 01/06/2022
    */
   exportData(){
     this.$emit("exportData")
   },

   /**
   * Mô tả : Hiển thị filter
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 20:45 06/06/2022
   */
    setShowFilter(){
     this.$emit("setShowFilter", this.$refs.dropDown.getBoundingClientRect())
    },

    /**
    * Mô tả : Load lại trang
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 16:50 09/05/2022
    */
    onReloadClick(){
      this.$emit("reloadClick")
    },
    /**
    * Mô tả : Tìm kiếm
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 14:27 20/05/2022
    */
    delaySearch(e){
      this.$emit("delaySearch", e.target.value)
    },
    setShowDropdown(e, _isShowDropdown){
      this.$emit("setShowDropdown", e, _isShowDropdown);
    }
  },
  components: {
    BaseInput,
  },
  data(){
    return{
      // // 1. Thuộc tính của dropdown thực hiện hàng loạt
      //   // biến ẩn hiện danh sách thực hiện hàng loạt
      //   isShowDropdown: false,
    }
  }
};
</script>
<style scoped>
    @import url("@/css/components/toolbar.css");
</style>