const formatResponse = (status, message, data = null, meta = null) => {
  const response = {
    status,
    message,
  };
  if (data !== null) {
    response.data = data;
  }
  if (meta !== null) {
    response.meta = meta;
  }
  return response;
};

const successResponse = (message, data = null, meta = null) => {
  return formatResponse('success', message, data, meta);
};

const errorResponse = (message, data = null) => {
  return formatResponse('error', message, data);
};

module.exports = {
  successResponse,
  errorResponse,
};
