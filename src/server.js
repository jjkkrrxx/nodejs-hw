import express from 'express';
import 'dotenv/config';
import PinoHttp from 'pino-http';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const logger = PinoHttp({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      messageFormat:
        '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
      hideObject: true,
    },
  },
});
app.use(logger);
app.use(express.json());
app.use(cors());

app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
