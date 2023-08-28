import { Uploader } from './uploader';
import { UploaderMiddlewareOptions } from '../interfaces/uploader.interface';

const uploader = new Uploader();
const middlewareOptions: UploaderMiddlewareOptions = {
    types: ['image/png', 'image/jpeg'],
    fieldName: 'image'
};


export const multipleFilesMiddleware = uploader.uploadMultipleFiles(middlewareOptions);
