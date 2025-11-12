# Troubleshooting Guide

Common issues and their solutions for the Welfare Scheme Repository.

## Installation Issues

### npm install fails

**Problem**: Dependencies fail to install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try installing again
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

### Python/node-gyp errors

**Problem**: Native module compilation fails

**Solutions**:
- Install Windows Build Tools: `npm install -g windows-build-tools`
- Install Python 2.7 or 3.x
- Set Python path: `npm config set python /path/to/python`

## Database Issues

### MongoDB connection refused

**Problem**: Cannot connect to MongoDB

**Solutions**:

1. **Check if MongoDB is running**:
```bash
# Windows
net start MongoDB

# Or check services
services.msc
```

2. **Verify connection string**:
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/welfare-schemes

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/welfare-schemes
```

3. **Check MongoDB port**:
```bash
netstat -an | findstr :27017
```

### Authentication failed

**Problem**: MongoDB authentication error

**Solutions**:
- Verify username and password in connection string
- Check database user permissions
- For Atlas: Verify IP whitelist (add 0.0.0.0/0 for testing)
- Ensure database name is correct

### Database not found

**Problem**: Database doesn't exist

**Solution**:
```bash
# Import sample data to create database
cd data/scripts
npm run import
```

## Server Issues

### Port already in use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:

1. **Change port in .env**:
```env
PORT=5001
```

2. **Kill process using the port**:
```bash
# Find process
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Module not found

**Problem**: `Error: Cannot find module 'express'`

**Solution**:
```bash
cd server
npm install
```

### CORS errors

**Problem**: CORS policy blocking requests

**Solution**:
Check `server/src/app.js` has CORS enabled:
```javascript
const cors = require('cors');
app.use(cors());
```

## Frontend Issues

### React app won't start

**Problem**: `npm start` fails

**Solutions**:
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Try starting again
npm start
```

### Blank page after build

**Problem**: Production build shows blank page

**Solutions**:
1. Check browser console for errors
2. Verify API URL in environment variables
3. Check build output for errors
4. Ensure all routes are configured correctly

### API calls failing

**Problem**: Frontend can't connect to backend

**Solutions**:

1. **Check proxy in package.json**:
```json
"proxy": "http://localhost:5000"
```

2. **Verify backend is running**:
```bash
curl http://localhost:5000/api/health
```

3. **Check CORS configuration**

4. **Verify API base URL**:
```javascript
// client/src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
```

## Data Import Issues

### Import script fails

**Problem**: `node dataImport.js` fails

**Solutions**:

1. **Check MongoDB connection**:
```bash
# Verify .env file exists in server directory
ls server/.env
```

2. **Verify dependencies installed**:
```bash
cd data/scripts
npm install
```

3. **Check MongoDB is running**

4. **Run with verbose logging**:
```javascript
// Add to dataImport.js
mongoose.set('debug', true);
```

### Duplicate key error

**Problem**: `E11000 duplicate key error`

**Solutions**:
```bash
# Clear existing data
mongo
use welfare-schemes
db.schemes.drop()
exit

# Re-import
cd data/scripts
npm run import
```

## File Upload Issues

### File upload fails

**Problem**: Cannot upload PDF files

**Solutions**:

1. **Check uploads directory exists**:
```bash
mkdir server/uploads
```

2. **Verify file size** (max 10MB):
```javascript
// server/src/config/storage.js
limits: {
  fileSize: 10 * 1024 * 1024 // 10MB
}
```

3. **Check file type**:
- Only PDF files are allowed
- Verify MIME type is `application/pdf`

### File download fails

**Problem**: Cannot download scheme documents

**Solutions**:
1. Check file exists in `server/uploads/`
2. Verify `documentPath` in database
3. Check file permissions
4. Verify download endpoint is working

## Performance Issues

### Slow page load

**Solutions**:
1. Check database indexes:
```javascript
// In MongoDB shell
db.schemes.getIndexes()
```

2. Reduce page size:
```javascript
// Adjust limit in query
const limit = 12; // Reduce if needed
```

3. Enable compression:
```javascript
// server/src/app.js
const compression = require('compression');
app.use(compression());
```

### Slow search

**Solutions**:
1. Ensure text index exists:
```javascript
schemeSchema.index({ title: 'text', description: 'text' });
```

2. Limit search results
3. Add debouncing to search input

## Production Issues

### Environment variables not working

**Problem**: Config values not loading in production

**Solutions**:
1. Set environment variables on hosting platform
2. Don't commit `.env` files
3. Use platform-specific config (Heroku Config Vars, etc.)
4. Verify variable names match exactly

### Build fails

**Problem**: `npm run build` fails

**Solutions**:
```bash
# Clear cache
npm cache clean --force

# Delete build folder
rm -rf build

# Try building again
npm run build

# Check for console errors
# Fix any linting or compilation errors
```

### 404 on refresh

**Problem**: Page refresh gives 404 in production

**Solution**:
Configure server to serve `index.html` for all routes:

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Express**:
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```

## Common Error Messages

### "Cannot read property of undefined"

**Cause**: Accessing property on null/undefined object

**Solution**: Add null checks:
```javascript
// Bad
const title = scheme.title;

// Good
const title = scheme?.title || 'N/A';
```

### "Network Error"

**Cause**: Backend not running or wrong URL

**Solution**:
1. Start backend server
2. Check API URL configuration
3. Verify CORS settings

### "ValidationError"

**Cause**: Required fields missing or invalid data

**Solution**:
1. Check required fields in schema
2. Verify data format
3. Review validation rules

## Getting Help

If you're still experiencing issues:

1. **Check logs**:
   - Backend: Terminal where server is running
   - Frontend: Browser console (F12)
   - MongoDB: MongoDB logs

2. **Enable debug mode**:
```javascript
// Backend
mongoose.set('debug', true);

// Frontend
console.log('Debug info:', data);
```

3. **Test API directly**:
```bash
# Use curl or Postman
curl http://localhost:5000/api/schemes
```

4. **Check documentation**:
   - `README.md` - Overview
   - `QUICKSTART.md` - Setup guide
   - `docs/API.md` - API reference
   - `docs/DEPLOYMENT.md` - Deployment guide

5. **Common fixes**:
   - Restart servers
   - Clear cache
   - Reinstall dependencies
   - Check environment variables
   - Verify MongoDB is running

## Prevention Tips

1. **Always use version control** (Git)
2. **Keep dependencies updated** (but test first)
3. **Use environment variables** for config
4. **Regular backups** of database
5. **Monitor logs** for errors
6. **Test before deploying** to production
7. **Document changes** you make

## Quick Checklist

When something goes wrong:

- [ ] Is MongoDB running?
- [ ] Are all dependencies installed?
- [ ] Is the .env file configured correctly?
- [ ] Are both frontend and backend running?
- [ ] Are there any errors in the console?
- [ ] Is the correct port being used?
- [ ] Are environment variables set in production?
- [ ] Is the database populated with data?
- [ ] Are file permissions correct?
- [ ] Is the network connection stable?

---

**Note**: Most issues can be resolved by restarting the servers and checking the configuration. When in doubt, refer to the error message and search for specific solutions.
