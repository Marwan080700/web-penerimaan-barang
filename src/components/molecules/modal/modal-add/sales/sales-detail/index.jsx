import React, { useEffect, useState } from "react";
import salesDetail, {
  addSalesDetail,
  getSalesDetailBySales,
  salesDetailSelectors,
} from "../../../../../../redux/slice/sales-detail";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productSelectors,
} from "../../../../../../redux/slice/product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateSales } from "../../../../../../redux/slice/sales";

const ModalAddDataSalesDetail = ({
  selectedSales,
  isOpenAddSalesDetail,
  toggleOpenAddSalesDetail,
  handleUpdate,
  //   isOpenAdd,
  //   toggleOpenAddProduct,
  //   selectedCategory,
}) => {
  const dispatch = useDispatch();

  const [formValueSalesDetail, setFormValueSalesDetail] = useState({
    sale_id: selectedSales?.data?.id,
    product_id: "",
    qty: "",
    price: "",
    amount: "",
    desc: "",
    // status: "",
  });

  const [forSales, setForSales] = useState(null)

  // console.log("forSales", forSales)

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

  const products = useSelector(productSelectors.selectAll);
  const selectedProduct = useSelector((state) =>
    productSelectors.selectById(state, formValueSalesDetail?.product_id)
  );
  const salesDetail = useSelector(salesDetailSelectors.selectAll);

  const handleChangeSalesDetail = (e) => {
    setFormValueSalesDetail({
      ...formValueSalesDetail,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    if (selectedSales?.data?.id) {
      dispatch(getSalesDetailBySales(selectedSales?.data?.id));
    }
  }, [dispatch, selectedSales]);

  const updatedTotalAmount = salesDetail.reduce(
    (total, detail) => total + detail.amount, 0
  );


  const handleAddSalesDetail = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set("sale_id", selectedSales?.data?.id);
    formData.set("product_id", formValueSalesDetail?.product_id);
    formData.set("qty", formValueSalesDetail?.qty);
    formData.set("price", selectedProduct?.price);
    formData.set("amount", formValueSalesDetail?.qty * selectedProduct?.price);
    formData.set("desc", formValueSalesDetail?.desc);


    await dispatch(addSalesDetail({ formData, config }));
    await dispatch(getSalesDetailBySales(selectedSales?.data?.id));

    const updatedTotalAmount = salesDetail.reduce(
      (total, detail) => total + detail.amount,
      0
    );

    setForSales(updatedTotalAmount);
  };

  const handleUpdateSales = async () => {

    // Create formData for updating sales total amount
    const salesTotalAmountFormData = new FormData();
    salesTotalAmountFormData.set("customer_id", selectedSales?.data?.customer_id);
    salesTotalAmountFormData.set("user_id", user?.data?.data?.user?.id);
    salesTotalAmountFormData.set("total_amount", forSales);

    const updateConfig = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    // Dispatch action to update the sales total amount
    handleUpdate(salesTotalAmountFormData, selectedSales?.data?.id, updateConfig);

    // Handle any necessary state updates or UI changes after adding data
    toast.success("Add data success", {
      position: "bottom-right",
      autoClose: 3000,
    });
    // Close the modal after a successful addition
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();

    // Call both functions when the button is clicked
    await handleAddSalesDetail(e);
    await handleUpdateSales();

    // Handle any additional logic or UI changes after adding and updating
    toast.success("Add data and update success", {
      position: "bottom-right",
      autoClose: 3000,
    });

    // Close the modal after a successful addition and update
    toggleOpenAddSalesDetail();
  };

  // useEffect(() => {
  //   if (salesDetail) {
  //     setForSales(updatedTotalAmount)
  //   }
  // }, [salesDetail])



  if (!isOpenAddSalesDetail) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem] h-fit">
        <h2 className="text-2xl mb-4">Add Data</h2>
        <form onSubmit={handleButtonClick}>
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
              onClick={toggleOpenAddSalesDetail}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            {formValueSalesDetail?.product_id === "" ||
              formValueSalesDetail?.sales_id === "" ||
              formValueSalesDetail?.qty === "" ||
              // formValueSalesDetail?.price === "" ||
              // formValueSalesDetail?.amount === "" ||
              formValueSalesDetail?.desc === ""
              ? (
                <>
                  <button
                    type="submit"
                    disabled
                    className="bg-slate-200 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
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

export default ModalAddDataSalesDetail;
