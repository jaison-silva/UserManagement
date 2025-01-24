import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './server/routes/routes.js';
import mongoDB from './server/models/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express()
app.use(cookieParser());
app.use(express.json())
app.use('/uploads', express.static('./uploads'));
app.use(cors({
  origin: ['http://localhost:5003','http://localhost:5000'],
  credentials: true,
}));

// app.use('/', router)

app.use('/',(req, res, next) => {
  console.log(`${req.method} Request received at:`, req.originalUrl);
  next();
},router);

app.use("*", (req, res) => {
  console.log("Dead end path bro");
  res.status(404).json({ message: "Route not found" });
});


const startServer = async () => {
    try {
      await mongoDB();
  
      const PORT = process.env.PORT;
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  };

startServer()