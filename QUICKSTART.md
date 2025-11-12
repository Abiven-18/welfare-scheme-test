# Quick Start Guide

Get the Welfare Scheme Repository up and running in minutes.

## Prerequisites

- Node.js v16+ installed
- Git (optional)

## Step 1: Install Dependencies

### Backend
```bash
cd server
npm install
```

### Frontend
```bash
cd client
npm install
```

### Data Scripts
```bash
cd data/scripts
npm install
```

## Step 2: Configure Environment (Optional)

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development
```

## Step 3: Import Sample Data

```bash
cd data/scripts
npm run import
```

This will populate the data store with 3 welfare schemes from your CSV.
Data is stored in `server/data/schemes.json`

## Step 4: Start the Backend Server

```bash
cd server
npm run dev
```

Server will start at `http://localhost:5000`

## Step 5: Start the Frontend

Open a new terminal:

```bash
cd client
npm start
```

Application will open at `http://localhost:3000`

## Verify Installation

1. Open `http://localhost:3000` in your browser
2. You should see the homepage with filters and sample schemes
3. Try searching for schemes
4. Click on a scheme to view details
5. Submit feedback using the form

## Common Issues

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Set `PORT=3001` before running `npm start`

### Dependencies Not Installing
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

- Add more schemes through the API
- Upload PDF documents for schemes
- Customize the theme in `client/tailwind.config.js`
- Add authentication for admin features
- Deploy to production (see `docs/DEPLOYMENT.md`)

## API Testing

Test the API using curl or Postman:

```bash
# Get all schemes
curl http://localhost:5000/api/schemes

# Get filter options
curl http://localhost:5000/api/schemes/filters

# Search schemes
curl "http://localhost:5000/api/schemes?search=education"

# Health check
curl http://localhost:5000/api/health
```

## Project Structure

```
welfare-scheme-repository/
├── client/          # React frontend
├── server/          # Express backend
├── data/            # Data scripts
├── docs/            # Documentation
├── README.md        # Main documentation
└── QUICKSTART.md    # This file
```

## Support

For detailed documentation:
- API: `docs/API.md`
- Database: `docs/DATABASE_SCHEMA.md`
- Deployment: `docs/DEPLOYMENT.md`

Happy coding! 🚀
