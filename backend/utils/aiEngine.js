const generateSuggestions = (goalText) => {
  if (!goalText) return [];
  const textLower = goalText.toLowerCase();
  const suggestions = [];
  
  const keywordMap = {
    'auth': 'Implement JWT or OAuth for secure authentication',
    'payment': 'Integrate Stripe or PayPal for processing payments',
    'database': 'Optimize database schemas and add indexing for better performance',
    'search': 'Add full-text search capability or fuzzy search',
    'ui': 'Improve UI/UX with better responsiveness and animations',
    'api': 'Ensure RESTful API principles and rate limiting',
    'cache': 'Implement Redis caching to reduce database load',
    'test': 'Add unit and integration testing suite'
  };

  for (const [key, value] of Object.entries(keywordMap)) {
    if (textLower.includes(key)) {
      suggestions.push({
        text: value,
        role: 'ai',
        authorName: 'AI Analyzer',
        votes: 0
      });
    }
  }

  // If no keywords matched, provide default suggestions
  if (suggestions.length === 0) {
    suggestions.push({
      text: 'Add comprehensive README and documentation',
      role: 'ai',
      authorName: 'AI Analyzer',
      votes: 0
    });
    suggestions.push({
      text: 'Implement robust error handling and logging',
      role: 'ai',
      authorName: 'AI Analyzer',
      votes: 0
    });
  }

  return suggestions.slice(0, 5);
};

module.exports = { generateSuggestions };
