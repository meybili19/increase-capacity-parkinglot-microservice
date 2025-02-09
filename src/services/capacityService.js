const db = require('../config/db');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function checkParkingLotExists(parkingLotId) {
    try {
        const response = await axios.get(`${process.env.PARKINGLOT_SERVICE_URL}/${parkingLotId}`, { timeout: 3000 });
        return response.status === 200;
    } catch {
        return false;
    }
}

async function checkParkingLotCapacity(parkingLotId) {
    try {
        const response = await axios.get(`${process.env.PARKINGLOT_SERVICE_CAPACITY_URL}/${parkingLotId}`, { timeout: 3000 });
        return response.data || null;
    } catch {
        return null;
    }
}

async function increaseParkingLotCapacity(parkingLotId) {
    try {
        // STEP 1: Only increase capacity if it's below total space
        const [result] = await db.execute(
            'UPDATE ParkingLot SET capacity = capacity + 1 WHERE id = ? AND capacity < total_space',
            [parkingLotId]
        );

        return result.affectedRows > 0;
    } catch {
        return false;
    }
}

module.exports = { checkParkingLotExists, checkParkingLotCapacity, increaseParkingLotCapacity };
