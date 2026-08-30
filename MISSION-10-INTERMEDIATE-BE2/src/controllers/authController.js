const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json(errorResponse('Name, email, and password are required'));
    }

    const result = await authService.registerUser(req.body);

    res.status(201).json(successResponse('User registered successfully', result));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(errorResponse(error.message));
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(errorResponse('Email and password are required'));
    }

    const result = await authService.loginUser(email, password);

    res.status(200).json(successResponse('Login successful', result));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(errorResponse(error.message));
    }
    next(error);
  }
};

const sendOtp = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json(errorResponse('Phone number is required'));
    }

    res.status(200).json(successResponse(`OTP sent to ${phoneNumber}`));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  sendOtp,
};
