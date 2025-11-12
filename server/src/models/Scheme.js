const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  ministry: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  primeMinister: {
    type: String,
    required: true,
    enum: ['Narendra Modi', 'Manmohan Singh', 'Atal Bihari Vajpayee', 'Other']
  },
  theme: {
    type: String,
    required: true,
    enum: [
      'Education',
      'Healthcare',
      'Agriculture',
      'Employment',
      'Housing',
      'Women Empowerment',
      'Rural Development',
      'Social Welfare',
      'Financial Inclusion',
      'Infrastructure',
      'Other'
    ]
  },
  beneficiaries: {
    type: String,
    trim: true
  },
  eligibility: {
    type: String
  },
  benefits: {
    type: String
  },
  applicationProcess: {
    type: String
  },
  officialWebsite: {
    type: String,
    trim: true
  },
  documentPath: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Discontinued'],
    default: 'Active'
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for faster queries
schemeSchema.index({ title: 'text', description: 'text' });
schemeSchema.index({ year: 1 });
schemeSchema.index({ ministry: 1 });
schemeSchema.index({ theme: 1 });
schemeSchema.index({ primeMinister: 1 });

module.exports = mongoose.model('Scheme', schemeSchema);
