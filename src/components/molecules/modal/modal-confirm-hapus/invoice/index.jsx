import { useState } from "react";

const ModalConfirmHapusInvoice = ({
  handleDelete,
  toggleOpenDeletedInvoices,
  isOpenDeteledInvoices,
}) => {
  if (!isOpenDeteledInvoices) null;

  return (
    <>
      {isOpenDeteledInvoices && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" />
          <div className="fixed top-1/2 left-1/2 transform z-50">
            <div className="bg-white p-6 border rounded relative w-[20rem] ">
              <div className="text-center text-sm font-semibold uppercase">
                <h2>Yakin Hapus Data Ini ?</h2>
              </div>
              <div className="italic text-red-500 text-center text-xs mb-6">
                <p>data akan langsung terhapus</p>
              </div>
              <div className="flex justify-center gap-5">
                <button
                  type="button"
                  onClick={toggleOpenDeletedInvoices}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(), toggleOpenDeletedInvoices();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalConfirmHapusInvoice;
