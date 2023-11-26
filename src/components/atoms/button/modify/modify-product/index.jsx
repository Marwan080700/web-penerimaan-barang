import { useDeferredValue, useEffect, useState } from "react";
import ModalConfirmHapus from "../../../../molecules/modal/modal-confirm-hapus/product";
import ModalUpdateDataProduct from "../../../../molecules/modal/modal-update/product/product";
import ModalAddDataProduct from "../../../../molecules/modal/modal-add/product/product";

const ModifyProduct = ({
  handleDelete,
  handleUpdate,
  selectedCategory,
  selectedProduct,
  triggerProduct,
  setTriggerProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeteled, setIsOpenDeleted] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdateProduct, setIsOpenUpdateProduct] = useState(false);

  const toggleOpenDropdown = () => setIsOpen((prevState) => !prevState);
  const toggleOpenDeleted = () => setIsOpenDeleted((prevState) => !prevState);
  const toggleOpenAddProduct = () => setIsOpenAdd((prevState) => !prevState);
  const toggleOpenUpdateProduct = () =>
    setIsOpenUpdateProduct((prevState) => !prevState);

  useEffect(() => {
    if (handleDelete) {
      setIsOpen(false);
    }
  }, [handleDelete, handleUpdate]);

  useEffect(() => {
    if (triggerProduct) {
      setTriggerProduct(false);
    }
  }, [triggerProduct]);
  return (
    <>
      <div className="relative mt-5">
        {selectedCategory === undefined ? (
          <>
            <button
              type="button"
              disabled
              onClick={toggleOpenDropdown}
              className="bg-gray-300 text-white py-1 px-3 rounded uppercase"
            >
              Modify
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={toggleOpenDropdown}
              className="bg-slate-700 text-white py-1 px-3 rounded uppercase"
            >
              Modify
            </button>
          </>
        )}

        {isOpen && (
          <div className="absolute bottom-8 left-0 bg-white border border-gray-300 py-1 px-1 rounded shadow-md z-10 w-[10rem]">
            <button
              type="button"
              onClick={toggleOpenAddProduct}
              className="block my-2"
            >
              Insert
            </button>
            {selectedProduct ? (
              <>
                <button
                  type="button"
                  onClick={toggleOpenDeleted}
                  className="block my-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={toggleOpenUpdateProduct}
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
        <ModalConfirmHapus
          handleDelete={handleDelete}
          toggleOpenDeleted={toggleOpenDeleted}
          isOpenDeteled={isOpenDeteled}
        />
        <ModalAddDataProduct
          setTriggerProduct={setTriggerProduct}
          selectedCategory={selectedCategory}
          toggleOpenAddProduct={toggleOpenAddProduct}
          isOpenAdd={isOpenAdd}
        />
        <ModalUpdateDataProduct
          selectedCategory={selectedCategory}
          selectedProduct={selectedProduct}
          toggleOpenUpdateProduct={toggleOpenUpdateProduct}
          isOpenUpdateProduct={isOpenUpdateProduct}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
};
export default ModifyProduct;
