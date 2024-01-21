import express from 'express';
const router = express.Router();
import userController from '../controllers/customer.controller.js';
const { register } = userController;

router
  .post('/register', register)

export default router;