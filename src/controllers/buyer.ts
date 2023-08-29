import { Request, Response, NextFunction } from 'express';
import { buyerService, BuyerService } from '../services/buyer.service';
import { CustomError } from '../errors/custom-error';
import { BadRequestError } from '../errors/bad-request-error';

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    const { productId, quantity } = req.body;

    const result = await buyerService.addProductToCart({ productId, quantity, userId: req.currentUser!.userId });

    if (result instanceof CustomError || result instanceof Error) return next(result);

    req.session = { ...req.session, cartId: result._id };

    res.status(200).send(result);
};

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
    const { amount } = req.body;
    const { cartId, id: productId } = req.params;

    const inc = req.body.inc === 'true' ? true : req.body.inc === 'false' ? false : null;
    if (inc === null) return next(new BadRequestError('inc should be either true or false'));

    const result = await buyerService.updateCartProductQuantity({ cartId, productId, options: { amount, inc } });

    if (result instanceof CustomError || result instanceof Error) return next(result);

    res.status(200).send(result);
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    const { cartId, productId } = req.body;

    const result = await buyerService.removeProductFromCart({ cartId, productId });

    if (result instanceof CustomError || result instanceof Error) return next(result);

    res.status(200).send(result);
};

export const getCartDetails = async (req: Request, res: Response, next: NextFunction) => {
    const cartId = req.body.cartId;
    if (!cartId) return next(new BadRequestError('cartId is required!'));

    const result = await buyerService.getCart(cartId, req.currentUser!.userId);

    if (result instanceof CustomError || result instanceof Error) return next(result);

    res.status(200).send(result);
};
