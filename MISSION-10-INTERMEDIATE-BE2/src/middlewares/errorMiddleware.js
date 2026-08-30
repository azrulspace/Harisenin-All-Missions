const { errorResponse } = require('../utils/responseFormatter');
const { Prisma } = require('@prisma/client');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let data = null;

  // Handle Prisma specific errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409; // Conflict
      message = `Unique constraint failed on the field(s): ${err.meta?.target}`;
    }
  }

  res.status(statusCode).json(errorResponse(message, data));
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json(errorResponse(`Route ${req.originalUrl} not found`));
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
