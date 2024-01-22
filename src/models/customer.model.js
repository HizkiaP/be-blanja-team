import db from '../configs/db.js'

const customerModel = {
  selectById: (id) => {
    try { return db.query(`SELECT * FROM customer WHERE id=${id}`) } 
    catch(err) { console.log(err.message) }
  },

  selectByEmail: (email) => {
    try { return db.query(`SELECT * FROM customer WHERE email='${email}'`) }
    catch(err) { console.log(err.message) }
  },

  insert: ({name, email, password, phone, gender, image, date_birth}) => {
    try { 
      return db.query(`INSERT INTO customer (name, email, password, phone, gender, image, date_birth) 
        VALUES( '${name}', '${email}', '${password}', '${phone}','${gender}', '${image}', '${date_birth}')`)
    } catch(err) { console.log(err.message) }
  },

  update: ({id, name, email, phone, gender, date_birth}) => {
    try {
      return db.query(`UPDATE customer SET name='${name}', email='${email}', phone='${phone}', gender='${gender}', date_birth='${date_birth}' 
        WHERE id=${id}`,)
    } catch(err) { console.log(err.message)}
  },

  updateImage: (image, id) => {
    try { 
      return db.query(`UPDATE customer SET image='${image}' WHERE id=${id}`); 
    } catch(err) { console.log(err.message) }
  },
}

export default customerModel
