# Deployment Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd welfare-scheme-repository
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/welfare-schemes
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the development server:

```bash
npm start
```

The application will run on `http://localhost:3000`

### 4. Import Sample Data

```bash
cd data/scripts
node dataImport.js
```

## Production Deployment

### Backend Deployment (Node.js)

#### Option 1: Heroku

1. Install Heroku CLI
2. Create a new Heroku app:
```bash
heroku create your-app-name
```

3. Set environment variables:
```bash
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set NODE_ENV=production
```

4. Deploy:
```bash
git subtree push --prefix server heroku main
```

#### Option 2: DigitalOcean/AWS/Azure

1. Set up a VM or container
2. Install Node.js and MongoDB
3. Clone the repository
4. Install dependencies
5. Set environment variables
6. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server/src/app.js --name welfare-schemes-api
pm2 save
pm2 startup
```

### Frontend Deployment

#### Option 1: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd client
vercel
```

3. Set environment variable:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

#### Option 2: Netlify

1. Build the app:
```bash
cd client
npm run build
```

2. Deploy the `build` folder to Netlify

3. Set environment variable in Netlify dashboard:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

#### Option 3: Traditional Hosting

1. Build the app:
```bash
cd client
npm run build
```

2. Upload the `build` folder to your web server
3. Configure your web server (Apache/Nginx) to serve the static files

### Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get the connection string
6. Update the `MONGODB_URI` environment variable

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/welfare-schemes
NODE_ENV=production
```

### Frontend

```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

## SSL/HTTPS Setup

For production, always use HTTPS:

1. Obtain SSL certificate (Let's Encrypt, Cloudflare, etc.)
2. Configure your web server or use a reverse proxy (Nginx)
3. Update API URLs to use HTTPS

## Monitoring and Logging

### Backend

Use PM2 for process monitoring:

```bash
pm2 logs
pm2 monit
```

### Database

- Enable MongoDB Atlas monitoring
- Set up alerts for performance issues
- Regular backups

## Performance Optimization

### Backend

1. Enable compression:
```javascript
const compression = require('compression');
app.use(compression());
```

2. Use caching for frequently accessed data
3. Optimize database queries with proper indexes

### Frontend

1. Code splitting
2. Lazy loading components
3. Image optimization
4. CDN for static assets

## Security Checklist

- [ ] Use HTTPS
- [ ] Set secure HTTP headers (helmet.js)
- [ ] Enable CORS with specific origins
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Rate limiting for API endpoints
- [ ] MongoDB authentication enabled

## Backup Strategy

1. Automated daily database backups
2. Store backups in secure location
3. Test restore procedures regularly
4. Keep uploaded files backed up

## Scaling Considerations

1. Use load balancer for multiple backend instances
2. Database replication for read-heavy workloads
3. CDN for static assets
4. Caching layer (Redis) for frequently accessed data
5. Horizontal scaling with container orchestration (Kubernetes)
