import express from 'express';
const router = express.Router();
import customerController from '../controllers/customer.controller.js';
const { register, login, getSingle, update, updateImage } = customerController;
import auth from '../middlewares/authToken.js'
import upload from '../middlewares/upload.js'

router
  .post('/register', register)
  .post('/login', login)
  .get('/single', auth.jwtToken, getSingle)
  .put('/update', auth.jwtToken, update)
  .put('/updateImage', upload, auth.jwtToken, updateImage)

export default router;