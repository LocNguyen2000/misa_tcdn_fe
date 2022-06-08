const popupMsg = {
    suggestMsg: 'Bạn có muốn chương trình tự động tăng số chứng từ không?',
    notDevelopedMsg: "Tính năng đang phát triển. Vui lòng thử lại sau.",
    deleteManyConfirm: "Bạn có thực sự muốn xóa tất cả các dòng đã nhập không?",
    confirmChangeDataMsg: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
    confirmDeleteManyMsg(entityName){
        return `Bạn có thực sự muốn xóa những ${entityName.toLowerCase()} đã chọn không?`
    },
    notSelectedDeleteMsg(entityName){
        return `Bạn chưa chọn ${entityName.toLowerCase()} để xóa`
    }, 
    deleteSuccessMsg(entityName){
        return `Đã xóa ${entityName.toLowerCase()} thành công`
    },
    manyNotSelectedMsg(entityName){
        return `Chưa chọn hàng loạt ${entityName.toLowerCase()} để xóa`
    },
    confirmDeleteMsg(vendorCode, entityName){
        return `Bạn có thực sự muốn xóa ${entityName.toLowerCase()} <${vendorCode}> không?`
    },
    deleteSuccessMany(vendorCount, entityName){
        return `Đã xóa thành công ${vendorCount} ${entityName.toLowerCase()}`
    }
}

const toastMsg = {
    updateSuccessMsg: "Sửa dữ liệu thành công",
    addSuccessMsg: "Thêm mới dữ liệu thành công",
    notSelectedMsg(entityName){
        return `Bạn chưa chọn ${entityName.toLowerCase()} để xóa`
    },
    manyNotSelectedMsg(entityName){
        return `Chưa chọn hàng loạt ${entityName.toLowerCase()} để xóa`
    },
    deleteSuccessMsg(entityName){
        return `Đã xóa ${entityName.toLowerCase()} thành công`
    },
    deleteSuccessMany(vendorCount, entityName){
        return `Đã xóa thành công ${vendorCount} ${entityName.toLowerCase()}`
    }
}

const errorMsg = {
    notEmptyCode(entityName){
        return `Mã ${entityName.toLowerCase()} không được để trống`
    },

    notEmptyFullname(entityName){
        return `Họ tên ${entityName.toLowerCase()} không được để trống`;
    }, 

    notEmptyDepartment(entityName){
        return `Phòng ban ${entityName.toLowerCase()} không được để trống`
    },
    formatEmail(entityName){
        return `Email ${entityName.toLowerCase()} sai định dạng`;
    }, 
    common: "Đã có lỗi xảy ra xin vui lòng liên hệ với MISA."
}

export default {
    popupMsg, toastMsg, errorMsg
}