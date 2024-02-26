import orderModel from '../models/order.model.js'
import response from '../helpers/commonResponse.js'
import createError from 'http-errors'

const orderController = {
  add: async (req, res, next) => {
    try {
      const { address_id, seller_id, order_total, payment_method } = req.body;
      const data = { customer_id: req.userId, address_id, seller_id, order_total, payment_method }
      await orderModel.insert(data)
      response(res, null, 201, 'Order Added')      
    } catch(err) { 
      return next(createError(500, 'Add order failed')) 
    }
  },

  getByCustomerId: async (req, res, next) => {
    try {
      const result = await orderModel.selectByCustomerId(req.userId)
      let data
      if (!result.rows[0]) data = 'no data'
      else data = result.rows
      response(res, data, 200, 'Get address success')
    } catch(err) {
      return next(createError(500, 'Error get address'))
    }
  },

  getLastId: async (res, next) => {
    try {
      const result = await orderModel.selectLastId()
      console.log(result.data)
      // response(res, data, 200, 'Get address success')
    } catch(err) {
      return next(createError(500, 'Error get address'))
    }
  },

}

export default orderController