import express, { Response } from 'express';
import router from '@/routes/router';
import { serverErrorHandler, boomErrorHandler, ormErrorHandler } from '@/middlewares/errors';
import dotenv from 'dotenv';
dotenv.config();
import connectionSource from '@/datasource';
import "reflect-metadata";
import '@/utils/auth';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// Health checker
app.get('/status', (_, response: Response) => {
  response.send();
});

// Routes
router(app);

// Error handlers
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(serverErrorHandler);


// Database connection
connectionSource.initialize().then(() => {

  app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
  });

});

