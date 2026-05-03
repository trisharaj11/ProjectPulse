import React, { useState } from 'react';

const ScreenshotGallery = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-section">
      <div className="screenshot-grid">
        {images.map((img, idx) => (
          <div key={idx} className="screenshot-thumb" onClick={() => setSelectedImg(img)}>
            <img src={img.startsWith('http') ? img : `http://localhost:5000${img}`} alt={`Screenshot ${idx + 1}`} />
            <div className="thumb-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </div>
          </div>
        ))}
      </div>

      {selectedImg && (
        <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImg(null)}>×</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImg.startsWith('http') ? selectedImg : `http://localhost:5000${selectedImg}`} alt="Enlarged screenshot" />
          </div>
        </div>
      )}

      <style jsx>{`
        .screenshot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--space-4);
        }
        .screenshot-thumb {
          aspect-ratio: 16/9;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-default);
          position: relative;
          cursor: pointer;
        }
        .screenshot-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .screenshot-thumb:hover img {
          transform: scale(1.1);
        }
        .thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(108, 99, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          color: white;
        }
        .screenshot-thumb:hover .thumb-overlay {
          opacity: 1;
        }
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .lightbox-content img {
          max-width: 100%;
          max-height: 85vh;
          border-radius: var(--radius-md);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .lightbox-close {
          position: absolute;
          top: 30px;
          right: 30px;
          font-size: 40px;
          color: white;
          opacity: 0.6;
        }
        .lightbox-close:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ScreenshotGallery;
