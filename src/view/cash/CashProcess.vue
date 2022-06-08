<template>
    <div class="m-process-wrapper">
        <div class="m-process">
            <div class="m-process-utility-area">
                <div class="area-process">
                    <div class="title">NGHIỆP VỤ TIỀN MẶT</div>
                    <div class="process-content"  >
                        <div class="face-button hoverable receive" @click.prevent="showNotDeveloped">
                            <div class="button-process">Thu tiền</div>
                        </div>
                        <div class="face-button hoverable payment" @click.prevent="setShowPaymentForm">
                            <div class="button-process">Chi tiền</div>
                        </div>
                        <div class="face-button hoverable audit" @click.prevent="showNotDeveloped">
                            <div class="button-process" >Kiểm kê quỹ</div>
                        </div>
                    </div>
                </div>
                <div class="area-dictionary">
                    <router-link to="/DI" class="dictionary-item hoverable w-25">
                        <div class="m-icon icon--provider"></div>
                        <div class="dictionary-txt">Nhà cung cấp</div>    
                    </router-link>
                    <router-link to="/DI/DIAccount" class="dictionary-item hoverable w-25">
                        <div class="m-icon icon--caculator"></div>
                        <div class="dictionary-txt" >Hệ thống tài khoản</div>    
                    </router-link>
                </div>
            </div>
            <div class="m-report-area">
                <div class="title">BÁO CÁO</div>
                <ul class="report-body">
                    <li>Bảng kê số dư tiền theo ngày</li>
                    <li>Dòng tiền</li>
                    <li>S03A1-DN: Sổ nhật ký thu tiền</li>
                    <li>S03A2-DN: Sổ nhật ký chi tiền</li>
                    <li>Sổ kế toán chi tiết quỹ tiền mặt</li>
                </ul>
                <div class="report-footer" @click.prevent="showNotDeveloped">
                    Tất cả báo cáo
                </div>
            </div>
        </div>
        <base-popup 
            v-if="isShowPopup"
            :type="popupType"
            :content="popupContent"
            @closePopup="setShowPopup"
            @confirmCallback="callbackFunc"
            @declineCallback="declineCallbackFunc"
        />
    </div>
</template>
<script>

import BasePopup from '@/components/base/popup/BasePopup.vue';

export default {
    components: {BasePopup},
    methods: {
        /**
        * Mô tả : hiện "tính năng chưa phát triển"
        * Created by: Nguyễn Hữu Lộc - MF1099
        * Created date: 11:36 27/05/2022
        */
        showNotDeveloped(){
            this.setShowPopup(true, this.MISA_ENUM.popupEnum.info, this.popupMsg.notDevelopedMsg)
        },  
         /**
         * Mô tả : Ẩn và hiện popup
         * @param _isPopup: bool ẩn và hiện component PopupBox
         * @param _popupType: các loại của component PopupBox
         * @param _popupContent: nội dung của component PopupBox
         * @param _callbackFunc: chạy hàm callback của component PopupBox
         * @param _declineCallback: chạy hàm callback của nếu chọn không xác nhận
         * Created by: NHLOC - MF1099
         * Created date: 10:28 31/03/2022
         */
        setShowPopup(
            _isPopup,
            _popupType = null,
            _popupContent = null,
            _callback = null,
            _declineCallback = null
        ) {
            this.popupType = _popupType;
            this.popupContent = _popupContent;
            this.isShowPopup = _isPopup;
            this.callbackFunc = _callback;
            this.declineCallbackFunc = _declineCallback;
        },

        /**
        * Mô tả : Mở form chi tiêu mới
        * Created by: Nguyễn Hữu Lộc - MF1099
        * Created date: 17:06 07/06/2022
        */
        setShowPaymentForm(){
            this.$router.push({name: "CAPaymentDetail", params: {formMode: this.MISA_ENUM.formMode.Add, isRouter: true}})
        }
    },
    data(){
        return {
            // 1. thuộc tính của popup
            // Biến hiện popup
            isShowPopup: false,

            // biến thuộc tính popup để xác nhận hay không
            isConfirmPopup: false,

            // Nội dung popup
            popupContent: null,

            // Các loại popup
            popupType: null, // Delete - Warn - Notify

            // Hàm callback chạy khi bấm nút xác nhận (Có - Đồng ý)
            callbackFunc: null,

            // Hàm callback khi bấm nút ko xác nhận (Không)
            declineCallbackFunc: null,
        }
    }

}
</script>
<style scoped>
    @import url("@/css/components/process.css");
</style>