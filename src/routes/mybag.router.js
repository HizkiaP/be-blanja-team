import express from 'express'
const router = express.Router()
import myBagController from '../controllers/mybag.controller.js'
const { getAll, add, getByCustomerId} = myBagController
import auth from '../middlewares/authToken.js'

router
  .get('/', getAll)
  .get('/customer', auth.jwtToken, getByCustomerId)
  .post('/', auth.jwtToken, add)


export default router;