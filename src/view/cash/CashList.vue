<template>
  <div class="m-view-container" @keydown.ctrl="onShortCutsEnter" tabindex="-1">
    <!-- THANH HEADER CHỨA TIÊU ĐỀ -  CÁC NÚT TIỆN ÍCH -->
    <div class="m-title sticky" style="left: 0">
      <div class="m-row">
        <div class="title-text">Thu chi tiền mặt</div>
        <div class="title-btn">
          <div class="title__tour-guide">
            <div class="m-icon icon--tour"></div>
            <div class="tour-label">Hướng dẫn</div>
          </div>

          <div class="m-add-dropdown">
            <div
              class="add-btn m-btn m-btn-primary radius-btn--round"
              @click.prevent="onClickNewForm"
            >
              Thêm chi tiền
            </div>
            <div class="dropdown-btn m-btn m-btn-primary">
              <div class="m-icon m-icon-w-16 icon--arrowUp--white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- THANH OVERVIEW THỐNG KÊ SỐ LIỆU -->
    <div class="m-overview sticky" style="left: 0">
      <div class="overview-item overview-withdraw">
        <div class="overview-data">
          <div class="overview-number">0,0</div>
          <div class="overview-label">Tổng thu đầu năm đến hiện tại</div>
        </div>
      </div>
      <div class="overview-item overview-deposit">
        <div class="overview-data">
          <div class="overview-number">0,0</div>
          <div class="overview-label">Tổng chi đầu năm đến hiện tại</div>
        </div>
      </div>
      <div class="overview-item overview-remain">
        <div class="overview-data">
          <div class="overview-number">0,0</div>
          <div class="overview-label">Tồn quỹ đến hiện tại</div>
        </div>
      </div>
    </div>
    <!-- THANH TAB TẤT CẢ + THU + CHI -->
    <div class="m-tab secondary-tab sticky" style="left: 0; margin-top: 20px">
      <div
        class="m-tab-content"
        @click.prevent="
          setShowPopup(
            true,
            this.MISA_ENUM.popupEnum.info,
            this.popupMsg.notDevelopedMsg
          )
        "
      >
        Tất cả
      </div>
      <div
        class="m-tab-content"
        @click.prevent="
          setShowPopup(
            true,
            this.MISA_ENUM.popupEnum.info,
            this.popupMsg.notDevelopedMsg
          )
        "
      >
        Thu tiền
      </div>
      <div class="m-tab-content" :class="{ 'active-item': true }">Chi tiền</div>
    </div>

    <!-- THANH TOOLBAR NẰM TRƯỚC TABLE -->
    <base-toolbar
      class="sticky"
      style="left: 0"
      :checkedList="checkedList"
      :isShowDropdown="isShowDropdown"
      @reloadClick="loadPagingData"
      @setShowSetting="setShowSettingDialog"
      @setShowDropdown="setShowDropdown"
      @setShowFilter="setShowFilter"
      @delaySearch="delaySearch"
      @deleteMany="deleteMany"
      @exportData="exportData"
    ></base-toolbar>

    <!-- TABLE CHO NHÀ CUNG CẤP -->
    <base-table
      :columns="cashColumns"
      :tableData="paymentData"
      :checkedList="checkedList"
      :isLoading="isLoading"
      primeKeyName="PaymentId"
      functionColumn="Xem"
      @onRowFunctionClick="onClickWatchForm"
      @rowDblClick="onClickWatchForm"
      @setSelectedRowAll="setSelectedRowAll"
      @setShowPopover="setShowPopover"
      @checkboxClick="checkboxClick"
    >
      <template #footer>
        <tfoot class="m-tfoot" style="bottom: 62px">
          <tr class="m-tr">
            <td class="space sticky-col left"></td>
            <td class="m-td sticky-col" style="left: 18px"></td>
            <td
              class="m-td"
              v-for="(column, index) of cashColumns"
              :key="index"
              :class="column.className"
            >
              <span
                v-if="
                  column.name == 'TotalPaymentMoney' && column.isShow == true
                "
                >{{ formatDataInTable(this.totalCashAmount, "money") }}</span
              >
              <span
                v-else-if="
                  column.name == cashColumns[0].name && column.isShow == true
                "
                >{{ "Tổng tiền" }}</span
              >
              <span v-else></span>
            </td>
            <td class="m-td sticky-col" style="right: 46px"></td>
            <td class="space sticky-col" style="right: 30px"></td>
            <td class="space-outside sticky-col right"></td>
          </tr>
        </tfoot>
      </template>
    </base-table>

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
        :totalPage="this.totalPage"
        :pageSize="this.currentPageSize"
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
        <li class="popover-list" @click.prevent="onDeleteClick">Xóa</li>
        <li class="popover-list" @click.prevent="onDuplicateCreate">
          Nhân bản
        </li>
        <li class="popover-list">Ngừng</li>
      </ul>
    </transition>

    <transition>
      <cash-filter
        v-if="isShowFilter"
        ref="cashFilter"
        :topPosition="this.filterPosY"
        :leftPosition="this.filterPosX"
        :isRecord="this.isRecordFilter"
        v-model:rangeState="this.rangeStateFilter"
        :startDate="this.startDateFilter"
        :endDate="this.endDateFilter"
        @setFilterAdvance="setFilterAdvance"
      />
    </transition>

    <!-- FORM CHI TIỀN -->
    <transition>
      <cash-form
        v-if="this.isShowDialog"
        :formMode="formMode"
        :paymentSelected="paymentSelected"
        :detailSelected="detailsSelected"
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
        :api="this.MISA_API.TABLE_API('payment')"
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
import FileSaver from "file-saver";

