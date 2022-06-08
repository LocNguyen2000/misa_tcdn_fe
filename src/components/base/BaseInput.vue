<template>
  <div class="m-input-wrapper">
    <input
      ref="input"
      class="m-input"
      :class="{
        'm-input--readonly': isDisabled,
        'text-align-right-override': isInputRight,
        'pr-2-75': hasIcon,
        'pd-r-10': !hasIcon,
      }"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :style="{ paddingRight: paddingRight }"
      @input="onChangeHandler"
    />
     <!-- :type="inputType"
      :min="inputType == 'number'? 0 : ''" -->
    <div :class="this.iconType" v-if="hasIcon"></div>
  </div>
</template>
<script>
// import currency from "currency.js";
import {isNumeric, isNumber, formatNumber} from "@/js/utils"

export default {
  name: "base-input",
  props: {
    // UI Prop
    placeholder: { type: String },
    iconName: { type: String },
    inputType: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    // Function Prop
    propName: { type: String },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isInputRight: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    // Nếu có trường này thì hiện icon
    if (this.iconName) {
      this.iconType = `m-icon icon--${this.iconName}`;
      this.hasIcon = true;
    }
  },

  methods: {
    onChangeHandler(e) {
      // Cập nhật giá trị props v-model
      e.preventDefault();
      let value = e.target.value;
      if (value) this.removeError();

      switch (this.inputType) {
        case "number": {

          if(isNumber(value) && value.toString().length <= 14){
            if (!value) value = 0;
            else {
              value = parseFloat(value);
            }
            this.oldValue = value;
          }
          else {
            e.target.value = this.oldValue
            value = this.oldValue
          }
          break;
        }
        case "currency": {
          value = this.handleCurrency(e)
          break;
        }
      }
      this.$emit("update:modelValue", value);
    },
    /**
     * Mô tả : Hàm set focus input
     * Created by: NHLOC - MF1099
     * Created date: 23:39 23/04/2022
     */
    setFocus() {
      this.$refs.input.focus();
    },
    /**
     * Mô tả : Hàm set bỏ border lỗi input
     * Created by: NHLOC - MF1099
     * Created date: 23:39 23/04/2022
     */
    removeError() {
      this.$refs.input.style = "";
      this.$refs.input.title = "";
    },
    /**
     * Mô tả : Hàm thêm border lỗi
     * Created by: NHLOC - MF1099
     * Created date: 23:40 23/04/2022
     */
    setError(_content) {
      this.$refs.input.style.border = "1px solid red";
      this.$refs.input.title = _content;
      this.setFocus();
    },

    isNumeric,
    isNumber,
    formatNumber,

    handleCurrency(e){
      let value = e.target.value
      let str = `${value}`
      value = value.toString().replaceAll(".", "");

      let isNumeric = this.isNumeric(value)
      if (isNumeric && value.toString().length <= 14){
        let number = value.split(",");

        let numberFormatted =  this.formatNumber(parseInt(number[0]));
        if (number.length > 1) {
          str = `${numberFormatted},${number[1]}`;
        }
        else {
          str = numberFormatted
        }

        e.target.value = str;
        this.oldValue = str;

        return str;
      }

      e.target.value = this.oldValue
      return this.oldValue
    }
  },
  data() {
    return {
      // Component UI
      iconType: null,
      hasIcon: false,
      paddingRight: null,
      oldValue: null
    };
  },
};
</script>
<style>
.text-align-right-override {
  padding-right: 6px !important;
  text-align: right;
}

@import url("@/css/components/input.css");
</style>
