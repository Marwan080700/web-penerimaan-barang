import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSales } from "../../../../../../redux/slice/sales";
import {
  customerSelectors,
  getCustomer,
} from "../../../../../../redux/slice/costumer";
import _ from "lodash";
import { addSalesDetail } from "../../../../../../redux/slice/sales-detail";
import {
  getProducts,
  productSelectors,
} from "../../../../../../redux/slice/product";

const ModalAddDataSales = ({
  isOpenAddSales,
  toggleAddSales,
  selectedSales,
}) => {
  if (!isOpenAddSales) return null;

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

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formValue, setFormValue] = useState({
    delivery_order_number: "",
    customer_id: "",
    user_id: user?.data?.data?.user?.id,
    sale_date: "",
    sale_description: "",
    sale_status: "",
    total_amount: 0,
    // sales_id: selectedSales?.data?.id,
    // product_id: "",
    // qty: "",
    // price: "",
    // amount: "",
    // desc: "",
    // status: "",
  });
  console.log(formValue);

  const dispatch = useDispatch();
  const customers = useSelector(customerSelectors.selectAll);
  const products = useSelector(productSelectors.selectAll);
  const selectedProduct = useSelector((state) =>
    productSelectors.selectById(state, formValue?.product_id)
  );

  console.log(selectedProduct?.price);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
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

  const handleAdd = async (e) => {
    e.preventDefault();

    const salesConfig = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const salesFormData = new FormData();
    salesFormData.set(
      "delivery_order_number",
      formValue?.delivery_order_number
    );
    salesFormData.set("customer_id", formValue?.customer_id);
    salesFormData.set("user_id", user?.data?.data?.user?.id);
    salesFormData.set("sale_date", formValue?.sale_date);
    salesFormData.set("sale_description", formValue?.sale_description);
    salesFormData.set("sale_status", formValue?.sale_status);
    salesFormData.set("total_amount", formValue?.total_amount);

    await dispatch(addSales({ formData: salesFormData, config: salesConfig }));

    // Assuming sales creation was successful
    // if (salesResponse.payload) {
    //   const salesDetailConfig = {
    //     headers: {
    //       "Content-type": "multipart/form-data",
    //     },
    //   };

    //   const salesDetailFormData = new FormData();
    //   salesDetailFormData.set("sale_id", salesResponse?.payload?.id);
    //   salesDetailFormData.set("product_id", formValue?.product_id);
    //   salesDetailFormData.set("qty", formValue?.qty);
    //   salesDetailFormData.set("price", selectedProduct?.price);
    //   salesDetailFormData.set("amount", formValue?.qty * formValue?.price);
    //   salesDetailFormData.set("desc", formValue?.desc);
    //   salesDetailFormData.set("status", formValue?.status);

    //   await dispatch(
    //     addSalesDetail({
    //       formData: salesDetailFormData,
    //       config: salesDetailConfig,
    //     })
    //   );
    // }

    // Handle any necessary state updates or UI changes after adding data
    toggleAddSales();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleAddSales();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded shadow-md w-[50%] h-[65%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4">Add Data Sales</h2>
        <form onSubmit={handleAdd}>
          <div className="flex justify-center gap-5">
            <div className="border rounded px-2 py-5 relative w-full">
              {/* <h3 className="absolute top-[-0.7rem] bg-white px-2">Sales</h3> */}
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
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1"
                  required
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
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1"
                  required
                >
                  <option value="" hidden>
                    Select Customer
                  </option>
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
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1"
                  required
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
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1"
                  required
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
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1"
                  required
                >
                  <option value="" hidden>
                    Select Status
                  </option>
                  <option value="belum kirim">Belum Kirim</option>
                  <option value="kirim"> kirim</option>
                </select>
                {/* <input
              type="text"
              id="sale_status"
              name="sale_status"
              value={formValue?.sale_status}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            /> */}
              </div>
              <div className="">
                <label
                  htmlFor="total_amount"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Total Amount:
                </label>
                <input
                  type="number"
                  min={0}
                  id="total_amount"
                  name="total_amount"
                  placeholder="Total amount auto fill if has SalesDetail"
                  value={formValue?.total_amount === 0}
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1 bg-slate-300"
                  required
                  disabled
                />
              </div>
            </div>
            {/* <div className="border rounded px-2 py-5 relative w-[40%] h-[25rem]">
              <h3 className="absolute top-[-0.7rem] bg-white px-2">
                Sales Detail
              </h3>
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
                  value={formValue?.product_id}
                  onChange={handleChange}
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
            {/* </option> */}
            {/* ))} */}
            {/* </select> */}
            {/* </div>
              <div className="mb-4">
                <label
                  htmlFor="qty"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  min={0}
                  id="qty"
                  name="qty"
                  value={formValue?.qty}
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Price:
                </label>
                <input
                  type="number"
                  min={0}
                  id="price"
                  name="price"
                  disabled
                  value={selectedProduct?.price}
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1 bg-slate-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Amount:
                </label>
                <input
                  type="number"
                  min={0}
                  disabled
                  id="amount"
                  name="amount"
                  value={formValue?.qty * selectedProduct?.price}
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1 bg-slate-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="desc"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Description:
                </label>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  value={formValue?.desc}
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-semibold mb-1 text-xs"
                >
                  Status:
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={formValue?.status}
                  onChange={handleChange}
                  className="border rounded w-full py-1 px-1"
                  required
                />
              </div>
            </div>*/}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={toggleAddSales}
              className="bg-gray-300 text-gray-700 px-5 py-1 rounded text-xs uppercase"
            >
              Close
            </button>
            {formValue?.delivery_order_number === "" ||
            formValue?.customer_id === "" ||
            formValue?.user_id === "" ||
            formValue?.sale_date === "" ||
            formValue?.sale_description === "" ||
            formValue?.sale_status === "" ? (
              // formValue?.sales_id === "" ||
              // formValue?.product_id === "" ||
              // formValue?.qty === "" ||
              // formValue?.price === "" ||
              // formValue?.desc === "" ||
              // formValue?.status === ""
              <>
                <button
                  type="submit"
                  disabled
                  className="bg-slate-200 text-white px-5 py-2 rounded text-xs uppercase"
                >
                  Add
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-5 py-2 rounded text-xs uppercase"
                >
                  Add
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddDataSales;
