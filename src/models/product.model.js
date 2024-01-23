import db from "../configs/db.js";

const productModel = {
  // selectAllProducts: (search, sort, limit, offset) => {
  //     return db.query(

  //     )
  // }

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
      console.error("Error inserting product:", err.message);
      throw err;
    }
  },

  selectAllProducts: () => {
    return db.query("SELECT * FROM product");
  },
};

export default productModel;
