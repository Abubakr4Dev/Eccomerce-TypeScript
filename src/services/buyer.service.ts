import { CartService, cartService } from './cart.service';
import { ProductService, productService } from './product.service';
import { IAddProductToCart, IRemoveProductFromCart, IUpdateCartProductQuantity } from '../interfaces/cart.interface';
import { BadRequestError } from '../errors/bad-request-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export class BuyerService {
    constructor(
        public cartService: CartService,
        public productService: ProductService
    ) {}

    async addProductToCart(addProductToCartDto: IAddProductToCart) {
        const product = await this.productService.getOneById(addProductToCartDto.productId);
        if (!product) return new BadRequestError('product not found!');

        const cart = await this.cartService.addProduct(addProductToCartDto, product);
        if (!cart) return new Error('could not update the cart');
        return cart;
    }

    async updateCartProductQuantity(updateCartProductQuantityDto: IUpdateCartProductQuantity) {
        const { productId, cartId } = updateCartProductQuantityDto;
        const cartProduct = await this.cartService.getCartProductById(productId, cartId);
        if (!cartProduct) return new BadRequestError('product not found in cart');

        const cart = await this.cartService.updateProductQuantity(updateCartProductQuantityDto);
        if (!cart) return new Error('could not update the cart');
        return cart;
    }

    async removeProductFromCart(removeProductFromCartDto: IRemoveProductFromCart) {
        const { productId, cartId } = removeProductFromCartDto;
        const cartProduct = await this.cartService.getCartProductById(productId, cartId);
        if (!cartProduct) return new BadRequestError('product not found in cart');

        const cart = await this.cartService.removeProductFromCart(removeProductFromCartDto);
        if (!cart) return new Error('could not update the cart');
        return cart;
    }

    async getCart(cartId: string, userId: string) {
        const cart = await this.cartService.getCart(cartId);
        if (!cart) return new BadRequestError('cart not found');
        if (cart.user.toString() !== userId) return new NotAuthorizedError();

        return cart;
    }
}

export const buyerService = new BuyerService(cartService, productService);
