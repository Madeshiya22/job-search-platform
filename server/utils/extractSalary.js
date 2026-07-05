export const extractSalary = (description, currency) => {
  const result = {
    raw: "",
    min: null,
    max: null,
    currency: currency || "USD"
  };

  if (!description) return result;

  // Look for patterns like $84,500 - $140,800
  // Or 80k - 100k
  // Or $120,000
  const rangeRegex = /\$?\s*([\d,]+(?:\.\d+)?(?:k)?)\s*(?:-|to)\s*\$?\s*([\d,]+(?:\.\d+)?(?:k)?)/i;
  const singleRegex = /(?:salary|pay|compensation).*?\$?\s*([\d,]+(?:\.\d+)?(?:k)?)/i;

  const rangeMatch = description.match(rangeRegex);
  
  const parseNumber = (str) => {
    if (!str) return null;
    let numStr = str.replace(/,/g, '');
    let multiplier = 1;
    if (numStr.toLowerCase().includes('k')) {
      multiplier = 1000;
      numStr = numStr.replace(/k/i, '');
    }
    const val = parseFloat(numStr);
    return isNaN(val) ? null : val * multiplier;
  };

  if (rangeMatch) {
    result.raw = rangeMatch[0].trim();
    result.min = parseNumber(rangeMatch[1]);
    result.max = parseNumber(rangeMatch[2]);
  } else {
    const singleMatch = description.match(singleRegex);
    if (singleMatch) {
      result.raw = singleMatch[0].trim();
      result.min = parseNumber(singleMatch[1]);
      result.max = parseNumber(singleMatch[1]);
    }
  }

  return result;
};
