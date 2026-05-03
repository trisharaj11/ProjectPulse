import React, { useRef } from 'react';

const PDFUploader = ({ file, setFile }) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type === 'application/pdf' || selected.name.endsWith('.pdf')) {
        setFile(selected);
      } else {
        alert("Only .pdf files are allowed");
      }
    }
  };

  return (
    <div>
      {!file ? (
        <div className="dropzone" onClick={() => inputRef.current.click()}>
          <p>Click to select PDF report</p>
          <input ref={inputRef} type="file" accept=".pdf" onChange={handleChange} style={{ display: 'none' }} />
        </div>
      ) : (
        <div className="file-info-card">
          <div>
            <strong>📄 {file.name}</strong>
            <p className="mb-0 text-muted">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setFile(null)}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
