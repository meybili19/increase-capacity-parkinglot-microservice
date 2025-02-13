const express = require('express');
const dotenv = require('dotenv');
const capacityRoutes = require('./routes/capacityRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/capacity', capacityRoutes);

const PORT = process.env.PORT || 7008;
app.listen(PORT, () => {
    console.log(`Increase Capacity server running on port ${PORT}`);
});
