import { Request, Response, NextFunction } from 'express';
import { authSevice } from '../services/user-auth.service';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/bad-request-error';


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await authSevice.signup({ email, password });

    if (result.message) return next(new BadRequestError(result.message));

    res.status(StatusCodes.CREATED).send(true);
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await authSevice.signin({ email, password });

    req.session = { jwt: result.jwt };

    res.status(StatusCodes.CREATED).send(true);
};

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send(req.currentUser);
};
