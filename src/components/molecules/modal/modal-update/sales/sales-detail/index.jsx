import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productSelectors,
} from "../../../../../../redux/slice/product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalUpdateDataSalesDetail = ({
  isOpenUpdateSalesDetail,
  toggleOpenUpdateSalesDetail,
  handleUpdateSalesDetail,
  selectedSales,
  selectedSalesDetail,
  //   isOpenUpdateProduct,
  //   toggleOpenUpdateProduct,
  //   selectedCategory,
  //   selectedProduct,
  //   handleUpdate,
}) => {
  if (!isOpenUpdateSalesDetail) return null; // Don't render if not open or no category selected
  const dispatch = useDispatch();

  const [formValueSalesDetail, setFormValueSalesDetail] = useState({
    sale_id: selectedSales?.data?.id,
    // product_id: selectedProduct?.product_id || "",
    qty: selectedSalesDetail?.data?.qty,
    price: selectedSalesDetail?.data?.price || 0,
    amount: selectedSalesDetail?.data?.amount || 0,
    desc: selectedSalesDetail?.data?.desc || "",
  });

  const products = useSelector(productSelectors.selectAll);
  const selectedProduct = useSelector((state) =>
    productSelectors.selectById(state, formValueSalesDetail?.product_id)
  );

  const handleChangeSalesDetail = (e) => {
    setFormValueSalesDetail({
      ...formValueSalesDetail,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const onSubmitUpdateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("sale_id", selectedSales?.data?.id);
    formData.set("product_id", formValueSalesDetail?.product_id);
    formData.set("qty", formValueSalesDetail?.qty);
    formData.set("price", selectedProduct?.price);
    formData.set("amount", formValueSalesDetail?.qty * selectedProduct?.price);
    formData.set("desc", formValueSalesDetail?.desc);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    handleUpdateSalesDetail(formData, selectedSalesDetail?.data?.id); // Ensure to pass the correct data to handleUpdate

    toast.success("Update data success", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    toggleOpenUpdateSalesDetail();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem]">
        <h2 className="text-2xl mb-4">Update Data</h2>
        <form onSubmit={onSubmitUpdateProduct}>
          <div className="mb-4">
            <label
              htmlFor="product_id"
              className="block text-sm font-semibold mb-1 text-xs"
            >
              Product:
            </label>
            <select
              id="product_id"
              name="product_id"
              value={formValueSalesDetail?.product_id}
              onChange={handleChangeSalesDetail}
              className="border rounded w-full py-1 px-1"
              required
            >
              <option value="" hidden>
                Select Product
              </option>
              {products.map((products) => (
                <option
                  key={products.id}
                  value={products?.id}
                  className="text-xs"
                >
                  {products?.product_name}
                  {/* Replace 'name' with the actual property name in your 'customer' object */}
                </option>
              ))}
            </select>
          </div>
          <input
            type="hidden"
            name="product_category_id"
          // value={selectedCategory?.id}
          />
          <div className="mb-4">
            <label htmlFor="qty" className="block text-sm font-semibold mb-2">
              Quantity:
            </label>
            <input
              type="number"
              id="qty"
              name="qty"
              value={formValueSalesDetail?.qty}
              onChange={handleChangeSalesDetail}
              className="border rounded w-full py-2 px-3"
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
              disabled
              value={selectedProduct?.price}
              onChange={handleChangeSalesDetail}
              className="border rounded w-full py-2 px-3 bg-slate-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-semibold mb-2"
            >
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              disabled
              value={formValueSalesDetail?.qty * selectedProduct?.price}
              onChange={handleChangeSalesDetail}
              className="border rounded w-full py-2 px-3 bg-slate-300"
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
              value={formValueSalesDetail?.desc}
              onChange={handleChangeSalesDetail}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenUpdateSalesDetail}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            {formValueSalesDetail?.product_id === "" ||
              formValueSalesDetail?.sales_id === "" ||
              formValueSalesDetail?.qty === "" ||
              // formValueSalesDetail?.price === "" ||
              // formValueSalesDetail?.amount === "" ||
              formValueSalesDetail?.desc === "" ? (
              <>
                <button
                  type="submit"
                  disabled
                  className="bg-slate-200 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateDataSalesDetail;
