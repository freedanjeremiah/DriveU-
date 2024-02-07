const axios = require('axios');

// Function to calculate the distance between two points using Haversine formula
//Required? //change  
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to get driver's location from Google Maps API
async function getDriverLocation(driverId) {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${driverId}&fields=name,geometry&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const driverLocation = response.data.result.geometry.location;
        return driverLocation;
    } catch (error) {
        console.error('Error fetching driver location:', error);
        return null;
    }
}

// Function to send a ride request to the driver if client is within driver's radius
async function sendRideRequestIfWithinRadius(driverLocation, clientLocation, radius) {
    const distance = calculateDistance(driverLocation.lat, driverLocation.lng, clientLocation.lat, clientLocation.lng);
    if (distance <= radius) {
        console.log('Client is within driver\'s radius. Sending ride request...');
        // Here you would implement the logic to send a ride request to the driver
        console.log('Sending ride request to driver at location:', driverLocation);
        // Example: Call another API or service to send the ride request
    } else {
        console.log('Client is not within driver\'s radius.');
    }
}

// Example usage
async function main() {
    const driverId = 'DRIVER_PLACE_ID_FROM_GOOGLE_MAPS';
    const clientLocation = { lat: 40.7128, lng: -74.0060 }; // Example client location (New York City)
    const driverLocation = await getDriverLocation(driverId);
    
    if (driverLocation) {
        const radius = 5; // Radius in kilometers
        await sendRideRequestIfWithinRadius(driverLocation, clientLocation, radius);
    } else {
        console.log('Failed to get driver location.');
    }
}

// Execute the main function
main();
