/* eslint-disable arrow-body-style */
/**
 * @param {string} id
 * @returns scroll to provided id element
 */
export const scrollToId = (id) => {
    return document.getElementById(id).scrollIntoView()
}

/**
 * @description debounce to delay network requests
 * @param {Function} -- callback function to be called after the delay
 * @param {Number} -- delay in milliseconds
 * @returns {Function} -- debounced function
 */
export const debounce = (callbackFn, delay = 500) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callbackFn(...args)
        }, delay)
    }
}
