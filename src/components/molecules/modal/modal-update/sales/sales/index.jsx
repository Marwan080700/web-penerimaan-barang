import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  customerSelectors,
  getCustomer,
} from "../../../../../../redux/slice/costumer";
import {
  getProducts,
  productSelectors,
} from "../../../../../../redux/slice/product";

const ModalUpdateDataSales = ({
  toggleOpenUpdateSales,
  isOpenUpdateSales,
  selectedSales,
  setSelectedSales,
  setEnableSelected,
  salesDetails,
  handleUpdate,
  handleUpdateSalesDetail,
}) => {
  if (!isOpenUpdateSales) return null; // Don't render if not open or no category selected

  const [user, setUser] = useState(getUser());
  function getUser() {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  }

  const dispatch = useDispatch();
  const customers = useSelector(customerSelectors.selectAll);
  const products = useSelector(productSelectors.selectAll);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formValue, setFormValue] = useState({
    delivery_order_number: selectedSales?.data?.delivery_order_number || 0,
    customer_id: selectedSales?.data?.customer_id || 0,
    user_id: user?.data?.data?.user?.id,
    sale_date: selectedSales?.data?.sale_date || "",
    sale_description: selectedSales?.data?.sale_description || "",
    sale_status: selectedSales?.data?.sale_status || "",
    total_amount: selectedSales?.data?.total_amount || 0,
    sales_id: selectedSales?.data?.id,
    product_id: salesDetails[0]?.product_id || "",
    qty: salesDetails[0]?.qty || "",
    price: salesDetails[0]?.price || "",
    amount: salesDetails[0]?.amount || "",
    desc: salesDetails[0]?.desc || "",
    status: salesDetails[0]?.status || "",
  });

  const handleChangeSales = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleOpenUpdateSales();
    }
  };

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const onSubmitUpdate = async (e) => {
    e.preventDefault();

    const salesFormData = new FormData();
    salesFormData.append(
      "delivery_order_number",
      formValue?.delivery_order_number
    );
    salesFormData.append("customer_id", formValue.customer_id);
    salesFormData.append("user_id", user?.data?.data?.user?.id);
    salesFormData.append("sale_date", formValue?.sale_date);
    salesFormData.append("sale_description", formValue?.sale_description);
    salesFormData.append("sale_status", formValue?.sale_status);
    salesFormData.append("total_amount", formValue?.total_amount);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };


    // Assuming handleUpdate and handleUpdateSalesDetail are functions that handle the updates on the server side
    handleUpdate(salesFormData, selectedSales?.data?.id, config);

    toggleOpenUpdateSales();
    setSelectedSales(null);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded shadow-md w-fit h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4">Update Data Sales</h2>
        <form onSubmit={onSubmitUpdate} className="w-[30rem]">
            <div className="border rounded px-2 py-5 relative w-[1--%]">
              <h3 className="absolute top-[-0.7rem] bg-white px-2">Sales</h3>
              <div>
                <label
                  htmlFor="delivery_order_number"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Delivery Order Number:
                </label>
                <input
                  type="number"
                  min={0}
                  id="delivery_order_number"
                  name="delivery_order_number"
                  value={formValue?.delivery_order_number}
                  onChange={handleChangeSales}
                  className="border rounded w-full py-1 px-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="customer_id"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Customer:
                </label>
                <select
                  id="customer_id"
                  name="customer_id"
                  value={formValue?.customer_id}
                  onChange={handleChangeSales}
                  className="border rounded w-full py-1 px-1"
                >
                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer?.id}
                      className="text-xs"
                    >
                      {customer?.customer_name}
                      {/* Replace 'name' with the actual property name in your 'customer' object */}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="sale_date"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Sale Date:
                </label>
                <input
                  type="date"
                  id="sale_date"
                  name="sale_date"
                  value={formValue?.sale_date}
                  onChange={handleChangeSales}
                  className="border rounded w-full py-1 px-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="sale_description"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Sale Description:
                </label>
                <input
                  type="text"
                  id="sale_description"
                  name="sale_description"
                  value={formValue?.sale_description}
                  onChange={handleChangeSales}
                  className="border rounded w-full py-1 px-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="sale_status"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Sale Status:
                </label>
                <select
                  id="sale_status"
                  name="sale_status"
                  value={formValue?.sale_status}
                  onChange={handleChangeSales}
                  className="border rounded w-full py-1 px-1"
                >
                  <option hidden>Select Option</option>
                  <option value="belum kirim">Belum Kirim</option>
                  <option value="kirim"> kirim</option>
                </select>
                {/* <input
              type="text"
              id="sale_status"
              name="sale_status"
              value={formValue?.sale_status}
              onChange={handleChangeSales}
              className="border rounded w-full py-2 px-3"
            /> */}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="total_amount"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Total Amount:
                </label>
                <input
                  type="number"
                  min={0}
                  disabled
                  id="total_amount"
                  name="total_amount"
                  value={formValue?.total_amount}
                  onChange={handleChangeSales}
                  className="border rounded w-full py-1 px-1 bg-slate-300"
                />
              </div>
            </div>

          <div className="flex justify-end gap-2 mt-5">
            <button
              type="button"
              onClick={toggleOpenUpdateSales}
              className="bg-gray-300 text-gray-700 px-5 py-1 rounded text-xs uppercase"
            >
              Close
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white px-5 py-2 rounded text-xs uppercase"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateDataSales;
