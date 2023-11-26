import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalUpdateDataCustomer = ({
  isOpenUpdateCustomer,
  toggleOpenUpdateCustomer,
  selectedCustomer,
  handleUpdate,
}) => {
  if (!isOpenUpdateCustomer) return null; // Don't render if not open or no category selected
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    customer_identity: selectedCustomer?.customer_identity || "",
    customer_name: selectedCustomer?.customer_name || "",
    customer_email: selectedCustomer?.customer_email || "",
    customer_handpone: selectedCustomer?.customer_handpone || "",
    customer_npwp: selectedCustomer?.customer_npwp || "",
    customer_address: selectedCustomer?.customer_address || "",
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
    formData.set("customer_identity", formValue.customer_identity);
    formData.set("customer_name", formValue.customer_name);
    formData.set("customer_email", formValue.customer_email);
    formData.set("customer_handpone", formValue.customer_handpone);
    formData.set("customer_npwp", formValue.customer_npwp);
    formData.set("customer_address", formValue.customer_address);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    handleUpdate(formData, selectedCustomer?.id); // Send data to handleUpdate
    toggleOpenUpdateCustomer();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem]">
        <h2 className="text-2xl mb-4">Update Data</h2>
        <form onSubmit={onSubmitUpdate}>
          <div className="mb-4">
            <label
              htmlFor="customer_identity"
              className="block text-sm font-semibold mb-2"
            >
              Customer Identity:
            </label>
            <input
              type="text"
              id="customer_identity"
              name="customer_identity"
              value={formValue.customer_identity}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedCustomer.customer_identity}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="customer_name"
              className="block text-sm font-semibold mb-2"
            >
              Customer Name:
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formValue.customer_name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedCustomer.customer_name}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="customer_email"
              className="block text-sm font-semibold mb-2"
            >
              Customer Email:
            </label>
            <input
              type="text"
              id="customer_email"
              name="customer_email"
              value={formValue.customer_email}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedCustomer.customer_email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="customer_handpone"
              className="block text-sm font-semibold mb-2"
            >
              Customer Handpone:
            </label>
            <input
              type="number"
              min={0}
              id="customer_handpone"
              name="customer_handpone"
              value={formValue.customer_handpone}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedCustomer.customer_handpone}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="customer_npwp"
              className="block text-sm font-semibold mb-2"
            >
              Customer Npwp:
            </label>
            <input
              type="number"
              min={0}
              id="customer_npwp"
              name="customer_npwp"
              value={formValue.customer_npwp}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedCustomer.customer_npwp}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="customer_address"
              className="block text-sm font-semibold mb-2"
            >
              Customer Address:
            </label>
            <input
              type="text"
              id="customer_address"
              name="customer_address"
              value={formValue.customer_address}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedCustomer.customer_address}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenUpdateCustomer}
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

export default ModalUpdateDataCustomer;
