import addressModel from '../models/address.model.js'
import response from '../helpers/commonResponse.js'
import createError from 'http-errors'

const addressController = {
  add: async (req, res, next) => {
    try {
      const { address_type, name_recipient, phone, street,	postal_code,	city,	primary_address } = req.body;
      const data = { customer_id: req.userId, address_type, name_recipient, phone, street,	postal_code,	city,	primary_address }

      await addressModel.insert(data)
      response(res, null, 201, 'Address Added')      
    } catch(err) { 
      return next(createError(500, 'Add address failed')) 
    }
  },

  getByCustomerId: async (req, res, next) => {
    try {
      const result = await addressModel.selectByCustomerId(req.userId)
      let data
      if (!result.rows[0]) data = 'no data'
      else data = result.rows
      response(res, data, 200, 'Get address success')
    } catch(err) {
      return next(createError(500, 'Error get address'))
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const { address_type, name_recipient, phone, street, postal_code,	city, primary_address } = req.body
      const data = { id, address_type, name_recipient,	phone, street, postal_code,	city, primary_address }
      await addressModel.update(data)
      response(res, null, 200, 'Update success')
    } catch(err) {
      return next(createError(500, 'Error update address'))
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { id } = req.params
      await addressModel.delete(id)
      response(res, null, 200, 'Delete address success')
    } catch(err) {
      return next(createError(500, 'Error delete address'))
    }
  },
}

export default addressController