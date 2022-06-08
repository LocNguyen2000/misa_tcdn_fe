<template>
  <div class="page-navigation flex flex-align-center">
    <!-- LÙI TRANG -->
    <div
      class="prevPage cur-pointer mr-4"
      v-on:click="selectPage(currentPage - 1)"
      :style="{ color: currentPage == 1 ? '#9e9e9e' : '' }"
    >
      Trước
    </div>
    <!-- NẾU TỔNG SỐ TRANG > 5 TRANG -->
    <div class="page-index flex" v-if="totalPage > 5">
      <!-- Đầu paging -->
      <div
        v-on:click="selectPage(1)"
        class="page-num cur-pointer pl-2 pr-2"
        :class="{
          selected: currentPage == 1,
        }"
      >
        {{ 1 }}
      </div>
      <!-- Giữa paging -->
      <div
        v-for="index in 5"
        :key="index"
        v-on:click="selectPage(currentPage + index - 3)"
        class="page-num cur-pointer pl-2 pr-2"
        :class="{
          selected: currentPage == currentPage + index - 3,
          hidden:
            totalPage < currentPage + index - 3 ||
            1 > currentPage + index - 3 ||
            currentPage + index - 3 == 1 ||
            currentPage + index - 3 == totalPage,
        }"
      >
        <!-- ...- Trang bên trái - Trang hiện tại - Trang bên phải -... -->
        {{
          currentPage + index - 3 == currentPage + 2 ||
          currentPage + index - 3 == currentPage - 2
            ? "..."
            : currentPage + index - 3
        }}
      </div>
      <!-- Cuối paging -->
      <div
        v-on:click="selectPage(totalPage)"
        class="page-num cur-pointer pl-2 pr-2"
        :class="{
          selected: currentPage == totalPage,
        }"
      >
        {{ totalPage }}
      </div>
    </div>
    <!-- TỔNG SỐ TRANG < 5 TRANG -->
    <div class="page-index flex" v-else>
      <div
        v-on:click="selectPage(index)"
        class="page-num cur-pointer pl-2 pr-2"
        :class="{
          selected: currentPage == index,
        }"
        v-for="index in totalPage"
        :key="index"
      >
        {{ index }}
      </div>
    </div>
    <!-- TIẾN TRANG -->
    <div
      class="nextPage cur-pointer ml-4"
      v-on:click="selectPage(this.currentPage + 1)"
      :style="{ color: currentPage == totalPage ? '#9e9e9e' : '' }"
    >
      Sau
    </div>
  </div>
</template>
<script>
export default {
  emits: ["selectPage"],
  watch: {
    modelValue: function(newValue){
      if (newValue){
        this.currentPage = newValue
      }
    }
  },
  props: {
    totalPage: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: Number,
      default: 3,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    /**
    * Mô tả : Cập nhật giá trị của trang hiện tại
    * @param {*} page: trang hiện tại
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 23:10 27/04/2022
    */
    selectPage(page) {
      try {
        // nếu trang hợp lệ (> 0 và < tổng trang)
        if (page > 0 && page <= this.totalPage) {
          // cập nhật lên cha
          this.$emit("selectPage", page, this.pageSize);
          // hiển thị page đc chọn
          this.currentPage = page;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      currentPage: this.modelValue,
    };
  },
};
</script>