const prisma = require('../config/prisma');
const { generateToken } = require('../utils/jwtHelper');
const { hashPassword, comparePassword } = require('../utils/passwordHelper');

const registerUser = async (data) => {
  const { fullName, email, password, phoneNumber } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw Object.assign(new Error('Email already registered'), { statusCode: 400 });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user in DB
  const newUser = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash: hashedPassword,
      phoneNumber,
      role: 'STUDENT',
    },
  });

  return {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    role: newUser.role,
  };
};

const loginUser = async (email, password) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }

  // Verify password
  const isMatch = await comparePassword(password, user.passwordHash);

  if (!isMatch) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }

  // Generate JWT token
  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = generateToken(payload);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
