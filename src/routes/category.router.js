import express from 'express';
const router = express.Router();
import upload from '../middlewares/upload.js';
import categoryController from '../controllers/category.controller.js';

router.post('/', upload, categoryController.createProduct);
router.get('/', categoryController.getAllCategories);
router.delete('/:id', categoryController.deleteCategory);

export default router;
