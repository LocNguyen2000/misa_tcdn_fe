<template>
  <div
    class="m-filter-background"
    :style="{ left: leftPosition + 'px', top: topPosition + 'px' }"
  >
    <div class="filter-menu">
      <div class="w-full">
        <div class="m-label">Lý do thu, chi</div>
        <base-combobox
          :defaultData="this.mockData.mockPaymentType"
          v-model="this.paymentType"
          propTxt="text"
          propValue="value"
        />
      </div>
      <div class="w-full pt-3">
        <div class="m-label">Trạng thái ghi sổ</div>
        <base-combobox
          :defaultData="this.mockData.recordState"
          v-model="this.FilterIsRecord"
          propTxt="RecordStateName"
          propValue="IsRecord"
        />
      </div>
      <div class="w-full pt-3 flex pb-2-5">
        <div class="w-150 mg-r-12">
          <div class="m-label">Thời gian</div>
          <base-combobox
            :defaultData="this.mockData.dateRange"
            v-model="this.FilterRangeState"
            propTxt="RangeStateName"
            propValue="RangeState"
          />
        </div>
        <div class="flex">
          <div class="w-120 mg-r-12">
            <div class="m-label">Từ ngày</div>
            <!-- eslint-disable  -->
            <date-picker
              v-model:value="MDateStartFilter"
              :format="'DD/MM/YYYY'"
              :placeholder="'DD/MM/YYYY'"
              :lang="'vi'"
              :clearable="false"
              title-format="'DD/MM/YYYY'"
            />
            <!-- eslint-enable  -->
          </div>

          <div class="w-120">
            <div class="m-label">Đến ngày</div>
            <!-- eslint-disable  -->
            <date-picker
              v-model:value="MDateEndFilter"
              :format="'DD/MM/YYYY'"
              :placeholder="'DD/MM/YYYY'"
              :lang="'vi'"
              :clearable="false"
              title-format="'DD/MM/YYYY'"
              :disabled-date="beforeDateStart"
            />
            <!-- eslint-enable  -->
          </div>
        </div>
      </div>
      <div class="flex space-between">
        <button class="m-btn m-btn-secondary btn-size-default">Đặt lại</button>
        <button
          class="m-btn m-btn-primary btn-size-default"
          @click.prevent="filterAdvance"
        >
          Lọc
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import BaseCombobox from "@/components/base/combobox/BaseCombobox.vue";
import "vue-datepicker-next/index.css";
import DatePicker from "vue-datepicker-next";

export default {
  name: "cash-filter",
  components: {
    BaseCombobox,
    DatePicker,
  },

  watch: {
    /**
    * Mô tả : Theo dõi giá trị của filter để set ngày bắt đầu + ngày kết thúc
    * Created by: Nguyễn Hữu Lộc - MF1099
    * Created date: 16:36 07/06/2022
    */
    FilterRangeState: function (newValue) {
      if (newValue >= 1 && newValue <= 12) {
        let date = new Date();
        let year = date.getFullYear();

        this.FilterDateStart = new Date(year, newValue - 1, 1);
        this.FilterDateEnd = new Date(year, newValue, 0);

        this.FilterRangeState = newValue;
      } else if (newValue == 13) {
        let date = new Date();
        let year = date.getFullYear();

        this.FilterDateStart = new Date(year, 0, 1);
        this.FilterDateEnd = new Date(year, 12, 0);
      } else if (newValue == 14) {
        let date = new Date();
        let year = date.getFullYear();

        this.FilterDateStart = new Date(year - 1, 0, 1);
        this.FilterDateEnd = new Date(year - 1, 12, 0);
      }
    },
  },
  /**
  * Mô tả : Gán dữ liệu
  * Created by: Nguyễn Hữu Lộc - MF1099
  * Created date: 16:37 07/06/2022
  */
  mounted(){
    this.FilterDateStart = this.startDate;
    this.FilterDateEnd = this.endDate;
    this.FilterRangeState = this.rangeState;
    this.FilterIsRecord = this.isRecord;
  },

  computed: {
    MDateStartFilter: {
      get() {
        if (!this.FilterDateStart) return;
        return new Date(this.FilterDateStart);
      },
      set(newValue) {
        this.FilterRangeState = 0;

        this.FilterDateStart = newValue.toDateString();
      },
    },

    MDateEndFilter: {
      get() {
        if (!this.FilterDateEnd) return;
        return new Date(this.FilterDateEnd);
      },
      set(newValue) {
        this.FilterRangeState = 0;

        this.FilterDateEnd = newValue.toDateString();
      },
    },
  },
  props: {
    topPosition: {
      type: Number,
      default: 0,
    },
    leftPosition: {
      type: Number,
      default: 0,
    },
    isRecord: {
      type: Number,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    rangeState: {
      type: Number,
      default: 0
    }

  },
  methods: {
    beforeDateStart(date) {
      return date < new Date(this.FilterDateStart);
    },

    filterAdvance() {
      if (this.FilterDateStart != null ){
        this.FilterDateStart = new Date(this.FilterDateStart).toDateString();
        this.FilterDateEnd = new Date(this.FilterDateEnd).toDateString();
      }

      this.$emit("setFilterAdvance", this.FilterIsRecord, this.FilterDateStart, this.FilterDateEnd, this.FilterRangeState);
      this.$emit("update:rangeState", this.FilterRangeState)
    },
  },
  data() {
    return {
      FilterIsRecord: null,

      paymentType: null,

      FilterRangeState: 0,
      FilterDateStart: null,
      FilterDateEnd: null,
    };
  },
};
</script>
<style scoped>
.m-filter-background {
  position: fixed;
  z-index: 90;
  padding: 16px 20px 20px;
  background-color: #fff;
  transition: opacity 0.25s, transform 0.25s, width 0.3s ease;
  border: 1px solid #babec5;
  border-radius: 3px;
}
</style>
