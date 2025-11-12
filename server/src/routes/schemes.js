const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');
const upload = require('../config/storage');
const { validateScheme } = require('../middleware/validation');

// Get filter options
router.get('/filters', schemeController.getFilterOptions);

// Get all schemes with filters
router.get('/', schemeController.getSchemes);

// Get single scheme
router.get('/:id', schemeController.getSchemeById);

// Download scheme document
router.get('/:id/download', schemeController.downloadDocument);

// Create new scheme
router.post('/', upload.single('document'), validateScheme, schemeController.createScheme);

// Update scheme
router.put('/:id', upload.single('document'), validateScheme, schemeController.updateScheme);

// Delete scheme
router.delete('/:id', schemeController.deleteScheme);

module.exports = router;
