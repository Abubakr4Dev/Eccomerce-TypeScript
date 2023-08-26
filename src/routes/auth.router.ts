import { Router } from 'express';
import { getCurrentUser, signin, signup } from '../controllers/authentication';
import { currentUser } from '../middleware/current-user';

const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/current-user').get(currentUser(process.env.JWT_KEY!), getCurrentUser);

export { router as authRouters };
