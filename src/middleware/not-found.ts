import { Request, Response } from 'express';
import Logging from '../library/Logging';

const notFound = (req: Request, res: Response) => {
    Logging.error(`Route does not exist: 404`);
    res.status(404).send('Route does not exist');
};

export default notFound;
