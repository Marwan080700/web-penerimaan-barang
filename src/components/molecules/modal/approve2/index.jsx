import React, { useState } from "react";

const ModalApprove2 = ({
    toggleOpenApprove2,
    isOpenApprove2,
    selectedInvoices,
    handleApprove2,
}) => {
    if (!isOpenApprove2) return null;

    const [formValueInvoice, setFormValueInvoice] = useState({
        approve_2: selectedInvoices?.approve_2 || "",
        approve_2_date: selectedInvoices?.approve_2_date || "",
        approve_2_desc: selectedInvoices?.approve_2_desc || "",
    });

    const handleChangeInvoice = (e) => {
        const { name, value } = e.target;
        setFormValueInvoice((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
        }));
    };

    const submitApprove2 = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("approve_2", formValueInvoice?.approve_2);
        formData.set("approve_2_date", formValueInvoice?.approve_2_date);
        formData.set("approve_2_desc", formValueInvoice?.approve_2_desc);

        handleApprove2(formData, selectedInvoices?.id);
        toggleOpenApprove2();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-[30rem]">
                <h2 className="text-2xl mb-4 py-[0.1rem]">Approve 2</h2>
                <form onSubmit={submitApprove2}>
                    <div className="">
                        <label
                            htmlFor="approve_2"
                            className="block text-sm font-semibold mb-2"
                        >
                            Approve 2:
                        </label>
                        <select
                            id="approve_2"
                            name="approve_2"
                            value={formValueInvoice?.approve_2}
                            onChange={handleChangeInvoice}
                            className="border rounded w-full py-2 mb-4 "
                            required
                        >
                            <option value="" hidden>
                                Select Approve
                            </option>
                            <option value="reject" className="text-xs">
                                Reject
                            </option>
                            <option value="ok" className="text-xs">
                                Ok
                            </option>
                        </select>
                    </div>
                    {formValueInvoice.approve_2 === "reject" && (
                        <>
                            {/* <div className="">
                                <label
                                    htmlFor="approve_2_date"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Approve 2 Date:
                                </label>
                                <input
                                    type="date"
                                    id="approve_2_date"
                                    name="approve_2_date"
                                    value={formValueInvoice?.approve_2_date}
                                    onChange={handleChangeInvoice}
                                    className="border rounded w-full mb-4 py-2"
                                />
                            </div> */}
                            <div className="">
                                <label
                                    htmlFor="approve_2_desc"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Approve 2 Description:
                                </label>
                                <input
                                    type="text"
                                    id="approve_2_desc"
                                    name="approve_2_desc"
                                    value={formValueInvoice?.approve_2_desc}
                                    onChange={handleChangeInvoice}
                                    className="border rounded w-full mb-4 py-2"
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={toggleOpenApprove2}
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

export default ModalApprove2;
