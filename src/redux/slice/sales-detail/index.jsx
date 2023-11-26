import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API } from "../../../config/index";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getSalesDetails = createAsyncThunk(
  "salesDetail/getSalesDetail",
  async () => {
    const response = await API.get("/sales-details");
    return response.data.data;
  }
);

export const getSalesDetailBySales = createAsyncThunk(
  "salesDetail/getSalesDetail",
  async (id) => {
    const response = await API.get(`/sales-detail-by-sales/${id}`);
    return response.data.data;
  }
);

export const addSalesDetail = createAsyncThunk(
  "salesDetail/addSalesDetail",
  async ({ formData, config }) => {
    try {
      const response = await API.post("/sales-detail", formData, config);
      toast.success("Add data success", {
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

export const updateSalesDetail = createAsyncThunk(
  "salesDetail/updateSalesDetail",
  async ({ id, formData, config }) => {
    console.log("iniiniin", { id, formData, config });
    try {
      const response = await API.patch(`/sales-detail/${id}`, formData, config);
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

export const deleteSalesDetail = createAsyncThunk(
  "salesDetail/deleteSalesDetail",
  async (id) => {
    await API.delete(`/sales-detail/${id}`);
    toast.success("Delete successfully", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    return id;
  }
);

const salesDetailEntity = createEntityAdapter({
  selectId: (salesDetail) => salesDetail.id,
});

const salesDetailSlice = createSlice({
  name: "salesDetail",
  initialState: salesDetailEntity.getInitialState(),
  extraReducers: {
    [getSalesDetails.fulfilled]: (state, action) => {
      salesDetailEntity.setAll(state, action.payload);
    },
    [getSalesDetailBySales.fulfilled]: (state, action) => {
      salesDetailEntity.setAll(state, action.payload);
    },
    [addSalesDetail.fulfilled]: (state, action) => {
      salesDetailEntity.addOne(state, action.payload);
    },
    [deleteSalesDetail.fulfilled]: (state, action) => {
      salesDetailEntity.removeOne(state, action.payload);
    },
    [updateSalesDetail.fulfilled]: (state, action) => {
      salesDetailEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const salesDetailSelectors = salesDetailEntity.getSelectors(
  (state) => state.salesDetail
);
export default salesDetailSlice.reducer;
