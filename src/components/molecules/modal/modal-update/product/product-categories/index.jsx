import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalUpdateData = ({
  isOpenUpdate,
  toggleOpenUpdate,
  selectedCategory,
  selectedProduct,
  handleUpdate,
}) => {
  if (!isOpenUpdate) return null; // Don't render if not open or no category selected
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    product_category_name: selectedCategory?.product_category_name || "",
    desc: selectedCategory?.desc || "",
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
    formData.set("product_category_name", formValue.product_category_name);
    formData.set("desc", formValue.desc);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    handleUpdate(formData, selectedCategory?.id); // Send data to handleUpdate
    toggleOpenUpdate();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem]">
        <h2 className="text-2xl mb-4">Update Data</h2>
        <form onSubmit={onSubmitUpdate}>
          <div className="mb-4">
            <label
              htmlFor="productCategoryInput"
              className="block text-sm font-semibold mb-2"
            >
              Product Category Name:
            </label>
            <input
              type="text"
              id="productCategoryInput"
              name="product_category_name"
              value={formValue.product_category_name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedCategory.product_category_name}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descInput"
              className="block text-sm font-semibold mb-2"
            >
              Description:
            </label>
            <input
              type="text"
              id="descInput"
              name="desc"
              value={formValue.desc}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedCategory.desc}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenUpdate}
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

export default ModalUpdateData;
