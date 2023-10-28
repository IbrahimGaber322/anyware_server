/**
 * Handler for Internal Server Error response.
 * @param {object} res - The response object from Express
 * @param {Error} error - The error object to be sent in the response
 * @returns {object} - Returns a JSON response with a 500 status code and error message
 */
const internalServerError = (res, error) => {
  // Console log the error (for debugging purposes)
  // console.log('~ error', error);
  
  // Sending a JSON response with a 500 status code and error details
  return res.status(500).json({
    message: 'Internal Server Error',
    error,
  });
};

export default internalServerError;
