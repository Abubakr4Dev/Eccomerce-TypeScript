import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { sellerService } from '../services/seller.service';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../errors/custom-error';

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    if (!req.files) return next(new BadRequestError('images are required'));

    if (req.uploaderError) return next(new BadRequestError(req.uploaderError.message));

    const product = await sellerService.addProduct({
        title,
        price,
        userId: req.currentUser!.userId,
        files: req.files
    });

    res.status(StatusCodes.CREATED).send(product);
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, price } = req.body;

    const result = await sellerService.updateProduct({ title, price, userId: req.currentUser!.userId, productId: id });

    if (result instanceof CustomError) return next(result);

    res.status(StatusCodes.OK).send(result);
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await sellerService.deleteProduct({ productId: id, userId: req.currentUser!.userId });
    if (result instanceof CustomError) return next(result);

    res.status(StatusCodes.OK).send(true);
};

export const addImages = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.files) return next(new BadRequestError('images are required'));
    if (req.uploaderError) return next(new BadRequestError(req.uploaderError.message));

    const result = await sellerService.addProductImages({ productId: id, userId: req.currentUser!.userId, files: req.files });
    if (result instanceof CustomError) return next(result);

    res.status(StatusCodes.OK).send(result);
};

export const deleteImages = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { imagesIds } = req.body;
    const result = await sellerService.deleteProductImages({ productId: id, userId: req.currentUser!.userId, imagesIds });
    if (result instanceof CustomError) return next(result);

    res.status(StatusCodes.OK).send(result);
};
