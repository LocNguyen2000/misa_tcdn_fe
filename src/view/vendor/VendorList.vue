<template>
  <!-- MỞ FORM SHORT CUTS ctrl + f -->
  <div class="m-view-container" @keydown.ctrl="onShortCutsEnter" tabindex="-1">
    <!-- THANH HEADER CHỨA TIÊU ĐỀ -  CÁC NÚT TIỆN ÍCH -->
    <div class="m-title sticky" style="left: 0">
      <div class="m-row">
        <div class="title-text">Danh sách nhà cung cấp</div>
        <div class="title-btn">
          <div class="title__tour-guide">
            <div class="m-icon icon--tour"></div>
            <div class="tour-label">Hướng dẫn</div>
          </div>
          <div class="m-dropdown mg-r-12">
            <button class="m-btn-dropdown">
              <span>Tiện ích</span>
              <div class="m-icon icon--arrowup"></div>
            </button>
          </div>
          
          <div class="m-add-dropdown">
            <div class="add-btn m-btn m-btn-primary radius-btn--round"  @click.prevent="onClickNewForm">Thêm</div>
            <div class="dropdown-btn m-btn m-btn-primary">
              <div class="m-icon m-icon-w-16 icon--arrowUp--white"></div>
            </div>
          </div>

        </div>
      </div>
      <div class="m-row">
        <div class="m-icon m-icon-w-16 icon--arrowleft"></div>
        <div class="back">Tất cả danh mục</div>
      </div>
    </div>
    <!-- THANH BODY CHỨA OVERVIEW VÀ TABLE -->
    <div class="m-overview sticky" style="left: 0">
      <div class="overview-item overview-dued-debit">
        <div class="overview-data">
          <div class="overview-number">0,0</div>
          <div class="overview-label">Nợ quá hạn</div>
        </div>
      </div>
      <div class="overview-item overview-total-debit">
        <div class="overview-data">
          <div class="overview-number">0,0</div>
          <div class="overview-label">Tổng nợ phải trả</div>
        </div>
      </div>
      <div class="overview-item overview-payment">
        <div class="overview-data">
          <div class="overview-number">0,0</div>
          <div class="overview-label">Đã thanh toán (30 ngày gần đây)</div>
        </div>
      </div>
    </div>
    <!-- THANH TOOLBAR NẰM TRƯỚC TABLE -->
    <base-toolbar
      class="sticky"
      style="left: 0"
      :checkedList="checkedList"
      :isShowDropdown="isShowDropdown"
      @reloadClick="loadPagingData"
      @setShowSetting="setShowSettingDialog"
      @delaySearch="delaySearch"
      @deleteMany="deleteMany"
      @setShowDropdown="setShowDropdown"
      @exportData="exportData"
    />

    <!-- TABLE CHO NHÀ CUNG CẤP -->
    <base-table
      :columns="this.vendorColumns"
      :tableData="vendorsData"
      :checkedList="checkedList"
      :isLoading="isLoading"
      primeKeyName="VendorId"
      @onRowFunctionClick="rowOnDblClick"
      @setSelectedRowAll="setSelectedRowAll"
      @setShowPopover="setShowPopover"
      @rowDblClick="rowOnDblClick"
      @checkboxClick="checkboxClick"
    ></base-table>

    <!-- TỔNG SỐ BẢN GHI + BẢN GHI/TRANG + PAGING -->
    <div class="m-paging">
      <div class="paging-left flex flex-align-center">
        <div class="total-data">
          Tổng số: <b>{{ this.totalRecords }}</b> bản ghi
        </div>
      </div>

      <div class="flex-grow"></div>

      <base-combobox
        class="mr-4 ml-4"
        propTxt="text"
        propValue="value"
        :defaultData="paginateList"
        v-model="this.currentPageSize"
      />

      <base-paging
        v-model="this.currentPageIndex"
        :pageSize="this.currentPageSize"
        :totalPage="this.totalPage"
        @selectPage="selectedPaging"
      />
    </div>
    <transition>
      <!-- POPOVER CHỨC NĂNG THỰC HIỆN HÀNG LOẠT -->
      <ul
        class="m-popover"
        id="basePopoverMulti"
        v-show="isShowDropdown"
        :style="{ top: multiDropdownY + 'px', left: multiDropdownX + 'px' }"
      >
        <li class="popover-list" @click.prevent="onDeleteMultiClick">Xóa</li>
        <li class="popover-list">Gộp</li>
      </ul>
    </transition>

    <transition>
      <!-- POPOVER CHỨC NĂNG SỬA, XÓA, NHÂN BẢN -->
      <ul
        class="m-popover"
        id="basePopover"
        v-show="isShowPopover"
        :style="{ top: popOverY + 'px', left: popOverX + 'px' }"
      >
        <li class="popover-list" @click.prevent="onClickWatchForm">Xem</li>
        <li class="popover-list" @click.prevent="onDeleteClick">Xóa</li>
      </ul>
    </transition>

    <!-- FORM NHÀ CUNG CẤP -->
    <transition>
      <vendor-form
        v-if="this.isShowDialog"
        :formMode="formMode"
        :vendorSelected="vendorSelected"
        @setShowForm="setShowDialog"
        @setShowPopup="setShowPopup"
        @setShowToast="setShowToast"
      />
    </transition>

    <!-- HIỆN POPUP THÔNG BÁO, CẢNH BÁO, XÁC NHẬN -->
    <transition name="fast">
      <base-popup
        v-if="isShowPopup"
        :type="popupType"
        :content="popupContent"
        @closePopup="setShowPopup"
        @confirmCallback="callbackFunc"
        @declineCallback="declineCallbackFunc"
      />
    </transition>

    <!-- TÙY CHỈNH GIAO DIỆN -->
    <transition>
      <base-table-setting
        v-if="isShowSettingDialog"
        :api="this.MISA_API.TABLE_API('vendor')"
        @setShowSetting="setShowSettingDialog"
        @reloadTable="loadTableColumns"
      />
    </transition>

    <!-- HIỆN TOAST BÁO THÀNH CÔNG, LỖI -->
    <transition name="fast">
      <base-toast
        v-model="isShowToastMsg"
        :content="toastContent"
        :type="toastType"
      />
    </transition>
  </div>
