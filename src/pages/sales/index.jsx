import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSales,
  getSales,
  salesSelectors,
  updateSales,
} from "../../redux/slice/sales";
import { useEffect, useRef, useState } from "react";
import ModifySales from "../../components/atoms/button/modify/modify-sales";
import {
  getSalesDetailBySales,
  salesDetailSelectors,
} from "../../redux/slice/sales-detail";
// import ModifySales from "../../components/atoms/button/modify/modify-sales";

const Sales = () => {
  const gridStyle = { minHeight: 200 };
  const columnSales = [
    {
      name: "delivery_order_number",
      header: "Delivery Order Number",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "sale_date",
      header: "Sale Date",
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: "sale_description",
      header: "Sale Description",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "sale_status",
      header: "Sale Status",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "total_amount",
      header: "Total Amount",
      maxWidth: 1000,
      defaultFlex: 1,
    },
  ];

  const dispatch = useDispatch();
  const sales = useSelector(salesSelectors.selectAll);
  const [selectedSales, setSelectedSales] = useState(null);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchText, setSearchText] = useState("");
  const gridRef = useRef(null);
  const [enableSelected, setEnableSelected] = useState(true);

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current?.visibleColumns || [];

    setSearchText(value);

    const newDataSource = sales.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase();
        return acc || v.indexOf(value.toLowerCase()) !== -1;
      }, false);
    });

    // Update the local state with the filtered data
    dispatch(getSales(newDataSource));
  };

  const handleSalesRowClick = (row) => {
    setSelectedSales(row);
  };

  // const handleDelete = () => {
  //   dispatch(deleteSales(selectedSales?.data?.id))
  //     .then(() => {
  //       console.log("Deletion success"); // Set the flag after deletion
  //     })
  //     .catch((error) => {
  //       console.log("Deletion error:", error);
  //     });
  // };

  const handleUpdate = async (formData, selectedSalesId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    try {
      await dispatch(updateSales({ id: selectedSalesId, formData, config }));
      console.log("Sales updated!");
      dispatch(getSales());
    } catch (error) {
      console.error("Error updating sales:", error);
      // Handle the error if necessary
    }
  };

  const salesDetails = useSelector(salesDetailSelectors.selectAll);
  console.log("data sales detail", salesDetails);

  useEffect(() => {
    if (selectedSales) {
      dispatch(getSalesDetailBySales(selectedSales?.data?.id));
    }
  }, [dispatch, selectedSales]);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  useEffect(() => {
    const filteredSales = sales.filter((p) => {
      const values = Object.values(p).map((value) =>
        (value + "").toLowerCase()
      );
      return values.some((v) => v.includes(searchText.toLowerCase()));
    });
    setFilteredSales(filteredSales);
  }, [sales, searchText]);

  return (
    <div>
      <div className="border-b border-gray-200 mb-6 uppercase text-sm font-bold py-3">
        <h2>sales</h2>
      </div>
      {/* Product Categories Table */}
      <div className="mb-1">
        <div className="flex justify-between items-center uppercase text-xs font-semibold mb-2">
          <h3>Sales List</h3>
          <input
            type="text"
            className="border rounded py-2 px-1"
            placeholder="Cari data..."
            value={searchText}
            onChange={onSearchChange}
          />
        </div>
      </div>
      <div className="relative hover:z-50">
        <ReactDataGrid
          idProperty="id"
          columns={columnSales}
          dataSource={filteredSales ?? []}
          style={gridStyle}
          pagination
          onRowClick={handleSalesRowClick}
          enableSelection={enableSelected}
        />
      </div>
      <div className="flex items-center mt-5 mb-5 gap-4">
        <ModifySales
          handleUpdate={handleUpdate}
          selectedSales={selectedSales}
          // handleDelete={handleDelete}
        />
      </div>
      {salesDetails.length > 0 ? (
        <div className="border rounded w-fit px-2 py-1 shadow-lg">
          <p className="text-center mb-5">Sales Detail</p>
          <div className="">
            {salesDetails.map((detail, index) => (
              <div key={index} className="text-md">
                <div className="flex justify-between">
                  <label htmlFor="" className="me-2">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder={detail?.desc}
                    className="border rounded mb-2"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="" className="me-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    placeholder={detail?.qty}
                    className="border rounded mb-2"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="" className="me-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder={detail?.amount}
                    className="border rounded mb-2"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="" className="me-2">
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder={detail?.price}
                    className="border rounded mb-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">Details not found</div>
      )}
    </div>
  );
};
export default Sales;
