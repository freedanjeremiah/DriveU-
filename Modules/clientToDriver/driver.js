const express = require('express');
const router = express.Router();

let driverRequest = null;

// Endpoint for the driver to accept the request
router.post('/accept', (req, res) => {
    if (!driverRequest) {
        return res.status(404).json({ error: 'No request available to accept' });
    }

    const { requestId } = driverRequest;
    driverRequest = null;
    res.status(200).json({ message: `Request ${requestId} accepted by the driver` });
});

module.exports = router;
