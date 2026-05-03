import React, { useState } from 'react';

const LiveLinkInput = ({ value, onChange, error }) => {
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const validate = (url) => {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setIsValid(validate(value));
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    if (touched) setIsValid(validate(e.target.value));
  };

  const hasError = (touched && !isValid) || error;

  return (
    <div className="livelink-input-container">
      <span className="livelink-icon">🔗</span>
      <input
        type="text"
        className={`form-control livelink-input ${touched ? (isValid ? 'valid' : 'invalid') : ''}`}
        placeholder="https://your-project.vercel.app"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {hasError && <p className="text-danger small mt-1">Must be a valid URL starting with http:// or https://</p>}
      {isValid && <p className="text-success small mt-1">Valid URL</p>}
      
      <p className="text-muted small mt-2">e.g. https://myapp.vercel.app</p>
      
      <button 
        type="button" 
        className="btn btn-secondary-custom btn-sm mt-2" 
        disabled={!isValid}
        onClick={() => window.open(value, '_blank')}
      >
        Preview Link
      </button>
    </div>
  );
};

export default LiveLinkInput;
