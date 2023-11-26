import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalUpdateDataProduct = ({
  isOpenUpdateProduct,
  toggleOpenUpdateProduct,
  selectedCategory,
  selectedProduct,
  handleUpdate,
}) => {
  if (!isOpenUpdateProduct) return null; // Don't render if not open or no category selected
  const dispatch = useDispatch();

  const [formValueProduct, setFormValueProduct] = useState({
    product_identity: selectedProduct?.product_identity || "",
    product_name: selectedProduct?.product_name || "",
    product_category_id: selectedCategory?.id,
    unit: selectedProduct?.unit || 0,
    price: selectedProduct?.price || 0,
    desc: selectedProduct?.desc || "",
  });

  console.log("this is dat product ", formValueProduct);

  const handleChangeProduct = (e) => {
    setFormValueProduct({
      ...formValueProduct,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitUpdateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("product_identity", formValueProduct?.product_identity);
    formData.set("product_category_id", selectedCategory?.id);
    formData.set("product_name", formValueProduct?.product_name);
    formData.set("unit", formValueProduct?.unit);
    formData.set("price", formValueProduct?.price);
    formData.set("desc", formValueProduct?.desc);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    handleUpdate(formData, selectedProduct?.id); // Ensure to pass the correct data to handleUpdate
    toggleOpenUpdateProduct();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem]">
        <h2 className="text-2xl mb-4">Update Data</h2>
        <form onSubmit={onSubmitUpdateProduct}>
          <div className="mb-4">
            <label
              htmlFor="product_identity"
              className="block text-sm font-semibold mb-2"
            >
              Product Identity:
            </label>
            <input
              type="text"
              id="product_identity"
              name="product_identity"
              value={formValueProduct?.product_identity}
              onChange={handleChangeProduct}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedProduct?.product_identity}
            />
          </div>
          <input
            type="hidden"
            name="product_category_id"
            value={selectedCategory?.data?.id}
          />
          <div className="mb-4">
            <label
              htmlFor="product_name"
              className="block text-sm font-semibold mb-2"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={formValueProduct?.product_name}
              onChange={handleChangeProduct}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedProduct?.product_name}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="unit" className="block text-sm font-semibold mb-2">
              Unit:
            </label>
            <input
              type="number"
              id="unit"
              name="unit"
              value={formValueProduct?.unit}
              onChange={handleChangeProduct}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedProduct?.unit}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-semibold mb-2">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formValueProduct?.price}
              onChange={handleChangeProduct}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedProduct?.price}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="desc" className="block text-sm font-semibold mb-2">
              Description:
            </label>
            <input
              type="text"
              id="desc"
              name="desc"
              value={formValueProduct?.desc}
              onChange={handleChangeProduct}
              className="border rounded w-full py-2 px-3"
              placeholder={selectedProduct?.desc}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenUpdateProduct}
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

export default ModalUpdateDataProduct;
