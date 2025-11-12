const { schemes: schemeStore } = require('../config/dataStore');
const path = require('path');
const fs = require('fs');

// Get all schemes with filters
exports.getSchemes = async (req, res) => {
  try {
    const { year, ministry, theme, primeMinister, search, page = 1, limit = 12 } = req.query;
    
    // Get filtered schemes
    let schemes = schemeStore.filter({ year, ministry, theme, primeMinister, search });
    
    // Sort by year (newest first)
    schemes.sort((a, b) => b.year - a.year);
    
    // Pagination
    const total = schemes.length;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    schemes = schemes.slice(skip, skip + parseInt(limit));
    
    res.json({
      schemes,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalSchemes: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single scheme by ID
exports.getSchemeById = async (req, res) => {
  try {
    const scheme = schemeStore.getById(req.params.id);
    
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new scheme
exports.createScheme = async (req, res) => {
  try {
    const { v4: uuidv4 } = require('uuid');
    const schemeData = {
      id: uuidv4(),
      ...req.body,
      documentPath: req.file ? req.file.filename : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const newScheme = schemeStore.create(schemeData);
    
    res.status(201).json(newScheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update scheme
exports.updateScheme = async (req, res) => {
  try {
    const scheme = schemeStore.getById(req.params.id);
    
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    
    // If new file uploaded, delete old file
    if (req.file && scheme.documentPath) {
      const oldFilePath = path.join(__dirname, '../../uploads', scheme.documentPath);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    
    const updateData = {
      ...req.body,
      documentPath: req.file ? req.file.filename : scheme.documentPath,
      updatedAt: new Date().toISOString()
    };
    
    const updatedScheme = schemeStore.update(req.params.id, updateData);
    
    res.json(updatedScheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete scheme
exports.deleteScheme = async (req, res) => {
  try {
    const scheme = schemeStore.getById(req.params.id);
    
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    
    // Delete associated file
    if (scheme.documentPath) {
      const filePath = path.join(__dirname, '../../uploads', scheme.documentPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    schemeStore.delete(req.params.id);
    
    res.json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download scheme document
exports.downloadDocument = async (req, res) => {
  try {
    const scheme = schemeStore.getById(req.params.id);
    
    if (!scheme || !scheme.documentPath) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    const filePath = path.join(__dirname, '../../uploads', scheme.documentPath);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }
    
    res.download(filePath, `${scheme.title}.pdf`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get filter options
exports.getFilterOptions = async (req, res) => {
  try {
    const filterOptions = schemeStore.getFilterOptions();
    res.json(filterOptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
