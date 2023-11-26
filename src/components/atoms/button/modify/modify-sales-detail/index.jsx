import { useState } from "react";
import ModalAddDataSalesDetail from "../../../../molecules/modal/modal-add/sales/sales-detail";
import ModalUpdateDataSalesDetail from "../../../../molecules/modal/modal-update/sales/sales-detail";
import ModalConfirmHapusSales from "../../../../molecules/modal/modal-confirm-hapus/sales";

const ModifySalesDetail = ({ selectedSales }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddSalesDetail, setIsOpenAddSalesDetail] = useState(false);
  const [isOpenDeleteSales, setIsOpenDeleteSales] = useState(false);
  const [isOpenUpdateSalesDetail, setIsOpenUpdateSalesDetail] = useState(false);

  const toggleOpenDropdown = () => setIsOpen((prevState) => !prevState);

  const toggleOpenAddSalesDetail = () =>
    setIsOpenAddSalesDetail((prevState) => !prevState);

  const toggleOpenDeleteSales = () =>
    setIsOpenDeleteSales((prevState) => !prevState);

  const toggleOpenUpdateSalesDetail = () =>
    setIsOpenDeleteSales((prevState) => !prevState);

  return (
    <>
      <div className="relative mt-5">
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
              onClick={toggleOpenAddSalesDetail}
              className="block my-2"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={toggleOpenDeleteSalesDetail}
              className="block my-2"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={toggleOpenUpdateSalesDetail}
              className="block my-2"
            >
              Update Product
            </button>
          </div>
        )}
        <ModalAddDataSalesDetail
          toggleOpenAddSalesDetail={toggleOpenAddSalesDetail}
          isOpenAddSalesDetail={isOpenAddSalesDetail}
        />
        <ModalConfirmHapusSales
          toggleOpenDeleteSales={toggleOpenDeleteSales}
          isOpenDeleteSales={isOpenDeleteSales}
        />
        <ModalUpdateDataSalesDetail
          toggleOpenUpdateSalesDetail={toggleOpenUpdateSalesDetail}
          isOpenUpdateSalesDetail={isOpenUpdateSalesDetail}
        />
      </div>
    </>
  );
};
export default ModifySalesDetail;
