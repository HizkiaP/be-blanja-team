import productModel from "../models/product.model.js";
import cloudinary from "../helpers/cloudinary.js";
import createError from "http-errors";

const productController = {
  createProduct: async (req, res, next) => {
    try {
      const {
        name,
        price,
        color,
        size,
        stock,
        rating,
        condition,
        description,
        seller_id,
        category_id,
      } = req.body;
      let imageUrl = "";
      if (req.file) {
        const uploadToCloudinary = await cloudinary.uploader.upload(
          req?.file?.path,
          {
            folder: "blanja/product",
          }
        );

        if (!uploadToCloudinary) {
          return next(createError(res, 400, "upload image failed"));
        }
        imageUrl = uploadToCloudinary?.secure_url ?? "";
      }

      const currentUTCDateTime = new Date().toUTCString();

      const data = {
        name: name,
        image: imageUrl,
        price: price,
        color: color,
        size: size,
        stock: stock,
        rating: rating,
        condition: condition,
        description: description,
        seller_id: seller_id ?? null,
        category_id: category_id ?? null,
        created_at: currentUTCDateTime,
      };
      //   console.log(data);
      const result = await productModel.insertProduct(data);
      if (result?.rowCount > 0) {
        return res.status(201).json({
          success: true,
          data,
          message: "Create product success",
        });
      }
    } catch (error) {
      return next(createError(500, "Error creating product"));
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        name,
        price,
        color,
        size,
        stock,
        rating,
        condition,
        description,
        seller_id,
        category_id,
      } = req.body;

      const { rowCount, rows } = await productModel.selectByID(id);
      if (!rowCount) {
        return next(createError(res, 404, "Product id is not found"));
      }

      let imageUrl = "";
      if (req.file) {
        const uploadToCloudinary = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "blanja/product",
          }
        );

        if (!uploadToCloudinary) {
          return next(createError(res, 400, "Upload image failed"));
        }
        imageUrl = uploadToCloudinary.secure_url ?? "";
      }

      const data = {
        id: id,
        name: name ?? rows[0]?.name,
        image: imageUrl ?? rows[0]?.image,
        price: price ?? rows[0]?.price,
        color: color ?? rows[0]?.color,
        size: size ?? rows[0]?.size,
        stock: stock ?? rows[0]?.stock,
        rating: rating ?? rows[0]?.rating,
        condition: condition ?? rows[0]?.condition,
        description: description ?? rows[0]?.description,
        seller_id: seller_id ?? rows[0]?.seller_id,
        category_id: category_id ?? rows[0]?.category_id,
      };

      const result = await productModel.updateProducts(data);
      if (result?.rowCount > 0) {
        return res.status(200).json({
          success: true,
          data,
          message: "Update product success",
        });
      } else {
        return next(createError(res, 404, "Product not found for updating"));
      }
    } catch (error) {
      console.error(error.message);
      return next(createError(500, "Error updating product"));
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const rowCount = await productModel.deleteProducts(id);
      if (rowCount) {
        res.status(200).json({
          message: "Delete success",
        });
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    } catch (err) {
      console.error(err.message);
      next(createError(500, "Error deleting product"));
    }
  },

  search: (req, res) => {
    const { keyword, sort, page, pageSize } = req.query;
    productModel
      .searchByName(keyword, sort, page, pageSize)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getByID: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await productModel.selectByID(id);
      res.send({
        data: result.rows,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  getBySellerID: async (req, res) => {
    try {
      const seller_id = req.params.seller_id;
      const result = await productModel.getProductBySellerID(seller_id);
      res.send({
        data: result.rows,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  getByCategoryID: async (req, res) => {
    try {
      const category_id = req.params.category_id;
      const result = await productModel.getProductByCategoryID(category_id);
      res.send({
        data: result.rows,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  getLatestProducts: async (req, res) => {
    try {
      const { limit = 6 } = req.query;
      const result = await productModel.getLatestProducts(limit);
      res.send({
        data: result.rows,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  },
};

export default productController;
