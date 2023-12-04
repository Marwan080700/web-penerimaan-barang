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
    if (trigger) {
      setTrigger(false);
    }
  }, [trigger]);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={toggleOpenDropdown}
          className="bg-slate-700 text-xs text-white py-[0.5rem] px-3 rounded uppercase"
        >
          Modify
        </button>

        {isOpen && (
          <div className="absolute bottom-[-6.9rem] left-[-5.5rem] bg-white border border-gray-300 py-1 px-1 rounded shadow-md z-10 w-[10rem]">
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
                onClick={toggleOpenAdd}
                className="block py-2 uppercase"
              >
                Insert
              </button>
            </div>
            {selectedCategory ? (
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
                    onClick={toggleOpenDeleted}
                    className="block py-2 uppercase"
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
                    onClick={toggleOpenUpdate}
                    className="block py-2 uppercase"
                  >
                    Update
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-gray-200">
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
                    disabled
                    type="button"
                    onClick={toggleOpenDeleted}
                    className="block py-2 uppercase"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
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
                    disabled
                    type="button"
                    onClick={toggleOpenUpdate}
                    className="block py-2 uppercase"
                  >
                    Update
                  </button>
                </div>
              </>
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
