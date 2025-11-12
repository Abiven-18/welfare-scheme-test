const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { validateFeedback } = require('../middleware/validation');

// Create feedback
router.post('/', validateFeedback, feedbackController.createFeedback);

// Get all feedback (admin)
router.get('/', feedbackController.getAllFeedback);

// Update feedback status
router.patch('/:id/status', feedbackController.updateFeedbackStatus);

// Delete feedback
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
