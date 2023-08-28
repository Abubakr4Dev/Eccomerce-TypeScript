import { Request } from 'express';

export interface JwtPayload {
    email: string;
    userId: string;
}

declare global {
    interface Req extends Request {
        session?: any;
        currentUser?: any;
        uploaderError?: Error;
    }
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: JwtPayload;
            uploaderError?: Error;
        }
    }
}

export const globalUploadDir = 'src/upload/';
