import { useState } from "react";
import ModalAddDataCustomer from "../../../../molecules/modal/modal-add/customer/customer";
import ModalUpdateDataCustomer from "../../../../molecules/modal/modal-update/customer/customer";
import ModalConfirmHapusCustomer from "../../../../molecules/modal/modal-confirm-hapus/customer";

const ModifyCustomer = ({ handleDelete, handleUpdate, selectedCustomer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddCustomer, setIsOpenAddCustomer] = useState(false);
  const [isOpenUpdateCustomer, setIsOpenUpdateCustomer] = useState(false);
  const [isOpenDeleteCustomer, setIsOpenDeleteCustomer] = useState(false);
  const toggleOpenDropdown = () => setIsOpen((prevState) => !prevState);

  const toggleOpenAddCustomer = () =>
    setIsOpenAddCustomer((prevState) => !prevState);

  const toggleOpenUpdateCustomer = () =>
    setIsOpenUpdateCustomer((prevState) => !prevState);

  const toggleOpenDeleteCustomer = () =>
    setIsOpenDeleteCustomer((prevState) => !prevState);

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
              onClick={toggleOpenAddCustomer}
              className="block my-2"
            >
              Insert
            </button>
            {/* <button
              type="button"
              onClick={toggleOpenDeleteCustomer}
              className="block my-2"
            >
              Delete
            </button> */}
            {selectedCustomer ? (
              <button
                type="button"
                onClick={toggleOpenUpdateCustomer}
                className="block my-2"
              >
                Update
              </button>
            ) : (
              <></>
            )}
          </div>
        )}
        <ModalAddDataCustomer
          toggleOpenAddCustomer={toggleOpenAddCustomer}
          isOpenAddCustomer={isOpenAddCustomer}
        />
        <ModalUpdateDataCustomer
          selectedCustomer={selectedCustomer}
          handleUpdate={handleUpdate}
          toggleOpenUpdateCustomer={toggleOpenUpdateCustomer}
          isOpenUpdateCustomer={isOpenUpdateCustomer}
        />
        <ModalConfirmHapusCustomer
          handleDelete={handleDelete}
          toggleOpenDeleteCustomer={toggleOpenDeleteCustomer}
          isOpenDeleteCustomer={isOpenDeleteCustomer}
        />
      </div>
    </>
  );
};
export default ModifyCustomer;
