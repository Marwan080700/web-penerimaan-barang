import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API } from "../../../config/index";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  async () => {
    const response = await API.get("/customers");
    return response.data.data;
  }
);

// export const getProductsByCategory = createAsyncThunk(
//   "products/getProductsByCategory",
//   async (id) => {
//     const response = await API.get(`/products/category/${id}`);
//     return response.data.data;
//   }
// );

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async ({ formData, config }) => {
    try {
      const response = await API.post("/customer", formData, config);
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

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ id, formData, config }) => {
    console.log("iniiniin", { id, formData, config });
    try {
      const response = await API.patch(`/customer/${id}`, formData, config);
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

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id) => {
    await API.delete(`/customer/${id}`);
    toast.success("Delete successfully", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    return id;
  }
);

export const cancelCustomer = createAsyncThunk(
  "customer/cancelCustomer",
  async (id) => {
    await API.patch(`/customer/cancel/${id}`);
    toast.success("Delete successfully", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    return id;
  }
);

const customerEntity = createEntityAdapter({
  selectId: (customer) => customer.id,
});

const customerSlice = createSlice({
  name: "customer",
  initialState: customerEntity.getInitialState(),
  extraReducers: {
    [getCustomer.fulfilled]: (state, action) => {
      customerEntity.setAll(state, action.payload);
    },
    // [getProductsByCategory.fulfilled]: (state, action) => {
    //   customerEntity.setAll(state, action.payload);
    // },
    [addCustomer.fulfilled]: (state, action) => {
      customerEntity.addOne(state, action.payload);
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      customerEntity.removeOne(state, action.payload);
    },
    [updateCustomer.fulfilled]: (state, action) => {
      customerEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [cancelCustomer.fulfilled]: (state, action) => {
      customerEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const customerSelectors = customerEntity.getSelectors(
  (state) => state.customer
);
export default customerSlice.reducer;
