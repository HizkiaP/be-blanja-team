import express from 'express';
const router = express.Router();
import sellerController from '../controllers/seller.controller.js';
const { register, login, getSingle, update, updateImage } = sellerController;
import auth from '../middlewares/authToken.js'
import upload from '../middlewares/upload.js'

router
  .post('/register', register)
  .post('/login', login)
  .get('/single', auth.jwtToken, getSingle)
  .put('/update', auth.jwtToken, update)
  .put('/updateImage', upload, auth.jwtToken, updateImage)

export default router;