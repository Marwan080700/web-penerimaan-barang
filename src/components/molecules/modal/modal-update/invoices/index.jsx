import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales, salesSelectors } from "../../../../../redux/slice/sales";
import _ from "lodash"

const ModalUpdateDataInvoices = ({
  toggleOpenUpdateInvoices,
  isOpenUpdateInvoices,
  selectedInvoices,
  handleUpdate,
}) => {
  if (!isOpenUpdateInvoices) return null; // Don't render if not open or no category selected
  const dispatch = useDispatch();
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

  const [formValueInvoice, setFormValueInvoice] = useState({
    sale_id: selectedInvoices?.sale_id || 0,
    invoice_number: selectedInvoices?.invoice_number || "",
    invoice_date: selectedInvoices?.invoice_date || "",
    due_date: selectedInvoices?.due_date || "",
    sub_total: selectedInvoices?.sub_total || 0,
    discount: selectedInvoices?.discount || "",
    ppn_11: 0.11,
    total_amount: selectedInvoices?.total_amount || 0,
    no_faktur_pajak: selectedInvoices?.no_faktur_pajak || "",
    no_faktur_pajak_pengganti: selectedInvoices?.no_faktur_pajak_pengganti || "",
    invoice_description: selectedInvoices?.invoice_description || "",
  });


  const sales = useSelector(salesSelectors.selectAll);
  const filterSales = _.filter(sales, ["status", 0])
  const selectedSale = useSelector((state) => salesSelectors.selectById(state, formValueInvoice?.sale_id));

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    setUser(getSales());
  }, []);


  const handleChangeInvoice = (e) => {
    const { name, value } = e.target;

    // If the changed field is 'discount', update total_amount accordingly
    if (name === 'discount') {
      const discount = parseFloat(value) || 0;
      const ppnValue = (selectedSale?.total_amount - discount) * formValueInvoice.ppn_11;
      const totalAmount = selectedSale?.total_amount - discount + ppnValue;
      console.log(totalAmount)


      setFormValueInvoice((prevFormValue) => ({
        ...prevFormValue,
        [name]: value,
        total_amount: totalAmount >= 0 ? totalAmount : 0,  // Ensure totalAmount is not negative
      }));
    } else {
      setFormValueInvoice((prevFormValue) => ({
        ...prevFormValue,
        [name]: value,
      }));
    }
  };

  const calculateTotalAmount = () => {
    const discount = parseFloat(formValueInvoice?.discount) || 0;
    const ppnValue = (selectedSale?.total_amount - discount) * formValueInvoice?.ppn_11;
    const totalAmount = selectedSale?.total_amount - discount + ppnValue;

    // Round down totalAmount to the nearest integer
    const roundedTotalAmount = Math.floor(totalAmount);

    return roundedTotalAmount;
  };

  const onSubmitUpdateInvoices = (e) => {
    e.preventDefault();

    const totalAmount = calculateTotalAmount();

    const formData = new FormData();
    formData.set("sale_id", formValueInvoice?.sale_id);
    formData.set("invoice_number", formValueInvoice?.invoice_number);
    formData.set("invoice_date", formValueInvoice?.invoice_date);
    formData.set("due_date", formValueInvoice?.due_date);
    formData.set("sub_total", selectedSale?.total_amount);
    formData.set("discount", formValueInvoice?.discount);
    formData.set("ppn_11", formValueInvoice?.ppn_11);
    formData.set("total_amount", totalAmount);
    formData.set("no_faktur_pajak", formValueInvoice?.no_faktur_pajak);
    formData.set(
      "no_faktur_pajak_pengganti",
      formValueInvoice?.no_faktur_pajak_pengganti
    );
    formData.set("invoice_description", formValueInvoice?.invoice_description);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    handleUpdate(formData, selectedInvoices?.id); // Ensure to pass the correct data to handleUpdate
    toggleOpenUpdateInvoices();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[30rem]">
        <h2 className="text-2xl mb-4 py-[0.1rem]">Add Data Invoice</h2>
        <form onSubmit={onSubmitUpdateInvoices}>
          <div className="flex gap-4">
            <div>
              <div className="">
                <label
                  htmlFor="sale_id"
                  className="block text-sm font-semibold mb-2"
                >
                  Sales:
                </label>
                <select
                  id="sale_id"
                  name="sale_id"
                  value={formValueInvoice?.sale_id}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full py-1 px-1 mb-4 "
                  required
                >
                  <option value="" hidden>
                    select Sales
                  </option>
                  {filterSales.map((sale) => (
                    <option key={sale?.id} value={sale?.id} className="text-xs">
                      {sale?.delivery_order_number}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <label
                  htmlFor="invoice_number"
                  className="block text-sm font-semibold mb-2"
                >
                  Invoice Number:
                </label>
                <input
                  type="text"
                  id="invoice_number"
                  name="invoice_number"
                  value={formValueInvoice?.invoice_number}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
              <div className="">
                <label
                  htmlFor="invoice_date"
                  className="block text-sm font-semibold mb-2"
                >
                  Invoice Date:
                </label>
                <input
                  type="date"
                  id="invoice_date"
                  name="invoice_date"
                  value={formValueInvoice?.invoice_date}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
              <div className="">
                <label
                  htmlFor="due_date"
                  className="block text-sm font-semibold mb-2"
                >
                  Due Date:
                </label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={formValueInvoice?.due_date}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
              <div className="">
                <label
                  htmlFor="sub_total"
                  className="block text-sm font-semibold mb-2"
                >
                  Sub Total:
                </label>
                <input
                  type="number"
                  id="sub_total"
                  name="sub_total"
                  disabled
                  value={selectedSale?.total_amount}
                  onChange={handleChangeInvoice}
                  className="border bg-slate-300 rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
              <div className="">
                <label
                  htmlFor="discount"
                  className="block text-sm font-semibold mb-2"
                >
                  Discount:
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formValueInvoice?.discount}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
            </div>
            <div>
              <div className="">
                <label
                  htmlFor="ppn_11"
                  className="block text-sm font-semibold mb-2"
                >
                  PPN (11%):
                </label>
                <input
                  disabled
                  type="text"
                  id="ppn_11"
                  name="ppn_11"
                  value={`${formValueInvoice?.ppn_11 * 100}%`}
                  className="border rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
              <div className="">
                <label
                  htmlFor="total_amount"
                  className="block text-sm font-semibold mb-2"
                >
                  Total Amount:
                </label>
                <input
                  type="number"
                  id="total_amount"
                  name="total_amount"
                  disabled
                  value={calculateTotalAmount()}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full bg-slate-300 py-[0.1rem]"
                />
                <div className="text-xs mb-4 text-red-500">
                  <p>Total amount from SubTotal - discount + ppn</p>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="no_faktur_pajak"
                  className="block text-sm font-semibold mb-2"
                >
                  No Faktur Pajak:
                </label>
                <input
                  type="text"
                  id="no_faktur_pajak"
                  name="no_faktur_pajak"
                  value={formValueInvoice?.no_faktur_pajak}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
              <div className="">
                <label
                  htmlFor="no_faktur_pajak_pengganti"
                  className="block text-sm font-semibold mb-2"
                >
                  No Faktur Pajak Pengganti:
                </label>
                <input
                  type="text"
                  id="no_faktur_pajak_pengganti"
                  name="no_faktur_pajak_pengganti"
                  value={formValueInvoice?.no_faktur_pajak_pengganti}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
              <div className="">
                <label
                  htmlFor="invoice_description"
                  className="block text-sm font-semibold mb-2"
                >
                  Invoice Description:
                </label>
                <input
                  type="text"
                  id="invoice_description"
                  name="invoice_description"
                  value={formValueInvoice?.invoice_description}
                  onChange={handleChangeInvoice}
                  className="border rounded w-full mb-4 py-[0.1rem]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleOpenUpdateInvoices}
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

export default ModalUpdateDataInvoices;
