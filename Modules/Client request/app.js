const express = require('express');
const bodyParser = require('body-parser');
const { findShortestPath } = require('dijkstrajs');

let drivers = [
    { id: 1, name: 'Driver 1', location: { x: 10, y: 20 }, available: true },
    { id: 2, name: 'Driver 2', location: { x: 15, y: 25 }, available: true },
    { id: 3, name: 'Driver 3', location: { x: 30, y: 35 }, available: true }
];

//Dijkstra's algorithm
function findNearestDriver(clientLocation) {
    const distances = [];
    for (const driver of drivers) {
        if (driver.available) {
            const distance = Math.sqrt(
                Math.pow(clientLocation.x - driver.location.x, 2) +
                Math.pow(clientLocation.y - driver.location.y, 2)
            );
            distances.push({ id: driver.id, name: driver.name, distance });
        }
    }
    distances.sort((a, b) => a.distance - b.distance);
    return distances[0];
}

function calculateRideCost(distance) {
    const costPerKm = 10; // Rupees 10 per km
    return distance * costPerKm;
}

const app = express();
app.use(bodyParser.json());

// API client requesting a ride
app.post('/request-ride', (req, res) => {
    const clientLocation = req.body.location;
    const nearestDriver = findNearestDriver(clientLocation);
    if (nearestDriver) {
        const rideDistance = nearestDriver.distance;
        const rideCost = calculateRideCost(rideDistance);
        res.send(`Nearest driver found! Driver ID: ${nearestDriver.id}, Name: ${nearestDriver.name}. Ride cost: Rs.${rideCost}`);
    } else {
        res.status(404).send('No drivers available at the moment.');
    }
});

// driver accepting the ride request
app.post('/accept-ride', (req, res) => {
    const driverId = req.body.driverId;
    const driver = drivers.find(driver => driver.id === driverId);
    if (driver) {
        driver.available = false;
        res.send(`Driver ${driver.name} has accepted the ride.`);
    } else {
        res.status(404).send('Driver not found.');
    }
});

// API driver rejecting the ride request
app.post('/reject-ride', (req, res) => {
    const driverId = req.body.driverId;
    const driver = drivers.find(driver => driver.id === driverId);
    if (driver) {
        driver.available = true;
        res.send(`Driver ${driver.name} has rejected the ride.`);
    } else {
        res.status(404).send('Driver not found.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
