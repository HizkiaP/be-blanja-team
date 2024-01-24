import express from 'express'
const router = express.Router()
import addressController from '../controllers/address.controller.js'
const { add, getByCustomerId, getPrimary, changePrimary, update, destroy } = addressController
import auth from '../middlewares/authToken.js'

router
  .post('/', auth.jwtToken, add)
  .get('/', auth.jwtToken, getByCustomerId)
  .get('/primary', auth.jwtToken, getPrimary)
  .put('/primary/:id', auth.jwtToken, changePrimary)
  .put('/:id', update)
  .delete('/:id', destroy)

export default router;