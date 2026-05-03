import React, { useRef, useState } from 'react';

const FileDropZone = ({ file, setFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.zip') || droppedFile.type === 'application/zip' || droppedFile.type === 'application/x-zip-compressed') {
        setFile(droppedFile);
      } else {
        alert("Only .zip files are allowed");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      {!file ? (
        <div 
          className={`dropzone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <p>Drag and drop your ZIP file here, or click to select</p>
          <input ref={inputRef} type="file" accept=".zip" onChange={handleChange} style={{ display: 'none' }} />
        </div>
      ) : (
        <div className="file-info-card">
          <div>
            <strong>📦 {file.name}</strong>
            <p className="mb-0 text-muted">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setFile(null)}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;
