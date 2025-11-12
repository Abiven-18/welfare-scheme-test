const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Schemes data from CSV
// NOTE: Place your PDF files in server/uploads/ directory
// Then reference them using the documentPath field (just the filename)
const sampleSchemes = [
  {
    id: uuidv4(),
    title: 'Minimum Support Price (MSP)',
    description: 'The Minimum Support Price (MSP) is a government price-support mechanism where the state announces floor prices for selected crops and procures produce at those prices to protect farmers against sharp price falls, stabilise production incentives, and maintain food stocks. MSPs are recommended by CACP and implemented via procurement agencies and the Price Support Scheme.',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    year: 1966,
    primeMinister: 'Lal Bahadur Shastri',
    theme: 'Agriculture',
    beneficiaries: 'Farmers',
    eligibility: 'Farmers growing crops covered under MSP scheme.',
    benefits: '- Guaranteed minimum price for crops\n- Protection against price volatility\n- Procurement by government agencies\n- Stabilized farm income',
    applicationProcess: 'Farmers can sell their produce at designated procurement centers during the procurement season.',
    officialWebsite: 'https://dfpd.gov.in/msp-for-wheat-and-rice/en',
    documentPath: 'msp.pdf',
    status: 'Active',
    tags: ['agriculture', 'price support', 'food security', 'msp', 'farmers', 'crop msp', 'rural livelihood'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Mid-Day Meal Scheme (PM POSHAN)',
    description: 'The Mid-Day Meal scheme aims to provide a nutritious meal on every school day for children in eligible schools, thereby combating classroom hunger, improving school enrolment, attendance and retention, enhancing nutritional status of children, and supporting equitable access to elementary education across India.',
    ministry: 'Ministry of Education',
    year: 1995,
    primeMinister: 'P. V. Narasimha Rao',
    theme: 'Education',
    beneficiaries: 'Children',
    eligibility: 'Children enrolled in government and government-aided schools.',
    benefits: '- Free nutritious meal daily\n- Improved school attendance and retention\n- Better nutritional status\n- Enhanced learning outcomes\n- Reduced classroom hunger',
    applicationProcess: 'Automatic coverage for all eligible school children. No separate application required.',
    officialWebsite: 'https://pmposhan-ams.education.gov.in/',
    documentPath: 'pm-poshan.pdf',
    status: 'Active',
    tags: ['school meals', 'midday meal', 'pm poshan', 'children', 'child nutrition', 'education'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Indira Awas Yojana (PMAY-Gramin)',
    description: 'Indira Awaas Yojana (IAY) was a flagship rural housing programme to provide financial assistance for construction and upgradation of dwelling units to the rural poor (especially SC/ST, freed bonded labourers and BPL households). The scheme reduced homelessness in villages and later formed the core of the restructured PMAY-Gramin for housing-for-all goals.',
    ministry: 'Ministry of Rural Development',
    year: 1985,
    primeMinister: 'Rajiv Gandhi',
    theme: 'Rural Development',
    beneficiaries: 'Rural groups',
    eligibility: 'Rural poor households, especially SC/ST, freed bonded labourers, and BPL families without pucca housing.',
    benefits: '- Financial assistance for house construction\n- Upgradation of dwelling units\n- Reduced rural homelessness\n- Improved living conditions\n- Priority to SC/ST and vulnerable groups',
    applicationProcess: 'Apply through local Gram Panchayat or Block Development Office with income and caste certificates.',
    officialWebsite: 'https://pmayg.dord.gov.in/netiayHome/home.aspx',
    documentPath: 'pmay-gramin.pdf',
    status: 'Active',
    tags: ['rural housing', 'iay', 'pmay-g', 'bpl', 'rural livelihood'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// File paths
const SCHEMES_FILE = path.join(__dirname, '../../server/data/schemes.json');
const DATA_DIR = path.join(__dirname, '../../server/data');

// Import data
const importData = () => {
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('Created data directory');
    }
    
    // Write schemes to JSON file
    fs.writeFileSync(SCHEMES_FILE, JSON.stringify(sampleSchemes, null, 2));
    console.log(`✓ ${sampleSchemes.length} schemes imported successfully to ${SCHEMES_FILE}`);
    
    // Check for PDF files
    const uploadsDir = path.join(__dirname, '../../server/uploads');
    if (fs.existsSync(uploadsDir)) {
      const pdfFiles = fs.readdirSync(uploadsDir).filter(f => f.endsWith('.pdf'));
      console.log(`\n✓ Found ${pdfFiles.length} PDF files in uploads directory`);
      if (pdfFiles.length > 0) {
        console.log('  PDF files:', pdfFiles.join(', '));
      }
    } else {
      console.log('\n⚠ Note: uploads directory not found. Create it and add your PDF files there.');
    }
    
    console.log('\n📁 To add PDFs:');
    console.log('  1. Place PDF files in: server/uploads/');
    console.log('  2. Update documentPath in schemes.json with the PDF filename');
    console.log('  3. Example: "documentPath": "my-scheme.pdf"');
    
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Run import
importData();
