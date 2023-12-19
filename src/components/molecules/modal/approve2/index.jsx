import React, { useEffect, useState } from "react";

const ModalApprove2 = ({
    toggleOpenApprove2,
    isOpenApprove2,
    selectedInvoices,
    handleApprove2,
}) => {
    if (!isOpenApprove2) return null;

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const currentDate = `${year}-${month}-${day}`;

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const time = `${hours}:${minutes}`;

        return `${currentDate}T${time}`;
    };

    const [formValueInvoice, setFormValueInvoice] = useState({
        approve_2: "ok",
        approve_2_date: getCurrentDateTime(),
        approve_2_desc: selectedInvoices?.approve_2_desc || "",
    });

    useEffect(() => {
        // Update the state with the current date and time when the component is loaded
        setFormValueInvoice((prevFormValue) => ({
            ...prevFormValue,
            approve_2_date: getCurrentDateTime(),
        }));
    }, []);

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
                            htmlFor="approve_2_date"
                            className="block text-sm font-semibold mb-2"
                        >
                            Approve 2 Date:
                        </label>
                        <input
                            type="datetime-local"
                            id="approve_2_date"
                            name="approve_2_date"
                            value={formValueInvoice?.approve_2_date}
                            onChange={handleChangeInvoice}
                            className="border rounded w-full mb-4 py-2"
                        />
                    </div>
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
