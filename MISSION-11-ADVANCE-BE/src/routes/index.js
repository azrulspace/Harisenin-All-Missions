const express = require('express');
const authRoutes = require('./authRoutes'); 
const uploadRoutes = require('./uploadRoutes'); 
const courseRoutes = require('./courseRoutes');
const adminRoutes = require('./adminRoutes');
const learnerRoutes = require('./learnerRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'API V1 is up and running!' });
});

router.use('/auth', authRoutes); 
router.use('/upload', uploadRoutes); 
router.use('/courses', courseRoutes);
router.use('/admin', adminRoutes);
router.use('/learner', learnerRoutes);

module.exports = router;
