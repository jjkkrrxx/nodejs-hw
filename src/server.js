import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors as celebrateErrors } from 'celebrate';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(notesRoutes);
app.use(celebrateErrors());
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
