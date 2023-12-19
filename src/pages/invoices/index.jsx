import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  cancelInvoices,
  deleteInvoices,
  getInvoices,
  invoiceSelectors,
  printInvoice,
  updateApprove1,
  updateApprove2,
  updateInvoices,
} from "../../redux/slice/invoice";
import ModifyInvoice from "../../components/atoms/button/modify/modify-invoice";
import _ from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Document, Page } from "react-pdf";
import { setPdfData } from "../../redux/slice/invoice";
import { pdfjs } from 'react-pdf';



const Invoice = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const gridStyle = { minHeight: 200 };
  const columnCustomer = [
    {
      name: "invoice_number",
      header: "invoice_number",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "invoice_date",
      header: "invoice_date",
      minWidth: 50,
      defaultWidth: 180,
    },
    {
      name: "due_date",
      header: "due_date",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    // {
    //   name: "handpone_customer",
    //   header: "customer_handpone",
    //   maxWidth: 1000,
    //   defaultWidth: 180,
    // },
    {
      name: "sub_total",
      header: "sub_total",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "discount",
      header: "discount",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "ppn_11",
      header: "ppn_11",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "total_amount",
      header: "total_amount",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "no_faktur_pajak",
      header: "no_faktur_pajak",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "no_faktur_pajak_pengganti",
      header: "no_faktur_pajak_pengganti",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "invoice_description",
      header: "Invoice Description",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    // {
    //   name: "invoice_status",
    //   header: "invoice_status",
    //   maxWidth: 1000,
    //   defaultWidth: 180,
    // },
    {
      name: "approve_1",
      header: "approve_1",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "approve_1_date",
      header: "approve_1_date",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "approve_1_desc",
      header: "approve_1_desc",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "approve_2",
      header: "approve_2",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "approve_2_date",
      header: "approve_2_date",
      maxWidth: 1000,
      defaultWidth: 180,
    },
    {
      name: "approve_2_desc",
      header: "approve_2_desc",
      maxWidth: 1000,
      defaultWidth: 180,
    },
  ];

  const dispatch = useDispatch();
  const pdfData = useSelector((state) => state.invoice.pdfData);
  // console.log("pdfData", pdfData)
  const invoice = useSelector(invoiceSelectors.selectAll);
  const [selectedInvoices, setSelectedInovices] = useState(null);
  // console.log(selectedInvoices?.data?.id);
  const [enableSelected, getEnableSelected] = useState(true);

  let filterInvoice = _.filter(invoice, ["status", 0]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  const handleSearch = useCallback(
    (text) => {
      const lowerSearchText = text.toLowerCase();

      const filtered = invoice.filter((item) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(lowerSearchText)
        );
      });

      setFilteredData(filtered);
      setSearchText(text);
    },
    [invoice]
  );

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleInvoicesRowClick = (row) => {
    setSelectedInovices(row);
  };

  const handleDelete = async () => {
    if (selectedInvoices?.data?.id) {
      await dispatch(cancelInvoices(selectedInvoices?.data?.id)).then(() => {
        dispatch(getInvoices());
      });
    } else {
      console.error("No invoice selected for cancelation");
    }
  };

  const handleUpdate = async (formData, selectedInvoicesId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    await dispatch(
      updateInvoices({
        id: selectedInvoicesId,
        formData,
        config,
      })
    ).then(() => {
      dispatch(getInvoices());
    });
  };

  const handleApprove1 = async (formData, selectedInvoicesId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    await dispatch(
      updateApprove1({
        id: selectedInvoicesId,
        formData,
        config,
      })
    ).then(() => {
      dispatch(getInvoices());
    });
  };

  const handleApprove2 = async (formData, selectedInvoicesId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    await dispatch(
      updateApprove2({
        id: selectedInvoicesId,
        formData,
        config,
      })
    ).then(() => {
      dispatch(getInvoices());
    });
  };

  const onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    setNumPages(numPages);
  };


  const onDocumentLoadError = (error) => {
    console.error("Error loading document:", error);
  };

  const handlePrint = async () => {
    if (selectedInvoices?.data?.id) {
      try {
        // Use Fetch API to download the PDF
        const response = await fetch(`/invoices/print/${selectedInvoices?.data?.id}`, {
          method: 'GET',
        });


        if (!response.ok) {
          console.error("Failed to download PDF:", response.status, response.statusText);
          return;
        }

        // Convert the response to a Blob
        const pdfBlob = await response.blob();
        console.log("PDF Blob:", pdfBlob);

        // Create a Blob URL and trigger download
        const blobUrl = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'invoice.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Print error:", error);
      }
    }
  };




  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  useEffect(() => {
    // Update filteredData when invoice changes
    if (filteredData) {
      setFilteredData(filterInvoice);
    }
  }, [filteredData]);

  return (
    <div>
      <div className="border-b border-gray-200 mb-6 uppercase text-sm font-bold py-3">
        <h2>Invoice</h2>
      </div>
      {/* Product Categories Table */}
      <div className="mb-1">
        <div className="flex justify-between items-center uppercase text-xs font-semibold mb-2">
          <h3>Invoice List</h3>
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              className="border rounded py-2 px-1"
              placeholder="Cari data..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <ModifyInvoice
              selectedInvoices={selectedInvoices?.data}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleApprove1={handleApprove1}
              handleApprove2={handleApprove2}
            />
          </div>
        </div>
      </div>
      <div className="relative hover:z-50">
        <ReactDataGrid
          idProperty="id"
          columns={columnCustomer}
          dataSource={filteredData}
          style={gridStyle}
          pagination
          enableSelection={enableSelected}
          onRowClick={handleInvoicesRowClick}
        />
      </div>
      <div className="flex gap-4 mt-5">
        {selectedInvoices?.data?.id ? (
          <button
            type="button"
            className="border rounded uppercase px-2 py-1 w-[5.5rem] shadow "
            onClick={handlePrint}
          >
            Print
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="border rounded bg-gray-300 text-white uppercase px-2 py-1 w-[5.5rem] shadow "
            onClick={handlePrint}
          >
            Print
          </button>
        )}
      </div>
      {/* PDF Viewer */}
      {pdfData && (
        <div className="mt-4">
          <Document
            file={`data:application/pdf;base64,${pdfData}`}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
    </div>
  );
};
export default Invoice;
