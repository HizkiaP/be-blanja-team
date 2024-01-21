/* eslint-disable no-undef */
import { verify } from 'jsonwebtoken'
import createError from 'http-errors'

const protect = (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1];

      let decoded = verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
      next()
    } else {
      next(createError(400, 'Server need token'))
    }
  } catch (error) {
    console.log(error.name);
    // console.log(error);
    if (error && error.name === 'JsonWebTokenError') {
      next(createError(400, 'Token invalid'))
    } else if (error && error.name === 'TokenExpiredError') {
      next(createError(400, 'Token expired'))
    } else {
      next(createError(400, 'Token not active'))
    }
  }
}

// const isAdmin = (req, res, next)=>{
//   if(req.decoded.role !== 'admin'){
//     return next(createError(400, 'admin only'))
//   }
//   next()
// }

export default {
  protect,
  // isAdmin
};
