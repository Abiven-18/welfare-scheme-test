const fs = require('fs');
const path = require('path');

// Data file paths
const DATA_DIR = path.join(__dirname, '../../data');
const SCHEMES_FILE = path.join(DATA_DIR, 'schemes.json');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(SCHEMES_FILE)) {
  fs.writeFileSync(SCHEMES_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(FEEDBACK_FILE)) {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([], null, 2));
}

// Read data from file
const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

// Write data to file
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
};

// Helper to normalize comparable strings (e.g., ministries)
const normalize = (str) =>
  String(str || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, ' ')
    .trim();

// Scheme operations
const schemes = {
  getAll: () => readData(SCHEMES_FILE),
  
  getById: (id) => {
    const allSchemes = readData(SCHEMES_FILE);
    return allSchemes.find(scheme => scheme.id === id);
  },
  
  create: (schemeData) => {
    const allSchemes = readData(SCHEMES_FILE);
    allSchemes.push(schemeData);
    writeData(SCHEMES_FILE, allSchemes);
    return schemeData;
  },
  
  update: (id, schemeData) => {
    const allSchemes = readData(SCHEMES_FILE);
    const index = allSchemes.findIndex(scheme => scheme.id === id);
    if (index === -1) return null;
    
    allSchemes[index] = { ...allSchemes[index], ...schemeData };
    writeData(SCHEMES_FILE, allSchemes);
    return allSchemes[index];
  },
  
  delete: (id) => {
    const allSchemes = readData(SCHEMES_FILE);
    const filtered = allSchemes.filter(scheme => scheme.id !== id);
    if (filtered.length === allSchemes.length) return false;
    
    writeData(SCHEMES_FILE, filtered);
    return true;
  },
  
  search: (query) => {
    const allSchemes = readData(SCHEMES_FILE);
    const lowerQuery = query.toLowerCase();
    return allSchemes.filter(scheme => 
      scheme.title.toLowerCase().includes(lowerQuery) ||
      scheme.description.toLowerCase().includes(lowerQuery)
    );
  },
  
  filter: (filters) => {
    let allSchemes = readData(SCHEMES_FILE);
    
    if (filters.year) {
      allSchemes = allSchemes.filter(s => s.year === parseInt(filters.year));
    }
    if (filters.ministry) {
      const target = normalize(filters.ministry);
      allSchemes = allSchemes.filter(s => normalize(s.ministry) === target);
    }
    if (filters.theme) {
      allSchemes = allSchemes.filter(s => s.theme === filters.theme);
    }
    if (filters.primeMinister) {
      allSchemes = allSchemes.filter(s => s.primeMinister === filters.primeMinister);
    }
    if (filters.search) {
      const lowerQuery = filters.search.toLowerCase();
      allSchemes = allSchemes.filter(s => 
        s.title.toLowerCase().includes(lowerQuery) ||
        s.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    return allSchemes;
  },
  
  getFilterOptions: () => {
    const allSchemes = readData(SCHEMES_FILE);
    
    const years = [...new Set(allSchemes.map(s => s.year))].sort((a, b) => b - a);
    const ministries = [...new Set(allSchemes.map(s => s.ministry))].sort();
    const themes = [...new Set(allSchemes.map(s => s.theme))].sort();
    const primeMinsters = [...new Set(allSchemes.map(s => s.primeMinister))].sort();
    
    return { years, ministries, themes, primeMinsters };
  }
};

// Feedback operations
const feedback = {
  getAll: () => readData(FEEDBACK_FILE),
  
  getById: (id) => {
    const allFeedback = readData(FEEDBACK_FILE);
    return allFeedback.find(f => f.id === id);
  },
  
  create: (feedbackData) => {
    const allFeedback = readData(FEEDBACK_FILE);
    allFeedback.push(feedbackData);
    writeData(FEEDBACK_FILE, allFeedback);
    return feedbackData;
  },
  
  update: (id, feedbackData) => {
    const allFeedback = readData(FEEDBACK_FILE);
    const index = allFeedback.findIndex(f => f.id === id);
    if (index === -1) return null;
    
    allFeedback[index] = { ...allFeedback[index], ...feedbackData };
    writeData(FEEDBACK_FILE, allFeedback);
    return allFeedback[index];
  },
  
  delete: (id) => {
    const allFeedback = readData(FEEDBACK_FILE);
    const filtered = allFeedback.filter(f => f.id !== id);
    if (filtered.length === allFeedback.length) return false;
    
    writeData(FEEDBACK_FILE, filtered);
    return true;
  }
};

module.exports = {
  schemes,
  feedback
};
