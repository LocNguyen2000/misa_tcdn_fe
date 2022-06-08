<template>
  <textarea
    class="m-textarea"
    :class="{'m-input--readonly': isDisabled}"
    :rows="rows"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :value="modelValue"
    @input.prevent="updateValue"
    :disabled="isDisabled"
  >
  </textarea>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
    },
    rows: {
      type: Number,
      default: 2,
    },
    maxLength: {
      type: Number,
      default: 255,
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      currentValue: this.modelValue
    }
  },  
  methods: {
    updateValue(e) {
      let value = e.target.value;
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
<style>
@import url("@/css/components/textarea.css");
</style>