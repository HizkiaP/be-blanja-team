import express from 'express'
const router = express.Router()
import orderController from '../controllers/order.controller.js'
const { add, getByCustomerId } = orderController
import auth from '../middlewares/authToken.js'

router
  .post('/', auth.jwtToken, add)
  .get('/customer', auth.jwtToken, getByCustomerId)
  // .get('/primary', auth.jwtToken, getPrimary)
  // .put('/primary/:id', auth.jwtToken, changePrimary)
  // .put('/:id', update)
  // .delete('/:id', destroy)

export default router;