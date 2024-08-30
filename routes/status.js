const express = require('express');
const router = express.Router();
const StatusModel = require('../models/StatusModel'); // Correct path to your Mongoose model

// Handle POST requests to create or update a status
router.post('/check', async (req, res) => {
    try {
        console.log('Received POST data:', req.body); // Log received data

        const { idType, enrolmentId, enrolmentDate, enrolmentTime } = req.body;

        // Check if required fields are provided
        if (!idType || !enrolmentId) {
            return res.status(400).json({ message: 'idType and enrolmentId are required' });
        }

        // Create a new status instance
        const status = new StatusModel({
            idType,
            enrolmentId,
            enrolmentDate,
            enrolmentTime
        });

        // Save status to the database
        await status.save();
        console.log('Status saved:', status); // Log status after saving
        res.status(200).json({ message: 'Status checked successfully', status });
    } catch (error) {
        console.error('Error checking status:', error); // Log error
        res.status(500).json({ message: 'Error checking status', error });
    }
});

// Handle GET requests to fetch a status
router.get('/check', async (req, res) => {
    try {
        console.log('Received GET request with query:', req.query); // Log received query parameters

        const { idType, enrolmentId } = req.query;

        // Check if required query parameters are provided
        if (!idType || !enrolmentId) {
            console.log('Missing required query parameters');
            return res.status(400).json({ message: 'idType and enrolmentId are required' });
        }

        // Find a status document in the database that matches the provided idType and enrolmentId
        const status = await StatusModel.findOne({ idType, enrolmentId });

        if (!status) {
            console.log('Status not found');
            return res.status(404).json({ message: 'Status not found' });
        }

        // Log status found
        console.log('Found status:', status);
        // Return the found status
        res.status(200).json({ status });
    } catch (error) {
        console.error('Error retrieving status:', error); // Log error
        res.status(500).json({ message: 'Error retrieving status', error });
    }
});

// Export the router
module.exports = router;
