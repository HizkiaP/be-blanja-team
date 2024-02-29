import db from '../configs/db.js'

const myBagModel = {
  selectAll: () => {
    return db.query(`SELECT * FROM mybag 
      JOIN customer ON mybag.id_customer = customer.id 
      JOIN product ON mybag.id_product = product.id`);
  },

  selectByCustomerId: (id_customer) => {
    return db.query(`SELECT * FROM mybag 
      JOIN customer ON mybag.id_customer = customer.id 
      JOIN product ON mybag.id_product = product.id
      WHERE id_customer = ${id_customer}`);
  },

  insert: ({ id_customer, id_product, quantity, price }) => {
    try { 
      return db.query(`INSERT INTO mybag (id_customer, id_product, quantity, price) 
        VALUES ( ${id_customer}, ${id_product}, ${quantity}, ${price})`)
    } catch(err) { console.log(err.message) }
  },

  delete: ( id_customer, id_product ) => {
    try {
      return db.query(`DELETE FROM mybag WHERE id_customer = ${id_customer} AND id_product = ${id_product}`)
    } catch(err) { console.log(err.message) }
  }
}

export default myBagModel
