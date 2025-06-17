import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import connectDB from './dbconnection.js';
import router from './routes/notes.route.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') { 
  app.use(cors({
    origin: "http://localhost:5173"
  }));  // always above rateLimiter as we are sending response in ratelimiter
}
// middleware to expect json data from frontend
app.use(express.json());
app.use(rateLimiter);

app.use('/api/notes', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('*name', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Listening at", port);
  })
})