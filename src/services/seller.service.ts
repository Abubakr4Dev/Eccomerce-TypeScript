import { BadRequestError } from '../errors/bad-request-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { IAddImages, ICreateProduct, IDeleteImages, IDeleteProduct, IUpdateProduct } from '../interfaces/product.interface';
import { ProductService, productService } from './product.service';

export class SellerService {
    constructor(public productService: ProductService) {}

    async addProduct(createProductDto: ICreateProduct) {
        return await this.productService.create(createProductDto);
    }

    async updateProduct(updateProductDto: IUpdateProduct) {
        const product = await this.productService.getOneById(updateProductDto.productId);
        if (!product) return new BadRequestError('product not found!');
        if (product.user.toString() !== updateProductDto.userId) {
            return new NotAuthorizedError();
        }
        return await this.productService.updateProduct(updateProductDto);
    }

    async deleteProduct(deleteProductDto: IDeleteProduct) {
        const product = await this.productService.getOneById(deleteProductDto.productId);
        if (!product) return new BadRequestError('product not found!');
        if (product.user.toString() !== deleteProductDto.userId) {
            return new NotAuthorizedError();
        }

        return await this.productService.deleteProduct(deleteProductDto);
    }

    async addProductImages(addImagesDto: IAddImages) {
        const product = await this.productService.getOneById(addImagesDto.productId);
        if (!product) return new BadRequestError('product not found!');
        if (product.user.toString() !== addImagesDto.userId) {
            return new NotAuthorizedError();
        }

        return await this.productService.addImages(addImagesDto);
    }

    async deleteProductImages(deleteImagesDto: IDeleteImages) {
        const product = await this.productService.getOneById(deleteImagesDto.productId);
        if (!product) return new BadRequestError('product not found!');
        if (product.user.toString() !== deleteImagesDto.userId) {
            return new NotAuthorizedError();
        }

        return await this.productService.deleteImages(deleteImagesDto);
    }
}

export const sellerService = new SellerService(productService);
