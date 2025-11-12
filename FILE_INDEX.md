# File Index

Complete list of all files in the Welfare Scheme Repository project.

## Root Files

- `README.md` - Main project documentation
- `QUICKSTART.md` - Quick setup guide
- `PROJECT_SUMMARY.md` - Comprehensive project overview
- `TROUBLESHOOTING.md` - Common issues and solutions
- `FILE_INDEX.md` - This file
- `.gitignore` - Git ignore rules
- `setup.bat` - Windows setup script

## Client (Frontend) - 31 files

### Configuration
- `client/package.json` - Dependencies and scripts
- `client/tailwind.config.js` - Tailwind CSS configuration
- `client/postcss.config.js` - PostCSS configuration

### Public
- `client/public/index.html` - HTML template
- `client/public/favicon.ico` - Site favicon

### Source Root
- `client/src/index.js` - Application entry point
- `client/src/index.css` - Global styles
- `client/src/App.jsx` - Main application component

### Components - Common (4 files)
- `client/src/components/common/Header.jsx` - Site header
- `client/src/components/common/Footer.jsx` - Site footer
- `client/src/components/common/SearchBar.jsx` - Search input
- `client/src/components/common/Loading.jsx` - Loading spinner

### Components - Filters (4 files)
- `client/src/components/filters/YearFilter.jsx` - Year dropdown
- `client/src/components/filters/MinistryFilter.jsx` - Ministry dropdown
- `client/src/components/filters/ThemeFilter.jsx` - Theme dropdown
- `client/src/components/filters/PMFilter.jsx` - Prime Minister dropdown

### Components - Home (4 files)
- `client/src/components/home/Hero.jsx` - Hero section
- `client/src/components/home/FilterGrid.jsx` - Filter layout
- `client/src/components/home/SchemePreview.jsx` - Scheme card preview
- `client/src/components/home/FeedbackBox.jsx` - Feedback form

### Components - Scheme (2 files)
- `client/src/components/scheme/SchemeCard.jsx` - Scheme card
- `client/src/components/scheme/DocumentViewer.jsx` - PDF viewer/downloader

### Pages (5 files)
- `client/src/pages/HomePage.jsx` - Home page
- `client/src/pages/SchemeDetailPage.jsx` - Scheme details
- `client/src/pages/SearchResultsPage.jsx` - Search results
- `client/src/pages/AboutPage.jsx` - About page
- `client/src/pages/ContactPage.jsx` - Contact page

### Services
- `client/src/services/api.js` - API client

### Utils (2 files)
- `client/src/utils/constants.js` - Constants
- `client/src/utils/helpers.js` - Helper functions

### Context
- `client/src/context/FilterContext.jsx` - Filter state management

### Hooks
- `client/src/hooks/useFilters.js` - Custom filter hook

## Server (Backend) - 16 files

### Configuration
- `server/package.json` - Dependencies and scripts
- `server/.env.example` - Environment variables template

### Source Root
- `server/src/app.js` - Express application

### Config (2 files)
- `server/src/config/database.js` - MongoDB connection
- `server/src/config/storage.js` - File upload configuration

### Models (2 files)
- `server/src/models/Scheme.js` - Scheme schema
- `server/src/models/Feedback.js` - Feedback schema

### Controllers (2 files)
- `server/src/controllers/schemeController.js` - Scheme handlers
- `server/src/controllers/feedbackController.js` - Feedback handlers

### Routes (2 files)
- `server/src/routes/schemes.js` - Scheme routes
- `server/src/routes/feedback.js` - Feedback routes

### Middleware (2 files)
- `server/src/middleware/validation.js` - Input validation
- `server/src/middleware/errorHandler.js` - Error handling

### Services
- `server/src/services/fileService.js` - File operations

### Utils
- `server/src/utils/helpers.js` - Helper functions

### Uploads
- `server/uploads/.gitkeep` - Placeholder for uploads directory

## Data - 5 files

### Scripts (3 files)
- `data/scripts/package.json` - Script dependencies
- `data/scripts/dataImport.js` - Import sample data
- `data/scripts/dataValidation.js` - Validate data

### Storage
- `data/raw/.gitkeep` - Placeholder for raw data
- `data/processed/.gitkeep` - Placeholder for processed data

## Documentation - 3 files

- `docs/API.md` - API documentation
- `docs/DATABASE_SCHEMA.md` - Database structure
- `docs/DEPLOYMENT.md` - Deployment guide

## Total File Count

- **Root**: 7 files
- **Client**: 31 files
- **Server**: 16 files
- **Data**: 5 files
- **Docs**: 3 files

**Total: 62 files**

## File Types

### JavaScript/JSX (45 files)
- React components: 20
- Backend code: 13
- Configuration: 5
- Scripts: 2
- Services/Utils: 5

### Documentation (7 files)
- Markdown files: 7

### Configuration (6 files)
- package.json: 3
- Config files: 3

### Other (4 files)
- HTML: 1
- CSS: 1
- Batch script: 1
- Favicon: 1

## Key Directories

```
├── client/src/components/    # 14 React components
├── client/src/pages/         # 5 page components
├── server/src/controllers/   # 2 controllers
├── server/src/models/        # 2 Mongoose models
├── server/src/routes/        # 2 route files
├── data/scripts/             # 2 utility scripts
└── docs/                     # 3 documentation files
```

## Quick Navigation

### Want to modify UI?
→ `client/src/components/` and `client/src/pages/`

### Want to change API logic?
→ `server/src/controllers/` and `server/src/routes/`

### Want to update database schema?
→ `server/src/models/`

### Want to add sample data?
→ `data/scripts/dataImport.js`

### Want to change styles?
→ `client/src/index.css` and `client/tailwind.config.js`

### Need help?
→ `README.md`, `QUICKSTART.md`, or `TROUBLESHOOTING.md`

---

**Last Updated**: November 2024
**Project Version**: 1.0.0
