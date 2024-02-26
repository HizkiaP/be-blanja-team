import express from 'express'
const router = express.Router()
import orderItemController from '../controllers/orderItem.controller.js'
const { getAll, add } = orderItemController

router
  .get('/', getAll)
  .post('/', add)

export default router;