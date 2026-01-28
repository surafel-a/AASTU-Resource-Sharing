import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import app from './app.js';
import connectDB from './config/db.js';

await connectDB(); // Connect to the database

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})