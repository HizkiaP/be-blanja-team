import orderModel from '../models/order.model.js'
import orderItemModel from '../models/orderItem.model.js'
import myBagModel from '../models/mybag.model.js'
import response from '../helpers/commonResponse.js'
import createError from 'http-errors'
import { v4 as uuidv4 } from 'uuid'

const orderController = {
  add: async (req, res, next) => {
    try {
      const { address_id, seller_id, order_total, payment_method, order_item } = req.body;
      const id_order = uuidv4()
      const data = {
        id: id_order,
        customer_id: req.userId, 
        address_id, 
        seller_id, 
        order_total, 
        payment_method
      }

      await orderModel.insert(data)
      console.log(order_item)
      await Promise.all( order_item.map( async (item) => {
        const dataOrderItem = {
          ...item,
          id_order_item: id_order
        }        
        await orderItemModel.insert(dataOrderItem)
      }))
      await myBagModel.deleteAllProductCustomer(req.userId)
      response(res, null, 201, 'Order Added')      
    } catch(err) {
      console.log(err)
      return next(createError(500, err.message)) 
    }
  },

  getByCustomerId: async (req, res, next) => {
    try {
      const result = await orderModel.selectByCustomerId(req.userId)
      let data
      console.log(result.rows)
      if (!result.rows[0]) data = []
      else data = result.rows
      response(res, data, 200, 'Get address success')
    } catch(err) {
      return next(createError(500, 'Error get address'))
    }
  },

  getLastId: async (req, res, next) => {
    try {
      const result = await orderModel.selectLastId()
      // console.log(result.rows[0])
      response(res, result.rows[0], 200, 'Get last order id success')
    } catch(err) {
      return next(createError(500, 'Error get address'))
    }
  },

}

export default orderController