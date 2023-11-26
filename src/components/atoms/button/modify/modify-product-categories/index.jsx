import { useEffect, useState } from "react";
import ModalConfirmHapus from "../../../../molecules/modal/modal-confirm-hapus/product";
import ModalAddData from "../../../../molecules/modal/modal-add/product/product-categories";
import ModalUpdateData from "../../../../molecules/modal/modal-update/product/product-categories";

const Modify = ({
  handleDelete,
  handleUpdate,
  selectedCategory,
  selectedProduct,
  trigger,
  setTrigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeteled, setIsOpenDeleted] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const toggleOpenDropdown = () => setIsOpen((prevState) => !prevState);
  const toggleOpenDeleted = () => setIsOpenDeleted((prevState) => !prevState);
  const toggleOpenAdd = () => setIsOpenAdd((prevState) => !prevState);
  const toggleOpenUpdate = () => setIsOpenUpdate((prevState) => !prevState);

  useEffect(() => {
    if (handleDelete || handleUpdate) {
      setIsOpen(false);
    }
  }, [handleDelete, handleUpdate]);

  useEffect(() => {
    if (trigger) {
      setTrigger(false);
    }
  }, [trigger]);

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
              onClick={toggleOpenAdd}
              className="block my-2"
            >
              Insert
            </button>
            {selectedCategory ? (
              <>
                {" "}
                <button
                  type="button"
                  onClick={toggleOpenDeleted}
                  className="block my-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={toggleOpenUpdate}
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
        {/* <ModalConfirmHapus
          handleDelete={handleDelete}
          toggleOpenDeleted={toggleOpenDeleted}
          isOpenDeteled={isOpenDeteled}
        /> */}
        <ModalConfirmHapus
          handleDelete={handleDelete}
          toggleOpenDeleted={toggleOpenDeleted}
          isOpenDeteled={isOpenDeteled}
        />
        <ModalAddData
          toggleOpenAdd={toggleOpenAdd}
          isOpenAdd={isOpenAdd}
          setTrigger={setTrigger}
        />
        <ModalUpdateData
          selectedCategory={selectedCategory}
          selectedProduct={selectedProduct}
          toggleOpenUpdate={toggleOpenUpdate}
          isOpenUpdate={isOpenUpdate}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
};
export default Modify;
