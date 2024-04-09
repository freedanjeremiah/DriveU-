const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

let driverRequest = null;

router.post('/request', (req, res) => {
    const { requestId, location } = req.body;
    if (!requestId || !location) {
        return res.status(400).json({ error: 'Missing requestId or location in request body' });
    }

    driverRequest = { requestId, location };
    res.status(200).json({ message: 'Request sent to driver successfully' });
});

module.exports = router;
