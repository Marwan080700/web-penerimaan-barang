import { useState } from "react";
import ModalApprove1 from "../../../../../molecules/modal/approve1";
import ModalReject1 from "../../../../../molecules/modal/reject1";

const ModifyAppv1 = ({
    selectedInvoices,
    handleApprove1,
    handleReject1,
    setSelectedInovices,
    getEnableSelected
}) => {
    // console.log("selectedInvoices", selectedInvoices)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenApprove1, setIsOpenApprove1] = useState(false);
    const [isOpenReject1, setIsOpenReject1] = useState(false);

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

    const toggleOpenDropdown = () => setIsOpen((prevState) => !prevState);
    const toggleOpenApprove1 = () => setIsOpenApprove1((prevState) => !prevState);
    const toggleOpenReject1 = () => setIsOpenReject1((prevState) => !prevState);

    return (
        <div className="relative ">
            <button
                type="button"
                onClick={toggleOpenDropdown}
                className="bg-slate-700 text-xs text-white py-[0.5rem] px-3 rounded uppercase"
            >
                Action
            </button>
            {isOpen && (
                <div className="absolute bottom-[-5rem] left-[-5.5rem] bg-white border border-gray-300 py-1 px-1 rounded shadow-md z-10 w-[10rem]">
                    {selectedInvoices ? (
                        <>
                            <div className="flex items-center gap-2  text-green-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                                    />
                                </svg>

                                <button
                                    type="button"
                                    onClick={toggleOpenApprove1}
                                    className="block my-2 uppercase"
                                >
                                    Approve Level 1
                                </button>
                            </div>

                            <div className="flex items-center gap-2  text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                                    />
                                </svg>

                                <button
                                    type="button"
                                    onClick={toggleOpenReject1}
                                    className="block my-2 uppercase"
                                >
                                    Reject Level 1
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2  text-slate-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                                    />
                                </svg>

                                <button
                                    type="button"
                                    disabled
                                    onClick={toggleOpenApprove1}
                                    className="block my-2 uppercase"
                                >
                                    Approve Level 1
                                </button>
                            </div>
                            <div className="flex items-center gap-2  text-slate-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                                    />
                                </svg>

                                <button
                                    disabled
                                    type="button"
                                    onClick={toggleOpenReject1}
                                    className="block my-2 uppercase"
                                >
                                    Reject Level 1
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
            <ModalApprove1
                selectedInvoices={selectedInvoices}
                toggleOpenApprove1={toggleOpenApprove1}
                isOpenApprove1={isOpenApprove1}
                handleApprove1={handleApprove1}
                setIsOpen={setIsOpen}
                setSelectedInovices={setSelectedInovices}
                getEnableSelected={getEnableSelected}
            />
            <ModalReject1
                selectedInvoices={selectedInvoices}
                toggleOpenReject1={toggleOpenReject1}
                isOpenReject1={isOpenReject1}
                handleReject1={handleReject1}
                setIsOpen={setIsOpen}
                setSelectedInovices={setSelectedInovices}
            />
        </div >
    );
};
export default ModifyAppv1;
