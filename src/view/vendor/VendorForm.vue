<template>
  <div class="m-shadow-box" @keydown.esc="onClickCloseForm" tabindex="-1">
    <div class="m-dialog" id="popupVendor">
      <!-- HEADER CỦA FORM -->
      <div class="m-dialog-header flex">
        <div class="header-title">Thông tin nhà cung cấp</div>

        <div class="pd-l-r">
          <base-radio-group
            v-model="this.currentVendor.VendorType"
            :data="vendorTypeEnum"
            :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
          />
        </div>

        <div class="flex flex-align-center mg-l-100">
          <base-checkbox
            v-model="this.currentVendor.IsCustomer"
            :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
          />
          <span class="pd-b-l">Là khách hàng</span>
        </div>
        <div class="flex-grow"></div>

        <div class="header-btn-close flex">
          <div class="m-icon icon--help mg-r-6" title="Giúp (F1)"></div>
          <!-- NÚT ĐÓNG FORM >> HIỆN POPUP NẾU THAY ĐỔI DỮ LIỆU -->
          <div
            class="m-icon icon--close"
            title="Đóng (ESC)"
            @click.prevent="onClickCloseForm"
          ></div>
        </div>
      </div>

      <!-- NỘI DUNG CỦA FORM -->
      <div class="m-dialog-content">
        <div class="content-container">
          <!-- NỘI DUNG INPUT TRÊN  -->
          <div class="content flex">
            <div class="content-left w-half pd-r-26">
              <div class="m-row">
                <div class="pd-r-6 w-40">
                  <div class="m-label">Mã số thuế</div>
                  <base-input
                    propName="VendorTaxCode"
                    ref="VendorTaxCode"
                    v-model="this.currentVendor.VendorTaxCode"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  />
                </div>
                <div class="w-60">
                  <div class="m-label">
                    Mã nhà cung cấp
                    <span class="required">*</span>
                  </div>
                  <base-input
                    propName="VendorCode"
                    ref="VendorCode"
                    v-model="this.currentVendor.VendorCode"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  />
                </div>
              </div>
              <!-- NẾU LÀ THUỘC TỔ CHỨC -->
              <div class="row-input">
                <div class="w-full">
                  <div class="m-label">
                    Tên nhà cung cấp
                    <span
                      class="required"
                      v-show="
                        this.currentVendor.VendorType ==
                        this.MISA_ENUM.vendorType.organization
                      "
                      >*</span
                    >
                  </div>
                  <div class="flex">
                    <base-combobox
                      class="w-33 mg-r-6"
                      :defaultData="this.mockData.pronounceList"
                      ref="ContactPrefixName"
                      propTxt="text"
                      propValue="value"
                      placeholder="Xưng hô"
                      v-model="this.currentVendor.ContactPrefixName"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                      v-show="
                        this.currentVendor.VendorType ==
                        this.MISA_ENUM.vendorType.personal
                      "
                    />
                    <base-input
                      propName="VendorName"
                      ref="VendorName"
                      :class="{
                        'w-66':
                          this.currentVendor.VendorType ==
                          this.MISA_ENUM.vendorType.personal,
                        'w-full':
                          this.currentVendor.VendorType ==
                          this.MISA_ENUM.vendorType.organization,
                      }"
                      v-model="this.currentVendor.VendorName"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>
                </div>
              </div>

              <div class="m-row">
                <div class="w-full">
                  <div class="m-label">Địa chỉ</div>
                  <base-text-area
                    placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
                    v-model="this.currentVendor.VendorAddress"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  ></base-text-area>
                </div>
              </div>
            </div>
            <div class="content-right w-half">
              <!-- NẾU LÀ THUỘC TỔ CHỨC -->
              <div
                class="m-row"
                v-show="
                  this.currentVendor.VendorType ==
                  this.MISA_ENUM.vendorType.organization
                "
              >
                <div class="w-40 mg-r-12">
                  <div class="m-label">Điện thoại</div>
                  <base-input
                    propName="VendorPhoneNumber"
                    ref="VendorPhoneNumber"
                    v-model="this.currentVendor.VendorPhoneNumber"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  />
                </div>
                <div class="w-60">
                  <div class="m-label">Website</div>
                  <base-input
                    propName="Website"
                    ref="Website"
                    v-model="this.currentVendor.Website"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  />
                </div>
              </div>
              <div class="m-row">
                <div class="w-full">
                  <div class="m-label">Nhóm nhà cung cấp</div>
                  <base-combo-multi
                    ref="VendorGroupId"
                    propTxt="VendorGroupCode"
                    propValue="VendorGroupId"
                    :defaultData="this.mockData.clientVendorGroupMock"
                    :columns="columnClientVendor"
                    v-model="this.currentVendor.ClientVendorGroupId"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  />
                </div>
              </div>
              <div class="m-row">
                <div class="w-full">
                  <div class="m-label">Nhân viên mua hàng</div>
                  <base-combo-table
                    ref="EmployeeId"
                    propTxt="EmployeeName"
                    propValue="EmployeeId"
                    :api="this.MISA_API.EMPLOYEE_BASE"
                    :columns="columnEmployee"
                    v-model="this.currentVendor.EmployeeBuyerId"
                    :isDisabled="this.formMode == this.MISA_ENUM.formMode.Watch"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- NỘI DUNG INPUT DƯỚI (POPUP TAB) -->
          <div class="popup-tab w-full">
            <div class="navigation-tab w-full">
              <div class="tab-list flex">
                <div
                  v-for="(tabVal, tabKey, index) in this.MISA_UI.FORM_TAB"
                  :key="index"
                  class="tab-item"
                  :class="{ active: this.currentTabForm == tabVal }"
                  @click.prevent="setSelectedTab(tabVal)"
                >
                  {{ tabVal }}
                </div>
              </div>
              <div class="tab-content-container">
                <div class="tab-content">
                  <!-- NẾU THUỘC TỔ CHỨC -->
                  <div
                    class="flex"
                    v-show="
                      this.currentTabForm == this.MISA_UI.FORM_TAB.CONTACT &&
                      this.currentVendor.VendorType ==
                        this.MISA_ENUM.vendorType.organization
                    "
                  >
                    <div class="w-half pd-r-26">
                      <div class="flex pb-2">
                        <div class="w-full">
                          <div class="m-label">Người liên hệ</div>
                          <div class="flex flex-align-center">
                            <base-combobox
                              class="w-33 mg-r-6"
                              :defaultData="this.mockData.pronounceList"
                              ref="ContactPrefixName"
                              propTxt="text"
                              propValue="value"
                              placeholder="Xưng hô"
                              v-model="this.currentVendor.ContactPrefixName"
                              :isDisabled="
                                this.formMode == this.MISA_ENUM.formMode.Watch
                              "
                            />
                            <base-input
                              class="w-66"
                              propName="ContactName"
                              ref="ContactName"
                              placeholder="Họ và tên"
                              v-model="this.currentVendor.ContactName"
                              :isDisabled="
                                this.formMode == this.MISA_ENUM.formMode.Watch
                              "
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex pb-2">
                        <base-input
                          class="w-full"
                          propName="ContactEmail"
                          ref="ContactEmail"
                          placeholder="Email"
                          v-model="this.currentVendor.ContactEmail"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                      <div class="flex">
                        <base-input
                          class="w-half"
                          propName="ContactPhoneNumber"
                          ref="ContactPhoneNumber"
                          placeholder="Số điện thoại"
                          v-model="this.currentVendor.ContactPhoneNumber"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                    </div>
                    <div class="w-half">
                      <div class="m-label" title="Đại diện theo pháp luật">
                        Đại diện theo PL
                      </div>
                      <base-input
                        propName="ContactLegalRep"
                        ref="ContactLegalRep"
                        placeholder="Đại diện theo PL"
                        v-model="this.currentVendor.ContactLegalRep"
                        :isDisabled="
                          this.formMode == this.MISA_ENUM.formMode.Watch
                        "
                      />
                    </div>
                  </div>

                  <div
                    class="flex"
                    v-show="
                      this.currentTabForm == this.MISA_UI.FORM_TAB.CONTACT &&
                      this.currentVendor.VendorType ==
                        this.MISA_ENUM.vendorType.personal
                    "
                  >
                    <div class="w-half pd-r-26">
                      <div class="flex pb-2">
                        <div class="w-full">
                          <div class="m-label">Thông tin liên hệ</div>
                          <base-input
                            class="w-full"
                            propName="ContactEmail"
                            ref="ContactEmail"
                            placeholder="Email"
                            v-model="this.currentVendor.ContactEmail"
                            :isDisabled="
                              this.formMode == this.MISA_ENUM.formMode.Watch
                            "
                          />
                        </div>
                      </div>
                      <div class="w-half pb-2">
                        <base-input
                          class="w-full"
                          propName="ContactPhoneNumber"
                          ref="ContactPhoneNumber"
                          placeholder="Điện thoại di động"
                          v-model="this.currentVendor.ContactPhoneNumber"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                      <div class="w-half pb-2">
                        <base-input
                          class="w-full"
                          propName="LandlineNumber"
                          ref="LandlineNumber"
                          placeholder="Điện thoại cố định"
                          v-model="this.currentVendor.LandlineNumber"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                      <div class="w-full">
                        <div class="m-label" title="Đại diện theo pháp luật">
                          Đại diện theo PL
                        </div>
                        <base-input
                          class="w-full"
                          propName="ContactLegalRep"
                          ref="ContactLegalRep"
                          placeholder="Đại diện theo PL"
                          v-model="this.currentVendor.ContactLegalRep"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                    </div>
                    <div class="w-half">
                      <div class="w-full">
                        <div class="m-label">Số CMND/Thẻ căn cước</div>
                        <base-input
                          class="w-half pb-2"
                          propName="IdentityNumber"
                          ref="IdentityNumber"
                          placeholder="Số CMND/Thẻ căn cước"
                          v-model="this.currentVendor.IdentityNumber"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />

                        <div class="w-half pb-2">
                          <!-- eslint-disable  -->
                          <date-picker
                            v-model:value="formatIdentityDate"
                            :format="'DD/MM/YYYY'"
                            :placeholder="'DD/MM/YYYY'"
                            :lang="'vi'"
                            :clearable="false"
                            title-format="'DD/MM/YYYY'"
                            :disabled-date="afterToday"
                            :disabled="
                              this.formMode == this.MISA_ENUM.formMode.Watch
                            "
                          />
                          <!-- eslint-enable  -->
                        </div>

                        <base-input
                          class="w-full"
                          propName="IdentityPlace"
                          ref="IdentityPlace"
                          placeholder="Nơi cấp"
                          v-model="this.currentVendor.IdentityPlace"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    v-show="
                      this.currentTabForm == this.MISA_UI.FORM_TAB.REGULATION
                    "
                  >
                    <div class="w-full m-row">
                      <div class="w-25 mg-r-12">
                        <div class="m-label">Điều khoản thanh toán</div>
                        <base-combo-table
                          propTxt="ContractName"
                          propValue="ContractId"
                          :defaultData="this.mockData.contractMock"
                          :columns="columnContract"
                          maxWidth="max-content"
                          v-model="this.currentVendor.ContractId"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                      <div class="w-25 mg-r-12">
                        <div class="m-label">Số ngày được nợ</div>
                        <base-input
                          propName="MaxDebitDate"
                          ref="MaxDebitDate"
                          v-model="this.currentVendor.MaxDebitDate"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                      <div class="w-25">
                        <div class="m-label">Số nợ tối đa</div>
                        <base-input
                          propName="MaxDebitAmount"
                          ref="MaxDebitAmount"
                          v-model="this.currentVendor.MaxDebitAmount"
                          :isDisabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        />
                      </div>
                    </div>
                    <div class="w-25">
                      <div class="m-label">Tài khoản công nợ phải trả</div>
                      <base-combo-table
                        propTxt="BankAccount"
                        propValue="BankId"
                        :defaultData="this.mockData.bankAccountsMock"
                        :columns="columnBanks"
                        maxWidth="max-content"
                        v-model="this.currentVendor.DebitPaymentAccountId"
                        :hasAddNewIcon="false"
                        :isDisabled="
                          this.formMode == this.MISA_ENUM.formMode.Watch
                        "
                      />
                    </div>
                  </div>
                  <div
                    v-show="this.currentTabForm == this.MISA_UI.FORM_TAB.BANK"
                  >
                    <div class="grid-control-table w-full">
                      <table class="m-table">
                        <thead class="m-thead">
                          <tr class="m-tr">
                            <th class="m-th" style="width: 173px">
                              SỐ TÀI KHOẢN
                            </th>
                            <th class="m-th" style="width: 173px">
                              TÊN NGÂN HÀNG
                            </th>
                            <th class="m-th" style="width: 173px">CHI NHÁNH</th>
                            <th class="m-th" style="width: 173px">
                              TỈNH/TP CỦA NGÂN HÀNG
                            </th>
                            <th class="m-th" style="width: 16px"></th>
                          </tr>
                        </thead>
                        <tbody class="m-tbody">
                          <tr
                            class="m-tr"
                            v-for="(bank, index) of this.bankList"
                            :key="index"
                            @click.prevent="setSelectBankRow(index)"
                            :class="{
                              'm-row-selected': this.selectedBankIndex == index,
                            }"
                          >
                            <td class="m-td">
                              <base-input
                                v-model="bank.BankAccount"
                                v-if="this.selectedBankIndex == index"
                                :isDisabled="
                                  this.formMode == this.MISA_ENUM.formMode.Watch
                                "
                              />
                              <span v-else>{{ bank.BankAccount }}</span>
                            </td>
                            <td class="m-td">
                              <base-input
                                v-model="bank.BankName"
                                v-if="this.selectedBankIndex == index"
                                :isDisabled="
                                  this.formMode == this.MISA_ENUM.formMode.Watch
                                "
                              />
                              <span v-else>{{ bank.BankName }}</span>
                            </td>
                            <td class="m-td">
                              <base-input
                                v-model="bank.BankBranch"
                                v-if="this.selectedBankIndex == index"
                                :isDisabled="
                                  this.formMode == this.MISA_ENUM.formMode.Watch
                                "
                              />
                              <span v-else>{{ bank.BankBranch }}</span>
                            </td>
                            <td class="m-td">
                              <base-input
                                v-model="bank.BankPlace"
                                v-if="this.selectedBankIndex == index"
                                :isDisabled="
                                  this.formMode == this.MISA_ENUM.formMode.Watch
                                "
                              />
                              <span v-else>{{ bank.BankPlace }}</span>
                            </td>
                            <td
                              class="m-td flex flex-align-center justify-center"
                            >
                              <button
                                class="m-icon m-icon-w-16 icon-delete border-outline-none"
                                @click.stop="setDeleteBankRow(index)"
                                :disabled="
                                  this.formMode == this.MISA_ENUM.formMode.Watch
                                "
                              ></button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="grid-control-item bottom w-full">
                      <button
                        class="m-btn m-btn-secondary"
                        @click.prevent="setAppendBankList"
                        :disabled="
                          this.formMode == this.MISA_ENUM.formMode.Watch
                        "
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
                            setDeleteAllBankList
                          )
                        "
                        :disabled="
                          this.formMode == this.MISA_ENUM.formMode.Watch
                        "
                      >
                        Xóa hết dòng
                      </button>
                    </div>
                  </div>
                  <div
                    class="flex"
                    v-show="
                      this.currentTabForm == this.MISA_UI.FORM_TAB.OTHER_ADRESS
                    "
                  >
                    <div class="w-half pd-r-26">
                      <div class="m-label">Vị trí địa lý</div>
                      <div class="w-full flex mg-b-12">
                        <div class="w-half mg-r-12">
                          <base-combobox
                            :defaultData="this.mockData.countryDataMock"
                            propTxt="CountryName"
                            propValue="CountryId"
                            placeholder="Đất nước"
                            v-model="this.currentVendor.CountryId"
                            :isDisabled="
                              this.formMode == this.MISA_ENUM.formMode.Watch
                            "
                          />
                        </div>
                        <div class="w-half">
                          <base-combobox
                            :api="this.MISA_API.LOCATION_API_PROVINCE"
                            propTxt="name"
                            propValue="code"
                            placeholder="Tỉnh/Thành phố"
                            v-model="computedProvinceId"
                            :isDisabled="
                              this.formMode == this.MISA_ENUM.formMode.Watch
                            "
                          />
                        </div>
                      </div>
                      <div class="w-full flex">
                        <div class="w-half mg-r-12">
                          <base-combobox
                            :api="`http://localhost:4000/api/v1/districts/byProvince/?code=${this.currentVendor.ProvinceId}`"
                            propTxt="name"
                            propValue="code"
                            placeholder="Quận/Huyện"
                            v-model="computedDistrictId"
                            :isDisabled="
                              this.formMode == this.MISA_ENUM.formMode.Watch
                            "
                          />
                        </div>
                        <div class="w-half">
                          <base-combobox
                            :api="`http://localhost:4000/api/v1/wards/byDistrict/?code=${this.currentVendor.DistrictId}`"
                            propTxt="name"
                            propValue="code"
                            placeholder="Xã/Phường"
                            v-model="this.currentVendor.WardId"
                            :isDisabled="
                              this.formMode == this.MISA_ENUM.formMode.Watch
                            "
                          />
                        </div>
                      </div>
                    </div>
                    <div class="w-half">
                      <div class="top-grid">
                        <div class="m-label">Địa chỉ giao hàng</div>
                        <div class="pd-l-18-b-6 flex align-center">
                          <base-checkbox
                            v-model="this.checkSameAddress"
                            :isDisabled="
                              this.formMode == this.MISA_ENUM.formMode.Watch
                            "
                          />
                          <span class="pd-b-l">Giống địa chỉ nhà cung cấp</span>
                        </div>
                      </div>
                      <div class="grid-control-table w-full">
                        <table class="m-table">
                          <tbody class="m-tbody">
                            <tr
                              v-for="(address, index) of deliveryAddresses"
                              :key="index"
                              class="m-tr"
                              :class="{
                                'm-row-selected':
                                  this.selectedAddressIndex == index,
                              }"
                              @click="setSelectDeliveryRow(index)"
                            >
                              <td class="m-td w-full">
                                <base-input
                                  v-model="address.value"
                                  v-if="this.selectedAddressIndex == index"
                                  :isDisabled="
                                    this.formMode ==
                                    this.MISA_ENUM.formMode.Watch
                                  "
                                />
                                <span v-else>{{ address.value }}</span>
                              </td>
                              <td
                                class="m-td flex flex-align-center justify-center"
                              >
                                <button
                                  class="m-icon m-icon-w-16 icon-delete border-outlint-none"
                                  @click.stop="setDeleteDeliveryRow(index)"
                                  :disabled="
                                    this.formMode ==
                                    this.MISA_ENUM.formMode.Watch
                                  "
                                ></button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="grid-control-item bottom w-full">
                        <button
                          class="m-btn m-btn-secondary"
                          @click.prevent="setAppendDeliveryList"
                          :disabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        >
                          Thêm dòng
                        </button>
                        <button
                          class="m-btn m-btn-secondary"
                          @click.prevent="setDeleteAllDeliveryList"
                          :disabled="
                            this.formMode == this.MISA_ENUM.formMode.Watch
                          "
                        >
                          Xóa hết dòng
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex overflow-y"
                    style="height: 160px"
                    v-show="this.currentTabForm == this.MISA_UI.FORM_TAB.NOTE"
                  >
                    <base-text-area
                      v-model="this.currentVendor.TextNote"
                      :isDisabled="
                        this.formMode == this.MISA_ENUM.formMode.Watch
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- FOOTER CỦA FORM -->
        <div class="content-footer">
          <div class="divider"></div>
          <div class="footer-btn-group flex">
            <!-- ĐÓNG FORM KHÔNG CHECK THAY ĐỔI -->
            <button
              class="m-btn btn-size-default m-btn-secondary"
              @click.prevent="setCloseDialog(false)"
            >
              Hủy
            </button>
            <div class="flex-grow"></div>
            <!-- LƯU DỮ LIỆU + ĐÓNG FORM -->
            <button
              class="m-btn btn-size-default m-btn-secondary mg-r-6"
              @click.prevent="saveEventHandler(true)"
              :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
            >
              Cất
            </button>
            <!-- LƯU DỮ LIỆU + RESET FORM  -->
            <button
              class="m-btn btn-size-default m-btn-primary"
              @click.prevent="saveEventHandler(false)"
              :disabled="this.formMode == this.MISA_ENUM.formMode.Watch"
            >
              Cất và Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

