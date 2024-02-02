const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const rideRequests = new Map();
const acceptedRides = new Map();

app.use(bodyParser.json());

app.post('/request_ride', (req, res) => {
    const { user_id, latitude, longitude } = req.body;

    if (!user_id || !latitude || !longitude) {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    const key = `${latitude},${longitude}`;

    if (!rideRequests.has(key)) {
        rideRequests.set(key, []);
    }

    rideRequests.get(key).push(user_id);

    return res.status(200).json({ message: 'Ride request sent successfully' });
});

app.post('/accept_ride/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    for (const [key, value] of rideRequests.entries()) {
        if (value.length > 0 && value[0] === user_id) {
            const acceptedUser = rideRequests.get(key).shift();

            // Remove ride requests for the specified location
            rideRequests.set(key, []);

            // Clear accepted rides for other drivers at the same location
            for (const [otherKey] of rideRequests.entries()) {
                if (otherKey !== key) {
                    rideRequests.set(otherKey, []);
                }
            }

            acceptedRides.set(key, acceptedUser);

            return res.status(200).json({ message: `Ride accepted for user ${user_id}` });
        }
    }

    return res.status(404).json({ message: 'No available rides for the specified user' });
});

app.delete('/cancel_ride/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    for (const [key, value] of acceptedRides.entries()) {
        if (value === user_id) {
            acceptedRides.set(key, '');
            return res.status(200).json({ message: `Ride canceled for user ${user_id}` });
        }
    }

    return res.status(404).json({ message: 'No active ride found for the specified user' });
});

app.get('/get_accepted_ride/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    for (const [key, value] of acceptedRides.entries()) {
        if (value === user_id) {
            return res.status(200).json({ message: `Ride details for user ${user_id}`, location: key });
        }
    }

    return res.status(404).json({ message: 'No active ride found for the specified user' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
