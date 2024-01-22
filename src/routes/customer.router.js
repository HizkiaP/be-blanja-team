import express from 'express';
const router = express.Router();
import customerController from '../controllers/customer.controller.js';
const { register, login, getSingle, update } = customerController;
import auth from '../middlewares/authToken.js'

router
  .post('/register', register)
  .post('/login', login)
  .get('/single', auth.jwtToken, getSingle)
  .put('/update', auth.jwtToken, update)

export default router;