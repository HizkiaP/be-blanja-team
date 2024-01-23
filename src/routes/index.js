import express from 'express';
const router = express.Router();
import customerRoute from './customer.router.js';
import sellerRoute from './seller.router.js';
import productRoute from './product.router.js';

router.use('/customer', customerRoute);
router.use('/seller', sellerRoute);
router.use('/product', productRoute);
export default router;
