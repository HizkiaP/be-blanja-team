import db from '../configs/db.js'

const myBagModel = {
  selectAll: () => {
    return db.query(`SELECT * FROM mybag 
      JOIN customer ON mybag.customer_id = customer.id 
      JOIN product ON mybag.product_id = product.id`);
  },

  selectByCustomerId: (customer_id) => {
    return db.query(`SELECT * FROM mybag 
      JOIN customer ON mybag.customer_id = customer.id 
      JOIN product ON mybag.product_id = product.id
      WHERE customer_id = ${customer_id}`);
  },

  insert: ({ customer_id, product_id, quantity, price }) => {
    try { 
      return db.query(`INSERT INTO mybag (customer_id, product_id, quantity, price) 
        VALUES ( ${customer_id}, ${product_id}, ${quantity}, ${price})`)
    } catch(err) { console.log(err.message) }
  },
}

export default myBagModel
