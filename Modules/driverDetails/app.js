const mongoose = require('mongoose');

// Connect to main MongoDB database
const mainDBConnection = mongoose.createConnection('mongodb://localhost:27017/intern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Driver schema for main database
const mainDriverSchema = new mongoose.Schema({
  name: String,
  licenseNo: {
    type: String,
    required: true,
    unique: true,
  },
  isAdminApproved: {
    type: Boolean, 
    default: false,
  },
});

// Create model for main database
const MainDriver = mainDBConnection.model('Driver', mainDriverSchema);

// Connect to secondary MongoDB database
const secondaryDBConnection = mongoose.createConnection('mongodb://localhost:27017/secondary_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Driver schema for secondary database
const secondaryDriverSchema = new mongoose.Schema({
  // Define schema for secondary database
});

const status = 

// Create model for secondary database
const SecondaryDriver = secondaryDBConnection.model('Driver', secondaryDriverSchema);

// Define functions for main database
async function updateDriverDetails(driverId, newData) {
  // Implementation remains the same
}

async function updateLicenseNumber(driverId, newLicenseNo) {
  // Implementation remains the same
}

async function grantAdminPermission(driverId) {
  // Implementation remains the same
}

// Example usage
async function main() {
  try {
    // Create a new driver in the main database
    const newDriver = await MainDriver.create({
      name: 'John Doe',
      licenseNo: 'ABC123',
    });

    // Grant admin permission
    await grantAdminPermission(newDriver._id);

    // Update general details
    await updateDriverDetails(newDriver._id, { name: 'Jane Doe' });

    // Try to update license number (should succeed)
    await updateLicenseNumber(newDriver._id, 'XYZ789');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close connections
    mainDBConnection.close();
    secondaryDBConnection.close();
  }
}

main();
