import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';



export const currentUser = (jwt_key: string) => {
    return (req: Req, res: Response, next: NextFunction) => {
        if (!req.session.jwt) {
            return next();
        }
        try {
            const payload = jwt.verify(req.session.jwt, jwt_key!);

            req.currentUser = payload;
            next();
        } catch (err) {
            next(err);
        }
    };
};
