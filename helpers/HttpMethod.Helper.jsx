/**
 * A helper module that exports an object containing common HTTP methods and an instance of the Axios library with custom interceptors.
 * @module HttpServices
 */

import axios from 'axios';

/**
 * A function that handles Axios response errors and redirects the user to the appropriate page or displays an error message.
 * @function renderByStatusCode
 * @param {number} statusCode - The status code of the HTTP response.
 */
const renderByStatusCode = (statusCode) => {
  switch (statusCode) {
    // case 404:
    //   Navigate to home page
    //   break;

    default:
      break;
  }
};

/**
 * An array that stores all pending Axios requests along with their unique IDs and cancel methods.
 * @type {Object[]}
 */
const allPendingRequestsRecord = [];

/**
 * A function that generates a unique ID for a request based on its URL and method.
 * @function getUniqueId
 * @param {Object} config - The configuration object for an Axios request.
 * @returns {string} A string representing the unique ID for the request.
 */
const getUniqueId = (config) => `url=${config.url}&method=${config.method}`;

/**
 * Axios interceptor that adds a cancel token to a request's configuration object and stores its unique ID and cancel method in the allPendingRequestsRecord array.
 * @param {Object} configurations - The configuration object for an Axios request.
 * @returns {Object} The modified configuration object with a cancel token and updated headers.
 */
axios.interceptors.request.use(
  (configurations) => {
    const configurationsLocal = configurations;
    configurationsLocal.cancelToken = new axios.CancelToken((cancel) => {
      // Add record, record the unique value of the request and cancel method
      allPendingRequestsRecord.push({ id: getUniqueId(configurations), cancel });
    });

    configurationsLocal.headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;

    return configurationsLocal;
  },
  /**
   * Axios error interceptor that rejects a Promise with the error.
   * @param {Object} error - The error object.
   * @returns {Promise} A rejected Promise with the error.
   */
  (error) => {
    Promise.reject(error);
  }
);

/**
 * A function that cancels all pending Axios requests by invoking their cancel methods and removes them from the allPendingRequestsRecord array.
 * @function removeAllPendingRequestsRecordHttp
 */
export const removeAllPendingRequestsRecordHttp = () => {
  allPendingRequestsRecord.forEach((item) => {
    item.cancel('page changes'); // cancel request
  });
  allPendingRequestsRecord.splice(0); // remove all records
};

// interceptors for handle any response
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) return Promise.reject(error);
    const {
      response: { status },
    } = error;
    // If Session is out of date clear the cookies and local storage then redirect to login page.
    if (error?.response?.data?.token_error) {
      //   Navigate to login page

      return true;
    }

    renderByStatusCode(status);
    return Promise.reject(error);
  }
);

export const HttpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios: axios,
};
