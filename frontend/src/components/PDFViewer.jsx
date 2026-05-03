import React from 'react';

const PDFViewer = ({ reportUrl, fileName }) => {
  return (
    <div className="pdf-viewer-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>{fileName}</strong>
        <div>
          <a href={reportUrl} target="_blank" rel="noreferrer" className="btn btn-secondary-custom btn-sm me-2">
            Open in New Tab
          </a>
          <a href={reportUrl} download className="btn btn-primary-custom btn-sm">
            Download PDF
          </a>
        </div>
      </div>
      <div className="pdf-viewer-container d-none d-md-block">
        <iframe src={reportUrl} title="PDF Report">
          <p>Your browser does not support PDFs. <a href={reportUrl}>Download the PDF</a>.</p>
        </iframe>
      </div>
      <div className="d-md-none p-3 bg-dark text-center border rounded">
        <p>PDF preview is not supported on mobile devices.</p>
        <a href={reportUrl} download className="btn btn-primary-custom">Download PDF to view</a>
      </div>
    </div>
  );
};

export default PDFViewer;
