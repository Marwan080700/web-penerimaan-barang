import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  customerSelectors,
  getCustomer,
} from "../../../../../../redux/slice/costumer";

const ModalUpdateDataSales = ({
  toggleOpenUpdateSales,
  isOpenUpdateSales,
  selectedSales,
  handleUpdate,
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
    delivery_order_number: selectedSales?.delivery_order_number || 0,
    customer_id: selectedCustomer?.data?.id,
    user_id: user?.data?.data?.user?.id,
    sale_date: selectedSales?.sale_date || "",
    sale_description: selectedSales?.sale_description || "",
    sale_status: selectedSales?.sale_status || "",
    total_amount: selectedSales?.total_amount || 0,
  });
  const [enableSelected, setEnableSelected] = useState(true);

  console.log("this is dat sales ", formValue);

  const handleChangeSales = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomerRowClick = (row) => {
    setSelectedCustomer(row);
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

  const onSubmitUpdateSales = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("delivery_order_number", formValue?.delivery_order_number);
    formData.append("customer_id", selectedCustomer?.data?.id);
    formData.append("user_id", user?.data?.data?.user?.id);
    formData.append("sale_date", formValue?.sale_date);
    formData.append("sale_description", formValue?.sale_description);
    formData.append("sale_status", formValue?.sale_status);
    formData.append("total_amount", formValue?.total_amount);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    // Log selectedSales.id to confirm its value
    console.log("selectedSales.id:", selectedSales.id);

    handleUpdate(formData, selectedSales?.data?.id, config);
    toggleOpenUpdateSales();
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
        <h2 className="text-2xl mb-4">Update Data</h2>
        <form onSubmit={onSubmitUpdateSales}>
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
              onChange={handleChangeSales}
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
          </div>
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
              onChange={handleChangeSales}
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
              onChange={handleChangeSales}
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
              onChange={handleChangeSales}
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
              onChange={handleChangeSales}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenUpdateSales}
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

export default ModalUpdateDataSales;
