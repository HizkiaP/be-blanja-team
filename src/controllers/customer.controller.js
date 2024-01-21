/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import customerModel from '../models/customer.model.js'
import bcrypt from 'bcrypt'
const { hash, compare } = bcrypt;
import response from '../helpers/commonResponse.js'
import cloudinary from '../helpers/cloudinary.js'
import generateToken from '../helpers/generateToken.js'

const costumerController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, phone, gender, photo, date_birth } = req.body;
      const { rowCount } = await customerModel.selectByEmail(email);
      if (rowCount) 
        return next(createError(403, 'Email already taken'))
			
      hash(password, 10, async function (error, hash) {
        if (error) 
          return next(createError(500, 'Password encryption failed'))
          
        const data = {
          name,
          email,
          password: hash,
          phone,
          gender,
          photo,
          date_birth,
        }

        await customerModel.insert(data)
        response(res, null, 201, 'Customer Registered')
      })
    } catch(err) { console.log(err.message) }
  }
}

export default costumerController