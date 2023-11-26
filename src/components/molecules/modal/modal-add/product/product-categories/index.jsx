import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductCategories } from "../../../../../../redux/slice/product-categories/index";

const ModalAddData = ({ isOpenAdd, toggleOpenAdd, setTrigger }) => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    product_category_name: "",
    desc: "",
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isOpenAdd) {
      setFormValue({
        product_category_name: "",
        desc: "",
      });
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set("product_category_name", formValue?.product_category_name);
    formData.set("desc", formValue?.desc);
    await dispatch(addProductCategories({ formData, config })).then(() => {
      toggleOpenAdd();
      setTrigger(true);
    });
  };

  if (!isOpenAdd) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem]">
        <h2 className="text-2xl mb-4">Add Data</h2>
        <form onSubmit={handleAdd}>
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
              value={formValue?.product_category_name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter product category name"
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
              value={formValue?.desc}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter description"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenAdd}
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

export default ModalAddData;
