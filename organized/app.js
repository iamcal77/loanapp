const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the callback URL endpoint
app.post('/callback', (req, res) => {
    const callbackData = req.body;

    console.log('Received callback data:', callbackData);

    // Handle the callback data here (validate, process payment, etc.)
    // Example: Check the ResultCode and ResultDesc
    const resultCode = callbackData.ResultCode;
    const resultDesc = callbackData.ResultDesc;

    if (resultCode === '0') {
        console.log('Payment was successful.');
        // Do something, e.g., update payment status in the database
    } else if (resultCode === '1') {
        console.log('Payment failed.');
        // Handle failure (e.g., log, notify user)
    } else {
        console.log('Payment was cancelled.');
        // Handle cancellation
    }

    // Send response to acknowledge receipt
    res.status(200).send('OK');
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