</template>
<script>
import axios from "axios";
import FileSave from "file-saver"

import BaseToolbar from "@/components/base/BaseToolbar.vue";
import BaseTable from "@/components/base/table/BaseTable.vue";
import BaseTableSetting from "@/components/base/table/BaseTableSetting.vue";
import BasePaging from "@/components/base/BasePaging.vue";
import BaseCombobox from "@/components/base/combobox/BaseCombobox.vue";
import BasePopup from "@/components/base/popup/BasePopup.vue";
import BaseToast from "@/components/base/popup/BaseToast.vue";

import VendorForm from "@/view/vendor/VendorForm.vue";

export default {
  name: "view-vendorlist",
  async created() {
    try {
      await this.loadTableColumns();

      await this.loadPagingData();
    } catch (error) {
      console.log(error);
    }
  },

  components: {
    // BaseInput,
    BaseToolbar,
    BaseTable,
    BasePaging,
    BaseCombobox,
    BaseTableSetting,
    BasePopup,
    BaseToast,
    VendorForm,
  },
  /**
   * Mô tả : Theo dõi các trạng thái của data
   * Created by: NHLOC - MF1099
   * Created date: 14:34 21/04/2022
   */
  watch: {
    currentPageSize: function (newValue, oldValue) {
      if (newValue != oldValue) {
        console.log(this.currentPageSize);
        this.currentPageIndex = 1;
        this.setShowPopover(false, null, this.currentPageIndex);

        this.$nextTick(async () => {
          await this.loadPagingData();
        });
      }
    },
    
    checkedList: {
      handler(newValue){
        if (newValue.length <= 1){
          this.setShowDropdown(null, false)
        }
      },
      deep: true
    },
  },
  
  
  methods: {
    // SỰ KIỆN EVENT
    async onShortCutsEnter(e){
      e.preventDefault();
      
      // Ctrl + f1
      if (e.keyCode == 112){
        // Mở form mới
        await this.onClickNewForm();
      }
    },
    /**
     * Mô tả : Mở form mới
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 13:11 20/05/2022
     */
    async onClickNewForm() {
      await this.newVendorCode();

      this.vendorSelected.VendorType = this.MISA_ENUM.vendorType.organization;
      this.vendorSelected.ClientVendorGroupId = []

      this.setShowDialog(
        true,
        this.vendorSelected,
        this.MISA_ENUM.formMode.Add
      );
    },
    /**
    * Mô tả : Mở form xem
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 20:28 27/05/2022
    */
    async onClickWatchForm() {
      await this.getById();

      this.setShowDialog(true, this.vendorSelected, this.MISA_ENUM.formMode.Watch);
    },

    /**
     * Mô tả : Sự kiện double click ở 1 dòng trong danh sách
     * @param _vendor: nhà cung cấp được chọn
     * Created by: NHLOC - MF1099
     * Created date: 11:20 16/04/2022
     */
    async rowOnDblClick(_vendor) {
      // 1. lấy dữ liệu nhà cung cấp
      this.rowIdSelected = _vendor.VendorId;

      // gọi api
      await this.getById(this.rowIdSelected);

      // 2. Hiển thị Dialog (true, dữ liệu nhà cung cấp được chọn, chỉnh sửa) và đóng các popup lại
      this.setShowDialog(
        true,
        this.vendorSelected,
        this.MISA_ENUM.formMode.Edit
      );
    },
    /**
     * Mô tả : Sự kiện click vào checkbox trong danh sách
     * >> Highlight dòng + hiện tick
     * Created by: NHLOC - MF1099
     * Created date: 17:12 19/04/2022
     */
    checkboxClick(_vendorId) {
      // Nếu dòng đã được chọn >> xóa khỏi danh sách checkbox
      if (_vendorId && this.checkedList.includes(_vendorId)) {
        // Tìm vị trí employee được được xóa khỏi danh sách
        const index = this.checkedList.findIndex((empId) => {
          return empId === _vendorId;
        });
        // Xóa khỏi danh sách checkbox
        this.checkedList.splice(index, 1);
      }
      // chưa được chọn thì thêm vào danh sách checkbox
      else {
        this.checkedList.push(_vendorId);
      }
    },
    /**
     * Mô tả : Xử lý sụ kiện xóa nhà cung cấp
     * Created by: NHLOC - MF1099
     * Created date: 13:54 18/04/2022
     */
    onDeleteClick() {
      // Nếu đã chọn 1 dòng >> Thực hiện xóa nhà cung cấp
      if (this.rowIdSelected) {
        try {
          console.log(this.rowIdSelected);

          // Hiện popup xác nhận xóa mã nhà cung cấp
          const vendorCode = this.vendorSelected.VendorCode;

          this.setShowPopup(
            true,
            this.MISA_ENUM.popupEnum.confirm,
            this.popupMsg.confirmDeleteMsg(vendorCode, "Nhà cung cấp"),
            // Chạy hàm callback xóa dữ liệu nếu xác nhận đồng ý
            this.deleteData
          );
        } catch (error) {
          console.error(error);
        }
      }
    },
    // HÀM TIỆN ÍCH

    // Debounce input khi nhập liên tiếp , chờ 1s ms cập nhật paging
    delaySearch(value) {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(async () => {
        this.currentFilter = value;
        this.currentPageIndex = 1;
        await this.loadPagingData();
      }, 1000);
    },

    /**
     * Mô tả : Hàm xử lý lỗi
     * @param
     * @return
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 21:13 29/05/2022
     */
    handleError(error) {
      // Báo lỗi >> của Axios trả về
      if (error.response) {
        if (error.response.status == 400) {
          const errorResponse = error.response.data.Data;
          let errMsg = errorResponse[Object.keys(errorResponse)[0]];

          this.setShowPopup(true, this.MISA_ENUM.popupEnum.warning, errMsg);
        } else {
          console.log("Lỗi", error.response);
          const errorData = error.response.data;
          let errMsg = errorData.UserMsg;

          console.log(errMsg);
        }
      }
      // Báo lỗi >> của chung trả về
      else {
        console.log("Lỗi", error.message);
      }

      return error;
    },

    // HÀM API
     /**
     * Mô tả : Chạy api export dữ liệu
     * Created by: NHLOC - MF1099
     * Created date: 10:41 26/04/2022
     */
    async exportData(){
      try {
        const { data } = await axios.get(this.MISA_API.TABLE_API('vendor'))
        
        let columnList = []
        for (const column of data){
          if (column.isShow){
            columnList.push({
              Label: column.label,
              DisplayLabel: column.displayLabel,
              Name: column.name,
              Format: column.format,
            })
          }
        }

        const localAPI = this.MISA_API.VENDOR_EXPORT;
        const response = await axios.post(localAPI, columnList, { responseType: "blob" })

        FileSave.saveAs(response.data, "Danh_sach_nha_cung_cap.xlsx");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả : Xóa nhiều dữ liệu
     * Created by: NHLOC - MF1099
     * Created date: 21:48 27/04/2022
     */
    async deleteMany() {
      try {
        // Không thì chạy api xóa nhiều nhân viên
        await axios.delete(this.MISA_API.VENDOR_DELETE_MANY, {
          data: this.checkedList,
        });

        // Báo toast xóa thành công n nhân viên
        this.setShowToast(
          true,
          this.toastMsg.deleteSuccessMany(this.checkedList.length, "Nhà cung cấp"),
          this.MISA_ENUM.toastEnum.success
        );

        // load lại trang
        await this.loadPagingData();

        // đóng lại popover thực hiện hàng loạt
        this.setShowDropdown(null, false);
      } catch (error) {
        let response = this.handleError(error);

        console.log(response);
      }
    },
    /**
     * Mô tả : Lấy mã nhân viên mới
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 15:56 20/05/2022
     */
    async newVendorCode() {
      try {
        const localAPI = this.MISA_API.VENDOR_NEW_CODE;

        const { data } = await axios.get(localAPI);

        let newCode = `NCC${data}`;

        this.vendorSelected = {
          VendorCode: newCode,
        };
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả : lấy dữ liệu theo id
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 10:10 20/05/2022
     */
    async getById() {
      console.log(this.rowIdSelected);
      if (this.rowIdSelected) {
        try {
          const localAPI = this.MISA_API.VENDOR_WITH_ID(this.rowIdSelected);

          const response = await axios.get(localAPI);

          this.vendorSelected = response.data;
          
          if (!this.vendorSelected.ClientVendorGroupId){
            this.vendorSelected.ClientVendorGroupId = []
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    /**
     * Mô tả : Load dữ liệu theo paging và filter
     * Created by: NHLOC - MF1099
     * Created date: 18:15 21/04/2022
     */
    async loadPagingData() {
      try {
        this.isLoading = true;

        const localAPI = this.MISA_API.VENDOR_FILTER(
          this.currentPageIndex,
          this.currentPageSize,
          this.currentFilter
        );

        const response = await axios.get(localAPI);

        const { Data, TotalRecord, TotalPage } = response.data;

        this.vendorsData = (Data == null) ? [] : Data;
        this.totalRecords = TotalRecord;
        this.totalPage = TotalPage;

        // reset các biến
        setTimeout(() => {
          this.isLoading = false;
        }, 500)

        this.rowIdSelected = null;
        this.checkedList = []
        this.setShowPopover(false)
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả : Check số lượng nhân viên được chọn trước khi chạy api
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 07:20 28/04/2022
     */
    onDeleteMultiClick() {
      // Nếu dữ liệu chưa được check >> Báo toast lỗi chưa chọn nhân viên để xóa
      if (this.checkedList.length < 2) {
        this.setShowToast(
          true,
          this.toastMsg.manyNotSelectedMsg("Nhà cung cấp"),
          this.MISA_ENUM.toastEnum.warning
        );
        return;
      }

      this.setShowPopup(
        true,
        this.MISA_ENUM.popupEnum.confirm,
        this.popupMsg.confirmDeleteManyMsg("Nhà cung cấp"),
        this.deleteMany
      );
    },
    /**
     * Mô tả : Xóa 1 nhà cung cấp bằng API
     * Created by: NHLOC - MF1099
     * Created date: 17:04 19/04/2022
     */
    async deleteData() {
      try {
        // Lấy API xóa + id dòng được chọn
        const localAPI = this.MISA_API.VENDOR_WITH_ID(this.rowIdSelected);

        console.log(localAPI);

        await axios.delete(localAPI);

        // Xóa nhà cung cấp khỏi danh sách nhà cung cấp
        const index = this.vendorsData.findIndex((vendor) => {
          return vendor.VendorId === this.rowIdSelected;
        });

        this.vendorsData.splice(index, 1);

        // Reset lại id dòng được chọn + đóng popover hiện tại đang mở
        this.rowIdSelected = null;
        this.setShowPopover(false, null, this.popOverIndex);

        // Hiện toast báo "xóa 1 nhà cung cấp thành công"
        this.setShowToast(
          true,
          this.toastMsg.deleteSuccessMsg("Nhà cung cấp"),
          this.MISA_ENUM.toastEnum.success
        );

        await this.loadPagingData();
      } catch (error) {
       let response = this.handleError(error);

        console.log(response);
      }
    },

    // HIỆN CÁC COMPONENT VÀ SETTER
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
     * Mô tả : Select dòng bằng 1 lần click
     * @param _vendorId: dữ liệu dòng nhà cung cấp được chọn
     * Created by: NHLOC - MF1099
     * Created date: 11:31 16/04/2022
     */
    setSelectedRow(_vendorId) {
      if (this.rowIdSelected && this.rowIdSelected == _vendorId) {
        this.rowIdSelected = null;
      } else {
        this.rowIdSelected = _vendorId;
      }
    },

    /**
     * Mô tả : ẩn và hiện form detail của nhà cung cấp
     * @param _isShow: hiện show form
     * @param _data: dữ liệu nhà cung cấp được hiện
     * @param _formMode: trạng thái của form
     * Created by: NHLOC - MF1099
     * Created date: 11:20 16/04/2022
     */
    async setShowDialog(_isShow, _data = null, _formMode = null) {
      // Load lại trang nếu đóng form
      if (!_isShow) {
        await this.loadPagingData();
      }

      // set các trường cho components
      this.vendorSelected = _data;
      this.formMode = _formMode;
      this.isShowDialog = _isShow;
    },
    /**
    * Mô tả : Load các dữ liệu cột
    * @param
    * @return
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 15:33 27/05/2022
    */
    async loadTableColumns(){
      try {
        const { data } = await axios.get(this.MISA_API.TABLE_API('vendor'));

        this.vendorColumns = data;
      } catch (error) {
        console.log(error);
      } 
    },

    /**
     * Mô tả : hiện tùy chỉnh giao diện
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 16:38 09/05/2022
     */
    setShowSettingDialog(_isShow) {
      this.isShowSettingDialog = _isShow;
    },

    /**
     * Mô tả : nhận thông tin phân trang từ component paging
     * @param currentIndex thông tin để phân trang và filter
     * @param pageSize số nhà cung cấp/trang
     * Created by: NHLOC - MF1099
     * Created date: 22:28 21/04/2022
     */
    selectedPaging(currentIndex, pageSize) {
      // set các trạng thái được truyền về từ component
      try {
        this.currentPageIndex = currentIndex;
        this.currentPageSize = pageSize;

        // // load lại dữ liệu
        this.loadPagingData();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả : ẩn hiện popover
     * @param _isShow: bool ẩn hiện popover
     * @param _popOverData: dữ liệu nhà cung cấp
     * @param _index: vị trí dòng trong danh sách
     * @param _event: con trỏ
     * Created by: NHLOC - MF1099
     * Created date: 11:35 18/04/2022
     */
    setShowPopover(_isShow, _popOverData = null, _index = null, _event = null) {
      // Nếu dòng được chọn không bị trùng hoặc chưa được chọn >> chưa được chọn >> hiện popover
      if (this.popOverIndex != _index) {
        // Set vị trí của popover,
        // dữ liệu được chọn,
        // dòng được chọn
        if (_event) {
          this.popOverX = _event.clientX - 20;
          this.popOverY = _event.clientY + 10;
          this.vendorSelected = _popOverData;
          this.popOverIndex = _index;
        }
        // Hiện popover
        this.isShowPopover = _isShow;

        // // highlight dòng được chọn
        this.setSelectedRow(_popOverData?.VendorId);
      } else {
        // reset các trạng thái + đóng popover
        this.vendorSelected = null;
        this.popOverIndex = null;
        this.isShowPopover = false;

        // ẩn highlight dòng được chọn
        this.setSelectedRow(null);
      }
    },
    /**
     * Mô tả : ẩn hiện drop down xóa hàng loạt
     * @param
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 09:08 22/05/2022
     */
    setShowDropdown(_event, _isShow = false) {
      this.isShowDropdown = _isShow;
      if (_event) {
        this.multiDropdownX = _event.clientX - 100;
        this.multiDropdownY = _event.clientY + 20;
      }
    },
    /**
     * Mô tả : Ẩn và hiện toast
     * @param isShowToast: bool ẩn và hiện của Toast
     * @param toastContent: nội dụng của Toast
     * @param toastType: loại của Toast
     * Created by: NHLOC - MF1099
     * Created date: 19:32 01/04/2022
     */
    setShowToast(_isShowToast, _toastContent = null, _toastType = null) {
      // set các trạng thái của toast
      this.toastContent = _toastContent;
      this.toastType = _toastType;
      this.isShowToastMsg = _isShowToast;
    },
    /**
     * Mô tả : Chọn hết tất cả các dòng
     * Created by: NHLOC - MF1099
     * Created date: 09:24 27/04/2022
     */
    setSelectedRowAll() {
      // Hủy chọn hết
      if (this.checkedList.length == this.vendorsData.length) {
        this.checkedList = [];
      }
      // Chọn hết
      else {
        this.checkedList = [];
        this.vendorsData.map((vendor) => {
          this.checkedList.push(vendor.VendorId);
        });
      }
    },
  },

  data() {
    return {
      // 1. Biến cho danh sách nhà cung cấp
      // biến data cho cột
      vendorsData: [],

      // biến chứa dòng nhà cung cấp được chọn
      rowIdSelected: null,

      delayTimer: null,

      // Danh sách các dòng được check bằng checkbox
      checkedList: [],

      // set tên cột, format, biến cột dùng, vị trí (left-right-center)
      vendorColumns: [],

      // biến loading
      isLoading: false,

      // 2. Thuộc tính của paging
      // Tổng số bản ghi
      totalRecords: null,

      // tổng số trang
      totalPage: null,

      // filter tên, sđt, mã nhà cung cấp
      currentFilter: null,

      // trang hiện tại
      currentPageIndex: 1,

      // kích thước trang
      currentPageSize: 10,

      // danh sách chọn trong kích thước trang
      paginateList: [
        {
          value: 10,
          text: "10 bản ghi trên 1 trang",
        },
        {
          value: 20,
          text: "20 bản ghi trên 1 trang",
        },
        {
          value: 30,
          text: "30 bản ghi trên 1 trang",
        },
        {
          value: 50,
          text: "50 bản ghi trên 1 trang",
        },
        {
          value: 100,
          text: "100 bản ghi trên 1 trang",
        },
      ],
      // 2.  biến cho Tùy chỉnh giao diện
      isShowSettingDialog: false,

      // 3. Thuộc tính của Form nhà cung cấp
      // biến hiện form nhà cung cấp
      isShowDialog: false,

      // formMode: 0 - thêm, 1 - sửa, 2 - xóa
      formMode: null,

      // dữ liệu nhà cung cấp được chọn
      vendorSelected: {},

      // 4. Thuộc tính của Popover (Component thực hiện chức năng Xóa-nhân bảng-ngừng sử dụng)
      // Biến hiện popover
      isShowPopover: false,

      // Vị trí thứ tự hiện của popover
      popOverIndex: null,

      // tọa độ x, y trong màn hình
      popOverX: null,
      popOverY: null,

      // 5. thuộc tính của popup
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

      // 6. Thuộc tính của ToastMsg
      // Biến hiện toast
      isShowToastMsg: false,

      // Nội dung của toast
      toastContent: null,

      // Loại của toast
      toastType: null,

      // 7. Thuộc tính của dropdown thực hiện hàng loạt
      // biến ẩn hiện danh sách thực hiện hàng loạt
      isShowDropdown: false,

      // tọa độ dropdown x vs y
      multiDropdownX: null,
      multiDropdownY: null,
    };
  },
};
</script>
<style scoped>
.m-view-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.m-view-container > div {
  margin-right: 30px;
}

@import url("@/css/components/button.css");
@import url("@/css/components/title.css");
@import url("@/css/components/dropdown.css");
@import url("@/css/components/overview.css");
@import url("@/css/components/popover.css");
@import url("@/css/components/paging.css");
</style>