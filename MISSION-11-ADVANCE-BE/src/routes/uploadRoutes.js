const express = require('express');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No file uploaded' });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;

  res.status(200).json({
    status: 'success',
    message: 'File uploaded successfully',
    data: {
      url: fileUrl,
    },
  });
});

module.exports = router;
