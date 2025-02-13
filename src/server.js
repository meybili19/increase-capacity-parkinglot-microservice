const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const capacityRoutes = require('./routes/capacityRoutes');

dotenv.config();



const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
app.use(express.json());

app.use('/capacity', capacityRoutes);

const PORT = process.env.PORT || 7008;
app.listen(PORT, () => {
    console.log(`Increase Capacity server running on port ${PORT}`);
});
