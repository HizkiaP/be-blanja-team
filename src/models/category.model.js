import db from '../configs/db.js';

const categoryModel = {
  insertCategory: async ({ name, image }) => {
    try {
      const result = await db.query(
        `INSERT INTO category (
                    name,
                    image
                ) 
                VALUES ($1, $2 ) RETURNING *;`,
        [name, image]
      );
      return result;
    } catch (err) {
      console.error('Error inserting category:', err.message);
      throw err;
    }
  },

  selectAllProducts: () => {
    return db.query('SELECT * FROM category');
  },

  deleteCategory: (id) => {
    return db.query(`DELETE FROM category WHERE id=${id} `);
  },
};

export default categoryModel;
