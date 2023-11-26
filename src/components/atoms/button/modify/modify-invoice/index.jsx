import { useState } from "react";
import ModalConfirmHapus from "../../../../molecules/modal/modal-confirm-hapus/product";
import ModalAddDataProduct from "../../../../molecules/modal/modal-add/product/product";
import ModalUpdateDataInvoices from "../../../../molecules/modal/modal-update/invoices";
import ModalConfirmHapusInvoice from "../../../../molecules/modal/modal-confirm-hapus/invoice";

const ModifyInvoice = ({ handleDelete, handleUpdate, selectedInvoices }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeteledInvoices, setIsOpenDeletedInvoices] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdateInvoices, setIsOpenUpdateInvoices] = useState(false);

  const toggleOpenDropdown = () => setIsOpen((prevState) => !prevState);
  const toggleOpenDeletedInvoices = () =>
    setIsOpenDeletedInvoices((prevState) => !prevState);
  const toggleOpenAddProduct = () => setIsOpenAdd((prevState) => !prevState);
  const toggleOpenUpdateInvoices = () =>
    setIsOpenUpdateInvoices((prevState) => !prevState);

  return (
    <>
      <div className="relative ">
        <button
          type="button"
          onClick={toggleOpenDropdown}
          className="bg-slate-700 text-white py-1 px-3 rounded uppercase"
        >
          Modify
        </button>
        {isOpen && (
          <div className="absolute bottom-8 left-0 bg-white border border-gray-300 py-1 px-1 rounded shadow-md z-10 w-[10rem]">
            <button
              type="button"
              onClick={toggleOpenAddProduct}
              className="block my-2"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={toggleOpenDeletedInvoices}
              className="block my-2"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={toggleOpenUpdateInvoices}
              className="block my-2"
            >
              Update
            </button>
          </div>
        )}
        <ModalConfirmHapusInvoice
          handleDelete={handleDelete}
          toggleOpenDeletedInvoices={toggleOpenDeletedInvoices}
          isOpenDeteledInvoices={isOpenDeteledInvoices}
        />

        <ModalAddDataProduct
        // selectedCategory={selectedCategory}
        // toggleOpenAddProduct={toggleOpenAddProduct}
        // isOpenAdd={isOpenAdd}
        />
        <ModalUpdateDataInvoices
          selectedInvoices={selectedInvoices}
          toggleOpenUpdateInvoices={toggleOpenUpdateInvoices}
          isOpenUpdateInvoices={isOpenUpdateInvoices}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
};
export default ModifyInvoice;
