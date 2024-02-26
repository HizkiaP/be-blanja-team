import db from '../configs/db.js'

const orderItemModel = {
  selectAll: () => {
    return db.query('SELECT * FROM order_item JOIN "order" ON order_item.id_order_item = "order".id JOIN product ON order_item.id_product = product.id');
  },

  insert: ({ id_order, id_product, quantity, price }) => {
    try { 
      return db.query(`INSERT INTO order_item (id_order, id_product, quantity, price) 
        VALUES ( ${id_order}, ${id_product}, ${quantity}, ${price})`)
    } catch(err) { console.log(err.message) }
  },
}

export default orderItemModel
