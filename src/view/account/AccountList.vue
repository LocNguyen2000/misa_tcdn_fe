<template>
  <div class="m-view-container">
    <div class="m-title sticky" style="left: 0">
      <div class="m-row">
        <div class="title-text">Hệ thống tài khoản</div>
        <div class="title-btn">
          <div class="m-add-dropdown">
            <div
              class="add-btn m-btn m-btn-primary radius-btn--round"
              @click.prevent="onClickNewForm"
            >
              Thêm
            </div>
            <div class="dropdown-btn m-btn m-btn-primary">
              <div class="m-icon m-icon-w-16 icon--arrowUp--white"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-row">
        <div class="m-icon m-icon-w-16 icon--arrowleft"></div>
        <div class="back">Tất cả danh mục</div>
      </div>
    </div>
    <!-- THANH TOOLBAR NẰM TRƯỚC TABLE -->
    <div class="m-toolbar sticky left" >
      <div class="flex-grow"></div>

      <div class="toolbar-btn-wrapper">
        <div class="m-icon icon--refresh" title="Lấy lại dữ liệu"></div>
      </div>
    </div>

    <account-tree-table
      :treeData="this.accountData"
      :columns="this.accountColumns"
    />

    <div class="m-paging">
      <div class="paging-left flex flex-align-center">
        <div class="total-data">
          Tổng số: <b>{{ this.totalRecords }}</b> bản ghi
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
import axios from "axios";
import AccountTreeTable from "@/view/account/AccountTreeTable.vue";

export default {
  name: "view-accountlist",
  components: {
    AccountTreeTable,
  },
  async mounted() {
    try {
      const { data } = await axios.get(this.MISA_API.TABLE_API("account"));

      const response = await axios.get(this.MISA_API.ACCOUNT_BASE);

      this.accountColumns = data;
      this.accountData = response.data;
      this.totalRecords = this.accountData.length;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    

  },
  data() {
    return {
      accountColumns: [],
      accountData: [],
      accountSelected: {},

      totalRecords: 0,

      rowIdSelected: null,

      // 4. Thuộc tính của Popover (Component thực hiện chức năng Xóa-nhân bảng-ngừng sử dụng)
      // Biến hiện popover
      isShowPopover: false,

      // Vị trí thứ tự hiện của popover
      popOverIndex: null,

      // tọa độ x, y trong màn hình
      popOverX: null,
      popOverY: null,
    };
  },
};
</script>
<style scoped>
.m-view-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.m-view-container > div {
  margin-right: 30px;
}
</style>
