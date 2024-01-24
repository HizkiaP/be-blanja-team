import sellerModel from '../models/seller.model.js'
import bcrypt from 'bcrypt'
const { hash, compare } = bcrypt;
import response from '../helpers/commonResponse.js'
import createError from 'http-errors'
import jwtSign from '../helpers/jwt.js'
import cloudinary from '../helpers/cloudinary.js'
import getPublicId from '../helpers/getPublicId.js';

const sellerController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, phone, image, store_name,	store_description } = req.body;
      const { rowCount } = await sellerModel.selectByEmail(email)
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
          image,
          store_name,
          store_description
        }

        await sellerModel.insert(data)
        response(res, null, 201, 'Seller registered')
      })
    } catch(err) { 
      return next(createError(500, 'Register failed')) 
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body
    try {
      const result = await sellerModel.selectByEmail(email)
      if (result.rowCount != 0) {
        const userPass = result.rows[0].password;
        compare(password, userPass, function(err, resultCompare) {
          if (resultCompare) {
            const payload = {
              id: result.rows[0].id,
              role: 'seller'
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
      const result = await sellerModel.selectById(req.userId)      
      response(res, result.rows[0], 200, 'Get seller success')
    } catch(err) {
      return next(createError(500, 'Error get seller'))
    }
  },

  update: async (req, res, next) => {
    try {
      const { name, email, phone, store_name, store_description } = req.body
      const data = { id:req.userId, name, email, phone, store_name, store_description }
      await sellerModel.update(data)
      response(res, null, 200, 'Update success')
    } catch(err) {
      return next(createError(500, 'Error update seller'))
    }
  },

  updateImage: async (req, res, next) => {
    let image
    try {
      const result = await sellerModel.selectById(req.userId)
      const imageUrl = result.rows[0].image
      if (imageUrl != 'default.png')
        cloudinary.uploader.destroy('blanja/seller/'+getPublicId(imageUrl))
      
      image = await cloudinary.uploader.upload(req.file.path, {folder: 'blanja/seller'})
      await sellerModel.updateImage(image.url, req.userId)
      response(res, null, 200, 'Update image success')
    } catch(err) {
      return next(createError(500, 'Error update image seller'))
    }
  },
}

export default sellerController