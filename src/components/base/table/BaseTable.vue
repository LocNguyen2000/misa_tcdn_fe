<template>
  <table class="m-table">
    <!-- HEADER -->
    <thead class="m-thead">
      <tr class="m-tr">
        <th class="space sticky-col left"></th>
        <th class="m-th sticky-col" style="left: 16px">
          <base-checkbox
            @click.prevent="setSelectedRowAll"
            :checked="
              checkedList.length > 0 && checkedList.length == tableData.length
            "
          />
        </th>

        <th
          v-for="(col, index) of displayColumns"
          :key="index"
          class="m-th"
          :class="col.className"
        >
          {{ col.displayLabel.toUpperCase() }}
        </th>

        <th
          class="m-th text-align-center"
          style="min-width: 120px; right: 46px"
        >
          CHỨC NĂNG
        </th>
        <th class="space sticky-col" style="right: 30px"></th>
        <th class="space-outside sticky-col right"></th>
      </tr>
    </thead>
    <!-- TRANG BODY CỦA TABLE -->
    <!-- TABLE NẾU KHÔNG CÓ DỮ LIỆU -->

    <!-- TABLE NẾU ĐANG LOADING -->
    <tbody class="m-tbody" v-if="isLoading">
      <tr class="m-tr" v-for="index in 9" :key="index">
        <td class="space static-col left"></td>
        <td class="m-td static-col" style="left: 16px">
          <div class="loading-1"></div>
        </td>
        <td
          v-for="(col, index) in displayColumns"
          :key="index"
          class="m-td"
          :class="col.className"
          :name="col.name"
          :style="{minWidth: col.width + 'px', width: col.width + 'px'}"
        >
          <div class="loading-1"></div>
        </td>
        <td class="m-td static-col" style="right: 46px">
          <div class="loading-1"></div>
        </td>
        <td class="space static-col" style="right: 30px"></td>
        <td class="space-outside static-col right"></td>
      </tr>
    </tbody>
    <!-- TABLE NẾU CÓ DỮ LIỆU -->
    <tbody class="m-tbody" v-if="!isLoading && tableData.length > 0">
      <tr
        v-for="(data, rowIndex) in tableData"
        :key="rowIndex"
        class="m-tr"
        :class="{ 'm-row-selected': checkedList.includes(data[primeKeyName]) }"
        @dblclick.prevent="setRowDblClick(data)"
      >
        <td class="space static-col left"></td>
        <td class="m-td static-col" style="left: 16px">
          <base-checkbox
            :checked="checkedList.includes(data[primeKeyName])"
            @click="checkboxClick(data[primeKeyName])"
          />
        </td>

        <td
          v-for="(col, index) in displayColumns"
          :key="index"
          class="m-td text-overflow-hidden"
          :class="col.className"
          :name="col.name"
          :style="{minWidth: col.width + 'px', width: col.width + 'px'}"
        >
          <span>{{ formatDataInTable(data[col.name], col.format) }}</span>
        </td>

        <td
          class="m-td static-col flex flex-align-center justify-center"
          style="min-width: 120px; right: 46px"
        >
          <div
            class="btn-edit-data pd-r-6"
            @click.stop="onRowFunctionClick(data)"
          >
            {{ this.functionColumn }}
          </div>
          <div
            class="m-icon icon--arrowup-bg-blue"
            @click="setShowPopover(true, data, rowIndex, $event)"
          ></div>
        </td>
        <td class="space static-col" style="right: 30px"></td>
        <td class="space-outside static-col right"></td>
      </tr>
    </tbody>

    <slot name="footer"></slot>
  </table>
</template>
<script>
import BaseCheckbox from "../BaseCheckbox.vue";
import {formatDataInTable} from '@/js/utils'

export default {
  components: { BaseCheckbox },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    primeKeyName: {
      type: String,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    checkedList: {
      type: Array,
      default: () => [],
    },
    functionColumn: {
      type: String,
      default: "Sửa",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    columns: {
      handler(newValue) {
        this.displayColumns = newValue.filter((column) => {
          return column.isShow == true;
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.displayColumns = this.columns.filter((column) => {
      return column.isShow == true;
    });
  },
  data() {
    return {
      displayColumns: [],
    };
  },
  methods: {
    /**
     * Mô tả : emit lên cha hàm ẩn hiện popover
     * @param _isShow: bool ẩn hiện popover
     * @param _popOverData: dữ liệu nhân viên
     * @param _index: vị trí dòng trong danh sách
     * @param _event: con trỏ
     * Created by: NHLOC - MF1099
     * Created date: 11:35 18/04/2022
     */
    setShowPopover(_isShow, _popOverData = null, _index = null, _event = null) {
      this.$emit("setShowPopover", _isShow, _popOverData, _index, _event);
    },
    /**
     * Mô tả : emit lên cha hàm double click
     * @param _data: dữ liệu được chọn
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 10:17 20/05/2022
     */
    setRowDblClick(_data) {
      this.$emit("rowDblClick", _data);
    },

    onRowFunctionClick(_data) {
      this.$emit("onRowFunctionClick", _data);
    },

    setSelectedRowAll() {
      this.$emit("setSelectedRowAll");
    },

    checkboxClick(_id) {
      this.$emit("checkboxClick", _id);
    },

    formatDataInTable,
  },
};
</script>
<style scoped>
/* make last m-th have border left  */

.m-table .m-tr th:nth-last-of-type(3),
.m-table .m-tr td:nth-last-of-type(3) {
  border-right: none !important;
}
.m-table .m-tr th:nth-last-of-type(2),
.m-table .m-tr td:nth-last-of-type(2) {
  border-right: none !important;
  border-left: 1px dotted #c7c7c7;
}

@import url("@/css/components/table.css");
@import url("@/css/components/loading.css");
</style>
