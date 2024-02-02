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

  // getPrimary: async (req, res, next) => {
  //   try {
  //     const result = await orderModel.selectPrimary(req.userId)
  //     response(res, result.rows[0], 200, 'Get primary address success')
  //   } catch(err) {
  //     return next(createError(500, 'Error get primary address'))
  //   }
  // },

  // changePrimary: async (req, res, next) => {
  //   try {
  //     const { id } = req.params
      
  //     const result = await orderModel.selectPrimary(req.userId)
  //     const oldIdPrimary = result.rows[0].id
  //     await orderModel.changePrimaryOff(oldIdPrimary)
  //     await orderModel.changePrimaryOn(id)
  //     response(res, null, 200, 'Change primary address success')
  //   } catch(err) {
  //     return next(createError(500, 'Error change primary address'))
  //   }
  // },

  // update: async (req, res, next) => {
  //   try {
  //     const { id } = req.params
  //     const { address_type, name_recipient, phone, street, postal_code,	city, primary_address } = req.body
  //     const data = { id, address_type, name_recipient,	phone, street, postal_code,	city, primary_address }
  //     await orderModel.update(data)
  //     response(res, null, 200, 'Update success')
  //   } catch(err) {
  //     return next(createError(500, 'Error update address'))
  //   }
  // },

  // destroy: async (req, res, next) => {
  //   try {
  //     const { id } = req.params
  //     await orderModel.delete(id)
  //     response(res, null, 200, 'Delete address success')
  //   } catch(err) {
  //     return next(createError(500, 'Error delete address'))
  //   }
  // },
}

export default orderController