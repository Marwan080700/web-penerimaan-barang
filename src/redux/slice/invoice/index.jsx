import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API } from "../../../config/index";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getInvoices = createAsyncThunk("invoice/getInvoices", async () => {
  const response = await API.get("/invoices");
  return response.data.data;
});



export const printInvoice = createAsyncThunk(
  "invoice/printInvoice",
  async (id) => {
    const response = await API.get(`/print/${id}`);
    return response.data.data;
  }
);

export const addInvoices = createAsyncThunk(
  "invoice/addInvoice",
  async ({ formData, config }) => {
    console.log("aasad", formData)
    try {
      const response = await API.post("/invoice", formData, config);
      toast.success("Add data success", {
        position: "bottom-right",
        autoClose: 3000, // Set the duration for the toast to be visible
      });
      return response.data.data;
    } catch (error) {
      console.log("aasad", error)
      toast.error("Error adding data", {
        position: "bottom-right",
        autoClose: 5000,
      });
      throw error; // Make sure to re-throw the error so that it can be caught by the component
    }
  }
);

export const updateInvoices = createAsyncThunk(
  "invoice/updateInvoices",
  async ({ id, formData, config }) => {
    console.log("iniiniin", { id, formData, config });
    try {
      const response = await API.patch(`/invoice/${id}`, formData, config);
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

export const updateApprove1 = createAsyncThunk(
  "invoice/updateApprove1",
  async ({ id, formData, config }) => {
    console.log("iniiniin", { id, formData, config });
    try {
      const response = await API.patch(`/invoice/approve1/${id}`, formData, config);
      toast.success("Approve 1 success", {
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

export const updateApprove2 = createAsyncThunk(
  "invoice/updateApprove2",
  async ({ id, formData, config }) => {
    console.log("iniiniin", { id, formData, config });
    try {
      const response = await API.patch(`/invoice/approve2/${id}`, formData, config);
      toast.success("Approve 2 success", {
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

export const deleteInvoices = createAsyncThunk(
  "invoice/deleteInvoices",
  async (id) => {
    await API.delete(`/invoice/${id}`);
    toast.success("Delete successfully", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    return id;
  }
);

export const cancelInvoices = createAsyncThunk(
  "invoice/cancelInvoices",
  async (id) => {
    await API.patch(`/invoice/cancel/${id}`);
    toast.success("Delete successfully", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    return id;
  }
);

// export const cancelInvoices = createAsyncThunk(
//   "invoices/cancelInvoices",
//   async ({ id }) => {
//     console.log("iniiniin", { id, formData });
//     try {
//       const response = await API.patch(
//         `/invoice/cancel/${id}`,
//         formData,
//         config
//       );
//       toast.success("delete invoice success", {
//         position: "bottom-right",
//         autoClose: 3000, // Set the duration for the toast to be visible
//       });
//       return response?.data?.data;
//     } catch (error) {
//       toast.error("Error deleted data", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       throw error;
//     }
//   }
// );

const invoiceEntity = createEntityAdapter({
  selectId: (invoice) => invoice.id,
});

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: invoiceEntity.getInitialState(),
  extraReducers: {
    [getInvoices.fulfilled]: (state, action) => {
      invoiceEntity.setAll(state, action.payload);
    },
    [printInvoice.fulfilled]: (state, action) => {
      invoiceEntity.setAll(state, action.payload);
    },
    [addInvoices.fulfilled]: (state, action) => {
      invoiceEntity.addOne(state, action.payload);
    },
    [deleteInvoices.fulfilled]: (state, action) => {
      invoiceEntity.removeOne(state, action.payload);
    },
    [updateInvoices.fulfilled]: (state, action) => {
      invoiceEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [updateApprove1.fulfilled]: (state, action) => {
      invoiceEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [updateApprove2.fulfilled]: (state, action) => {
      invoiceEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [cancelInvoices.fulfilled]: (state, action) => {
      invoiceEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const invoiceSelectors = invoiceEntity.getSelectors(
  (state) => state.invoice
);
export default invoiceSlice.reducer;