import BaseInput from "@/components/base/BaseInput.vue";
import BaseRadioGroup from "@/components/base/BaseRadioGroup.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import BaseComboTable from "@/components/base/combobox/BaseComboTable.vue";
import BaseComboMulti from "@/components/base/combobox/BaseComboTableMulti.vue";
import BaseCombobox from "@/components/base/combobox/BaseCombobox.vue";

import { isMatch, removeEmptyObject } from "@/js/utils";

export default {
  components: {
    BaseInput,
    BaseTextArea,
    BaseComboTable,
    BaseCombobox,
    BaseRadioGroup,
    BaseCheckbox,
    DatePicker,
    BaseComboMulti,
  },
  props: {
    formMode: { type: Number },
    vendorSelected: { type: Object },
  },
  computed: {
    formatIdentityDate: {
      get() {
        if (!this.currentVendor.IdentityDate) return;
        return new Date(this.currentVendor.IdentityDate);
      },
      set(newValue) {
        console.log(newValue.toDateString());
        this.currentVendor.IdentityDate = newValue.toDateString();
      },
    },

    computedProvinceId: {
      get() {
        if (!this.currentVendor.ProvinceId) return;
        return this.currentVendor.ProvinceId;
      },
      set(newValue) {
        this.currentVendor.ProvinceId = newValue

        this.currentVendor.DistrictId = null;
        this.currentVendor.WardId = null;

      },
    },

    computedDistrictId: {
      get() {
        if (!this.currentVendor.DistrictId) return;
        return this.currentVendor.DistrictId;
      },
      set(newValue) {
        this.currentVendor.DistrictId = newValue

        this.currentVendor.WardId = null;

      },
    }
  },
  async mounted() {
    // Khi form được hiện lên (mounted vào DOM)
    // Gán dữ liệu + focus vào ô mã đầu tiên
    this.currentVendor = this.vendorSelected;

    // gán dữ liệu json object vào data
    if (this.currentVendor.BankAccounts) {
      this.bankList = JSON.parse(this.currentVendor.BankAccounts);
      this.bankList = removeEmptyObject(this.bankList);

      if (this.bankList.length <= 0) this.bankList = [{}];
    }
    if (this.currentVendor.DeliveryAddresses) {
      this.deliveryAddresses = JSON.parse(this.currentVendor.DeliveryAddresses);
      this.deliveryAddresses = removeEmptyObject(this.deliveryAddresses);
    }

    // Gán đối tượng để khi đóng form >> so sánh xem có thay đổi
    this.setCompareState();

    this.$refs.VendorTaxCode.setFocus();
  },
  methods: {
    // HÀM EVENT

    /**
     * Mô tả : Sự kiện lưu dữ liệu
     * @param _isCloseForm: (true: cất) hoặc (false: cất và thêm)
     * Created by: NHLOC - MF1099
     * Created date: 14:28 16/04/2022
     */

    async saveEventHandler(_isCloseForm = true) {
      // xử lý riêng TKNH && ĐCGH
      this.currentVendor.BankAccounts = JSON.stringify(this.bankList);
      this.currentVendor.DeliveryAddresses = JSON.stringify(
        this.deliveryAddresses
      );

      // khởi tạo biến check lỗi
      let isError = false;
      let contentError = "";
      let listError = [];

      // kiểm tra rỗng
      if (!this.currentVendor.VendorCode) {
        // set lỗi
        isError = true;
        contentError = this.errorMsg.notEmptyCode("Nhà cung cấp");
        listError.push(contentError);

        this.$refs.VendorCode.setError(contentError);
      }
      if (
        this.currentVendor.VendorType ==
          this.MISA_ENUM.vendorType.organization &&
        !this.currentVendor.VendorName
      ) {
        // set lỗi

        isError = true;
        contentError = this.errorMsg.notEmptyFullname("Nhà cung cấp");
        listError.push(contentError);

        this.$refs.VendorName.setError(contentError);
      }

      // Kiểm tra có lỗi (Không lỗi > check formMode > chạy api)
      if (isError) {
        // Lỗi > báo popup
        this.setShowPopup(true, this.MISA_ENUM.popupEnum.alert, listError[0]);
      } else {
        try {
          if (this.formMode == this.MISA_ENUM.formMode.Edit) {
            await this.editVendorFunc();
          } else if (this.formMode == this.MISA_ENUM.formMode.Add) {
            await this.addNewVendor();
          }
        } catch (error) {
          console.log(error);

          // nếu có lỗi báo
          isError = true;
        }

        // Nếu không lỗi sau khi validate ở Backend thì chạy code tiếp
        if (!isError) {
          // Cất
          if (_isCloseForm == true) {
            this.setCloseDialog();
          }
          // cất và thêm mới
          else {
            // Lấy mã mới + focus
            await this.newVendorCode();

            this.$refs.VendorTaxCode.setFocus();

            this.setCompareState();
          }
        }
      }
    },
    onClickCloseForm() {
      this.setCloseDialog(
        !isMatch(this.currentVendor, this.compareVendor) ||
          !isMatch(this.compareBankList, this.bankList) ||
          !isMatch(this.compareDeliveryAddresses, this.deliveryAddresses)
      );
    },
    // HÀM API
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

        this.currentVendor.VendorCode = newCode;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả : Thêm mới dữ liệu nhà cung cấp
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 13:15 20/05/2022
     */
    async addNewVendor() {
      const vendor = this.currentVendor;
      const localAPI = this.MISA_API.VENDOR_BASE;

      try {
        const response = await axios.post(localAPI, vendor);

        console.log("Succes", response.data);

        // Reset dữ liệu
        this.currentVendor = {
          VendorType: this.MISA_ENUM.vendorType.organization,
        };

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

    async editVendorFunc() {
      const vendor = this.currentVendor;
      const localAPI = this.MISA_API.VENDOR_WITH_ID(
        this.currentVendor.VendorId
      );

      try {
        const response = await axios.put(localAPI, vendor);

        console.log("Success", response.data);

        // Reset dữ liệu
        this.currentVendor = {
          VendorType: this.MISA_ENUM.vendorType.organization,
        };

        // báo toast
        this.setShowToast(
          true,
          // text báo "cập nhật thành công"
          this.toastMsg.updateSuccessMsg,
          // enum cho loại toast thành công
          this.MISA_ENUM.toastEnum.success
        );
      } catch (error) {
        let response = this.handleError(error);

        throw response;
      }
    },
    // HÀM SETTER
    // Reset các giá trị của NCC
    async setNewForm() {
      this.currentVendor = {
        VendorType: this.MISA_ENUM.vendorType.organization,
        BankAccounts: [],
        DeliveryAddresses: [],
      };

      await this.newVendorCode();
    },
    /**
     * Mô tả : Set giá trị để check thay đổi
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 16:58 27/05/2022
     */
    setCompareState() {
      this.compareBankList = JSON.parse(JSON.stringify(this.bankList));
      this.compareDeliveryAddresses = JSON.parse(
        JSON.stringify(this.deliveryAddresses)
      );

      Object.assign(this.compareVendor, this.currentVendor);
    },

    // TAB NGÂN HÀNG
    setAppendBankList() {
      this.bankList.push({});
      this.selectedBankIndex = this.bankList.length - 1;
    },
    setDeleteAllBankList() {
      this.bankList = [{}];
      this.selectedBankIndex = 0;
    },
    setDeleteBankRow(index) {
      this.bankList.splice(index, 1);
    },
    setSelectBankRow(index) {
      if (this.formMode == this.MISA_ENUM.formMode.Watch) return;

      this.selectedBankIndex = index;
    },

    // TAB ĐỊA CHỈ KHÁC
    setAppendDeliveryList() {
      this.deliveryAddresses.push({});
      this.selectedAddressIndex = this.deliveryAddresses.length - 1;
    },
    setDeleteAllDeliveryList() {
      this.deliveryAddresses = [{}];
      this.selectedAddressIndex = 0;
    },
    setDeleteDeliveryRow(index) {
      this.deliveryAddresses.splice(index, 1);
    },
    setSelectDeliveryRow(index) {
      if (this.formMode == this.MISA_ENUM.formMode.Watch) return;

      this.selectedAddressIndex = index;
    },

    /**
     * Mô tả : Chuyển tab
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 11:22 11/05/2022
     */
    setSelectedTab(_tab) {
      this.currentTabForm = _tab;
    },
    /**
     * Mô tả : Đóng dialog bằng emit lên hàm cha
     * Created by: NHLOC - MF1099
     * Created date: 14:28 16/04/2022
     */
    setCloseDialog(_isChanged = false) {
      this.bankList = removeEmptyObject(this.bankList);
      this.deliveryAddresses = removeEmptyObject(this.deliveryAddresses);

      // Nếu check thay đổi
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
      // Đóng form nếu không check thay đổi
      this.$emit("setShowForm", false);
    },
    /**
     * Mô tả : Ẩn và hiện popup bằng hàm emit lên cha
     * Created by: NHLOC - MF1099
     * Created date: 14:28 16/04/2022
     */
    setShowPopup(
      _isPopup,
      _popupType = null,
      _popupContent = null,
      _callback = null,
      _declineCallback = null
    ) {
      this.$emit(
        "setShowPopup",
        _isPopup,
        _popupType,
        _popupContent,
        _callback,
        _declineCallback
      );
    },
    /**
     * Mô tả : ẩn hiện toast bằng hàm emit lên cha
     * Created by: NHLOC - MF1099
     * Created date: 21:47 23/04/2022
     */
    setShowToast(_isShowToast, _toastContent = null, _toastType = null) {
      this.$emit("setShowToast", _isShowToast, _toastContent, _toastType);
    },

    // HÀM TIỆN ÍCH
    isMatch,
    removeEmptyObject,
    afterToday(date) {
      return date > new Date();
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
      currentTabForm: this.MISA_UI.FORM_TAB.CONTACT,

      // tab ngân hàng
      bankList: [{}],
      compareBankList: null,
      selectedBankIndex: 0,

      // tab địa chỉ khác
      checkSameAddress: false,

      deliveryAddresses: [],
      compareDeliveryAddresses: null,
      selectedAddressIndex: 0,

      currentVendor: {},
      vendorGroup: [],
      compareVendor: {},

      isCloseForm: false,

      // Danh sách các tên cột
      columnList: [
        {
          columnName: "Mã nhà cung cấp",
          columnProperty: "VendorCode",
        },
        {
          columnName: "Tên nhà cung cấp",
          columnProperty: "VendorName",
        },
      ],

      columnEmployee: [
        {
          columnName: "Mã nhân viên",
          columnProperty: "EmployeeCode",
        },
        {
          columnName: "Tên nhân viên",
          columnProperty: "EmployeeName",
        },
      ],

      columnClientVendor: [
        {
          columnName: "Mã nhóm KH, NCC",
          columnProperty: "VendorGroupCode",
        },
        {
          columnName: "Tên nhóm KH, NCC",
          columnProperty: "VendorGroupName",
        },
      ],

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
      columnContract: [
        {
          columnName: "Mã điều khoản thanh toán",
          columnProperty: "ContractCode",
        },
        {
          columnName: "Tên điều khoản thanh toán",
          columnProperty: "ContractName",
        },
      ],

      // Các loại enum
      vendorTypeEnum: {
        "Tổ chức": 0,
        "Cá nhân": 1,
      },
    };
  },
};
</script>
<style scoped>
#popupVendor {
  width: 900px;
  min-width: 900px;
  max-width: 900px;
}

#popupVendor .m-dialog-content {
  width: calc(100% - 64px);
  height: calc(100% - 72px);
}

#popupVendor .m-dialog-content .content-container {
  height: calc(100% - 105px);
  overflow-y: auto;
}

.m-row {
  padding-bottom: 12px;
}
@import url("@/css/components/dialog.css");
@import url("@/css/components/table.css");
@import url("@/css/components/label.css");
@import url("@/css/components/datepicker.css");
</style>
