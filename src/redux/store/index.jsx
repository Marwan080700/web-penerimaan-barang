import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slice/product/index";
import authSlice from "../slice/auth/index";
import productCategoriesSlice from "../slice/product-categories/index";
import salesSlice from "../slice/sales/index";
import customerSlice from "../slice/costumer/index";
import salesDetailSlice from "../slice/sales-detail/index";
import invoiceSlice from "../slice/invoice/index";

export const store = configureStore({
  reducer: {
    productCategories: productCategoriesSlice,
    product: productSlice,
    user: authSlice,
    sales: salesSlice,
    customer: customerSlice,
    salesDetail: salesDetailSlice,
    invoice: invoiceSlice,
  },
});
