import React from 'react';

const SuggestionCard = ({ suggestion, onVote }) => {
  return (
    <div className="suggestion-card">
      <div className="suggestion-header">
        <div>
          <span className={`badge ${suggestion.type === 'ai' ? 'badge-ai' : 'badge-peer'} me-2`}>
            {suggestion.type === 'ai' ? '🤖 AI Engine' : (suggestion.authorName.includes('Teacher') ? '👨‍🏫 Teacher' : '👥 Peer')}
          </span>
          <span className="text-muted small">By {suggestion.authorName}</span>
        </div>
        <button className="vote-btn" onClick={() => onVote(suggestion._id)}>
          <span role="img" aria-label="upvote">👍</span> {suggestion.voteCount}
        </button>
      </div>
      <p className="mb-2">{suggestion.suggestionText}</p>
      <div className="d-flex gap-2">
        <span className="badge bg-secondary">{suggestion.sizeLabel}</span>
        <span className="badge bg-dark border">{suggestion.estimatedDays}</span>
      </div>
    </div>
  );
};

export default SuggestionCard;
