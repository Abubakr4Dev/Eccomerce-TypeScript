import { IAddImages, IDeleteImages, IDeleteProduct, IProductModel, IUpdateProduct } from '../interfaces/product.interface';
import { Product } from '../models/product.model';
import { ICreateProduct } from '../interfaces/product.interface';
import fs from 'fs';
import path from 'path';
import { globalUploadDir } from '../interfaces/globals';

export class ProductService {
    constructor(public productModel: IProductModel) {}

    async getOneById(productId: string) {
        return await this.productModel.findById(productId);
    }

    async create(createProductDto: ICreateProduct) {
        const images = this.generateProductImages(createProductDto.files);
        const product = new this.productModel({
            title: createProductDto.title,
            price: createProductDto.price,
            user: createProductDto.userId,
            images: images
        });

        return await product.save();
    }

    async updateProduct(updateProductDto: IUpdateProduct) {
        return await this.productModel.findOneAndUpdate({ _id: updateProductDto.productId }, { $set: { title: updateProductDto.title, price: updateProductDto.price } }, { new: true });
    }

    async deleteProduct(deleteProductDto: IDeleteProduct) {
        return await this.productModel.findOneAndRemove({ _id: deleteProductDto.productId });
    }

    async addImages(addImagesDto: IAddImages) {
        const images = this.generateProductImages(addImagesDto.files);
        return await this.productModel.findByIdAndUpdate({ _id: addImagesDto.productId }, { $push: { images: { $each: images } } }, { new: true });
    }

    async deleteImages(deleteImagesDto: IDeleteImages) {
        return await this.productModel.findByIdAndUpdate({ _id: deleteImagesDto.productId }, { $pull: { images: { _id: { $in: deleteImagesDto.imagesIds } } } }, { new: true });
    }

    generateBase64Url(contentType: string, buffer: Buffer) {
        return `data:${contentType};base64, ${buffer.toString('base64')}`;
    }

    generateProductImages(files: ICreateProduct['files']): Array<{ src: string }> {
        let images: Array<Express.Multer.File>;

        if (typeof files === 'object') {
            images = Object.values(files).flat();
        } else {
            images = files ? [...files] : [];
        }

        return images.map((file: Express.Multer.File) => {
            let srcObj = { src: this.generateBase64Url(file.mimetype, fs.readFileSync(path.join(globalUploadDir + file.filename))) };
            fs.unlink(path.join(globalUploadDir + file.filename), () => {});
            return srcObj;
        });
    }
}

export const productService = new ProductService(Product);
