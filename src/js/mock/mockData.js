const mockData = {
  contractMock: [
    {
      ContractId: "594ce9a4-34c3-4446-bbed-ffff34afbe47",
      ContractCode: "ĐK-01",
      ContractName: "Chủ thể hợp đồng",
    },
    {
      ContractId: "80e68793-10f0-4419-90a1-54c9e33be53e",
      ContractCode: "ĐK-02",
      ContractName: "Giá và phương thức thanh toán",
    },
    {
      ContractId: "847648b7-c1a4-4c09-aa8d-e9a0e419adea",
      ContractCode: "ĐK-03",
      ContractName: "Quyền và nghĩa vụ của các bên",
    },
    {
      ContractId: "c9bea4d1-ad28-42a4-a825-f7972c33e762",
      ContractCode: "ĐK-04",
      ContractName: "Phạt vi phạm và bồi thường thiệt hại",
    },
    {
      ContractId: "0a48baca-e273-4d6c-909c-f13d0a00ed13",
      ContractCode: "ĐK-05",
      ContractName: "Chấm dứt hợp đồng",
    },
    {
      ContractId: "086efa5c-2da3-4925-8eb3-c268e1729ebe",
      ContractCode: "ĐK-06",
      ContractName: "Điều kiện bảo mật",
    },
    {
      ContractId: "999f1b57-04bb-4803-ae15-0a1ddcce0bd1",
      ContractCode: "ĐK-07",
      ContractName: "Bảo hành",
    },
  ],
  mockPaymentType: [
    { text: 'Tất cả', value: null },
  ],
  recordState: [
    { IsRecord: null, RecordStateName: "Tất cả" },
    { IsRecord: 1, RecordStateName: "Đã ghi sổ" },
    { IsRecord: 0, RecordStateName: "Chưa ghi sổ" },
  ],
  dateRange: [
    { RangeState: 1, RangeStateName: "Tháng 1" },
    { RangeState: 2, RangeStateName: "Tháng 2" },
    { RangeState: 3, RangeStateName: "Tháng 3" },
    { RangeState: 4, RangeStateName: "Tháng 4" },
    { RangeState: 5, RangeStateName: "Tháng 5" },
    { RangeState: 6, RangeStateName: "Tháng 6" },
    { RangeState: 7, RangeStateName: "Tháng 7" },
    { RangeState: 8, RangeStateName: "Tháng 8" },
    { RangeState: 9, RangeStateName: "Tháng 9" },
    { RangeState: 10, RangeStateName: "Tháng 10" },
    { RangeState: 11, RangeStateName: "Tháng 11" },
    { RangeState: 12, RangeStateName: "Tháng 12" },
    { RangeState: 13, RangeStateName: "Năm nay" },
    { RangeState: 14, RangeStateName: "Năm trước" },
    { RangeState: 0, RangeStateName: "Tùy chọn" },
  ]

  ,clientVendorGroupMock: [
    {
      VendorGroupId: "303a7168-70eb-4a9a-a3c4-f6e663938ea1",
      VendorGroupName: "Airmail Economy",
      VendorGroupCode: "VD0896",
    },
    {
      VendorGroupId: "3b6f5059-23a8-3014-d80d-5067034771e5",
      VendorGroupName: "DHL",
      VendorGroupCode: "VD0017",
    },
    {
      VendorGroupId: "42b5017d-195b-4deb-6b08-768121fccb40",
      VendorGroupName: "USPS Express Mail",
      VendorGroupCode: "VD0101",
    },
    {
      VendorGroupId: "4d4298b7-7671-499c-ee58-ce18e8de0aff",
      VendorGroupName: "FedEx Freight",
      VendorGroupCode: "VD0535",
    },
    {
      VendorGroupId: "5ba51a92-3533-41e7-a69a-f9e5cbdfcf73",
      VendorGroupName: "Boxberry Courier",
      VendorGroupCode: "VD0143",
    },
    {
      VendorGroupId: "5de094ba-4a38-7457-d70d-5067034771e5",
      VendorGroupName: "FedEx Freight",
      VendorGroupCode: "VD0391",
    },
    {
      VendorGroupId: "6829ee5e-75bd-37ff-ed58-ce18e8de0aff",
      VendorGroupName: "USPS First Class Mail",
      VendorGroupCode: "VD0937",
    },
    {
      VendorGroupId: "7ca6902c-1f32-1837-bfe5-7797b077698d",
      VendorGroupName: "FedEx",
      VendorGroupCode: "VD0953",
    },
    {
      VendorGroupId: "2785140e-5b88-33bb-98a0-ad9c84527912",
      VendorGroupName: "MISA Sapo",
      VendorGroupCode: "VD0141",
    },
    {
      VendorGroupId: "2fc5e08e-636d-247c-d90d-5067034771e5",
      VendorGroupName: "FPT MISA",
      VendorGroupCode: "VD0673",
    },
  ],

  bankAccountsMock: [
    {
      BankId: "8c97e050-b801-4a2a-9bf6-1caf2c43e7e3",
      BankAccount: "1111",
      BankName: "Tiền Việt Nam",
    },
    {
      BankId: "7d7f79ab-7322-447b-b525-e6f1f1af1ebf",
      BankAccount: "1112",
      BankName: "Ngoại tệ",
    },
    {
      BankId: "464e24ab-a7b7-45a7-8ae9-f7c3237d9054",
      BankAccount: "1113",
      BankName: "Vàng tiền tệ",
    }
  ],

  countryDataMock: [
    {
      CountryId: "1",
      CountryName: "Việt Nam",
    },
  ],
  mockPaymentPurposes: [
    { text: '1. Trả tiền cho nhà cung cấp (Không theo hóa đơn)', value: 1 },
    { text: '2. Tạm ứng cho nhân viên', value: 2 },
    { text: '3. Chi mua ngoài có hóa đơn', value: 3 },
    { text: '4. Trả lương cho nhân viên', value: 4 },
    { text: '5. Chuyển tiền cho chi nhánh khác', value: 5 },
    { text: '6. Gửi tiền vào ngân hàng', value: 6 },
    { text: '7. Chi khác', value: 7 },
  ],

  mockCurrencyId: [
    { currencyId: 1, currencyCode: "VND", currencyName: "Việt Nam Đồng", exchangeRate: 1 },
    { currencyId: 2, currencyCode: "USD", currencyName: "Đô la Mỹ", exchangeRate: 23150.00 },
  ],
  pronounceList: [
    {
      text: "Ông",
      value: "Ông",
    },
    {
      text: "Bà",
      value: "Bà",
    },
    {
      text: "Anh",
      value: "Anh",
    },
    {
      text: "Chị",
      value: "Chị",
    },
  ],
}

export default mockData;