import db from '../configs/db.js'

const orderModel = {
  insert: ({ customer_id, address_id, seller_id, order_total, payment_method }) => {
    try { 
      console.log('customer_id : '+customer_id)
      return db.query(`INSERT INTO "order" (customer_id, address_id, seller_id, order_total, payment_method, order_date) 
        VALUES ( ${customer_id}, ${address_id}, ${seller_id}, ${order_total}, '${payment_method}', CURRENT_TIMESTAMP)`)
    } catch(err) { console.log(err.message) }
  },

  selectByCustomerId: ( customer_id ) => {
    try { return db.query(`SELECT * FROM "order" WHERE customer_id=${customer_id}`) } 
    catch(err) { console.log(err.message) }
  },

  selectLastId: () => {
    try { return db.query('SELECT MAX(id) AS last_id FROM "order"') }
    catch(err) { console.log(err.message) }
  }
}

export default orderModel
