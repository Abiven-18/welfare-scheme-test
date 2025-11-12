# API Documentation

Base URL: `http://localhost:5000/api`

## Schemes Endpoints

### Get All Schemes
```
GET /schemes
```

**Query Parameters:**
- `year` (optional) - Filter by year
- `ministry` (optional) - Filter by ministry
- `theme` (optional) - Filter by theme
- `primeMinister` (optional) - Filter by Prime Minister
- `search` (optional) - Text search in title and description
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 12) - Items per page

**Response:**
```json
{
  "schemes": [...],
  "currentPage": 1,
  "totalPages": 5,
  "totalSchemes": 50
}
```

### Get Single Scheme
```
GET /schemes/:id
```

**Response:**
```json
{
  "_id": "...",
  "title": "Scheme Title",
  "description": "...",
  "ministry": "...",
  "year": 2020,
  "primeMinister": "...",
  "theme": "...",
  ...
}
```

### Get Filter Options
```
GET /schemes/filters
```

**Response:**
```json
{
  "years": [2023, 2022, 2021, ...],
  "ministries": ["Ministry 1", "Ministry 2", ...],
  "themes": ["Education", "Healthcare", ...],
  "primeMinsters": ["Narendra Modi", ...]
}
```

### Download Scheme Document
```
GET /schemes/:id/download
```

Downloads the PDF document associated with the scheme.

### Create Scheme
```
POST /schemes
```

**Headers:**
- `Content-Type: multipart/form-data`

**Body (form-data):**
- `title` (required)
- `description` (required)
- `ministry` (required)
- `year` (required)
- `primeMinister` (required)
- `theme` (required)
- `beneficiaries` (optional)
- `eligibility` (optional)
- `benefits` (optional)
- `applicationProcess` (optional)
- `officialWebsite` (optional)
- `document` (optional) - PDF file
- `status` (optional, default: "Active")
- `tags` (optional) - Array of strings

**Response:**
```json
{
  "_id": "...",
  "title": "...",
  ...
}
```

### Update Scheme
```
PUT /schemes/:id
```

Same body structure as Create Scheme.

### Delete Scheme
```
DELETE /schemes/:id
```

**Response:**
```json
{
  "message": "Scheme deleted successfully"
}
```

## Feedback Endpoints

### Submit Feedback
```
POST /feedback
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Feedback message",
  "schemeId": "..." // optional
}
```

**Response:**
```json
{
  "message": "Feedback submitted successfully",
  "feedback": {...}
}
```

### Get All Feedback (Admin)
```
GET /feedback
```

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 20)
- `status` (optional) - Filter by status (New, Read, Responded)

**Response:**
```json
{
  "feedback": [...],
  "currentPage": 1,
  "totalPages": 3,
  "total": 50
}
```

### Update Feedback Status
```
PATCH /feedback/:id/status
```

**Body:**
```json
{
  "status": "Read" // or "Responded"
}
```

### Delete Feedback
```
DELETE /feedback/:id
```

**Response:**
```json
{
  "message": "Feedback deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "message": "Validation Error",
  "errors": ["Error 1", "Error 2"]
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Internal Server Error"
}
```
