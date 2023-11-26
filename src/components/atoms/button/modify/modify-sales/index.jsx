import { useState } from "react";
import ModalAddDataSales from "../../../../molecules/modal/modal-add/sales/sales";
import ModalConfirmHapusSales from "../../../../molecules/modal/modal-confirm-hapus/sales";
import ModalUpdateDataSales from "../../../../molecules/modal/modal-update/sales/sales";

const ModifySales = ({
  selectedSales,
  // handleDelete,
  handleUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddSales, setIsOpenAddSales] = useState(false);
  // const [isOpenDeleteSales, setIsOpenDeleteSales] = useState(false);
  const [isOpenUpdateSales, setIsOpenUpdateSales] = useState(false);

  const toggleAddSales = () => setIsOpenAddSales((prevState) => !prevState);
  const toggleOpenDropdown = () => setIsOpen((prevState) => !prevState);
  // const toggleOpenDeleteSales = () =>
  //   setIsOpenDeleteSales((prevState) => !prevState);

  const toggleOpenUpdateSales = () =>
    setIsOpenUpdateSales((prevState) => !prevState);

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
              onClick={toggleAddSales}
              className="block my-2"
            >
              Insert
            </button>
            {selectedSales ? (
              <>
                {/* <button
                  type="button"
                  onClick={toggleOpenDeleteSales}
                  className="block my-2"
                >
                  Delete
                </button> */}
                <button
                  type="button"
                  onClick={toggleOpenUpdateSales}
                  className="block my-2"
                >
                  Update
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
        <ModalAddDataSales
          toggleAddSales={toggleAddSales}
          isOpenAddSales={isOpenAddSales}
        />
        {/* <ModalConfirmHapusSales
          handleDelete={handleDelete}
          toggleOpenDeleteSales={toggleOpenDeleteSales}
          isOpenDeleteSales={isOpenDeleteSales}
        /> */}
        <ModalUpdateDataSales
          handleUpdate={handleUpdate}
          selectedSales={selectedSales}
          toggleOpenUpdateSales={toggleOpenUpdateSales}
          isOpenUpdateSales={isOpenUpdateSales}
        />
      </div>
    </>
  );
};
export default ModifySales;
