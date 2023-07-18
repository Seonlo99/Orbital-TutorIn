import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const ViewPdf = ({ closeHandler, PDFLINK }) => {
  const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = url;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  // console.log(PDFLINK)
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 right-0 backdrop-blur-sm z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="bg-white container mx-auto max-w-2xl rounded-lg shadow-md border outline-gray-300">
        <div className="flex flex-row justify-end px-2 py-1">
          <button
            onClick={closeHandler}
            className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="px-1 pb-5 flex flex-col gap-y-2">
          <div className="flex justify-center">
            Page {pageNumber} of {numPages}
          </div>
          <div className="flex flex-row gap-x-5 justify-center">
            <button onClick={goToPrevPage}>Prev</button>
            <button onClick={goToNextPage}>Next</button>
          </div>

          <div className="flex flex-row justify-center items-center">
            <Document
              file={PDFLINK}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPdf;
