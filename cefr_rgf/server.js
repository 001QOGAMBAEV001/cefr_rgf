const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});