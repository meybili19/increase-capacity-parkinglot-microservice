const express = require('express');
const { checkParkingLotExists, checkParkingLotCapacity, increaseParkingLotCapacity } = require('../services/capacityService');

const router = express.Router();

router.put('/increase/:parkingLotId', async (req, res) => {
    const { parkingLotId } = req.params;

    const exists = await checkParkingLotExists(parkingLotId);
    if (!exists) {
        return res.status(503).json({ message: 'Parking lot service unavailable or parking lot not found' });
    }

    const hasCapacity = await checkParkingLotCapacity(parkingLotId);
    if (!hasCapacity) {
        return res.status(503).json({ message: 'Parking lot capacity service unavailable' });
    }

    const success = await increaseParkingLotCapacity(parkingLotId);
    if (!success) {
        return res.status(500).json({ message: 'Failed to update parking lot capacity' });
    }

    res.json({ message: 'Capacity updated successfully' });
});

module.exports = router;
