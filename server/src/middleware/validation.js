const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Scheme validation rules
exports.validateScheme = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('ministry').trim().notEmpty().withMessage('Ministry is required'),
  body('year').isInt({ min: 1947, max: new Date().getFullYear() }).withMessage('Invalid year'),
  body('primeMinister').trim().notEmpty().withMessage('Prime Minister is required'),
  body('theme').trim().notEmpty().withMessage('Theme is required'),
  validate
];

// Feedback validation rules
exports.validateFeedback = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  validate
];
