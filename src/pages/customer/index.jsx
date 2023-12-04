import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getSales, salesSelectors } from "../../redux/slice/sales";
import { useEffect, useRef, useState } from "react";
import ModifySales from "../../components/atoms/button/modify/modify-sales";
import {
  cancelCustomer,
  customerSelectors,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../../redux/slice/costumer";
import ModifyCustomer from "../../components/atoms/button/modify/modify-customer";
import _ from "lodash";

const Customer = () => {
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
  const customer = useSelector(customerSelectors.selectAll);
  const filteredData = _.filter(customer, ["status", 0]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [enableSelected, setEnableSelected] = useState(true);
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [searchText, setSearchText] = useState("");
  const gridRef = useRef(null);

  const handleCustomerRowClick = (row) => {
    setSelectedCustomer(row);
  };

  const handleDelete = () => {
    dispatch(cancelCustomer(selectedCustomer?.data?.id))
      .then(() => {
        setSelectedCustomer(null);
        dispatch(getCustomer());
      })
      .catch((error) => {
        console.log("Deletion error:", error);
      });
  };

  const handleUpdate = async (formData, selectedCustomerId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    await dispatch(
      updateCustomer({
        id: selectedCustomerId,
        formData,
        config,
      })
    ).then(() => {
      dispatch(getCustomer());
    });
  };

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current?.visibleColumns || [];

    setSearchText(value);

    const newDataSource = filteredData.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase();
        return acc || v.indexOf(value.toLowerCase()) !== -1;
      }, false);
    });

    // Update the local state with the filtered data
    dispatch(getCustomer(newDataSource));
  };

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  useEffect(() => {
    const filteredCustomer = filteredData.filter((p) => {
      const values = Object.values(p).map((value) =>
        (value + "").toLowerCase()
      );
      return values.some((v) => v.includes(searchText.toLowerCase()));
    });
    setFilteredCustomer(filteredCustomer);
  }, [filteredData, searchText]);

  return (
    <>
      <div>
        <div className="border-b border-gray-200 mb-6 uppercase text-sm font-bold py-3">
          <h2>Costumer</h2>
        </div>
        {/* Product Categories Table */}
        <div className="mb-1">
          <div className="flex justify-between items-center uppercase text-xs font-semibold mb-2">
            <h3>Customer List</h3>
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                className="border rounded w-10rem] h-[2rem] px-2"
                placeholder="Cari data..."
                value={searchText}
                onChange={onSearchChange}
              />
              <ModifyCustomer
                selectedCustomer={selectedCustomer?.data}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            </div>
          </div>
        </div>
        <div className="relative hover:z-50">
          <ReactDataGrid
            idProperty="id"
            columns={columnCustomer}
            dataSource={filteredData ?? []}
            style={gridStyle}
            pagination
            onRowClick={handleCustomerRowClick}
            ref={gridRef}
            enableSelection={enableSelected}
          />
        </div>
      </div>
    </>
  );
};
export default Customer;
