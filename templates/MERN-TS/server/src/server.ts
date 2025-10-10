import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.ts';
import './config/db.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from the backend!",
    time: new Date().toLocaleString(),
    status: "success"
  });
});
// Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
