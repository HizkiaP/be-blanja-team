import db from '../configs/db.js';

const productModel = {
  searchByName: (keyword, sort) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM product WHERE name ILIKE '%${keyword}%'`;
      if (sort) {
        if (sort === 'ASC') {
          query += ' ORDER BY name ASC';
        } else if (sort === 'DESC') {
          query += ' ORDER BY name DESC';
        }
      }
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  insertProduct: async ({
    name,
    image,
    price,
    color,
    size,
    stock,
    rating,
    condition,
    description,
    seller_id,
    category_id,
    created_at,
  }) => {
    try {
      const sellerIdValue = seller_id ? parseInt(seller_id) : null;
      const categoryIdValue = category_id ? parseInt(category_id) : null;

      const result = await db.query(
        `INSERT INTO product (
                name,
                image,
                price,
                color,
                size,
                stock,
                rating,
                condition,
                description,
                seller_id,
                category_id,
                created_at
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          name,
          image,
          price,
          color,
          size,
          stock,
          rating,
          condition,
          description,
          sellerIdValue,
          categoryIdValue,
          created_at,
        ]
      );
      return result;
    } catch (err) {
      console.error('Error inserting product:', err.message);
      throw err;
    }
  },

  updateProducts: async ({
    name,
    image,
    price,
    color,
    size,
    stock,
    rating,
    condition,
    description,
    seller_id,
    category_id,
    id,
  }) => {
    try {
      const sellerIdValue = seller_id ? parseInt(seller_id) : null;
      const categoryIdValue = category_id ? parseInt(category_id) : null;

      const result = await db.query(
        `UPDATE product SET
                name = $1,
                image = $2,
                price = $3,
                color = $4,
                size = $5,
                stock = $6,
                rating = $7,
                condition = $8,
                description = $9,
                seller_id = $10,
                category_id = $11
            WHERE id = $12`,
        [
          name,
          image,
          price,
          color,
          size,
          stock,
          rating,
          condition,
          description,
          sellerIdValue,
          categoryIdValue,
          id,
        ]
      );

      return result;
    } catch (err) {
      console.error('Error updating product:', err.message);
      throw err;
    }
  },

  selectByID: (id) => {
    return db.query('SELECT * FROM product WHERE id=$1 ', [id]);
  },

  selectAllProducts: () => {
    return db.query('SELECT * FROM product ');
  },

  deleteProducts: (id) => {
    return db.query(`DELETE FROM product WHERE id=${id} `);
  },

  getProductBySellerID: (seller_id) => {
    return db.query("SELECT * FROM product WHERE seller_id = $1", [seller_id]);
  },

  getProductByCategoryID: (category_id) => {
    return db.query("SELECT * FROM product WHERE category_id = $1", [
      category_id,
    ]);
  },
};

export default productModel;
