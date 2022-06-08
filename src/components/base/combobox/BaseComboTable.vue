<template>
  <div v-if="!unfocusState">
    {{
      mapData(this.modelValue, this.propValue, this.mapProp, this.comboBoxData)
    }}
  </div>
  <div class="m-combobox" ref="input" v-else>
    <input
      type="text"
      class="m-input cur-pointer"
      :class="{ 'm-combobox--readonly': isDisabled }"
      :placeholder="placeholder"
      :value="mappingValue"
      @focus="setFocus"
      @blur="removeFocus"
      :disabled="isDisabled"
    />
    <button
      class="m-combobox-btn add"
      :class="{ 'm-combobox--readonly': isDisabled }"
      :disabled="isDisabled"
      v-if="hasAddNewIcon"
    ></button>
    <button
      class="m-combobox-btn arrow"
      v-on:click.prevent="displayListCbx"
      :class="{ 'm-combobox--readonly': isDisabled }"
      :disabled="isDisabled"
    ></button>
    <div class="m-combobox-data" v-if="showComboBox" :style="positionStyle">
      <table class="m-table">
        <thead class="m-thead">
          <tr class="m-tr">
            <th
              class="m-th text-align-left"
              v-for="(col, index) of columns"
              :key="index"
            >
              {{ col.columnName }}
            </th>
          </tr>
        </thead>
        <tbody class="m-tbody">
          <tr
            v-for="(data, rowIndex) of comboBoxData"
            :key="rowIndex"
            @click="cbxItemOnSelect($event, data)"
            class="m-tr"
            :class="{
              'combobox-row-selected': data[this.propValue] == this.modelValue,
            }"
          >
            <td
              class="m-td"
              v-for="(col, index) of columns"
              :key="index"
              :class="col.className"
              :style="{ maxWidth: col.maxWidth }"
            >
              {{ data[col.columnProperty] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapData } from "@/js/utils";

export default {
  name: "base-combo-table",
  /**
   *  Các thuộc tính của ComboBox
   *  propValue là giá trị cần lấy
   *  propTxt là giá trị hiển thị trên input
   *  placeholder...
   */
  props: {
    columns: {
      type: Array,
    },

    // Cách để truyền API (qua api hoặc dữ liệu truyền vào)
    api: {
      type: String,
    },
    defaultData: {
      type: Array,
    },

    // Tên thuộc tính để lấy giá trị
    // PropValue: thuộc tính lấy giá trị thực
    propValue: {
      type: String,
    },
    // PropTxt: thuộc tính lấy giá trị hiển thị
    propTxt: {
      type: String,
    },

    // Placeholder của input
    placeholder: {
      type: String,
    },

    // giá trị thực của input
    modelValue: {
      type: [String, Number],
    },

    // thuộc tính disable input
    disabled: {
      type: String,
    },

    maxWidth: {
      type: String,
    },
    hasAddNewIcon: {
      type: Boolean,
      default: true,
    },

    unfocusState: {
      type: Boolean,
      default: true,
    },

    mapProp: {
      type: String,
    },

    childKey: {
      type: Array,
      default: () => []
    },
    parentKey: {
      type: Array,
      default: () => []
    },
    // thuộc tính disable input
    isDisabled: {
      type: Boolean,
      default: false,
    },

  },
  /**
   *  Dữ liệu Cbx
   *  showComboBox: ẩn và hiện comboBox
   *  comboBoxData: chứa dữ liệu item của Combobox
   *  selectedItem: Item được chọn trong select
   * >>  trueValue: dữ liệu được chọn (value)
   * >>  displayValue: dữ liệu được hiển thị (option display)
   *
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 11:19 29/03/2022
   */
  data() {
    return {
      delayTimer: null,

      showComboBox: false,

      comboBoxData: [],

      selectedItem: {
        trueValue: null,
      },

      positionStyle: {
        top: "32px",
      },
      focusStyle: {
        outline: "1px solid #babec5",
      },
    };
  },
  computed: {
    /**
     * Mô tả : giá trị computed để map giá trị từ modelValue để hiển thị lên input
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 23:25 27/04/2022
     */
    mappingValue() {
      let mappedValue = null;
      this.comboBoxData.filter((item) => {
        if (item[this.propValue] == this.modelValue) {
          mappedValue = item[this.propTxt];
        }
      });
      if (!mappedValue) return null;
      return mappedValue;
    },
  },

  /**
   * Mô tả : Gọi API theo thuộc tính props và lưu vào ComboBoxData để hiển thị danh sách
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 14:20 02/04/2022
   */
  async created() {
    // kiểm tra xem thiếu trường props

    if (this.defaultData) {
      this.comboBoxData = this.defaultData;
      this.selectedItem.trueValue = this.defaultData[0][this.propValue];
    } else if (this.api) {
      try {
        // không thiếu >> gọi API get để lấy dữ liệu data
        const response = await axios.get(this.api);

        // lưu vào data của combobox
        this.comboBoxData = response.data;

        if (this.modelValue) {
          this.selectedItem.trueValue = this.modelValue;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Thiếu trường cho Combobox");
    }
  },

  /**
   * Mô tả : Chứa các hàm sự kiện của Cbx
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 11:19 29/03/2022
   */
  methods: {
    // /**
    //  * Mô tả : Đặt focus cho combobox
    //  * Created by: Nguyễn Hữu Lộc - MF1099
    //  * Created date: 13:23 19/04/2022
    //  */
    setFocus() {
      try {
        this.$refs.input.style.outline = "1px solid #2ca01c";
        this.$refs.input.focus()
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Mô tả : hủy focus
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 21:56 23/04/2022
     */
    removeFocus() {
      try {
        this.$refs.input.style = "";
        this.$refs.input.title = "";
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả : Bỏ lỗi error theo style
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 13:59 20/04/2022
     */
    removeError() {
      try {
        this.$refs.input.style = "";
        this.$refs.input.title = "";
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Mô tả : thêm lỗi vào border và tooltip
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 14:00 20/04/2022
     */
    setError(_content) {
      try {
        this.$refs.input.style.outline = "1px solid red";
        this.$refs.input.title = _content;
        this.$refs.input.focus();
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Mô tả : Tìm kiếm dựa theo property đầu tiên của danh sách
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 08:13 11/05/2022
     */
    // searchInputHandler(e){
    //     // có delay
    //     clearTimeout(this.delayTimer);
    //     this.delayTimer = setTimeout(() => {
    //         let value = e.target.value;

    //         // this.comboBoxData.filter((item) => {
    //         //     if (item[this.propValue] == value) {

    //         //     }
    //         // });

    //         console.log(value);

    //     }, 1000);
    // },
    /**
     * Mô tả : Hiện danh sách combobox
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 21:08 18/04/2022
     */
    displayListCbx(e) {
      // ẩn hoặc hiện danh sách
      this.showComboBox = !this.showComboBox;

      let cbxData = e.path[1];
      let cbxTop = cbxData.clientHeight + cbxData.getBoundingClientRect().top;
      let cbxLeft = cbxData.getBoundingClientRect().left;

      // set width cho data
      if (this.maxWidth) {
        this.positionStyle.width = "max-content";
      } else {
        this.positionStyle.width = cbxData.clientWidth + "px";
      }

      // check xem bị quá màn hình theo chiều dọc
      let viewHeight = window.innerHeight;
      let maxPosY = cbxTop + 32 * 6;
      if (maxPosY > viewHeight) {
        this.positionStyle.top = cbxTop + 2 - (cbxData.clientHeight + 32 * 6 + 12) + 'px';
      } else {
        this.positionStyle.top = cbxTop + 2 + "px";
      }

      // check xem bị quá màn hình theo chiều ngang
      let viewWidth = window.innerWidth;
      let maxPosX = cbxLeft + this.columns.length * 150;
      if (maxPosX > viewWidth){
        this.positionStyle.left = cbxLeft + 80 - (maxPosX - viewWidth ) + 'px'
      }

    },
    /**
     * Mô tả : Sự kiện chọn data item trong Cbx
     * @params
     *    cbxItem: item được select
     *    e: event con trỏ
     * @return
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 11:19 29/03/2022
     */
    cbxItemOnSelect(e, cbxItem) {
      try {
        e.preventDefault();
        // 1. Lưu giá trị item được select item
        // 1.1. Sau đó giá trị select sẽ được hiển thị trên input
        this.selectedItem.trueValue = cbxItem[this.propValue];

        // emit lên cha
        this.$emit("update:modelValue", this.selectedItem.trueValue);

        this.$emit("updateParentObject", this.parentKey, this.childKey, cbxItem);

        // 2. Highlight item được chọn
        // 2.0. Xóa lỗi
        this.removeError();

        // 3. Ẩn cbx item hết
        setTimeout(() => {
          this.showComboBox = false;
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },
    mapData,
  },
};
</script>
<style scoped>
.m-combobox .m-combobox-data {
  position: fixed;
  padding: 0;
  border: none;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #babec5;
}
.m-table {
  min-width: max-content;
  z-index: 100;
}

.m-table .m-th {
  background-color: #f4f5f8;
}

.m-table .m-td,
.m-table .m-th {
  border-bottom: none;
  border-right: none !important;
  border-left: none !important;
  height: 32px;
  line-height: 32px;
}

.m-table .m-tr th:nth-last-of-type(2),
.m-table .m-tr td:nth-last-of-type(2) {
  border-right: none !important;
  border-left: none !important;
}

.m-combobox-data .m-table .m-tr:hover .m-td {
  color: #35bf22;
  background-color: #ebedf0 !important;
  cursor: pointer;
}

.m-combobox-data .m-table .m-tbody > .m-tr.combobox-row-selected {
  background-color: #35bf22 !important;
  color: #fff;
}

@import url("@/css/components/combobox.css");
@import url("@/css/components/table.css");
</style>
