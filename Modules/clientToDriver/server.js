const express = require('express');
const clientRoutes = require('./clientRoutes');
const driverRoutes = require('./driverRoutes');

const app = express();
const PORT = 3000;

app.use('/client', clientRoutes);
app.use('/driver', driverRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
