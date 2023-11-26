import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductCategories } from "../../../../../../redux/slice/product-categories/index";
import { addCustomer } from "../../../../../../redux/slice/costumer";

const ModalAddDataCustomer = ({ isOpenAddCustomer, toggleOpenAddCustomer }) => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    customer_identity: "",
    customer_name: "",
    customer_email: "",
    customer_handpone: "",
    customer_npwp: "",
    customer_address: "",
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set("customer_identity", formValue.customer_identity);
    formData.set("customer_name", formValue.customer_name);
    formData.set("customer_email", formValue.customer_email);
    formData.set("customer_handpone", formValue.customer_handpone);
    formData.set("customer_npwp", formValue.customer_npwp);
    formData.set("customer_address", formValue.customer_address);
    await dispatch(addCustomer({ formData, config })).then(() => {
      // Handle any necessary state updates or UI changes after adding data
      toggleOpenAddCustomer(); // Close the modal after successful addition
    });
  };

  if (!isOpenAddCustomer) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem]">
        <h2 className="text-2xl mb-4">Add Data</h2>
        <form onSubmit={handleAdd}>
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
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenAddCustomer}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddDataCustomer;
