import express from 'express'
const router = express.Router()
import orderController from '../controllers/order.controller.js'
const { add, getByCustomerId, getLastId } = orderController
import auth from '../middlewares/authToken.js'

router  
  .get('/customer', auth.jwtToken, getByCustomerId)
  .get('/lastId', getLastId)
  .post('/', auth.jwtToken, add)

export default router;