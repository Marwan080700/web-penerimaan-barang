import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalUpdateDataInvoices = ({
  toggleOpenUpdateInvoices,
  isOpenUpdateInvoices,
  selectedInvoices,
  handleUpdate,
}) => {
  if (!isOpenUpdateInvoices) return null; // Don't render if not open or no category selected
  const dispatch = useDispatch();

  const [user, setUser] = useState(getUser());
  console.log(user?.data?.data?.user);
  function getUser() {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  }

  useEffect(() => {
    setUser(getUser());
  }, []);

  const [formValueInvoices, setFormValueInvoices] = useState({
    invoice_number: selectedInvoices?.invoice_number || "",
    invoice_date: selectedInvoices?.invoice_date || "",
    due_date: selectedInvoices?.due_date || "",
    sub_total: selectedInvoices?.sub_total || 0,
    discount: selectedInvoices?.discount || "",
    total_amount: selectedInvoices?.total_amount || 0,
    no_faktur_pajak: selectedInvoices?.no_faktur_pajak || "",
    no_faktur_pajak_pengganti:
      selectedInvoices?.no_faktur_pajak_pengganti || "",
    // invoice_description: selectedInvoices?.invoice_description || "",
    approve_1: selectedInvoices?.approve_1 || "",
    approve_1_date: selectedInvoices?.approve_1_date || "",
    approve_1_desc: selectedInvoices?.approve_1_desc || "",
    approve_2: selectedInvoices?.approve_2 || "",
    approve_2_date: selectedInvoices?.approve_2_date || "",
    approve_2_desc: selectedInvoices?.approve_2_desc || "",
  });
  const [isTotalAmountDisabled, setIsTotalAmountDisabled] = useState(true);

  console.log("this is dat product ", formValueInvoices);

  const handleChangeInvoices = (e) => {
    setFormValueInvoices({
      ...formValueInvoices,
      [e.target.name]: e.target.value,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleOpenUpdateInvoices();
    }
  };

  const onSubmitUpdateInvoices = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("invoice_number", formValueInvoices?.invoice_number);
    formData.set("invoice_date", formValueInvoices?.invoice_date);
    formData.set("due_date", formValueInvoices?.due_date);
    formData.set("sub_total", formValueInvoices?.sub_total);
    formData.set("discount", formValueInvoices?.discount);
    formData.set("total_amount", formValueInvoices?.total_amount);
    formData.set("no_faktur_pajak", formValueInvoices?.no_faktur_pajak);
    formData.set(
      "no_faktur_pajak_pengganti",
      formValueInvoices?.no_faktur_pajak_pengganti
    );
    // formData.set("invoice_description", formValueInvoices?.invoice_description);
    formData.set("approve_1", formValueInvoices?.approve_1);
    formData.set("approve_1_date", formValueInvoices?.approve_1_date);
    formData.set("approve_1_desc", formValueInvoices?.approve_1_desc);
    formData.set("approve_2", formValueInvoices?.approve_2);
    formData.set("approve_2_date", formValueInvoices?.approve_2_date);
    formData.set("approve_2_desc", formValueInvoices?.approve_2_desc);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    handleUpdate(formData, selectedInvoices?.id); // Ensure to pass the correct data to handleUpdate
    toggleOpenUpdateInvoices();
  };

  useEffect(() => {
    // Calculate total_amount when discount or sub_total changes
    const calculateTotalAmount = () => {
      const subTotal = parseFloat(formValueInvoices?.sub_total) || 0;
      const discount = parseFloat(formValueInvoices?.discount) || 0;
      const ppnRate = 0.11; // 11% ppn
      const ppn = subTotal * ppnRate;
      const totalAmount = subTotal - (discount + ppn);
      setFormValueInvoices({
        ...formValueInvoices,
        total_amount: parseFloat(totalAmount.toFixed(2)).toString(), // adjust as needed
      });
    };

    calculateTotalAmount();
  }, [formValueInvoices.sub_total, formValueInvoices.discount]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded shadow-md w-[30rem] h-[35rem] overflow-y-auto">
        <h2 className="text-2xl mb-4">Update Data Invoice</h2>
        <form onSubmit={onSubmitUpdateInvoices}>
          <div className="mb-4">
            <label
              htmlFor="invoice_number"
              className="block text-sm font-semibold mb-2"
            >
              invoice_number:
            </label>
            <input
              type="text"
              id="invoice_number"
              name="invoice_number"
              value={formValueInvoices?.invoice_number}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="invoice_date"
              className="block text-sm font-semibold mb-2"
            >
              invoice_date:
            </label>
            <input
              type="date"
              id="invoice_date"
              name="invoice_date"
              value={formValueInvoices?.invoice_date}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="due_date"
              className="block text-sm font-semibold mb-2"
            >
              due_date:
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formValueInvoices?.due_date}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="sub_total"
              className="block text-sm font-semibold mb-2"
            >
              sub_total:
            </label>
            <input
              type="number"
              id="sub_total"
              name="sub_total"
              value={formValueInvoices?.sub_total}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="block text-sm font-semibold mb-2"
            >
              discount:
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formValueInvoices?.discount}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Ppn_11"
              className="block text-sm font-semibold mb-2"
            >
              Ppn_11:
            </label>
            <input
              disabled
              type="text"
              id="Ppn_11"
              name="Ppn_11"
              //   value={formValueInvoices?.discount}
              placeholder="11%"
              //   onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="total_amount"
              className="block text-sm font-semibold mb-2"
            >
              total_amount:
            </label>
            <input
              type="text"
              id="total_amount"
              name="total_amount"
              value={formValueInvoices?.total_amount}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
              disabled={isTotalAmountDisabled}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="no_faktur_pajak"
              className="block text-sm font-semibold mb-2"
            >
              no_faktur_pajak:
            </label>
            <input
              type="text"
              id="no_faktur_pajak"
              name="no_faktur_pajak"
              value={formValueInvoices?.no_faktur_pajak}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="no_faktur_pajak_pengganti"
              className="block text-sm font-semibold mb-2"
            >
              no_faktur_pajak_pengganti:
            </label>
            <input
              type="text"
              id="no_faktur_pajak_pengganti"
              name="no_faktur_pajak_pengganti"
              value={formValueInvoices?.no_faktur_pajak_pengganti}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="invoice_description"
              className="block text-sm font-semibold mb-2"
            >
              invoice_description:
            </label>
            <input
              type="text"
              id="invoice_description"
              name="invoice_description"
              value={formValueInvoices?.invoice_description}
              onChange={handleChangeInvoices}
              className="border rounded w-full py-2 px-3"
            />
          </div> */}
          {/* select */}
          {user?.data?.data?.user?.role === "kabag" ||
          user?.data?.data?.user?.role === "superadmin" ? (
            <>
              <div className="mb-4">
                <label
                  htmlFor="approve_1"
                  className="block text-sm font-semibold mb-2"
                >
                  approve_1:
                </label>
                <select
                  id="approve_1"
                  name="approve_1"
                  value={formValueInvoices?.approve_1}
                  onChange={handleChangeInvoices}
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="" hidden>
                    Select Approval
                  </option>
                  <option value="ok">Ok</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="approve_1_date"
                  className="block text-sm font-semibold mb-2"
                >
                  approve_1_date:
                </label>
                <input
                  type="date"
                  id="approve_1_date"
                  name="approve_1_date"
                  value={formValueInvoices?.approve_1_date}
                  onChange={handleChangeInvoices}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="approve_1_desc"
                  className="block text-sm font-semibold mb-2"
                >
                  approve_1_desc:
                </label>
                <input
                  type="text"
                  id="approve_1_desc"
                  name="approve_1_desc"
                  value={formValueInvoices?.approve_1_desc}
                  onChange={handleChangeInvoices}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
            </>
          ) : undefined}
          {/* seelect */}
          {user?.data?.data?.user?.role === "manager" ||
          user?.data?.data?.user?.role === "superadmin" ? (
            <>
              <div className="mb-4">
                <label
                  htmlFor="approve_2"
                  className="block text-sm font-semibold mb-2"
                >
                  approve_2:
                </label>
                <select
                  id="approve_2"
                  name="approve_2"
                  value={formValueInvoices?.approve_2}
                  onChange={handleChangeInvoices}
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="" hidden>
                    Select Approval
                  </option>
                  <option value="ok">Ok</option>
                  <option value="reject">Reject</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="approve_2_date"
                  className="block text-sm font-semibold mb-2"
                >
                  approve_2_date:
                </label>
                <input
                  type="date"
                  id="approve_2_date"
                  name="approve_2_date"
                  value={formValueInvoices?.approve_2_date}
                  onChange={handleChangeInvoices}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="approve_2_desc"
                  className="block text-sm font-semibold mb-2"
                >
                  approve_2_desc:
                </label>
                <input
                  type="text"
                  id="approve_2_desc"
                  name="approve_2_desc"
                  value={formValueInvoices?.approve_2_desc}
                  onChange={handleChangeInvoices}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
            </>
          ) : undefined}
          <div className="flex justify-start">
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
