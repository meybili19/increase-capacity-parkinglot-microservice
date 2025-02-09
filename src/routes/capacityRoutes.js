const express = require('express');
const { checkParkingLotExists, checkParkingLotCapacity, increaseParkingLotCapacity } = require('../services/capacityService');

const router = express.Router();

router.put('/increase/:parkingLotId', async (req, res) => {
    const { parkingLotId } = req.params;

    // STEP 1: Check if the parking lot exists
    const exists = await checkParkingLotExists(parkingLotId);
    if (!exists) {
        return res.status(404).json({ message: `Parking lot ID ${parkingLotId} not found` });
    }

    // STEP 2: Get current capacity and total space
    const parkingData = await checkParkingLotCapacity(parkingLotId);
    if (!parkingData) {
        return res.status(503).json({ message: `Unable to fetch capacity data for parking lot ID ${parkingLotId}` });
    }

    const { capacity, total_space } = parkingData;

    // STEP 3: Validate that capacity does not exceed total space
    if (capacity >= total_space) {
        return res.status(400).json({ message: `Capacity cannot exceed total space (Limit: ${total_space})` });
    }

    // STEP 4: Attempt to increase capacity
    const success = await increaseParkingLotCapacity(parkingLotId);
    if (!success) {
        return res.status(400).json({ message: `Capacity already at the limit (Total Space: ${total_space})` });
    }

    return res.json({ message: `Capacity increased successfully (New Capacity: ${capacity + 1})` });
});

module.exports = router;
