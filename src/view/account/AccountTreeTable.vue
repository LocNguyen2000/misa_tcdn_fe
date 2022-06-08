<template>
  <table class="m-table">
    <!-- HEADER -->
    <thead class="m-thead">
      <tr class="m-tr">
        <th class="space sticky-col left"></th>
        <th
          v-for="(col, index) of displayColumns"
          :key="index"
          class="m-th"
          :class="col.className"
          :style="{ minWidth: col.width + 'px', width: col.width + 'px' }"
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
    <!-- BODY -->
    <tbody class="m-tbody" v-if="displayData.length > 0">
      <tr
        v-for="(data, rowIndex) in displayData"
        :key="rowIndex"
        class="m-tr"
        v-show="data.IsShow"
      >
        <td class="space static-col left"></td>
        <td
          v-for="(col, index) in displayColumns"
          :key="index"
          class="m-td text-overflow-hidden"
          :class="col.className"
          :name="col.name"
          :style="{ minWidth: col.width + 'px', width: col.width + 'px' }"
        >
          <!-- CỘT ĐẦU TIÊN -->
          <span
            class="flex"
            :class="{
              'font-bold': data.IsParent,
              'tree-lvl-1': data.Grade == 1,
              'tree-lvl-2': data.Grade == 2,
              'tree-lvl-3': data.Grade == 3,
            }"
            v-if="index == 0"
          >
            <div
              class="m-icon m-icon-w-16 pr-2"
              :class="{
                'not-visible': !data.IsParent,
                'icon--collapse': !data.IsCollapse,
                'icon--expand': data.IsCollapse,
              }"
              @click.prevent="handleClickCollapse(rowIndex)"
            ></div>
            {{ data[col.name] }}
          </span>

          <!-- CỘT CÒN LẠI -->
          <span class="flex" :class="{ 'font-bold': data.IsParent }" v-else>
            {{ data[col.name] }}
          </span>
        </td>

        <td
          class="m-td static-col flex flex-align-center justify-center"
          style="min-width: 120px; right: 46px"
        >
          <div
            class="btn-edit-data pd-r-6"
          >
            Sửa
          </div>
          <div
            class="m-icon icon--arrowup-bg-blue"
          ></div>
        </td>
        <td class="space static-col" style="right: 30px"></td>
        <td class="space-outside static-col right"></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "tree-account-table",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    primeKeyName: {
      type: String,
    },
    treeData: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.displayColumns = this.columns.filter((column) => {
      return column.isShow == true;
    });

    this.displayData = this.treeData;
    this.displayData = this.sortTreeTable(this.displayData);
  },
  // Theo dõi dữ liệu thay đổi > cập nhật
  watch: {
    columns: {
      handler(newValue) {
        this.displayColumns = newValue.filter((column) => {
          return column.isShow == true;
        });
      },
      deep: true,
    },
    treeData: {
      handler(newValue) {
        this.displayData = this.sortTreeTable(newValue);
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Mô tả: Thực hiện nghiệp vụ khi ấn nút mở rộng/thu gọn dòng dữ liệu
     * @param {object} event Biến sự kiện
     * @param {string} accountId Khóa của dòng dữ liệu cha
     * Created by: NHLOC - MF1099
     * Created date: 16:48 31/05/2022
     */
    handleClickCollapse(index) {
      // đổi icon hiển thị
      if (this.displayData[index].IsCollapse) {
        this.displayData[index].IsCollapse =
          !this.displayData[index].IsCollapse;
      } else {
        this.displayData[index].IsCollapse = true;
      }

      // kiểm tra lại dòng đang được chọn là dòng con thì chuyển dòng được chọn về thành dòng cha
      // ẩn/hiện dòng dữ liệu con
      this.toggleDisplayChildRowTable(index, this.displayData[index].Grade);
    },

    /**
     * Mô tả: Cập nhật các dòng hiển thị khi ấn nút mở rộng/thu gọn
     * @param {number} currentGrade Độ sâu của dữ liệu hiện tại
     * @param {number} currentIndex Vị trí hiện tại của dòng dữ liệu thực hiện kiểm tra
     * @return {func} Gọi lại hàm kiểm tra dòng hiển thị
     * Created by: NHLOC - MF1099
     * Created date: 16:24 31/05/2022
     */
    toggleDisplayChildRowTable(currentIndex, currentGrade) {
      // eslint-disable-next-line
      debugger

      for (
        let index = currentIndex + 1; index < this.displayData.length; index++
      ) {
        let currentItem = this.displayData[index];
        let itemGrade = currentItem.Grade;

        // Nếu các phần tử là phần tử con của dữ liệu thì thực hiện:
        if (itemGrade > currentGrade) {
          // Đặt giá trị theo phần tử cha
          for ( let parentIndex = index - 1; parentIndex >= currentIndex; parentIndex--
          ) {
            let parentItem = this.displayData[parentIndex];
            // Tìm kiếm phần tử cha
            if (currentItem.ParentId == parentItem.AccountId) {
              // dòng hiện tại chỉ hiển thị khi cha của nó không đóng và cha của nó đang được hiển thị
              currentItem.IsShow = !parentItem.IsCollapse && parentItem.IsShow;

              break;
            }
          }
        } else {
          // Nếu không phải phần tử con thì kết thúc
          return;
        }
      }
    },

    /**
     * Mô tả : Sort cây dữ liệu từ bé > lớn
     * Created by: Nguyễn Hữu Lộc - MF1099
     * Created date: 15:23 06/06/2022
     */
    sortTreeTable(tblData) {
      tblData.sort((firstAccount, secondAccount) => {
        // Nếu dữ liệu có cùng độ sâu >> sắp xếp theo số tk
        if (firstAccount.Grade == secondAccount.Grade) {
          return firstAccount.AccountNumber - secondAccount.AccountNumber;
        }
        // ko thì sắp xếp theo grade
        return firstAccount.Grade > secondAccount.Grade ? 1 : -1;
      });

      // phân cấp table
      let sortedData = [];

      for (let index = 0; index < tblData.length; index++) {
        const account = tblData[index];
        // Kiểm tra dữ liệu có dữ liệu cha không?
        if (account.ParentId != null) {
          // Thực hiện chèn dữ liệu vào sau bản ghi của cha
          let parentIndex = sortedData.findIndex(
            (tblAccount) => tblAccount.AccountId == account.ParentId
          );

          // kiểm tra xem dữ liệu cha đã có con (có grade lớn hơn và tồn tại grade)
          if (
            sortedData[parentIndex + 1] &&
            sortedData[parentIndex + 1].Grade == account.Grade
          ) {
            // nếu cha có con >> tăng index đến khi không còn là cha
            let childIndex = parentIndex + 1;
            while (sortedData[childIndex].ParentId == account.ParentId) {
              childIndex++;
            }
            // chèn vào giữa
            sortedData.splice(childIndex, 0, account);
          }
          // nếu chưa có con >> insert ngay sau cha
          else {
            sortedData.splice(parentIndex + 1, 0, account);
          }
        } else {
          // Nếu dữ liệu không có dữ liệu cha thì chỉ thực hiện thêm dữ liệu vào bảng
          sortedData.push(account);
        }

        if (account.IsShow == null) {
          // hiển thị dòng dữ liệu
          account.IsShow = true;
        }
      }

      return sortedData;
    },
  },
  data() {
    return {
      displayColumns: [],
      displayData: [],
    };
  },
};
</script>
<style scoped>
.tree-lvl-1 {
  padding-left: 10px !important;
}
.tree-lvl-2 {
  padding-left: 30px !important;
}
.tree-lvl-3 {
  padding-left: 50px !important;
}
</style>
