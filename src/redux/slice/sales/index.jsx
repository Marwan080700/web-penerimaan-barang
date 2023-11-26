import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API } from "../../../config/index";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getSales = createAsyncThunk("sales/getSales", async () => {
  const response = await API.get("/sales");
  return response.data.data;
});

// export const getProductsByCategory = createAsyncThunk(
//   "products/getProductsByCategory",
//   async (id) => {
//     const response = await API.get(`/products/category/${id}`);
//     return response.data.data;
//   }
// );

export const addSales = createAsyncThunk(
  "sales/addSales",
  async ({ formData, config }) => {
    try {
      const response = await API.post("/sale", formData, config);
      toast.success("Add product success", {
        position: "bottom-right",
        autoClose: 3000, // Set the duration for the toast to be visible
      });
      return response.data.data;
    } catch (error) {
      toast.error("Error adding data", {
        position: "bottom-right",
        autoClose: 5000,
      });
      throw error; // Make sure to re-throw the error so that it can be caught by the component
    }
  }
);

export const updateSales = createAsyncThunk(
  "sales/updateSales",
  async ({ id, formData, config }) => {
    console.log("iniiniin", { id, formData, config });
    try {
      const response = await API.patch(`/sale/${id}`, formData, config);
      toast.success("Update product success", {
        position: "bottom-right",
        autoClose: 3000, // Set the duration for the toast to be visible
      });
      return response?.data?.data;
    } catch (error) {
      toast.error("Error updating data", {
        position: "top-right",
        autoClose: 5000,
      });
      throw error;
    }
  }
);
export const deleteSales = createAsyncThunk("sales/deleteSales", async (id) => {
  await API.delete(`/sale/${id}`);
  toast.success("Delete successfully", {
    position: "bottom-right",
    autoClose: 3000, // Set the duration for the toast to be visible
  });
  return id;
});

const salesEntity = createEntityAdapter({
  selectId: (sales) => sales.id,
});

const salesSlice = createSlice({
  name: "sales",
  initialState: salesEntity.getInitialState(),
  extraReducers: {
    [getSales.fulfilled]: (state, action) => {
      salesEntity.setAll(state, action.payload);
    },
    // [getProductsByCategory.fulfilled]: (state, action) => {
    //   salesEntity.setAll(state, action.payload);
    // },
    [addSales.fulfilled]: (state, action) => {
      salesEntity.addOne(state, action.payload);
    },
    [deleteSales.fulfilled]: (state, action) => {
      salesEntity.removeOne(state, action.payload);
    },
    [updateSales.fulfilled]: (state, action) => {
      salesEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const salesSelectors = salesEntity.getSelectors((state) => state.sales);
export default salesSlice.reducer;
