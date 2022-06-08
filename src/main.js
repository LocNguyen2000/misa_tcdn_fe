import { createApp } from 'vue'
import App from './App.vue'

import router from '@/js/router'
import { uiResource } from "@/js/resources/resourceUi"
import MISA_API from "@/js/resources/resourceAPI"
import MISA_ENUM from "@/js/resources/resourceEnum"
import resources from "@/js/resources/resourceMsg"
import mockData from "@/js/mock/mockData.js"


let app = createApp(App)

/**
* Mô tả : Cài đặt resource chung
* Created by: NHLOC - MF1099
* Created date: 19:54 27/04/2022
*/

// Đặt resource các tài nguyên ui
app.config.globalProperties.MISA_UI = uiResource

// Đặt resource cho API
app.config.globalProperties.MISA_API = MISA_API

// Đặt enum
app.config.globalProperties.MISA_ENUM = MISA_ENUM

// Đặt resource cho các thông báo message của popup, toast, lỗi
app.config.globalProperties.popupMsg = resources.popupMsg
app.config.globalProperties.toastMsg = resources.toastMsg
app.config.globalProperties.errorMsg = resources.errorMsg

app.config.globalProperties.mockData = mockData

/**
* Mô tả : Sử dụng router
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 15:26 05/05/2022
*/
app.use(router)

app.mount('#app')
