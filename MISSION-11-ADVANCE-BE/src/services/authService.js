const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const prisma = require('../config/prisma');

const registerUser = async (data) => {
  const { fullName, email, password, role } = data;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw Object.assign(new Error('Email already exists'), { statusCode: 400 });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const verificationToken = uuidv4();

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
      role: role || 'STUDENT',
      verificationToken,
    },
  });

  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const verificationUrl = `http://localhost:${process.env.PORT || 5000}/api/v1/auth/verify-email/${verificationToken}`;
  
  const info = await transporter.sendMail({
    from: '"LMS Edu Course" <no-reply@lmsedu.com>',
    to: user.email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking: ${verificationUrl}`,
    html: `<p>Please verify your email by clicking: <a href="${verificationUrl}">Verify Email</a></p>`,
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  const { passwordHash: _, verificationToken: __, ...userWithoutSensitiveData } = user;
  return userWithoutSensitiveData;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || !user.passwordHash) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, isVerified: user.isVerified },
    process.env.JWT_SECRET || 'supersecret',
    { expiresIn: '1d' }
  );

  const { passwordHash: _, verificationToken: __, ...userWithoutSensitiveData } = user;
  return { user: userWithoutSensitiveData, token };
};

const verifyUserEmail = async (token) => {
  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  });

  if (!user) {
    throw Object.assign(new Error('Invalid Verification Token'), { statusCode: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
    },
  });

  return 'Email Verified Successfully';
};

module.exports = {
  registerUser,
  loginUser,
  verifyUserEmail,
};
