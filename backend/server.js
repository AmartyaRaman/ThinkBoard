import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectDB from './dbconnection.js';
import router from './routes/notes.route.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

// middleware to expect json data from frontend
app.use(cors({
  origin: "http://localhost:5173"
}));  // always above rateLimiter as we are sending response in ratelimiter
app.use(express.json());
app.use(rateLimiter);

app.use('/api/notes', router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Listening at", port);
  })
})