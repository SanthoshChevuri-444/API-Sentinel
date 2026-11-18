import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import dotenv from 'dotenv';
import morgan from 'morgan';

import projectRoutes from './routes/projectRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
// Project routes
app.use('/api/projects', projectRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'API Sentinel backend is running'
  });
});



export default app;