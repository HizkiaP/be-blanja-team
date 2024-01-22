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

  countRow: () => {
    try { return db.query('SELECT COUNT(*) AS total FROM customer') }
    catch(err) { console.log(err.message) }
  },

  insert: ({name, email, password, phone, gender, photo, date_birth}) => {
    try { 
      return db.query(`INSERT INTO customer (name, email, password, phone, gender, photo, date_birth) 
        VALUES( '${name}', '${email}', '${password}', '${phone}','${gender}', '${photo}', '${date_birth}')`)
    } catch(err) { console.log(err.message) }
  },

  update: ({id, name, email, phone, gender, photo, date_birth}) => {
    try {
      return db.query(`UPDATE customer SET name='${name}', email='${email}', phone='${phone}', gender='${gender}', photo='${photo}', date_birth='${date_birth}' 
        WHERE id=${id}`,)
    } catch(err) { console.log(err.message)}
  },

  delete: (id) => {
    try {return db.query(`DELETE FROM customer WHERE id=${id}`)}
    catch(err) { console.log(err.message) }
  }
}

export default customerModel
