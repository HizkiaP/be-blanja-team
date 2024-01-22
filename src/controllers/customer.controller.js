import customerModel from '../models/customer.model.js'
import bcrypt from 'bcrypt'
const { hash, compare } = bcrypt;
import response from '../helpers/commonResponse.js'
import createError from 'http-errors'
import jwtSign from '../helpers/jwt.js'
// import cloudinary from '../helpers/cloudinary.js'

const costumerController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, phone, gender, photo, date_birth } = req.body;
      const { rowCount } = await customerModel.selectByEmail(email)
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
        response(res, null, 201, 'Customer registered')
      })
    } catch(err) { console.log(err.message) }
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
              id: result.rows[0].id
            }
            const data = {
              role: 'customer',
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
      // const { id } = req.params;
      const { name, email, phone, gender, photo, date_birth } = req.body
      const data = { id:req.userId, name, email, phone, gender, photo, date_birth }
      await customerModel.update(data)
      response(res, null, 200, 'Update success')
      // res.status(200);
      // res.json({
      //   message: 'Update User Success',
      //   data: result
      // })   
    } catch(err) {
      return next(createError(500, 'Error update customer'))
    }
  },
}

export default costumerController