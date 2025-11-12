// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Multer file upload error
  if (err.name === 'MulterError') {
    return res.status(400).json({
      message: `File upload error: ${err.message}`
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

// 404 handler
const notFound = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  });
};

module.exports = { errorHandler, notFound };
