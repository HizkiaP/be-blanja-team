import myBagModel from '../models/mybag.model.js'
import response from '../helpers/commonResponse.js'
import createError from 'http-errors'

const myBagController = {
  getAll: async (req, res, next) => {
    try {
      const result = await myBagModel.selectAll()
      response(res, result.rows, 200, 'Get all mybag success')
    } catch (err) {
      return next(createError(500, 'Error get all mybag')) 
    }
  },

  getByCustomerId: async (req, res, next) => {
    try {
      const result = await myBagModel.selectByCustomerId(req.userId)
      response(res, result.rows, 200, 'Get mybag customer success')
    } catch(err) {
      return next(createError(500, 'Error mybag customer')) 
    }
  },

  add: async (req, res, next) => {
    try {
      console.log('masuk add controller')
      const {  product_id, quantity, price } = req.body;
      const data = { customer_id: req.userId, product_id, quantity, price }
      console.log(data)
      await myBagModel.insert(data)
      response(res, null, 201, 'Product in mybag added')      
    } catch(err) { 
      return next(createError(500, 'Add product in mybag failed')) 
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { product_id } = req.params
      await myBagModel.delete(req.userId, product_id)
      response(res, null, 200, 'Delete product in mybag success')
    } catch(err) {
      return next(createError(500, 'Error delete product in mybag'))
    }
  },
}

export default myBagController