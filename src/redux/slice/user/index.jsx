import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { API } from "../../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await API.get("/users");
  return response.data.data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, formData, config }) => {
    // console.log("iniiniin", { id, formData, config });
    try {
      const response = await API.patch(`/user/${id}`, formData, config);
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

const userEntity = createEntityAdapter({
  selectId: (user) => user.id,
});

const userSlice = createSlice({
  name: "user",
  initialState: userEntity.getInitialState(),
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      userEntity.setAll(state, action.payload);
    },
    [updateUser.fulfilled]: (state, action) => {
      userEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const userSelectors = userEntity.getSelectors((state) => state.user);
export default userSlice.reducer;
