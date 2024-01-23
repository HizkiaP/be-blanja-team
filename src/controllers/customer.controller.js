import customerModel from '../models/customer.model.js'
import bcrypt from 'bcrypt'
const { hash, compare } = bcrypt;
import response from '../helpers/commonResponse.js'
import createError from 'http-errors'
import jwtSign from '../helpers/jwt.js'
import cloudinary from '../helpers/cloudinary.js'
import getPublicId from '../helpers/getPublicId.js';

const customerController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, phone, gender, image, date_birth } = req.body;
      const { rowCount } = await customerModel.selectByEmail(email)
      if (rowCount) 
        return next(createError(400, 'Email already taken'))
			
      hash(password, 10, async function (error, hash) {
        if (error) 
          return next(createError(500, 'Password encryption failed'))
          
        const data = {
          name,
          email,
          password: hash,
          phone,
          gender,
          image,
          date_birth,
        }

        await customerModel.insert(data)
        response(res, null, 201, 'Customer registered')
      })
    } catch(err) { 
      return next(createError(500, 'Register failed')) 
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body
    try {
      const result = await customerModel.selectByEmail(email)
      if (result.rowCount != 0) {
        const userPass = result.rows[0].password;
        compare(password, userPass, function(err, resultCompare) {
          if (resultCompare) {
            const payload = {
              id: result.rows[0].id,
              role: 'customer'
            }
            const data = {
              token: jwtSign.generateToken(payload)
            }
            response(res, data, 200, 'Login success')
          } else {
            return next(createError(401, 'Wrong email / password'))
          }        
        });
      }
    } catch (err) {
      return next(createError(401, 'Wrong email / password'))
    }
  },

  getSingle: async (req, res, next) => {
    try {
      const result = await customerModel.selectById(req.userId)
      response(res, result.rows[0], 200, 'Get customer success')
    } catch(err) {
      return next(createError(500, 'Error get customer'))
    }
  },

  update: async (req, res, next) => {
    try {
      const { name, email, phone, gender, date_birth } = req.body
      const data = { id:req.userId, name, email, phone, gender, date_birth }
      await customerModel.update(data)
      response(res, null, 200, 'Update success')
    } catch(err) {
      return next(createError(500, 'Error update customer'))
    }
  },

  updateImage: async (req, res, next) => {
    let image
    try {
      const result = await customerModel.selectById(req.userId)
      const imageUrl = result.rows[0].image
      if (imageUrl != 'default.png')
        cloudinary.uploader.destroy('blanja/customer/'+getPublicId(imageUrl))
      
      image = await cloudinary.uploader.upload(req.file.path, {folder: 'blanja/customer'})
      await customerModel.updateImage(image.url, req.userId)
      response(res, null, 200, 'Update image success')
    } catch(err) {
      return next(createError(500, 'Error update image customer'))
    }
  },
}

export default customerController