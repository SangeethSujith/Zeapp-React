const base_url = import.meta.env.VITE_API_URL_IMAGE;
export default function parseReasoningQuestions(jsonData) {
  if (!jsonData || !Array.isArray(jsonData)) {
    return jsonData;
  }

  const baseFeatures = {
    time: [],
    selected: [],
  };

  return jsonData.map((item) => {
    // Clone the item and add baseFeatures
    const updatedItem = { ...item, ...baseFeatures };

    // Update string values in the object
    for (const key in updatedItem) {
      if (typeof updatedItem[key] === "string") {
        updatedItem[key] = parseString(updatedItem[key]);
      }
    }

    return updatedItem;
  });
}

function parseString(stringData = "") {
  if (!stringData) return "";

  // Update image source URLs
  return updateImageSrc(stringData);
}

function updateImageSrc(htmlString, prefix = base_url) {
  if (!htmlString) return htmlString;

  const imgSrcRegex = /<img[^>]*\ssrc=["']([^"']*)["']/g;

  // Use a function to update img src attributes
  function updateSrc(match, src) {
    if (src) {
      const cleanedSrc = getCleanPath(src);
      const updatedSrc = `src="${prefix}${cleanedSrc}"`;
      return `<img ${updatedSrc}`;
    }
    return match;
  }

  return htmlString.replace(imgSrcRegex, updateSrc);
}

function getCleanPath(imagePath) {
  const cleanedPath = imagePath
    .split("/")
    .filter((segment) => segment !== "." && segment !== "..")
    .join("/");

  return cleanedPath;
}