import CashFilter from "@/view/cash/CashFilter.vue";
import BaseToolbar from "@/components/base/BaseToolbar.vue";
import BasePaging from "@/components/base/BasePaging.vue";
import BaseTable from "@/components/base/table/BaseTable.vue";
import BaseCombobox from "@/components/base/combobox/BaseCombobox.vue";
import BaseTableSetting from "@/components/base/table/BaseTableSetting.vue";
import BasePopup from "@/components/base/popup/BasePopup.vue";
import BaseToast from "@/components/base/popup/BaseToast.vue";
import CashForm from "@/view/cash/CashForm.vue";

import { formatDataInTable } from "@/js/utils";

export default {
  name: "view-cashlist",
  components: {
    BaseToolbar,
    BaseTable,
    BaseCombobox,
    BasePaging,
    BaseTableSetting,
    BasePopup,
    BaseToast,
    CashFilter,
    CashForm,
  },
  /**
   * Mô tả : Theo dõi các trạng thái của data
   * Created by: NHLOC - MF1099
   * Created date: 14:34 21/04/2022
   */
  watch: {
    currentPageSize: async function (newValue, oldValue) {
      if (newValue != oldValue) {
        this.currentPageIndex = 1;
        this.setShowPopover(false, null, this.currentPageIndex);

        await this.loadPagingData();
      }
    },

    checkedList: {
      handler(newValue) {
        if (newValue.length <= 1) {
          this.setShowDropdown(null, false);
        }
      },
      deep: true,
    },
  },
  computed: {},
  async created() {
    try {
      await this.loadTableColumns();

      await this.loadPagingData();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    // SỰ KIỆN EVENT
    async onShortCutsEnter(e) {
      e.preventDefault();

      if (e.keyCode == 112) {
        await this.onClickNewForm();
      }
    },

    async onClickWatchForm(_data) {
      this.setSelectedRow(_data.PaymentId);

      await this.getById();

      this.setShowDialog(true, this.MISA_ENUM.formMode.Watch, this.paymentSelected, this.detailsSelected );
    },
    /**
     * Mô tả : Mở form mới
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 13:11 20/05/2022
     */
    async onClickNewForm() {
      this.paymentSelected = {
        DescriptionPayment: "Chi tiền cho",
        PaymentDate: new Date().toDateString(),
        AccountingDate: new Date().toDateString(),
        TotalPaymentMoney: 0.0,
        CurrencyId: this.mockData.mockCurrencyId[0].currencyId,
        ExchangeRate: this.mockData.mockCurrencyId[0].exchangeRate,
      };

      this.detailsSelected = [
        {
          DescriptionPaymentDetail: this.paymentSelected.DescriptionPayment,
          CashAmount: 0.0,
          ExchangeAmount: 0.0,
        },
      ];

      await this.newPaymentCode();

      this.setShowDialog(
        true,
        this.MISA_ENUM.formMode.Add,
        this.paymentSelected,
        this.detailsSelected
      );
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
          this.toastMsg.manyNotSelectedMsg("Phiếu chỉ"),
          this.MISA_ENUM.toastEnum.warning
        );
        return;
      }

      this.setShowPopup(
        true,
        this.MISA_ENUM.popupEnum.confirm,
        this.popupMsg.confirmDeleteManyMsg("Phiếu chi"),
        this.deleteMany
      );
    },
    /**
     * Mô tả : Sự kiện nhân bản ở 1 dòng trong danh sách
     * @param _payment: phiếu chi được chọn
     * Created by: NHLOC - MF1099
     * Created date: 11:20 16/04/2022
     */
    async onDuplicateCreate() {
      // 1. lấy dữ liệu phiếu chi
      console.log(this.rowIdSelected);

      // gọi api
      await this.getById(this.rowIdSelected);

      if (!this.paymentSelected.DescriptionPayment) {
        this.paymentSelected.DescriptionPayment = "Chi tiền cho";
      }
      if (!this.paymentSelected.PaymentDate) {
        this.paymentSelected.PaymentDate = new Date().toDateString();
      }
      if (!this.paymentSelected.AccountingDate) {
        this.paymentSelected.AccountingDate = new Date().toDateString();
      }
      if (!this.paymentSelected.TotalPaymentMoney) {
        this.paymentSelected.AccountingDate = 0.0;
      }
      await this.newPaymentCode();

      // 2. Hiển thị Dialog (true, dữ liệu phiếu chi được chọn, chỉnh sửa) và đóng các popup lại
      this.setShowDialog(
        true,
        this.MISA_ENUM.formMode.Add,
        this.paymentSelected,
        this.detailsSelected
      );
    },
    /**
     * Mô tả : Sự kiện click vào checkbox trong danh sách
     * >> Highlight dòng + hiện tick
     * Created by: NHLOC - MF1099
     * Created date: 17:12 19/04/2022
     */
    checkboxClick(_paymentId) {
      // Nếu dòng đã được chọn >> xóa khỏi danh sách checkbox
      if (_paymentId && this.checkedList.includes(_paymentId)) {
        // Tìm vị trí employee được được xóa khỏi danh sách
        const index = this.checkedList.findIndex((empId) => {
          return empId === _paymentId;
        });
        // Xóa khỏi danh sách checkbox
        this.checkedList.splice(index, 1);
      }
      // chưa được chọn thì thêm vào danh sách checkbox
      else {
        this.checkedList.push(_paymentId);
      }
    },
    /**
     * Mô tả : Xử lý sụ kiện xóa phiếu chi
     * Created by: NHLOC - MF1099
     * Created date: 13:54 18/04/2022
     */
    onDeleteClick() {
      // Nếu đã chọn 1 dòng >> Thực hiện xóa phiếu chi
      if (this.rowIdSelected) {
        try {
          console.log(this.rowIdSelected);

          // Hiện popup xác nhận xóa mã phiếu chi
          const paymentCode = this.paymentSelected.PaymentCode;

          this.setShowPopup(
            true,
            this.MISA_ENUM.popupEnum.confirm,
            this.popupMsg.confirmDeleteMsg(paymentCode, "Phiếu chi"),
            // Chạy hàm callback xóa dữ liệu nếu xác nhận đồng ý
            this.deleteData
          );
        } catch (error) {
          console.error(error);
        }
      }
    },

    // HÀM API
    /**
     * Mô tả : Chạy api export dữ liệu
     * Created by: NHLOC - MF1099
     * Created date: 10:41 26/04/2022
     */
    async exportData() {
      try {
        const { data } = await axios.get(this.MISA_API.TABLE_API("payment"));

        let columnList = [];
        for (const column of data) {
          if (column.isShow) {
            columnList.push({
              Label: column.label,
              DisplayLabel: column.displayLabel,
              Name: column.name,
              Format: column.format,
            });
          }
        }

        const localAPI = this.MISA_API.PAYMENT_EXPORT;
        const response = await axios.post(localAPI, columnList, {
          responseType: "blob",
        });

        FileSaver.saveAs(response.data, "Danh_sach_phieu_chi.xlsx");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả : Load các dữ liệu cột
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 15:33 27/05/2022
     */
    async loadTableColumns() {
      try {
        const { data } = await axios.get(this.MISA_API.TABLE_API("payment"));

        this.cashColumns = data;
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
        await axios.delete(this.MISA_API.PAYMENT_DELETE_MANY, {
          data: this.checkedList,
        });

        // load lại trang
        this.loadPagingData();

        // Báo toast xóa thành công n nhân viên
        this.setShowToast(
          true,
          this.toastMsg.deleteSuccessMany(this.checkedList.length, "Phiếu chi"),
          this.MISA_ENUM.toastEnum.success
        );

        // reset checklist
        this.checkedList = [];
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
    async newPaymentCode() {
      try {
        const localAPI = this.MISA_API.PAYMENT_NEW_CODE;

        const { data } = await axios.get(localAPI);

        let newCode = `PM${data}`;

        this.paymentSelected.PaymentCode = newCode;
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
          const localAPI = this.MISA_API.PAYMENT_WITH_DETAIL_ID(
            this.rowIdSelected
          );

          const { data } = await axios.get(localAPI);

          this.paymentSelected = data.payment;
          this.detailsSelected = data.paymentDetail;

          if (!this.detailsSelected || this.detailsSelected.length <= 0){
            this.detailsSelected = [{}];
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Mô tả : Lấy tổng tiền
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 16:46 03/06/2022
     */
    async getTotalPaymentAll() {
      try {
        const localAPI = this.MISA_API.PAYMENT_BASE;

        let totalMoney = 0;
        const { data } = await axios.get(localAPI);
        data.map((payment) => {
          totalMoney += payment.TotalPaymentMoney;
        });

        this.totalCashAmount = totalMoney;
      } catch (error) {
        console.log(error);
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

        console.log(this.isRecordFilter);

        const localAPI = this.MISA_API.PAYMENT_FILTER(
          this.currentPageIndex,
          this.currentPageSize,
          this.currentFilter,
          this.isRecordFilter,
          this.startDateFilter,
          this.endDateFilter
        );

        console.log(localAPI);
        const response = await axios.get(localAPI);

        const { Data, TotalRecord, TotalPage } = response.data;

        this.paymentData = Data == null ? [] : Data;
        this.totalRecords = TotalRecord;
        this.totalPage = TotalPage;

        await this.getTotalPaymentAll();

        // reset các biến
        setTimeout(() => {
          this.isLoading = false;
        }, 500);

        this.rowIdSelected = null;
        this.checkedList = [];
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Xóa 1 phiếu chi bằng API
     * Created by: NHLOC - MF1099
     * Created date: 17:04 19/04/2022
     */
    async deleteData() {
      try {
        // Lấy API xóa + id dòng được chọn
        const localAPI = this.MISA_API.PAYMENT_WITH_ID(this.rowIdSelected);

        await axios.delete(localAPI);

        // Xóa phiếu chi khỏi danh sách phiếu chi
        let index = this.paymentData.findIndex((payment) => {
          return payment.PaymentId === this.rowIdSelected;
        });
        this.paymentData.splice(index, 1);

        await this.loadPagingData();

        // Reset lại id dòng được chọn + đóng popover hiện tại đang mở
        this.rowIdSelected = null;
        this.setShowPopover(false, null, this.popOverIndex);

        // Hiện toast báo "xóa 1 phiếu chi thành công"
        this.setShowToast(
          true,
          this.toastMsg.deleteSuccessMsg("Phiếu chi"),
          this.MISA_ENUM.toastEnum.success
        );

      } catch (error) {
        let response = this.handleError(error);

        console.log(response);
      }
    },
    // HÀM SETTER
    /**
     * Mô tả : ẩn hiện popover
     * @param _isShow: bool ẩn hiện popover
     * @param _popOverData: dữ liệu phiếu chi
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
          this.paymentSelected = _popOverData;
          this.popOverIndex = _index;
        }
        // Hiện popover
        this.isShowPopover = _isShow;

        // highlight dòng được chọn
        this.setSelectedRow(_popOverData?.PaymentId);
      } else {
        // reset các trạng thái + đóng popover
        this.paymentSelected = null;
        this.popOverIndex = null;
        this.isShowPopover = false;

        // ẩn highlight dòng được chọn
        this.setSelectedRow(null);
      }
    },
    /**
    * Mô tả : Chạy filter
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 00:18 07/06/2022
    */
    async setFilterAdvance(_isRecord = null, _dateStart = null, _dateEnd = null){
      this.isRecordFilter = _isRecord;
      this.startDateFilter = _dateStart;
      this.endDateFilter = _dateEnd

      await this.loadPagingData();

      this.setShowFilter();

    },

    /**
     * Mô tả : Hiển thị filter
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 22:46 06/06/2022
     */
    setShowFilter(event=null) {
      this.isShowFilter = !this.isShowFilter;

      if (this.isShowFilter){
        this.filterPosX = event.left - 380;
        this.filterPosY = event.bottom;
      }
    },

    /**
     * Mô tả : Select dòng bằng 1 lần click
     * @param _paymentId: dữ liệu dòng phiếu chi được chọn
     * Created by: NHLOC - MF1099
     * Created date: 11:31 16/04/2022
     */
    setSelectedRow(_paymentId) {
      if (this.rowIdSelected && this.rowIdSelected == _paymentId) {
        this.rowIdSelected = null;
      } else {
        this.rowIdSelected = _paymentId;
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
      if (this.checkedList.length == this.paymentData.length) {
        this.checkedList = [];
      }
      // Chọn hết
      else {
        this.checkedList = [];
        this.paymentData.map((payment) => {
          this.checkedList.push(payment.PaymentId);
        });
      }
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
     * Mô tả : ẩn và hiện form detail của phiếu chi
     * @param _isShow: hiện show form
     * @param _paymentData: dữ liệu phiếu chi được hiện
     * @param _detailData: dữ liệu hạch toán được hiện
     * @param _formMode: trạng thái của form
     * Created by: NHLOC - MF1099
     * Created date: 11:20 16/04/2022
     */
    async setShowDialog(_isShow, _formMode = null ,_paymentData = null, _detailData=null ) {
      // Load lại trang nếu đóng form
      if (!_isShow) {
        this.loadPagingData();
      } else {
        this.setShowPopover(false);
      }

      // set các trường cho components
      this.paymentSelected = _paymentData;
      this.detailsSelected = _detailData;
      this.formMode = _formMode;
      this.isShowDialog = _isShow;

      // this.$router.push({name: "CAPaymentDetail", params: {formMode: this.formMode, paymentSelected: this.paymentSelected, detailSelected: this.detailsSelected }})
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
     * @param {*} currentIndex thông tin để phân trang và filter
     * @param {*} pageSize số nhân viên/trang
     * Created by: NHLOC - MF1099
     * Created date: 22:28 21/04/2022
     */
    async selectedPaging(currentIndex, pageSize) {
      // set các trạng thái được truyền về từ component
      try {
        this.currentPageIndex = currentIndex;
        this.currentPageSize = pageSize;

        // // load lại dữ liệu
        await this.loadPagingData();
      } catch (error) {
        console.log(error);
      }
    },

    // HÀM TIỆN ÍCH
    formatDataInTable,
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
  },
  data() {
    return {
      // 1. Dữ liệu cho table
      // dữ liệu các thu chi
      paymentData: [],

      // footer cho payment
      paymentTotalFooter: 0,

      // danh sách được chọn trong danh sách
      checkedList: [],

      // tổng thu chi
      totalCashAmount: 0,

      isLoading: false,

      // 1.2. Delay cho input search
      delayTimer: null,

      // 1.3. Filter nâng cao
      isShowFilter: false,

      isRecordFilter: null,

      rangeStateFilter: 0,

      startDateFilter: null,
      endDateFilter: null,


      filterPosX: null,
      filterPosY: null,

      // 2.  biến cho Tùy chỉnh giao diện
      isShowSettingDialog: false,

      // set tên cột, format, biến cột dùng, vị trí (left-right-center)
      cashColumns: [],

      // 3. Thuộc tính của Form phiếu chi
      // biến hiện form phiếu chi
      isShowDialog: false,

      // formMode: 0 - thêm, 1 - sửa, 2 - xóa
      formMode: null,

      // dữ liệu phiếu chi được chọn
      paymentSelected: {},

      // dữ liệu hạch toán được chọn
      detailsSelected: [],

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

      // 7. Thuộc tính của paging
      // Tổng số bản ghi
      totalRecords: null,

      // tổng số trang
      totalPage: null,

      // filter theo tất cả cột
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
    };
  },
};
</script>
<style scoped>
.m-view-container {
  width: 100%;
  height: calc(100% - 67px);
  overflow: auto;
}

.m-view-container > div {
  margin-right: 30px;
}
@import url("@/css/components/button.css");
@import url("@/css/components/title.css");
@import url("@/css/components/dropdown.css");
@import url("@/css/components/overview.css");
</style>
