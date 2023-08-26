import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';

export const LoggingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    /** Log the Request */
    Logging.info('---------------------------------------------------------------------------');
    Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the Response */
        Logging.info(`Incomming -> Method:[${req.method}] - Url: [{${req.url}}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });
    
    next();
};
