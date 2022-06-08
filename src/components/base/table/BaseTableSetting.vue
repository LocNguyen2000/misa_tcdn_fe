<template>
  <div class="m-shadow-box flex justify-end">
    <div class="m-dialog" id="tableSetting">
      <!-- HEADER CỦA FORM -->
      <div class="m-dialog-header flex">
        <div class="header-title">Tùy chỉnh giao diện</div>

        <div class="flex-grow"></div>

        <div class="header-btn-close flex">
          <div class="m-icon icon--help mg-r-6" title="Giúp (F1)"></div>
          <div
            class="m-icon icon--close"
            title="Đóng (ESC)"
            @click.prevent="closeDialog"
          ></div>
        </div>
      </div>

      <!-- TOOLBAR PHỤ -->
      <div class="m-setting-toolbar flex">
        <base-input
          iconName="search"
          :canFocus="true"
          placeholder="Nhập từ khóa tìm kiếm"
        />

        <div class="flex-grow"></div>

        <div class="show-layout-info" @click.prevent="editTableHandler">
          Sửa tên cột hiển thị và độ rộng
        </div>
      </div>

      <!-- BẢNG CHỨA CÁC CỘT  -->
      <div class="m-setting-content">
        <table class="m-table">
          <thead class="m-thead">
            <tr class="m-tr">
              <th class="m-th"></th>
              <th class="m-th" style="width: 30px; max-width: 30px">
                <div class="flex justify-center">
                  <base-checkbox
                    :checked="
                      checkedList.length > 0 &&
                      checkedList.length == columnDisplayable.length
                    "
                    @click.prevent="setSelectedRowAll"
                  />
                </div>
              </th>

              <th class="m-th text-align-left">TÊN CỘT DỮ LIỆU</th>
              <th
                class="m-th text-align-left"
                style="width: 200px; max-width: 200px"
                v-if="isEditTable"
              >
                TÊN CỘT TRÊN GIAO DIỆN
              </th>
              <th
                class="m-th text-align-left"
                style="width: 100px; max-width: 100px"
                v-if="isEditTable"
              >
                ĐỘ RỘNG
              </th>
              <th
                class="m-th text-align-center"
                style="width: 120px; max-width: 120px"
                v-if="isEditTable"
              >
                CỐ ĐỊNH CỘT
              </th>
            </tr>
          </thead>
          <tbody class="m-tbody">
            <tr
              class="m-tr"
              v-for="(column, index) of columnDisplayable"
              :class="{ 'selected-row': focusRowId == index }"
              :key="index"
              @click.prevent="focusRowHandler(index)"
            >
              <td class="m-td" style="width: 30px; max-width: 30px">
                <div class="flex flex-align-center justify-center">
                  <div class="m-icon m-icon-w-16 icon--dragable"></div>
                </div>
              </td>
              <td class="m-td">
                <div class="flex justify-center">
                  <base-checkbox
                    v-model="column.isShow"
                    @click.prevent="setCheckedColumn(column)"
                  />
                </div>
              </td>
              <td class="m-td">{{ column.label }}</td>

              <td class="m-td" v-if="isEditTable">
                <span v-if="focusRowId != index">
                  {{ column.displayLabel }}
                </span>
                <base-input
                  ref="labelInput"
                  v-else
                  v-model="column.displayLabel"
                />
              </td>

              <td class="m-td" v-if="isEditTable">
                <span v-if="focusRowId != index">
                  {{ column.width }}
                </span>
                <base-input ref="widthInput" v-else v-model="column.width" />
              </td>

              <td class="m-td" v-if="isEditTable">
                <div class="flex justify-center">
                  <base-checkbox />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- CHÂN FOOTER -->
      <div class="m-setting-footer">
        <div class="divider-is-right"></div>

        <div class="footer-btn-group flex">
          <button class="m-btn btn-size-default m-btn-secondary">Hủy</button>
          <div class="flex-grow"></div>
          <!-- <button class="m-btn btn-size-default m-btn-secondary mg-r-6" @click.prevent="getDefaultColumns">
            Lấy mẫu ngầm định
          </button> -->
          <button class="m-btn btn-size-default m-btn-primary" @click.prevent="saveSettings">Cất</button>
        </div>
      </div>

      <!-- NÚT ĐỂ FULL MÀN -->
      <div class="resize">
        <div class="m-icon m-icon-w-16 icon--chevron-left"></div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import axios from "axios";

