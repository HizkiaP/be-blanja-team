import db from '../configs/db.js'

const addressModel = {
  insert: ({ customer_id, address_type, name_recipient, phone, street, postal_code, city, primary_address }) => {
    try { 
      return db.query(`INSERT INTO address ( customer_id, address_type, name_recipient, phone, street, postal_code, city, primary_address ) 
      VALUES ( ${customer_id}, '${address_type}', '${name_recipient}', '${phone}', '${street}', '${postal_code}', '${city}', ${primary_address})`)
    } catch(err) { console.log(err.message) }
  },

  selectByCustomerId: ( customer_id ) => {
    try { return db.query(`SELECT * FROM address WHERE customer_id=${customer_id}`) } 
    catch(err) { console.log(err.message) }
  },

  selectPrimary: ( customer_id ) => {
    try { return db.query(`SELECT * FROM address WHERE customer_id=${customer_id} AND primary_address = 'true' LIMIT 1`) } 
    catch(err) { console.log(err.message) }
  },

  changePrimaryOff: ( id ) => {
    try { return db.query(`UPDATE address SET primary_address='false' WHERE id = ${id}`) } 
    catch(err) { console.log(err.message) }
  },

  changePrimaryOn: ( id ) => {
    try { return db.query(`UPDATE address SET primary_address='true' WHERE id = ${id}`) } 
    catch(err) { console.log(err.message) }
  },

  update: ({ id, address_type, name_recipient,	phone, street, postal_code,	city, primary_address }) => {
    try {
      return db.query(`UPDATE address SET address_type='${address_type}', name_recipient='${name_recipient}', phone='${phone}', street='${street}', postal_code='${postal_code}', city='${city}', primary_address=${primary_address} 
      WHERE id=${id}`)
    } catch(err) { console.log(err.message)}
  },

  delete: (id) => {
    try { 
      return db.query(`DELETE FROM address WHERE id=${id}`); 
    } catch(err) { console.log(err.message) }
  },
}

export default addressModel
