import 'express-async-errors';

/** Express */
import express from 'express';
const app = express();

/** Logging info */
import Logging from './library/Logging';
import { LoggingMiddleware } from './middleware/LoggingMiddleware';

/** Error handdler */
import { errorHandler } from './middleware/error-handler';
import notFound from './middleware/not-found';

/** Rest of the packages */
import cookieSession from 'cookie-session';
import cors from 'cors';

/** DataBase Configuration */
import { config } from './config/config';
import { connectDB } from './db/connect';

/** Routers */
import { authRouter } from './routes/auth.router';
import { currentUser } from './middleware/current-user';
import { sellerRouter } from './routes/seller.router';

/** =======================
 *  End Of Requires Section
 *  ======================= */

app.set('trust-proxy', true);
/** Middlewares */
app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200
    })
);
app.use(LoggingMiddleware);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
);

/** Health Check */
app.get('/ping', (req, res, next) => {
    res.status(200).json({ message: 'pong' });
});

/** Middlwares form Middlware Folder */
app.use(currentUser(process.env.JWT_KEY!));

/** Routers */

app.use('/api/v1/', authRouter);
app.use('/api/v1/', sellerRouter);

/** Error Hnaddlers */
app.use(errorHandler);
app.use(notFound);

// Connect to Mongo , Only start the server if Mongo Connected
const start = async () => {
    try {
        await connectDB(config.mongo.url).then(() => {
            Logging.info('Connected To mongoDB');
        });
        app.listen(config.server.port, () => {
            Logging.info(`Server is running on port ${config.server.port}...`);
        });
    } catch (error) {
        Logging.error(`Unable to Start Server: ` + error);
    }
};

start();
