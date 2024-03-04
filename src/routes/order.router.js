import express from 'express'
const router = express.Router()
import orderController from '../controllers/order.controller.js'
const { add, getByCustomerId } = orderController
import auth from '../middlewares/authToken.js'

router  
  .get('/customer', auth.jwtToken, getByCustomerId)
  .post('/', auth.jwtToken, add)

export default router;