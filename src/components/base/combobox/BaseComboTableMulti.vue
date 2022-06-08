<template>
  <div class="m-combobox" :class="{'m-combobox--readonly': isDisabled}"  ref="input">
    <div class="selected-options">
      <div
        class="selected-item"
        v-for="(value, index) of mappingValue"
        :key="index"
      >
        <div class="item-txt">{{ value }}</div>
        <button
          class="item-icon m-icon m-close--small m-icon-w-16"
          @click.prevent="removeItem(value)"
          :disabled="isDisabled"
        ></button>
      </div>
    </div>

    <button class="m-combobox-btn add"></button>
    <button
      class="m-combobox-btn arrow"
      v-on:click.prevent="displayListCbx"
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
            <th class="m-th" style="width: 10px"></th>
          </tr>
        </thead>
        <tbody class="m-tbody">
          <tr
            v-for="(data, rowIndex) of comboBoxData"
            :key="rowIndex"
            @click="cbxItemOnSelect(data)"
            class="m-tr"
          >
            <td class="m-td" v-for="(col, index) of columns" :key="index">
              {{ data[col.columnProperty] }}
            </td>
            <td class="m-td" style="width: 10px">
              <div
                :class="{
                  'selected-icon': this.modelValue.includes(
                    data[this.propValue]
                  ),
                }"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "base-combo-multi",
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
      type: Array,
      default: () => [],
    },

    // thuộc tính disable input
    isDisabled: {
      type: Boolean,
      default: false,
    },

    maxWidth: {
      type: String,
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
        trueValue: [],
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
      let mappedValue = [];

      if (this.modelValue){
        this.comboBoxData.filter((item) => {
          if (this.modelValue.includes(item[this.propValue])) {
            mappedValue.push(item[this.propTxt]);
          }
        });
      }
      if (mappedValue.length == 0) return null;
      return mappedValue;
    },
  },

  watch: {
    modelValue: {
      handler(newValue){
        this.selectedItem.trueValue = newValue;
      },
      deep: true
    }
  },

  /**
   * Mô tả : Gọi API theo thuộc tính props và lưu vào ComboBoxData để hiển thị danh sách
   * Created by: Nguyễn Hữu Lộc - MF1099
   * Created date: 14:20 02/04/2022
   */
  async mounted() {
    // kiểm tra xem thiếu trường props

    if (this.defaultData) {
      this.comboBoxData = this.defaultData;
    } else if (this.api) {
      try {
        // không thiếu >> gọi API get để lấy dữ liệu data
        const response = await axios.get(this.api);

        // lưu vào data của combobox
        this.comboBoxData = response.data;
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Thiếu trường cho Combobox");
    }

    if (this.modelValue) {
      this.selectedItem.trueValue = this.modelValue;
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

      console.log(cbxData);

      this.positionStyle.top =
        cbxData.clientHeight + cbxData.getBoundingClientRect().top + 2 + "px";

      if (this.maxWidth) {
        this.positionStyle.width = this.maxWidth;
      } else {
        this.positionStyle.width = cbxData.clientWidth + "px";
      }
      // set width cho data

      // if (currentPosY > viewHeight) {
      //   // đổi thuộc tính để style lại vị trí của danh sách
      //   delete this.positionStyle.top;
      //   this.positionStyle = {
      //     bottom: "32px",
      //   };
      // } else {
      //   delete this.positionStyle.bottom;
      //   this.positionStyle = {
      //     top: "32px",
      //   };
      // }
    },
    /**
     * Mô tả : Sự kiện chọn data item trong Cbx
     * @return
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 11:19 29/03/2022
     */
    cbxItemOnSelect(cbxItem) {
      try {
        // 1. Lưu giá trị item được select item
        // 1.1. Sau đó giá trị select sẽ được hiển thị trên input

        let selectedValue = cbxItem[this.propValue];

        if (this.modelValue.includes(selectedValue)) {
          const index = this.modelValue.findIndex((id) => {
            return id === selectedValue;
          });
          // Xóa khỏi danh sách
          this.selectedItem.trueValue.splice(index, 1);
        } else {
          this.selectedItem.trueValue.push(selectedValue);
        }

        // emit lên cha
        this.$emit("update:modelValue", this.selectedItem.trueValue);

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

    removeItem(cbxTxt) {
      let cbxValue = this.comboBoxData.filter((cbx) => {
        return cbx[this.propTxt] === cbxTxt;
      });

      cbxValue = cbxValue[0][this.propValue]

      const index = this.modelValue.findIndex((id) => {
        return id === cbxValue;
      });

      // Xóa khỏi danh sách
      this.selectedItem.trueValue.splice(index, 1);

      // emit lên cha
      this.$emit("update:modelValue", this.selectedItem.trueValue);
    },
  },
};
</script>
<style scoped>
.selected-options {
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  width: calc(100% - 32px);
  align-items: center;
  padding: 0 0 0 10px;
  max-height: unset;
}
.selected-options .selected-item:not(:last-child) {
  margin-right: 2px;
}
.selected-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #f0f0f0;
  padding: 2px 3px 2px 5px;
  margin: 3px;
  max-width: calc(100% - 50px);
  overflow: hidden;
  text-overflow: ellipsis;
}

.selected-item .item-txt {
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.selected-item .item-icon {
  margin-left: 4px;
  border: none;
  outline: none;
}

.selected-item .item-icon:hover{
  background-color: #f0f0f0;
}

.selected-icon {
  padding-right: 10px;
  background: url("@/assets/img/Sprites.645f8243.svg") no-repeat;
  background-position: -896px -312px;
  width: 16px;
  height: 16px;
}

.m-combobox {
  max-height: unset;
}

.m-combobox .m-combobox-data {
  position: fixed;
  padding: 0;
  border: none;
  max-height: 200px;
  overflow-y: auto;
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
  border: none;
  height: 32px;
  line-height: 32px;
}

.m-table .m-tr th:nth-last-of-type(2),
.m-table .m-tr td:nth-last-of-type(2) {
  border: none !important;
}

.m-table .m-tr:hover .m-td {
  color: #35bf22;
  background-color: #ebedf0 !important;
  cursor: pointer;
}

.m-table .m-tr.row-selected {
  background-color: #35bf22;
  color: #fff;
}

@import url("@/css/components/combobox.css");
@import url("@/css/components/table.css");
</style>
