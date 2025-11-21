import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.ts';
import './config/db.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Styled Welcome Page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Express API | Well-Ready</title>
      <style>
        :root {
          --bg: #020617;
          --text: #f8fafc;
          --accent: #06b6d4;
          --card: #0f172a;
          --border: #1e293b;
        }
        body {
          margin: 0;
          font-family: 'Inter', system-ui, sans-serif;
          background-color: var(--bg);
          color: var(--text);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .container {
          text-align: center;
          padding: 2rem;
          max-width: 600px;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          background: linear-gradient(to right, #22d3ee, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          color: #94a3b8;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background: rgba(34, 211, 238, 0.1);
          color: var(--accent);
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .dot {
          width: 8px;
          height: 8px;
          background-color: var(--accent);
          border-radius: 50%;
          margin-right: 8px;
          box-shadow: 0 0 8px var(--accent);
        }
        .endpoints {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: left;
          margin-top: 2rem;
        }
        code {
          font-family: 'JetBrains Mono', monospace;
          color: #e2e8f0;
          background: #1e293b;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
        }
        .endpoint-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
        }
        .endpoint-item:last-child {
          border-bottom: none;
        }
        .method {
          font-weight: bold;
          color: #a855f7;
          margin-right: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="status-badge">
          <div class="dot"></div>
          Server Active
        </div>
        <h1>Express API Ready</h1>
        <p>
          Your high-performance TypeScript backend is running successfully.
          Connected to MongoDB and ready to serve requests.
        </p>
        
        <div class="endpoints">
          <div class="endpoint-item">
            <span><span class="method">GET</span> <code>/</code></span>
            <span style="color: #64748b">Welcome Page</span>
          </div>
          <div class="endpoint-item">
            <span><span class="method">GET</span> <code>/api/data</code></span>
            <span style="color: #64748b">Example Data</span>
          </div>
          <div class="endpoint-item">
            <span><span class="method">POST</span> <code>/api/auth/register</code></span>
            <span style="color: #64748b">User Registration</span>
          </div>
          <div class="endpoint-item">
            <span><span class="method">POST</span> <code>/api/auth/login</code></span>
            <span style="color: #64748b">User Login</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

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
