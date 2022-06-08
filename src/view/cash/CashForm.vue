<template>
  <div class="m-shadow-box" @keydown.esc="setCloseDialog()" tabindex="-1">
    <div class="m-dialog" id="paymentDetail">
      <!-- HEADER CỦA FORM -->
      <div class="m-dialog-header grey-background flex flex-align-center">
        <div class="m-icon icon--recent mg-r-6"></div>

        <div class="header-title text-overflow-hidden">
          Phiếu chi {{ this.currentPayment.PaymentCode }}
        </div>

        <div class="detail-input">
          <base-combobox
            :defaultData="this.mockData.mockPaymentPurposes"
            v-model="this.paymentPurpose"
            propTxt="text"
            propValue="value"
            class="w-350"
            :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
          />
        </div>

        <div class="flex-grow"></div>

        <div class="btn-detail-group flex flex-align-center">
          <div class="title__tour-guide">
            <div class="m-icon icon--tour"></div>
            <div class="tour-label">Hướng dẫn</div>
          </div>
          <div class="btn-detail">
            <div class="m-icon icon--setting" title="Tùy chỉnh giao diện"></div>
          </div>
          <div class="btn-detail">
            <div class="m-icon icon--help" title="Giúp (F1)"></div>
          </div>
          <div
            class="btn-detail"
            title="Đóng (ESC)"
            @click.prevent="
              setCloseDialog(
                !isMatch(this.compareDetailList, this.paymentDetailList) ||
                  !isMatch(this.comparePayment, this.currentPayment)
              )
            "
          >
            <div class="m-icon icon--close"></div>
          </div>
        </div>
      </div>

      <!-- NỘI DUNG CỦA FORM -->
      <div class="m-dialog-content">
        <div class="main-info flex grey-background" style="z-index: 100">
          <!-- THÔNG TIN CƠ BẢN -->
          <div class="w-75">
            <div class="basic-info flex">
              <!-- BÊN PHẢI -->
              <div class="w-80 right-seperate">
                <div class="m-row">
                  <div class="w-43 mg-r-12">
                    <div class="m-label">Mã đối tượng</div>

                    <base-combo-table
                      ref="AccountObjectId"
                      propTxt="VendorCode"
                      propValue="VendorId"
                      :api="this.MISA_API.VENDOR_BASE"
                      :columns="columnsObject"
                      v-model="this.currentPayment.AccountObjectId"
                      maxWidth="max-content"
                      @updateParentObject="updateParentPayment"
                      :childKey="['VendorName', 'VendorName', 'VendorAddress']"
                      :parentKey="[
                        'AccountObjectName',
                        'ReceiverName',
                        'Address',
                      ]"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>
                  <div class="w-57">
                    <div class="m-label">Tên đối tượng</div>
                    <base-input
                      v-model="this.currentPayment.AccountObjectName"
                      ref="AccountObjectName"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>
                </div>

                <div class="m-row">
                  <div class="w-43 mg-r-12">
                    <div class="m-label">Người nhận</div>
                    <base-input
                      v-model="this.currentPayment.ReceiverName"
                      ref="ReceiverName"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>
                  <div class="w-57">
                    <div class="m-label">Địa chỉ</div>
                    <base-input
                      v-model="this.currentPayment.Address"
                      ref="Address"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>
                </div>

                <div class="m-row">
                  <div class="w-full">
                    <div class="m-label">Lý do chi</div>
                    <base-input
                      v-model="this.currentPayment.DescriptionPayment"
                      ref="DescriptionPayment"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>
                </div>

                <div class="m-row">
                  <div class="w-43 mg-r-12">
                    <div class="m-label">Nhân viên</div>
                    <base-combo-table
                      ref="EmployeeId"
                      propTxt="EmployeeName"
                      propValue="EmployeeId"
                      :api="this.MISA_API.EMPLOYEE_BASE"
                      :columns="columnsEmployee"
                      v-model="this.currentPayment.EmployeeId"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>

                  <div class="w-57 flex w-240 mg-r-12">
                    <div>
                      <div class="m-label">Kèm theo</div>
                      <base-input
                        v-model="this.currentPayment.AttachDocumentAmount"
                        placeholder="Số lượng"
                        ref="AttachDocumentAmount"
                        inputType="currency"
                        :isInputRight="true"
                        :isDisabled="
                          this.formMode == this.MISA_ENUM.formMode.Watch
                        "
                      />
                    </div>
                    <div class="root-invoice pr-2 pl-2">Chứng từ gốc</div>
                  </div>
                </div>

                <div class="reference-row flex">
                  <div class="reference-title">Tham chiếu</div>
                  <div class="reference-show-more">...</div>
                </div>
              </div>
              <!-- BÊN TRÁI -->
              <div class="w-20">
                <div class="m-row left-seperate">
                  <div>
                    <div class="m-label">Ngày hạch toán</div>
                    <!-- eslint-disable  -->
                    <date-picker
                      v-model:value="formatAccountingDate"
                      :format="'DD/MM/YYYY'"
                      :placeholder="'DD/MM/YYYY'"
                      :lang="'vi'"
                      :clearable="false"
                      title-format="'DD/MM/YYYY'"
                      :disabled-date="afterToday"
                      :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                    />
                    <!-- eslint-enable  -->
                  </div>
                </div>
                <div class="m-row left-seperate">
                  <div>
                    <div class="m-label">Ngày phiếu chi</div>
                    <!-- eslint-disable  -->
                    <date-picker
                      v-model:value="formatPaymentDate"
                      :format="'DD/MM/YYYY'"
                      :placeholder="'DD/MM/YYYY'"
                      :lang="'vi'"
                      :clearable="false"
                      title-format="'DD/MM/YYYY'"
                      :disabled-date="afterAccountingDate"
                      :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                    />
                    <!-- eslint-enable  -->
                  </div>
                </div>
                <div class="m-row left-seperate">
                  <div>
                    <div class="m-label">
                      Số phiếu chi <span class="required">*</span>
                    </div>
                    <base-input
                      v-model="this.currentPayment.PaymentCode"
                      ref="PaymentCode"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- TỔNG TIỀN -->
          <div class="w-25 summary-info">
            <div class="summary-title">Tổng tiền</div>
            <div class="summary-number">
              {{
                formatDataInTable(
                  this.currentPayment.TotalPaymentMoney,
                  "money"
                )
              }}
            </div>
          </div>
        </div>

        <!-- BẢNG HẠCH TOÁN CHI TIẾT  -->
        <!-- TAB BẢNG -->
        <div class="grid-tab flex flex-align-center" style="z-index: 99">
          <div class="tab-left flex-grow">
            <div class="tab">Hạch toán</div>
          </div>
          <div class="tab-right w-20">
            <div class="grid-option flex">
              <span class="flex flex-align-center">
                <div class="label-option">Loại tiền</div>
                <base-combo-table
                  class="w-100 w-max-100"
                  propTxt="currencyCode"
                  propValue="currencyId"
                  :defaultData="this.mockData.mockCurrencyId"
                  :columns="columnCurrency"
                  :hasAddNewIcon="false"
                  v-model="this.currentPayment.CurrencyId"
                  maxWidth="max-content"
                  ref="CurrencyId"
                  @updateParentObject="updateParentPayment"
                  :childKey="['exchangeRate']"
                  :parentKey="['ExchangeRate']"
                  :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                />
              </span>
            </div>
          </div>
        </div>

        <!-- DANH SÁCH BẢNG  -->
        <div class="grid-table mg-b-12">
          <table class="m-table">
            <thead class="m-thead">
              <tr class="m-tr">
                <th class="space sticky-col left"></th>
                <th class="m-th" style="width: 16px; min-width: 16px">#</th>
                <th
                  class="m-th text-align-left text-overflow-hidden"
                  style="width: 250px; min-width: 250px"
                >
                  Diễn giải
                </th>
                <th
                  class="m-th text-align-left"
                  style="width: 150px; min-width: 150px; max-width: 150px"
                >
                  TK Nợ
                </th>
                <th
                  class="m-th text-align-left"
                  style="width: 150px; min-width: 150px"
                >
                  TK Có
                </th>
                <th
                  class="m-th text-align-left"
                  style="width: 100px; min-width: 100px"
                >
                  Số tiền
                </th>

                <th
                  class="m-th text-align-left"
                  style="width: 180px; min-width: 180px"
                >
                  Mã đối tượng
                </th>
                <th
                  class="m-th text-align-left"
                  style="width: 180px; min-width: 180px"
                >
                  Tên đối tượng
                </th>
                <th class="m-th" style="width: 16px; min-width: 16px"></th>
                <th class="space sticky-col right"></th>
              </tr>
            </thead>
            <tbody class="m-tbody">
              <tr
                class="m-tr"
                v-for="(paymentDetail, index) of paymentDetailList"
                :key="index"
                @click.prevent="setSelectedRowDetail(index)"
                :class="{
                  'm-row-selected': this.selectedDetailIndex == index,
                }"
              >
                <td class="space static-col left"></td>
                <td class="m-td text-align-center">
                  {{ this.reformatIndex(index) }}
                </td>
                <td
                  class="m-td text-overflow-hidden"
                  :title="paymentDetail.DescriptionPaymentDetail"
                  style="max-width: 120px"
                >
                  <base-input
                    v-model="paymentDetail.DescriptionPaymentDetail"
                    v-if="this.selectedDetailIndex == index"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  />
                  <span v-else>{{
                    paymentDetail.DescriptionPaymentDetail
                  }}</span>
                </td>
                <td class="m-td">
                  <base-combo-table
                    mapProp="BankAccount"
                    propTxt="BankAccount"
                    propValue="BankId"
                    maxWidth="max-content"
                    v-model="paymentDetail.DebitAccountId"
                    :unfocusState="this.selectedDetailIndex == index"
                    :hasAddNewIcon="false"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                    :defaultData="this.mockData.bankAccountsMock"
                    :columns="columnBanks"
                  />
                </td>
                <td class="m-td">
                  <base-combo-table
                    mapProp="BankAccount"
                    propTxt="BankAccount"
                    propValue="BankId"
                    maxWidth="max-content"
                    v-model="paymentDetail.CreditAccountId"
                    :defaultData="this.mockData.bankAccountsMock"
                    :columns="columnBanks"
                    :hasAddNewIcon="false"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                    :unfocusState="this.selectedDetailIndex == index"
                  />
                </td>
                <td class="m-td text-align-right">
                  <base-input
                    v-model="paymentDetail.CashAmount"
                    v-if="this.selectedDetailIndex == index"
                    inputType="currency"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                    :isInputRight="true"
                  />
                  <span v-else>
                    {{ formatDataInTable(paymentDetail.CashAmount, "money") }}
                  </span>
                </td>

                <td class="m-td">
                  <base-combo-table
                    ref="DetailAccountId"
                    :unfocusState="this.selectedDetailIndex == index"
                    mapProp="VendorCode"
                    propTxt="VendorCode"
                    propValue="VendorId"
                    :api="this.MISA_API.VENDOR_BASE"
                    :columns="columnsObject"
                    maxWidth="max-content"
                    v-model="paymentDetail.AccountObjectId"
                    :hasAddNewIcon="false"
                    @updateParentObject="updateParentDetailPayment"
                    :childKey="['VendorName']"
                    :parentKey="['AccountObjectName']"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  />
                </td>

                <td class="m-td">
                  {{ paymentDetail.AccountObjectName }}
                </td>
                <td class="m-td" style="width: 16px; min-width: 16px">
                  <button
                    class="m-icon m-icon-w-16 icon-delete border-none"
                    @click.stop="setDeleteDetailRow(index)"
                    :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  ></button>
                </td>

                <td class="space static-col right"></td>
              </tr>
            </tbody>
            <tfoot class="m-tfoot">
              <tr class="m-tr">
                <td class="space sticky-col left"></td>
                <td class="m-td"></td>
                <td class="m-td"></td>
                <td class="m-td"></td>
                <td class="m-td"></td>
                <td class="m-td text-align-right">
                  {{
                    formatDataInTable(
                      this.currentPayment.TotalPaymentMoney,
                      "money"
                    )
                  }}
                </td>
                <td class="m-td"></td>
                <td class="m-td"></td>
                <td class="m-td"></td>
                <td class="space sticky-col right"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="grid-control-item left">
          <div class="grid-btn-group">
            <button
              class="m-btn m-btn-secondary"
              @click.prevent="setAppendDetailList"
              :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
            >
              Thêm dòng
            </button>
            <button
              class="m-btn m-btn-secondary"
              @click.prevent="
                this.setShowPopup(
                  true,
                  this.MISA_ENUM.popupEnum.confirm,
                  this.popupMsg.deleteManyConfirm,
                  setDeleteAllDetailList
                )
              "
              :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
            >
              Xóa hết dòng
            </button>
          </div>

          <div class="w-40 w-max-500">
            <div class="m-row">
              <div class="w-half">
                <div class="m-label">Trường mở rộng 1</div>
                <base-input
                  :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                />
              </div>
            </div>

            <div class="m-row">
              <div class="w-half">
                <div class="m-label">Trường mở rộng 2</div>
                <base-input
                  :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                />
              </div>
            </div>

            <div class="m-row">
              <div class="w-half">
                <div class="m-label">Trường mở rộng 3</div>
                <base-input
                  :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                />
              </div>
            </div>

            <div class="m-row">
              <div class="w-80">
                <div class="flex">
                  <div class="m-icon icon--attach"></div>
                  <div class="m-label">Đính kèm</div>
                  <div class="max-upload-size">Dung lượng tối đa 5MB</div>
                </div>
                <div class="m-upload">
                  <div class="m-input-upload">
                    <input type="file" />
                    <span class="text-input"
                      >Kéo/thả tệp vào đây hoặc bấm vào đây</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- FOOTER CỦA FORM -->
      <div class="m-dialog-footer">
        <div class="left-group-btn">
          <button
            class="m-btn-footer btn-size-default mg-r-6"
            @click.prevent="setCloseDialog(false)"
          >
            Hủy
          </button>
          <!-- <button class="m-btn-footer btn-size-default">Hoãn</button> -->
        </div>

        <div class="flex-grow"></div>

        <div class="right-group-btn flex">
          <!-- <button
            class="m-btn-footer btn-size-default mg-r-6"
            @click.prevent="saveEventHandler(true)"
            :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
            title="Ctrl + S"
          >
            Cất
          </button> -->
          <!-- <button
            class="m-btn-footer m-btn-primary btn-size-default"
            @click.prevent="saveEventHandler(false)"
            :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
            title="Ctrl + Shift + S"
          >
            Cất và In
          </button> -->
          <div class="m-add-dropdown" id="footerCash">
            <button
              class="add-btn m-btn m-btn-primary"
              @click.prevent="saveEventHandler(this.closeFormState)"
              :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
            >
              <span v-if="this.closeFormState == false">Cất và thêm</span>
              <span v-if="this.closeFormState == true">Cất và đóng</span>
            </button>
            <div class="dropdown-btn m-btn m-btn-primary">
              <div
                class="m-icon m-icon-w-16 icon--arrowUp--white border-outline-none"
                @click.prevent="setShowPopover"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- POPOVER CHỨC NĂNG ĐÓNG CỦA FOOTER -->
      <transition>
        <ul
          class="m-popover"
          id="basePopover"
          v-show="isShowPopover"
          :style="{ top: popOverY + 'px', left: popOverX + 'px' }"
        >
          <li
            class="popover-list"
            @click.prevent="
              () => {
                this.closeFormState = true;
                this.isShowPopover = false;
              }
            "
          >
            Cất và đóng
          </li>
          <li
            class="popover-list"
            @click.prevent="
              () => {
                this.closeFormState = false;
                this.isShowPopover = false;
              }
            "
          >
            Cất và thêm
          </li>
        </ul>
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

      <!-- HIỆN TOAST BÁO THÀNH CÔNG, LỖI -->
      <transition name="fast">
        <base-toast
          v-model="isShowToastMsg"
          :content="toastContent"
          :type="toastType"
        />
      </transition>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import currency from "currency.js";

