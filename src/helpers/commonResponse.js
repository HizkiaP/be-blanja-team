const response = (res, result, status, message, pagination) => {
  const resultPrint = {}
  resultPrint.status = 'Success'   
  resultPrint.message = message || null
  if (pagination) resultPrint.pagination = pagination
  if (result) resultPrint.data = result   
  res.status(status).json(resultPrint)
}

export default response
