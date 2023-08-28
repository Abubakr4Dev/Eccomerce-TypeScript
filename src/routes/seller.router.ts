import { Router } from 'express';
import { multipleFilesMiddleware } from '../middleware/multipleFiles';
import { requireAuth } from '../middleware/require-auth';
import { addImages, addProduct, deleteImages, deleteProduct, updateProduct } from '../controllers/seller-uploader';

const router = Router();

router.route('/product/new').post(requireAuth, multipleFilesMiddleware, addProduct);
router.route('/product/:id/update').patch(requireAuth, updateProduct);
router.route('/product/:id/delete').delete(requireAuth, deleteProduct);
router.route('/product/:id/add-images').post(requireAuth, multipleFilesMiddleware, addImages);
router.route('/product/:id/delete-images').post(requireAuth, deleteImages);

export { router as sellerRouter };