import "vue-datepicker-next/index.css";
import DatePicker from "vue-datepicker-next";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseComboTable from "@/components/base/combobox/BaseComboTable.vue";
import BaseCombobox from "@/components/base/combobox/BaseCombobox.vue";
import BasePopup from "@/components/base/popup/BasePopup.vue";
import BaseToast from "@/components/base/popup/BaseToast.vue";

import { isMatch, mapData, formatDataInTable } from "@/js/utils";

export default {
  name: "view-cashform",
  components: {
    BaseComboTable,
    BaseInput,
    DatePicker,
    BaseCombobox,
    BasePopup,
    BaseToast,
  },
  props: {
    formMode: { type: [Number, String] },
    paymentSelected: { type: Object, default: () => {} },
    detailSelected: {
      type: Array,
      default: () => [],
    },
    isRouter: {
      type: String,
      default: null
    }
  },
  watch: {
    "currentPayment.AccountObjectId": function (newValue) {
      if (newValue && this.formMode != this.MISA_ENUM.formMode.Watch) {
        this.paymentDetailList[0].AccountObjectId = newValue;
        this.paymentDetailList[0].AccountObjectName =
          this.currentPayment.AccountObjectName;
      }
    },
    "currentPayment.DescriptionPayment": function (newValue, oldValue) {
      if (
        newValue &&
        oldValue &&
        this.formMode != this.MISA_ENUM.formMode.Watch
      ) {
        this.updateAllDetailDescription(newValue, oldValue);
      }
    },

    paymentDetailList: {
      handler(newValue) {
        let total = currency(0, {
          separator: ".",
          decimal: ",",
          symbol: "",
          precision: 1,
        });
        newValue.map((detail) => {
          if (detail.CashAmount) total = total.add(detail.CashAmount);
        });

        if (this.currentPayment) {
          this.currentPayment.TotalPaymentMoney = total.value;
        }
      },
      deep: true,
    },
  },
  computed: {
    formatAccountingDate: {
      get() {
        if (!this.currentPayment.AccountingDate) return;
        return new Date(this.currentPayment.AccountingDate);
      },
      set(newValue) {
        if (newValue <= new Date(this.currentPayment.PaymentDate)) {
          this.currentPayment.PaymentDate = newValue.toDateString();
        }

        this.currentPayment.AccountingDate = newValue.toDateString();
      },
    },

    formatPaymentDate: {
      get() {
        if (!this.currentPayment.PaymentDate) return;
        return new Date(this.currentPayment.PaymentDate);
      },
      set(newValue) {
        this.currentPayment.PaymentDate = newValue.toDateString();
      },
    },
  },
  mounted() {
    
    // gán dữ liệu chi tiêu
    if (this.formMode == this.MISA_ENUM.formMode.Add && this.isRouter){
      this.newPaymentForm();
    }

    else {
      this.currentPayment = this.paymentSelected;
      this.paymentDetailList = this.detailSelected;
    }

    // Gán đối tượng để khi đóng form >> so sánh xem có thay đổi
    this.setCompareState();

    if (this.formMode != this.MISA_ENUM.formMode.Watch) {
      this.$refs.AccountObjectId.setFocus();
    }
  },
  methods: {
    // HÀM SỰ KIỆN EVENT
    async saveEventHandler(_isCloseForm = true) {
      // // eslint-disable-next-line
      // debugger

      // khởi tạo biến check lỗi
      let isError = false;
      let contentError = "";
      let listError = [];

      // kiểm tra rỗng
      if (!this.currentPayment.PaymentCode) {
        // set lỗi
        isError = true;
        contentError = this.errorMsg.notEmptyCode("Phiếu chi");
        listError.push(contentError);

        this.$refs.PaymentCode.setError(contentError);
      }

      // Kiểm tra có lỗi (Không lỗi > check formMode > chạy api)
      if (isError) {
        // Lỗi > báo popup
        this.setShowPopup(true, this.MISA_ENUM.popupEnum.alert, listError[0]);
      } else {
        try {
          // format lại dữ liệu dạng string của detail và attach document về thành float
          this.paymentDetailList.map((detail) => {
            if (detail.CashAmount)
              detail.CashAmount = currency(detail.CashAmount, {
                separator: ".",
                decimal: ",",
                symbol: "",
                precision: 1,
              }).value;
          });

          this.currentPayment.AttachDocumentAmount = currency(
            this.currentPayment.AttachDocumentAmount,
            {
              separator: ".",
              decimal: ",",
              symbol: "",
              precision: 1,
            }
          ).value;

          // Thêm mới phiếu chi
          if (this.formMode == this.MISA_ENUM.formMode.Add) {
            await this.addNewPayment();
          }
        } catch (error) {
          console.log(error);

          // nếu có lỗi báo
          isError = true;
        }

        if (isError) return;

        if (_isCloseForm == true) this.setCloseDialog();
        else {
          // lưu thành công + tạo mới form
          await this.newPaymentForm();
        }
      }
    },

    // HÀM SETTER
    /**
     * Mô tả : Set giá trị để check thay đổi
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 16:58 27/05/2022
     */
    setCompareState() {
      this.compareDetailList = JSON.parse(
        JSON.stringify(this.paymentDetailList)
      );
      Object.assign(this.comparePayment, this.currentPayment);
    },

    setCloseDialog(_isChanged = false) {
      if (_isChanged) {
        // Mở popup xác nhận form thay đổi
        this.setShowPopup(
          true,
          // Trạng thái của popup
          this.MISA_ENUM.popupEnum.question,
          // Text báo popup muốn xác nhận
          this.popupMsg.confirmChangeDataMsg,
          // Nếu xác nhận "Có" > Chạy hàm lưu dữ liệu
          this.saveEventHandler,
          // "Không" thì đóng form (không lưu)
          this.setCloseDialog
        );
        return;
      }

      if (this.isRouter){
        window.history.back();
      }
      else{
        this.$emit("setShowForm", false);
      }
    },

    setShowPopover() {
      if (this.formMode != this.MISA_ENUM.formMode.Watch) {
        this.isShowPopover = !this.isShowPopover;

        if (this.isShowPopover) {
          let footer = document
            .getElementById("footerCash")
            .getBoundingClientRect();

          this.popOverX = footer.right - 102;
          this.popOverY = footer.top - footer.height - 25;
        }
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
     * Mô tả : Chọn dòng trong bảng hạch toán
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 11:26 27/05/2022
     */
    setSelectedRowDetail(_index) {
      if (this.formMode != this.MISA_ENUM.formMode.Watch)
        this.selectedDetailIndex = _index;
    },
    /**
     * Mô tả : Thêm mới dòng hạch toán
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 02:18 27/05/2022
     */
    setAppendDetailList() {
      if (this.paymentDetailList.length == 0) {
        this.paymentDetailList.push({
          CashAmount: 0.0,
          ExchangeAmount: 0.0,
          DescriptionPaymentDetail: "Chi tiền cho",
        });
      } else {
        let prevDetail = Object.assign(
          {},
          this.paymentDetailList[this.paymentDetailList.length - 1]
        );
        this.paymentDetailList.push(prevDetail);
      }

      this.selectedDetailIndex = this.paymentDetailList.length - 1;
    },
    /**
     * Mô tả : Xóa hết các dòng hạch toán
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 02:18 27/05/2022
     */
    setDeleteAllDetailList() {
      this.paymentDetailList = [
        {
          CashAmount: 0.0,
          ExchangeAmount: 0.0,
          DescriptionPaymentDetail: "Chi tiền cho",
        },
      ];
      this.selectedDetailIndex = 0;
    },
    /**
     * Mô tả : Xóa 1 dòng hạch toán
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 02:18 27/05/2022
     */
    setDeleteDetailRow(index) {
      this.paymentDetailList.splice(index, 1);
    },
    /**
     * Mô tả : Hàm update giá trị của key trong phiếu chi
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 01:45 26/05/2022
     */
    updateParentPayment(parentKeys, childKeys, objectValue) {
      for (let i = 0; i < parentKeys.length; i++) {
        let key = parentKeys[i];
        let childKey = childKeys[i];

        switch (key) {
          case "Address": {
            this.currentPayment[key] = objectValue[childKey];
            break;
          }
          case "ReceiverName": {
            // Nếu tên đối tượng là cá nhân
            if (objectValue["VendorType"] == 0) {
              // => Người nhận mặc định bind theo tên đối tượng trong combo đối tượng.
              this.currentPayment[key] = objectValue[childKey];
            }
            // Nếu tên đối tượng là tổ chức
            else if (objectValue["VendorType"] == 1) {
              // => Người nhận bind là người đại diện cho tổ chức đó.
              this.currentPayment[key] = objectValue["ContactLegalRep"];
            }
            break;
          }
          case "AccountObjectName": {
            this.currentPayment[key] = objectValue[childKey];

            let newDesc = `Chi tiền cho ${objectValue[childKey]}`;

            this.updateAllDetailDescription(
              newDesc,
              this.currentPayment.DescriptionPayment
            );
            this.currentPayment.DescriptionPayment = newDesc;

            break;
          }
          case "ExchangeRate": {
            this.currentPayment[key] = objectValue[childKey];

            this.paymentDetailList[0].ExchangeAmount =
              this.currentPayment.ExchangeRate;
            break;
          }
          default: {
            this.currentPayment[key] = objectValue[childKey];
            break;
          }
        }
      }
    },

    /**
     * Mô tả : Hàm cập nhật các lý do chi của hạch toán
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 01:46 26/05/2022
     */
    updateAllDetailDescription(_description, _oldDescription) {
      for (let i = 0; i < this.paymentDetailList.length; i++) {
        let detail = this.paymentDetailList[i];

        if (
          detail.DescriptionPaymentDetail.trimEnd() == _oldDescription.trimEnd()
        )
          detail.DescriptionPaymentDetail = _description;
      }
    },

    /**
     * Mô tả : Hàm update giá trị của key trong danh sách hạch toán
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 01:45 26/05/2022
     */
    updateParentDetailPayment(parentKeys, childKeys, objectValue) {
      this.paymentDetailList[this.selectedDetailIndex][parentKeys[0]] =
        objectValue[childKeys];
    },

    // HÀM API
    /**
     * Mô tả : Thêm mới phiếu chi
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 02:16 27/05/2022
     */
    async addNewPayment() {
      // // eslint-disable-next-line
      // debugger

      try {
        const localAPI = this.MISA_API.PAYMENT_WITH_DETAIL;

        const { data } = await axios.post(localAPI, {
          payment: this.currentPayment,
          paymentDetail: this.paymentDetailList,
        });
        console.log("Success", data);

        // báo toast > thêm mới thành công > enum báo thành công
        this.setShowToast(
          true,
          this.toastMsg.addSuccessMsg,
          this.MISA_ENUM.toastEnum.success
        );
      } catch (error) {
        let response = this.handleError(error);

        throw response;
      }
    },

    /**
     * Mô tả : Hàm API lấy mã mới
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 02:16 27/05/2022
     */
    async newPaymentCode() {
      try {
        const localAPI = this.MISA_API.PAYMENT_NEW_CODE;

        const { data } = await axios.get(localAPI);

        let newCode = `PM${data}`;

        this.currentPayment.PaymentCode = newCode;
      } catch (error) {
        console.log(error);
      }
    },

    // HÀM TIỆN ÍCH
    async newPaymentForm() {
      this.currentPayment = {
        DescriptionPayment: "Chi tiền cho",
        TotalPaymentMoney: 0.0,
        PaymentDate: new Date().toDateString(),
        AccountingDate: new Date().toDateString(),
        CurrencyId: this.mockData.mockCurrencyId[0].currencyId,
        ExchangeRate: this.mockData.mockCurrencyId[0].exchangeRate,
      };

      this.paymentDetailList = [
        {
          DescriptionPaymentDetail: this.currentPayment.DescriptionPayment,
          CashAmount: 0.0,
        },
      ];

      // Lấy mã mới + focus
      await this.newPaymentCode();

      this.setCompareState();

      this.$refs.AccountObjectId.setFocus();
    },

    afterToday(date) {
      return date > new Date();
    },
    afterAccountingDate(date) {
      return date > new Date(this.currentPayment.AccountingDate);
    },
    /**
     * Mô tả : Hàm xử lý lỗi
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 21:13 29/05/2022
     */
    handleError(error) {
      // Báo lỗi >> của Axios trả về
      if (error.response) {
        if (error.response.status == 400) {
          const errorResponse = error.response.data.Data;
          let errMsg = errorResponse[Object.keys(errorResponse)[0]];

          if (Object.keys(errorResponse)[0] == "PaymentCode") {
            errMsg = `${errMsg} ${this.popupMsg.suggestMsg}`;
            this.setShowPopup(
              true,
              this.MISA_ENUM.popupEnum.confirm,
              errMsg,
              this.newPaymentCode
            );
          } else {
            this.setShowPopup(true, this.MISA_ENUM.popupEnum.warning, errMsg);
          }
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
    reformatIndex(index) {
      let value = JSON.stringify(JSON.parse(index));
      return ++value;
    },
    mapData,
    isMatch,
    formatDataInTable,
  },
  data() {
    return {
      // 1. dữ liệu chi tiêu
      currentPayment: {},

      // trạng thái đóng của footer
      closeFormState: true,

      // dữ liệu chi tiêu ban đầu để so sánh
      comparePayment: {},

      // Mục tiêu chi (cho cbx)
      paymentPurpose: 7,

      // 2. bảng hạch toán chi tiết
      // Dữ liệu hạch toán
      paymentDetailList: [],
      // dữ liệu hạch toán ban đầu để so sánh
      compareDetailList: [],

      // dòng được chọn trong hạch toán
      selectedDetailIndex: null,

      // Dữ liệu tên cột
      columnBanks: [
        {
          columnName: "Số TK",
          columnProperty: "BankAccount",
        },
        {
          columnName: "Tên TK",
          columnProperty: "BankName",
        },
      ],

      paymentDetailColumns: [
        {
          label: "Diễn giải",
          name: "DescriptionPaymentDetail",
          className: "text-align-left text-overflow-hidden",
          format: "text",
          width: "250px",
          minWidth: "250px",
          maxWidth: "250px",
        },
        {
          label: "TK Nợ",
          name: "DebitAccountId",
          className: "text-align-left",
          format: "text",
          width: "150px",
          minWidth: "150px",
        },
        {
          label: "TK Có",
          name: "CreditAccountId",
          className: "text-align-left",
          format: "text",
          width: "150px",
          minWidth: "150px",
        },
        {
          label: "Số tiền",
          name: "CashAmount",
          className: "text-align-right",
          format: "text",
          width: "100px",
          minWidth: "100px",
        },
        {
          label: "Quy đổi",
          name: "ExchangeAmount",
          className: "text-align-right",
          format: "text",
          width: "100px",
          minWidth: "100px",
        },
        {
          label: "Đối tượng",
          name: "AccountObjectCode",
          className: "text-align-left",
          format: "text",
          width: "180px",
          minWidth: "180px",
        },
        {
          label: "Tên đối tượng",
          name: "AccountObjectName",
          className: "text-align-left",
          format: "text",
          width: "180px",
          minWidth: "180px",
        },
      ],

      // Danh sách cột cho combobox đối tượng + nhân viên
      columnsObject: [
        {
          columnName: "Mã đối tượng",
          columnProperty: "VendorCode",
          maxWidth: "50px",
          className: "text-overflow-hidden",
        },
        {
          columnName: "Tên đối tượng",
          columnProperty: "VendorName",
          maxWidth: "120px",
          className: "text-overflow-hidden",
        },
        {
          columnName: "Địa chỉ",
          columnProperty: "VendorAddress",
          maxWidth: "150px",
          className: "text-overflow-hidden",
        },
        {
          columnName: "Mã số thuế",
          columnProperty: "VendorTaxCode",
          maxWidth: "150px",
          className: "text-overflow-hidden",
        },
      ],

      columnsEmployee: [
        {
          columnName: "Mã nhân viên",
          columnProperty: "EmployeeCode",
        },
        {
          columnName: "Tên nhân viên",
          columnProperty: "EmployeeName",
        },
      ],

      columnCurrency: [
        {
          columnName: "Mã loại tiền",
          columnProperty: "currencyCode",
        },
        {
          columnName: "Tên loại tiền",
          columnProperty: "currencyName",
        },
      ],

      // 4. popover footer
      isShowPopover: false,

      popOverX: 0,
      popOverY: 0,

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
    };
  },
};
</script>
<style scoped>
#paymentDetail {
  width: 100vw;
  height: 100vh;
}

#paymentDetail .m-dialog-content {
  height: calc(100% - 122px);
  padding: 0;
  flex: 1;
  min-height: 0;
  min-width: 0;
  position: relative;
  overflow: auto;
}
#paymentDetail .main-info {
  padding: 8px 24px 20px;
  width: calc(100% - 48px);
  z-index: 20;
  position: sticky;
  left: 0;
}

.right-group-btn .dropdown-btn {
  border-radius: 0 3px 3px 0;
  width: 36px;
}
.right-group-btn .m-add-dropdown {
  background-color: #2ca10c;
  border-radius: 3px;
}

#paymentDetail .m-dialog-header {
  padding: 16px 16px 20px 16px;
}

#paymentDetail .m-dialog-footer {
  background-color: #38393d;
  padding-left: 16px;
  padding-right: 16px;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
}

