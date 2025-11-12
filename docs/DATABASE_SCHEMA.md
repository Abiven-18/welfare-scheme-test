# Database Schema

## Scheme Collection

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  ministry: String (required),
  year: Number (required),
  primeMinister: String (required, enum),
  theme: String (required, enum),
  beneficiaries: String,
  eligibility: String,
  benefits: String,
  applicationProcess: String,
  officialWebsite: String,
  documentPath: String,
  status: String (enum: Active, Inactive, Discontinued),
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- Text index on `title` and `description` for search
- Index on `year`
- Index on `ministry`
- Index on `theme`
- Index on `primeMinister`

### Enums

**primeMinister:**
- Narendra Modi
- Manmohan Singh
- Atal Bihari Vajpayee
- Other

**theme:**
- Education
- Healthcare
- Agriculture
- Employment
- Housing
- Women Empowerment
- Rural Development
- Social Welfare
- Financial Inclusion
- Infrastructure
- Other

**status:**
- Active
- Inactive
- Discontinued

## Feedback Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  message: String (required),
  schemeId: ObjectId (ref: Scheme, optional),
  status: String (enum: New, Read, Responded),
  createdAt: Date,
  updatedAt: Date
}
```

### Enums

**status:**
- New
- Read
- Responded

## Relationships

- Feedback.schemeId references Scheme._id (optional)
- One-to-many relationship: One Scheme can have many Feedback entries

## Data Validation

### Scheme Validation
- `title`: Required, trimmed string
- `description`: Required string
- `ministry`: Required, trimmed string
- `year`: Required number, must be between 1947 and current year
- `primeMinister`: Required, must be one of the enum values
- `theme`: Required, must be one of the enum values
- `email` (in Feedback): Must be valid email format

### File Upload
- Only PDF files are accepted
- Maximum file size: 10MB
- Files are stored in `server/uploads/` directory
- Filename format: `document-{timestamp}-{random}.pdf`

## Sample Queries

### Find schemes by year
```javascript
db.schemes.find({ year: 2020 })
```

### Text search
```javascript
db.schemes.find({ $text: { $search: "education" } })
```

### Find schemes by multiple filters
```javascript
db.schemes.find({
  year: 2020,
  theme: "Education",
  primeMinister: "Narendra Modi"
})
```

### Get schemes with pagination
```javascript
db.schemes.find()
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(12)
```
