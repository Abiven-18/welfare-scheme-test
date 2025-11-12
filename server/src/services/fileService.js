const fs = require('fs');
const path = require('path');

class FileService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads');
  }

  // Check if file exists
  fileExists(filename) {
    const filePath = path.join(this.uploadDir, filename);
    return fs.existsSync(filePath);
  }

  // Delete file
  deleteFile(filename) {
    try {
      const filePath = path.join(this.uploadDir, filename);
      if (this.fileExists(filename)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  // Get file path
  getFilePath(filename) {
    return path.join(this.uploadDir, filename);
  }

  // Get file size
  getFileSize(filename) {
    try {
      const filePath = path.join(this.uploadDir, filename);
      const stats = fs.statSync(filePath);
      return stats.size;
    } catch (error) {
      return null;
    }
  }

  // List all files
  listFiles() {
    try {
      return fs.readdirSync(this.uploadDir);
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }
}

module.exports = new FileService();
