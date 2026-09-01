const express = require('express');
const authRoutes = require('./authRoutes'); // Placeholder for auth routes
const uploadRoutes = require('./uploadRoutes'); // Placeholder for upload routes
const courseRoutes = require('./courseRoutes');
const adminRoutes = require('./adminRoutes');
const learnerRoutes = require('./learnerRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'API V1 is up and running!' });
});

router.use('/auth', authRoutes); // Placeholder for auth routes
router.use('/upload', uploadRoutes); // Placeholder for upload routes
router.use('/courses', courseRoutes);
router.use('/admin', adminRoutes);

// For learner routes, we map them directly to /learner
router.use('/learner', learnerRoutes);

module.exports = router;
