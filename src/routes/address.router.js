import express from 'express'
const router = express.Router()
import addressController from '../controllers/address.controller.js'
const { add, getByCustomerId, update, destroy } = addressController
import auth from '../middlewares/authToken.js'

router
  .post('/', add)
  .get('/', auth.jwtToken, getByCustomerId)
  .put('/:id', update)
  .delete('/:id', destroy)

export default router;