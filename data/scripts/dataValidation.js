require('dotenv').config({ path: '../../server/.env' });
const mongoose = require('mongoose');
const Scheme = require('../../server/src/models/Scheme');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/welfare-schemes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const validateData = async () => {
  try {
    await connectDB();
    
    const schemes = await Scheme.find({});
    console.log(`\nTotal schemes in database: ${schemes.length}\n`);
    
    // Validation checks
    const validationResults = {
      total: schemes.length,
      missingFields: [],
      invalidYears: [],
      invalidThemes: [],
      invalidPMs: []
    };
    
    schemes.forEach((scheme, index) => {
      // Check for missing required fields
      if (!scheme.title || !scheme.description || !scheme.ministry) {
        validationResults.missingFields.push({
          id: scheme._id,
          title: scheme.title || 'No title',
          missing: []
        });
        if (!scheme.title) validationResults.missingFields[validationResults.missingFields.length - 1].missing.push('title');
        if (!scheme.description) validationResults.missingFields[validationResults.missingFields.length - 1].missing.push('description');
        if (!scheme.ministry) validationResults.missingFields[validationResults.missingFields.length - 1].missing.push('ministry');
      }
      
      // Check for invalid years
      const currentYear = new Date().getFullYear();
      if (scheme.year < 1947 || scheme.year > currentYear) {
        validationResults.invalidYears.push({
          id: scheme._id,
          title: scheme.title,
          year: scheme.year
        });
      }
    });
    
    // Display results
    console.log('=== VALIDATION RESULTS ===\n');
    
    if (validationResults.missingFields.length > 0) {
      console.log(`⚠️  Found ${validationResults.missingFields.length} schemes with missing fields:`);
      validationResults.missingFields.forEach(item => {
        console.log(`   - ${item.title}: Missing ${item.missing.join(', ')}`);
      });
      console.log('');
    } else {
      console.log('✓ All schemes have required fields\n');
    }
    
    if (validationResults.invalidYears.length > 0) {
      console.log(`⚠️  Found ${validationResults.invalidYears.length} schemes with invalid years:`);
      validationResults.invalidYears.forEach(item => {
        console.log(`   - ${item.title}: Year ${item.year}`);
      });
      console.log('');
    } else {
      console.log('✓ All years are valid\n');
    }
    
    // Statistics
    console.log('=== STATISTICS ===\n');
    
    const yearCounts = {};
    const ministryCounts = {};
    const themeCounts = {};
    const pmCounts = {};
    
    schemes.forEach(scheme => {
      yearCounts[scheme.year] = (yearCounts[scheme.year] || 0) + 1;
      ministryCounts[scheme.ministry] = (ministryCounts[scheme.ministry] || 0) + 1;
      themeCounts[scheme.theme] = (themeCounts[scheme.theme] || 0) + 1;
      pmCounts[scheme.primeMinister] = (pmCounts[scheme.primeMinister] || 0) + 1;
    });
    
    console.log('Schemes by Year:');
    Object.entries(yearCounts).sort((a, b) => b[0] - a[0]).forEach(([year, count]) => {
      console.log(`   ${year}: ${count}`);
    });
    
    console.log('\nSchemes by Theme:');
    Object.entries(themeCounts).sort((a, b) => b[1] - a[1]).forEach(([theme, count]) => {
      console.log(`   ${theme}: ${count}`);
    });
    
    console.log('\nSchemes by Prime Minister:');
    Object.entries(pmCounts).forEach(([pm, count]) => {
      console.log(`   ${pm}: ${count}`);
    });
    
    console.log('\n=== VALIDATION COMPLETE ===\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error validating data:', error);
    process.exit(1);
  }
};

validateData();
