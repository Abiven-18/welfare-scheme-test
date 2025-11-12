const { feedback: feedbackStore } = require('../config/dataStore');

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { v4: uuidv4 } = require('uuid');
    const feedbackData = {
      id: uuidv4(),
      ...req.body,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const newFeedback = feedbackStore.create(feedbackData);
    
    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: newFeedback
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all feedback (admin)
exports.getAllFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    let allFeedback = feedbackStore.getAll();
    
    // Filter by status if provided
    if (status) {
      allFeedback = allFeedback.filter(f => f.status === status);
    }
    
    // Sort by creation date (newest first)
    allFeedback.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Pagination
    const total = allFeedback.length;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const feedback = allFeedback.slice(skip, skip + parseInt(limit));
    
    res.json({
      feedback,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update feedback status
exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const feedback = feedbackStore.update(req.params.id, { 
      status,
      updatedAt: new Date().toISOString()
    });
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const deleted = feedbackStore.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
