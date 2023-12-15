import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"

const ModalApprove1 = ({
    toggleOpenApprove1,
    isOpenApprove1,
    selectedInvoices,
    handleApprove1,
}) => {
    if (!isOpenApprove1) return null; // Don't render if not open or no category selected
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
        approve_1: selectedInvoices?.approve_1 || "",
        approve_1_date: selectedInvoices?.approve_1_date || "",
        approve_1_desc: selectedInvoices?.approve_1_date || "",
    });

    const handleChangeInvoice = (e) => {
        const { name, value } = e.target;
        setFormValueInvoice((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
        }));

    };


    const submitApprove1 = (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.set("approve_1", formValueInvoice?.approve_1);
        formData.set("approve_1_date", formValueInvoice?.approve_1_date);
        formData.set("approve_1_desc", formValueInvoice?.approve_1_desc);

        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };

        handleApprove1(formData, selectedInvoices?.id); // Ensure to pass the correct data to handleUpdate
        toggleOpenApprove1();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-[30rem]">
                <h2 className="text-2xl mb-4 py-[0.1rem]">Approve 1</h2>
                <form onSubmit={submitApprove1}>
                    <div>
                        <div className="">
                            <label
                                htmlFor="approve_1"
                                className="block text-sm font-semibold mb-2"
                            >
                                Approve:
                            </label>
                            <select
                                id="approve_1"
                                name="approve_1"
                                value={formValueInvoice?.approve_1}
                                onChange={handleChangeInvoice}
                                className="border rounded w-full py-2 py-2 mb-4 "
                                required
                            >
                                <option value="" hidden>
                                    select Approve
                                </option>
                                <option value="reject" className="text-xs">
                                    Reject
                                </option>
                                <option value="ok" className="text-xs">
                                    Ok
                                </option>
                            </select>
                        </div>
                        {
                            formValueInvoice?.approve_1 === "reject" ? (<>
                                {/* <div className="">
                                    <label
                                        htmlFor="approve_1_date"
                                        className="block text-sm font-semibold mb-2"
                                    >
                                        Approve 1 Date:
                                    </label>
                                    <input
                                        type="date"
                                        id="approve_1_date"
                                        name="approve_1_date"
                                        value={formValueInvoice?.approve_1_date}
                                        onChange={handleChangeInvoice}
                                        className="border rounded w-full mb-4 py-2 py-2"
                                    />
                                </div> */}
                                <div className="">
                                    <label
                                        htmlFor="approve_1_desc"
                                        className="block text-sm font-semibold mb-2"
                                    >
                                        Approve 1 Description:
                                    </label>
                                    <input
                                        type="text"
                                        id="approve_1_desc"
                                        name="approve_1_desc"
                                        value={formValueInvoice?.approve_1_desc}
                                        onChange={handleChangeInvoice}
                                        className="border rounded w-full mb-4 py-2 py-2"
                                    />
                                </div>
                            </>) : (<></>)
                        }

                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={toggleOpenApprove1}
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

export default ModalApprove1;
