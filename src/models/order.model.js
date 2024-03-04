import db from '../configs/db.js'

const orderModel = {
  insert: ({id, customer_id, address_id, seller_id, order_total, payment_method }) => {
    try { 
      return db.query(`INSERT INTO "order" (id, customer_id, address_id, seller_id, order_total, payment_method, order_date) 
        VALUES ('${id}', ${customer_id}, ${address_id}, ${seller_id}, ${order_total}, '${payment_method}', CURRENT_TIMESTAMP)`)
    } catch(err) { console.log(err.message) }
  },

  selectByCustomerId: ( customer_id ) => {
    try { return db.query(`
      SELECT 
        "order".id, 
        "order".order_date, 
        product.name, 
        order_item.quantity, 
        order_item.price, 
        "order".payment_method 
      FROM "order"
      JOIN order_item ON "order".id = order_item.id_order_item
      JOIN product ON order_item.id_product = product.id
      WHERE customer_id=${customer_id} 
      ORDER BY order_date DESC`) } 
    catch(err) { console.log(err.message) }
  },
}

export default orderModel
