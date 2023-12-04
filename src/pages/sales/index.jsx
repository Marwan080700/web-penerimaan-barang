import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelSales,
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
  updateSalesDetail,
} from "../../redux/slice/sales-detail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
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

  const columnSalesDetail = [
    {
      name: "qty",
      header: "Quantity",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "price",
      header: "Price",
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: "amount",
      header: "Amount",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "desc",
      header: "Desc",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "status",
      header: "Status",
      maxWidth: 1000,
      defaultFlex: 1,
    },
  ];

  const dispatch = useDispatch();
  const sales = useSelector(salesSelectors.selectAll);
  const [selectedSales, setSelectedSales] = useState(null);

  const [filteredSales, setFilteredSales] = useState([]);

  let filterSales = _.filter(filteredSales, ["status", 0]);
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

  const handleDelete = async () => {
    if (selectedSales?.data?.id) {
      await dispatch(cancelSales(selectedSales?.data?.id)).then(() => {
        dispatch(getSales());
        setSelectedSales(null);
        dispatch(getSalesDetailBySales(selectedSales?.data?.id));
      });
    } else {
      console.error("No invoice selected for cancelation");
    }
  };

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

  const handleUpdateSalesDetail = async (formData, selectedSalesDetailId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    try {
      await dispatch(
        updateSalesDetail({ id: selectedSalesDetailId, formData, config })
      );
      console.log("Sales detail updated!");
      dispatch(getSalesDetailBySales(selectedSales?.data?.id));
    } catch (error) {
      console.error("Error updating sales:", error);
      // Handle the error if necessary
    }
  };

  const salesDetails = useSelector(salesDetailSelectors.selectAll);

  let dataSource;
  if (selectedSales === null) {
    dataSource = [];
  } else {
    dataSource = salesDetails;
  }

  useEffect(() => {
    if (selectedSales?.data?.id) {
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
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              className="border rounded w-10rem] h-[2rem] px-2"
              placeholder="Cari data..."
              value={searchText}
              onChange={onSearchChange}
            />
            <ModifySales
              setEnableSelected={setEnableSelected}
              setSelectedSales={setSelectedSales}
              handleUpdate={handleUpdate}
              handleUpdateSalesDetail={handleUpdateSalesDetail}
              selectedSales={selectedSales}
              salesDetails={salesDetails}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      <div className="relative hover:z-50">
        <ReactDataGrid
          idProperty="id"
          columns={columnSales}
          dataSource={filterSales ?? []}
          style={gridStyle}
          pagination
          onRowClick={handleSalesRowClick}
          enableSelection={enableSelected}
        />
      </div>

      {/* details */}
      <div className="items-center uppercase text-xs font-semibold mt-6">
        <h3 className="mb-4">Sales Details</h3>
        <ReactDataGrid
          columns={columnSalesDetail}
          style={gridStyle}
          dataSource={dataSource ?? []}
        />
      </div>
    </div>
  );
};
export default Sales;
