import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'database',
  password: 'mysecretpassword',
  port: 5432,
});

// POST route to accept user input
app.post('/name', async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  try {
    await pool.query('INSERT INTO users (name) VALUES ($1)', [name]);
    res.json({ message: `Hello, ${name}! Your name has been saved.` });
  } catch (error) {
    console.error('Error saving name to database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route to fetch all names
app.get('/names', async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching names from database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});