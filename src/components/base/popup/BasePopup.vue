<template>
  <div class="m-shadow-box" >
    <div class="m-popup">
      <div class="m-popup-body">
        <div class="popup-content flex">
          <!-- POPUP XÁC NHẬN -->
          <div class="flex" v-if="this.type == MISA_ENUM.popupEnum.confirm">
            <div class="m-icon icon--avatar-48 icon--confirm-exclamation"></div>
          </div>
          <!-- POPUP CẢNH BÁO -->
          <div class="flex" v-else-if="this.type == MISA_ENUM.popupEnum.warning">
            <div class="m-icon icon--avatar-48 icon--confirm-exclamation"></div>
          </div>
          <!-- POPUP BÁO LỖI -->
          <div class="flex" v-else-if="this.type == MISA_ENUM.popupEnum.alert">
            <div class="m-icon icon--avatar-48 icon--alert-exclamation"></div>
          </div>
          <!-- POPUP HIỆN KHI ĐÓNG FORM -->
          <div class="flex" v-else-if="this.type == MISA_ENUM.popupEnum.question || this.type == MISA_ENUM.popupEnum.info">
            <div class="m-icon icon--avatar-48 icon--question-mark"></div>
          </div>

          <!-- NỘI DUNG POPUP -->
          <div class="m-popup-text">{{ this.content }}</div>

        </div>
        <div class="popup-line"></div>
        <div class="m-popup-footer">
          <!-- POPUP XÁC NHẬN + POPUP THÔNG BÁO-->
          <div
            class="flex space-between"
            v-if="this.type == MISA_ENUM.popupEnum.confirm"
          >
            <button
              class="m-btn btn-size-default m-btn-secondary"
              @click="closePopup"
            >
              Không
            </button>
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="confirmBtnHandler"
            >
              Có
            </button>
          </div>
          <!-- POPUP CẢNH BÁO -->
          <div
            class="flex justify-center"
            v-else-if="this.type == MISA_ENUM.popupEnum.warning || this.type == MISA_ENUM.popupEnum.info"
          >
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="closePopup"
            >
              Đồng ý
            </button>
          </div>
          <!-- POPUP BÁO LỖI -->
          <div
            class="flex flex-align-center justify-center"
            v-else-if="this.type == MISA_ENUM.popupEnum.alert"
          >
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="closePopup"
            >
              Đóng
            </button>
          </div>


          <!-- POPUP HIỆN KHI ĐÓNG FORM -->
          <div class="flex" v-else-if="this.type == MISA_ENUM.popupEnum.question">
            <button
              class="m-btn btn-size-default m-btn-secondary"
              @click="closePopup"
            >
              Huỷ
            </button>
            <div class="flex-grow"></div>
            <button
              class="m-btn btn-size-default m-btn-secondary"
              style="margin-right: 8px"
              @click="declineBtnHandler"
            >
              Không
            </button>
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click="confirmBtnHandler"
            >
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popup-dialog",

  props: ["content", "type"],
   data() {
    return {
      confirmMsg: false,
    };
  },
  /**
   * Mô tả : Cài đặt type của popup dựa theo id trong popup.css (Warn-Delete-Notify)
   * Created by: NHLOC - MF1099
   * Created date: 12:02 31/03/2022
   */

  methods: {
    /**
     * Mô tả : đóng popup và không confirm >> emit lên component cha
     * Created by: NHLOC - MF1099
     * Created date: 10:33 31/03/2022
     */
    closePopup() {
      this.$emit("closePopup", false);
    },
    /**
     * Mô tả : Confirm sự kiện và emit lên cha
     * Created by: NHLOC - MF1099
     * Created date: 15:26 31/03/2022
     */
    confirmBtnHandler() {
      this.confirmMsg = true;
      this.$emit("confirmCallback");
      this.$emit("closePopup", false, this.confirmMsg);
    },
    /**
    * Mô tả : Bấm nút "Không" để từ chối sự kiện + emit hàm callback lên cha
    * Created by: NHLOC - MF1099
    * Created date: 23:12 27/04/2022
    */
    declineBtnHandler(){
      this.confirmMsg = false;
      this.$emit("declineCallback");
      this.$emit("closePopup", false, this.confirmMsg);
    }
  },
 
};
</script>
<style scoped>
/**
* Mô tả : Pop up cảnh báo
* >> Popup Hủy
*/
.m-popup{
    min-width: 450px;
    width: 450px;
    background-color: #fff;
    max-height: 100%;
}

.m-popup .m-popup-body{
    padding: 32px;
}

.m-popup .m-popup-body .m-popup-text{
   box-sizing: border-box;
   font-weight: 400;
   font-size: 13px;
   margin-bottom: 32px;
   padding-left: 16px;
   padding-top: 12px;
}

.m-popup .popup-line{
    height: 1px;
    background: #b8bcc3;
    margin-bottom: 20px;
}

/* .m-popup .option{
    width: 100%;
} */

/* 
.m-popup span{
    font-weight: bold;
}

#dltPopup .m-popup .m-dialog-footer #dltBtn{
    background-color: #EB5757;
}
#dltPopup .m-popup .m-dialog-footer #dltBtn:hover{
    background-color: #F65454;
}

#notiPopup .m-popup .m-dialog-text{
    width: 100%;
}
#notiPopup .m-dialog-footer .m-btn-cancel{
    display: none;
} */
@import url("@/css/components/dialog.css");
</style>