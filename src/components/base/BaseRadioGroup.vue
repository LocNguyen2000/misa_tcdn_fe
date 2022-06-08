<template>
  <div class="ratio-check-detail">
    <label class="m-radio" v-for="(value, key, index) in data" :key="index">
      <input
        class="m-inner-ratio"
        type="radio"
        name="radio"
        :value="value"
        v-model="this.currentValue"
        :disabled="isDisabled"
      />
      <span class="m-radio-name">{{ key }}</span>
      <span class="m-radio-marked" :class="{'m-input--readonly': isDisabled}"></span>
    </label>
  </div>
</template>
<script>
export default {
  name: "base-radio-group",
  props: {
    modelValue: {
      type: Number,
    },

    data: {
      type: Object,
    },

    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  updated() {
    this.currentValue = this.modelValue;
  },
  watch: {
    currentValue: function (newValue, oldValue) {
      if (newValue != oldValue) {
        this.$emit("update:modelValue", this.currentValue);
      }
    },
  },
  data() {
    return {
      currentValue: null,
    };
  },
};
</script>
<style scoped>
.ratio-check-detail {
  display: flex;
  height: 30px;
  align-items: center;
}

.ratio-check-detail .m-radio {
  margin-right: 30px;
}

.m-radio {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  height: 18px;
  box-sizing: border-box;
}

.m-radio .m-radio-name {
  font-size: 13px;
}

.m-radio-marked {
  position: absolute;
  height: 16px;
  width: 16px;
  line-height: 16px;
  color: #fff;
  border: 1px solid #bbbbbb;
  background-color: white;
  border-radius: 50%;
  left: 0;
}

.m-radio input.m-inner-ratio {
  display: none;
}

.m-radio input.m-inner-ratio:checked ~ .m-radio-marked::after {
  display: block;
}

.m-radio input.m-inner-ratio:checked ~ .m-radio-marked {
  border: 1px solid #2ca01c;
  background-color: #fff;
}

.m-radio-marked::after {
  content: "";
  position: absolute;
  display: none;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2ca01c;
}
</style>