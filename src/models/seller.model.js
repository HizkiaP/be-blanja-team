import db from '../configs/db.js'

const sellerModel = {
  selectById: (id) => {
    try { return db.query(`SELECT * FROM seller WHERE id=${id}`) } 
    catch(err) { console.log(err.message) }
  },

  selectByEmail: (email) => {
    try { return db.query(`SELECT * FROM seller WHERE email='${email}'`) }
    catch(err) { console.log(err.message) }
  },

  insert: ({ name, email, password, phone, image, store_name,	store_description }) => {
    try { 
      return db.query(`INSERT INTO seller (name, email, password, phone, image, store_name, store_description) 
        VALUES ('${name}', '${email}', '${password}', '${phone}', '${image}', '${store_name}','${store_description}')`)
    } catch(err) { console.log(err.message) }
  },

  update: ({ id, name, email, phone, store_name, store_description }) => {
    try {
      return db.query(`UPDATE seller SET name='${name}', email='${email}', phone='${phone}', store_name='${store_name}', store_description='${store_description}' WHERE id=${id}`)
    } catch(err) { console.log(err.message)}
  },

  updateImage: (image, id) => {
    try { 
      return db.query(`UPDATE seller SET image='${image}' WHERE id=${id}`); 
    } catch(err) { console.log(err.message) }
  },
}

export default sellerModel