.title__tour-guide {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 10px;
}

.title__tour-guide .tour-label {
  white-space: nowrap;
  padding-left: 5px;
  color: rgb(0, 117, 192);
  font-size: 13px;
}

.btn-detail-group .btn-detail {
  padding: 6px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.max-upload-size {
  margin-left: 15px;
  color: #757575;
  white-space: nowrap;
  font-size: 12px;
}

.grey-background {
  background-color: #eceef1;
}

.m-label {
  padding-bottom: 4px;
}
.w-90 {
  width: 90px !important;
}

.w-100 {
  width: 100px !important;
}

.w-max-100 {
  max-width: 100px !important;
}

.w-240 {
  width: 240px !important;
}
.w-350 {
  width: 350px !important;
}
.w-max-500 {
  max-width: 500px;
}

.m-row {
  padding-bottom: 12px;
}

.reference-title {
  margin-right: 16px;
  min-width: 75px;
}

.reference-show-more {
  cursor: pointer;
  color: #0075c0;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
}

.right-seperate {
  padding-right: 16px;
}

.root-invoice {
  white-space: nowrap;
  padding-top: 28px;
}

.left-seperate {
  padding-left: 16px;
  border-left: 1px solid rgb(212, 215, 220);
  width: 185px;
}

.summary-info {
  text-align: right;
}

.summary-info .summary-title {
  font-size: 13px;
}

.summary-info .summary-number {
  font-size: 36px;
  font-weight: 700;
  font-family: MISA NotoSans Bold;
}

/* .grid-control {
  background: #fff;
  width: 100%;
  position: relative;
} */
.grid-control-item {
  width: calc(100% - 60px);
  padding: 0 30px;
  background-color: #fff;
  position: sticky;
}

.grid-tab {
  padding: 16px 0 16px 8px;
  position: sticky;
  width: calc(100% - 24px);
  left: 0;
  display: flex;
}

.grid-tab .tab {
  color: #0075c0;
  font-weight: 700;
  text-decoration: underline;
  margin: 0;
  padding: 0 16px;
}

.grid-btn-group {
  padding-bottom: 16px;
}

.label-option {
  padding-right: 10px;
  white-space: nowrap;
  padding-left: 20px;
}

.grid-option {
  align-items: center;
  justify-content: flex-end;
}

@import url("@/css/components/dialog.css");
@import url("@/css/components/label.css");
@import url("@/css/components/table.css");
@import url("@/css/components/button.css");
@import url("@/css/components/upload.css");
</style>
