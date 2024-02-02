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

  // selectPrimary: ( customer_id ) => {
  //   try { return db.query(`SELECT * FROM address WHERE customer_id=${customer_id} AND primary_address = 'true' LIMIT 1`) } 
  //   catch(err) { console.log(err.message) }
  // },

  // changePrimaryOff: ( id ) => {
  //   try { return db.query(`UPDATE address SET primary_address='false' WHERE id = ${id}`) } 
  //   catch(err) { console.log(err.message) }
  // },

  // changePrimaryOn: ( id ) => {
  //   try { return db.query(`UPDATE address SET primary_address='true' WHERE id = ${id}`) } 
  //   catch(err) { console.log(err.message) }
  // },

  // update: ({ id, address_type, name_recipient,	phone, street, postal_code,	city, primary_address }) => {
  //   try {
  //     return db.query(`UPDATE address SET address_type='${address_type}', name_recipient='${name_recipient}', phone='${phone}', street='${street}', postal_code='${postal_code}', city='${city}', primary_address=${primary_address} 
  //     WHERE id=${id}`)
  //   } catch(err) { console.log(err.message)}
  // },

  // delete: (id) => {
  //   try { 
  //     return db.query(`DELETE FROM address WHERE id=${id}`); 
  //   } catch(err) { console.log(err.message) }
  // },
}

export default orderModel
