import orderItemModel from '../models/orderItem.model.js'
import response from '../helpers/commonResponse.js'
import createError from 'http-errors'

const orderItemsController = {
  getAll: async (req, res, next) => {
    try {
      const result = await orderItemModel.selectAll()
      response(res, result.rows, 200, 'Get all order_items success')
    } catch (err) {
      return next(createError(500, 'Error get all order_item')) 
    }
  },

  add: async (req, res, next) => {
    try {
      const { id_order, id_product, quantity, price } = req.body;
      const data = { id_order, id_product, quantity, price }
      await orderItemModel.insert(data)
      response(res, null, 201, 'Order Added')      
    } catch(err) { 
      return next(createError(500, 'Add order failed')) 
    }
  },
}

export default orderItemsController