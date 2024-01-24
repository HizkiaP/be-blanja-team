/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import createError from 'http-errors'

const jwtToken = (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
      next()
    } else {
      next(createError(400, 'Server need token'))
    }
  } catch (error) {
    if (error && error.name === 'JsonWebTokenError') {
      next(createError(400, 'Token invalid'))
    } else if (error && error.name === 'TokenExpiredError') {
      next(createError(400, 'Token expired'))
    } else {
      next(createError(400, 'Token not active'))
    }
  }
}

export default {
  jwtToken
};
