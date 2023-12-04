import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API } from "../../../config/index";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getProductCategories = createAsyncThunk(
  "productCategories/getProductCategories",
  async () => {
    const response = await API.get("/productcategories");
    return response.data.data;
  }
);

export const addProductCategories = createAsyncThunk(
  "productCategories/addProductCategories",
  async ({ formData, config }) => {
    try {
      const response = await API.post("/productcategories", formData, config);
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

export const updateProductCategories = createAsyncThunk(
  "productCategories/updateProductCategories",
  async ({ id, formData, config }) => {
    try {
      const response = await API.patch(
        `/productcategories/${id}`,
        formData,
        config
      );
      toast.success("Update product success", {
        position: "bottom-right",
        autoClose: 3000, // Set the duration for the toast to be visible
      });
      return response.data.data;
    } catch (error) {
      toast.error("Error updating data", {
        position: "top-right",
        autoClose: 5000,
      });
      throw error;
    }
  }
);
export const deleteProductCategories = createAsyncThunk(
  "productCategories/deleteProductCategories",
  async (id) => {
    await API.delete(`/productcategories/${id}`);
    toast.success("Delete successfully", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    return id;
  }
);

export const cancelProductCategories = createAsyncThunk(
  "productCategories/cancelProductCategories",
  async (id) => {
    await API.patch(`/productcategories/cancel/${id}`);
    toast.success("Delete successfully", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    return id;
  }
);

const productCategoriesEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: productCategoriesEntity.getInitialState(),
  extraReducers: {
    [getProductCategories.fulfilled]: (state, action) => {
      productCategoriesEntity.setAll(state, action.payload);
    },
    [addProductCategories.fulfilled]: (state, action) => {
      productCategoriesEntity.addOne(state, action.payload);
    },
    [deleteProductCategories.fulfilled]: (state, action) => {
      productCategoriesEntity.removeOne(state, action.payload);
    },
    [updateProductCategories.fulfilled]: (state, action) => {
      productCategoriesEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [cancelProductCategories.fulfilled]: (state, action) => {
      productCategoriesEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const productCategoriesSelectors = productCategoriesEntity.getSelectors(
  (state) => state.productCategories
);
export default productCategoriesSlice.reducer;
