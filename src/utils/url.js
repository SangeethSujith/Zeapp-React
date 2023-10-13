/**
 * Parse URL parameters from the current window location.
 * @returns {Object} An object containing the parsed URL parameters.
 */
export const parseURLParams = () => {
    const { searchParams } = new URL(window.location);
    return Object.fromEntries(searchParams.entries());
};

/**
 * Parse URL parameters from a specific URL string.
 * @param {string} url - The URL string to parse.
 * @returns {Object} An object containing the parsed URL parameters.
 */
export const parseURLParamsFromURL = (url) => {
    const { searchParams } = new URL(url);
    return Object.fromEntries(searchParams.entries());
};

/**
 * Build a URL with parameters.
 * @param {string} baseUrl - The base URL to build upon.
 * @param {Object} params - An object containing the parameters to append to the URL.
 * @returns {string} The complete URL with parameters.
 */
export const buildURLWithParams = (baseUrl, params) => {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    return url.toString();
};

/**
 * Get a specific URL parameter value.
 * @param {string} paramName - The name of the parameter to retrieve.
 * @returns {string|null} The value of the URL parameter, or null if not found.
 */
export const getURLParam = (paramName) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(paramName);
};

/**
 * Remove a specific URL parameter.
 * @param {string} paramName - The name of the parameter to remove.
 * @param {URLSearchParams} searchParams - (Optional) The URLSearchParams object to modify. Defaults to the current window's searchParams.
 */
export const removeURLParam = (paramName, searchParams = new URLSearchParams(window.location.search)) => {
    searchParams.delete(paramName);
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newURL);
};

/**
 * Update a specific URL parameter.
 * @param {string} paramName - The name of the parameter to update.
 * @param {string} paramValue - The new value for the parameter.
 * @param {URLSearchParams} searchParams - (Optional) The URLSearchParams object to modify. Defaults to the current window's searchParams.
 */
export const updateURLParam = (paramName, paramValue, searchParams = new URLSearchParams(window.location.search)) => {
    searchParams.set(paramName, paramValue);
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newURL);
};

/**
 * Check if a specific URL parameter exists.
 * @param {string} paramName - The name of the parameter to check.
 * @returns {boolean} True if the parameter exists, false otherwise.
 */
export const hasURLParam = (paramName) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.has(paramName);
};

/**
 * Get all URL parameters as an object.
 * @returns {Object} An object containing all URL parameters.
 */
export const getAllURLParams = () => {
    const { searchParams } = new URL(window.location);
    return Object.fromEntries(searchParams.entries());
};

/**
 * Clear all URL parameters.
 */
export const clearURLParams = () => {
    const newURL = `${window.location.pathname}`;
    window.history.replaceState(null, '', newURL);
};

/**
 * Replace the current URL with a new URL.
 * @param {string} newURL - The new URL to replace with.
 */
export const replaceURL = (newURL) => {
    window.history.replaceState(null, '', newURL);
};

/**
 * Append a new URL parameter.
 * @param {string} paramName - The name of the parameter to append.
 * @param {string} paramValue - The value of the parameter to append.
 * @param {URLSearchParams} searchParams - (Optional) The URLSearchParams object to modify. Defaults to the current window's searchParams.
 */
export const appendURLParam = (paramName, paramValue, searchParams = new URLSearchParams(window.location.search)) => {
    searchParams.append(paramName, paramValue);
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newURL);
};

/**
 * Merge multiple URL parameters into the current URL.
 * @param {Object} params - An object containing the parameters to merge.
 * @param {URLSearchParams} searchParams - (Optional) The URLSearchParams object to modify. Defaults to the current window's searchParams.
 */
export const mergeURLParams = (params, searchParams = new URLSearchParams(window.location.search)) => {
    Object.entries(params).forEach(([key, value]) => searchParams.set(key, value));
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newURL);
};

/**
 * Keep only specified URL parameters, removing all others.
 * @param {string[]} paramNames - An array of parameter names to keep.
 * @param {URLSearchParams} searchParams - (Optional) The URLSearchParams object to modify. Defaults to the current window's searchParams.
 */
export const keepURLParams = (paramNames, searchParams = new URLSearchParams(window.location.search)) => {
    Array.from(searchParams.keys()).forEach((key) => {
        if (!paramNames.includes(key)) {
            searchParams.delete(key);
        }
    });
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newURL);
};

/**
 * Remove multiple URL parameters.
 * @param {string[]} paramNames - An array of parameter names to remove.
 * @param {URLSearchParams} searchParams - (Optional) The URLSearchParams object to modify. Defaults to the current window's searchParams.
 */
export const removeMultipleURLParams = (paramNames, searchParams = new URLSearchParams(window.location.search)) => {
    paramNames.forEach((paramName) => {
        searchParams.delete(paramName);
    });
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newURL);
};

/**
 * Get the current URL path.
 * @returns {string} The URL path.
 */
export const getURLPath = () => window.location.pathname;

/**
 * Get the base URL.
 * @returns {string} The base URL.
 */
export const getBaseURL = () => window.location.origin;

/**
 * Navigate to a specific URL.
 * @param {string} url - The URL to navigate to.
 */
export const navigateToURL = (url) => {
    window.location.href = url;
};

/**
 * Refresh the current page.
 */
export const refreshPage = () => {
    window.location.reload();
};
