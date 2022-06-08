<template>
  <!-- 4 LOẠI TOAST : WARN - SUCCESS - ERROR - INFO -->
  <div class="m-toast-frame" v-if="modelValue">
    <div class="m-toast" :class="type">
      <div class="m-toast-messenger">
        <div class="toast-img"></div>
        <div class="toast-text">{{ this.content }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-toast-message",
  props: {
    // Biến hiện toast
    modelValue: {
      type: Boolean,
      default: false,
    },
    // Loại toast (warning - error - info- success)
    type: {
      type: String,
      default: "",
    },
    // Nội dung toast
    content: {
      type: String,
      default: "",
    },
  },
  /**
   * Mô tả : khi toast hiện > set loại toast dựa theo id và css,
   * đóng toast sau 1-2 giây
   * Alert - Warn - Success - Notify
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 20:40 23/04/2022
   */
  watch: {
    modelValue: function (newValue) {
      if (newValue) {
        setTimeout(() => {
          this.closeToast();
        }, 1000);
      }
    },
  },
  methods: {
    /**
     * Mô tả : event emit lên cha để đóng toast
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 20:37 01/04/2022
     */
    closeToast() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>
<style scoped>
/* common toast */
.m-toast-frame {
  position: fixed;
  top: 0;
  left: calc(50% - 150px);
  z-index: 999;
}

.m-toast {
  position: relative;
  padding: 10px;
  min-width: 300px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 13px;
  margin-top: 16px;
  padding-right: 64px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.171);
  animation: slidein 0.5s, slideout 1s 3s forwards;
}

.m-toast .m-toast-messenger {
  cursor: pointer;
  display: flex;
  height: 100%;
  width: 100%;
}
.m-toast .m-toast-messenger .toast-text {
  font-size: 13px;
  padding: 13px 10px 10px 10px;
}
.m-toast .toast-img {
  background-image: url("@/assets/img/Sprites.64af8f61.svg");
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
}

/* error */
.m-toast.error {
  border: 1px solid #ff7777;
}
.m-toast.error .toast-img {
  background-position: -746px -456px;
}

/* success */
.m-toast.success {
  border: 1px solid #2ca01c;
}
.m-toast.success .toast-img {
  background-position: -984px -456px;
}

/* info */
.m-toast.info {
  border: 1px solid #0075c0;
}
.m-toast.info .m-toast-messenger .toast-img {
  background-position: -666px -456px;
}

/* warning */
.m-toast.warning {
  border: 1px solid #fce100;
}
.m-toast.warning .m-toast-messenger .toast-img {
  background-position: -592px -456px;
}
</style>