import React, { useRef } from 'react';

const ImageUploader = ({ files, setFiles }) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(f => f.type.startsWith('image/'));
      if (files.length + validFiles.length > 10) {
        alert("Maximum 10 images allowed");
        return;
      }
      setFiles([...files, ...validFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="dropzone" onClick={() => inputRef.current.click()}>
        <p>Click to select screenshots (Max 10 images)</p>
        <p className="text-muted small">Accepted: JPG, PNG, WEBP</p>
        <input ref={inputRef} type="file" multiple accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
      </div>
      
      {files.length > 0 && (
        <>
          <p className="mt-3 mb-1 text-muted">{files.length} of 10 images selected</p>
          <div className="screenshot-grid">
            {files.map((file, index) => (
              <div key={index} className="screenshot-thumb">
                <img src={URL.createObjectURL(file)} alt={`thumb-${index}`} />
                <button type="button" className="remove-btn" onClick={() => removeFile(index)}>×</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
