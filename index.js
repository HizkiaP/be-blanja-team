/* eslint-disable no-unused-vars */
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import body from 'body-parser'
import createError from 'http-errors'
import allRoute from './src/routes/index.js'

const app = express()
const port = 3004
app.use(body.json());
app.use(helmet());
app.use(cors());
app.use('/v1', allRoute)

app.all('*', (req, res, next)=>{
  next(new createError.NotFound())
})

app.use((err, req, res, next)=>{
  const messageError = err.message || 'Internal Server Error'
  const statusError = err.status || 500
  const formatError = {
    status: 'Success',
    // statusCode:  statusError,
    data: {
      message: messageError
    }
  }
  res.status(statusError).json(formatError)
})

// app.get('/', (req, res) => {
//   res.send('Hello World! BE Blanja')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})