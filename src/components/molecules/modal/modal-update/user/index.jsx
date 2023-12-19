import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalUpdateDataUser = ({
  toggleOpenUpdateUser,
  isOpenUpdateUser,
  selectedUser,
  handleUpdate,
}) => {
  if (!isOpenUpdateUser) return null;
  // const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    role: selectedUser?.data?.role || "",
    status: selectedUser?.data?.status || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("role", formValue?.role);
    formData.set("status", formValue?.status);
    formData.set("password", formValue?.password)

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    handleUpdate(formData, selectedUser?.data?.id); // Send data to handleUpdate
    toggleOpenUpdateUser();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem]">
        <h2 className="text-2xl mb-4">Update Data</h2>
        <form onSubmit={onSubmitUpdate}>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-semibold mb-1 text-xs"
            >
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={formValue?.role}
              onChange={handleChange}
              className="border rounded w-full py-1 px-1"
            >
              <option value="" hidden className="text-xs">
                select role
              </option>
              <option value="superadmin" className="text-xs">
                Superadmin
              </option>
              <option value="manager" className="text-xs">
                Manager
              </option>
              <option value="kabag" className="text-xs">
                Kabag
              </option>
              <option value="staff" className="text-xs">
                Staff
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-semibold mb-1 text-xs"
            >
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={formValue?.status}
              onChange={handleChange}
              className="border rounded w-full py-1 px-1"
            >
              <option value="inactive" className="text-xs">
                inactive
              </option>
              <option value="active" className="text-xs">
                active
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1 text-xs"
            >
              change Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValue?.password}
              onChange={handleChange}
              className="border rounded w-full py-1 px-1"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenUpdateUser}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateDataUser;
