import { useState } from "react";
import ModalConfirmHapus from "../../../../molecules/modal/modal-confirm-hapus/product";
import ModalAddDataProduct from "../../../../molecules/modal/modal-add/product/product";
import ModalUpdateDataInvoices from "../../../../molecules/modal/modal-update/invoices";
import ModalConfirmHapusInvoice from "../../../../molecules/modal/modal-confirm-hapus/invoice";
import ModalAddDataInvoice from "../../../../molecules/modal/modal-add/invoice";
import ModalApprove1 from "../../../../molecules/modal/approve1";
import ModalApprove2 from "../../../../molecules/modal/approve2";
import ModalReject1 from "../../../../molecules/modal/reject1";
import ModalReject2 from "../../../../molecules/modal/reject2";

const ModifyInvoice = ({
  handleDelete,
  handleUpdate,
  selectedInvoices,
  handleApprove1,
  handleReject1,
  handleApprove2,
  handleReject2,
  setSelectedInovices,
  getEnableSelected
}) => {
  // console.log("selectedInvoices", selectedInvoices)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeteledInvoices, setIsOpenDeletedInvoices] = useState(false);
  const [isOpenAddInvoices, setIsOpenAddInvoices] = useState(false);
  const [isOpenUpdateInvoices, setIsOpenUpdateInvoices] = useState(false);
  const [isOpenApprove1, setIsOpenApprove1] = useState(false);
  const [isOpenReject1, setIsOpenReject1] = useState(false);
  const [isOpenApprove2, setIsOpenApprove2] = useState(false);
  const [isOpenReject2, setIsOpenReject2] = useState(false);

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
  const toggleOpenDeletedInvoices = () =>
    setIsOpenDeletedInvoices((prevState) => !prevState);
  const toggleOpenAddInvoices = () =>
    setIsOpenAddInvoices((prevState) => !prevState);
  const toggleOpenUpdateInvoices = () =>
    setIsOpenUpdateInvoices((prevState) => !prevState);
  const toggleOpenApprove1 = () => setIsOpenApprove1((prevState) => !prevState);
  const toggleOpenApprove2 = () => setIsOpenApprove2((prevState) => !prevState);
  const toggleOpenReject1 = () => setIsOpenReject1((prevState) => !prevState);
  const toggleOpenReject2 = () => setIsOpenReject2((prevState) => !prevState);

  return (
    <>
      <div className="relative ">
        <button
          type="button"
          onClick={toggleOpenDropdown}
          className="bg-slate-700 text-xs text-white py-[0.5rem] px-3 rounded uppercase"
        >
          Action
        </button>
        {isOpen && (
          <div className="absolute bottom-[-7.2rem] left-[-5.5rem] bg-white border border-gray-300 py-1 px-1 rounded shadow-md z-10 w-[10rem]">
            {user?.data?.data?.user?.role === "kabag" || user?.data?.data?.user?.role === "manager" ? (<></>) : (
              <div className="flex items-center gap-2 text-green-500">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <button
                  type="button"
                  onClick={toggleOpenAddInvoices}
                  className="block my-2 uppercase"
                >
                  Insert
                </button>
              </div>
            )}


            {selectedInvoices ? (
              <>
                {user?.data?.data?.user?.role === "kabag" || user?.data?.data?.user?.role === "manager" ? (<></>) : (
                  <>
                    <div className="flex items-center gap-2 text-red-500">
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <button
                        type="button"
                        onClick={toggleOpenDeletedInvoices}
                        className="block my-2 uppercase"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-yellow-500">
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      <button
                        type="button"
                        onClick={toggleOpenUpdateInvoices}
                        className="block my-2 uppercase"
                      >
                        Update
                      </button>
                    </div>
                  </>
                )}
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  <button
                    type="button"
                    onClick={toggleOpenDeletedInvoices}
                    className="block my-2 uppercase"
                  >
                    Delete
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <button
                    type="button"
                    onClick={toggleOpenUpdateInvoices}
                    className="block my-2 uppercase"
                  >
                    Update
                  </button>
                </div>
              </>
            )
            }
          </div >
        )}
        <ModalConfirmHapusInvoice
          handleDelete={handleDelete}
          toggleOpenDeletedInvoices={toggleOpenDeletedInvoices}
          isOpenDeteledInvoices={isOpenDeteledInvoices}
          setIsOpen={setIsOpen}
          setSelectedInovices={setSelectedInovices}
        />

        <ModalAddDataInvoice
          // selectedCategory={selectedCategory}
          toggleOpenAddInvoices={toggleOpenAddInvoices}
          isOpenAddInvoices={isOpenAddInvoices}
          setIsOpen={setIsOpen}
          // toggleOpenAddProduct={toggleOpenAddProduct}
          setSelectedInovices={setSelectedInovices}
        />
        <ModalUpdateDataInvoices
          selectedInvoices={selectedInvoices}
          toggleOpenUpdateInvoices={toggleOpenUpdateInvoices}
          isOpenUpdateInvoices={isOpenUpdateInvoices}
          handleUpdate={handleUpdate}
          setIsOpen={setIsOpen}
          setSelectedInovices={setSelectedInovices}
        />
        <ModalApprove1
          selectedInvoices={selectedInvoices}
          toggleOpenApprove1={toggleOpenApprove1}
          isOpenApprove1={isOpenApprove1}
          handleApprove1={handleApprove1}
          setIsOpen={setIsOpen}
          setSelectedInovices={setSelectedInovices}
          getEnableSelected={getEnableSelected}
        />
        <ModalApprove2
          selectedInvoices={selectedInvoices}
          toggleOpenApprove2={toggleOpenApprove2}
          isOpenApprove2={isOpenApprove2}
          handleApprove2={handleApprove2}
          setIsOpen={setIsOpen}
          setSelectedInovices={setSelectedInovices}
        />
        <ModalReject1
          selectedInvoices={selectedInvoices}
          toggleOpenReject1={toggleOpenReject1}
          isOpenReject1={isOpenReject1}
          handleReject1={handleReject1}
          setIsOpen={setIsOpen}
          setSelectedInovices={setSelectedInovices}
        />
        <ModalReject2
          selectedInvoices={selectedInvoices}
          toggleOpenReject2={toggleOpenReject2}
          isOpenReject2={isOpenReject2}
          handleReject2={handleReject2}
          setIsOpen={setIsOpen}
          setSelectedInovices={setSelectedInovices}
        />
      </div >
    </>
  );
};
export default ModifyInvoice;
