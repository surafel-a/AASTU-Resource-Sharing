import { useParams } from "react-router-dom";
import { useResource } from "../contexts/ResourceContext";
import { useProgress } from "../contexts/ProgressContext";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Reader = () => {
  const { id } = useParams();
  const { resources } = useResource();
  const { saveProgress, progresses } = useProgress();

  const [resource, setResource] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const timeoutRef = useRef(null);

  const percentage = numPages ? Math.round((currentPage / numPages) * 100) : 0;

  // FIND RESOURCE
  useEffect(() => {
    if (!resources.length) return;
    const found = resources.find((r) => r._id === id);
    setResource(found || null);
  }, [resources, id]);

  // LOAD SAVED PROGRESS
  useEffect(() => {
    if (!progresses.length || !numPages) return;
    const existing = progresses.find((p) => p.resource?._id === id);
    if (existing) {
      const savedPage = Math.round((existing.progress / 100) * numPages);
      setCurrentPage(Math.max(1, savedPage));
    }
  }, [progresses, id, numPages]);

  // SAVE PROGRESS WITH DEBOUNCE
  useEffect(() => {
    if (!numPages) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      saveProgress(id, percentage, numPages);
    }, 1000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentPage, numPages]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, numPages));

  if (!resource) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center">
      {/* TOP PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* PAGE INFO BAR */}
      <div className="fixed top-1 left-0 w-full z-50 flex justify-center">
        <div className="bg-black/60 text-white text-sm px-4 py-1 rounded-full mt-2">
          Page {currentPage} of {numPages ?? "..."} — {percentage}% read
        </div>
      </div>

      {/* PDF DOCUMENT */}
      <div className="mt-16 mb-24">
        <Document
          file={resource.fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="text-white mt-20 text-xl">Loading PDF...</div>
          }
        >
          <Page
            pageNumber={currentPage}
            width={Math.min(window.innerWidth * 0.9, 800)}
          />
        </Document>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur py-4 flex justify-center items-center gap-6 z-50">
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold disabled:opacity-40 hover:bg-blue-700 transition cursor-pointer"
        >
          ← Prev
        </button>

        <span className="text-white font-semibold">
          Page {currentPage} of {numPages ?? "..."}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage >= numPages}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold disabled:opacity-40 hover:bg-blue-700 transition cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Reader;
