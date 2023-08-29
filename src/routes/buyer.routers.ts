import { Router } from 'express';
import { requireAuth } from '../middleware/require-auth';
import { addToCart, getCartDetails, removeFromCart, updateQuantity } from '../controllers/buyer';

const router = Router();

router.route('/cart/add').post(requireAuth, addToCart);
router.route('/cart/:cartId/product/:id/update-quantity').post(updateQuantity);

router.route('/cart/delete/product').post(removeFromCart);

router.route('/get/cart/').post(getCartDetails);

export { router as buyerRouter };