export default {
  components: {
    BaseInput,
    BaseCheckbox,
  },
  props: {
    columnData: {
      type: Array,
      default: () => [],
    },
    api: {
      type: String,
    },
  },
  async mounted() {
    if (this.api) {
      try {
        const { data } = await axios.get(this.api);

        this.columnDisplayable = data;

        this.columnDisplayable.map((col) => {
          if (col.isShow == true || col.isShow == "true") {
            this.checkedList.push(col._id);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else if (this.columnData.length > 0) {
      this.columnDisplayable = this.columnData;
    }
  },
  methods: {
    /**
    * Mô tả : Mô tả code
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 15:19 27/05/2022
    */
   async saveSettings(){
    await axios.put(this.api, this.columnDisplayable);

    this.$emit('reloadTable');

    this.closeDialog();
   },
  //  /**
  //  * Mô tả : lấy default
  //  * Created by: Nguyễn Hữu Lộc - MF1099
  //  * Created date: 16:31 27/05/2022
  //  */
  // async getDefaultColumns(){
  //   try {
  //     this.checkedList = [];
      
  //     const {data} = await axios.get(this.api);
      
  //     this.columnDisplayable = data.filter(item => {
  //       item.isShow = true
  //       this.checkedList.push(item._id)

  //       return item
  //     });


  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
    /**
     * Mô tả : chọn dòng trong tableView
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 14:58 27/05/2022
     */
    setCheckedColumn(_column) {
      if (this.checkedList.includes(_column._id)) {
        const index = this.checkedList.findIndex((id) => {
          return id == _column._id;
        });

        this.checkedList.splice(index, 1);
      } else {
        this.checkedList.push(_column._id);
      }
    },
    /**
     * Mô tả : Chọn tất cả các dòng
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 15:12 27/05/2022
     */
    setSelectedRowAll() {
      if (this.checkedList.length != this.columnDisplayable.length) {
        this.checkedList = []

        this.columnDisplayable.map((column) => {
          column.isShow = true;
          this.checkedList.push(column._id);
        });
      } else {
        this.columnDisplayable.map((column) => {
          column.isShow = false;
        });
        this.checkedList = [];
      }
    },
    /**
     * Mô tả : Đóng dialog
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 10:05 10/05/2022
     */
    closeDialog() {
      this.$emit("setShowSetting", false);
    },
    /**
     * Mô tả : Ẩn hiện các cột để sửa
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 10:18 10/05/2022
     */
    editTableHandler() {
      this.isEditTable = !this.isEditTable;
    },

    /**
     * Mô tả : Focus vào dòng edit được > biến thành input
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 10:43 10/05/2022
     */
    focusRowHandler(_index) {
      this.focusRowId = _index;
    },
  },
  data() {
    return {
      isEditTable: false,

      focusRowId: null,

      columnDisplayable: [],

      checkedList: [],
    };
  },
};
</script>
<style scoped>
#tableSetting {
  width: 800px;
  min-width: 800px;
  max-width: 800px;
  height: 100% !important;
  background-color: #fff;
  position: relative;
}
/* THANH HEADER */

#tableSetting .header-btn-close {
  padding-right: 0;
}

#tableSetting .m-dialog-header {
  margin-left: 16px;
  margin-right: 16px;
}
/* THANH TOOLBAR */
.m-setting-toolbar {
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 12px;
}

.show-layout-info {
  font-size: 13px;
  color: #0075c0;
  cursor: pointer;
}

/* NỘI DUNG */
.m-setting-content {
  max-width: 100%;
  max-height: calc(100% - 156px);
  overflow-y: auto;
  margin: 0 16px;
  font-size: 13px;
}

.m-table .m-th,
.m-td {
  border-left: none !important;
  border-right: none !important;
  padding: 0 10px;
}

.m-table .m-tr.selected-row {
  background: #e5f3ff !important;
}

/* CHÂN TRANG */
.m-setting-footer {
  width: 100%;
  background: #fff;
  bottom: 0;
  position: absolute;
  z-index: 10;
}

.divider-is-right {
  height: 4px;
  background: #f4f5f8;
  width: 100%;
}

.footer-btn-group {
  padding: 11px 16px;
}

.resize {
  display: flex;
  width: 12px;
  height: 50px;
  background: #fff;
  border: 1px solid #d4d7dc;
  border-radius: 8px;
  position: absolute;
  align-items: center;
  left: -6px;
  top: 43%;
  z-index: 99;
}
@import url("@/css/components/setting.css");
@import url("@/css/components/dialog.css");
@import url("@/css/components/table.css");
</style>
