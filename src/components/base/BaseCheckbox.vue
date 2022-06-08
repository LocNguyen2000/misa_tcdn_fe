<template>
  <div
    class="m-checkbox"
    :class="{ 'checked': this.modelValue || this.checked, 'm-input--readonly': isDisabled }"
    @click.prevent="updateValue"
  ></div>
</template>
<script>
export default {
  name: "m-checkbox",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Boolean, String],
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    updateValue(){
      if (this.isDisabled == false){
        this.$emit("update:modelValue", !this.modelValue)
      }
    }
  }
};
</script>
<style>
@import url("@/css/components/checkbox.css");
</style>