const MISA_API = {
    // NHÀ CUNG CẤP
    VENDOR_BASE: "http://localhost:5205/api/v1/Vendors/",
    VENDOR_EXPORT: "http://localhost:5205/api/v1/Vendors/Export",
    VENDOR_DELETE_MANY: "http://localhost:5205/api/v1/Vendors/DeleteMany",
    VENDOR_NEW_CODE: "http://localhost:5205/api/v1/Vendors/NewCode",
    VENDOR_FILTER(pageNumber=1, pageSize=10, filter=null){
        let api = `http://localhost:5205/api/v1/Vendors/filter?pageIndex=${pageNumber}&pageSize=${pageSize}`
        if (filter){
            api += `&filter=${filter}`
        }
        return api;
    },
    VENDOR_WITH_ID(id){
        return `http://localhost:5205/api/v1/Vendors/${id}`
    },

    // CHI TIÊU
    PAYMENT_BASE: "http://localhost:5205/api/v1/Payments/",
    PAYMENT_EXPORT: "http://localhost:5205/api/v1/Payments/Export",
    PAYMENT_WITH_DETAIL: "http://localhost:5205/api/v1/Payments/PaymentWithDetail",
    PAYMENT_DELETE_MANY: "http://localhost:5205/api/v1/Payments/DeleteMany",
    PAYMENT_NEW_CODE: "http://localhost:5205/api/v1/Payments/NewCode",
    PAYMENT_FILTER(pageNumber=1, pageSize=10, filter=null, isRecord=null, startDate=null, endDate=null){
        let api = `http://localhost:5205/api/v1/Payments/filterAdvance?pageIndex=${pageNumber}&pageSize=${pageSize}`
        if (filter){
            api += `&filter=${filter}`
        }
        if (isRecord != null){
            api += `&isRecord=${isRecord}`
        }
        if (startDate && endDate){
            api += `&startDate=${startDate}`
            api += `&endDate=${endDate}`
        }
        return api;
    },
    PAYMENT_WITH_DETAIL_ID(id){
        return `http://localhost:5205/api/v1/Payments/PaymentWithDetail/${id}`
    },
    PAYMENT_WITH_ID(id){
        return `http://localhost:5205/api/v1/Payments/${id}`
    },
    // HỆ THỐNG TÀI KHOẢN
    ACCOUNT_WITH_ID(id){
        return `http://localhost:5205/api/v1/Accounts/${id}`
    },
    
    // BẢNG 
    TABLE_API(_query){
        return `http://localhost:4000/api/v1/tables/?tableName=${_query}`;
    },
    // VỊ TRÍ
    LOCATION_API_PROVINCE: "http://localhost:4000/api/v1/provinces",
    LOCATION_API_DISTRICT(filter) {
        return `http://localhost:4000/api/v1/districts/ByProvince/${filter}`;
    },
    LOCATION_API_WARD(filter) {
        return `"http://localhost:4000/api/v1/wards/ByDistrict/${filter}`;
    },


    
    // NHÂN VIÊN
    EMPLOYEE_BASE: "http://localhost:5205/api/v1/Employees/",
    getDepartment: "https://amis.manhnv.net/api/v1/Departments/",

    // TÀI KHOẢN
    ACCOUNT_BASE: "http://localhost:5205/api/v1/Accounts/"

}
export default MISA_API;