import { createRouter, createWebHistory } from "vue-router";

// 1. Định nghĩa / import các router
import Cash from "@/view/cash/Cash.vue";
import CashList from "@/view/cash/CashList.vue";
import CashForm from "@/view/cash/CashForm.vue";
import CashProcess from "@/view/cash/CashProcess.vue";
import VendorList from "@/view/vendor/VendorList.vue";
import AccountList from "@/view/account/AccountList.vue";
import HelloWorld from "@/components/HelloWorld.vue";

// 2. Định nghĩa vị trí route đến component
const routes = [
    { path: "/", redirect: '/CA/CAProcess' },
    { path: "/test", component: HelloWorld },
    {
        path: "/CA", component: Cash,
        children: [
            {path: "",  redirect: '/CA/CAProcess' },
            {
                path: "CAProcess",
                component: CashProcess
            },
            {
                path: "ReceiptPaymentList",
                component: CashList,
            },
            {
                name: "CAPaymentDetail",
                path: "CAPaymentDetail",
                component: CashForm,
                props: true
            },

        ]
    },
    {
        path: "/DI", component: VendorList,
    },
    {
        path: "/DI/DIAccount", component: AccountList,
    },
    

];

// 3. Tạo các instance của router để truyền route
const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active-item",
    routes,
});

export default router;