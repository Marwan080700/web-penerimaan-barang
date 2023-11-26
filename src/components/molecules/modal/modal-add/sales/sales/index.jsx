import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSales } from "../../../../../../redux/slice/sales";
import {
  customerSelectors,
  getCustomer,
} from "../../../../../../redux/slice/costumer";

const ModalAddDataSales = ({ isOpenAddSales, toggleAddSales }) => {
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

  const gridStyle = { minHeight: 200 };
  const columnCustomer = [
    {
      name: "customer_identity",
      header: "customer_identity",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "customer_name",
      header: "customer_name",
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: "customer_email",
      header: "customer_email",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "customer_handpone",
      header: "customer_handpone",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "customer_npwp",
      header: "customer_npwp",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "customer_address",
      header: "customer_address",
      maxWidth: 1000,
      defaultFlex: 1,
    },
  ];

  const dispatch = useDispatch();
  const customers = useSelector(customerSelectors.selectAll);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formValue, setFormValue] = useState({
    delivery_order_number: "",
    customer_id: selectedCustomer?.data?.id,
    user_id: user?.data?.data?.user?.id,
    sale_date: "",
    sale_description: "",
    sale_status: "",
    total_amount: "",
  });
  const [enableSelected, setEnableSelected] = useState(true);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomerRowClick = (row) => {
    setSelectedCustomer(row);
  };

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set("delivery_order_number", formValue.delivery_order_number);
    formData.set("customer_id", selectedCustomer?.data?.id);
    formData.set("user_id", user?.data?.data?.user?.id);
    formData.set("sale_date", formValue.sale_date);
    formData.set("sale_description", formValue.sale_description);
    formData.set("sale_status", formValue.sale_status);
    formData.set("total_amount", formValue.total_amount);
    await dispatch(addSales({ formData, config })).then(() => {
      // Handle any necessary state updates or UI changes after adding data
      toggleAddSales(); // Close the modal after successful addition
    });
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
        className="bg-white p-6 rounded shadow-md w-[30rem] h-[30rem] overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4">Add Data</h2>
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label
              htmlFor="delivery_order_number"
              className="block text-sm font-semibold mb-2"
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
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <ReactDataGrid
              idProperty="id"
              columns={columnCustomer}
              dataSource={customers ?? []}
              style={gridStyle}
              pagination
              enableSelection={enableSelected}
              onRowClick={handleCustomerRowClick}
            />
            {/* {selectedCustomer?.data?.id} */}
            {/* <label
              htmlFor="customer_id"
              className="block text-sm font-semibold mb-2"
            >
              Customer Id:
            </label>
            <input
              type="number"
              min={0}
              id="customer_id"
              name="customer_id"
              value={formValue?.customer_id}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            /> */}
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="user_id"
              className="block text-sm font-semibold mb-2"
            >
              User Id:
            </label>
            <input
              type="number"
              min={0}
              id="user_id"
              name="user_id"
              value={formValue?.user_id}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="sale_date"
              className="block text-sm font-semibold mb-2"
            >
              Sale Date:
            </label>
            <input
              type="date"
              id="sale_date"
              name="sale_date"
              value={formValue?.sale_date}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="sale_description"
              className="block text-sm font-semibold mb-2"
            >
              Sale Description:
            </label>
            <input
              type="text"
              id="sale_description"
              name="sale_description"
              value={formValue?.sale_description}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="sale_status"
              className="block text-sm font-semibold mb-2"
            >
              Sale Status:
            </label>
            <select
              id="sale_status"
              name="sale_status"
              value={formValue?.sale_status}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
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
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            /> */}
          </div>
          <div className="mb-4">
            <label
              htmlFor="total_amount"
              className="block text-sm font-semibold mb-2"
            >
              Total Amount:
            </label>
            <input
              type="number"
              min={0}
              id="total_amount"
              name="total_amount"
              value={formValue?.total_amount}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleAddSales}
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

export default ModalAddDataSales;
