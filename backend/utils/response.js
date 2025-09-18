// Standardized API Response Utility

const sendResponse = (res, statusCode, success, message, data = null, error = null) => {
  const response = {
    success,
    message,
    ...(data && { data }),
    ...(error && { error }),
    timestamp: new Date().toISOString(),
  };

  return res.status(statusCode).json(response);
};

// Success responses
const success = {
  ok: (res, message, data) => sendResponse(res, 200, true, message, data),
  created: (res, message, data) => sendResponse(res, 201, true, message, data),
  noContent: (res, message) => sendResponse(res, 204, true, message),
};

// Error responses
const error = {
  badRequest: (res, message, error) => sendResponse(res, 400, false, message, null, error),
  unauthorized: (res, message = 'Unauthorized') => sendResponse(res, 401, false, message),
  forbidden: (res, message = 'Forbidden') => sendResponse(res, 403, false, message),
  notFound: (res, message = 'Not Found') => sendResponse(res, 404, false, message),
  conflict: (res, message, error) => sendResponse(res, 409, false, message, null, error),
  validationError: (res, message, error) => sendResponse(res, 422, false, message, null, error),
  tooManyRequests: (res, message = 'Too Many Requests') => sendResponse(res, 429, false, message),
  internalServerError: (res, message = 'Internal Server Error', error) => 
    sendResponse(res, 500, false, message, null, error),
};

module.exports = {
  success,
  error,
  sendResponse,
};
