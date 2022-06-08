<template>
  <div class="overflow-x">
    <div class="pb-2"></div>
    <!-- <BaseComboTableMulti 
            propTxt="VendorGroupCode"
            propValue="VendorGroupId"
            :defaultData="clientVendorGroupMock"
            :columns="columnClientVendor"
            v-model="this.currentVendorGroup"
        /> -->
    <!-- <div class="m-add-dropdown">
      <div class="add-btn m-btn m-btn-primary radius-btn--round">Thêm</div>
      
      <div class="split-btn"></div>

      <div class="dropdown-btn m-btn m-btn-primary">
        <div class="m-icon m-icon-w-16 icon--arrowUp--white"></div>
      </div>
    </div> -->
    <!-- <AccountTreeTable 
      :treeData="this.accountData"
      :columns="this.accountColumns"
    /> -->
    <!-- <cash-filter /> -->

  </div>
</template>
<script>
// import axios from 'axios';
// import BaseComboTableMulti from "./base/combobox/BaseComboTableMulti.vue";
// import AccountTreeTable from '../view/account/AccountTreeTable.vue';
// import CashFilter from '@/view/cash/CashFilter.vue';
export default {
  components: { 
    // AccountTreeTable,
    // CashFilter
  },
  async mounted(){
    // try {
    //   const {data} = await axios.get(this.MISA_API.TABLE_API('account'))

    //   const response = await axios.get(this.MISA_API.ACCOUNT_BASE);
      
    //   this.accountColumns = data;
    //   this.accountData = response.data;

    //   console.log( this.accountData);

    // } catch (error) {
    //   console.log(error);
    // }
  },
  data() {
    return {
      accountColumns: [],
      accountData: [],
      currentVendorGroup: [],
    };
  },
};
</script>
<style scoped>
 @import url("@/css/common/padding.css");
</style>
