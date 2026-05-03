const validateLiveLink = (url) => {
  if (!url) return { valid: false, message: 'URL is empty' };
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return { valid: true, message: 'Valid' };
    }
    return { valid: false, message: 'Must start with http:// or https://' };
  } catch (error) {
    return { valid: false, message: 'Invalid URL format' };
  }
};

const validateAtLeastOne = ({ zipFile, liveLink, screenshots, reportFile }) => {
  let hasSubmission = false;

  if (zipFile) {
    hasSubmission = true;
  }

  if (liveLink && validateLiveLink(liveLink).valid) {
    hasSubmission = true;
  }

  if (screenshots && Array.isArray(screenshots) && screenshots.length > 0) {
    hasSubmission = true;
  }

  if (reportFile) {
    hasSubmission = true;
  }

  if (!hasSubmission) {
    throw new Error('Please provide at least one submission: ZIP file, live link, screenshots, or PDF report');
  }

  return true;
};

module.exports = { validateLiveLink, validateAtLeastOne };
