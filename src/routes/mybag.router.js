import express from 'express'
const router = express.Router()
import myBagController from '../controllers/mybag.controller.js'
const { getAll, getByCustomerId, add, destroy} = myBagController
import auth from '../middlewares/authToken.js'

router
  .get('/', getAll)
  .get('/customer', auth.jwtToken, getByCustomerId)
  .post('/', auth.jwtToken, add)
  .delete('/:product_id', auth.jwtToken, destroy)
  


export default router;