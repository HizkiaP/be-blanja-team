import express from 'express';
const router = express.Router();

import customerRoute from './customer.router.js';
import sellerRoute from './seller.router.js';
import addressRoute from './address.router.js';
import productRoute from './product.router.js';
import categoryRoute from './category.router.js';
import orderRoute from './order.router.js';
import orderItemRoute from './orderItem.router.js';
import myBagRoute from './mybag.router.js';

router.use('/customer', customerRoute);
router.use('/seller', sellerRoute);
router.use('/address', addressRoute);
router.use('/product', productRoute);
router.use('/category', categoryRoute);
router.use('/order', orderRoute);
router.use('/order-item', orderItemRoute);
router.use('/mybag', myBagRoute);

export default router;
