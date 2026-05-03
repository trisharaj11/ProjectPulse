const estimateTime = (sizeLabel) => {
  switch (sizeLabel) {
    case 'Small':
      return '1-2 days';
    case 'Medium':
      return '3-5 days';
    case 'Large':
      return '1-2 weeks';
    default:
      return 'Unknown';
  }
};

module.exports = { estimateTime };
